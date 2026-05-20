/**
 * v1 related-content lookup. No CMS yet — the field-note tree is
 * file-based, so this module hand-maintains:
 *
 *   - FIELD_NOTES_BY_TOPIC: a topic-tag → field-note list
 *   - getRelatedFieldNotes(topic, opts): returns 3-6 sibling notes,
 *     ranked by topic match, deduplicating the current page
 *   - getRelatedListings(opts): wraps the existing listings lib with
 *     filters for region / category, returns 3-6 matches
 *
 * When a proper content collection exists (MDX with frontmatter or
 * Supabase-backed posts), replace this with a real query. For now
 * this is enough to ship keyword-bearing internal links.
 */

import {
  getListings,
  type DirectoryListing,
} from "@/lib/listings"

export type RelatedNote = {
  slug: string
  url: string
  title: string
  excerpt: string
  topic: string
}

/**
 * Hand-maintained map. Add a new field-note here when one ships.
 * Topic strings are free-form but kept consistent so a single topic
 * tag matches across destinations + chapters.
 */
const FIELD_NOTES: RelatedNote[] = [
  // ── Planning guides ───────────────────────────────────────────────
  {
    slug: "what-to-pack",
    url: "/field-notes/planning-guides/what-to-pack",
    title: "What to pack for safari",
    excerpt:
      "A condensed packing reference — the essentials, the easy-to-forget items, and the things you really don't need to bring.",
    topic: "planning",
  },
  {
    slug: "packing-list",
    url: "/field-notes/planning-guides/packing-list",
    title: "Safari packing list",
    excerpt:
      "The full version of the safari packing reference, organised by category.",
    topic: "planning",
  },
  {
    slug: "seasonal-packing",
    url: "/field-notes/planning-guides/seasonal-packing",
    title: "Seasonal packing notes",
    excerpt:
      "How to pack differently for dry season, green season, and Cape Town's late winter.",
    topic: "planning",
  },
  {
    slug: "before-you-go",
    url: "/field-notes/planning-guides/before-you-go",
    title: "Before you go",
    excerpt: "Visas, vaccinations, insurance, and the things to handle six weeks out.",
    topic: "planning",
  },
  {
    slug: "best-times",
    url: "/field-notes/planning-guides/best-times",
    title: "Best times to go",
    excerpt: "When to travel for game density, calving, the migration, or quiet camps.",
    topic: "seasons",
  },
  {
    slug: "green-season",
    url: "/field-notes/planning-guides/green-season",
    title: "Green season safari",
    excerpt: "Why the wet months are the secret window — and the trade-offs to know.",
    topic: "seasons",
  },
  {
    slug: "budgeting",
    url: "/field-notes/planning-guides/budgeting",
    title: "Safari budgeting",
    excerpt: "What a real safari costs, broken down by component.",
    topic: "planning",
  },
  {
    slug: "hidden-costs",
    url: "/field-notes/planning-guides/hidden-costs",
    title: "Hidden safari costs",
    excerpt: "The line items operators leave out of their headline rates.",
    topic: "planning",
  },
  {
    slug: "luxury-vs-budget",
    url: "/field-notes/planning-guides/luxury-vs-budget",
    title: "Luxury vs budget",
    excerpt: "What you actually get when you move up the price tiers.",
    topic: "planning",
  },
  {
    slug: "east-vs-southern",
    url: "/field-notes/planning-guides/east-vs-southern",
    title: "East vs Southern Africa",
    excerpt: "How to choose between the two great safari regions.",
    topic: "regions",
  },
  {
    slug: "choosing-destinations",
    url: "/field-notes/planning-guides/choosing-destinations",
    title: "Choosing a destination",
    excerpt: "A framework for matching a safari country to what you want from it.",
    topic: "regions",
  },
  {
    slug: "off-the-beaten-path",
    url: "/field-notes/planning-guides/off-the-beaten-path",
    title: "Off the beaten path",
    excerpt: "Less-trodden parks and seasons for travellers who want quiet.",
    topic: "regions",
  },
  {
    slug: "family-safaris",
    url: "/field-notes/planning-guides/family-safaris",
    title: "Family safaris",
    excerpt: "Camps and rhythms that work for travelling with children.",
    topic: "family",
  },
  {
    slug: "solo-travel",
    url: "/field-notes/planning-guides/solo-travel",
    title: "Solo safari travel",
    excerpt: "How to safari well alone, with or without a single supplement.",
    topic: "planning",
  },
  {
    slug: "accessible-safaris",
    url: "/field-notes/planning-guides/accessible-safaris",
    title: "Accessible safaris",
    excerpt: "Camps and operators set up for mobility and access needs.",
    topic: "planning",
  },
  {
    slug: "photography-gear",
    url: "/field-notes/planning-guides/photography-gear",
    title: "Safari photography gear",
    excerpt: "What to bring and what to leave at home for wildlife photography.",
    topic: "photography",
  },
  {
    slug: "wildlife-events",
    url: "/field-notes/planning-guides/wildlife-events",
    title: "Wildlife events calendar",
    excerpt: "Migration crossings, calving windows, predator events, by month.",
    topic: "seasons",
  },

  // ── Seasonal guides ───────────────────────────────────────────────
  {
    slug: "great-migration",
    url: "/field-notes/seasonal-guides/great-migration",
    title: "The great migration",
    excerpt: "Where the herds are by month — Serengeti, Mara, and back.",
    topic: "east-africa",
  },
  {
    slug: "kenya",
    url: "/field-notes/seasonal-guides/kenya",
    title: "Kenya seasonal guide",
    excerpt: "When to visit each region of Kenya.",
    topic: "east-africa",
  },
  {
    slug: "tanzania",
    url: "/field-notes/seasonal-guides/tanzania",
    title: "Tanzania seasonal guide",
    excerpt: "Northern circuit, southern circuit, west.",
    topic: "east-africa",
  },
  {
    slug: "uganda-rwanda",
    url: "/field-notes/seasonal-guides/uganda-rwanda",
    title: "Uganda & Rwanda seasonal guide",
    excerpt: "Gorilla trekking, chimps, and the rainforest seasons.",
    topic: "east-africa",
  },
  {
    slug: "gorilla-trekking",
    url: "/field-notes/seasonal-guides/gorilla-trekking",
    title: "Gorilla trekking",
    excerpt: "Permits, prep, and what a day with the gorillas is actually like.",
    topic: "east-africa",
  },
  {
    slug: "botswana",
    url: "/field-notes/seasonal-guides/botswana",
    title: "Botswana seasonal guide",
    excerpt: "Okavango, Linyanti, Chobe, and the wet vs dry rhythm.",
    topic: "southern-africa",
  },
  {
    slug: "zimbabwe-zambia",
    url: "/field-notes/seasonal-guides/zimbabwe-zambia",
    title: "Zimbabwe & Zambia seasonal guide",
    excerpt: "Mana Pools, South Luangwa, the Zambezi corridor.",
    topic: "southern-africa",
  },
  {
    slug: "south-africa",
    url: "/field-notes/seasonal-guides/south-africa",
    title: "South Africa seasonal guide",
    excerpt: "Kruger, the private reserves, and the Cape.",
    topic: "southern-africa",
  },
  {
    slug: "bird-watching",
    url: "/field-notes/seasonal-guides/bird-watching",
    title: "Bird-watching seasons",
    excerpt: "When and where to find Africa's best birding.",
    topic: "wildlife",
  },
  {
    slug: "north-africa-birds",
    url: "/field-notes/seasonal-guides/north-africa-birds",
    title: "North Africa birds",
    excerpt: "Migratory birds and resident specialities of the Maghreb and Egypt.",
    topic: "north-africa",
  },
  {
    slug: "egypt",
    url: "/field-notes/seasonal-guides/egypt",
    title: "Egypt seasonal guide",
    excerpt: "When to visit Egypt for ruins, river, and Red Sea.",
    topic: "north-africa",
  },
  {
    slug: "morocco",
    url: "/field-notes/seasonal-guides/morocco",
    title: "Morocco seasonal guide",
    excerpt: "Atlas mountains, desert, and coastal Morocco by season.",
    topic: "north-africa",
  },
  {
    slug: "ghana",
    url: "/field-notes/seasonal-guides/ghana",
    title: "Ghana seasonal guide",
    excerpt: "Mole National Park, coastal forts, and dry-season travel.",
    topic: "west-africa",
  },
  {
    slug: "senegal",
    url: "/field-notes/seasonal-guides/senegal",
    title: "Senegal seasonal guide",
    excerpt: "Wildlife, music, and the dry-season window in West Africa.",
    topic: "west-africa",
  },
  {
    slug: "west-africa",
    url: "/field-notes/seasonal-guides/west-africa",
    title: "West Africa seasonal guide",
    excerpt: "The wider West African travel calendar.",
    topic: "west-africa",
  },
  {
    slug: "photography",
    url: "/field-notes/seasonal-guides/photography",
    title: "Wildlife photography seasons",
    excerpt: "When the light, the drama, and the species line up.",
    topic: "photography",
  },
  {
    slug: "family-safari",
    url: "/field-notes/seasonal-guides/family-safari",
    title: "Family safari seasonal guide",
    excerpt: "When to travel with kids, country by country.",
    topic: "family",
  },
  {
    slug: "budget-travel",
    url: "/field-notes/seasonal-guides/budget-travel",
    title: "Budget travel seasonal guide",
    excerpt: "The lowest-rate windows for each region.",
    topic: "planning",
  },

  // ── Conservation ──────────────────────────────────────────────────
  {
    slug: "community-conservation",
    url: "/field-notes/conservation/community-conservation",
    title: "Community-led conservation",
    excerpt: "How conservancies put wildlife stewardship back in local hands.",
    topic: "conservation",
  },
  {
    slug: "anti-poaching",
    url: "/field-notes/conservation/anti-poaching",
    title: "Anti-poaching",
    excerpt: "The frontline work most visitors never see.",
    topic: "conservation",
  },
  {
    slug: "habitat-preservation",
    url: "/field-notes/conservation/habitat-preservation",
    title: "Habitat preservation",
    excerpt: "Why protecting habitat matters more than protecting species in isolation.",
    topic: "conservation",
  },
  {
    slug: "endangered-species",
    url: "/field-notes/conservation/endangered-species",
    title: "Endangered species",
    excerpt: "Recovery work for Africa's most threatened wildlife.",
    topic: "conservation",
  },
  {
    slug: "sustainable-tourism",
    url: "/field-notes/conservation/sustainable-tourism",
    title: "Sustainable tourism",
    excerpt: "What a low-impact safari actually looks like.",
    topic: "conservation",
  },
  {
    slug: "ethical-operators",
    url: "/field-notes/conservation/ethical-operators",
    title: "Ethical operators",
    excerpt: "How to recognise camps that put conservation first.",
    topic: "conservation",
  },
  {
    slug: "responsible-practices",
    url: "/field-notes/conservation/responsible-practices",
    title: "Responsible practices",
    excerpt: "How travellers can avoid the unintended damage common on safari.",
    topic: "conservation",
  },
  {
    slug: "cultural-preservation",
    url: "/field-notes/conservation/cultural-preservation",
    title: "Cultural preservation",
    excerpt: "Conservation that protects communities as well as wildlife.",
    topic: "conservation",
  },
  {
    slug: "beyond-safari",
    url: "/field-notes/conservation/beyond-safari",
    title: "Beyond safari",
    excerpt: "Conservation work that goes deeper than the standard photography circuit.",
    topic: "conservation",
  },
  {
    slug: "education-awareness",
    url: "/field-notes/conservation/education-awareness",
    title: "Education & awareness",
    excerpt: "The role of public education in long-term wildlife survival.",
    topic: "conservation",
  },
  {
    slug: "funding",
    url: "/field-notes/conservation/funding",
    title: "Conservation funding",
    excerpt: "How conservancies and parks actually pay for themselves.",
    topic: "conservation",
  },
  {
    slug: "economics",
    url: "/field-notes/conservation/economics",
    title: "The economics of safari",
    excerpt: "Where the money goes when you book a camp.",
    topic: "conservation",
  },

  // ── Safety ────────────────────────────────────────────────────────
  {
    slug: "wildlife-behavior",
    url: "/field-notes/safety-tips/wildlife-behavior",
    title: "Wildlife behaviour & safety",
    excerpt: "Reading animal body language to stay safe in the bush.",
    topic: "planning",
  },
]

/**
 * Topic aliases — link an incoming topic string from a page/listing
 * to one of the canonical topic tags above. Forgiving — extra
 * aliases are cheap and the data is small.
 */
const TOPIC_ALIASES: Record<string, string> = {
  // destination → region
  "east-africa": "east-africa",
  "southern-africa": "southern-africa",
  "west-africa": "west-africa",
  "north-africa": "north-africa",
  kenya: "east-africa",
  tanzania: "east-africa",
  uganda: "east-africa",
  rwanda: "east-africa",
  botswana: "southern-africa",
  namibia: "southern-africa",
  zambia: "southern-africa",
  zimbabwe: "southern-africa",
  "south-africa": "southern-africa",
  ghana: "west-africa",
  senegal: "west-africa",
  morocco: "north-africa",
  egypt: "north-africa",
  // category → topic
  lodges: "planning",
  campsites: "planning",
  "guided-tours": "planning",
  "overland-tours": "planning",
  conservation: "conservation",
  birding: "wildlife",
  photography: "photography",
  family: "family",
  planning: "planning",
}

export type RelatedOpts = {
  /** Slug of the current page — excluded from results. */
  excludeSlug?: string
  limit?: number
}

export function getRelatedFieldNotes(
  topicInput: string,
  opts: RelatedOpts = {},
): RelatedNote[] {
  const limit = opts.limit ?? 4
  const topic = TOPIC_ALIASES[topicInput] ?? topicInput
  // Primary: same topic. Secondary: planning (a safe sibling for any page).
  const primary = FIELD_NOTES.filter(
    (n) => n.topic === topic && n.slug !== opts.excludeSlug,
  )
  if (primary.length >= limit) return primary.slice(0, limit)
  const secondary = FIELD_NOTES.filter(
    (n) =>
      n.topic === "planning" &&
      n.slug !== opts.excludeSlug &&
      !primary.includes(n),
  )
  return [...primary, ...secondary].slice(0, limit)
}

export type RelatedListingsOpts = {
  /** Country name to filter on. Optional; falls back to region. */
  country?: string
  /** Region label ("East Africa", "Southern Africa", etc.). */
  region?: string
  /** Category slug — useful from category landing pages. */
  category?: string
  /** Listing id to exclude (the current listing on /listings/[id]). */
  excludeId?: string
  limit?: number
}

export async function getRelatedListings(
  opts: RelatedListingsOpts = {},
): Promise<DirectoryListing[]> {
  const limit = opts.limit ?? 4
  // Pull a generous slice; the loader returns approved listings only.
  const pool = await getListings({ limit: 200 })
  const exclude = opts.excludeId

  const score = (l: DirectoryListing): number => {
    let s = 0
    if (opts.country && l.country?.toLowerCase() === opts.country.toLowerCase()) s += 3
    if (opts.region && l.region?.toLowerCase() === opts.region.toLowerCase()) s += 2
    if (opts.category && l.category === opts.category) s += 2
    if (l.featured) s += 1
    return s
  }

  return pool
    .filter((l) => !exclude || l.id !== exclude)
    .map((l) => ({ l, s: score(l) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.l)
}
