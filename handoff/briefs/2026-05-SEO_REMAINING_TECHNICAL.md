# Safari Overland — SEO Brief 2: Remaining Technical Improvements

The follow-on to `2026-05-SEO_CRITICAL_AND_HIGH_PRIORITY.md` (PR #14,
merged). Covers the Medium/Low items from the same external audit:
generator-tag removal, robots.txt tightening, the `/resources` →
`/field-notes` URL migration, image alt-text audit, Core Web Vitals
tuning, last-updated dates plumbing, head-metadata polish, hreflang
scaffold, and an internal-link audit sweep.

---

## Codebase context (Cowork preamble)

Brief 2 was written from the same generic-Next.js perspective as
Brief 1. Six things to know before applying:

### Brand colours — the brief uses the wrong ones

Brief #7 (head-metadata polish) and the manifest example both
reference `themeColor: "#1F3A1F"` (a brand green). **There is no
green in our palette.** Our actual brand tokens (declared on `:root`
in `app/globals.css`):

| Token | Hex | Use |
|---|---|---|
| `--night` | `#0E110F` | Page background; theme colour |
| `--bone` | `#EDE7D8` | Primary text on dark |
| `--amber` | `#D6A24A` | Accent — eyebrows, CTAs, italic accents |
| `--amber-deep` | `#A8792F` | Hover / pressed states |

For the brief's "themeColor" recommendation, use **`#0E110F`** (which
is already what `viewport.themeColor` in `app/layout.tsx` exports —
don't change it). The `manifest.json` example in the brief has the
wrong colours too: ours uses `theme_color: "#0E110F"` and a `bone`-
toned background. Don't overwrite the existing manifest with the
brief's example values — leave them as they are.

### Alt-text policy — drop the brand-stuffing

The brief recommends alt text like:
> `alt="Two cheetahs at sunset, Mara North conservancy, Kenya — Safari Overland editorial photography"`

The trailing **"— Safari Overland editorial photography"** is
off-brand. Brand voice principle: trust the noun, don't claim. Image
search will rank for *cheetahs / sunset / Mara North / Kenya* — not
for the brand stuffed at the end. Drop the suffix.

Correct patterns:

- Good: `alt="Two cheetahs at sunset on the Mara North conservancy, Kenya"`
- Good: `alt="Somalisa Camp pool at dusk with elephants drinking, Hwange, Zimbabwe"`
- Good (lodge interior): `alt="Suite interior at Matetsi Victoria Falls, Zimbabwe — bath with Zambezi view"`

Also: do **not** attribute photographs to specific people
(operators, founders, photographers) in alt text unless explicitly
authorised — alt text is editorial register, not credit-line
register. The brief's example *"Beks Ndlovu's Somalisa Camp pool"*
should be `alt="Somalisa Camp pool with elephant herd, Hwange, Zimbabwe"`
instead.

### Editorial-page structure — they're `.tsx`, not MDX

Brief #6 (last-updated dates) proposes a frontmatter pattern:

```yaml
---
title: "..."
publishedAt: 2026-01-12
updatedAt: 2026-05-18
editorId: editor-jane-doe
---
```

**This doesn't apply to our codebase.** Editorial pages
(`app/resources/.../page.tsx` — or `app/field-notes/.../page.tsx`
post-migration) are individual `.tsx` files, not MDX. They already
export `metadata` per Brief 1's canonical fix.

For dates plumbing, the right shape for our codebase:

```tsx
// app/field-notes/planning-guides/what-to-pack/page.tsx
export const metadata: Metadata = {
  title: "What to Pack — The Honest Safari List",
  description: "...",
  alternates: { canonical: "..." },
}

// Editorial dates exported as separate named constants so the
// Byline + ArticleJsonLd can pick them up.
export const publishedAt = "2026-01-12"
export const updatedAt = "2026-05-18"
export const editorId = "editor-niels"
```

The Byline component built in Brief 1 currently reads `dateModified`
from file mtime via `fs.stat`. Brief 2's Fix #6 plumbing graduates
this to per-page `publishedAt` / `updatedAt` constants. Update the
Byline + ArticleJsonLd to read from these page exports rather than
file mtime.

### URL migration (Fix #3) — scope is larger than the brief implies

The brief reads as if Fix #3 is "rename folder + add redirects". In
practice, the migration touches:

- **Folder rename**: `app/resources/` → `app/field-notes/` (recursive)
- **Every internal link** site-wide that points at `/resources/...` —
  there are dozens. Code's PR #14 added related-content modules and
  breadcrumbs with `/resources/...` URLs hardcoded; the sitemap was
  built with `/resources/...` paths.
- **Sitemap** — `app/sitemap.ts` from Brief 1 references `/resources`.
  Update to `/field-notes`.
- **Footer links** — `components/editorial/editorial-footer.tsx`
  has a "Field notes" column linking to `/resources/...` paths.
- **Header nav** — `components/editorial/editorial-header.tsx`
  has the *"Field notes"* nav entry pointing at `/resources`.
- **Social launch queue** — `handoff/SOCIAL_LAUNCH_QUEUE.md`
  references the field notes section (check for `/resources/` URLs;
  there may be none, but worth a grep).
- **Briefs and docs** — multiple `handoff/briefs/*.md` files reference
  `/resources/...` paths. Update where they appear in actionable
  guidance (skip historical references where renaming would distort
  the record).
- **Test fixtures** — any vitest snapshots that include `/resources/`
  URLs need regenerating.

Grep target before starting:

```bash
rg "/resources" app/ components/ lib/ handoff/ --type ts --type tsx --type md
```

The 301 redirects in `next.config.mjs` (note: project uses `.mjs`,
not `.js` — the brief's example uses `module.exports`; ours uses
`export default`) are easy. The grep-and-replace pass is the bulk
of the work.

### Existing state from Brief 1 (PR #14)

Five things Brief 2 doesn't restate but Code should know about:

1. **Title tags** — single-suffix now. Don't re-fix.
2. **Global JSON-LD** — `components/JsonLd/GlobalJsonLd.tsx` exists,
   wired in `app/layout.tsx`. Don't duplicate.
3. **Breadcrumbs** — `components/JsonLd/BreadcrumbsJsonLd.tsx` +
   `components/Breadcrumbs.tsx` exist; wired on every non-homepage
   page.
4. **Dynamic sitemap** — `app/sitemap.ts` exists, pulling from
   `getListings()` and `getActiveCategories()` and a hand-enumerated
   list of field-note URLs. Update its URLs when Fix #3 lands; don't
   replace.
5. **Article + Byline + Related modules** —
   `components/JsonLd/ArticleJsonLd.tsx`, `components/Byline.tsx`,
   `components/RelatedFieldNotes.tsx`, `components/RelatedListings.tsx`
   all exist. Fix #6 plumbs proper dates into Article+Byline; Fix #9
   extends Related wiring across more pages.

### Image setup — what's already there

For Fix #5 (Core Web Vitals): the codebase has two image processing
layers already:

- **Upload-time** — `sharp` pipeline in `app/api/admin/upload/route.ts`
  resizes to 2400px max, strips EXIF, converts to WebP. All
  operator-supplied photography lands in storage already
  optimisation-ready.
- **Runtime** — Next.js `<Image>` (Vercel image optimizer) handles
  responsive serving and lazy-loading.

Brief #5's `next.config.mjs` additions (formats AVIF+WebP, deviceSizes,
imageSizes, minimumCacheTTL) extend the runtime layer. Adding AVIF
is sensible — better compression than WebP — but verify the existing
config isn't already setting any of these before piling on.

For the blur-placeholder recommendation: needs the `plaiceholder`
library or similar to generate `blurDataURL` strings at build time.
Worth adding as a dep — without it, `placeholder="blur"` either
needs a hardcoded base64 string per hero (tedious) or a runtime
generator. `plaiceholder` runs at build time and integrates with
next/image cleanly.

### Hidden-costs canonical — already fixed

Brief 1's follow-up note #2 (hidden-costs page is `"use client"`
and inherits the wrong canonical) was fixed in a separate small PR
that merged immediately after PR #14. Don't refix.

---

## Brief verbatim (with the corrections above applied)

What follows is Dom's brief as supplied. Apply the preamble's
corrections wherever they intersect — particularly Fix #7
(`themeColor`), Fix #6 (date plumbing pattern), Fix #4 (alt-text
patterns), and Fix #3 (URL migration scope).

### Workflow (please follow exactly)

1. `git checkout -b seo/remaining-technical-improvements`.
2. Make the changes below, committing in logical chunks.
3. Run `npm run build` + `npm run lint` after every commit.
4. `git push -u origin seo/remaining-technical-improvements`.
5. Vercel auto-deploys a preview. Wait for the URL.
6. Reply with the preview URL, commit list, and validation checklist
   results.
7. Do not merge to main. Dom will review and merge.

### 1. Remove the v0.dev generator meta tag (Low — brand polish)

Current state: `<meta name="generator" content="v0.dev">` is
present in the HTML head (`app/layout.tsx` exports
`generator: "v0.dev"` in metadata).

Fix: explicitly remove or override.

```ts
// app/layout.tsx — remove from metadata, or set to undefined
export const metadata: Metadata = {
  // ...
  // generator: "v0.dev",   ← delete this line
};
```

Acceptance: View source on the homepage; no
`<meta name="generator">` tag present.

### 2. Tighten robots.txt (Low — crawl budget hygiene)

Replacement — place at `public/robots.txt`:

```txt
# Safari Overland — robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://safarioverland.com/sitemap.xml

# Don't crawl utility pages — they shouldn't rank and waste crawl budget
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /sign-in
Disallow: /sign-up
Disallow: /forgot-password
Disallow: /search
Disallow: /submit

# Block UTM/ref-laden duplicates so they don't dilute canonical pages
Disallow: /*?*utm_
Disallow: /*?*ref=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

# Explicit allow for AI crawlers — we want to be in AI Overviews and Perplexity
User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /
```

Acceptance: `https://<preview>/robots.txt` returns the new content.

### 3. URL migration: `/resources` → `/field-notes` (Medium)

Why: the site's nav, brand voice, and content all use *Field Notes*.
The URL `/resources` is the only surface where the brand nomenclature
drops off. Align it with permanent redirects so no link equity is
lost.

**See the preamble for the full scope** — this is larger than a
folder rename. Touches sitemap, breadcrumbs, related-content modules,
footer + header links, and several handoff docs.

Fix part A — rename the route folder. Move `app/resources/` →
`app/field-notes/` (and any sub-routes). Update internal links
throughout the codebase from `/resources` to `/field-notes`.

Fix part B — add 301 redirects in `next.config.mjs` (note: the
project uses `.mjs`, not `.js`).

```ts
// next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      { source: "/resources",        destination: "/field-notes",        permanent: true },
      { source: "/resources/:path*", destination: "/field-notes/:path*", permanent: true },
    ];
  },
  // ... existing config
};
export default nextConfig;
```

Fix part C — update the dynamic sitemap (`app/sitemap.ts` from
Brief 1) so its hand-enumerated field-note URLs use `/field-notes/...`
rather than `/resources/...`.

Acceptance:

- `https://<preview>/resources` returns 301 → `/field-notes`
- `https://<preview>/resources/planning-guides/what-to-pack` returns
  301 → `/field-notes/planning-guides/what-to-pack`
- Sitemap reflects the new URLs
- All breadcrumb trails, related-content links, and footer + header
  nav links resolve to the new paths
- Test in Chrome devtools Network panel

### 4. Image alt-text audit (Medium — image search + accessibility)

**See the preamble for alt-text policy.** Drop brand-stuffing
suffixes; don't credit individuals without authorisation; trust
the noun.

Grep the codebase for `<Image` and `<img` and audit every alt prop.
Replace generic or missing alts with descriptive text that names
the subject, the place, and (where relevant) the context.

Acceptance: zero matches for generic alts:

```bash
grep -rEn 'alt=""|alt="image"|alt="hero"|alt="photo"' app/ components/ --include="*.tsx" --include="*.jsx"
```

And no `<Image>` / `<img>` missing the `alt` prop entirely.

For decorative images (e.g. a thin border ornament), `alt=""` is
correct — but explicit, not omitted.

### 5. Image optimisation for Core Web Vitals (Medium)

Fix part A — update `next.config.mjs`:

```ts
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,  // 1 year
  },
  // ... existing config (merge with redirects from Fix #3)
};
```

Fix part B — audit every `next/image` usage:

- LCP / hero images: add `priority` (one per page max)
- LCP / hero images: include `placeholder="blur"` with a real
  `blurDataURL`
- Below-fold images: omit `priority`; Next.js lazy-loads by default
- Always set `sizes` — `"100vw"` for hero, `"(min-width: 768px) 50vw, 100vw"`
  for grids

For `blurDataURL`: add the `plaiceholder` library (see preamble) to
generate the base64 preview at build time. Without it, `placeholder="blur"`
needs hand-rolled base64 per hero image, which is tedious.

```tsx
import Image from "next/image";

<Image
  src="/heroes/africa-slowly.jpg"
  alt="Acacia woodland at sunset, Hwange National Park, Zimbabwe"
  width={2400}
  height={1600}
  priority
  sizes="100vw"
  placeholder="blur"
  blurDataURL={blurDataUrl}   // generated by plaiceholder at build
/>
```

Fix part C — run Lighthouse on the preview for mobile + desktop on:

- `/`
- `/destinations/east-africa`
- `/field-notes/planning-guides/what-to-pack` (post Fix #3)

Confirm:

- LCP < 2.5s on mobile
- CLS < 0.1
- INP < 200ms

Acceptance: Lighthouse mobile Performance ≥ 85 on all three pages.

### 6. Last-updated dates on editorial pages (Medium — freshness signal)

**See the preamble for the per-page export pattern** — our pages
are `.tsx`, not MDX, so frontmatter doesn't apply. Use exported
constants:

```tsx
// app/field-notes/planning-guides/what-to-pack/page.tsx
export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: { canonical: "..." },
}

export const publishedAt = "2026-01-12"
export const updatedAt = "2026-05-18"
export const editorId = "editor-niels"
```

Update `components/Byline.tsx` and `components/JsonLd/ArticleJsonLd.tsx`
(both from Brief 1) to read these page exports rather than the
file-mtime fallback currently in place.

For `editorId`, only `editor-niels` exists at present. The editor
data structure was scaffolded in Brief 1; add the photo + LinkedIn
sameAs once Dom supplies (the byline degrades gracefully without
them — leave `photo: null` if not supplied).

Acceptance: open three different field-note pages on the preview;
each shows a `Published ... · Updated ...` line under the H1; both
dates appear in the page's ArticleJsonLd.

### 7. `<head>` metadata polish (Low)

```ts
// app/layout.tsx — additions to metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://safarioverland.com"),
  applicationName: "Safari Overland",
  authors: [{ name: "Safari Overland Editorial", url: "https://safarioverland.com/about" }],
  creator: "Safari Overland",
  publisher: "Safari Overland",
  formatDetection: { email: false, address: false, telephone: false },
  // generator removed in Fix #1
  // ...
};
```

**Theme colour:** the brief's example uses `#1F3A1F` (green) — that's
wrong for our palette. Don't change `viewport.themeColor` in
`app/layout.tsx`; it's already `#0E110F` (correct, matches
`--night`).

**manifest.json:** the brief proposes new colours. **Do not
overwrite the existing manifest.** Our `public/manifest.json` already
exists with the correct brand colours; leave it alone. Just confirm
`app/layout.tsx` metadata references it:

```ts
icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
manifest: "/manifest.json",
```

### 8. Hreflang scaffold (Low — future-proof)

Site is English-only now; stub for later:

```ts
alternates: {
  canonical: "https://safarioverland.com",
  languages: {
    "en": "https://safarioverland.com",
    "x-default": "https://safarioverland.com",
  },
},
```

### 9. Internal-link audit sweep (Medium)

Brief 1's Related modules were wired onto 3 sample pages only. This
fix extends to every destination, category, and field-note page.

Audit pattern — walk every existing page and confirm:

- Every mention of a country, park, region, or topic that has a
  destination / field-note / category page is linked
- Every CTA is keyword-bearing (*"East Africa safari guide"*) or
  branded (*"Open the collection"*) — never "Read more" / "Click
  here"
- `<RelatedFieldNotes>` and `<RelatedListings>` are rendered at the
  bottom of every editorial / destination / category page

Be conservative — only change anchors where the replacement reads
naturally in context. Don't stuff.

Acceptance: spot-check 5 pages; each has at least 8 internal links
(excluding nav + footer), each with descriptive anchor text.

---

## Final validation checklist before pushing

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes
- [ ] View source on `/`: no `<meta name="generator">` tag
- [ ] `/robots.txt` returns the new content
- [ ] `/resources` and `/resources/...` URLs return 301 →
      `/field-notes/...`
- [ ] Grep returns zero matches for generic alt text
- [ ] Lighthouse mobile Performance ≥ 85 on `/`,
      `/destinations/east-africa`, and one field-note page
- [ ] Three different field-note pages show `Published ... ·
      Updated ...` under the H1
- [ ] `themeColor` is `#0E110F` (untouched); `manifest.json`
      untouched
- [ ] `alternates.languages` stub present in `app/layout.tsx`
- [ ] No console errors in Chrome devtools on the preview deploy
- [ ] All schema blocks still validate clean at
      https://validator.schema.org/

## When done

1. `git push -u origin seo/remaining-technical-improvements`
2. Wait for Vercel preview URL
3. Reply with: (a) the preview URL, (b) bullet list of commits,
   (c) confirmation of the validation checklist, (d) anything
   noticed that should go into a follow-up brief
4. Do not merge to main. Dom will review and merge.
