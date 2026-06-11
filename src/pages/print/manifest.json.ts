import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

/**
 * Build manifest for scripts/generate-cv.mjs: every CV the build must
 * render to PDF, with its print-source route, output file, and the short
 * redirects to generate into _redirects. One entry per role profile plus
 * the generalist default (/cv).
 *
 * Application microsites (assignment.md §4.3) plug in here later: an
 * `applications` collection adds `{ route: '/print/a/<token>/', … }`
 * entries and gets a per-application CV for free.
 */
export const GET: APIRoute = async () => {
  const roles = (await getCollection('roles')).sort((a, b) => a.data.order - b.data.order)

  const cvs = [
    {
      id: 'default',
      route: '/print/',
      file: 'files/cv/vojtech-zicha-cv-en.pdf',
      redirects: ['/cv'],
    },
    ...roles.map((r) => ({
      id: r.id,
      route: `/print/${r.id}/`,
      file: `files/cv/vojtech-zicha-cv-${r.data.cvSlug}-en.pdf`,
      redirects: [`/cv-${r.data.cvSlug}`],
    })),
  ]

  return new Response(JSON.stringify({ cvs }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
