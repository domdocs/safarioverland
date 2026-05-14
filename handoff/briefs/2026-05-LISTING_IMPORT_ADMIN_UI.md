> ✓ **SHIPPED** — May 2026, PR #2 merged to `main`. Final commit `431add6`.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Listing-import admin UI

Replace the CLI-only import workflow with a drag-and-drop UI in the
admin. Same backend API (no changes to `/api/admin/listings/import`),
new front-end at `/admin/listings/import`.

## Goal

Dom should be able to:

1. Open the admin
2. Drag one or more `.md` research-record files onto a drop zone
3. See each file processed with a clear pass/fail per file
4. Click through to the imported pending row(s) to review and approve

OR alternately:

1. Open the admin
2. Paste markdown content into a textarea
3. Click Import
4. See the result and the link to the pending row

No terminal. No file paths to remember. No env-var fiddling.

## Branch

Wait for `feature/listing-import-api` to merge to main first.

```bash
git checkout main
git pull
git checkout -b feature/listing-import-admin-ui
```

## Why we considered and rejected a folder-watcher

The instinctive design is "watch `handoff/listings/` and auto-import
on new files." Three reasons not to:

1. Vercel is serverless — no persistent file-watcher process exists
   in production
2. The `handoff/listings/` folder is in iCloud, syncing — file
   watchers race with partial syncs and trigger imports on incomplete
   content
3. Silent imports are dangerous — Dom should see what got imported,
   not discover it later in `/admin/pending`

Explicit drag-drop / paste is the right shape: works in production,
visible feedback, no race conditions.

## Files to add

### 1. `app/admin/listings/import/page.tsx`

New admin page. Client component (file reading happens in the browser).

UI structure:

```
┌─ /admin/listings/import ─────────────────────────────────┐
│                                                          │
│  Import research records                                 │
│  Drop one or more `.md` files from handoff/listings/,    │
│  or paste markdown directly.                             │
│                                                          │
│  ┌─ [Upload] [Paste] ────────────────────────────────┐  │
│  │                                                    │  │
│  │  [drag-and-drop file zone — accepts multiple .md] │  │
│  │  or [click to choose files]                       │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│                                  [Import (N files)]      │
│                                                          │
│  ─── Results ─────────────────────────────────────────   │
│                                                          │
│  ✓ matetsi-victoria-falls.md                            │
│    → Pending row created · open in admin →              │
│                                                          │
│  ✓ tongabezi-lodge.md                                   │
│    → Pending row updated · open in admin →              │
│                                                          │
│  ✗ the-elephant-camp.md                                 │
│    → external_ratings.0.rating: Expected number,        │
│      received null                                       │
│    → external_ratings.0.url: Expected string, received  │
│      null                                                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Two input modes via tabs or toggle:

**Upload mode (default):**
- Drag-and-drop zone using `react-dropzone` (already a project
  dependency)
- Accept `.md` files only, multiple allowed
- Show file list with size + remove-X per file before import
- "Import N files" button enabled when at least one file is selected

**Paste mode:**
- Single textarea, monospace font, ~25 rows tall
- "Import" button
- Single import only in this mode (one paste = one record)

### 2. Submission flow

On import click, in the browser:

```ts
for (const file of files) {
  const markdown = await file.text()                  // FileReader API
  const res = await fetch("/api/admin/listings/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ markdown }),
  })
  const json = await res.json()
  // append to results state with success / error
}
```

Sequential, not Promise.all — keeps DB inserts ordered and avoids
race conditions if two files reference the same listing (edge case
but possible).

Show a progress indicator per file (pending / done / error) so Dom
sees the import working in real time.

### 3. Results panel

After all files processed, show per-file:

- **Success (201 Created):** Filename, "Pending row created", link to
  `/admin/listings/edit/[id]`
- **Success (200 OK — updated existing pending row):** Filename,
  "Pending row updated", link
- **Conflict (409):** Filename, the conflict message (existing
  status, link to admin to flip the status)
- **Validation error (400):** Filename, each error from the response,
  inline. *Doesn't* link anywhere; user fixes the file and re-imports.
- **Server error (500):** Filename, "Server error — try again or
  report to engineering." Show response body if present.

Each entry also has a "Copy raw response" link for debugging.

### 4. Navigation

Add an "Import records" link in the admin nav (header or sidebar —
wherever existing /admin links live).

Also add a small "+ Import records" button in the header of the
existing `/admin/pending` page so Dom can get to import from where
he'd most naturally want it.

## Implementation notes

### Auth

This page is under `/admin/*` — covered by the existing admin Basic
Auth middleware. Same with the API call (`/api/admin/listings/import`).
No new auth work.

### No backend changes

The `/api/admin/listings/import` route already accepts JSON
`{ markdown: string }`. The new UI just calls it. Don't add a new
endpoint.

### Browser file reading

Use the standard FileReader / `file.text()` API. No file goes through
the server filesystem — the markdown content is read in the browser
and POSTed as JSON. Mirrors how the CLI works (which also POSTs JSON,
not multipart).

### Multi-file behaviour

Sequential. Show running progress. If any file errors, continue with
the rest — don't abort the batch. The user sees the full pass/fail
picture at the end.

### File-name display

Use `file.name` for display in the results panel. Helps Dom match
results to the source files.

### Reset state

After a batch completes, show a "Clear results" button to reset the
panel for the next batch. Don't auto-clear — the audit trail of "I
just imported these N files" is useful.

## Tests

- Unit tests for the upload-mode component: dropping a file shows it
  in the list; removing a file removes it; "Import" disabled until at
  least one file present
- Unit tests for the paste-mode component: empty textarea disables
  Import; pasted content enables it
- Integration test: import a single Matetsi file → assert the API was
  called with the correct payload, assert success state renders with
  the admin URL link
- Integration test: import three files with one validation failure →
  assert the panel shows two successes + one error with errors listed
  inline

## Verify

1. Local dev: open `/admin/listings/import`, drag the Matetsi
   markdown file in. See it in the file list. Click Import. See
   success state with link to the pending row.
2. Drag all seven Vic Falls files in at once. Click Import. See
   sequential progress, then final results panel showing seven
   successes (or appropriate 409/200 status for ones that already
   exist).
3. Paste a malformed markdown. See validation errors inline.
4. Mobile / narrow viewport: the drop zone is still usable (touch
   doesn't drag well, but the "click to choose" fallback works).

## Out of scope

- Folder-watcher / file-system listener — explicitly not doing this.
  Discussed in the brief above.
- A "delete listing" or "re-import over rejected status" override —
  separate decision. The current strict behaviour is intentional.
- Bulk approve / bulk featured — that's a separate admin UX
  improvement, not part of import.
- Drag-drop on the listing detail page to add gallery images — that's
  a different feature (photo management).

## Done means

- `/admin/listings/import` page exists, accessible from admin nav
- Drag-drop or click-to-choose UI accepts one or more `.md` files
- Paste-markdown alternate mode works
- Import button submits sequentially to existing API
- Results panel shows per-file pass/fail with admin links
- Dom can import the seven Vic Falls files in one drag without
  touching the terminal
- Tests pass
- PR description references this brief
