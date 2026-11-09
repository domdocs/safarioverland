# Relaunch review guide — for Dom

Everything is on the local branch `feat/self-drive-relaunch` in the worktree `.claude/worktrees/adoring-haibt-d3fdad`. **Nothing is pushed, merged, deployed, or written to the live database.**

## See it

The site runs on your computer at **http://localhost:3000**. It reads live listings from production Supabase, read-only.

If the server has stopped, start it again from the worktree:

```bash
cd "/Volumes/Dom Crucial/Projects/safari-overland/.claude/worktrees/adoring-haibt-d3fdad" && node ./node_modules/next/dist/bin/next dev -p 3000
```

**Don't submit a real brief on `/plan` locally.** It would write to the production `briefs` table and email the planner.

## Walk-through, in order (about 20 minutes)

1. **`/`** — homepage: the hero, the three things, the routes, "Yes, you can drive this", By hand.
2. **`/routes`**, then each route:
   - `/routes/zimbabwe-falls-hwange-matobo`
   - `/routes/namibia-kalahari-to-etosha`
   - `/routes/four-corners-falls-chobe-caprivi`
3. **Ad landing pages:** `/self-drive/zimbabwe`, `/self-drive/namibia`, `/self-drive/botswana-zambia`.
4. **`/field-notes/self-drive`** — the 7 new guides.
5. **`/about`** — rewritten for the new direction.
6. **`/plan`** — click through the 11 steps. Don't press send.
7. **Header and footer** at a narrow width (phone).

Bracketed text such as `[US$X]` or `[One-line bio for Niels.]` is a deliberate placeholder for your decision.

## What to read

| File | What it is |
|---|---|
| `handoff/relaunch/DECISIONS.md` | **Every open decision.** Each has a working placeholder. The ones that block go-live are marked below. |
| `handoff/relaunch/STRATEGY.md` | Positioning, offer, routes, curation rules, voice changes |
| `handoff/relaunch/research/*/NOTES.md` | Why each lodge was chosen or rejected, with sources |
| `handoff/relaunch/copy/SITE_COPY.md` | The copy deck behind every page |
| `handoff/relaunch/marketing/` | Google Ads plan for the US and UK, competitors, social calendar with 12 drafted posts, launch emails |

## Must settle before go-live

- **D-09 — regulatory advice** (US seller-of-travel / UK package travel). This also decides D-34: whether UK ads run.
- **D-10 — copy approval.** Voice is yours. Pay most attention to the route pages' day notes and lodge blurbs, which condense the research.
- **D-02, D-04 — partners and the support line.** The site promises a phone line and partners in Victoria Falls.
- **D-11, D-12, D-13 — placeholders** visible on route pages and About.
- **D-16 / D-17 — apply the briefs migration** at merge. D-17 may be a live bug today: briefs choosing "discuss" probably fail to save.
- **D-33 — image rights** for the hero images used on the route and landing pages.
- **D-43, D-40, D-28 — rates and access** to confirm for lodges marked "rate on request", "unverified" or "arrival by arrangement".

Everything else can follow launch.

## Going live, once you're happy

1. Push the branch and open a PR. Review the Vercel preview.
2. Fix the www certificate in Vercel (see the Phase 1 brief, step 0). It's independent and can be done today.
3. Merge, then apply `supabase/migrations/20261109_briefs_self_drive_fields.sql` (CLAUDE.md rule 8).
4. Check the redirects on production, not the preview.
5. Write a CHANGELOG entry.
