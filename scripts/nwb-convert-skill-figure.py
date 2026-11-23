"""Paired bars: Claude Code alone vs with the nwb-convert skill, Claude Opus 5.5, Lerner benchmark."""
import sys

rows = [
    ("Sessions converted", "of 3,986", 99, 99),
    ("Metadata items filled", "of 49", 92, 98),
    ("Optogenetics in ndx-optogenetics types", "of what was converted", 0, 100),
    ("Western blot images included", "of 16", 0, 100),
    ("Ontology terms with a correct identifier", "of 11", 0, 91),
    ("Dandiset metadata matching ours", "of 25 items", 24, 92),
]
NAVY, BLUE, GREY, INK, MUTED, LINE = "#101642", "#1466a7", "#aab4c8", "#0a0e28", "#55607a", "#dfe6f1"
W, H = 1200, 675
left, right, top = 430, 80, 150
plot_w = W - left - right
row_h, bar_h, gap = 80, 22, 4
font = "Inter, 'Helvetica Neue', Arial, sans-serif"

out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="{font}" role="img" aria-label="Benchmark results for Claude Opus 5.5 with and without the nwb-convert skill">']
out.append(f'<rect width="{W}" height="{H}" fill="#ffffff"/>')
out.append(f'<text x="40" y="56" font-size="30" font-weight="700" fill="{NAVY}">Claude Code converting a published dataset to NWB</text>')
out.append(f'<text x="40" y="90" font-size="18" fill="{MUTED}">Claude Opus 5.5, graded against our conversion of DANDI:000971. One run per configuration.</text>')
# legend
lx = left
out.append(f'<rect x="{lx}" y="112" width="18" height="14" rx="2" fill="{GREY}"/><text x="{lx+26}" y="124" font-size="16" fill="{INK}">Claude Code alone</text>')
out.append(f'<rect x="{lx+190}" y="112" width="18" height="14" rx="2" fill="{BLUE}"/><text x="{lx+216}" y="124" font-size="16" fill="{INK}">With the nwb-convert skill</text>')
for tick in (0, 25, 50, 75, 100):
    x = left + plot_w * tick / 100
    out.append(f'<line x1="{x:.1f}" y1="{top-6}" x2="{x:.1f}" y2="{top + row_h*len(rows) - 14}" stroke="{LINE}" stroke-width="1"/>')
    out.append(f'<text x="{x:.1f}" y="{top + row_h*len(rows) + 8}" font-size="14" fill="{MUTED}" text-anchor="middle">{tick}%</text>')
for i, (label, sub, vanilla, skill) in enumerate(rows):
    y = top + i * row_h
    out.append(f'<text x="{left-18}" y="{y+20}" font-size="17" font-weight="600" fill="{INK}" text-anchor="end">{label}</text>')
    out.append(f'<text x="{left-18}" y="{y+41}" font-size="14" fill="{MUTED}" text-anchor="end">{sub}</text>')
    for j, (value, colour) in enumerate(((vanilla, GREY), (skill, BLUE))):
        by = y + 4 + j * (bar_h + gap)
        bw = max(plot_w * value / 100, 2)
        out.append(f'<rect x="{left}" y="{by}" width="{bw:.1f}" height="{bar_h}" rx="2" fill="{colour}"/>')
        out.append(f'<text x="{left + bw + 8:.1f}" y="{by+17}" font-size="15" font-weight="600" fill="{NAVY if j else MUTED}">{value}%</text>')
out.append('</svg>')
open(sys.argv[1], "w").write("\n".join(out) + "\n")
