> ✓ **SHIPPED** — 2026-05-19, PR #14 merged to `main`.
> See `handoff/CHANGELOG.md` for the session-level summary and the
> four follow-up notes from Code (one small bug fix on the
> hidden-costs page canonical; three items naturally falling into
> Brief 3 scope).

# Safari Overland — Critical & High-Priority Technical SEO Fixes

Brief composed by Dom from an external audit. Template-level fixes
that apply across the whole site: fix once, every page benefits. Page
content rewrites and net-new pages are separate briefs (Brief 2 and 3,
respectively).

---

## Codebase context (Cowork preamble)

The original brief was written from a generic Next.js / v0.dev
perspective and assumes "no other context". A few project-specific
facts will help Code skip the wrong assumptions:

### URL structure differences from the brief

The brief uses idealised URL shapes (`/lodges/[slug]`,
`/field-notes/[category]/[slug]`). The codebase as it stands uses:

| Brief assumes | Codebase actually uses |
|---|---|
| `/lodges/[slug]` | `/listings/[id]` (UUID-keyed) |
| `/field-notes/[category]/[slug]` | `/resources/...` (nested category folders, not slugs) |
| `/field-notes` (top-level hub) | `/resources` |

A URL migration to clean names (`/lodges/[slug]`,
`/field-notes/[category]/[slug]`) is referenced as "fix #9" in the
brief — but **fix #9 doesn't exist in the brief**. That's a typo /
omission. **For this PR, use the existing `/listings/[id]` and
`/resources/...` URL shapes** wherever the brief says
`/lodges/[slug]` or `/field-notes/...`. A separate URL migration
brief can come later if Dom wants the cleaner paths.

### Content loader names

The brief assumes `getAllLodges()`, `getAllFieldNotes()`,
`getAllDestinations()`, `getAllCategories()` in `@/lib/content`. The
codebase has:

- `lib/listings.ts` — `getListings()` (returns approved listings),
  also `getListingForAdmin()` for the preview route
- `lib/categories.ts` — `getActiveCategories()` (categories with at
  least one approved listing)
- Field-note content is hard-coded into individual page components
  under `app/resources/...`; there is no central content loader for
  field notes
- Destinations are hard-coded into `app/destinations/[country]/`

For the sitemap (fix #4), use these existing functions. Field notes
will need their slugs enumerated from the file structure (`app/
resources/**/page.tsx`) rather than a content collection.

### Logo path

The brief uses `https://safarioverland.com/logo.png`. **That asset
doesn't exist.** The canonical logo location is
`https://safarioverland.com/images/logo/safari-overland-mark-512.webp`
for the elephant mark, or
`https://safarioverland.com/images/logo/safari-overland-horizontal-600.png`
for the horizontal lockup. Use one of those in the Organization
JSON-LD's `logo` field — schema.org accepts WebP, but if you want
maximum crawler compatibility, point at a PNG variant.

### Editor identity — Niels van de Meer

The brief's E-E-A-T section (fix #6) asks Code to scaffold an editor
structure and "ask Dom for the actual editor name(s), photo(s), and
social handles." That work is already done — the canonical editor /
author voice for every published piece on this site is
**Niels van de Meer**, co-founder, based at Victoria Falls.
`handoff/BRAND_VOICE.md` is the canonical source.

For the editor data structure, use:

```ts
export const niels = {
  id: "editor-niels",
  name: "Niels van de Meer",
  jobTitle: "Co-founder, Safari Overland",
  bio: "Co-founder of Safari Overland. Writes from Victoria Falls.",
  // Photo: ask Dom — we don't have a Niels portrait in the repo yet.
  // For now, omit photo from the visible byline and from the
  // ImageObject in JSON-LD until one is supplied. Don't use a
  // placeholder.
  photo: null,
  sameAs: [
    // The Niels-specific LinkedIn — confirm with Dom; the
    // SOCIAL_PLAYBOOK references his founder profile.
  ],
};
```

A separate brief should follow up once we have Niels' headshot and
confirmed LinkedIn URL.

### Social handles (Organization `sameAs`)

The brief lists three handles to verify:

- `https://www.instagram.com/safarioverland`
- `https://www.linkedin.com/company/safarioverland`
- `https://x.com/safarioverland`

Per the SOCIAL_PLAYBOOK and earlier session work: Niels' LinkedIn is
his personal profile (founder-led posting), not a company page.
Instagram is being set up by Dom. Twitter / X is **explicitly out of
scope** per the playbook ("distracting, hostile, off-tone. Skip.")

**Action for Code:**

1. Do not include `x.com/safarioverland`.
2. Confirm `instagram.com/safarioverland` exists; if not, omit.
3. For LinkedIn, link to Niels' personal LinkedIn URL (ask Dom for it)
   rather than a company page — the brand's LinkedIn presence is
   founder-led. If Dom can't supply immediately, omit the entry; do
   not link to a non-existent URL.

### Style tokens — match the brand

The brief uses Tailwind utility classes like `text-stone-500`,
`text-xs uppercase tracking-wider`. These don't match the site's
brand-voice tokens. Use the existing utility classes / tokens from
`tailwind.config.ts` and `globals.css`:

- Eyebrow / mono labels → existing `.eyebrow` and `.mono` classes
- Body text → `text-bone` (light on dark) or `text-ink` (dark on
  light); muted variants `text-bone-mute` / `text-ink-soft`
- Brand colours via existing CSS variables (`--amber`, `--rule`, etc.)

For breadcrumbs specifically (fix #3 UI component), use:

```tsx
<nav aria-label="Breadcrumb" className="eyebrow mb-6">
  <ol className="flex flex-wrap items-center gap-2 text-bone-mute">
    {/* … */}
  </ol>
</nav>
```

`.eyebrow` already gives the small caps + letter-spacing treatment
that matches the rest of the site.

### Existing layout structure

The site has two layout shells:

- `app/layout.tsx` — the global RootLayout (the brief touches this
  for fix #2)
- `app/admin/(chrome)/layout.tsx` — the admin chrome (sidebar,
  header). Admin pages live under `(chrome)/`; do NOT inject the
  Organization/WebSite JSON-LD into admin pages (it'd be useless and
  the analytics admin-exclusion convention says admin surfaces stay
  out of public-facing tooling).

If the global JSON-LD is mounted in the root layout (`app/layout.tsx`),
it will be added to admin pages too. That's probably fine
(Organization+WebSite is universal), but worth being aware of.

The admin section is gated behind HTTP Basic Auth via middleware
(`middleware.ts`). Admin URLs should not appear in the sitemap and
will return 401 to crawlers anyway, but worth filtering explicitly
in `app/sitemap.ts` for cleanliness.

### Already-set metadata patterns

Several public pages already have `metadata` exports with descriptions
and OG tags. The brief assumes a fresh slate — check existing exports
in `app/layout.tsx` and individual page files before adding
duplicate metadata blocks. The title duplication bug (fix #1) is the
likely cause: existing page-level `title:` strings include
`" | Safari Overland"` which the template then appends a second time.

### Things explicitly out of scope for this brief

The brief is clear on this but worth restating:

- **No content rewrites** — page content is Brief 3
- **No new pages** — net-new pages are Brief 2
- **No URL migration** — the missing "fix #9" the brief alludes to;
  keep existing `/listings/[id]` and `/resources/...` paths

---

## Brief verbatim

What follows is Dom's brief as supplied. The eight fixes ship together
in a single branch.

### Workflow (please follow exactly)

1. From the current branch, `git checkout -b seo/critical-and-high-priority-fixes`.
2. Make the changes below, committing in logical chunks (one commit per fix is fine).
3. After every commit, run `npm run build` and `npm run lint` (or the equivalent in this repo) and make sure both pass.
4. When all fixes are in, run a final local build to confirm nothing is broken.
5. `git push -u origin seo/critical-and-high-priority-fixes`.
6. Vercel should auto-deploy a preview. Wait for the preview URL.
7. Paste the preview URL back to Dom with a summary of the commits and the validation checks you ran. Do not merge to main. Dom will review and merge.

### 1. Fix the title-tag duplication bug (Critical)

Symptom: Every templated hub page currently renders `"<Page> | Safari Overland | Safari Overland"` — the brand name appears twice. Verified on `/about`, `/categories`, `/destinations`, `/resources`, `/plan`. The leaf pages (e.g. `/destinations/east-africa`) are unaffected.

Cause: Two layers are appending the brand name. Almost certainly `app/layout.tsx` exports a `metadata.title.template = "%s | Safari Overland"` AND the individual page's `metadata.title` string already includes `" | Safari Overland"`.

Fix: Choose one strategy. Recommended — keep the template, strip the redundant suffix from page-level title strings.

```ts
// app/layout.tsx — keep the template
export const metadata: Metadata = {
  title: {
    default: "Safari Overland — A small collection of African safaris, by hand",
    template: "%s | Safari Overland",
  },
  // ...
};

// app/about/page.tsx — strip the redundant suffix
export const metadata = {
  title: "About — A Curated African Safari Collection from Victoria Falls",
  // The template will produce: "About — A Curated... | Safari Overland"
};
```

Acceptance: View source on five pages (`/`, `/about`, `/categories`, `/destinations`, `/resources`, `/plan`, `/destinations/east-africa`) on the preview URL and confirm exactly one `" | Safari Overland"` per title.

### 2. Ship global structured data (Critical)

Current state: Zero `<script type="application/ld+json">` tags anywhere on the site. This is the single biggest missed-rich-results issue.

Fix: Create `components/JsonLd/GlobalJsonLd.tsx` and inject it once from `app/layout.tsx` so it renders on every page. Use the @graph pattern so the Organization and WebSite reference each other via `@id`.

```tsx
// components/JsonLd/GlobalJsonLd.tsx
export function GlobalJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://safarioverland.com/#org",
        "name": "Safari Overland",
        "alternateName": "Safari Overland Collection",
        "url": "https://safarioverland.com",
        "logo": "https://safarioverland.com/images/logo/safari-overland-horizontal-600.png",
        "description": "A small, opinionated collection of African safari lodges and operators, written from Victoria Falls.",
        "foundingLocation": { "@type": "Place", "name": "Victoria Falls, Zimbabwe" },
        "areaServed": [
          "Kenya","Tanzania","Uganda","Rwanda",
          "Botswana","Namibia","Zambia","Zimbabwe","South Africa"
        ],
        "knowsAbout": [
          "African safari","Great Migration","Walking safari",
          "Community conservancy","Mobile tented camp","Gorilla trekking"
        ],
        "sameAs": [
          // Confirm with Dom — see preamble. Drop entries that don't
          // resolve.
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://safarioverland.com/#website",
        "url": "https://safarioverland.com",
        "name": "Safari Overland",
        "publisher": { "@id": "https://safarioverland.com/#org" },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://safarioverland.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

```tsx
// app/layout.tsx
import { GlobalJsonLd } from "@/components/JsonLd/GlobalJsonLd";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GlobalJsonLd />
      </body>
    </html>
  );
}
```

Acceptance: On the preview, view source on the homepage and `/about`. Both should contain the same `application/ld+json` block. Paste the JSON into https://validator.schema.org/ and confirm zero errors.

### 3. Ship BreadcrumbList schema + visible breadcrumb UI (High)

Current state: No breadcrumbs in the UI and no BreadcrumbList schema. Detail pages (`/resources/planning-guides/what-to-pack`) have no way back to their parent.

Fix part A — Schema component. Create a reusable `<BreadcrumbsJsonLd>` component that takes an array of `{name, item}` and renders the appropriate JSON-LD.

```tsx
// components/JsonLd/BreadcrumbsJsonLd.tsx
type Crumb = { name: string; item?: string };
export function BreadcrumbsJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      ...(c.item ? { "item": c.item } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

Fix part B — UI component. Create a visible `<Breadcrumbs>` component using existing brand tokens (`.eyebrow`, `text-bone-mute`, `text-bone`) — see preamble.

```tsx
// components/Breadcrumbs.tsx
import Link from "next/link";
type Crumb = { name: string; href?: string };
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-bone-mute">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href
              ? <Link href={c.href} className="hover:text-amber transition-colors">{c.name}</Link>
              : <span className="text-bone">{c.name}</span>}
            {i < crumbs.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

Fix part C — Wire on every non-homepage page. Each page should pass its own crumb trail. Example for the East Africa page:

```tsx
const crumbs = [
  { name: "Home", href: "/", item: "https://safarioverland.com" },
  { name: "Destinations", href: "/destinations", item: "https://safarioverland.com/destinations" },
  { name: "East Africa", item: "https://safarioverland.com/destinations/east-africa" }, // current page, no href
];
```

Use the `href` for the UI component, and pass the same array (mapped to `{name, item}`) to the schema component.

Acceptance: Visible breadcrumb on `/about`, `/destinations`, `/destinations/east-africa`, `/resources`, `/resources/planning-guides/what-to-pack`, `/plan`. Schema validates clean.

### 4. Rebuild the sitemap (Critical)

Current state: `sitemap.xml` lists only 13 URLs. Missing every detail page (listings, individual destinations, field notes).

Fix: Replace the static `public/sitemap.xml` (or the existing static handler) with a dynamic `app/sitemap.ts` that pulls from the actual content. Exclude utility pages and admin: `/sign-in`, `/sign-up`, `/forgot-password`, `/search`, `/submit`, `/admin/*`, `/api/*`.

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";

// Map to the codebase's actual loaders:
import { getListings } from "@/lib/listings";          // approved listings
import { getActiveCategories } from "@/lib/categories"; // categories with at least one approved listing

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://safarioverland.com";

  const staticPages = [
    { url: base,                       priority: 1.0, changeFrequency: "weekly"  as const },
    { url: `${base}/about`,            priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/contact`,          priority: 0.6, changeFrequency: "yearly"  as const },
    { url: `${base}/plan`,             priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/categories`,       priority: 0.9, changeFrequency: "weekly"  as const },
    { url: `${base}/destinations`,     priority: 0.9, changeFrequency: "weekly"  as const },
    { url: `${base}/resources`,        priority: 0.9, changeFrequency: "weekly"  as const },
    { url: `${base}/terms-of-service`, priority: 0.3, changeFrequency: "yearly"  as const },
    { url: `${base}/privacy-policy`,   priority: 0.3, changeFrequency: "yearly"  as const },
  ];

  // Approved listings — currently at /listings/[id]
  const listings = (await getListings()).map(l => ({
    url: `${base}/listings/${l.id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: l.updated_at,
  }));

  // Active categories — only those with at least one approved listing
  const categories = (await getActiveCategories()).map(c => ({
    url: `${base}/categories/${c.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  // Destinations — hard-coded under app/destinations/[country]/
  // Enumerate the four region pages explicitly:
  const destinations = [
    { url: `${base}/destinations/east-africa`,     priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/destinations/southern-africa`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/destinations/west-africa`,     priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/destinations/north-africa`,    priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // Field notes — currently at /resources/...
  // Enumerate from the file structure under app/resources/**/page.tsx.
  // Hand-maintain a list for now until a content loader exists.
  const fieldNotes = [
    // Add entries for each /resources/.../page.tsx file. Example:
    // { url: `${base}/resources/planning-guides/what-to-pack`, priority: 0.7, changeFrequency: "monthly" as const },
    // ...
  ];

  return [...staticPages, ...listings, ...categories, ...destinations, ...fieldNotes];
}
```

If the existing static sitemap lives at `public/sitemap.xml` or there's a route handler at `app/sitemap.xml/route.ts`, delete it before adding `app/sitemap.ts` — Next.js will serve the dynamic one.

For the field-notes URLs, the easiest approach is a grep:
```bash
find app/resources -name "page.tsx" -type f | sed 's|^app|/|; s|/page.tsx$||'
```
…and hand-paste the resulting list into the array. A proper content loader can come later.

Acceptance: Hit `https://<preview>/sitemap.xml` and confirm the count is materially larger than 13 and contains the actual detail-page URLs. Submit to Google Search Console post-merge.

### 5. Add canonical tags to every page (High)

Current state: No `<link rel="canonical">` verified on the homepage HTML.

Fix: Use Next.js `metadata.alternates.canonical` on every page.

```ts
// app/about/page.tsx
export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: {
    canonical: "https://safarioverland.com/about",
  },
};
```

For dynamic routes (`/listings/[id]`, etc.), generate from params:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "...",
    alternates: { canonical: `https://safarioverland.com/listings/${params.id}` },
  };
}
```

Acceptance: View source on 5 pages of different types and confirm a single, correct canonical URL per page.

### 6. Add E-E-A-T author/dateline layer (Critical for ranking — High for ship effort)

Travel content is YMYL-adjacent. Without authors and dates, Google does not see this site as trustworthy.

**Editor identity is already known** — Niels van de Meer. See preamble for the data structure. Photo and LinkedIn URL to be supplied; until then, omit photo and `sameAs` rather than scaffold placeholders.

Fix part A — Editor data structure (see preamble).

Fix part B — Article + Person JSON-LD on field notes.

```tsx
// components/JsonLd/ArticleJsonLd.tsx
type Editor = { id: string; name: string; jobTitle: string; photo: string | null; sameAs: string[] };
type Props = {
  headline: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  editor: Editor;
};
export function ArticleJsonLd({ headline, url, image, datePublished, dateModified, editor }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "@id": `https://safarioverland.com/about#${editor.id}`,
      "name": editor.name,
      "jobTitle": editor.jobTitle,
      ...(editor.photo ? { "image": `https://safarioverland.com${editor.photo}` } : {}),
      "worksFor": { "@id": "https://safarioverland.com/#org" },
      ...(editor.sameAs.length > 0 ? { "sameAs": editor.sameAs } : {}),
    },
    "publisher": { "@id": "https://safarioverland.com/#org" },
    "mainEntityOfPage": url,
  };
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
```

Fix part C — Visible byline component.

```tsx
// components/Byline.tsx
import Image from "next/image";
type Editor = { id: string; name: string; jobTitle: string; photo: string | null };
type Props = { editor: Editor; published: string; updated: string };
export function Byline({ editor, published, updated }: Props) {
  return (
    <div className="flex items-center gap-4 my-8 text-sm text-bone-mute">
      {editor.photo && (
        <Image src={editor.photo} alt={editor.name} width={48} height={48} className="rounded-full" />
      )}
      <div>
        <div>By <span className="font-medium text-bone">{editor.name}</span> — {editor.jobTitle}</div>
        <div className="text-xs">
          Published {new Date(published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          Updated {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}
```

Fix part D — Wire onto every field note page (everything under `app/resources/**/page.tsx`). Show `<Byline>` directly under the H1 and emit `<ArticleJsonLd>` in the same template.

For `published` and `updated` dates — most field-note pages don't currently have these in their data. Two options:

1. **Use file mtime via `fs.stat`** at build time for `dateModified`, fall back to a hardcoded `datePublished` per page. Pragmatic but not great.
2. **Hardcode both dates on each page** as new metadata fields, derived from when each was written. More work but more accurate.

Recommend option 1 for the initial ship, with a comment noting it should graduate to option 2 when each field note is editorially reviewed.

Acceptance: Open `/resources/planning-guides/what-to-pack` on the preview. Confirm a visible byline + dates and a valid Article+Person JSON-LD block.

### 7. Add FAQPage schema sitewide (High)

Current state: Several pages have implicit FAQ-style content (e.g. "When to go?" sections) but no FAQPage schema and no visible "Frequently asked" sections on hubs.

Fix: Create a reusable component that takes an array of `{question, answer}` and renders both the visible accordion UI and the FAQPage JSON-LD.

```tsx
// components/FAQ.tsx
type FAQ = { question: string; answer: string };
export function FAQ({ items, heading = "Frequently asked" }: { items: FAQ[]; heading?: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(i => ({
      "@type": "Question",
      "name": i.question,
      "acceptedAnswer": { "@type": "Answer", "text": i.answer },
    })),
  };
  return (
    <section className="my-12">
      <h2 className="font-serif text-h2-fluid mb-6">{heading}</h2>
      <div className="space-y-4">
        {items.map((i, idx) => (
          <details key={idx} className="border-b border-rule pb-4">
            <summary className="cursor-pointer font-medium">{i.question}</summary>
            <p className="mt-2 text-bone-mute">{i.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </section>
  );
}
```

Note: Do not wire this to every page yet — the FAQ content per page lives in Brief 3 (existing content rewrites). For this brief, just build the component and confirm it works on one page. The `/resources/faqs` page already has FAQ-shaped content suitable as a smoke test (or `/plan` if preferred).

Acceptance: Component built, no usages outside the smoke-test page, FAQPage schema validates.

### 8. Build a contextual internal-link module (High)

Current state: Most pages only link via the global nav + footer. Detail pages have weak cross-linking.

Fix: Create `<RelatedFieldNotes>` and `<RelatedListings>` (note: not `RelatedLodges` — the route is `/listings/[id]`, not `/lodges/[slug]`).

```tsx
// components/RelatedFieldNotes.tsx
import Link from "next/link";
import { getRelatedFieldNotes } from "@/lib/content";

export async function RelatedFieldNotes({ topic, limit = 6 }: { topic: string; limit?: number }) {
  const notes = await getRelatedFieldNotes(topic, { limit });
  if (!notes.length) return null;
  return (
    <section className="my-12" aria-labelledby="related-fn-heading">
      <h2 id="related-fn-heading" className="font-serif text-h3-fluid mb-4">Adjacent field notes</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map(n => (
          <li key={n.slug}>
            <Link href={n.url} className="block hover:bg-card p-3 transition-colors">
              <div className="font-medium text-bone">{n.title}</div>
              <div className="text-sm text-bone-mute">{n.excerpt}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`getRelatedFieldNotes(topic, opts)` doesn't exist yet. For this brief:

- Create `lib/content/related.ts` with a hand-rolled mapping for v1.
  Each field-note page knows its topic tag(s). The function returns
  3-6 sibling field notes from the same topic, deduplicating the
  current page.
- Same approach for `<RelatedListings>` — filter listings by category
  / country / region matching the topic.

Use keyword-bearing anchor text (the title of the linked page — never "Read more").

Wire these into the destination pages, field-note pages, and category pages.

Acceptance: On `/destinations/east-africa` you should see 3-6 related field notes and 3-6 related listings. On `/resources/planning-guides/what-to-pack` you should see 3-6 related field notes.

---

## Final validation checklist before pushing

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes
- [ ] View source on `/`, `/about`, `/destinations/east-africa`, `/plan` — each has a clean single-suffix title, a canonical, breadcrumbs schema where applicable, and the global Organization+WebSite JSON-LD
- [ ] `/sitemap.xml` returns more than 13 URLs
- [ ] No console errors in Chrome devtools on the preview deploy
- [ ] All schema blocks validate clean at https://validator.schema.org/

## When done

1. `git push -u origin seo/critical-and-high-priority-fixes`
2. Wait for Vercel preview URL
3. Reply with: (a) the preview URL, (b) a bullet list of commits, (c) confirmation of the validation checklist above, (d) anything noticed during the work that should go into a follow-up brief
4. Do not merge to main. Dom will review and merge.
