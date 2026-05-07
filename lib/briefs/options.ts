/**
 * Static option sets for the Trip Builder form.
 * Edit here to extend / reorder; no other changes needed.
 */

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

export const CHAPTER_OPTIONS = [
  { value: "East Africa", lede: "Kenya · Tanzania · Uganda · Rwanda" },
  { value: "Southern Africa", lede: "Botswana · South Africa · Namibia · Zimbabwe · Zambia" },
  { value: "West Africa", lede: "Ghana · Senegal · Nigeria · Benin" },
  { value: "North Africa", lede: "Morocco · Egypt · Tunisia" },
] as const

export const RHYTHM_OPTIONS = [
  { value: "Game-drive heavy", lede: "Maximum time in the bush, vehicle-based, dawn till dusk." },
  { value: "Walking-led", lede: "On foot with armed guides — South Luangwa, Mana Pools." },
  { value: "Family-paced", lede: "Mid-day downtime, kids' programmes, malaria-free options." },
  { value: "Honeymoon-quiet", lede: "Private guides, fewer vehicles, premium camps." },
  { value: "Photographic", lede: "Specialist vehicles, longer sits, predictable light." },
  { value: "Mixed", lede: "A bit of everything across two or three locations." },
] as const

export const BUDGET_OPTIONS = [
  "Under $5k pp",
  "$5k–$10k pp",
  "$10k–$15k pp",
  "$15k–$25k pp",
  "$25k+ pp",
  "Open / advise me",
] as const

export type MonthOption = (typeof MONTH_OPTIONS)[number]
export type ChapterOption = (typeof CHAPTER_OPTIONS)[number]["value"]
export type RhythmOption = (typeof RHYTHM_OPTIONS)[number]["value"]
export type BudgetOption = (typeof BUDGET_OPTIONS)[number]
