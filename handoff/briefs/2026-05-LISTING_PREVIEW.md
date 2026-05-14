> ✓ **SHIPPED** — May 2026, PR #4 merged to `main`. Final commit `431add6`.
> Also closed a latent bug: pending and rejected listings on the
> public `/listings/[id]` path now 404 (previously viewable by anyone
> with the UUID).
> See `handoff/CHANGELOG.md` for the session-level summary.

# Preview button on listing edit form

Add a "Preview" button to `/admin/listings/edit/[id]` that opens the
listing rendered in its public-page form, regardless of the listing's
status. Editorial control: see what the page will look like before
flipping status from pending to approved.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/listing-preview
```

## What's there now

- Public detail at `app/listings/[id]/page.tsx` — filters out
  non-approved rows via `getListings()`/`getListing()` (no public 404
  bypass)
- Admin edit at `app/admin/listings/edit/[id]/page.tsx` — full
  form, no preview affordance

## What to build

### 1. Preview route at `app/admin/listings/preview/[id]/page.tsx`

Server Component (mirrors the Stream B pattern used for
`/admin/articles`).

It should:

- Read the listing by id using the **admin-side** data path — the
  one that bypasses the `status='approved'` filter, so pending,
  rejected, and approved rows all render
- Render the same listing-detail component the public page uses
  (`components/editorial/listing-detail.tsx` or whatever the public
  detail page wraps)
- Add a small fixed banner at the top of the viewport indicating
  PREVIEW MODE, the current `status`, and a link back to
  `/admin/listings/edit/[id]`

Banner design — restrained, brand-aligned:

```
┌─────────────────────────────────────────────────────────────┐
│  PREVIEW · status: PENDING            ← Back to edit form  │
└─────────────────────────────────────────────────────────────┘
```

Mono font, amber accent on the status pill, `position: sticky;
top: 0; z-index: 100;` so it stays visible as the user scrolls
through the preview. Subtle, not loud.

### 2. Preview button on the edit form

In `app/admin/listings/edit/[id]/page.tsx`, add a "Preview" button
near the existing form action buttons (Save / Save & approve / etc.).

Behaviour:

- Opens `/admin/listings/preview/[id]` in a new tab
  (`target="_blank" rel="noopener"`)
- Disabled (or subtly muted) if the form has unsaved changes —
  preview should show the saved data, not the in-form state. Show
  a small hint: *"Save first to preview"* underneath the button when
  it's disabled.

If detecting unsaved changes is non-trivial, simpler fallback: just
make the button always live, and document in a tooltip that *"Preview
reflects the last saved version, not your current edits."*

### 3. Data fetch helper

If `lib/listings.ts` doesn't already expose a "get by id regardless
of status" function for admin use, add one — e.g.
`getListingForAdmin(id: string)` — that uses the service-role
Supabase client and doesn't apply the `status='approved'` filter.

Keep the existing public `getListing()` function unchanged; the
public site still 404s for non-approved rows.

## Auth

Both the preview route (`/admin/listings/preview/[id]`) and any new
admin data helpers sit under `/admin/*` — covered by the existing
admin Basic Auth middleware. Verify the matcher includes the new
path. No new auth work.

## Verify

1. Open `/admin/pending` on the preview deployment. Click into any
   pending listing's edit form.
2. Click "Preview." New tab opens at
   `/admin/listings/preview/[id]`. The listing renders in its full
   public-page form. Banner at top reads "PREVIEW · status:
   PENDING · ← Back to edit form."
3. The public site at `/listings/[id]` still 404s for that listing
   (because it's still pending and the public path filters status).
4. Approve the listing in admin. Open the preview again — the banner
   now reads "PREVIEW · status: APPROVED." Public path now resolves
   to the same content.
5. The Preview button on the edit form opens in a new tab (doesn't
   replace the edit form).

## Out of scope

- Live-edit preview (form changes reflecting in preview without
  save) — explicitly not doing this. Save-then-preview is the right
  editorial workflow; live preview is engineering complexity for
  marginal benefit.
- A "Promote to approved" button in the preview banner — that lives
  on the edit form already.
- Mobile-responsive preview frame inside the admin — no, opens in
  new tab.
- Public-site "?preview=true" query parameter pattern — no. Admin
  rendering, admin route, no public URL contamination.

## Done means

- `/admin/listings/preview/[id]` renders pending/rejected/approved
  listings using the public detail component plus a small status banner
- Preview button on `/admin/listings/edit/[id]` opens this in a new
  tab
- Saved-version-only behaviour documented in the button affordance
- Tests cover: pending listing renders in preview, approved listing
  renders, rejected listing renders, banner reflects correct status
- All verified on preview deployment
- PR description references this brief
