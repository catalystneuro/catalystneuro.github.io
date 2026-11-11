"""Collect the papers DANDI lists as describing each dandiset on the lab pages."""
import glob, json, re, sys, urllib.request
site = sys.argv[1]; out = sys.argv[2]
ids = {}
for f in glob.glob(f"{site}/src/content/nwb-conversions/*.md"):
    fm = open(f, encoding="utf-8").read().split("---")[1]
    lab = re.search(r'^lab:\s*"?(.*?)"?\s*$', fm, flags=re.M).group(1)
    for m in re.findall(r"dandiarchive\.org/dandiset/(\d{6})", fm):
        ids.setdefault(m, set()).add(lab)
def get(u):
    req = urllib.request.Request(u, headers={"User-Agent": "catalystneuro-site-build"})
    return json.load(urllib.request.urlopen(req, timeout=30))
rows = []
for did in sorted(ids):
    try:
        info = get(f"https://api.dandiarchive.org/api/dandisets/{did}/")
        ver = (info.get("most_recent_published_version") or info["draft_version"])["version"]
        meta = get(f"https://api.dandiarchive.org/api/dandisets/{did}/versions/{ver}/")
    except Exception as e:
        print("skip", did, e, file=sys.stderr); continue
    for r in meta.get("relatedResource", []) or []:
        if r.get("relation") not in ("dcite:IsDescribedBy", "dcite:IsPublishedIn", "dcite:IsSupplementTo"):
            continue
        rows.append({"dandiset": did, "dandisetName": meta.get("name"), "labs": sorted(ids[did]),
                     "relation": r.get("relation"), "name": r.get("name"), "url": r.get("url"),
                     "identifier": r.get("identifier"), "resourceType": r.get("resourceType")})
json.dump(rows, open(out, "w"), indent=1, ensure_ascii=False)
print(len(ids), "dandisets;", len(rows), "related papers;", len({r['dandiset'] for r in rows}), "dandisets with a paper", file=sys.stderr)
