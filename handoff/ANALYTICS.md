# Analytics — Vercel Web Analytics + Speed Insights

Where the dashboards live, what the events mean, and what we deliberately
don't capture.

## Dashboards

Both products are wired into the Vercel project and require no additional
configuration in code beyond the components in `app/layout.tsx`.

- **Web Analytics**: Vercel dashboard → project → Analytics. Page views,
  referrers, devices, geographies, and the seven custom events documented
  below.
- **Speed Insights**: Vercel dashboard → project → Speed Insights. Real-user
  Core Web Vitals (LCP, INP, CLS, FCP, TTFB) bucketed by route.

Data appears within ~30–60 seconds of the event firing. Aggregated
breakdowns lag by a few minutes.

## What's instrumented

### 1. `start-brief-click`

The primary funnel-entry CTA, instrumented every time it appears on a
public page. The `source` slice is the critical one — tells us which
placement is doing the conversion work.

| Where | `source` |
| --- | --- |
| `EditorialHeader` amber button | `header` |
| Home page hero block | `hero` |
| Home page "A safari, drawn by hand" card | `home-plan-card` |
| `/resources/*` GuidePage CTA cards pointing at `/plan` | `field-notes` |
| `CategoryEmptyState` component | `category-empty-state` |
| `/categories` root, no-categories-yet path | `categories-empty` |
| `/resources/faqs` bottom CTA | `faq` |
| `/404` (`app/not-found.tsx`) | `404` |
| `/plan/sent` missing-handoff fallback | `plan-sent` |

### 2. `add-to-brief-click`

Fires when someone clicks "Add to a brief" on a listing detail page.
Instrumented on both the desktop CTA inside `ListingDetail` and the
mobile `StickyCTA` strip.

Params: `listing_id`, `listing_name`, `category`, `region`. The id sorts
"most-pinned" lodges in the dashboard; the name is the at-a-glance label;
category + region let us reason at the bucket level.

### 3. `speak-to-planner-click`

Fires when someone opens the Calendly modal — `PlannerCallTrigger`
intercepts the click before flipping the modal `open` state.

Params: `source` ∈ `home | plan | plan-sent | listing-detail | field-notes`.

### 4. `brief-submitted`

Fires after `/plan`'s submission returns 2xx — only successful intakes,
not attempts.

Params:
- `pace`: `slow | mixed | active | null`
- `budget_tier`: `budget | mid | luxury | exclusive | null`
- `duration`: the raw "how long?" answer (e.g. `"8-10 nights"`)
- `has_source_listing`: `true` when the brief came from a listing-detail
  "Add to a brief" path

PII is deliberately excluded: name, email, phone, and the free-text note
never leave the form's local state for analytics purposes.

### 5. `newsletter-signup`

Fires on a successful dispatch subscription. Param: `source` ∈
`faq | field-notes | footer | home` (only `faq` and `field-notes` are
wired today; the others are reserved for when the form lands there).

### 6. `field-note-read-complete`

Fires once per page-load the first time the visitor scrolls past 75%
of the document. Implementation lives in
`components/analytics/field-note-read-tracker.tsx` and mounts inside
`GuidePage` so every long-form article picks it up automatically.

Params: `slug`, `category` — auto-derived from the pathname (URL shape
`/resources/{category}/{slug}`).

### 7. `calendly-booking-completed`

Fires when Calendly's embed posts a `calendly.event_scheduled` message.
This is the closest signal we have to a confirmed planning call short
of an actual booking inside the operator stack.

Params: `source` ∈ `home | plan | plan-sent | listing-detail | field-notes`
— threaded through from the original `speak-to-planner-click` so the
two events share provenance.

## Admin exclusion (defence in depth)

We don't want analytics on our own editorial back-of-house. Two layers:

1. **`<Analytics>` and `<SpeedInsights>` in `app/layout.tsx`** filter
   `event.url.includes("/admin")` via `beforeSend`. This covers page
   views and Core Web Vitals.

2. **`lib/analytics/track.ts`** wraps `@vercel/analytics`' `track()` and
   no-ops when `window.location.pathname` starts with `/admin`. This
   covers the seven custom events even if a shared CTA component gets
   reused on a future `/admin/*` page.

Either layer alone is enough; both together mean a future maintainer
adding a CTA to an admin page won't accidentally pollute the dashboard.

## What we don't capture

- **No cookies.** Vercel Analytics is cookieless by design.
- **No PII.** No emails, names, phones, IPs, or full URLs with query
  strings that could carry tracking IDs.
- **No cross-session identification.** Each visit is anonymous.
- **No server-side events.** Brief submissions hit `/api/briefs/submit`,
  which logs the successful row to Postgres and dispatches operator
  notifications via Resend — that's the right place for server-side
  state. The client-side `brief-submitted` event is the funnel signal,
  not the audit log.

## Verification — manual

After a deploy, walk the preview and confirm in the dashboard:

1. Click the header **Start a brief** → `start-brief-click` with
   `source: header` appears in 30–60s.
2. Open a listing detail → click **Add this to a brief** → see the event
   with the listing id.
3. Open the Calendly modal → see `speak-to-planner-click`. Booking a slot
   in the embed fires `calendly-booking-completed` with the same source.
4. Read a Field Note past the 75% line → see `field-note-read-complete`.
5. Submit a brief on `/plan` → see `brief-submitted` with the funnel
   parameters.
6. Visit `/admin/listings` and click around — **no** events should appear
   for admin paths in either dashboard.

## Pricing context

Free on the Hobby tier (2,500 events/month for Web Analytics).
Safari Overland is a Delaware LLC; Vercel Hobby tier is for non-commercial
use, so when traffic justifies it the project will move to Pro
($14/month/project, 100k events) — operationally separate from this
change.

## Google Ads offline conversions

Option B from `handoff/relaunch/marketing/PAID_SEARCH_PLAN.md` §7: no
Google tag for ads, no cookies. Conversions are uploaded to Google Ads by
hand, once a week.

### How the click ID reaches the brief

1. `components/analytics/click-capture.tsx` (mounted once in
   `app/layout.tsx`) reads `gclid`, `gbraid`, `wbraid` and `utm_source /
   medium / campaign / term / content` from the landing URL and keeps them
   in **localStorage** under `so_click_attribution`. Logic lives in
   `lib/analytics/click-ids.ts`.
   - UTMs are **first touch**; the click ID is the **last ad click**
     (Google credits the last click).
   - Each touch expires after 90 days, Google's limit for uploading
     against a click.
   - Wrapped in try/catch throughout — blocked or full storage just means
     no attribution.
2. `/plan` sends the stored values with the brief and clears them after a
   2xx. The submit API validates each field leniently (length-capped
   strings; anything malformed is dropped, never rejected) and writes
   them to `briefs.gclid`, `gbraid`, `wbraid`, `utm_*` and
   `click_captured_at` (migration `20261109`).
3. The admin briefs list shows a small "Source" line under the contact
   (`utm_source / utm_campaign · Google Ads click`), and the CSV export
   carries all nine columns.

Prerequisites in Google Ads: **auto-tagging on**, and the final URL suffix
from the paid-search plan (`utm_source=google&utm_medium=cpc&...`).

### Weekly upload

1. In Google Ads, create a conversion action of type *Import → Conversions
   from clicks*, named exactly **`Brief submitted`** (Submit lead form,
   count One, 90-day click-through window — see the plan's table). The
   name in the file must match exactly, including capitals.
2. Each week (same day, so nothing ages past 90 days), pull the last
   week's briefs with a gclid. Either filter the admin CSV export to rows
   with a `gclid`, or run this in the Supabase SQL editor:

   ```sql
   SELECT
     gclid                                                   AS "Google Click ID",
     'Brief submitted'                                       AS "Conversion Name",
     to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS') AS "Conversion Time"
   FROM briefs
   WHERE gclid IS NOT NULL
     AND created_at >= now() - interval '7 days'
   ORDER BY created_at;
   ```

3. Build the upload file from Google's template (Goals → Conversions →
   Uploads). The conversion time is the brief's `created_at` (when the
   conversion happened), not `click_captured_at`. Use the
   `yyyy-MM-dd HH:mm:ss` format with a time zone parameter row, e.g.:

   ```
   Parameters:TimeZone=+0000
   Google Click ID,Conversion Name,Conversion Time
   Cj0KCQ...,Brief submitted,2026-11-09 14:03:12
   ```

   Google also accepts the offset inline (`2026-11-09 14:03:12+0000`) or a
   time zone ID (`2026-11-09 14:03:12 Europe/London`); it recommends a
   time zone ID to avoid daylight-saving errors, and calls missing or wrong
   time zones a frequent cause of upload errors. Conversion Value and
   Currency are optional — blank uses the action's default value.
4. Upload, then check the upload's diagnostics a few hours later for
   rejected rows ("click is too old", unrecognised click ID).

Sources: Google Ads Help, *About importing offline conversions (legacy)*
template and format guidance —
https://support.google.com/google-ads/answer/7014069 (fetched 2026-11-09);
90-day click ID lifetime and "click is too old" —
https://support.google.com/google-ads/answer/10029210 and
https://support.google.com/google-ads/answer/7012522.

**Not confirmed / open:**

- Google labels gclid file import **"legacy"** and recommends importing
  through **Google Ads Data Manager** (and enhanced conversions for leads,
  which matches on hashed email and normally assumes the Google tag). The
  file upload still works as far as the docs say, but it may be retired.
  Check before the first upload and revisit if Google announces a date.
- If enhanced conversions for leads is ever switched on at account level,
  Google says to use a different template; the gclid-only template can
  error.
- **gbraid / wbraid**: the page above mentions GBRAID support in offline
  import but says nothing about WBRAID, and I couldn't confirm whether the
  UI template has columns for either. At launch, upload gclid rows only;
  gbraid/wbraid are stored so they're available if needed.
- The 90-day figures come from Google pages surfaced via search; I read
  7014069 directly but not the two 90-day pages in full.
- `Parameters:TimeZone=+0000` follows Google's documented GMT-offset form;
  not yet tested with a real upload.

## See also

- `lib/analytics/events.ts` — the typed event-name → params map
- `lib/analytics/track.ts` — the wrapper that no-ops on `/admin/*`
- `components/analytics/*` — shared client components (StartBriefLink,
  AddToBriefLink, FieldNoteReadTracker)
- `handoff/briefs/2026-05-VERCEL_ANALYTICS.md` — the originating brief
