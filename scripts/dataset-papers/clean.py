"""Normalize DANDI related papers to DOIs and fill title, venue and year from Crossref."""
import json, re, sys, time, urllib.request, urllib.parse
rows = json.load(open(sys.argv[1])); out = sys.argv[2]
SKIP_TYPES = {"dcite:Software", "dcite:ComputationalNotebook", "dcite:Dataset"}
def doi_of(u):
    if not u: return None
    u = urllib.parse.unquote(u)
    m = re.search(r"(10\.\d{4,9}/[^\s?#]+)", u)
    if m:
        d = m.group(1).rstrip("/").removesuffix(".full").lower()
        # bioRxiv URLs carry a version suffix that is not part of the DOI.
        return re.sub(r"v\d+$", "", d) if d.startswith("10.1101/") else d
    m = re.search(r"nature\.com/articles/([^/?#]+)", u)
    if m: return f"10.1038/{m.group(1)}".lower()
    return None
def norm(t): return re.sub(r"[^a-z0-9]+", " ", t.lower()).strip()
def find_doi(title):
    """Crossref title search, accepted only on an exact (normalized) title match."""
    q = urllib.parse.urlencode({"query.bibliographic": title, "rows": 3})
    req = urllib.request.Request("https://api.crossref.org/works?" + q, headers={"User-Agent": "catalystneuro-site-build"})
    try:
        items = json.load(urllib.request.urlopen(req, timeout=30))["message"]["items"]
    except Exception as e:
        print("search miss", title[:50], e, file=sys.stderr); return None
    for it in items:
        if norm((it.get("title") or [""])[0]) == norm(title): return it["DOI"].lower()
    return None
def crossref(doi):
    req = urllib.request.Request("https://api.crossref.org/works/" + urllib.parse.quote(doi),
                                 headers={"User-Agent": "catalystneuro-site-build"})
    try:
        m = json.load(urllib.request.urlopen(req, timeout=30))["message"]
    except Exception as e:
        print("crossref miss", doi, e, file=sys.stderr); return None
    date = (m.get("published-print") or m.get("published-online") or m.get("issued") or m.get("posted") or {}).get("date-parts", [[None]])[0]
    venue = (m.get("container-title") or [None])[0]
    if not venue and m.get("type") == "posted-content":
        venue = (m.get("institution") or [{}])[0].get("name") or "Preprint"
    return {"title": re.sub(r"<[^>]+>", "", (m.get("title") or [""])[0]).strip(), "venue": venue, "year": date[0] if date else None,
            "type": m.get("type")}
papers = {}
for r in rows:
    if r["resourceType"] in SKIP_TYPES: continue
    url = r["url"] or r["identifier"]
    if not url or re.search(r"figshare\.com|zenodo\.org|github\.com|\.pdf$", url): continue
    doi = doi_of(url)
    key = doi or url
    p = papers.setdefault(key, {"doi": doi, "url": f"https://doi.org/{doi}" if doi else url, "title": (r["name"] or "").strip(),
                                "venue": None, "year": None, "dandisets": [], "labs": []})
    if r["dandiset"] not in p["dandisets"]: p["dandisets"].append(r["dandiset"])
    for lab in r["labs"]:
        if lab not in p["labs"]: p["labs"].append(lab)
VENUE_FIX = {"eneuro": "eNeuro"}
for p in papers.values():
    p["title"] = re.sub(r"\s+", " ", p["title"])
    if not p["doi"] and p["title"]:
        p["doi"] = find_doi(p["title"]); time.sleep(0.2)
        if p["doi"]: p["url"] = f"https://doi.org/{p['doi']}"
    if p["doi"]:
        c = crossref(p["doi"]); time.sleep(0.2)
        if c:
            p["title"] = re.sub(r"\s+", " ", c["title"] or p["title"]); p["venue"] = VENUE_FIX.get(c["venue"], c["venue"]); p["year"] = c["year"]; p["type"] = c["type"]
# Where a dandiset lists both the preprint and the published paper, keep the published one.
published = {norm(p["title"])[:60] for p in papers.values() if p.get("type") == "journal-article"}
for k in [k for k, p in papers.items() if p.get("type") == "posted-content" and norm(p["title"])[:60] in published]:
    del papers[k]
final = [{k: v for k, v in p.items() if k != "type"} for p in papers.values() if p["title"] and p["title"].lower() != "publication"]
final.sort(key=lambda p: (-(p["year"] or 0), p["title"]))
json.dump(final, open(out, "w"), indent=2, ensure_ascii=False)
print(len(final), "papers;", sum(1 for p in final if not p["year"]), "without year", file=sys.stderr)
for p in final: print(p["year"], "|", p["venue"], "|", p["title"][:80], "|", ",".join(p["dandisets"]), "|", "; ".join(p["labs"]))
