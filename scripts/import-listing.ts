#!/usr/bin/env node
/**
 * CLI wrapper around POST /api/admin/listings/import.
 *
 * Reads a research-record markdown file from disk, POSTs it to the
 * import API with admin Basic Auth, and pretty-prints the result.
 *
 * Usage:
 *   pnpm tsx scripts/import-listing.ts <path-to-record.md>
 *   pnpm tsx scripts/import-listing.ts <path-to-record.md> --url <url>
 *   pnpm tsx scripts/import-listing.ts <path-to-record.md> --dry-run
 *
 * Env (read from .env.local):
 *   ADMIN_USERNAME       — admin Basic Auth username
 *   ADMIN_PASSWORD       — admin Basic Auth password
 *   NEXT_PUBLIC_SITE_URL — default target host
 *
 * Note on env var names: the brief uses BASIC_AUTH_USER / BASIC_AUTH_PASS
 * as suggested names, but the actual middleware (middleware.ts) reads
 * ADMIN_USERNAME / ADMIN_PASSWORD. The CLI matches the middleware to
 * avoid the credential split.
 */

import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { parseResearchRecord } from "../lib/listings/import-record"

type Args = {
  filePath: string
  url: string | null
  dryRun: boolean
}

function usage(): never {
  console.error(
    [
      "Usage:",
      "  pnpm tsx scripts/import-listing.ts <path-to-record.md> [--url <url>] [--dry-run]",
      "",
      "Examples:",
      "  pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md",
      "  pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md --url https://safarioverland-preview.vercel.app",
      "  pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md --dry-run",
    ].join("\n"),
  )
  process.exit(2)
}

function parseArgs(argv: string[]): Args {
  let filePath: string | null = null
  let url: string | null = null
  let dryRun = false

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--dry-run") {
      dryRun = true
    } else if (a === "--url") {
      url = argv[++i] ?? null
      if (!url) usage()
    } else if (a === "-h" || a === "--help") {
      usage()
    } else if (a.startsWith("--")) {
      console.error(`Unknown flag: ${a}`)
      usage()
    } else if (!filePath) {
      filePath = a
    } else {
      console.error(`Unexpected positional arg: ${a}`)
      usage()
    }
  }

  if (!filePath) usage()
  return { filePath, url, dryRun }
}

/**
 * Read .env.local into a plain object. Deliberately minimal — quoted
 * values stripped, no shell expansion, no variable interpolation. Good
 * enough for the three variables we need.
 */
function readEnvLocal(): Record<string, string> {
  const path = resolve(process.cwd(), ".env.local")
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return {}
  }
  const env: Record<string, string> = {}
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    // Strip optional surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

function basicAuthHeader(user: string, pass: string): string {
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64")
}

async function main() {
  const { filePath, url: urlFlag, dryRun } = parseArgs(process.argv.slice(2))

  const fullPath = resolve(process.cwd(), filePath)
  let markdown: string
  try {
    markdown = readFileSync(fullPath, "utf8")
  } catch (err) {
    console.error(
      `Could not read file at ${fullPath}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    )
    process.exit(1)
  }

  // Dry run — local parse only, no HTTP.
  if (dryRun) {
    const parsed = parseResearchRecord(markdown)
    if (!parsed.ok) {
      console.error("Validation failed:")
      for (const e of parsed.errors) console.error(`  • ${e}`)
      process.exit(1)
    }
    console.log("✓ Parses cleanly")
    if (parsed.warnings.length > 0) {
      console.log("\nWarnings:")
      for (const w of parsed.warnings) console.log(`  • ${w}`)
    }
    console.log("\nParsed record:")
    console.log(JSON.stringify(parsed.record, null, 2))
    return
  }

  // Real submit — needs creds + URL.
  const env = { ...readEnvLocal(), ...process.env }
  const user = env.ADMIN_USERNAME
  const pass = env.ADMIN_PASSWORD
  if (!user || !pass) {
    console.error(
      "Missing ADMIN_USERNAME / ADMIN_PASSWORD in .env.local (or process env). Without them the API will return 401.",
    )
    process.exit(1)
  }

  const targetUrl =
    urlFlag ??
    env.NEXT_PUBLIC_SITE_URL ??
    "https://safarioverland.com"

  const endpoint = `${targetUrl.replace(/\/$/, "")}/api/admin/listings/import`

  console.log(`POST ${endpoint}`)
  console.log(`     file=${filePath}`)

  let res: Response
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuthHeader(user, pass),
      },
      body: JSON.stringify({ markdown }),
    })
  } catch (err) {
    console.error(
      `Request failed: ${err instanceof Error ? err.message : String(err)}`,
    )
    process.exit(1)
  }

  let payload: unknown = null
  try {
    payload = await res.json()
  } catch {
    payload = await res.text().catch(() => null)
  }

  console.log(`\n← ${res.status} ${res.statusText}`)
  if (typeof payload === "object" && payload) {
    console.log(JSON.stringify(payload, null, 2))
  } else {
    console.log(payload)
  }

  // Surface the admin URL prominently on success.
  if (res.ok && typeof payload === "object" && payload) {
    const p = payload as { admin_url?: string; id?: string; action?: string }
    if (p.admin_url) {
      console.log(`\n✓ ${p.action ?? "imported"}: ${targetUrl}${p.admin_url}`)
    }
  }

  if (!res.ok) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
