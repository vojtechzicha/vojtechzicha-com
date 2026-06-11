# Design notes — vojtechzicha.com

*Companion to `assignment.md` (content platform) and `ideas.md` (technical review).
This one is written from the designer's chair: what the site looks and feels like
today, and what the design system must become to serve role pages, microsites,
NDA tiers, and print — not just a homepage.*

---

## 1. Audit of the current design

### 1.1 What it is

A 2019 Colorlib "ftco" portfolio theme, lightly personalized:

- **Typeface:** Poppins (geometric sans), loaded in all 9 weights, body set at
  16px/1.8. Headings are weight 400 — light, airy, slightly anonymous.
- **Color:** body text is `#999999` light gray on white; headings near-black;
  accent is a periwinkle blue `#3e64ff` (links, the "HEY! I AM" eyebrow, the
  photo-frame hover). Buttons however are Bootstrap-default blue `#007bff`,
  and the loading spinner is orange `#F96D00`. **Three unrelated accents** —
  there is no color *system*, just template defaults left in place.
- **Hero:** full-viewport, white background with a 10%-opacity blue wash over
  the left half, uppercase letter-spaced eyebrow, large name, and a typewriter
  effect rotating through four roles. A "mouse scroll" affordance below.
- **About:** photo in an offset-border frame (nice hover micro-interaction),
  followed by an ID-card style fact list (name, DOB, address, phone) — the old
  European CV convention — a counter ("more than 30 projects") and a CV button.
- **Resume:** side nav (Experience / Education / Skills / Certifications) with
  scroll-spy; each entry is a card with a circular icon — **every single entry
  uses the same lightbulb icon**, so the icons decorate rather than inform.
  Dates are uppercase letter-spaced eyebrows; giant ghost "watermark" headings
  ("About", "Contact") sit behind section titles — the signature ftco device.
- **Hire-me banner:** stock photo with overlay, white text, button.
- **Contact:** four shadowed icon boxes (address/phone/email/website), then the
  form sitting next to a **template stock photo** that has nothing to do with
  anything.
- **Footer:** dark slab, three columns, social icons, Czech legal block.
- **Motion:** AOS fade-up on nearly every element, a full-screen loader before
  anything renders, smooth-scroll, animated counters.

### 1.2 What genuinely works (keep the DNA)

1. **The typewriter roles in the hero.** Usually a gimmick — here it is
   accidentally the *thesis of the whole redesign*: "I am several roles."
   `assignment.md` makes roles first-class; the hero device should evolve from
   decoration into navigation (see §3.1).
2. **The offset-frame photo.** A simple, ownable graphic device; works in print too.
3. **The eyebrow / heading / body rhythm** of resume entries — uppercase
   letter-spaced date, strong title, muted position line. That's a solid
   information hierarchy worth carrying into the new component library.
4. **Calm, white, text-forward layout.** Appropriate for the audience (hiring
   managers, procurement, architects). The upgrade should stay editorial and
   quiet, not become a flashy portfolio.
5. **The dark footer with legal/invoicing block** — reads as "established
   business", not hobby page.

### 1.3 What fails, in design terms

- **No color system** (three accents, see above). One decision nobody made.
- **Contrast failure:** `#999` body on white is ~2.8:1 — below WCAG AA (4.5:1).
  The entire site's body text is, literally, hard to read. This alone justifies
  a type/color reset.
- **Meaningless iconography:** one lightbulb for every job, school, and
  certificate. Icons that don't differentiate are noise.
- **Template residue:** stock photo in the contact block, lorem-flavored
  hire-me copy ("amazing experience"), Colorlib attribution in the footer,
  the orange loader. They read as "rented theme", which undercuts the message
  of a person who designs systems for a living.
- **The full-screen preloader** makes a static text page feel slow — perceived
  performance is a design property.
- **Motion without intent:** AOS-everything means nothing is emphasized.
- **Walls of bullets** in Experience: project names, technologies, and
  responsibilities all share one text style; nothing is scannable. A recruiter
  skimming for "Kubernetes" or "team of 22" gets no help.
- **No identity beyond the template:** no logo/monogram, no consistent
  treatment for the one thing an architect's portfolio should own visually —
  **diagrams** (there are none).
- **One layout for one audience.** There is no design language for the things
  assignment.md introduces: role variants, anonymized clients, confidential
  tiers, personalized microsites, print.

## 2. What assignment.md demands from the design

Reading the content spec as a design brief, the system must provide:

| Requirement (assignment.md) | Design implication |
|---|---|
| 7 role profiles, one content base | A **role identity layer**: each role page must feel distinctly *for* its reader while being unmistakably one brand. Differentiate by accent tint + iconography + hero copy, never by layout. |
| Site + PDF + microsites from one source | **Design tokens, not CSS**: color/type/spacing defined abstractly, consumed by web and Typst print templates alike. Every component needs a print twin. |
| Anonymized public tier | A deliberate **"anonymous client" treatment** — industry mark + descriptor ("Major automotive OEM"), styled confidently so anonymity reads as professionalism (NDA-bound architect), never as vagueness. |
| NDA tier on gated links | A **confidential visual register**: badge, recipient watermark, "prepared for" banner — borrowed from document design (think stamped drawings), instantly distinguishable from public pages. |
| Application microsites | A **personalization band** ("Prepared for Acme · June 2026") and a condensed one-screen-first layout: the recruiter gives it 30 seconds. |
| CZ master / EN derived | Typeface with full Czech diacritics at all weights; layouts tolerant of ~15% longer Czech strings; a quiet language switch. |
| Dead form → email + booking | Contact redesigned as a **conversation invitation**, not a form: availability signal, one primary CTA (book a call), email as visible text. |

## 3. Proposed design direction

### 3.1 Concept: "the architect's dossier"

The site should feel like a beautifully produced **set of working documents** —
precise, calm, credible — rather than a marketing splash. Document-design cues
(eyebrows, margins, footnote-like metadata, stamps for confidentiality, a
drawing-like diagram style) give the brand a register that works identically on
screen, in PDF, and on an NDA page. The hero typewriter evolves into the core
interaction: the rotating roles become **tangible chips/links** — click
"Cloud Architect (AWS)" and the dossier reassembles itself for that reader.

### 3.2 Identity

- **Monogram/wordmark:** the existing `V`-emphasis in "Vojtěch Zicha" is a seed;
  formalize it (e.g., a drafted/plotted "VZ" that nods to technical drawing).
  Must work at favicon size, PDF header, and OG image.
- **One accent.** Keep lineage with today's `#3e64ff` but pick a final value
  that passes AA on white for text-size usage; retire the Bootstrap blue and
  the orange spinner. Role pages may use **tints/shades of the single accent**
  (or a strictly limited role-tone scale), never seven different colors —
  the person is the brand, not the role.
- **Semantic colors:** ink (near-black, replaces `#999` body — body text should
  be dark, muted color is only for metadata), paper, accent, success/"available"
  green, **confidential amber** reserved exclusively for NDA UI.

### 3.3 Typography

- Replace 9-weight Poppins with **one variable font family**, self-hosted, with
  excellent Czech diacritics and a credible print rendering. Strong candidates:
  *IBM Plex Sans* (engineering heritage, has Mono sibling for tech metadata)
  or *Inter*/*Source Sans 3*. Optionally a serif for long-form case-study prose
  if the dossier feel wants it — decide in the visual exploration, not now.
- **Mono for metadata**: dates, tech stacks, tokens ("Prepared for…") set in the
  mono sibling — it's the typographic signature of the "working document" idea.
- A modular scale defined once (e.g., 1.250), expressed as tokens used by both
  CSS and Typst, so the PDF CV and the site are visibly the same family.

### 3.4 Component library (design counterpart of content components)

Each content type in assignment.md §2.1 gets exactly one designed component,
with web + print variants:

- **Role chip / role card** — hero navigation and the role-index grid.
- **Timeline entry** (experience/education) — evolved from the current
  eyebrow/title/position rhythm; replace the lightbulb with per-type marks
  (briefcase/degree/badge) or drop icons entirely in favor of a strong date column.
- **Project card & case-study layout** — the flagship. Header with anonymized
  client mark, period, tech stack in mono; body structured as
  *Context → Constraints → Decisions → Outcome*; "key decision" pull-blocks.
- **Anonymous client mark** — industry glyph + descriptor in a lozenge; on NDA
  tier the same lozenge resolves to the real logo/name (the *reveal* is the
  design feature that makes the tier system legible).
- **Certification row** — issuer, date, short-URL; group headers as on the
  current site (that grouping works).
- **Availability pill** — green/amber dot + "Available from September 2026";
  appears in hero and contact.
- **CTA block** — one primary action (book a call), email as secondary text link.
- **"Prepared for" banner** — microsite-only personalization band.
- **Confidential stamp & watermark** — NDA pages and NDA PDFs; diagonal
  recipient watermark on print, persistent footer notice on web.
- **Language switch** — quiet, top-right, two-letter.

### 3.5 Page blueprints

- **Homepage:** hero (name, rotating-roles-as-chips, availability pill, one CTA)
  → services in plain language → 3 selected case studies → credentials strip
  (certs as a compact row — they're proof, not heroes) → about (photo +
  trimmed facts; DOB removed) → contact. No preloader, no ghost headings.
- **Role page:** role headline + pitch, "what I do as X" in 3 bullets, the 3
  projects *in that lens*, relevant certs, role CV download, role-toned CTA.
  Same skeleton for all seven — only content and tint change.
- **Case study:** editorial single column (~70ch), diagram(s) as the imagery,
  decision pull-blocks, anonymized mark in the header, link to NDA version
  ("full detail available under NDA").
- **Microsite `/a/<token>`:** personalization band on top, then a *condensed*
  role page: everything that matters above the fold, PDF button, booking CTA.
- **NDA page:** identical to case study but in the confidential register —
  amber stamp, real names, watermark, no index/share affordances.
- **PDF CVs:** designed variant mirrors web tokens (accent rules, mono
  metadata, monogram header, QR to microsite); ATS variant is deliberately
  *undesigned* — one column, system-safe fonts, no graphics.
- **OG share images:** generated per page from the same tokens — monogram,
  role title, accent tint.

### 3.6 Imagery: diagrams are the portfolio

An architect's equivalent of a designer's screenshots is the **architecture
diagram**. Define one consistent diagram style (line weight, label typeface =
the mono, single accent, anonymized system names) and make each case study
carry at least one. This is the single biggest visual upgrade available — it
shows the work itself, and a consistent diagram style across case studies
*demonstrates* systematic thinking better than any testimonial. Public
diagrams are anonymized; NDA versions may carry real names. No stock
photography anywhere; the only photo on the site is the portrait.

### 3.7 Motion & feel

- Delete the preloader and blanket AOS animation.
- Keep exactly two moments of motion: the hero role rotation (now interactive)
  and the photo-frame hover. Everything else: subtle link/CTA transitions only.
- Respect `prefers-reduced-motion`; the typewriter gets a static fallback
  (all roles listed as chips).

### 3.8 Voice & microcopy

- First person, concrete, quietly confident. Replace template superlatives
  ("amazing experience", "Hire me") with specifics ("I design and deliver
  cloud platforms. Book a 30-minute intro call.").
- Czech copy is the master and must not read as translated English — the two
  language versions should each sound native; tone guide kept beside the
  content schema.
- Anonymity copy pattern: always *industry + scale + role*, never "a client"
  ("Czech's largest automotive producer" is the model — it's already on the site
  and it works).

## 4. Open design questions

1. **Continuity vs. reset:** keep recognizable threads (white/editorial, blue
   accent lineage, offset photo frame, typewriter-as-navigation) or treat this
   as a clean rebrand? Recommendation: evolve, don't reset — the audience
   overlap with past visitors is real and the current site's *bones* are fine.
2. Serif for case-study prose, or all-sans? (Decide on real text in the
   visual exploration round.)
3. Dark mode: worth it for this audience, or scope-cut? (Cheap with tokens,
   but doubles the QA of the confidential register.)
4. Role differentiation strength: tint-only (safe) vs. tint + per-role glyph
   (more memorable, more to maintain)?
5. Portrait: reuse the current photo or commission a new one to match the new
   identity? (The photo sets the tone of the whole homepage.)
6. Does the monogram/diagram style need a designer's hand, or is it built
   in-system? (Everything else in this doc is buildable without one.)

## 5. Suggested first design deliverables

1. **Token sheet** — color, type scale, spacing — applied to one artifact pair:
   the homepage hero *and* the PDF CV header, to prove the shared-DNA idea.
2. **One case study designed end-to-end** (public + NDA register) including a
   diagram in the proposed style — the hardest, highest-value template.
3. **Role page template** instantiated for two contrasting roles
   (Cloud Architect–AWS vs Technology Leader) to validate that one skeleton +
   tint + lens wording is enough differentiation.

Everything else derives from those three.
