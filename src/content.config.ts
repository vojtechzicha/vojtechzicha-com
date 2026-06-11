import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Content model — see notes/assignment.md.
 *
 * Every piece of prose varies along three axes:
 *  1. language   — `cs` / `en` (the `localized` shape),
 *  2. role lens  — optional per-role overrides that re-weight emphasis
 *                  (never invent facts); anything not overridden falls back,
 *  3. visibility — `public` (anonymized) vs `nda` (full detail).
 *
 * The NDA tier is supported by the schema but intentionally unused for now:
 * no case study carries `nda` content, and nothing renders it. When NDA
 * content lands, it must live in a private repo / encrypted store — never
 * in this public repo (assignment.md §4.5).
 */

const localized = z.object({ en: z.string(), cs: z.string() })

/** public tier required, NDA tier optional and currently always absent */
const tiered = z.object({
  public: localized,
  nda: localized.optional(),
})

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    featured: z.boolean().default(false),
    industry: localized,
    /** short mono mark shown in the anonymous-client lozenge */
    mark: z.string(),
    client: tiered,
    period: z.string(),
    /** default role lens for tinting/glyph on listings */
    lens: z.string(),
    stack: z.array(z.string()).default([]),
    title: localized,
    summary: tiered,
    outcome: tiered.optional(),
    decisions: z.array(localized).default([]),
    /** per-role summary overrides; key = role id, falls back to summary */
    lenses: z.record(z.string(), localized).default({}),
    /** long-form case-study sections (public tier) */
    sections: z
      .array(z.object({ heading: localized, body: z.array(localized) }))
      .default([]),
    /** anonymized architecture diagram, rendered by Diagram.astro */
    diagram: z
      .object({
        caption: z.string(),
        title: localized,
        tiers: z.array(
          z.object({
            num: z.string(),
            label: z.string(),
            group: z.boolean().default(false),
            boxes: z.array(
              z.object({
                label: z.string(),
                sub: z.string().optional(),
                active: z.boolean().default(false),
              })
            ),
          })
        ),
        railLeft: z.string().optional(),
        railRight: z.string().optional(),
      })
      .optional(),
    /** renders the "full detail available under NDA" affordance */
    ndaAvailable: z.boolean().default(true),
  }),
})

const roles = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/roles' }),
  schema: z.object({
    order: z.number(),
    default: z.boolean().default(false),
    /** short CV URL suffix: /cv-<cvSlug> redirects to this role's PDF */
    cvSlug: z.string(),
    title: localized,
    glyph: z.enum(['triangle', 'diamond', 'circle', 'square', 'bar', 'ring', 'half']),
    /** oklch hue — all blue-family tints of the single accent */
    hue: z.number(),
    headline: localized,
    pitch: localized,
    bullets: z.array(localized),
    /** ordered project ids — order = priority for this audience */
    projects: z.array(z.string()),
    skills: z.array(z.string()),
    certs: z.array(z.string()),
  }),
})

const experience = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/experience' }),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    title: localized,
    org: z.string(),
    location: localized.optional(),
    blocks: z.array(
      z.object({
        intro: localized.optional(),
        bullets: z.array(localized).default([]),
      })
    ),
    /** project ids delivered in this engagement (rendered as links) */
    projects: z.array(z.string()).default([]),
  }),
})

const education = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/education' }),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    title: localized,
    school: z.string(),
    note: localized.optional(),
    url: z.string().optional(),
    /** include in the generated print CV (web always shows everything) */
    print: z.boolean().default(true),
  }),
})

const certifications = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/certifications' }),
  schema: z.object({
    order: z.number(),
    group: z.enum(['cloud', 'ea', 'itsm', 'earlier']),
    title: z.string(),
    issuer: z.string(),
    /** YYYY-MM, formatted per locale */
    date: z.string(),
    /** short URL path on this domain, e.g. /aws-sa-associate */
    url: z.string().optional(),
    /** include in the generated print CV (web always shows everything) */
    print: z.boolean().default(true),
  }),
})

export const collections = { projects, roles, experience, education, certifications }
