#!/usr/bin/env node
/**
 * Option A — content-first PDF generation.
 *
 * Renders each resource's `sourceUrl` from a running dev server (or any URL
 * via BASE_URL env var) to a PDF using Puppeteer, then either writes them to
 * `./generated-pdfs/` for manual review/upload OR uploads them straight into
 * the Supabase Storage `downloads` bucket if --upload is passed.
 *
 * Usage:
 *   1.  pnpm dev               # start the site
 *   2.  pnpm install -D puppeteer
 *   3.  node scripts/generate-pdfs.mjs                 # write to ./generated-pdfs/
 *   4.  node scripts/generate-pdfs.mjs --upload        # upload to Supabase
 *
 * After uploading, set `available: true` for each resource in
 * lib/downloads/resources.ts.
 */

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const OUT_DIR = path.join(ROOT, "generated-pdfs")
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const UPLOAD = process.argv.includes("--upload")

async function loadRegistry() {
  // The registry is TS, so we extract per-resource blocks by hand. Avoids
  // needing a TS toolchain for the script itself.
  const src = await fs.readFile(path.join(ROOT, "lib/downloads/resources.ts"), "utf8")
  const blocks = [...src.matchAll(/"([\w-]+)":\s*\{([\s\S]*?)\n\s\s\},?/g)]
  function field(body, name) {
    const m = body.match(new RegExp(`${name}:\\s*"([^"]+)"`))
    return m ? m[1] : null
  }
  return blocks.map(([, key, body]) => ({
    key,
    slug: field(body, "slug"),
    title: field(body, "title"),
    filename: field(body, "filename"),
    storagePath: field(body, "storagePath"),
    sourceUrl: field(body, "sourceUrl"),
  }))
}

async function ensureOut() {
  await fs.mkdir(OUT_DIR, { recursive: true })
}

async function renderPdf(browser, url, outPath, title) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 })
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 })

  // Next.js 15 dev server streams RSC payloads — wait until the content
  // actually hydrates and lands in the DOM before we try to print.
  try {
    await page.waitForFunction("document.body.innerText.length > 200", { timeout: 30000 })
  } catch {
    console.warn("  ! Content didn't hydrate within 30s, printing anyway")
  }
  // Brief settle for any final layout shifts.
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Force screen rendering (some pages hide content under print media queries).
  await page.emulateMediaType("screen")

  // Hide site chrome (header/footer/nav) for the printed PDF.
  await page.addStyleTag({
    content: `
      body > header, body footer, .sticky { display: none !important; }
      body { background: #fff !important; }
      a { color: #2a4d5c !important; }
    `,
  })

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", right: "16mm", bottom: "20mm", left: "16mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:9px;color:#888;width:100%;padding:0 16mm;display:flex;justify-content:space-between;"><span>${escapeHtml(title)}</span><span>Safari Overland</span></div>`,
    footerTemplate: `<div style="font-size:9px;color:#888;width:100%;padding:0 16mm;text-align:center;"><span class="pageNumber"></span> / <span class="totalPages"></span> · safarioverland.com</div>`,
  })
  await page.close()
}

async function uploadToSupabase(filePath, storagePath) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to upload.")
  }
  const file = await fs.readFile(filePath)
  const endpoint = `${url}/storage/v1/object/downloads/${encodeURIComponent(storagePath)}`
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/pdf",
      "x-upsert": "true",
    },
    body: file,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Upload failed (${res.status}): ${body}`)
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function main() {
  await ensureOut()
  const registry = await loadRegistry()
  if (registry.length === 0) {
    console.error("Could not parse the registry. Run from the project root.")
    process.exit(1)
  }

  let puppeteer
  try {
    puppeteer = (await import("puppeteer")).default
  } catch {
    console.error("Puppeteer is not installed. Run: pnpm install -D puppeteer")
    process.exit(1)
  }

  const browser = await puppeteer.launch({ headless: "new" })

  try {
    for (const r of registry) {
      if (!r.sourceUrl) {
        console.log(`- ${r.slug}: skipping (no sourceUrl — likely a non-PDF asset)`)
        continue
      }
      if (!r.filename.endsWith(".pdf")) {
        console.log(`- ${r.slug}: skipping (filename is not .pdf)`)
        continue
      }
      const url = `${BASE_URL}${r.sourceUrl}`
      const out = path.join(OUT_DIR, r.filename)
      console.log(`+ Rendering ${r.slug} from ${url}`)
      try {
        await renderPdf(browser, url, out, r.title)
      } catch (err) {
        console.error(`  ! Render failed for ${r.slug}: ${err.message}`)
        continue
      }

      if (UPLOAD) {
        try {
          await uploadToSupabase(out, r.storagePath)
          console.log(`  ↑ Uploaded to downloads/${r.storagePath}`)
        } catch (err) {
          console.error(`  ! Upload failed for ${r.slug}: ${err.message}`)
        }
      }
    }
  } finally {
    await browser.close()
  }

  console.log(`\nDone. PDFs in ${OUT_DIR}.`)
  if (!UPLOAD) {
    console.log("Re-run with --upload (and Supabase env vars set) to upload to Storage.")
  } else {
    console.log("Set `available: true` on each uploaded resource in lib/downloads/resources.ts.")
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
