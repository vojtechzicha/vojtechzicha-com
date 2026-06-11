// Generate the CV PDFs from the built site (assignment.md §4.2/§7:
// PDFs are deploy artifacts built in the same run as the site — never
// maintained by hand, never committed).
//
// Runs after `astro build` as part of `npm run build`:
//   1. serves dist/ on a local port,
//   2. reads dist/print/manifest.json (one entry per CV profile),
//   3. renders each print-source route to an A4 PDF with headless
//      Chromium (Playwright), verifying nothing overflows a page,
//   4. writes the PDFs into dist/ and appends the short-URL redirects
//      (/cv, /cv-aws, …) to dist/_redirects.
import { createServer } from 'node:http'
import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import { join, extname, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}

function serveDist() {
  const server = createServer((req, res) => {
    let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (path.endsWith('/')) path += 'index.html'
    let file = join(dist, path)
    if (!file.startsWith(dist)) {
      res.writeHead(403).end()
      return
    }
    if (!existsSync(file) && existsSync(`${file}/index.html`)) file = `${file}/index.html`
    if (!existsSync(file)) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

const server = await serveDist()
const base = `http://127.0.0.1:${server.address().port}`
const { cvs } = JSON.parse(await readFile(join(dist, 'print', 'manifest.json'), 'utf8'))

const browser = await chromium.launch()
const page = await browser.newPage()
const A4_PX = Math.round((297 * 96) / 25.4)

const redirectLines = ['', '# CV PDFs — generated at build by scripts/generate-cv.mjs']
let failed = false

for (const cv of cvs) {
  await page.goto(base + cv.route, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  // every sheet must fit one A4 page, or the PDF silently truncates
  const overflowing = await page.$$eval(
    '.sheet',
    (els, limit) => els.map((el, i) => ({ i, h: el.scrollHeight })).filter((s) => s.h > limit + 2),
    A4_PX
  )
  if (overflowing.length > 0) {
    console.error(`✗ ${cv.id}: sheet(s) overflow A4 — ${JSON.stringify(overflowing)}`)
    failed = true
    continue
  }

  const out = join(dist, cv.file)
  await mkdir(dirname(out), { recursive: true })
  await page.pdf({ path: out, format: 'A4', printBackground: true })
  for (const r of cv.redirects) redirectLines.push(`${r} /${cv.file} 301`)
  console.log(`✓ ${cv.id} → /${cv.file}  (${cv.redirects.join(', ')})`)
}

await browser.close()
server.close()

if (failed) {
  console.error('CV generation failed — fix the overflowing sheet(s)')
  process.exit(1)
}

await appendFile(join(dist, '_redirects'), redirectLines.join('\n') + '\n')
console.log(`✓ appended ${cvs.length} redirect(s) to _redirects`)
