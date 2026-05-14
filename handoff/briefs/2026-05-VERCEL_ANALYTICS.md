# Vercel Web Analytics + Speed Insights + conversion events

Wire Vercel's privacy-respecting analytics into the site, with seven
custom events that capture the conversion funnel that actually
matters (brief intake, planner calls, field-note reads, newsletter
signups). Exclude `/admin/*` from tracking — we don't need analytics
on our own editorial work.

## Why this shape

Vercel Analytics is cookieless and PII-free by default. No GDPR
banner needed; matches the brand voice register; lives in the
ecosystem we already use. Speed Insights captures real-user Core Web
Vitals so we can verify the image pipeline v2 work is actually paying
off in measurable terms.

The custom events are where the real editorial value lies. Raw
pageview counts won't tell us much. Knowing that *"50% of brief
submissions come from the listing-detail Add-to-a-brief CTA, only
12% from the hero Start-a-brief CTA"* is the kind of insight that
changes editorial decisions about which CTAs to invest in.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/vercel-analytics
```

## Part 1 — install + wire

### Packages

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

(npm works too if pnpm is misbehaving — same packages.)

### Root layout — `app/layout.tsx`

Add both components inside `<body>`, after `{children}`:

```tsx
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// ... inside the body ...
<Analytics
  beforeSend={(event) => {
    // Exclude admin routes from tracking — we don't need analytics
    // on our own editorial work
    if (event.url.includes("/admin")) return null
    return event
  }}
/>
<SpeedInsights
  beforeSend={(event) => {
    if (event.url.includes("/admin")) return null
    return event
  }}
/>
```

That's the full base install. Without anything else, page views,
referrers, devices, geo, and Core Web Vitals all start populating in
the Vercel dashboard.

## Part 2 — custom conversion events

Seven events, instrumented at the conversion points that matter. Each
fires through `track()` from `@vercel/analytics`:

```tsx
import { track } from "@vercel/analytics"
track("event-name", { param1: "value", param2: "value" })
```

Event-name convention: kebab-case, action-led. Parameters are
optional, anonymous only (no PII), and used for slicing in the
dashboard.

### Event 1 — `start-brief-click`

The site's primary CTA, instrumented everywhere it appears.

**Where:**
- The header "START A BRIEF" amber button (every public page) —
  likely in `components/editorial/editorial-header.tsx`
- The hero CTA on the home page — `app/page.tsx`
- Any in-line "Send a brief" / "Start a brief" CTAs on Field Notes
  pages or empty-state components

**Parameters:**
```ts
{ source: "header" | "hero" | "field-notes" | "category-empty-state" | "faq" | "404" }
```

`source` is the critical slice — tells us which CTA placement
actually converts.

### Event 2 — `add-to-brief-click`

When someone clicks "Add to a brief" on a listing-detail page —
indicates editorial interest in a specific property.

**Where:**
- The Add-to-a-brief CTA on `/listings/[id]`

**Parameters:**
```ts
{
  listing_id: string,       // the UUID — useful for sorting popular listings
  listing_name: string,     // the human-readable name — useful for dashboard glance
  category: string,         // lodges / guided-tours / etc.
  region: string,           // Southern Africa / East Africa / etc.
}
```

### Event 3 — `speak-to-planner-click`

When someone opens the Calendly modal.

**Where:**
- Anywhere the modal opens — likely `components/planner-call/planner-call-modal.tsx`

**Parameters:**
```ts
{ source: "home" | "plan" | "plan-sent" | "listing-detail" | "field-notes" }
```

### Event 4 — `brief-submitted`

Successful submission of the 8-step intake on `/plan`. Fires after
the API returns 201 — only count successful submissions, not
attempts.

**Where:**
- The success path in the `/plan` flow — wherever the form completes

**Parameters:**
```ts
{
  pace: "slow" | "mixed" | "active" | null,
  budget_tier: "budget" | "mid" | "luxury" | "exclusive" | null,
  duration: string | null,                    // the "How long?" answer
  has_source_listing: boolean,                // did this brief come from "Add to a brief"?
}
```

No PII, no contact details. These are funnel slices: *"the average
brief is 8-night, luxury tier, started from listing-detail"* is the
shape of insight we want.

### Event 5 — `newsletter-signup`

When someone signs up for the dispatch.

**Where:**
- `components/newsletter-form.tsx` (or wherever the success path is)

**Parameters:**
```ts
{ source: "faq" | "field-notes" | "footer" | "home" }
```

### Event 6 — `field-note-read-complete`

Fires when a Field Notes article gets read to 75%+ of its scroll
depth. Indicates genuine editorial engagement (not just bounces).

**Where:**
- Field Notes article pages — probably `app/resources/.../page.tsx`
  variants. A small client component that listens for scroll depth.

**Parameters:**
```ts
{
  slug: string,              // the article slug
  category: string,          // planning / seasonal / conservation / safety / etc.
}
```

Implementation note: throttle to fire once per session per article.
Use `IntersectionObserver` against a sentinel element at 75% of the
article body, or scroll position math. Either works.

### Event 7 — `calendly-booking-completed`

If Calendly's embed fires a postMessage on booking success (it
does — `data.event === 'calendly.event_scheduled'`), capture that as
a confirmed planning call.

**Where:**
- Inside the Calendly modal component, listen for the postMessage

**Parameters:**
```ts
{ source: "home" | "plan" | "plan-sent" | "listing-detail" }
```

This is the closest thing we have to a "conversion" event short of
an actual booking. Worth measuring.

## Part 3 — admin exclusion (defense in depth)

The `beforeSend` filter in the root layout excludes `/admin/*` from
all Vercel events. Additionally, the custom `track()` calls should
not fire from admin contexts. Since admin components are clearly
separated from public components, this should happen naturally — but
add a quick check in the helper if needed:

```tsx
// lib/analytics/track.ts (optional helper)
import { track as vercelTrack } from "@vercel/analytics"

export function track(name: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return
  }
  vercelTrack(name, props)
}
```

If Code prefers to use `@vercel/analytics` directly without a wrapper,
that's fine — the `beforeSend` filter is the actual safeguard.

## Verification

1. Push the branch, get a Vercel preview deployment
2. Visit the preview, click around as a visitor:
   - Click the header Start a brief → see `start-brief-click` with
     `source: header` in Vercel dashboard within ~60s
   - Open a listing detail, click Add to a brief → see
     `add-to-brief-click` with the listing name
   - Open the Calendly modal → see `speak-to-planner-click` with
     the source
   - Read a Field Note to the bottom → see
     `field-note-read-complete`
   - Submit a brief on `/plan` → see `brief-submitted` with the
     funnel parameters
3. Visit `/admin/listings` and click around — confirm NO events
   appear for admin paths in the dashboard
4. Open the Vercel Speed Insights dashboard — Core Web Vitals
   populating for public routes only

Data appears in dashboards within ~30-60 seconds. Aggregated
breakdowns may take a few minutes longer.

## Documentation update

Once shipped, add a short section to `handoff/CHANGELOG.md` under the
new PR entry, plus a one-paragraph note in a new
`handoff/ANALYTICS.md` (or under an existing operational doc) on:

- Where the dashboards live (Vercel project → Analytics, Speed
  Insights)
- The seven custom events and what they mean
- The admin exclusion behaviour
- The "no PII / no cookies" stance

Keeps future maintainers honest about what we're capturing.

## Tests

- Unit test for the optional `track()` wrapper if it ships: admin
  path → no-op; public path → calls underlying tracker
- Component tests for each instrumented CTA: clicking the CTA calls
  `track()` with the expected event name + parameters
- E2E (manual is fine for v1): walk through the verification steps
  above against the preview deployment

## Out of scope

- A/B testing infrastructure (Vercel Edge Config + flags) — separate
  effort if/when we want to experiment with CTA copy or layout
- Server-side event tracking — Vercel Analytics is client-side by
  design. Brief notifications via Resend already log to the DB on the
  server-side; that's the right place for server events.
- Funnel visualisation across events — Vercel's dashboard is basic.
  Cohort or funnel analysis is a job for PostHog / Mixpanel if we
  ever outgrow the basics. Not now.
- User identification or tracking across sessions — explicitly NOT
  doing this. Cookieless / no-PII is the editorial principle and
  matches the brand voice.

## Pricing note

Both Vercel Web Analytics and Speed Insights are free on the Hobby
tier. Hobby has a 2,500 events/month allowance for Web Analytics; at
our current traffic that's plenty. Pro tier is $14/month per project
for 100k events when we outgrow it.

Separately and not blocking this brief: Safari Overland's a Delaware
LLC, which Vercel's Hobby tier technically doesn't cover (it's for
non-commercial use). When traffic justifies it or commercial
compliance matters, moving to Pro is a separate operational step.

## Done means

- Both packages installed
- Root layout renders `<Analytics>` and `<SpeedInsights>` with
  `beforeSend` admin exclusion
- All seven custom events fire from the documented CTAs / completion
  paths
- Admin routes do not appear in the analytics dashboard
- `handoff/ANALYTICS.md` (or equivalent) documents the event taxonomy
- Tests pass
- PR description references this brief
