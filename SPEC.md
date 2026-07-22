# CatalystNeuro Website — Content & Structure Specification

This document specifies the complete contents of the CatalystNeuro website as of the
migration snapshot taken from `catalystneuro.github.io`. It is written so that the site
can be faithfully rebuilt on a new stack without reference to the old React/Vite codebase.

It covers three things:

1. **Content inventory and schemas** — every collection, its file format, and the exact
   fields (the "YAML" / frontmatter and JSON that is carried over).
2. **Content-to-page distribution** — which content appears on which page, and how.
3. **Non-inferable site information** — navigation, footer, hardcoded marketing copy,
   design tokens, third-party integrations, SEO, and asset-serving rules that do not live
   in any content file and must be preserved explicitly.

---

## 1. Site Overview

CatalystNeuro is a research software engineering consultancy for neurophysiology. The site
is a marketing + portfolio + content site. Its jobs, in priority order:

1. Convert lab PIs and funders into a **consultation request**.
2. Establish credibility through the **portfolio** (NWB conversions, funded projects,
   publications, institutions, testimonials).
3. Showcase the **open-source software** the team builds and maintains.
4. Publish **blog** content (technical articles, release notes, team retreats).
5. Recruit (**openings**) and introduce the **team**.

**Brand constants (do not change):**
- Logo: the "CATALYST NEURO" wordmark with the circular CN monogram
  (navy `#101642` + blue `#1466A7`). Carried over as `public/images/logo.png`.
- Primary blue `#1466A7`, dark navy `#101642`.
- Company name: **CatalystNeuro**. Canonical URL: `https://catalystneuro.com`.
- Contact email: `info@catalystneuro.com`.
- Mailing address: CatalystNeuro, 150 E B St Lbby #1810 SMB#45673, Casper, WY 82601.
- GitHub org: `https://github.com/catalystneuro`.
- LinkedIn: `https://www.linkedin.com/company/catalyst-neuro`.
- Consultation booking: Calendly `https://calendly.com/ben-dichter`.

---

## 2. Content Inventory & Schemas

Content that carries over falls into **six markdown collections**, **one JSON file**, one
standalone markdown file, and a body of **binary assets** (images/PDFs). All frontmatter is
YAML. Below, each collection lists its fields, whether they are required, and notes.

### 2.1 `blog/` — Blog posts (10 files, markdown body)

Rendered at `/blog` (index) and `/blog/{slug}` (slug = filename without `.md`).

| field | type | required | notes |
|---|---|---|---|
| `title` | string | yes | Post title. |
| `date` | string `YYYY-MM-DD` | yes | Used for sort (newest first) and display. |
| `description` | string | yes | Card + meta description. |
| `image` | string path | yes | Banner/card image, e.g. `/images/blog/…`. |
| `readTime` | string | no | e.g. `"15 min read"`. |
| `author` | string | no | e.g. `"Benjamin Dichter"`. |
| `keywords` | string[] | no | Rendered as pills; also searchable. |

**Body specifics that must be preserved:**
- **Code fences** with language info strings (```` ```python ````) are syntax-highlighted.
  Both fenced and inline code appear across posts (e.g. `remfile-cpp-streaming…`,
  `introducing-zarr-matlab`, `neuroconv-0.9.0-release`).
- **Image galleries** use HTML-comment markers embedded in the markdown:
  ```
  <!-- gallery-start aspect="16/9" folder="retreat-2024/lucca" -->
  <!-- gallery-end -->
  ```
  Two modes:
  - **Folder mode** (`folder="…"`): expands to *every* image file under
    `images/{folder}/`, sorted by locale. Folder names must match the on-disk path
    **verbatim, including spaces and typos** (e.g. `retreat-2023/tour of girona`,
    `retreat-2023/dali musem`).
  - **List mode** (no `folder`): the `- url` lines between the markers are explicit items.
  - Optional attributes: `aspect` (default `16/9`), `width` (e.g. `500px`).
  - Gallery items auto-detect type: YouTube URL → embed; `.mp4`/`.webm` → `<video>`;
    otherwise `<img>`. The gallery is a carousel (prev/next + dots) when >1 item.
- Posts in use with galleries: `retreat-2022` (list mode, 3 items), `retreat-2023`
  (7 folder galleries), `retreat-2024` (6 folder galleries), `retreat-2026` (5 folder
  galleries), `teaching-open-neuroscience-abds` (1 list-mode gallery, `width="500px"
  aspect="3/4"`).

Current posts (newest first by `date`): `retreat-2026-south-of-france`,
`virtual-data-standards` (2025-12-19), `neuroconv-0.9.0-release`,
`remfile-cpp-streaming-hdf5-from-cpp`, `introducing-zarr-matlab`,
`s-index-challenge-honorable-mention`, `teaching-open-neuroscience-abds`,
`retreat-2024-montecatini-italy`, `retreat-2023-catalonia-spain`,
`retreat-2022-douro-portugal`.

### 2.2 `nwb-conversions/` — Lab conversion portfolio (62 files)

Rendered at `/nwb-conversions`. Body is usually empty; all data is frontmatter.

| field | type | required | notes |
|---|---|---|---|
| `lab` | string | yes | PI / lab name, e.g. `"Gyorgy Buzsaki"`. |
| `institution` | string | yes | e.g. `"New York University"`. |
| `description` | string | yes | Paragraph describing the conversion work. |
| `species` | string | yes (62/62) | e.g. `Rat`, `Mouse`, `Human`. Filterable. |
| `date` | string `YYYY-MM` | yes | Displayed as a badge; used for sort. |
| `tags` | string[] | 61/62 | Method + research-area tags, e.g. `["electrophysiology", "spatial navigation"]`. Filterable. |
| `github` | string \| string[] | 58/62 | One or many repo URLs. |
| `dandi` | object[] | 31/62 | Each `{ url, name }` (dandiset id + title). Rendered as DANDI links. |
| `funded_project` | string | 59/62 | Links the conversion to a funded project (see §2.4 and the remap table in §3.7). |

**Filter facets derived from this collection** (see NWB Conversions page, §3.5): search text,
Method, Research Area, Institution, Species, Funded Project, plus Group-by and Sort-by.
The Method and Research-Area vocabularies are matched against `tags` and are enumerated in
§3.5.

### 2.3 `software/` — Software & guides (16 files, markdown body)

One collection powers **four** views via the `type` field.

| field | type | required | notes |
|---|---|---|---|
| `name` | string | yes | Display name. |
| `description` | string | yes | Card/summary text. |
| `type` | `core` \| `extension` \| `analysis` \| `guide` | yes | Routes the item to a section/page. |
| `status` | string | for software | e.g. `"Released"`. Shown as `Status: …`. |
| `image` | string path | no | Logo, e.g. `/images/software/neuroconv_logo.png`. |
| `github` | string | for software | Repo URL. |
| `docs` | string | no | Docs URL (software) **or** guide URL (guides). |
| body | markdown | for guides | Guide pages (`/guides/{slug}`) render the body. |

`type` distribution (current):
- **core** (4) → NWB Software page "Core Tools": NeuroConv, NWB GUIDE, NWB Inspector, NWB Widgets.
- **extension** (4) → NWB Software page "Neurodata Extensions": NDX Anatomical Localization,
  NDX Binned Spikes, NDX Fiber Photometry, NDX Sound.
- **analysis** (6) → Analysis Software page: GuPPy, Neo, SpikeInterface, torch_brain, VAME, Voluseg.
- **guide** (2) → Guides page + `/guides/{slug}` detail: `globus-guide` (Sharing Data with
  CatalystNeuro), `nwb-engagement-guide` (NWB Adoption Engagement Guide).

### 2.4 `funded-projects/` — Grants (14 files, markdown body)

Rendered at `/funded-projects` (index) and `/funded-projects/{slug}`
(slug = `title` lowercased, non-alphanumerics → `-`).

| field | type | required | notes |
|---|---|---|---|
| `title` | string | yes | e.g. `"DANDI Archive NIH Grant"`. |
| `funder` | string | yes | e.g. `"National Institutes of Health"`. Filterable. |
| `status` | string | yes | `active` \| `completed` \| `pending` \| other → badge color. |
| `startDate` | string `YYYY-MM-DD` | yes | Sorted desc; displayed `Started {Month yyyy}`. |
| `description` | string | yes | Summary. |
| `image` | string path | no | Funder/project logo. |
| `github` | string[] | no | Repo URLs shown as buttons (label = repo name). |
| body | markdown | no | Long description on the detail page. |

The detail page also shows an **"Affiliated NWB Conversions"** block: every
`nwb-conversions` entry whose `funded_project` matches this project's title (subject to the
remap in §3.7).

### 2.5 `openings/` — Job postings (2 files, markdown body)

Rendered at `/openings` (index) and `/openings/{id}`.

| field | type | required | notes |
|---|---|---|---|
| `id` | string | yes | Slug for the detail route. |
| `title` | string | yes | |
| `type` | string | yes | e.g. `"Full-time"`. |
| `location` | string | yes | e.g. `"Remote"`. |
| `enabled` | boolean | no | Only `enabled !== false` postings are listed. Both current postings are `enabled: false` → the index shows the empty state. |
| `description` | string | yes | |
| `image` | string url | yes | Hero image. |
| `responsibilities` | string[] | yes | Bulleted list on detail page. |
| `requirements` | string[] | yes | Bulleted list on detail page. |

### 2.6 `team.json` — Team roster (single JSON file, 14 members)

Object with a `members` array. Rendered on `/team`, split by `isActive`.

| field | type | required | notes |
|---|---|---|---|
| `name` | string | yes | e.g. `"Ben Dichter, PhD"`. |
| `isActive` | boolean | yes | `true` → current team; `false` → "Previous Team Members". |
| `role` | string | yes | Former members use `"Former …"` roles. |
| `description` | string | yes | Bio. |
| `image` | string path | active only | **Alumni intentionally have no image.** |
| `github` | string | yes (all) | |
| `orcid` | string | 13/14 | Missing only for Vincent Provosto. |
| `personalPage` | string | Ben, Luiz | |
| `twitter` | string | Ben | |
| `bluesky` | string | Ben | |

Order matters (rendered in array order). Active (8): Ben Dichter (Founder), Luiz Tauffer
(Lead Neurodata Scientist), Alessio Buccino (Lead Neurodata Scientist), Heberto Mayorquin
(Sr. Research Software Engineer), Paul Adkisson-Floro (RSE), Szonja Weigl (RSE),
Alessandra Trapani (RSE), Eivind Hennestad (RSE). Former (6): Cody Baker, Julia Sprenger,
Vincent Provosto, Garrett Flynn, Felix Pei, Saksham Sharda.

### 2.7 `about.md` — About page body (single markdown file)

Frontmatter: `title`. Body sections (H2/H3): **Our Mission**, **Who We Are**,
**Our Approach**, **Our Services** (H3: Data Standardization, Software Engineering, AI in
Neuroscience). Contains inline links to nwb.org, dandiarchive.org, NWB Inspector,
NeuroConv, NWB GUIDE. Full copy carried over verbatim.

### 2.8 Data that is NOT in content files (hardcoded in the old site)

These must be treated as content and externalized (recommended: JSON/TS data modules) since
they are not inferable from the markdown/JSON above. Full copy is in §3 and §4.

- **Publications** (4 entries) — title, authors, journal, year, doi, url, abstract.
- **Institutions banner** (30 logos) — name + `/images/institutions/{name}_logo.png`.
- **Partners banner** (6 logos) — NIH, Allen Institute, Kavli, MJFF, Simons, MIT.
- **Featured In** (2 external articles).
- **Testimonials** (1 quote — Thomas Clandinin, Stanford).
- **Homepage hero / WhyUs / Services** marketing copy and stats.
- **Nav & footer** link structures.
- **Contact page** method cards.

### 2.9 Binary assets (`images/`, 220 files + PDFs)

Served under `/images/…`. Subfolders and counts:

| folder | files | contents |
|---|---|---|
| `team/` | 8 | active-member headshots |
| `institutions/` | 30 | `{name}_logo.png` |
| `sponsors/` | 8 | partner/funder logos (NIH, Allen, Kavli, MJFF, Simons, MIT, …) |
| `software/` | 19 | tool logos + `guides/` subfolder |
| `funded-projects/` | 5 | project logos |
| `blog/` | 4 | post banners |
| `stock/` | 5 | `neuron-microscopy`, `circuit-board`, `global-network`, `server-data`, `software-engineering` |
| `ABDS2024/` | 3 | teaching post images |
| `retreat-2022/` | 11 | flat |
| `retreat-2023/` | 54 | subfolders: `villa`, `meetings`, `tour of girona`, `dali musem`, `soccer`, `out to dinner`, `beach and castle` |
| `retreat-2024/` | 52 | subfolders: `villa`, `meetings`, `lasagna`, `lucca`, `team-building`, `wine-tasting` |
| `retreat-2026/` | 20 | subfolders: `villa`, `sessions`, `boat`, `coast`, `social` |

PDFs: `catalystneuro-fcoi-policy.pdf` (linked in footer), `s-index-submission.pdf`.
Other public assets: `favicon.ico`, `social-card.png` (default OG image).

**Serving note (old site quirk, fixed in rebuild):** In the old repo, `images/` lived at
the repo root *outside* Vite's `public/`, and was copied to `dist/images/` by a post-build
`copy-assets.js` script (galleries additionally resolved via `import.meta.glob`). The
rebuild moves `images/` into `public/images/` so it is served natively in dev and build with
no copy step.

---

## 3. Content-to-Page Distribution

Routes and their content sources. All inner pages share a header (`h1` + subtitle) over a
soft top gradient.

### 3.1 `/` Home
Section order: **Hero → Why Us → Services → Partners → Institutions → Featured In →
Testimonials → Latest Posts → Newsletter**. All copy in §4.1. Latest Posts pulls the 3
newest `blog/` entries.

### 3.2 `/about`
`about.md` body rendered as prose, followed by "Life at CatalystNeuro" + YouTube embed
(`videoId=uRYOrGt1wMo`).

### 3.3 `/team`
`team.json`. Active members as full cards (photo, role, bio, social links); former members
in a "Previous Team Members" grid (no photo; GitHub + ORCID only).
Subtitle: "Meet the skilled professionals behind CatalystNeuro's innovative solutions."

### 3.4 `/blog` and `/blog/{slug}`
Index: search box (title/description/keywords) + 6-per-page pagination, cards with image,
date, readTime, keywords. Post: full markdown with syntax-highlighted code, inline galleries,
tables, heading anchors. Subtitle on post = `Published on {date} • {readTime} • By {author}`.

### 3.5 `/nwb-conversions`
`nwb-conversions/` collection. Subtitle: "We've collaborated with leading research
institutions worldwide to advance neuroscience data standardization and analysis."
- **Filters:** search; Method; Research Area; Institution; Species; Funded Project;
  Group by (none/institution/method/area/species); Sort by.
- **Method vocabulary** (matched against `tags`): electrophysiology, calcium imaging,
  behavioral tracking, brain-computer interface, fiber photometry, pose estimation, video,
  optogenetics.
- **Research-area vocabulary:** visual processing, motor control, social behavior, spatial
  navigation, Parkinson's disease, autism.
- **Card:** date badge, lab, institution (filter link), funded_project link, species tags,
  description, method/area tags, GitHub button(s) (single or dropdown), DANDI button(s).
- **9 per page**, "Showing X of Y entries", pagination.

### 3.6 `/nwb-software`, `/analysis-software`, `/guides`, `/guides/{slug}`
All from `software/` filtered by `type` (§2.3).
- **NWB Software:** "Core Tools" (`core`, with logo + status + GitHub + Docs) and
  "Neurodata Extensions" (`extension`, GitHub only) + a link block to Guides.
- **Analysis Software:** `analysis` cards (optional logo, status, GitHub, optional Docs).
- **Guides:** `guide` cards → "View Guide" (external `docs`). Detail route renders the
  guide's markdown body.

### 3.7 `/funded-projects` and `/funded-projects/{slug}`
`funded-projects/`. Index: search + Status + Funder + Sort filters, 6-per-page, status
badges (active=green, completed=gray, pending=yellow, else blue). Detail: body + GitHub
buttons + **Affiliated NWB Conversions**.

**Funded-project → conversion matching remap** (title mismatches to reconcile):
`"ASAP NWB Adoption"` → `"Aligning Science Across Parkinson's"`; `"SCGB NWB Adoption"`;
`"NYU Librarians NWB Adoption"` → `"NYU Librarians"`; `"Ripple U19 NWB Adoption"` →
`"Ripple U19"`.

### 3.8 `/publications`
Hardcoded list of 4 (§4.4). Cards: title, `journal (year)`, authors, abstract, "Read Paper"
(→ url), "DOI" (→ doi.org/{doi}).

### 3.9 `/openings` and `/openings/{id}`
`openings/`, filtered `enabled !== false`. Currently both disabled → empty state:
"We currently don't have any open positions. Please check back later!"
Detail: image, title, `{type} • {location}`, description, Responsibilities, Requirements,
"Apply Now".

### 3.10 `/contact`, `/consultation`, `/success`, 404
- **Contact:** method cards (§4.5) + newsletter form.
- **Consultation:** Calendly inline embed (`https://calendly.com/ben-dichter`).
- **Success:** post-newsletter thank-you.
- **404:** "Page Not Found" + Go Home / Contact Support.

---

## 4. Non-Inferable Copy & Structure (verbatim)

### 4.1 Homepage

**Hero.** Eyebrow pill (→ `/analysis-software`): `New` + "Open source neurophysiology tools
for researchers". H1: "Empowering Neurophysiology Data" / "for Open Science" (second line in
blue). Sub: "We help research labs standardize, share, and publish their neurophysiology
data through custom software solutions and expert consulting." CTAs: "Request Consultation"
(→ `/consultation`), "See Conversion Work" (→ `/nwb-conversions`). Visual card badges:
"Neural data pipeline" / "NWB-ready outputs for sharing and analysis"; "60+" / "research
labs supported". Three steps: **Standardize** — "Convert complex lab formats to NWB";
**Validate** — "Build tested, documented data pipelines"; **Publish** — "Prepare datasets
for DANDI and reuse".

**Why Us.** Stats: **60+** Research Labs, **14** Funded Projects, **25+** Partner
Institutions. H2: "Research Software Engineers for Neuroscience". Para: "We bridge the gap
between academic research and professional software engineering. Our team combines deep
neuroscience domain expertise with production-grade development practices — delivering
solutions that are both scientifically rigorous and built to last." Cards: **Domain
Experts** — "Our engineers have published research and understand the nuances of
neurophysiology data."; **100% Open Source** — "No vendor lock-in. Every tool we build is
open source and belongs to the community."; **Production Quality** — "Professional testing,
documentation, and long-term maintainability. Not just research prototypes."

**Services.** H2: "Our Services". Para: "CatalystNeuro has worked successfully with diverse
scientific research groups in a variety of capacities. All work we do with scientific
research groups is open source, so our team can fit seamlessly with research groups without
worry of expensive licensing fees or vendor lock-in." Three service cards:
- **Open Data Management** — "Convert your data to Neurodata Without Borders (NWB) and
  publish on the DANDI Archive." → "View Our Work" `/nwb-conversions`. Features: Open source
  conversion pipeline; Compliance with government and foundation funders; Includes notebooks
  demonstrating data use; Experience with 60+ labs.
- **Software Engineering** — "Integrate existing analysis, visualization, and data
  management tools with open data via NWB and DANDI." → "View Our Work" `/analysis-software`.
  Features: Professionalize software through packaging, testing, and documentation; Create
  reproducible workflows for data processing and analysis.
- **AI in Neuro** — "Leverage AI and machine learning to accelerate neuroscience research."
  → "Get Started" `/contact`. Features: Develop agents to automate processing steps; Data
  curation for building neural foundation models; Training in agentic code generation.
- Additional Capabilities tiles: Cloud Integration, Team Training, Data Analytics, Open Source.

**Partners** ("Our Partners"): NIH, Allen Institute, Kavli Foundation, Michael J. Fox
Foundation, Simons Foundation, MIT. Logos in `/images/sponsors/`.

**Institutions** ("Working with Labs at 30+ Institutions"): 30 logos, show 15 then expand.
Order: Stanford, Harvard, MIT, Princeton, Yale, Columbia, NYU, Berkeley, Northwestern, UCSF,
Johns Hopkins, Salk Institute, University of Washington, University of Pennsylvania, UT
Austin, Emory, Mount Sinai, Cornell, University of Pittsburgh, Karolinska Institutet,
International Brain Lab, Case Western Reserve, Vanderbilt, University of Edinburgh, Boston
University, Janelia Research Campus, Brandeis, UC Santa Barbara, UC San Diego, Allen Institute.

**Featured In** (2, both *The Transmitter*, by Benjamin Dichter):
- "Neuroscience's open data revolution is just getting started" — "How open data standards
  are transforming neuroscience research" —
  `https://www.thetransmitter.org/open-neuroscience-and-data-sharing/neurosciences-open-data-revolution-is-just-getting-started/`
- "Should neuroscientists vibe code?" — "Exploring the role of AI in scientific programming" —
  `https://www.thetransmitter.org/craft-and-careers/should-neuroscientists-vibe-code/`

**Testimonials** ("What Our Clients Say"), single quote: "Working with the team at
CatalystNeuro was a terrific, highly productive experience. They revamped a bespoke
volumetric imaging pipeline we had developed, integrated it with our behavioral data, and
made it all compatible with NWB. My lab has already used their CatalystNeuro pipeline in
publication, and will undoubtedly find their NWB toolkit of great use in the future." —
**Dr. Thomas Clandinin**, Professor, Stanford University.

**Latest Posts** ("Latest News & Events"): "Stay updated with our latest developments,
research breakthroughs, and community events." 3 newest posts + "View All Posts" → `/blog`.

**Newsletter** ("Stay Updated"): "Subscribe to our newsletter for the latest news and
updates." Email + "Subscribe". Success: "Thanks for subscribing! We'll keep you updated with
our latest news."

### 4.2 Navigation

Logo → `/`. Menu:
- **About** ▾: About `/about`, Team `/team`, Openings `/openings`
- **Software** ▾: NWB Software `/nwb-software`, Analysis Software `/analysis-software`, Guides `/guides`
- **Portfolio** ▾: NWB Conversions `/nwb-conversions`, Funded Projects `/funded-projects`, Publications `/publications`
- **Blog** `/blog`
- **Contact** `/contact`
- GitHub icon → `https://github.com/catalystneuro`
- Button "Request Consultation" → `/consultation`

Sticky, translucent/blurred. Mobile: hamburger with flattened items.

### 4.3 Footer

Dark navy. Four columns:
1. **Company:** About `/about`, Team `/team`, Careers `/openings`, Contact `/contact`
2. **Resources:** Blog `/blog`, Funded Projects `/funded-projects`, NWB Software
   `/nwb-software`, Analysis Software `/analysis-software`
3. **Connect:** GitHub, LinkedIn
4. **Contact:** "Have questions? Get in touch with us." + `info@catalystneuro.com`

Bottom bar: "© {year} CatalystNeuro. All rights reserved." + FCOI Policy →
`/catalystneuro-fcoi-policy.pdf`.

### 4.4 Publications (verbatim)

1. **NeuroConv: Streamlining Neurophysiology Data Conversion to the NWB Standard** —
   Mayorquin H, Baker C, Adkisson-Floro P, Weigl S, Trappani A, Tauffer L, Rübel O, Dichter B
   — *SciPy Proceedings* (2025) — DOI `10.25080/cehj4257` — url
   `https://proceedings.scipy.org/articles/cehj4257`. Abstract: "Modern neurophysiology
   generates increasingly complex, multimodal datasets that require standardized formats for
   effective sharing and reuse. We present NeuroConv, an open-source Python library that
   automates the conversion of neurophysiology data from 47 distinct formats into NWB through
   a unified, modular architecture."
2. **Facilitating analysis of open neurophysiology data on the DANDI Archive using large
   language model tools** — Magland JF, Ly R, Rübel O, Dichter B — *Scientific Data* (2025) —
   DOI `10.1038/s41597-025-06285-x` — url
   `https://www.nature.com/articles/s41597-025-06285-x`. Abstract: "We introduce an
   AI-powered, agentic chat assistant and a notebook generation pipeline for exploring DANDI
   datasets. The system leverages large language models (LLMs) to guide users through data
   access, visualization, and preliminary analysis of NWB neurophysiology data."
3. **Neurosift: DANDI exploration and NWB visualization in the browser** — Magland J, Soules
   J, Li AE, Dichter B — *Journal of Open Source Software* (2024) — DOI `10.21105/joss.06590`
   — url `https://joss.theoj.org/papers/10.21105/joss.06590`. Abstract: "Neurosift is a
   browser-based tool for exploring the DANDI Archive and visualizing NWB (Neurodata Without
   Borders) neurophysiology files. It provides interactive visualizations for various data
   modalities including electrophysiology, calcium imaging, and behavioral data."
4. **The Neurodata Without Borders ecosystem for neurophysiological data science** — Rübel O,
   Tritt A, Ly R, Dichter BK, Ghosh S, Niu L, Baker P, Soltesz I, Ng L, Svoboda K, Frank L,
   Bouchard KE — *eLife* (2022) — DOI `10.7554/eLife.78362` — url
   `https://elifesciences.org/articles/78362`. Abstract: "The neurophysiology of cells and
   tissues are monitored electrophysiologically and optically in diverse experiments and
   species. Understanding the brain requires integration of data across this diversity,
   requiring data to be findable, accessible, interoperable, and reusable (FAIR). We describe
   design and implementation principles for a language for neurophysiology data through
   open-source software (Neurodata Without Borders, NWB)."

### 4.5 Contact page method cards
- **Email Us** — `info@catalystneuro.com` — "We typically respond within 1-2 business days"
- **Schedule a Consultation** — "Book a free 30-minute call to discuss your project" →
  "Book a Call" `/consultation`
- **Mailing Address** — "CatalystNeuro / 150 E B St Lbby #1810 SMB#45673 / Casper, WY 82601"
- **Connect With Us** — GitHub + LinkedIn

### 4.6 SEO defaults
- Site name: "CatalystNeuro". Base URL: `https://catalystneuro.com`.
- Default title: "CatalystNeuro - Neurophysiology Data & Software Solutions".
- Per-route title format: "{Page} — CatalystNeuro".
- Default description: "CatalystNeuro empowers neuroscience labs with data standardization,
  NWB conversions, spike sorting pipelines, and open-source software tools for neurophysiology
  research."
- Default OG/Twitter image: `/social-card.png`. Canonical uses trailing slash.

---

## 5. Integrations & Backend Behavior
- **Newsletter:** Netlify Forms (`form-name: newsletter`). Old site also had a
  `newsletter-signup` Netlify Function that re-POSTed to Netlify Forms; the form can post
  directly. Success route: `/success`.
- **Consultation:** Calendly inline embed, `https://calendly.com/ben-dichter`.
- **Video:** YouTube embeds (About page `uRYOrGt1wMo`; galleries may embed YouTube).
- **Analytics:** present in old site (re-add provider as needed).

## 6. Rebuild Design Direction (summary)
The rebuild keeps the logo and brand palette (navy `#101642`, blue `#1466A7`) and all
content above, but replaces the generic SaaS visual language with a design grounded in the
subject matter of neurophysiology (signal traces / spike-raster motifs, a technical type
system, monospace data labels). See the implementation for the full design system. The
backend moves from Vite + React SPA/SSG to **Astro** content collections (static-first,
native Shiki code highlighting, island hydration only for interactive pieces such as
filters, galleries, search, and the mobile menu).
