# Field Notes cleanup — off-region pages (self-drive relaunch)

**Status:** done on `feat/self-drive-relaunch`. Not yet committed.
**Scope:** the hand-authored pages under `app/field-notes/**`. This excludes `app/field-notes/self-drive/**` and the database-driven `app/field-notes/[slug]`.

The rule: keep anything about southern Africa, or general safari material that still applies to a lodge-based self-drive in Zimbabwe, Namibia, Botswana or Zambia. Delete anything whose subject is East, West or North Africa. Mixed pages were judged on their main subject.

## Deleted (17 pages) and where they redirect

All redirects are permanent (308) and live in `next.config.mjs`.

| URL | Reason | Redirects to |
|---|---|---|
| `/field-notes/seasonal-guides/egypt` | North Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/morocco` | North Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/north-africa-birds` | North Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/ghana` | West Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/senegal` | West Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/west-africa` | West Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/kenya` | East Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/tanzania` | East Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/uganda-rwanda` | East Africa | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/gorilla-trekking` | East Africa (Uganda, Rwanda) | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/great-migration` | East Africa (Serengeti and Mara) | `/field-notes/seasonal-guides` |
| `/field-notes/seasonal-guides/bird-watching` | Judgement call: three regional sections (East, Southern, West and Central). Two of the three are off-region, and the page is pitched "from the Okavango to the forests of Uganda". | `/field-notes/seasonal-guides` |
| `/field-notes/conservation/success-stories/kenya-corridors` | Kenya | `/field-notes/conservation` |
| `/field-notes/conservation/success-stories/mountain-gorillas` | Rwanda and Uganda | `/field-notes/conservation` |
| `/field-notes/planning-guides/east-vs-southern` | Compares the region we no longer sell | `/field-notes/planning-guides` |
| `/field-notes/planning-guides/wildlife-events` | Judgement call: built around the Great Migration (river crossings, calving in the Serengeti, a migration calendar). The other events are secondary. | `/field-notes/planning-guides` |
| `/field-notes/planning-guides/off-the-beaten-path` | Judgement call: of seven destinations, only one (Kafue, Zambia) is in scope. The others are Timbuktu, Guinea-Bissau, Tanzania, Gabon, Madagascar and Congo. | `/field-notes/planning-guides` |

## Kept (41 of the 58 hand-authored pages, indexes included)

**Southern Africa:** seasonal-guides `botswana`, `zimbabwe-zambia`, `south-africa`, and success-stories `zimbabwe-rhinos`, `namibia-conservancies`.

> `south-africa` is southern Africa, but it is not one of the four countries we sell. It is kept under the "southern Africa" rule. Dom to decide whether it stays.

**General safari, kept:**
- **Planning guides:** `accessible-safaris`, `before-you-go`, `best-times`, `budgeting`, `choosing-destinations`, `family-safaris`, `green-season`, `hidden-costs`, `luxury-vs-budget`, `packing-list`, `photography-gear`, `seasonal-packing`, `solo-travel`, `what-to-pack`
- **Seasonal guides:** `photography`, `family-safari`, `budget-travel`
- **Conservation:** `anti-poaching`, `beyond-safari`, `community-conservation`, `cultural-preservation`, `economics`, `education-awareness`, `endangered-species`, `ethical-operators`, `funding`, `habitat-preservation`, `responsible-practices`, `sustainable-tourism`
- **Other:** `faqs`, `safety-tips`, `safety-tips/wildlife-behavior`
- **Indexes:** `/field-notes`, `/field-notes/planning-guides`, `/field-notes/seasonal-guides`, `/field-notes/conservation`

**Kept pages whose body copy still leans on East Africa.** These are general pages, so they stay, but each needs a voice pass in Cowork. This change did not edit any article body copy.
- `seasonal-guides/photography`, `seasonal-guides/family-safari` and `seasonal-guides/budget-travel` each have an "East Africa: Kenya and Tanzania" section next to a southern one.
- `planning-guides/best-times` and `planning-guides/choosing-destinations` give the Serengeti, Mara and gorilla trekking real space.
- `faqs` mentions Kenya, Tanzania, Uganda and Rwanda many times.
- `planning-guides/before-you-go`, `seasonal-packing` and `family-safaris` mention East or North Africa in passing.

## Internal links and data removed or repointed

- **`lib/field-note-dates.ts`:** removed the 17 entries by hand. The generator was not run, so the dates on other entries are unchanged. The sitemap reads from this map, so the deleted URLs have dropped out of it.
- **`lib/content/related.ts`** (the data behind `RelatedFieldNotes`): removed 15 entries. Topic aliases such as `kenya` → `east-africa` were left in place. Those topics now have no notes, so the component falls back to planning notes.
- **`lib/downloads/resources.ts`:** removed the gated downloads tied to deleted pages: `ghana-safari-guide`, `senegal-safari-guide`, `morocco-safari-guide`, `egypt-safari-guide` and `great-migration-calendar`. Also removed `destination-comparison-chart`, which was rendered from `east-vs-southern`, along with its card on the planning-guides index. The PDFs are still in the Supabase `downloads` bucket. Old download links for those slugs will now fail.
- **`lib/breadcrumbs.ts`:** removed the display names for the deleted slugs.
- **Seasonal guides index:** the four region tabs (East, Southern, West, North) are now one "Southern Africa seasonal guides" grid. The Great Migration, bird-watching and gorilla-trekking cards are gone from special interest, which leaves photography, budget and family: one full row. The wildlife events calendar has been rewritten for southern Africa.
- **Conservation index:** removed the two success-story cards, which leaves Zimbabwe rhinos and Namibia conservancies. Removed the "View all success stories" button. It had no link, and there is no success-stories index.
- **Planning guides index:** the Destinations tab now shows Choosing destinations, the Zimbabwe and Zambia seasonal guide and the Botswana seasonal guide. In the Timing tab, Wildlife events is replaced by the photography seasonal guide.
- **Related links on kept pages:** `photography-gear` and `choosing-destinations` now point to `best-times`. `best-times` no longer links to wildlife events.

## Pre-existing broken links fixed

- **`/field-notes/safety-tips`** linked to 15 sub-pages, and none of them exist (only `wildlife-behavior` does).
  - Wildlife viewing and animal behaviour now point to `/field-notes/safety-tips/wildlife-behavior`.
  - Vaccinations, malaria, travel insurance and emergency plans now point to `/field-notes/planning-guides/before-you-go`, which covers vaccinations, malaria, insurance and communications.
  - The other cards keep their title and summary but lose the "Read more" link: vehicle safety, first aid, water and food, camp safety, insect protection, insect bites, heat, sun and weather.
- **Success-story breadcrumbs:** these linked to `/field-notes/conservation/success-stories`, and that page does not exist. `buildCrumbsFromPath` now skips segments with no index page (`INDEXLESS_SEGMENTS`, currently just `success-stories`). The trail, and its BreadcrumbList JSON-LD, now reads Home / Field Notes / Conservation / Zimbabwe rhinos.

## Images

**Deleted (17 files, 1.7 MB).** Each was used only by a deleted page or a removed card. Checked with `git grep` across the whole repo, excluding `public/`.
- `public/images/planning-guides/destinations/off-the-beaten-path.jpg`
- `public/images/planning-guides/timing/great-migration.jpg`
- `public/images/seasonal-guides/kenya-migration.jpg`
- `public/images/seasonal-guides/kenya-seasons.jpg`
- `public/images/seasonal-guides/travel-guide-{egypt,ghana,kenya,morocco,north-africa-birds,senegal,tanzania,uganda-rwanda,west-africa-birds}.jpg`
- `public/images/stories/mahale-mountains.jpg`
- `public/images/stories/mosque-timbuktu.jpg`
- `public/images/success-stories/elephant-corridor.jpg`
- `public/images/success-stories/gorilla-recovery.jpg`

**Left in place (not sure they're unused):**
- `public/images/planning-guides/destinations/east-vs-southern.jpg` is still named in `handoff/SOCIAL_LAUNCH_QUEUE.md` and `handoff/SOCIAL_PLAYBOOK.md`.
- `public/images/destinations/wildlife/gorilla.jpg` was used only by a deleted page. It sits in the destinations image set, which belongs to the destinations area, so it was left alone.
- `public/images/organisations/gorilla-doctors.png` is still used on the conservation index. Gorilla Doctors works in East and Central Africa, so Dom may want it out of the organisations grid.

The deleted pages also referenced about 30 images that never existed in `public/`, such as `migration-*.jpg`, `siwa-oasis.jpg` and `wildlife-events-hero.jpg`. Nothing needed removing for those.

## Still to do

- Dom or Niels to review the new wildlife events calendar on `/field-notes/seasonal-guides`. Its timings are general knowledge, not checked against a source: zebra on the Makgadikgadi and Nxai Pans in Jan–Mar, Victoria Falls peak flow in Apr–Jun, Okavango flood peak in Jul–Sep, impala and wildebeest calving in Oct–Dec.
- `seasonal-calendar.pdf`, `safari-calendar-planner.pdf` and `safari-safety-guide.pdf` were rendered from pages that covered all regions, or that had the old broken links. Regenerate them with `scripts/generate-pdfs.mjs` once the copy settles.
- Off-region content outside Field Notes was not touched:
  - `components/simple-map-view.tsx` (East, West and North Africa regions)
  - `components/safari-faq.tsx` (East Africa timing)
  - `components/search-form.tsx` and `components/business-listing-form.tsx` (Uganda, Ghana, Morocco and Egypt options)
  - `lib/conditions.ts` (Uganda gorilla trekking)
  - `app/categories/adventure-activities/page.tsx` ("gorilla trekking")
  - the mock data in `lib/listings.ts` (Mara River, Morocco)
