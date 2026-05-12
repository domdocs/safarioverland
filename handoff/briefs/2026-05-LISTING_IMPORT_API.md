# Listing import API + CLI

A small API surface that turns a research-record markdown file (see
`handoff/skills/listing-research/research-record-template.md`) into a
pending row in `directory_listings`. Plus a CLI wrapper that lets the
AI pipeline call it from the workspace.

The goal: remove the manual paste-from-markdown-to-admin-form step. AI
drafts a record → CLI imports it → Dom reviews in the existing
`/admin/pending` flow → flips to `approved` when ready. Same review
gate, less friction.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/listing-import-api
```

## Files to add

### 1. `lib/listings/import-record.ts`

The pure parser + validator. No HTTP, no DB. Takes a markdown string,
returns either a validated record object or a list of validation
errors.

Suggested signature:

```ts
import matter from "gray-matter"   // already a dependency? if not, add it

export type ImportRecord = {
  // Mirrors directory_listings schema fields the frontmatter contains.
  // Fully typed — see /lib/listings/types.ts for the canonical shape.
  listing_name: string
  category: string
  region: string
  country: string
  location: string
  description?: string | null
  // ...all editorial fields per the template...
  editor_notes?: string | null
}

export type ImportResult =
  | { ok: true; record: ImportRecord; bodyMarkdown: string }
  | { ok: false; errors: string[] }

export function parseResearchRecord(markdown: string): ImportResult {
  // 1. gray-matter the file → { data, content }
  // 2. Validate `data` against the schema (use zod or a hand-rolled
  //    validator; zod is consistent with the rest of the codebase).
  // 3. The `content` (everything after frontmatter) is appended to or
  //    replaces `data.editor_notes` — replace if `data.editor_notes`
  //    is null/empty, else prepend the content with a separator.
  // 4. Return ImportResult.
}
```

Validation rules (mirror what's documented in
`research-record-template.md`):

- `listing_name`, `category`, `region`, `country`, `location` are
  required non-empty strings
- `category` must match one of the existing valid values in the
  database (query the distinct values or hardcode the list)
- `price_tier`, if present, must be `budget` / `mid` / `luxury` /
  `exclusive`
- `status` at import is always `pending` — if frontmatter says
  something else, override and warn
- `latitude` in `[-90, 90]`, `longitude` in `[-180, 180]` if present
- `featured` defaults to `false`; if frontmatter says `true`, log a
  warning (Dom should approve the listing before featuring it)
- `traveller_quotes` and `external_ratings` shape-check against the
  expected JSONB schema (see the migration for the exact shape)

### 2. `app/api/admin/listings/import/route.ts`

The HTTP surface. POST endpoint that accepts a JSON payload, calls
the parser, writes to Supabase.

```ts
import { NextResponse } from "next/server"
import { parseResearchRecord } from "@/lib/listings/import-record"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  // 1. Read the request body: { markdown: string }
  // 2. parseResearchRecord(markdown)
  // 3. If errors, return 400 with the errors array
  // 4. If ok, insert into directory_listings with status='pending'
  // 5. Return 201 with the created row's id + slug + admin edit URL

  // Auth: this route is under /api/admin/* — should be protected by
  // the existing admin Basic Auth middleware. Verify the middleware
  // matcher covers it.
}
```

Response shapes:

```json
// 201 Created
{
  "ok": true,
  "id": "uuid",
  "listing_name": "Matetsi Victoria Falls",
  "admin_url": "/admin/listings/edit/[id]"
}

// 400 Bad Request
{
  "ok": false,
  "errors": [
    "listing_name is required",
    "price_tier must be one of budget / mid / luxury / exclusive"
  ]
}

// 401 Unauthorized — handled by middleware
// 500 Internal — Supabase error etc; log and return generic message
```

### 3. `scripts/import-listing.ts` (CLI wrapper)

The script the AI pipeline calls from the workspace. Reads a research
record file from disk, POSTs to the API, prints the result.

```bash
# Usage
pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md

# Or with the preview deployment
pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md \
  --url https://safarioverland-5zsh-...vercel.app
```

The script:

1. Reads the markdown file at the given path
2. Reads `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` from `.env.local`
   (the admin Basic Auth credentials)
3. Reads `NEXT_PUBLIC_SITE_URL` from `.env.local` as the default
   target (override-able with `--url`)
4. POSTs to `${url}/api/admin/listings/import` with the markdown body
   and the Basic Auth header
5. Pretty-prints the response
6. On success, prints the admin edit URL so Dom can click straight in

Default behaviour: hit production. `--url` flag overrides for testing
against preview deployments. `--dry-run` flag should skip the POST and
just print the parsed record + any validation errors (useful for
debugging frontmatter formatting).

### 4. `.env.local.example` — document the new vars

Add these to the example if not already present:

```
# Admin Basic Auth (for /api/admin/* routes + the import CLI)
BASIC_AUTH_USER=
BASIC_AUTH_PASS=
```

## Schema considerations

The `directory_listings` table already has all the fields the template
covers (see `supabase/migrations/20260508_directory_listings_baseline_and_editorial_fields.sql`).
No new columns needed.

One thing to verify: that the `description` field accommodates the
length we're writing (some templates have ~200-300 char descriptions).
The existing column is `TEXT` which is unbounded, so this should be fine.

## Idempotency

If the same record file is imported twice (Dom edits it locally and
re-runs), the API should:

- **Option A (recommended):** treat the second import as an update if
  the `listing_name` already exists and is still `status='pending'`.
  Update the row in place. Log that this was an update, not a create.
- **Option B:** reject the duplicate with a 409 and require the user
  to delete the existing pending row first.

Recommend A — it makes the "iterate on the markdown until it's right,
then approve" loop much smoother. Edge case: if the existing row is
`approved` or `rejected`, don't overwrite it — return 409 with a clear
message ("listing already approved; edit in admin instead").

## Auth

Use the existing admin Basic Auth middleware. The
`/api/admin/listings/import` path should already be covered by the
matcher in `middleware.ts`. Verify before shipping.

The CLI reads credentials from `.env.local` — same place the app
reads them. Don't hardcode anywhere.

## Tests

Write at minimum:

1. Unit tests for `parseResearchRecord`:
   - Valid record → ok with parsed fields
   - Missing required field → errors list includes the missing field
   - Invalid category → error
   - Invalid price_tier → error
   - Out-of-range coordinates → error
   - Empty body (no frontmatter) → meaningful error

2. Integration test for the API route:
   - Valid POST → 201, row inserted with status='pending'
   - Invalid POST → 400 with errors
   - Unauthenticated POST → 401

3. End-to-end with the Matetsi research record:
   - Run the CLI against the dev server
   - Verify the row appears in `/admin/pending`
   - Click through to the edit form, confirm all fields populated

## Verify

1. Local dev: `pnpm tsx scripts/import-listing.ts handoff/listings/matetsi-victoria-falls.md`
   creates a pending row.
2. The pending row appears in `/admin/pending`.
3. Opening the edit form for the row shows the editorial fields
   populated (verdict, signature_experience, conservation_summary,
   community_summary, wellness_offerings, activities, etc).
4. The body of the markdown (everything after the frontmatter) is
   present in `editor_notes`.
5. Flipping `status` to `approved` and `featured` to `true` works
   normally.
6. Re-running the import with the same file updates the existing
   pending row rather than duplicating.

## Out of scope

- A UI button in the admin for "Import from research record" — that
  comes later if there's appetite. CLI is sufficient for the pipeline
  we're running.
- Bulk import (multiple files at once) — yes worth doing eventually,
  but a wrapper around the single-file CLI handles this case (`for f in
  handoff/listings/*.md; do pnpm tsx scripts/import-listing.ts "$f"; done`).
- Field-mapping configuration / overrides — frontmatter is the
  schema; no need for an indirection layer.
- Bidirectional sync (admin → markdown) — not required.

## Done means

- The import API ships and accepts valid research records
- The CLI imports the Matetsi record successfully against the preview
  deployment
- The imported row appears in `/admin/pending`, opens cleanly in the
  edit form, can be approved through the normal flow
- Tests pass
- PR description references this brief and the
  `handoff/skills/listing-research/SKILL.md` it enables
