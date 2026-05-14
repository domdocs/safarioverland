> ✓ **SHIPPED** — May 2026, merged to `main`.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Home CTAs + directory-era cleanup

Two related pieces of work that ship together. The first elevates the
planning CTA to where it belongs in the page hierarchy; the second
clears the remaining directory-era surfaces that contradict the
curated-collection positioning.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/home-ctas-and-cleanup
```

---

## Part 1 — CTA reshuffle

The `/plan` flow is the conversion engine of the site, but it's
currently behind the weakest CTAs in the page hierarchy. Three changes,
in order of leverage.

### A. Header CTA swap (`components/editorial/editorial-header.tsx`)

The amber-filled `Register` button (top right) sends users to
`/sign-up`. Replace with `Start a brief →` pointing to `/plan`.

Current:

```tsx
<Link
  href="/sign-up"
  className="bg-amber px-4 py-2 mono text-night hover:bg-amber-deep transition-colors"
>
  Register
</Link>
```

Replace with:

```tsx
<Link
  href="/plan"
  className="bg-amber px-4 py-2 mono text-night hover:bg-amber-deep transition-colors"
>
  Start a brief →
</Link>
```

Same visual treatment, same prominence. The CTA is now persistent
across every public page.

The `Sign in` link beside it should stay for now — admin users use it.
If you want it less visible on public pages, demote the colour from
`text-bone-mute` to a slightly softer tone, but don't remove it.

### B. Hero CTA reshuffle (`app/page.tsx`)

Currently the hero has two CTAs that are both browse paths:
*"Open the collection →"* (primary, amber-filled) and *"Open the atlas"*
(secondary, outline). Reshuffle to:

- **Primary, amber-filled:** *"Start a brief →"* linking to `/plan`
- **Secondary, outline:** *"Open the collection"* linking to `/categories`
- **Drop:** *"Open the atlas"* — Destinations is already in the nav

Edit the CTA block in `app/page.tsx`. Look for the existing block near
the hero — the `Button asChild` pair after the subhead.

### C. Move the "By hand" section higher in the page

The `/plan` module currently sits as the 8th section, between Field
Notes and the footer. Move it up.

New order in `app/page.tsx`:

1. EditorialHeader (floating)
2. Cinematic hero
3. InSeasonStrip
4. **By hand plan-with-us card** ← moved up from position 8
5. Three-pillar manifesto
6. Featured listings (conditional)
7. Field Notes section
8. SectionRule
9. EditorialFooter

This makes the conversion module discoverable within roughly one scroll
of the hero, without changing the editorial rhythm of the deeper page.

Don't touch the section's internal copy or design — just its position
in the JSX.

---

## Part 2 — Directory-era cleanup

### A. Remove "List your business" from the mobile drawer

`components/editorial/editorial-header.tsx`, the `SECONDARY` array.
Currently:

```tsx
const SECONDARY: DrawerLink[] = [
  { href: "/search", label: "Search" },
  { href: "/contact", label: "Contact" },
  { href: "/submit", label: "List your business" },
]
```

Drop the `/submit` line:

```tsx
const SECONDARY: DrawerLink[] = [
  { href: "/search", label: "Search" },
  { href: "/contact", label: "Contact" },
]
```

The `/submit` page itself stays reachable at its URL (someone with a
direct link can still get there); it just won't be promoted in the
mobile nav.

### B. Rewrite the `/submit` page (`app/submit/page.tsx`)

If someone does land on `/submit`, the page should reflect the new
positioning, not the directory era. Rewrite as:

```tsx
import Link from "next/link"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "For operators | Safari Overland",
  description:
    "Safari Overland is a small editorial collection of African lodges and operators we know personally. We add new listings by invitation, not by submission — but we always read.",
}

export default function OperatorPage() {
  return (
    <section className="container py-24 md:py-32">
      <div className="max-w-3xl">
        <Eyebrow withRule>For operators</Eyebrow>
        <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
          We add listings <span className="italic text-amber">by hand</span>.
        </h1>
        <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
          Safari Overland is a small editorial collection — fewer
          names than a directory, each one written up properly.
          We add operators by invitation, after we've visited or
          spoken at length. The bar is editorial fit, not category coverage.
        </p>
        <p className="mt-8 text-bone-mute leading-relaxed max-w-2xl">
          If you run a lodge, camp, or specialist operator and you think
          you'd fit the editorial — slower pace, conservation work,
          community involvement, intentional design — write to Niels
          directly. Tell us what you'd want us to know about your
          operation, ideally in your own words rather than the marketing
          version. We read everything.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
            <Link href="mailto:niels@safarioverland.com">
              Write to Niels →
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
          >
            <Link href="/about">Read about us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

This keeps the URL alive (no broken inbound links from anywhere) but
serves a page that reflects the new positioning: invitation-only
editorial, write to Niels, no submission form.

Drop the `ListingSubmissionForm` import. The form component itself
(`components/listing-submission-form.tsx`) can stay in the codebase
unused for now — Code's call whether to delete or leave for the
admin/triage flow.

### C. Delete the dead `CTASection` component

`components/cta-section.tsx` — *"Ready to list your safari business?"*
not imported anywhere. Verify with:

```bash
rg "CTASection|cta-section" --type ts --type tsx
```

Should return only the file itself. If clean: `git rm components/cta-section.tsx`.

### D. FAQ closing CTA rewrite (`app/resources/faqs/page.tsx`)

The page is mostly fine — 30 traveller-facing questions, well-written.
Only the closing section needs work.

Currently:

```tsx
<Eyebrow withRule>Didn&apos;t find your answer?</Eyebrow>
<h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
  Tell us what you&apos;re trying to figure out.
</h2>
<p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
  If your question isn&apos;t covered, drop us a note. We&apos;ll point you at
  the right operator, lodge, or field note in the directory.
</p>
<div className="mt-10 flex flex-col sm:flex-row gap-4">
  <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
    <Link href="/contact">Get in touch →</Link>
  </Button>
  <Button asChild size="lg" variant="outline" className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber">
    <Link href="/plan">Start a planning brief</Link>
  </Button>
</div>
```

Replace with:

```tsx
<Eyebrow withRule>Still planning?</Eyebrow>
<h2 className="mt-6 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
  Tell us what you&apos;re <span className="italic text-amber">trying to figure out</span>.
</h2>
<p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
  If your question isn&apos;t answered here, send us a brief. Niels and
  the team will come back within 48 hours with three drawn-by-hand
  routes — and a more useful answer than we could fit in a FAQ.
</p>
<div className="mt-10 flex flex-col sm:flex-row gap-4">
  <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
    <Link href="/plan">Start a brief →</Link>
  </Button>
  <Button asChild size="lg" variant="outline" className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber">
    <Link href="/contact">Speak to a planner</Link>
  </Button>
</div>
```

Two changes: the body copy now points at the planning service (not "the
directory"); the primary CTA flips from `/contact` to `/plan`, with
`/contact` demoted to secondary.

---

## Verify

Local dev + preview deployment:

1. **Every public page**: header shows `Start a brief →` (amber-filled,
   top right), not `Register`. Click it → lands on `/plan`.
2. **Home**: hero shows `Start a brief →` (primary) and
   `Open the collection` (secondary). No "Open the atlas". By hand
   section appears within roughly one scroll of the hero.
3. **Mobile drawer**: no `List your business` link in the secondary
   menu.
4. `/submit` renders the new "For operators" editorial page with the
   "Write to Niels" CTA. No submission form on the page.
5. `/resources/faqs`: scroll to the closing section — body copy points
   to /plan, primary button is "Start a brief →".
6. Build succeeds; no orphaned imports after `CTASection` deletion.

## Out of scope

- Don't touch the FAQ question content itself — only the closing CTA
  section.
- Don't delete `components/listing-submission-form.tsx` even though
  /submit no longer uses it — admin may still wire it differently
  later. Leave for a future cleanup pass.
- Don't change the EditorialHeader's `AUTH` array or remove `Sign in`
  — admin needs it.
- No homepage hero copy rewrite. The hero text (*"Africa, slowly."*)
  stays.
- No work on `/categories` or `/destinations` pages — that's a
  separate audit.

## Done means

- Header CTA is `Start a brief →` everywhere
- Hero CTAs reshuffled, By hand section moved to position 4
- Mobile drawer cleaned of `List your business`
- `/submit` reads as editorial "by invitation" page
- Dead `CTASection` deleted
- FAQ closing CTA reads in the new voice and points to `/plan`
- All verified on the preview deployment before merge
- PR description references this brief and BRAND_VOICE.md
