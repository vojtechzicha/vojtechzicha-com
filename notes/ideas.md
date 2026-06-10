# vojtechzicha.com — Review & Upgrade Spec

*Written June 2026. A full review of the current site, what works, what should change, and a proposed way forward for the "big upgrade".*

> Note: this lives in `notes/` rather than `docs/`, because `docs/` is the
> publicly-served certificates folder on the live site. Keep internal
> documents out of it (see "Repository hygiene" below — with the current
> deploy setup, *everything* in the repo is published).

---

## 1. Current state

A single-page personal CV/portfolio site:

- One `index.html` (~1000 lines), based on the Colorlib "ftco" Bootstrap 4 template (2019 era).
- jQuery 3.2.1 + jquery-migrate + ~10 jQuery plugins (owl carousel, magnific popup, stellar, scrollax, waypoints, animateNumber, easing).
- Sections: hero with rotating job titles, About, Resume (Experience / Education / Skills / Certifications), "Hire me" banner, Contact (Netlify form + info boxes), footer with social links and legal/invoicing details.
- `_redirects` providing memorable short URLs (`/cv`, `/aws`, `/togaf`, `/itil`, …) to PDFs in `docs/` and `files/`.
- Deployed to Netlify via a GitHub Action (`netlify-cli deploy --dir=.`) on push to `main`. No build step.

## 2. What works — keep these

These are genuinely good and should survive any rewrite:

1. **The short-URL system.** `/cv`, `/aws-sa-associate`, `/togaf` etc. are a great touch — printable on a CV, easy to say aloud in an interview. The `_redirects` file is simple and Netlify-native. **Keep it exactly as a concept**, whatever the new stack is.
2. **Single canonical `/cv` redirect.** Updating one line when a new CV PDF lands is the right model.
3. **Zero-dependency publishing.** Push to `main` → live. No node_modules to rot, no build to break. Any upgrade should preserve this *feeling* even if a build step is introduced (i.e. the build must be boring and reliable).
4. **Content quality.** The Experience section reads well — concrete projects, real responsibilities, recent updates (Summer 2026 CV, LL.B./Bc. degrees, grouped certifications). The content is the asset; the template is the liability.
5. **Netlify Forms contact form.** Free, serverless, works. Keep (with fixes, see below).
6. **Legal/invoicing footer.** IČ/DIČ/bank details in the footer is unusual for a portfolio but genuinely useful for a freelancer's clients. Keep.
7. **The certificates-as-PDFs approach.** Hosting the actual credential PDFs (with score reports!) is more trustworthy than badge images.

## 3. What should change

### 3.1 The template is dead weight (highest priority)

- ~700 of the ~1000 lines of `index.html` are **commented-out template sections** (Services, Projects, Blog, counters, partners) still carrying Colorlib lorem-ipsum.
- **~10 MB of unused template images** (`work-*.jpg`, `person_*.jpg`, `staff-*.jpg`, `partner-*.png`, `bg_2.png` alone is 5.5 MB) and 4 icon-font families ship in the repo; most are referenced only by commented-out code.
- The full **Bootstrap SCSS source tree** is committed but nothing compiles it anymore (`prepros-6.config` is a relic of a desktop tool). There's even a stray `css/css/` nested folder.
- **jQuery 3.2.1 has known XSS CVEs** (fixed in 3.5.0). The carousel/popup/stellar plugins it exists to support are all unused.
- 9 render-blocking stylesheets + 13 script files + a full-screen preloader gate a page that is, functionally, a text document.
- Footer requires Colorlib attribution (CC BY 3.0 license condition) — a rewrite with own code removes that obligation.

### 3.2 SEO & sharing — currently near zero

- No `<meta name="description">`, no Open Graph / Twitter card tags — sharing the link on LinkedIn (the #1 place a freelance architect's site gets shared) renders with no preview.
- No JSON-LD structured data (`Person` schema with `jobTitle`, `sameAs` links to LinkedIn/GitHub, credentials).
- No `sitemap.xml`, no `robots.txt`, no canonical URL.
- No `llms.txt` — increasingly, clients will ask an AI assistant about you; make the answer good.

### 3.3 Privacy review

The page currently publishes: **date of birth, full home address, phone, and bank account number.**

- IČ/DIČ, registered address, and bank account are arguably legitimate for invoicing transparency — a deliberate choice, keep if intentional.
- **Date of birth has no business being public** (identity-theft primitive in CZ: name + DOB + address). Recommend removing it; "11+ years of experience" already signals seniority.
- Consider whether the phone number should be behind a click ("show number") to cut scraping/spam.

### 3.4 Accessibility & correctness

- Icon-only social links have no `aria-label` / visible text.
- Multiple `<h1>` per page; heading order jumps (decorative "big" h1s).
- `lang="en"` on `<html>` but the footer's legal block is Czech — needs `lang="cs"` on that element.
- Contact form: email field is `type="text"`, no `<label>`s, nothing `required`, no honeypot (`netlify-honeypot`) → spam magnet.
- `target="_blank"` links lack `rel="noopener"`.
- Stray duplicated `</div>` in the hero section (`index.html` ~line 67).
- `document.write()` for the copyright year.
- The mouse-scroll icon is `<a href="#">` — jumps to top instead of scrolling down.
- The X/Twitter link and the Mastodon instance (`twit.social`) are worth re-verifying — dead social links on a CV site look worse than none.

### 3.5 Content gaps (the actual "way forward")

The site says *what jobs you had* but not *what you can do for me*, which is the question a prospective client has:

- **No Services section** — yet the hero claims "Solutions Architect / Cloud Architect / DevOps Designer / Trainer". The template's Services section is commented out; replace it with a real one: 3–4 offerings (architecture review, cloud/DevOps design, fractional/interim head of technology, training & mentoring) with engagement models (project / part-time / one-off consult).
- **No case studies.** The Experience bullets mention great material (vignette enforcement platform, connected-car backend, loyalty platform on GCP, Odoo CRM/ERP transformation) — each deserves a one-page case study: context → constraints → architecture decisions → outcome. This is the single highest-value content investment for a freelance architect.
- **No blog / writing.** Even 3–4 posts a year on architecture decisions compounds into credibility and search traffic.
- **No testimonials / referenceable clients.**
- **Single language.** Czech clients (government, automotive) may expect a CZ version; the CV files already come in CZ/EN.
- Education section carries commented-out entries (VŠB, UHK) — decide and delete.

## 4. Proposed upgrade

### 4.1 Stack recommendation: Astro on Netlify

| Option | Verdict |
|---|---|
| A. Clean up the current static HTML | Cheap, but keeps hand-editing HTML for every CV change; no path to blog/case studies |
| **B. Astro static site (recommended)** | Content-as-data, zero JS by default, Markdown blog/case studies for free, still deploys as plain static files to Netlify |
| C. Next.js / Remix | Overkill — no server-side behaviour needed; heavier maintenance |

Why Astro fits this site specifically:

- **Content collections**: experience, certifications, skills, and case studies become typed Markdown/JSON entries — adding a certification is a 5-line file, not HTML surgery.
- Ships **zero JavaScript by default**; the only interactive bits (title rotator, mobile nav) are a few lines of vanilla JS or can be dropped.
- `_redirects` and Netlify Forms work unchanged.
- Builds in seconds; the GitHub Action gains one `npm ci && npm run build` step.

### 4.2 Single source of truth for CV data

Today the website and the PDF CVs are maintained separately and drift (they already differ in wording). Proposal:

- Keep one structured data set (`content/` collections, or a JSON Resume `resume.json`).
- Site renders from it.
- Optionally generate the PDF CV from the same data (Typst or JSON Resume themes) so "update CV" is one edit → site + PDF + `/cv` redirect all consistent. Keep the historical PDFs in `files/` as an archive.

### 4.3 Information architecture (target)

```
/               — landing: hero, value proposition, services, selected work, contact
/cv             — (redirect, unchanged) latest PDF
/work/          — case studies index
/work/<slug>/   — individual case study
/blog/          — writing (optional, phase 3)
/now            — what I'm doing now (optional, cheap, humanizing)
/cs/            — Czech mirror of landing page (optional)
/<short-url>    — certificate redirects (unchanged)
404 page       — currently missing
```

### 4.4 Non-functional requirements for the new site

- Lighthouse ≥ 95 across the board; total page weight < 300 KB excluding the photo.
- Self-host the font (one family, 2–3 weights — not 9 weights of Poppins from Google Fonts; also a GDPR nicety).
- Meta description, OG/Twitter cards with a proper share image, JSON-LD `Person` (+ `Article` for posts), sitemap, robots.txt, canonical.
- WCAG 2.1 AA basics: labels, landmarks, single h1, focus states, contrast.
- Privacy-friendly analytics (Plausible/GoatCounter) — currently flying blind on whether anyone visits at all.
- 404 page; security headers via `netlify.toml` (CSP, X-Frame-Options, etc.).

### 4.5 Repository hygiene

- Introduce a publish directory (`dist/` from the build) so the repo root — workflows, notes, this file — is no longer deployed verbatim. Today `netlify-cli deploy --dir=.` publishes *everything*, including `README.md` and `prepros-6.config`.
- Delete: unused template images/fonts/CSS/JS, Bootstrap SCSS tree, `prepros-6.config`, commented-out template sections.
- Rename `docs/` → `certs/` (or `credentials/`) eventually; it collides with the universal "project documentation" convention. The `_redirects` file insulates public URLs from the rename.
- Add a `CLAUDE.md` / contributor note describing the short-URL convention and the CV-update procedure.

## 5. Phased roadmap

**Phase 0 — quick wins on the current site (½ day, no redesign):**
remove DOB; add meta description + OG tags + JSON-LD; fix form (labels, `type="email"`, `required`, honeypot); `rel="noopener"`; fix stray `</div>`; upgrade jQuery to ≥ 3.5 or drop unused plugins; delete unused images (~10 MB); add 404 + robots.txt.

**Phase 1 — re-platform (the "big upgrade", ~2–4 evenings):**
Astro scaffold; port content into collections; new lightweight design (own code → drop Colorlib attribution); services section; publish-dir deploy; analytics; NFRs from §4.4. Visual identity can stay close to the current one (dark hero, orange accent) — recognition is worth keeping.

**Phase 2 — content that sells (ongoing):**
3 case studies from the strongest projects (vignette platform, connected-car backend, loyalty platform); testimonials; CZ landing page.

**Phase 3 — compounding extras (optional):**
blog; CV-from-data pipeline (§4.2); `/now` page; `llms.txt`; calendar-booking link on the contact section.

## 6. Open questions (owner decisions)

1. Is publishing the bank account / full address a deliberate invoicing-transparency choice? (Keep vs. move to invoices only.)
2. Audience priority: international (EN-only is fine) vs. Czech government/automotive (CZ version earns its keep)?
3. Is there appetite to write (blog/case studies), or should Phase 2 focus purely on services + testimonials?
4. Keep the current visual identity or take the rewrite as a chance for a full redesign?
