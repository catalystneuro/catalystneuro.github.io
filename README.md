# CatalystNeuro Website (redesign)

A ground-up redesign of the CatalystNeuro website. The visual identity is grounded in the
subject matter of neurophysiology (a live electrophysiology-trace hero motif, a technical
type system, monospace data labels) while keeping the existing logo and brand palette
(navy `#101642`, blue `#1466A7`). All content is carried over from the previous site.

See [`SPEC.md`](./SPEC.md) for the full content and structure specification.

## Stack

- **[Astro](https://astro.build)** — static-first, content-collection driven. Replaces the
  previous Vite + React SPA/SSG. Every route is a real pre-rendered HTML page.
- **Tailwind CSS v4** (`@tailwindcss/vite`) with a custom design system in
  `src/styles/global.css` (`@theme` tokens).
- **Shiki** for build-time code syntax highlighting (no client JS).
- **Self-hosted variable fonts** via `@fontsource-variable`: Space Grotesk (display),
  Inter (body), JetBrains Mono (data/eyebrows/code).
- Small islands of vanilla JS for the only interactive pieces: mobile nav, blog search,
  conversion/funded-project filters, institution "show more", and blog galleries.

## Content model

Markdown content collections are defined in `src/content.config.ts`:

| collection | source | pages |
|---|---|---|
| `blog` | `src/content/blog/*.md` | `/blog`, `/blog/[slug]` |
| `conversions` | `src/content/nwb-conversions/*.md` | `/nwb-conversions` |
| `software` | `src/content/software/*.md` | `/nwb-software`, `/analysis-software`, `/guides`, `/guides/[id]` |
| `fundedProjects` | `src/content/funded-projects/*.md` | `/funded-projects`, `/funded-projects/[project]` |
| `openings` | `src/content/openings/*.md` | `/openings`, `/openings/[id]` |

Non-markdown content: `src/data/team.json` (team roster), `src/data/about.md` (About body),
and `src/data/site-content.ts` (publications, institutions, partners, featured articles,
testimonials, homepage copy, and the conversion filter vocabularies — all previously
hardcoded in React components).

Binary assets live in `public/images/` and are served natively (no build-time copy step).

## Blog galleries

Blog markdown keeps the original gallery syntax:

```
<!-- gallery-start aspect="16/9" folder="retreat-2024/lucca" -->
<!-- gallery-end -->
```

`src/plugins/remark-galleries.mjs` expands these at build time — folder mode reads the image
files from `public/images/<folder>/`; list mode reads the `- url` lines. The output is
hydrated into an accessible carousel by `src/components/GalleryRuntime.astro`.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Integrations

- **Newsletter:** Netlify Forms (`form-name: newsletter`), success page at `/success`.
- **Consultation:** Calendly inline embed (`https://calendly.com/ben-dichter`).
- **Video:** YouTube (About page, blog galleries).
- **Sitemap:** `@astrojs/sitemap` → `dist/sitemap-index.xml`.
