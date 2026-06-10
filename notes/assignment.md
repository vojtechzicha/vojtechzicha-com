# Assignment: vojtechzicha.com as a CV platform

*Ideation v1, June 2026. Builds on `notes/ideas.md` (general site review). This document
specs the bigger idea: one structured, Czech-authored content base that compiles into the
public site, role-targeted CVs (PDF), application microsites, and NDA-gated detail pages.*

---

## 1. Vision

Stop maintaining "a website" and "some CV PDFs". Instead, maintain **one content
repository of career components** — experiences, projects, skills, certifications,
services, testimonials — and **compile** them into every artifact a job application or
sales conversation needs:

```
                      ┌──────────────────────────────────────────────┐
                      │   content/  (Czech master + EN translations) │
                      │   components with role lenses + visibility   │
                      └──────────┬───────────────────────────────────┘
                                 │  build
      ┌──────────────┬───────────┼──────────────┬───────────────────┐
      ▼              ▼           ▼              ▼                   ▼
  Public site    Role pages   PDF CVs       Application        NDA detail
  (high-level)   /role/*      per role×lang  microsites /a/*   pages /nda/*
```

The unit of work changes from "edit the website" to "improve a component once,
every output gets better".

## 2. Content model

### 2.1 Components

Everything is a typed content file (Markdown + YAML frontmatter, or pure YAML for
list-like data). Proposed collections:

| Collection | Examples | Notes |
|---|---|---|
| `experience/` | eman-head-of-technology, freelance, wag, provident | employment entries |
| `projects/` | vignette-enforcement, connected-car, loyalty-platform, odoo-crm-erp, datacenter-automation | the case-study atoms; richest type |
| `skills/` | cloud, kubernetes, devops, integration, ea, leadership | grouped, with per-role weighting |
| `certifications/` | aws-sa-associate, togaf-certified, … | already well-structured on the site |
| `education/` | llb, newton-bc | |
| `services/` | architecture-review, fractional-cto, training | for the sales side |
| `testimonials/` | per person/company | has visibility tiers too |
| `roles/` | the 7+ role profiles (see §3) | *selectors*, not content |

### 2.2 The three axes of every component

Each component can vary along three independent axes:

1. **Language**: `cs` (master, authored first) and `en` (translation). Czech is the
   editing language; English is derived and reviewed. Never let the two drift —
   the build fails if an `en` variant is missing or older than its `cs` master
   (timestamp/hash check).
2. **Role lens**: alternative wording of the *same facts* emphasizing what a given
   audience cares about (see §3). Lenses override fields; anything not overridden
   falls back to the base text.
3. **Visibility tier**:
   - `public` — anonymized ("a major automotive OEM")
   - `nda` — full detail (client names, numbers, architecture specifics)
   - `internal` — never rendered anywhere; private notes, interview prep, rate history

### 2.3 Example project component

```yaml
# content/projects/connected-car.yaml
id: connected-car
period: 2022–2026
client:
  public: "a major automotive OEM"        # what the site & public CVs say
  nda: "…"                                 # real name, only on NDA-gated outputs
tech: [Azure, Kubernetes, Kafka, .NET]
metrics:
  public: "high-load backend supporting mobile apps for end customers"
  nda: "…k req/min peak, …M vehicles, 99.9% SLA"   # real numbers
summary:
  cs: >
    Architektonický dohled nad vysoce zatíženou backendovou platformou…
  en: >
    Architecture oversight of a high-load backend platform…
lenses:
  cloud-architect-aws:    # facts re-framed for the audience
    en: >
      Designed the multi-region Kubernetes topology, networking and
      cost model… (cloud decisions foregrounded)
  devops-lead:
    en: >
      Owned the delivery pipeline and SRE practices: GitOps rollout,
      release gates, on-call design… (delivery practices foregrounded)
  technology-leader:
    en: >
      Governed a 22-person cross-functional division delivering the
      platform; set the architecture roadmap… (leadership foregrounded)
nda_detail: nda/connected-car.md   # long-form case study, full tier
```

**Rule: lenses re-weight emphasis, never invent facts.** All lenses of one project
must be true simultaneously — a client comparing two role variants should see the
same story told for a different listener, not two stories.

## 3. Role profiles

A role profile is a small file that *selects and orders* components and sets the
framing — it contains almost no prose of its own:

```yaml
# content/roles/cloud-architect-aws.yaml
title: { en: "Cloud Architect (AWS)", cs: "Cloud architekt (AWS)" }
headline: { en: "AWS-certified architect for regulated, high-load platforms" }
pitch: { en: "…2–3 sentence positioning…" }
projects: [loyalty-platform, connected-car, datacenter-automation]  # order = priority
lens: cloud-architect-aws
skills_emphasis: [cloud, kubernetes, devops]
certifications_emphasis: [aws-sa-associate, aws-cloud-practitioner]
cv_pdf: true          # generate a PDF for this role
microsite: true       # gets /role/cloud-architect-aws page
```

Initial set (from real applications): **Solution Architect, Lead Architect,
Cloud Architect – AWS, Cloud Architect (general), DevOps Lead, Consultant,
Technology Leader.** Adding role #8 must be a one-file affair.

Worth defining also a **`default` profile** = what the public homepage shows
(today's generalist positioning).

## 4. Outputs

### 4.1 Public site (high-level + subsections)

- **Homepage stays high-level**: who, value proposition, services, selected work,
  credentials, contact. It renders the `default` role profile.
- **Role subsections** `/role/<slug>/`: the same building blocks re-selected and
  re-worded through the role lens — tailored headline, top 3 projects *in that
  lens*, relevant skills/certs, role-specific CTA ("Download the Cloud Architect CV").
- Role pages are public and indexable → they double as **SEO landing pages**
  ("cloud architect AWS Praha" has real search intent).
- Case studies `/work/<slug>/` render the `public` tier of project components.

### 4.2 PDF CVs

- Generated per `role × language` from the same components (Typst recommended:
  text-based templates, fast, beautiful output, diffable in git).
- Two layout variants per role: **designed** (human reader) and **ATS-friendly**
  (single column, no graphics — many applications die in parsers).
- `/cv` keeps redirecting to the default role's latest PDF; role-specific
  short URLs like `/cv-aws`, `/cv-devops` mirror it.
- Historical PDFs stay archived in `files/` exactly as today.

### 4.3 Application microsites `/a/<token>/`

The sharpest tool in the box: a **per-application page**, generated when applying
to a specific company:

- Created via a small CLI: `make application ROLE=devops-lead COMPANY="Acme" LANG=cs`
  → unguessable URL `/a/k7f3q9/`, tailored greeting ("Prepared for Acme, June 2026"),
  the role-lens content, the matching PDF, optionally answers to the job ad's
  specific requirements.
- `noindex`, excluded from sitemap, unguessable token = link-knowledge access.
- **Per-token analytics** (Plausible custom events or a tiny edge counter): you
  learn *whether the recruiter actually opened it* and what they looked at —
  feedback applications never give you.
- Optional expiry (token list with `valid_until`, enforced by an edge function).
- QR code to the microsite printed on the PDF CV closes the print→web loop.

### 4.4 NDA-gated detail `/nda/<slug>/`

For conversations where full project detail is appropriate:

- Renders the `nda` tier: client names, real metrics, architecture diagrams.
- Access mechanics, in increasing strength — pick per sensitivity:
  1. unguessable per-recipient token URL + `noindex` (good enough for most),
  2. token + expiry + per-recipient watermark ("Prepared for Jane Doe, valid until…"),
  3. password-protected (Netlify edge function checking a header/cookie, or
     client-side encryption à la StatiCrypt if staying purely static).
- Every NDA page footer states the confidentiality expectation explicitly.
- Per-recipient tokens mean a leak is attributable.

### 4.5 Confidentiality is a repo-level requirement ⚠️

Keeping unpublished client details "in the repo" is only safe if:

- **The repo is private** (verify! — if it's public today, this is decision #1), or
- confidential content lives in a **separate private repo / git submodule**
  pulled in at build time, or
- confidential files are **encrypted in-repo** (git-crypt or SOPS/age) and decrypted
  only in CI with a key in GitHub secrets.

Also required regardless: the deploy must move to a **publish directory** (`dist/`)
— today `netlify deploy --dir=.` would publish the content sources, NDA details
included. The build must have a check that greps the public output for strings
from the `nda`/`internal` tiers (a "leak test" in CI).

## 5. Lead generation — replacing the dead form

Honest premise: the form produced nothing useful in ~5 years. People who hire
freelance architects don't fill in contact forms; they email, call, or come via
LinkedIn. Strategy:

1. **Kill the generic form.** Replace the contact section with:
   - prominent **email** (the real channel) with a `subject=` prefilled mailto,
   - **calendar booking** (Cal.com, free tier) — "book a 30-min intro call" is a
     dramatically lower-friction CTA for a busy hiring manager than a form,
   - LinkedIn as the explicit alternative channel.
2. **Qualify instead of collect.** If any form survives, make it an *engagement
   brief*: role/engagement type, timeframe, budget band — 3 clicks + 1 text field.
   It filters spam by being specific, and the submissions that do arrive are warm.
3. **Per-role CTAs.** Each role page and application microsite ends with the CTA
   in that role's language ("Need an interim Head of Technology? → book a call").
4. **Availability signal.** A small "Available from September 2026 / Booked"
   indicator near the CTA — drives urgency and saves dead-end conversations.
   One line in a YAML file to update.
5. **Measure the funnel.** Analytics events on: CV downloads, role-page visits,
   booking clicks, microsite token opens. After 3 months you'll know where leads
   actually come from — today there's zero signal.

## 6. More ideas (graded)

**High value / low effort**
- **Cover-letter generator**: same components + role lens + company name → a
  draft letter (Typst/Markdown). Applications get faster and more consistent.
- **`llms.txt` + JSON Resume export** at stable URLs — recruiters increasingly
  ask AI tools about candidates; control the answer.
- **Interview prep sheet** (`internal` tier): per application, auto-collected —
  which lens was sent, which projects were claimed, the real client names behind
  the anonymized ones. Generated next to each microsite, never deployed.
- **Role-specific OG share images** (auto-generated at build) so a shared role
  link looks intentional on LinkedIn.

**High value / medium effort**
- **Decision log as content**: each case study gets 2–3 "key decisions"
  (context → options → choice → outcome). This is what distinguishes an
  architect's case study from a project description, and it doubles as blog
  material.
- **Testimonials with tiers**: public quote anonymized ("Head of IT, energy
  sector"), NDA tier with name — consistent with the project model.
- **CZ/EN site mirror** `/cs/…` — the content model already requires both
  languages, so the bilingual site becomes nearly free. Czech government and
  automotive clients read Czech.

**Speculative / later**
- LinkedIn profile text generated from the same components (consistency without
  manual sync).
- Rate-card page on the NDA tier.
- "Now" page fed from the availability YAML.
- Annual "year in review" post generated from the project timeline.
- Self-serve NDA flow (recipient signs a simple e-NDA, token issued
  automatically) — probably over-engineering, manual issuance is fine.

## 7. Technical approach (sketch)

- **Astro** (per `ideas.md`) with content collections + Zod schemas encoding the
  three axes; the schema is the contract that build-time checks enforce
  (missing translation, missing lens fallback, leaked NDA strings).
- **Typst** for PDFs, built in the same CI run; output PDFs are deploy artifacts,
  not committed (except released snapshots archived to `files/`).
- **One GitHub Action**: build site + PDFs → leak test → deploy `dist/` to Netlify.
  Tokens/redirects stay in `_redirects` (generated, not hand-edited).
- **Authoring stays files-in-git** — no CMS. The editing experience *is* the
  Czech YAML/Markdown; a CMS would re-introduce drift. If editing comfort becomes
  an issue, add a local preview (`astro dev`) and schema-aware editor hints, not
  a CMS.
- Migration order: schema + 2 projects end-to-end (site page + 1 PDF + 1
  microsite) **before** porting all content — validate the model on the hardest
  project (most confidential one) first.

## 8. Open questions

1. **Is the GitHub repo private?** Gates the whole NDA-tier design (§4.5).
2. Authoring language: Czech master + English derived (assumed here) — or author
   both in parallel? Who reviews EN style?
3. How many role profiles really differ? (Cloud Architect vs Cloud Architect–AWS
   may be one profile with a flag; start with 4–5 lenses, not 7.)
4. NDA mechanics: are token links enough, or is a password/expiry tier needed
   from day one?
5. Keep any form at all, or go email + Cal.com only?
6. Should historical role-specific CVs (`files/*.pdf`) be regenerated from the
   new pipeline for consistency, or frozen as archive?

## 9. Suggested MVP slice

1. Private-repo / content-split decision (§4.5) + publish-dir deploy.
2. Content schema + **two** projects fully modeled (cs/en, 2 lenses, both tiers).
3. One role profile (**Cloud Architect – AWS**) end-to-end: `/role/…` page,
   Typst PDF, `/cv-aws` redirect.
4. One application microsite generated by CLI with token + analytics event.
5. Contact section replaced: email + Cal.com + availability flag.

Everything after that is repetition, not invention.
