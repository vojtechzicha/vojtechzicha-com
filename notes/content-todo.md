# Content TODO — owner edits needed after the rebuild

*Companion to the June 2026 re-platform. Everything below ships with a safe,
factual placeholder taken from the old site / CVs — nothing invented — but each
item would make the site stronger once you replace it with the real thing.
Paths are relative to the repo root.*

## High priority — facts only you know

1. **Project periods** — `src/content/projects/*.yaml`, field `period`.
   Exact years were not on the old site, so eMan-era projects say `2022 — 2026`
   (the employment span) and freelance ones `2019 — present`. Tighten each to the
   real engagement window.
2. **Outcomes** — `src/content/projects/*.yaml`, optional field `outcome`.
   Only `mobile-platform` has one (it was in the old text). The outcome band is
   the strongest element of the case-sheet design — add one factual,
   NDA-safe line per project (e.g. "X teams onboarded", "passed security
   accreditation", "cut deploy time from A to B").
3. **Key decisions** — `src/content/projects/*.yaml`, field `decisions`
   (list of `{en, cs}`; currently empty everywhere). Per `notes/design.md`, 2–3
   "context → choice" lines per case study are what distinguish an architect's
   case study from a project description.
4. **Architecture diagrams** — `src/content/projects/*.yaml`, field `diagram`.
   `connected-car` and `loyalty-platform` carry diagrams derived from the public
   text and labelled *indicative*. Review the boxes/labels for accuracy, and add
   diagrams to the other four projects (the YAML format is self-explanatory —
   tiers → boxes; set `group: true` for the dashed cluster).
5. **Vignette project client wording** — `src/content/projects/vignette-enforcement.yaml`.
   The old site said "Czech police and financial services"; I rendered CZ as
   "Policie ČR a finanční správa". Verify the institution naming is the one you
   want public.
6. **Availability flag** — `src/data/site.ts`, `availability`. Currently
   "Available for freelancing — project or part-time" (from the old hire-me
   banner). Set the real state; switch `state` to `'booked'` to turn the dot amber.

## Medium priority — voice & positioning

7. **Hero copy** — `src/data/site.ts`: `tagline` ("I design and deliver digital
   platforms."), `lede` ("One architect, seven roles…"), `eyebrow`, `pitch`.
   These set the voice of the whole site (design.md §3.8 — first person,
   concrete, quietly confident). Read them aloud; adjust to taste in both
   languages.
8. **Czech translations everywhere** — all `cs:` fields in `src/content/**` and
   `src/data/site.ts` were translated by me from the English originals. The
   design notes demand Czech that "must not read as translated English" — a
   native read-through of the CZ homepage and one case study (~20 min) is the
   single highest-leverage review.
9. **Role pitches & bullets** — `src/content/roles/*.yaml`. Written from CV
   facts, but these are your seven sales pitches; sharpen each `headline`,
   `pitch`, and the three `bullets`. Also reconsider the project selection and
   order per role (`projects:` — order = priority).
10. **Lens overrides** — `projects/*.yaml`, field `lenses`. Only two examples
    exist (connected-car → devops-lead, loyalty-platform → technology-leader).
    Add per-role re-wordings where a role page would benefit; everything else
    falls back to the base summary automatically.
11. **Services** — `src/data/site.ts`, `services`. Four offerings synthesized
    from the notes (review/advisory, cloud & DevOps design, fractional
    leadership, training). Confirm these are the four you sell and the order.

## Lower priority — decisions & infrastructure

12. **Booking link** — the contact CTA is currently `mailto:` only. The
    assignment recommends a Cal.com "book a 30-min call" as the primary CTA —
    create the account and I/you wire the URL into `src/data/site.ts` (one field
    + swap in `Home.astro`/`RolePage.astro`).
13. **Role-specific CVs** — every role page's "Download CV" points at the single
    `/cv` PDF. The assignment plans per-role Typst-generated PDFs (`/cv-aws`,
    `/cv-devops`…); until then this is intentional.
14. **Social links** — the old footer's Twitter/Mastodon/Facebook links were
    dropped (ideas.md flagged them as possibly dead); only LinkedIn + GitHub
    remain. Re-add any you actively use (`src/data/site.ts` + `Base.astro`).
15. **Phone & bank details** — kept public in the footer/about as before
    (deliberate invoicing-transparency choice per ideas.md §3.3). DOB was
    removed. If you want the phone behind a click-to-reveal, say so.
16. **Portrait** — reusing the old `about.jpg` (now `public/images/portrait.jpg`).
    design.md open question #5: consider a new photo matching the new identity;
    a 4:5 crop (~800×1000) fits the frame natively. Also consider a real OG
    share image (currently the portrait is used).
17. **Analytics** — none installed (the old site had none either). The notes
    recommend Plausible/GoatCounter; needs an account before wiring in.
18. **`/cs` case-study & role URLs use English slugs** (`/cs/work/connected-car/`).
    Czech slugs are possible but add routing complexity; flag if you want them.
19. **NDA tier** — schema fields (`client.nda`, `summary.nda`, `outcome.nda`)
    exist but are unused, and the repo must stay free of NDA content
    (assignment.md §4.5: private repo / submodule / encryption first). Case
    pages show the "full detail under NDA" strip — that's the only NDA surface.

## Where things live (quick map)

| Content | File |
|---|---|
| Hero, services, skills, stats, availability, legal, all UI strings | `src/data/site.ts` |
| Case studies | `src/content/projects/<slug>.yaml` |
| Role profiles | `src/content/roles/<slug>.yaml` |
| Experience / education / certifications | `src/content/{experience,education,certifications}/` |
| Short URLs (`/cv`, `/aws`, …) | `public/_redirects` |
| CV PDFs / certificate PDFs | `public/files/`, `public/docs/` |
