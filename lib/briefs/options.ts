/**
 * Static option sets for the /plan intake (self-drive relaunch).
 *
 * The option `value` strings are what we persist to the `briefs` table —
 * they should stay stable. Labels and ledes are the user-facing copy and
 * can change without a migration.
 *
 * Retired values are not deleted: they move to a `LEGACY_*` list so
 * `labelFor` can still render them on old briefs (admin + emails), while
 * the form only maps over the live arrays.
 */

// ── Step 01 — When could you travel? ─────────────────────────────────────
export const MONTH_OPTIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const
export type MonthOption = (typeof MONTH_OPTIONS)[number]

// ── Step 02 — What kind of trip are you chasing? ────────────────────────
export const INTENT_OPTIONS = [
  { value: "first-self-drive", label: "My first self-drive in Africa" },
  { value: "first-safari", label: "A first proper safari" },
  { value: "walking", label: "Walking and tracking on foot" },
  { value: "photography", label: "Wildlife photography" },
  { value: "slow", label: "A slower trip — fewer moves, longer stays" },
  { value: "wellness", label: "A wellness rhythm — yoga, silence, sleep-outs" },
  { value: "conservation", label: "A trip with conservation work or community visits" },
  { value: "family", label: "A family safari that works for children" },
  { value: "honeymoon", label: "A honeymoon or anniversary" },
  { value: "solo", label: "A solo trip with a planner's hand" },
  { value: "other", label: "Something else" },
] as const
export type IntentOption = (typeof INTENT_OPTIONS)[number]["value"]
export const INTENT_MAX = 3

/** Retired intent values — not shown in the form, still labelled on old
 *  briefs. */
export const LEGACY_INTENT_OPTIONS = [
  { value: "migration", label: "The big migrations and crossings" },
] as const

// ── Step 03 — The rhythm ────────────────────────────────────────────────
export const PACE_OPTIONS = [
  {
    value: "slow",
    label: "Slow",
    lede: "One or two camps, long stays, deep time in a single landscape.",
  },
  {
    value: "mixed",
    label: "Mixed",
    lede: "Two or three camps, a thread that ties them together.",
  },
  {
    value: "active",
    label: "Active",
    lede: "Multi-camp, moving every two or three nights, more ground.",
  },
] as const
export type PaceOption = (typeof PACE_OPTIONS)[number]["value"]

// ── Step 04 — The kind of quiet you want ────────────────────────────────
export const QUIET_OPTIONS = [
  { value: "walking-days", label: "Walking days with a guide who can read a track" },
  { value: "sundowners", label: "Sundowners, slow drives, no fixed schedule" },
  { value: "read-write", label: "Time enough to read, write, or do nothing" },
  { value: "yoga", label: "Yoga or stretching on offer at the camp" },
  { value: "silent-meditation", label: "Silent walks or meditation on offer" },
  { value: "sleep-out", label: "A sleep-out platform under stars" },
  { value: "fire-bath-bed", label: "An open fire, a proper bath, an early bed" },
  { value: "excitement", label: "None of the above — I want excitement" },
] as const
export type QuietOption = (typeof QUIET_OPTIONS)[number]["value"]

// ── Step 05 — The wildlife or landscape you're after ────────────────────
// `regions` is the inference key used by the shortlist algorithm. Empty
// array = no regional bias.
export const WILDLIFE_OPTIONS = [
  {
    value: "big-cats",
    label: "The big cats — lion, leopard, cheetah",
    regions: [] as readonly string[],
  },
  {
    value: "elephants",
    label: "Elephants in large herds",
    regions: ["Southern Africa"] as readonly string[],
  },
  {
    value: "walking-landscapes",
    label: "Big landscapes on foot — Hwange, Matobo, Mana Pools",
    regions: ["Southern Africa"] as readonly string[],
  },
  {
    value: "desert",
    label: "Desert / dune country — Namibia, the Skeleton Coast",
    regions: ["Southern Africa"] as readonly string[],
  },
  {
    value: "wetlands",
    label: "Wetland country — the Okavango, the Linyanti",
    regions: ["Southern Africa"] as readonly string[],
  },
  {
    value: "rare-specialist",
    label: "Rare or specialist sightings",
    regions: [] as readonly string[],
  },
] as const
export type WildlifeOption = (typeof WILDLIFE_OPTIONS)[number]["value"]

/** Retired wildlife values — not shown in the form, still labelled on old
 *  briefs. They carry no region hint any more. */
export const LEGACY_WILDLIFE_OPTIONS = [
  { value: "primates", label: "Gorillas or chimpanzees on foot" },
  { value: "migration", label: "The great migration — wildebeest crossings" },
  {
    value: "mountain-forest",
    label: "Mountain or forest — Bwindi, Mahale, the Aberdares",
  },
] as const

// ── Step 06 — How long, give or take? ───────────────────────────────────
export const DURATION_OPTIONS = [
  { value: "5-7", label: "5–7 nights" },
  { value: "8-10", label: "8–10 nights" },
  { value: "11-14", label: "11–14 nights" },
  { value: "14+", label: "More than two weeks" },
  { value: "unsure", label: "I'm not sure — talk me through it" },
] as const
export type DurationOption = (typeof DURATION_OPTIONS)[number]["value"]

// ── Step 07 — Season preference ─────────────────────────────────────────
export const SEASON_OPTIONS = [
  {
    value: "dry-high",
    label: "Dry / high season",
    lede: "Best game, busier camps, higher prices.",
  },
  {
    value: "green-shoulder",
    label: "Green / shoulder season",
    lede: "Quieter, lush, fewer animals at waterholes.",
  },
  {
    value: "migration-window",
    label: "Migration windows",
    lede: "Specific to East Africa.",
  },
  {
    value: "no-preference",
    label: "No preference",
    lede: "Work it around our months.",
  },
] as const
export type SeasonOption = (typeof SEASON_OPTIONS)[number]["value"]

// ── Step 08 — Comfortable budget per person per night ───────────────────
// `value` is the persisted tier (matches directory_listings.price_tier
// enum), plus a `discuss` escape hatch. `label` is the nightly band for
// lodges only — the vehicle is priced separately.
export const BUDGET_TIER_OPTIONS = [
  {
    value: "budget",
    label: "Up to $250 per person per night",
  },
  {
    value: "mid",
    label: "$250–$500 per person per night",
  },
  {
    value: "luxury",
    label: "$500–$1,000 per person per night",
  },
  {
    value: "exclusive",
    label: "$1,000+ per person per night",
  },
  {
    value: "discuss",
    label: "I'd rather discuss this on a call",
  },
] as const
export type BudgetTierOption = (typeof BUDGET_TIER_OPTIONS)[number]["value"]

// ── Self-drive — Have you driven in Africa before? ──────────────────────
export const DRIVE_EXPERIENCE_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "once-or-twice", label: "Once or twice" },
  { value: "often", label: "Often" },
] as const
export type DriveExperienceOption =
  (typeof DRIVE_EXPERIENCE_OPTIONS)[number]["value"]

// ── Self-drive — How long are you happy to drive in a day? ──────────────
export const DRIVE_HOURS_OPTIONS = [
  {
    value: "under-3h",
    label: "Up to three hours — the drive is a means, not the point",
  },
  { value: "3-5h", label: "Three to five hours, with stops" },
  { value: "5h-plus", label: "A long day at the wheel doesn't bother me" },
] as const
export type DriveHoursOption = (typeof DRIVE_HOURS_OPTIONS)[number]["value"]

// ── Self-drive — Where are you drawn to? (multi-select) ─────────────────
export const COUNTRY_OPTIONS = [
  { value: "zimbabwe", label: "Zimbabwe" },
  { value: "namibia", label: "Namibia" },
  { value: "botswana", label: "Botswana" },
  { value: "zambia", label: "Zambia" },
  { value: "south-africa", label: "South Africa" },
  { value: "unsure", label: "Not sure yet — show me" },
] as const
export type CountryOption = (typeof COUNTRY_OPTIONS)[number]["value"]

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Map selected wildlife values to a deduplicated list of region hints
 * used by the shortlist algorithm. Returns [] if the user's selection
 * implies nothing about region.
 */
export function inferRegionsFromWildlife(
  wildlife: readonly string[],
): string[] {
  const set = new Set<string>()
  for (const w of wildlife) {
    const opt = WILDLIFE_OPTIONS.find((o) => o.value === w)
    if (!opt) continue
    for (const region of opt.regions) set.add(region)
  }
  return [...set]
}

type LabelledOption = { value: string; label: string }

/** Retired options per live option set. Keyed by array identity because
 *  the same value can mean different things in different sets
 *  (`migration` is both a retired intent and a retired wildlife option). */
const LEGACY_OPTIONS = new Map<
  readonly LabelledOption[],
  readonly LabelledOption[]
>([
  [INTENT_OPTIONS, LEGACY_INTENT_OPTIONS],
  [WILDLIFE_OPTIONS, LEGACY_WILDLIFE_OPTIONS],
])

/** Look up a label from a value across any option set. Falls back to the
 *  set's `LEGACY_*` list so retired values still read properly on old
 *  briefs, then to the raw value. Useful for the results summary and
 *  admin views. */
export function labelFor(
  options: readonly LabelledOption[],
  value: string | null | undefined,
): string | null {
  if (!value) return null
  return (
    options.find((o) => o.value === value)?.label ??
    LEGACY_OPTIONS.get(options)?.find((o) => o.value === value)?.label ??
    value
  )
}
