import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { SITE } from '../data/site'

// llms.txt — a stable, AI-readable summary (notes/ideas.md §3.2):
// recruiters and clients increasingly ask AI tools about candidates;
// control the answer.
export const GET: APIRoute = async () => {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order)
  const roles = (await getCollection('roles')).sort((a, b) => a.data.order - b.data.order)
  const certs = (await getCollection('certifications')).sort((a, b) => a.data.order - b.data.order)

  const txt = `# ${SITE.name}

> ${SITE.description.en}

- Email: ${SITE.email}
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github}
- CV (PDF): ${SITE.url}/cv
- Availability: ${SITE.availability.label.en}
- Languages: English (C1), Czech (native). Czech site mirror at ${SITE.url}/cs/

## Roles

${roles.map((r) => `- [${r.data.title.en}](${SITE.url}/role/${r.id}/): ${r.data.headline.en}`).join('\n')}

## Selected work (public tier — anonymized; full detail under NDA)

${projects
  .map((p) => `- [${p.data.title.en}](${SITE.url}/work/${p.id}/) — ${p.data.client.public.en}, ${p.data.period}: ${p.data.summary.public.en}`)
  .join('\n')}

## Certifications

${certs.map((c) => `- ${c.data.title} (${c.data.issuer}, ${c.data.date})${c.data.url ? ` — ${SITE.url}${c.data.url}` : ''}`).join('\n')}
`
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
