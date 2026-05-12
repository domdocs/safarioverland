/**
 * Static option sets for the /plan eight-question intake.
 *
 * The option `value` strings are what we persist to the `briefs` table —
 * they should stay stable. Labels and ledes are the user-facing copy and
 * can change without a migration.
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
  { value: "first-safari", label: "A first proper safari" },
  { value: "walking", label: "Walking and tracking on foot" },
  { value: "migration", label: "The big migrations and crossings" },
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
    regions: ["Southern Africa", "East Africa"] as const,
  },
  {
    value: "primates",
    label: "Gorillas or chimpanzees on foot",
    regions: ["East Africa"] as const,
  },
  {
    value: "migration",
    label: "The great migration — wildebeest crossings",
    regions: ["East Africa"] as const,
  },
  {
    value: "walking-landscapes",
    label: "Big walking landscapes — Mana Pools, South Luangwa",
    regions: ["Southern Africa"] as const,
  },
  {
    value: "desert",
    label: "Desert / dune country — Namibia, the Skeleton Coast",
    regions: ["Southern Africa"] as const,
  },
  {
    value: "wetlands",
    label: "Wetland country — the Okavango, the Linyanti",
    regions: ["Southern Africa"] as const,
  },
  {
    value: "mountain-forest",
    label: "Mountain or forest — Bwindi, Mahale, the Aberdares",
    regions: ["East Africa"] as const,
  },
  {
    value: "rare-specialist",
    label: "Rare or specialist sightings",
    regions: [] as readonly string[],
  },
] as const
export type WildlifeOption = (typeof WILDLIFE_OPTIONS)[number]["value"]

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
// enum), plus a `discuss` escape hatch. `label` is the nightly band.
export const BUDGET_TIER_OPTIONS = [
  {
    value: "budget",
    label: "Up to $500 per person per night, all-in",
  },
  {
    value: "mid",
    label: "$500–$1,000 per person per night, all-in",
  },
  {
    value: "luxury",
    label: "$1,000–$2,000 per person per night, all-in",
  },
  {
    value: "exclusive",
    label: "$2,000+ per person per night, all-in",
  },
  {
    value: "discuss",
    label: "I'd rather discuss this on a call",
  },
] as const
export type BudgetTierOption = (typeof BUDGET_TIER_OPTIONS)[number]["value"]

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

/** Look up a label from a value across any option set. Useful for the
 *  results summary and admin views. */
export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | null | undefined,
): string | null {
  if (!value) return null
  return options.find((o) => o.value === value)?.label ?? value
}
