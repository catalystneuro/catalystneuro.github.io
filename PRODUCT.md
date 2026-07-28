# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: principal investigators running neurophysiology labs.** A PI arrives sitting on
years of data in proprietary acquisition formats, usually pushed by a specific event: a
funder data-sharing requirement, a paper that needs an accompanying dataset, a departing
postdoc who was the only person who understood the pipeline, or a reuse goal that the
current file layout makes impossible. They are evaluating whether to hire outside help
rather than assign a graduate student. They are technical but not software engineers, and
they are deciding with real budget, often grant money with reporting obligations attached.
The conversion they matter for is the consultation request.

**Close second: funders and program officers.** NIH and foundation staff, and institutional
partners, who reach the site to evaluate CatalystNeuro as a subaward recipient or
infrastructure partner. They are checking legitimacy and track record rather than shopping.
Every page must survive that scrutiny even when it is written for a PI, which in practice
means claims stay verifiable and the funded-project, publication, and portfolio evidence
stays easy to reach.

**Third: researchers and engineers arriving through the open-source ecosystem.** People who
found NeuroConv, NWB Inspector, NWB GUIDE, or a guide, and who came for documentation or
technical depth rather than for services. They are a real and growing source of traffic, and
some of them are future clients or future hires, but their needs never outrank the first two
audiences when the two conflict.

## Product Purpose

CatalystNeuro is a research software engineering consultancy for neurophysiology. It
provides the data and software engineering expertise that academic labs generally lack in
house, so that researchers can concentrate on science instead of data infrastructure. The
work is concentrated in converting lab data to the Neurodata Without Borders (NWB) standard,
publishing it on the DANDI Archive, professionalizing research software through packaging,
testing, and documentation, and increasingly in applying AI to neuroscience workflows.

The website is a marketing, portfolio, and content site. Its jobs, in priority order:

1. Convert lab PIs and funders into a consultation request.
2. Establish credibility through the portfolio: NWB conversions, funded projects,
   publications, institutions, and testimonials.
3. Showcase the open-source software the team builds and maintains.
4. Publish blog content: technical articles, release notes, and team retreats.
5. Recruit through openings, and introduce the team.

Success is a booked consultation from a qualified lab, and a funder or partner who finishes
an evaluation without needing to ask whether the organization is real.

## Positioning

The leading claim is **research software engineers for neuroscience**: published domain
scientists who also practice production-grade software engineering. That is the combination
academic labs and generalist development shops each lack, and it is what goes in a hero, a
meta description, or a first impression when only one line fits.

Three further claims are confirmed true and binding, and serve as the proof beneath the
leading one. Future work may reorder or emphasize them but must not treat any as optional
marketing language:

- **CatalystNeuro maintains the standard itself.** The team are core contributors and
  maintainers of NWB, NeuroConv, NWB Inspector, and NWB GUIDE, and work directly with the
  DANDI Archive. They are not vendors who learned the format.
- **The portfolio is public and verifiable.** 60+ labs, 30+ institutions, with public
  repositories and dandisets attached to the conversions.
- **Everything ships open source.** A for-profit organization that nonetheless releases all
  software it develops under permissive licenses, so labs keep the work and take on no
  vendor lock-in or licensing fees.

## Operating Context

- Evaluation is slow and evidence-driven. A PI or program officer typically leaves the site
  to check a GitHub repository, a dandiset, or a paper, and then returns. Outbound links to
  real artifacts are part of the conversion path, not leakage.
- Money moves on grant cycles. Inquiries cluster around funding decisions, renewals, and
  data-sharing deadlines, which means the site is often read months before any contract.
- The primary conversion action is booking a call, currently a Calendly inline embed for a
  free 30-minute consultation. Email is the secondary path.
- Visitors read on desktop in an office or lab setting more often than on a phone, but
  conference and mobile reading is real for blog and software pages.
- The organization is international and remote, and the work is delivered through public
  repositories and public archives rather than through a client portal.

## Capabilities and Constraints

- **Stack:** Astro, static-first. Every route is a real pre-rendered HTML page. Tailwind CSS
  v4 with a custom design system expressed as `@theme` tokens in `src/styles/global.css`.
  Shiki for build-time syntax highlighting, with no client-side highlighting JS.
- **Interactivity budget:** small islands of vanilla JS only, for the mobile nav, blog
  search, conversion and funded-project filters, the institutions "show more" control, and
  blog galleries. There is no client framework, and adding one is a real cost.
- **Fonts:** self-hosted variable fonts through `@fontsource-variable`. No external font CDN.
- **Content model:** markdown content collections (`blog`, `conversions`, `software`,
  `fundedProjects`, `openings`) plus `src/data/team.json`, `src/data/about.md`, and
  `src/data/site-content.ts` for publications, institutions, partners, featured articles,
  testimonials, homepage copy, and filter vocabularies. `SPEC.md` is the authoritative
  content and structure specification and should be updated when structure changes.
- **Blog galleries** use HTML-comment markers expanded at build time by
  `src/plugins/remark-galleries.mjs`. Folder names must match on-disk paths verbatim,
  including spaces and existing typos.
- **Hosting and integrations:** Netlify. Newsletter through Netlify Forms with a `/success`
  route, consultation through a Calendly inline embed, video through YouTube embeds, sitemap
  through `@astrojs/sitemap`. No CSP is currently set.
- **Assets** live in `public/images/` and are served natively, with a one-year immutable
  cache header. Roughly 220 image files plus PDFs, including large retreat photo sets.
- **Terminology is domain-specific and must stay exact:** NWB (Neurodata Without Borders),
  DANDI Archive, dandiset, NeuroConv, NWB Inspector, NWB GUIDE, neurodata extension (NDX),
  spike sorting, electrophysiology, calcium imaging, fiber photometry, pose estimation.
  These are the words the audience searches with and evaluates by. Do not soften them into
  general-audience paraphrase.

## Brand Commitments

- Name: **CatalystNeuro**, one word. Canonical URL `https://catalystneuro.com`.
- Logo: the CATALYST NEURO wordmark with the circular CN monogram. Carried at
  `public/images/logo.png`.
- Palette anchors: navy `#101642` and blue `#1466A7`. These are fixed brand values.
- Contact email `info@catalystneuro.com`. Mailing address CatalystNeuro, 150 E B St Lbby
  #1810 SMB#45673, Casper, WY 82601.
- GitHub org `https://github.com/catalystneuro`. LinkedIn
  `https://www.linkedin.com/company/catalyst-neuro`. Consultation booking
  `https://calendly.com/ben-dichter`.
- **Voice:** measured, expository, and plainly stated. Full explanatory paragraphs with
  clear topic sentences rather than punchy fragments or aphorisms. Honest and
  non-promotional, especially when comparing against others' work, and willing to concede
  trade-offs. Section headings name the topic rather than making a joke about it.
- **No em dashes anywhere in site copy.** Use commas, colons, parentheses, or separate
  sentences instead. Verify before shipping copy.

## Evidence on Hand

Real, on hand, and citable:

- **62 lab conversion entries** in `src/content/nwb-conversions/`, each with institution,
  species, methods, and in most cases public GitHub repositories and DANDI dandisets. 31 of
  the 62 carry dandiset links.
- **14 funded projects** in `src/content/funded-projects/`, including NIH and foundation
  grants, with status and start dates.
- **4 peer-reviewed publications** (`src/data/site-content.ts`): the NeuroConv SciPy
  Proceedings paper (2025), the Scientific Data paper on LLM tools for DANDI analysis
  (2025), the Neurosift JOSS paper (2024), and the eLife NWB ecosystem paper (2022).
- **30 institution logos** and **6 partner logos** (NIH, Allen Institute, Kavli Foundation,
  Michael J. Fox Foundation, Simons Foundation, MIT) in `public/images/`.
- **2 external features**, both in *The Transmitter*, by Benjamin Dichter.
- **16 software and guide entries**: 4 core tools, 4 neurodata extensions, 6 analysis
  packages, 2 guides.
- **10 blog posts**, including technical articles and four annual team retreat posts with
  large real photo libraries (`public/images/retreat-*`, roughly 137 photographs).
- **14 team members** with real headshots for the 8 active members. Alumni intentionally
  have no photo.

Absences that future work must not paper over or invent around:

- **There is exactly one testimonial** (Dr. Thomas Clandinin, Stanford). Do not fabricate
  additional quotes, and do not design a layout that requires three to look finished.
- **There are no AI case studies.** The AI in neuroscience line may cite the 2025 Scientific
  Data paper on LLM tools for DANDI as real published evidence. Beyond that publication it
  is a stated service offering, and no client AI engagement may be implied.
- **Both job openings are currently disabled**, so `/openings` shows an empty state. The
  empty state is the normal condition, not an edge case.
- No pricing, no client logos beyond the institution and partner sets already on hand, and
  no benchmark or performance claims exist. Do not create them.

## Product Principles

1. **Evidence over assertion.** Every credibility claim on this site should be one click
   from something a skeptical PI or program officer can verify: a repository, a dandiset, a
   paper, a grant. When a claim cannot be linked to an artifact, weaken the claim rather
   than dressing it up.
2. **The consultation is the conversion, and it is slow.** Design for a visitor who will
   read, leave to check the work, and return weeks later. Depth and durability of
   information beat urgency tactics, which this audience actively distrusts.
3. **Speak the field's language exactly.** Domain terminology is a credibility signal to
   this audience, not jargon to be smoothed away. Precision reads as competence.
4. **Open source is structural, not a feature bullet.** The portfolio, the software pages,
   and the outbound links to public repositories are the same argument told three ways: the
   client keeps everything, and the record is public.
5. **Leave room for AI in neuroscience to grow.** The AI service line is expanding and
   should be able to become a first-class area with its own evidence over time, rather than
   remaining permanently one card on the homepage. Build structures that can absorb that
   growth without a redesign, but do not stage evidence that does not yet exist.

## Accessibility & Inclusion

Target **WCAG 2.2 AA** as the floor. This standard was chosen during init rather than
supplied by the user: a substantial share of the work is federally funded and evaluated by
institutional partners, so AA is the level a funder or university would expect, and it is
the reasonable default for an organization whose entire argument is that data and tools
should be usable by everyone.

In practice that means: text contrast at or above 4.5:1 (3:1 for large text and meaningful
non-text elements), a visible and unambiguous focus indicator on every interactive element,
full keyboard operation of all interactive islands (mobile nav, blog search, conversion and
funded-project filters, the institutions expander, and the blog gallery carousels),
`prefers-reduced-motion` honored by any motion, correct heading order on every page, and
real alternative text on the substantive imagery including team headshots, institution
logos, and blog banners. Decorative retreat photography may use empty alt text.
