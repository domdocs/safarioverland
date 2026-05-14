> ✓ **SHIPPED** — May 2026, merged to `main`.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Footer copy + favicon hygiene — fix brief

## Context

Public footer still ships directory-era copy. Site repositioning landed
on the page bodies but the brand block on the footer was missed. Also
worth a hygiene pass on the favicon and the now-legacy footer component.

## Files to touch

### 1. `components/editorial/editorial-footer.tsx`

Replace lines 64–70 (the brand block). Current:

```tsx
<p className="eyebrow mb-4">Safari Overland</p>
<p className="font-serif text-h3-fluid text-bone leading-tight mb-6">
  A directory of operators, lodges, and field notes from across Africa.
</p>
<p className="text-bone-mute leading-relaxed">
  Connecting travelers with safari service providers since 2018.
  Every listing reviewed before publication.
</p>
```

Replace with:

```tsx
<p className="eyebrow mb-4">Safari Overland</p>
<p className="font-serif text-h3-fluid text-bone leading-tight mb-6">
  A small collection of African safaris, by hand.
</p>
<p className="text-bone-mute leading-relaxed">
  Lodges and operators chosen for what the wild does to you —
  not just what it shows you. From Victoria Falls.
</p>
```

This pulls the language straight from BRAND_VOICE.md and matches the
home page hero so the site reads as one piece.

Also in the same file, the `COLUMNS` array currently includes
`4×4 rentals` under Categories (line 12). That category line should
stay clickable — the listings still exist — but consider whether it
belongs in the footer for the curated-collection register. Per
LISTINGS_AUDIT.md, 4×4 rentals are being de-emphasised. Three options,
in increasing severity:

- **A. Leave as-is** — the listings still exist; footer reflects what's
  there.
- **B. Drop from footer only** — keep the category page reachable from
  `/categories` but remove it from the four-link footer column. Cleaner.
- **C. Drop both footer link and category page** — full retirement,
  pending operator audit.

Recommend **B** for this fix; revisit C after Dom finishes the Vic
Falls / Hwange / Lower Zambezi triage.

### 2. `components/footer.tsx`

Legacy. Nothing imports it as of this commit. Delete the file.

Quick verification before deletion (ripgrep should return only the file
itself and possibly comments referencing it in docs):

```bash
rg -i "components/footer" --type ts --type tsx
rg "import.*\\bFooter\\b.*from.*footer" --type ts --type tsx
```

If clean, `git rm components/footer.tsx`.

### 3. Favicon hygiene check

Source assets in the repo are correct:

- `app/icon.png` — gold elephant on black (512×512)
- `app/apple-icon.png` — present
- `public/favicon.ico` — present (binary, not opened, but README claims
  multi-size 16/32/48 elephant-only)
- `app/opengraph-image.jpg` — present

Dom reports the tab favicon "doesn't look right" on the live preview.
Most likely cause is browser cache (Safari aggressively caches
favicons). Verify:

1. Open the deployed preview in a private/incognito window.
2. Check the rendered favicon — should be gold elephant on black.
3. If still wrong, inspect the served `/favicon.ico` and `/icon.png`
   responses in DevTools Network and compare to the local files.
4. If a mismatch, force a rebuild — Next.js sometimes caches the icon
   convention assets and a touch + redeploy resolves.

If the icon is correct in incognito, no code change needed; just tell
Dom to clear cache.

## Verify

1. Local dev: `/`, `/about`, `/categories`, `/destinations`, `/plan`,
   `/resources` all render the editorial footer with the new
   brand-block copy. No page renders the old "directory" line.
2. No build errors after deleting `components/footer.tsx`.
3. Favicon shows correctly in a private/incognito window on the
   preview deployment.

## Branch

Work off `main` (the new baseline since `design-experiment` was merged
in). Create a short-lived branch:

```bash
git checkout main
git pull
git checkout -b fix/footer-favicon-hygiene
```

Open a PR back to main when done. `design-experiment` is now a
historical branch — don't switch back to it.

## Out of scope

- Don't touch the link columns (Categories / Regions / Field notes)
  beyond the optional 4×4 rentals decision above.
- Don't change social-icon hrefs in the footer — those are placeholder
  `#` and will be filled in when the @safarioverland Instagram and
  Niels' LinkedIn are set up properly. Separate task.

## Done means

- Editorial footer reads in the new voice on every public page.
- Legacy `components/footer.tsx` removed.
- Favicon confirmed correct on the deployed preview (or
  cache-clearance instruction sent to Dom if it was just a cache
  issue).
- PR description references this brief.
