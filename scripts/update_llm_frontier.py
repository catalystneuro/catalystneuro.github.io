#!/usr/bin/env python3
"""Refresh the LLM cost-frontier dashboard data from Artificial Analysis.

Any model page on artificialanalysis.ai embeds the full comparison dataset for
every currently benchmarked model, including the measured cost per Intelligence
Index task. This script fetches one page, parses that payload, merges it into a
cumulative history (so models that leave the live set keep their last
measurement and are marked retired), applies known price events, and writes the
JSON that the dashboard page reads.

Inputs
  src/data/llm-frontier/history.json       cumulative per-model history (committed)
  src/data/llm-frontier/price-events.json  hand-maintained price cuts

Output
  public/data/llm-frontier.json            what the dashboard renders

Standard library only, so it runs unattended in GitHub Actions.
"""
import datetime as dt
import json
import math
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HISTORY = ROOT / "src/data/llm-frontier/history.json"
EVENTS = ROOT / "src/data/llm-frontier/price-events.json"
OUTPUT = ROOT / "public/data/llm-frontier.json"

# Any model page works; this one is stable and cheap to serve.
SOURCE_PAGE = "https://artificialanalysis.ai/models/gpt-5-6-luna-xhigh"
TIERS = [30, 40, 50, 60]
SNAPSHOT_COUNT = 7
SNAPSHOT_MONTHS = 2


def fetch_payload(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (catalystneuro.com llm-frontier updater)"})
    html = urllib.request.urlopen(req, timeout=120).read().decode("utf-8")
    chunks = re.findall(r'self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)', html)
    if not chunks:
        raise RuntimeError("no Next.js payload found on page; the site layout may have changed")
    return "".join(json.loads('"' + c + '"') for c in chunks)


def parse_object_at(s: str, start: int) -> dict:
    depth = 0
    in_str = False
    esc = False
    k = start
    while k < len(s):
        ch = s[k]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return json.loads(s[start : k + 1])
        k += 1
    raise ValueError("unterminated object")


def enclosing_object(s: str, idx: int) -> dict:
    depth = 0
    j = idx
    while j > 0:
        c = s[j]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                return parse_object_at(s, j)
            depth -= 1
        j -= 1
    raise ValueError("no enclosing object")


def extract_models(payload: str) -> dict:
    models = {}
    for m in re.finditer(r'"intelligenceIndexCostPerTask"', payload):
        o = enclosing_object(payload, m.start())
        cost = ((o.get("intelligenceIndexCostPerTask") or {}).get("cost") or {}).get("total")
        iq = o.get("intelligenceIndex")
        if cost is None or iq is None or not o.get("releaseDate") or not o.get("slug"):
            continue
        if float(cost) <= 0:
            continue  # free or promotional endpoints distort the cost axis
        models[o["slug"]] = dict(
            name=o["name"],
            creator=(o.get("creator") or {}).get("name") or "",
            release_date=o["releaseDate"][:10],
            intelligence_index=round(float(iq), 1),
            cost_per_task=round(float(cost), 6),
            open_weights=bool(o.get("isOpenWeights")),
            deprecated=bool(o.get("deprecated")),
        )
    return models


def merge(history: dict, live: dict, today: str) -> dict:
    models = history["models"]
    for slug, rec in live.items():
        prev = models.get(slug, {})
        models[slug] = dict(
            name=rec["name"],
            creator=rec["creator"] or prev.get("creator", ""),
            release_date=rec["release_date"],
            intelligence_index=rec["intelligence_index"],
            cost_per_task=rec["cost_per_task"],
            open_weights=rec["open_weights"],
            retired=False,
            first_seen=prev.get("first_seen", today),
            last_seen=today,
        )
    for slug, rec in models.items():
        if slug not in live:
            rec["retired"] = True
    history["updated"] = today
    return history


def add_months(d: dt.date, months: int) -> dt.date:
    y = d.year + (d.month - 1 + months) // 12
    m = (d.month - 1 + months) % 12 + 1
    day = min(d.day, [31, 29 if y % 4 == 0 and (y % 100 != 0 or y % 400 == 0) else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1])
    return dt.date(y, m, day)


def snapshots(today: dt.date) -> list:
    out = []
    for i in range(SNAPSHOT_COUNT - 1, -1, -1):
        d = add_months(today, -SNAPSHOT_MONTHS * i)
        label = d.strftime("%b %Y") + (" (latest)" if i == 0 else "")
        out.append([d.isoformat(), label])
    return out


def price_timeline(models: dict, events: list) -> list:
    """Expand models into (date, cost, slug, iq) events, with pre-cut prices where known."""
    out = []
    for slug, m in models.items():
        ev = next((e for e in events if slug.startswith(e["slug_prefix"])), None)
        if ev and m["release_date"] < ev["cut_date"]:
            out.append([m["release_date"], m["cost_per_task"] * ev["multiplier_before"], slug, m["intelligence_index"], "at launch price"])
            out.append([ev["cut_date"], m["cost_per_task"], slug, m["intelligence_index"], f"price cut (released {m['release_date']})"])
        else:
            out.append([m["release_date"], m["cost_per_task"], slug, m["intelligence_index"], None])
    out.sort(key=lambda e: (e[0], e[1]))
    return out


def tier_records(models: dict, events: list) -> dict:
    timeline = price_timeline(models, events)
    out = {}
    for t in TIERS:
        best = math.inf
        recs = []
        for date, cost, slug, iq, note in timeline:
            if iq >= t and cost < best:
                best = cost
                recs.append([date, round(cost, 6), models[slug]["name"], iq] + ([note] if note else []))
        out[str(t)] = recs
    return out


def tier_summary(records: dict) -> dict:
    out = {}
    for t, recs in records.items():
        if len(recs) < 2:
            out[t] = None
            continue
        first, last = recs[0], recs[-1]
        days = (dt.date.fromisoformat(last[0]) - dt.date.fromisoformat(first[0])).days
        ratio = first[1] / last[1]
        out[t] = dict(
            first_date=first[0], first_model=first[2], first_cost=first[1],
            last_date=last[0], last_model=last[2], last_cost=last[1],
            collapse=round(ratio, 1),
            halving_days=round(days / math.log2(ratio)) if ratio > 1 else None,
        )
    return out


def build_output(history: dict, events: list) -> dict:
    today = dt.date.fromisoformat(history["updated"])
    models = history["models"]
    rows = [
        [m["name"], m["creator"], m["release_date"], m["intelligence_index"], m["cost_per_task"], int(m["retired"]), int(m["open_weights"])]
        for m in sorted(models.values(), key=lambda m: (m["release_date"], m["name"]))
    ]
    records = tier_records(models, events)
    return dict(
        updated=history["updated"],
        source="Artificial Analysis (artificialanalysis.ai), measured cost per Intelligence Index task",
        snapshots=snapshots(today),
        tiers=TIERS,
        models=rows,
        tier_cost=records,
        tier_summary=tier_summary(records),
        price_events=events,
        counts=dict(total=len(rows), live=sum(1 for m in models.values() if not m["retired"]), retired=sum(1 for m in models.values() if m["retired"])),
    )


def main(argv):
    offline = "--offline" in argv
    history = json.loads(HISTORY.read_text())
    events = json.loads(EVENTS.read_text())
    if not offline:
        today = dt.date.today().isoformat()
        payload = fetch_payload(SOURCE_PAGE)
        live = extract_models(payload)
        if len(live) < 50:
            raise RuntimeError(f"only {len(live)} live models parsed; refusing to update")
        history = merge(history, live, today)
        HISTORY.write_text(json.dumps(history, indent=1, sort_keys=True) + "\n")
        print(f"merged {len(live)} live models; history now {len(history['models'])} models")
    out = build_output(history, events)
    OUTPUT.write_text(json.dumps(out, separators=(",", ":")) + "\n")
    print(f"wrote {OUTPUT.relative_to(ROOT)} ({out['counts']}) as of {out['updated']}")
    for t, s in out["tier_summary"].items():
        if s:
            print(f"  index >= {t}: {s['collapse']}x from {s['first_date']} to {s['last_date']}, halving ~{s['halving_days']} d")


if __name__ == "__main__":
    main(sys.argv[1:])
