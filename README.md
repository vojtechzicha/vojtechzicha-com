# vojtechzicha.com

Personal website and CV platform of Vojtěch Zicha — solution & cloud architect.

Built with [Astro](https://astro.build) as a bilingual (EN + CZ) static site in the
"Drafting" design direction (see `prototype/`, row 2 — light & dark). The specs that
drove the rebuild live in `notes/` (`assignment.md`, `design.md`, `ideas.md`); the
pieces of content that still need the owner's attention are tracked in
`notes/content-todo.md`.

## Structure

```
src/content/          content collections (the single source of truth)
  projects/           case-study atoms — public tier only; NDA tier supported
                      by the schema but intentionally unused for now
  roles/              the 7 role profiles (selectors, not content)
  experience/         employment entries
  education/          degrees
  certifications/     credentials with short-URL links
src/data/site.ts      identity, services, skills, availability, legal, UI strings
src/components/       design components (Direction 2 "Drafting")
src/pages/            EN routes + /cs/ Czech mirror
public/               served verbatim: docs/ (certificate PDFs), files/ (CV
                      archive), _redirects (short URLs), fonts, portrait
notes/                internal documents — never deployed
prototype/            the design prototype — never deployed
```

Every localized field has the shape `{ en: …, cs: … }`. Czech is the master
authoring language; keep both in sync — never edit one without the other.

## Common edits

- **New certification** — add a 7-line YAML file to `src/content/certifications/`,
  drop the PDF into `public/docs/`, add a line to `public/_redirects`.
- **New CV PDF** — put it in `public/files/`, repoint the `/cv` line in
  `public/_redirects`.
- **Availability flag** — `availability` in `src/data/site.ts` (state + label).
- **New case study** — add a YAML file to `src/content/projects/`; it appears on
  `/work/` automatically, on the homepage if `featured: true`, and on role pages
  that list its id.
- **CV PDFs** — generated automatically at every build (no manual step):
  `scripts/generate-cv.mjs` renders `/print/` (generalist → `/cv`) and
  `/print/<role>/` (per role → `/cv-<cvSlug>`) to A4 PDFs and generates the
  redirects. Set `print: false` on a certification/education entry to keep it
  web-only. Historic PDFs stay archived in `public/files/`.

## Development & deployment

```
npm ci          # install
npm run dev     # local preview at localhost:4321
npm run build   # static build into dist/
npx astro check # type-check content against the schema
```

Deployed to Netlify via GitHub Actions: every push to `main` builds and publishes
`dist/` (only the build output is ever published — the repo root is not). PRs get
per-PR preview deploys plus the beta site.

## Confidentiality rule

No NDA-tier content (real client names, real metrics, internal notes) may be
committed to this repository. The content schema reserves the `nda` fields for a
future private-content setup (see `notes/assignment.md` §4.5).
