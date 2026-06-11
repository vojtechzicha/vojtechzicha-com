import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '../data/site'

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects')
  const roles = await getCollection('roles')

  const paths = [
    '/',
    '/work/',
    ...projects.map((p) => `/work/${p.id}/`),
    ...roles.map((r) => `/role/${r.id}/`),
  ]

  const urls = paths
    .flatMap((p) => {
      const en = `${SITE.url}${p}`
      const cs = `${SITE.url}/cs${p === '/' ? '/' : p}`
      const alts =
        `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n` +
        `    <xhtml:link rel="alternate" hreflang="cs" href="${cs}"/>`
      return [
        `  <url>\n    <loc>${en}</loc>\n${alts}\n  </url>`,
        `  <url>\n    <loc>${cs}</loc>\n${alts}\n  </url>`,
      ]
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
