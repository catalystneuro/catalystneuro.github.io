---
name: CatalystNeuro
description: "A neurophysiology recording rendered as a website: dark rig surfaces, hairline structure, monospace readouts, and one live channel."
colors:
  ink: "#0a0e28"
  navy: "#101642"
  navy-700: "#1b2358"
  navy-600: "#283066"
  blue: "#1466a7"
  blue-600: "#0f5289"
  blue-400: "#3f8cca"
  blue-100: "#dceaf6"
  blue-50: "#eef6fc"
  signal: "#22c7e6"
  signal-soft: "#7fe0f0"
  paper: "#f5f8fc"
  surface: "#ffffff"
  line: "#dfe6f1"
  line-soft: "#ecf1f8"
  ink-muted: "#55607a"
  ink-soft: "#68718b"
  prose-body: "#313a54"
  facet-species: "#b45309"
  facet-area: "#15803d"
typography:
  display:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.5vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5vw, 3.1rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Figtree Variable, Figtree, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  prose:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.075rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
  data:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  xs: "0.3rem"
  sm: "0.35rem"
  base: "0.45rem"
  md: "0.55rem"
  lg: "0.7rem"
  xl: "0.9rem"
spacing:
  hairline: "1px"
  xs: "0.35rem"
  sm: "0.6rem"
  md: "1.2rem"
  lg: "1.8rem"
  section: "5rem"
  container: "76rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.35rem"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.blue-600}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.35rem"
  button-ghost-hover:
    textColor: "{colors.blue}"
  button-ondark:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.35rem"
  button-ondark-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy}"
  button-sm:
    padding: "0.45rem 0.85rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xl}"
    padding: "1.8rem"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.9rem"
  eyebrow:
    textColor: "{colors.blue}"
    typography: "{typography.label}"
  tag:
    backgroundColor: "#eef1f6"
    textColor: "#4b5675"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.55rem"
    typography: "{typography.data}"
  tag-method:
    backgroundColor: "{colors.blue-50}"
    textColor: "{colors.blue-600}"
  badge-green:
    backgroundColor: "#e7f6ec"
    textColor: "{colors.facet-area}"
    rounded: "{rounded.sm}"
    padding: "0.22rem 0.6rem"
    typography: "{typography.data}"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.xs}"
    padding: "0.15rem 0.4rem"
    typography: "{typography.data}"
---

# Design System: CatalystNeuro

## Overview

**Creative North Star: "The Live Recording"**

The site is built to look like a multichannel neural recording in progress, because that
is what its clients spend their lives looking at. The hero is an acquisition surface: near
black, with nine electrophysiology traces drawn as real SVG paths behind the headline, one
of them highlighted in electric cyan and carrying a slow sweeping pulse. Every other
surface in the system inherits that logic. Structure is drawn with hairlines the way a rig
draws channel rules. Anything a machine produced (a date, a count, a dandiset id, a
species tag, a page number) is set in monospace, the way a readout would print it. Anything
a person wrote is set in a humanist sans, because it came from a person.

The result is deliberately not a SaaS marketing site, and the previous generic-SaaS visual
language is the explicit anti-reference. There are no gradient mesh blobs, no floating
3D product mockups, no stock photographs of scientists pointing at monitors, and no
illustration standing in for data. The subject matter supplies the imagery. When a page
needs a visual, the honest answer is nearly always a real artifact: a trace, a logo grid,
a photograph the team actually took, or a hairline table of facts.

Restraint is what makes the one moment of energy land. The palette is overwhelmingly navy,
paper, and hairline gray; the cyan appears roughly once per viewport and always on
something that is genuinely live or active. Surfaces are flat at rest and earn their shadow
only through interaction. The density is technical without being cramped: a 76rem measure,
5rem section rhythm, and long comfortable line lengths in prose, so a principal
investigator can read a 3000-word technical post without fatigue and a program officer can
scan 62 conversion cards without losing their place.

**Key Characteristics:**
- Dark acquisition surfaces frame the page; the interior is always paper or white.
- Structure is drawn with 1px hairlines, never with resting shadow.
- Monospace is a semantic signal, not a texture: it means a machine produced this fact.
- One electric cyan accent, used roughly once per viewport, reserved for the live thing.
- Real signal geometry instead of decorative abstraction or stock imagery.
- Motion is slow, linear, and rare: a 6-second trace sweep, a 1px lift on hover.

## Colors

A cool, instrument-lit palette: two navies deep enough to read as hardware, a single
working blue inherited from the logo, one electric cyan held in reserve, and a cool paper
neutral scale that keeps long documents comfortable.

### Primary
- **Signal Blue** (`{colors.blue}`): the working accent and the logo's own blue. It carries
  every interactive job on light surfaces: primary buttons, links in prose, eyebrows,
  active navigation, the focus outline, icon fills, and the selected state of a filter.
  When something on a paper surface must look clickable, this is the color that says so.
- **Deep Blue** (`{colors.blue-600}`): the pressed and hovered state of Signal Blue, and
  the text color inside method tags and inline code where the lighter blue would not hold
  contrast against a tinted background.
- **Wash Blue** (`{colors.blue-50}`) and **Mist Blue** (`{colors.blue-100}`): the tinted
  backgrounds behind method tags, inline code, service icon tiles, navigation hover, and
  the 3px focus halo on inputs. Mist Blue is used once at scale, as the oversized quotation
  mark on the testimonial.

### Secondary
- **Live Cyan** (`{colors.signal}`): the only color in the system not derived from the
  logo, and the most tightly governed. It marks things that are live, active, or emitting:
  the highlighted trace in the hero, the pipeline step numbers, the diamond bullets in
  prose lists, the text selection highlight. On dark surfaces it glows slightly
  (`drop-shadow(0 0 6px rgba(34,199,230,0.6))` on the live trace only).
- **Cyan Soft** (`{colors.signal-soft}`): the readable form of the accent for text on ink,
  used for the hero eyebrow and for link hover in the footer. Use this, not Live Cyan, when
  the accent has to carry words.

### Tertiary
The three facet colors exist only to encode a taxonomy on portfolio cards, and are never
used as brand color. **Species Amber** (`{colors.facet-species}` on a 15% amber wash),
**Area Green** (`{colors.facet-area}` on a 12% green wash), and Method Blue (Wash Blue with
Deep Blue text). A reader learns in one card that amber means species and green means
research area, and that mapping must not be broken for visual variety. Status badges reuse
the same three washes plus neutral gray for active, pending, completed, and other.

### Neutral
- **Rig Ink** (`{colors.ink}`): the darkest surface. The hero gradient resolves to it and
  the footer is a flat field of it. This is the outermost frame of every page.
- **Brand Navy** (`{colors.navy}`): the logo navy. It is both the default text color for
  headings and body copy on light surfaces, and the fill of the stats band. Text and
  surface share one value, which is part of why the system feels coherent.
- **Navy 700 / 600** (`{colors.navy-700}`, `{colors.navy-600}`): the lit corner of the hero
  gradient and the border of the code block. Depth inside dark surfaces comes from these,
  not from shadow.
- **Cool Paper** (`{colors.paper}`): the page background. Slightly blue and slightly cool,
  so white cards read as raised without needing a shadow.
- **Surface White** (`{colors.surface}`): cards, menus, inputs, alternating sections, and
  the institution grid cells.
- **Hairline** (`{colors.line}`) and **Hairline Soft** (`{colors.line-soft}`): every border,
  divider, rule, table cell edge, and the 44px background grid in the page header. These
  two values do almost all the structural work in the system.
- **Muted Ink** (`{colors.ink-muted}`) and **Soft Ink** (`{colors.ink-soft}`): secondary
  and tertiary text. Descriptions, leads, and captions use Muted Ink; timestamps, counts,
  and disabled affordances use Soft Ink. Both are tuned to clear AA at the small sizes they
  are used at: Muted Ink measures 6.29:1 on white and 5.90:1 on Cool Paper, Soft Ink 4.86:1
  and 4.56:1. Soft Ink appears at 0.7rem to 0.8rem on date stamps, post dates, result
  counts, pagination, and card footers, which is exactly where a lighter gray would fail, so
  do not lighten it for the sake of hierarchy. If a tertiary value needs to recede further,
  reduce its size or weight rather than its contrast.
- **Prose Ink** (`{colors.prose-body}`): long-form body text only. It is marginally warmer
  and lighter than Brand Navy, tuned for reading a full article rather than scanning a card.

### Named Rules

**The One Live Channel Rule.** Live Cyan appears about once per viewport, and only on
something that is genuinely live, active, or selected. If a second cyan element enters the
same screen, one of them is decoration and should be Signal Blue or a neutral instead. The
hero works because eight traces are quiet and one is not.

**The Borrowed Navy Rule.** Navy is simultaneously the heading color, the body color, and a
surface fill. Never introduce a second dark neutral to separate text from surface; use the
existing navy family (`navy-700`, `navy-600`) or opacity on white.

**The Facet Color Rule.** Amber means species, green means research area, blue means
method. These three are a legend, not a palette. Do not reassign them, and do not use them
for emphasis anywhere outside taxonomy chips and status badges.

## Typography

**Display Font:** Figtree Variable (with Figtree, system-ui, sans-serif)
**Body Font:** Inter Variable (with Inter, system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono Variable (with JetBrains Mono, ui-monospace, monospace)

**Character:** Figtree is geometric and slightly warm, set at weight 600 with a tight
`-0.02em` tracking and a 1.02 to 1.08 leading, so headlines read as confident engineering
rather than as a startup shout. Inter does the reading work without personality of its own,
which is correct: the sentences are technical and should not fight the reader. JetBrains
Mono is not decoration, it is the system's semantic marker for machine-produced fact, and
its wide `0.22em` tracking on eyebrows turns a label into a piece of instrument silkscreen.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6.5vw, 4.6rem)`, line-height 1.02): hero headline only.
  Capped at a 16ch measure so it breaks into short, deliberate lines. The second line takes
  Live Cyan; the first stays white.
- **Headline** (600, `clamp(2.1rem, 5vw, 3.1rem)`, line-height 1.08): the `h1` on every
  interior page, always inside the page header block with an eyebrow above it.
- **Title** (600, `clamp(1.8rem, 3.5vw, 2.4rem)`, max-width 20ch): section headings. The
  20ch cap is doing real work; it forces section titles to be short declarative phrases
  instead of sentences.
- **Body** (400, 1rem, line-height 1.6): interface copy, cards, navigation, forms.
- **Prose** (400, 1.075rem, line-height 1.75, Prose Ink): long-form articles and guides.
  Paragraph rhythm comes from `.prose > * + *` at 1.3em, and `h2` earns a hairline rule
  above it at 2.4em, so a long post visibly separates into chapters.
- **Label** (mono, 500, 0.72rem, `0.22em` tracking, uppercase, Signal Blue): the eyebrow.
  It carries a 1.6rem hairline dash before the text at 55% opacity, which is the single
  most recognizable device in the system. `.eyebrow--plain` removes the dash when the
  eyebrow sits inside a card that already has enough structure.
- **Data** (mono, 0.68rem to 0.8rem, `0.04em` tracking): tags, badges, date stamps, result
  counts, pagination, table headers, footer column headings, and pipeline step numbers.

### Named Rules

**The Machine Fact Rule.** JetBrains Mono is reserved for values a machine produced or a
system indexes: dates, counts, identifiers, tags, statuses, code, page numbers, and
structural eyebrows. It never sets a sentence a human wrote. If you are tempted to set a
human phrase in mono for texture, the answer is small-caps-weight Inter instead.

**The Twenty Character Rule.** Section titles are capped at a 20ch measure and hero titles
at 16ch. If a title does not fit, shorten the title rather than raising the cap.

**The Eyebrow Precedes Rule.** Every major section and every interior page header opens
with a mono eyebrow above the heading. It is the system's structural drumbeat, and skipping
it makes a page read as though it belongs to a different site.

## Layout

A single centered measure of 76rem with a 1.5rem gutter (`.container-x`) governs every
page; nothing bleeds full-width except dark bands, the institution grid, and the hero
background. Vertical rhythm is a 5rem section pad, with alternating sections marked by a
white fill plus hairline borders on both edges (`.section--alt`) rather than by a change in
spacing. The page header block sits at 3.5rem top, 2.5rem bottom, closed with a hairline
and backed by a 44px hairline grid that is masked to a radial fade from the top right, so
the technical texture is present without becoming a pattern.

Grids resolve at a small number of honest breakpoints rather than a formal scale: 640px
(institution grid to six columns, footer columns to four), 700px and 1050px (portfolio card
grid to two then three columns), 780px (three-up feature grids, hero pipeline arrows),
860px (services, footer split, CTA band), and 960px (the navigation swap from burger to
full nav). Card grids use a consistent 1.2rem gap. Density is comfortable rather than
tight: cards carry 1.8rem of internal padding, portfolio cards 1.5rem, and prose runs at
its natural measure inside the 76rem container.

Two layout devices are worth preserving. The institution grid draws its hairlines by having
each cell outline itself into a 1px gap, so a partially filled final row shows page
background rather than a block of border color. The portfolio card is a flex column with
its link row pinned to the bottom via `margin-top: auto`, so cards in a row end on the same
line regardless of description length, with descriptions clamped to four lines and expanded
by an inline control.

## Elevation & Depth

The system is flat at rest and hairline-defined. A card is a white fill with a 1px
`{colors.line}` border and no shadow. Depth is not used to establish hierarchy; hierarchy
comes from surface color, hairlines, and type. Shadow enters only as a response to state or
to genuine floating, and when it does it is long, soft, and heavily negative-spread, so it
reads as light falling rather than as a drop shadow.

### Shadow Vocabulary
- **Button rest** (`box-shadow: 0 1px 2px rgba(16,22,66,0.16)`): the single exception to
  flat-at-rest, just enough to seat a primary button on the page.
- **Button hover** (`box-shadow: 0 8px 24px -8px rgba(20,102,167,0.55)`): a colored glow in
  the blue's own hue, paired with a 1px lift.
- **Card hover** (`box-shadow: 0 20px 40px -28px rgba(16,22,66,0.4)`): paired with a 3px
  lift and a border that shifts 45% toward Signal Blue.
- **Floating menu** (`box-shadow: 0 18px 40px -20px rgba(16,22,66,0.35)`): the navigation
  dropdown, which genuinely floats above the page.
- **Code block** (`box-shadow: 0 18px 40px -30px rgba(10,14,40,0.9)`): a dark surface inside
  prose, seated with its own near-black shadow.
- **Input focus** (`box-shadow: 0 0 0 3px {colors.blue-50}`): a halo, not a shadow, paired
  with a border shift to Signal Blue.

### Named Rules

**The Earned Shadow Rule.** Surfaces are flat until the user does something. If an element
has a resting shadow and is not a primary button or a floating menu, remove it and let the
hairline do the work.

**The Long Light Rule.** Every shadow in the system uses a large blur and a large negative
spread (`-8px` to `-30px`). Short tight shadows read as material and break the instrument
character. Match the existing offsets rather than inventing new ones.

## Shapes

Corners are gently rounded on a compact scale that never becomes a pill. The scale runs
from `{rounded.xs}` on the smallest data chips through `{rounded.md}` on buttons, inputs,
and filter controls, `{rounded.lg}` on images, code blocks, and icon tiles, up to
`{rounded.xl}` on cards, which is the largest radius in the system. Nothing is fully round
except icon-free avatars, and nothing is square except full-bleed dark bands and table
cells.

Borders are the primary form language: a single 1px `{colors.line}` stroke defines cards,
inputs, selects, stamps, capability chips, pagination buttons, institution cells, and every
divider. On dark surfaces the equivalent is `rgba(255,255,255,0.1)` to `0.12`. Focus is a
2px Signal Blue outline at a 3px offset with a 2px radius, applied globally via
`:focus-visible`.

The one non-rectilinear form in the system is the prose list bullet: a 6px square rotated
45 degrees, filled with Live Cyan, sitting at the left of each unordered list item. It is a
tick mark on a trace, and it is the reason unordered lists in articles feel like part of
the same world as the hero.

## Components

### Buttons
- **Shape:** compact rounding (`{rounded.md}`, 0.55rem), 0.7rem by 1.35rem padding, 1px
  transparent border so all variants share a box model. `.btn-sm` reduces to 0.45rem by
  0.85rem at 0.82rem type.
- **Primary:** Signal Blue fill, white text, seated with the button-rest shadow. Hover
  moves to Deep Blue, lifts 1px, and adds the blue glow over 0.2s on `--ease-out-expo`.
- **Ghost:** transparent with a hairline border and Brand Navy text; hover shifts both
  border and text to Signal Blue with no fill and no lift. Used for secondary actions,
  "view all" links, and pagination edges.
- **On dark:** 8% white fill with a 22% white border; hover inverts to a solid white fill
  with navy text. This is the only correct secondary button on ink or navy surfaces.
- **Focus:** inherits the global 2px Signal Blue outline at 3px offset.
- Buttons carry a leading or trailing icon at 15 to 16px with a 0.5rem gap. Inline text
  links inside cards (`.svc-link`) widen their gap from 0.35rem to 0.55rem on hover, which
  reads as the arrow stepping forward.

### Chips
- **Taxonomy tags:** mono at 0.68rem, `{rounded.sm}`, 0.2rem by 0.55rem padding, tinted
  background with a matching darker text color. Three fixed facets: species (amber), method
  (blue), research area (green). Neutral gray is the untyped default.
- **Status badges:** the same shape and type, capitalized, with green for active, gray for
  completed, amber for pending, and blue for anything else.
- **Stamps:** a mono date or count in Soft Ink inside a hairline border at `{rounded.xs}`.
  Used at the top right of a portfolio card and beside a page title as a result count.
- **Capability chips:** larger, 0.55rem by 0.9rem on a paper fill with a hairline border and
  a leading blue icon. Not interactive.

### Cards / Containers
- **Corner Style:** `{rounded.xl}` (0.9rem), the largest radius in the system.
- **Background:** Surface White on Cool Paper; inside a white `.section--alt`, cards still
  read because of the hairline border.
- **Shadow Strategy:** none at rest. `.card-hover` adds the card-hover shadow, a 3px lift,
  and a border blended 45% toward Signal Blue, all on a 0.25s expo ease.
- **Border:** 1px `{colors.line}`.
- **Internal Padding:** 1.8rem for feature and service cards, 1.5rem for portfolio cards,
  1.3rem for post cards where the image already carries the top edge.
- Post cards clip a 16:9 image at the top and scale it to 1.04 over 0.4s on hover, the only
  image motion in the system.

### Inputs / Fields
- **Style:** Surface White fill, 1px hairline border, `{rounded.md}`, 0.7rem by 0.9rem
  padding, Inter at 0.92rem to 0.95rem.
- **Focus:** border shifts to Signal Blue and a 3px Wash Blue halo appears. Search fields
  apply this to the wrapper via `:focus-within` so the icon and input read as one control.
- **Selects:** the same shell at 0.85rem. A select with a value applied takes `.is-set`,
  which fills it with Wash Blue, borders it Signal Blue, and sets weight 500, so an active
  filter is visible without a separate chip row.
- **Search:** a hairline shell containing a 17px Soft Ink magnifier and a borderless input.

### Navigation
- Sticky, with an 82% Cool Paper fill and a 12px backdrop blur over a hairline bottom
  border, at a fixed 4.25rem height that gives the 40px logo mark 14px of clearance.
- Links are Inter 500 at 1.08rem, navy, on a 0.45rem radius. Hover fills with Wash Blue and
  colors the text Signal Blue; the active route is Signal Blue text with no fill.
- Dropdowns open on hover and focus-within, sliding up 4px into place over 0.16s with the
  floating-menu shadow at `{rounded.lg}`.
- Below 960px the nav collapses to a burger opening a Surface White panel of flattened
  links, each separated by a soft hairline, closing on navigation and on any resize back
  past the breakpoint.
- A skip link sits above everything, hidden off-canvas at `left: -999px` until focused.

### The Signal Field (signature component)

A stack of electrophysiology channels rendered as real SVG paths, generated at build time
by a seeded pseudo-random walk so the geometry is stable across builds. Each channel gets a
baseline noise trace at `rgba(127,224,240,0.28)` over a `rgba(255,255,255,0.06)` channel
rule, with occasional spikes. One channel (index 2) is the live one: 2px wide, stroked with
a horizontal gradient that fades to transparent at both edges, glowing at 6px, and animated
with a `stroke-dasharray` sweep of 6 seconds linear infinite that switches off entirely
under `prefers-reduced-motion`.

In the hero it sits at 55% opacity behind the content, masked so it fades out from the left
40% of the viewport and leaves the headline on clean ink. It is decorative and correctly
marked `aria-hidden`. This component is the system's thesis: when a surface needs visual
interest, generate it from the subject matter rather than importing it.

## Do's and Don'ts

### Do:
- **Do** open every section and interior page with a mono eyebrow above the heading, with
  its 1.6rem leading dash intact.
- **Do** set machine-produced values (dates, counts, ids, tags, statuses, page numbers) in
  JetBrains Mono, and human sentences in Inter.
- **Do** define structure with 1px `{colors.line}` hairlines. Reach for a border before you
  reach for a shadow or a fill.
- **Do** keep Live Cyan to roughly one element per viewport, on something genuinely live,
  active, or selected. Use Cyan Soft when the accent must carry text on dark.
- **Do** keep dark surfaces at the frame of a page: the hero opens, a stat band or single
  band interrupts, the footer closes. Interior content stays on paper or white.
- **Do** pin card action rows with `margin-top: auto` so cards in a row end level, and clamp
  variable-length descriptions rather than letting them set the card height.
- **Do** honor `prefers-reduced-motion`; the global rule collapses transitions and the
  Signal Field drops its sweep entirely.
- **Do** generate visuals from the subject matter (traces, real logos, real photographs,
  hairline data tables) when a surface needs interest.

### Don't:
- **Don't** give a resting element a shadow. Only primary buttons and genuinely floating
  menus carry shadow at rest; everything else earns it on hover or focus.
- **Don't** introduce a fourth typeface, or use monospace for a sentence a person wrote.
- **Don't** reassign the facet colors. Amber is species, green is research area, blue is
  method, and that legend holds everywhere it appears.
- **Don't** add gradient blobs, mesh backgrounds, floating 3D mockups, stock photographs of
  scientists, or illustrations standing in for data. The previous generic-SaaS look is the
  anti-reference, not a fallback.
- **Don't** stack dark sections through the middle of a page, and don't put a dark band
  directly against the footer.
- **Don't** exceed `{rounded.xl}` (0.9rem) on any surface, or use pill-shaped buttons.
- **Don't** widen the container past 76rem or raise the 20ch cap on section titles; shorten
  the title instead.
- **Don't** use short tight shadows. Every shadow in this system has a large blur and a
  large negative spread.
