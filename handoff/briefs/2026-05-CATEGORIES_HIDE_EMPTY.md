# Categories — retire empty cards gracefully

Editorial polish: categories with zero approved listings should not
render on `/categories`. The full category list stays in the system
(no destructive change), but a card only appears once there is at
least one approved, non-rejected listing in that category. When the
last listing is removed or rejected, the card disappears again.

This is a small change but it materially improves the registers — a
curated collection that shows "0 listings" anywhere reads as
under-construction. Empty categories should retire quietly until
they earn their place back.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/categories-hide-empty
```

## What changes

### 1. `/categories` index page

The index currently renders every category in the master list,
regardless of whether it has approved listings. Change behaviour:

- Fetch the count of `status='approved'` listings per category
- Filter the rendered cards to those with count > 0
- Re-number the displayed cards (01, 02, 03…) based on the filtered
  order, not the original master-list index, so the sequence reads
  cleanly even if half the categories are hidden

The numbering choice (01 in mono caps) is one of the brand's
signature treatments — keeping it contiguous after filtering is
important visually. Don't leave gaps like "01 Lodges, 04 Tours."

### 2. `/categories/[slug]` detail pages

Deep links and bookmarks shouldn't suddenly 404 — categories still
exist as concepts even when temporarily empty. Two options:

- **Option A (recommended):** the detail page renders with a soft
  empty state: a single line in the brand voice, plus a CTA pointing
  visitors at the planning service. Example copy:

  > *No properties on the kept list here yet.*
  >
  > The collection grows by hand. When we feature a [category] property,
  > it'll appear here first.
  >
  > [Send a brief →]

- **Option B:** 404 the detail page when empty. Cleaner technically
  but loses any inbound links and removes the soft on-ramp to the
  planning service.

Take option A. The empty-state copy above is on-brand and should be
used verbatim or close to it — adjust `[category]` per page.

### 3. Footer and navigation

The footer currently lists categories (`Booking agents`,
`Campsites`, `Lodges`, `4×4 rentals`, `Guided tours`). Same logic:
filter the rendered list to categories with at least one approved
listing. If only one or two categories qualify, the footer's
Categories column shrinks gracefully.

If only zero categories qualify (edge case, shouldn't happen for
long), the column header *Categories* can stay with no items — or
hide the column entirely. Code's call; either reads acceptably.

The header nav doesn't list specific categories (just *Categories*
as a single link), so no header change needed.

### 4. Data layer

A small helper, somewhere in `lib/categories.ts` or
`lib/listings.ts`:

```ts
/**
 * Returns the categories that have at least one approved listing,
 * ordered by the master-list order (the canonical order), with
 * counts.
 *
 * Master list order is preserved so adding listings to a previously-
 * hidden category brings it back in at its original position
 * (not at the end).
 */
export async function getActiveCategories(): Promise<
  Array<{ slug: string; label: string; description: string; count: number }>
>
```

Implementation:

1. Define the canonical master list of categories (likely already
   exists as a constant or in a `categories` table — find it)
2. Query Supabase for counts per category, filtered to
   `status='approved'`:
   ```sql
   SELECT category, COUNT(*) AS count
   FROM directory_listings
   WHERE status = 'approved'
   GROUP BY category;
   ```
3. Join the count results against the master list, drop entries
   with no count (or count of 0)
4. Return in master-list order

Cache appropriately (whatever pattern existing data fetchers use —
likely `revalidate = 60` on the page level).

## Verify

1. **Current state, before any approvals:** the live site at
   `/categories` should show only the categories with approved
   listings. Per the screenshot in this brief's context, that
   currently means only **Safari Lodges** (4 listings). Other cards
   should not render.
2. **Approve a listing in a previously-empty category** (e.g.
   approve the Matetsi listing as Lodges, or approve a Guided Tours
   listing): refresh `/categories` — the card reappears in its
   master-list position.
3. **Reject the only approved listing in a category**: refresh —
   the card disappears.
4. **Direct link** to `/categories/guided-tours` (or any empty
   category) — page renders with the soft empty-state copy and the
   *Send a brief* CTA. No 404.
5. **Numbering on the index** stays contiguous (01, 02, 03…) even
   when half the categories are hidden.
6. **Footer Categories column** filters the same way.

## Tests

- Unit test for `getActiveCategories`: returns only categories with
  count > 0, in master-list order
- Snapshot test for `/categories` rendering with mixed
  empty/non-empty data
- Snapshot test for `/categories/[slug]` empty-state rendering
- Manual end-to-end on the preview deployment as per Verify steps
  above

## Out of scope

- Restructuring the master list of categories (renaming, merging,
  splitting) — separate editorial decision, not infrastructure
- A general "draft mode" / scheduled-publish workflow for categories
  themselves — over-engineering for the actual need
- Surfacing the count in the public card UI ("4 listings") — that's
  already there; just filtering the cards is enough
- Removing categories from the database — explicitly NOT doing this.
  Categories stay in the master list as concepts; only the rendering
  filters.

## Done means

- `/categories` shows only cards for categories with at least one
  approved listing, contiguously numbered
- `/categories/[slug]` for any (currently-)empty category renders
  the on-brand soft empty state, not a 404
- Footer Categories column filters the same way
- Approving a listing in a hidden category brings the card back; the
  data layer handles this automatically with no manual intervention
- Tests pass
- PR description references this brief
