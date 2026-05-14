# Schema — Itinerary data model

This is the canonical shape of an itinerary document. The admin form must produce exactly this structure (or one that serialises to it). Field types follow TypeScript-ish notation.

For a working example of every field populated, see `source-prototype/src/data.jsx`.

---

## Top-level shape

```ts
type Itinerary = {
  // Database metadata (not displayed)
  id: string;            // uuid
  slug: string;          // url-safe, unique
  status: "draft" | "published";
  created_at: ISODateTime;
  updated_at: ISODateTime;
  created_by: UserId;

  // Theme — drives CSS variants
  theme: {
    palette: "savanna" | "forest" | "coast";       // default "savanna"
    typography: "editorial" | "modern" | "classic"; // default "editorial"
    density: "spacious" | "compact";                // default "spacious"
    show_curator_notes: boolean;                    // default true
  };

  // Document content
  trip: Trip;
  chapters: Chapter[];        // ordered, min 1, max 8 (recommended)
  transits: Transit[];        // length = chapters.length - 1
  practicals?: Practicals;    // optional override of defaults — see §5
};
```

---

## 1. `Trip` — top metadata

| Field | Type | Required | Notes / UX |
|---|---|---|---|
| `title` | string (1–80) | yes | Short working title for internal reference. *Not* displayed on the cover (the cover title is composed from `cover_title_lines`). |
| `cover_title_lines` | string[] (1–4) | yes | Each line renders on its own line, italic display serif. Example: `["The Smoke,", "the Delta,", "& the Cape"]`. UX: a repeater with a "+ Add line" button. |
| `subtitle` | string (≤160) | yes | One italic line under the cover title. |
| `reference` | string (≤32) | yes | Internal booking ref shown in header & colophon. Auto-generate format `SO-YYYY-NNNN`. |
| `guests` | string[] (1–6) | yes | Display: joined with " & ". UX: tag-style input. |
| `dates.from` | string (e.g. `"14 September"`) | yes | Human-readable, no year. |
| `dates.to`   | string (e.g. `"24 September"`) | yes | Human-readable, no year. |
| `dates.year` | string (e.g. `"2026"`) | yes | Separate so it can be styled distinctly. |
| `pace` | string (≤120) | yes | Short sentence. Example: `"Unhurried. Three nights, on average, in each place."` |
| `curator.name` | string | yes | First name displayed in sign-off; full name in colophon. |
| `curator.title` | string | yes | E.g. "Curator, Safari Overland". |
| `curator.location` | string | yes | E.g. "Victoria Falls, Zimbabwe". |
| `prologue` | string[] (1–5 paragraphs) | yes | First paragraph styled as a large italic lede. UX: rich textarea with paragraph splitting. |

**Validation:** `cover_title_lines.length >= 1`, `guests.length >= 1`, `prologue.length >= 1`.

---

## 2. `Chapter` — one per destination

| Field | Type | Required | Notes / UX |
|---|---|---|---|
| `id` | string (slug) | yes | URL-safe, unique within trip. Auto-generate from `place` (e.g. "victoria-falls"). |
| `numeral` | string (`"I"` ‒ `"VIII"`) | auto | Roman numeral, derived from chapter index. Do not expose in UI. |
| `place` | string (1–60) | yes | E.g. "Victoria Falls". Large display title. |
| `country` | string (1–60) | yes | E.g. "Zimbabwe". Eyebrow under place title. |
| `coords.lat` | number | yes | Signed decimal degrees. Used by the map. Validation: −90 to 90. |
| `coords.lon` | number | yes | Signed decimal degrees. Validation: −180 to 180. |
| `nights` | integer (1–14) | yes | Displayed in hero badge & overview list. |
| `dates` | string (e.g. `"14 — 16 September"`) | yes | Use an en-dash with spaces around it. |
| `palette` | string (≤20) | no | Atmospheric tag — `"spray"`, `"river"`, `"delta"`, `"atlantic"`. Currently informational only; reserved for per-chapter colour accents in v2. |
| `epigraph` | string (≤120) | yes | Short italic quote / motto. Example: `"Mosi-oa-Tunya — the smoke that thunders."` |
| `intro` | string[] (1–4 paragraphs) | yes | Editorial narrative copy. First paragraph gets a drop-cap. |
| `lodge` | `Lodge` | yes | See §3. |
| `rhythm` | `RhythmItem[]` (3–6) | yes | The daily-arc timeline. See §4. |
| `seeing` | string[] (3–6) | yes | Wildlife / sights bullet list. Each item ≤120 chars. |
| `note` | string (50–400) | yes (if curator notes enabled) | Personal recommendation, written in first person. Rendered in handwritten "Caveat" font. Sign-off "— T." is added automatically; do **not** include it in the field. |
| `photos.hero_url` | URL | yes | 16:9 or 3:2, ≥1600px wide. Full-bleed background. |
| `photos.lodge_url` | URL | yes | 4:5 portrait, ≥1200px on long edge. |

### 2.1 `Lodge`

| Field | Type | Required | Notes / UX |
|---|---|---|---|
| `name` | string (1–80) | yes | Display name of the property. |
| `kind` | string (≤80) | yes | Eyebrow tag. Example: `"Grande dame, est. 1904"` or `"Tented camp, private concession"`. |
| `room` | string (≤80) | yes | Specific room/tent assignment. Example: `"Stables Garden Suite"`. |
| `blurb` | string (50–400) | yes | One paragraph describing the property and why we chose it. |
| `amenities` | string[] (3–8) | yes | Short bullet items, ≤32 chars each. Example: `["Two restaurants", "Edwardian terrace"]`. |

### 2.2 `RhythmItem`

| Field | Type | Required | Notes |
|---|---|---|---|
| `time` | string (≤32) | yes | Free-form label. Examples: `"Dawn"`, `"Late morning"`, `"Day 2"`, `"After dark"`. |
| `title` | string (≤80) | yes | Activity headline. |
| `body` | string (50–280) | yes | One short paragraph describing the activity. |

---

## 3. `Transit` — between chapters

| Field | Type | Required | Notes / UX |
|---|---|---|---|
| `from_chapter_id` | string | yes | Must reference the preceding chapter. |
| `to_chapter_id` | string | yes | Must reference the next chapter. |
| `mode` | string (≤60) | yes | Free text. Mode icons are matched by keyword (see §3.1). Examples: `"Private road transfer"`, `"Light aircraft (Cessna 208)"`, `"Bush flight + scheduled flights"`. |
| `duration` | string (≤32) | yes | Human-readable. Example: `"≈ 1 hr 10 min flight"`. |
| `distance` | string (≤32) | yes | Human-readable with units. Example: `"440 km"`. |
| `crosses` | string (≤120) | yes | What you cross. Example: `"Kazungula border (Zimbabwe → Botswana)"` or `"Kasane → Mombo airstrip"`. |
| `note` | string (50–300) | yes | Practical detail about the leg — visa formalities, baggage rules, schedule. |

**Validation:** `transits.length === chapters.length - 1`. The form should automatically insert/remove transits when chapters are added/removed.

### 3.1 Mode icon resolution

The component picks an SVG icon based on lowercased keywords in `mode`:

| Keyword match | Icon |
|---|---|
| contains `"road"` or `"transfer"` | Car silhouette |
| contains `"aircraft"`, `"flight"`, or `"bush"` | Aeroplane silhouette |
| anything else | Dashed line (generic) |

For v1, accept this. In v2 consider adding `mode_icon` as an explicit field with options: `road | flight | rail | boat | walk | generic`.

---

## 4. `Practicals` — back matter (optional)

By default, the document renders six fixed cards (see `practicals.jsx`):
1. Included
2. Not Included
3. Weather, September
4. Packing, in essence
5. Health & visas
6. On the ground

These can be a) hard-coded fallback boilerplate per region, or b) editable per trip. Recommended approach for v1: store as an array of cards, default-populated when the trip is created:

```ts
type Practicals = {
  cards: PracticalCard[];   // ordered
};

type PracticalCard = {
  title: string;            // ≤40 chars
  body: string;             // markdown allowed (renders as <ul> or <p>)
};
```

The default card set can live as a JSON template in the codebase, copied into each new trip on creation.

---

## 5. Validation rules summary

```
- chapters.length >= 1 && <= 8
- transits.length === chapters.length - 1
- chapter.coords.lat ∈ [-90, 90]
- chapter.coords.lon ∈ [-180, 180]
- chapter.nights ∈ [1, 14]
- All string max-lengths as noted in the tables above
- All URL fields must resolve to a valid image (server-side check on save)
- At least one photo per chapter (hero is mandatory; lodge is mandatory)
- Cover photo is mandatory before publish (not required for draft)
```

---

## 6. Example JSON (abridged)

```json
{
  "id": "01J9R…",
  "slug": "whitford-sept-2026",
  "status": "draft",
  "theme": {
    "palette": "savanna",
    "typography": "editorial",
    "density": "spacious",
    "show_curator_notes": true
  },
  "trip": {
    "title": "Whitford — Sept 2026",
    "cover_title_lines": ["The Smoke,", "the Delta,", "& the Cape"],
    "subtitle": "Eleven days from the thunder of the Zambezi…",
    "reference": "SO-2026-1042",
    "guests": ["Mr & Mrs Whitford"],
    "dates": { "from": "14 September", "to": "24 September", "year": "2026" },
    "pace": "Unhurried. Three nights, on average, in each place.",
    "curator": {
      "name": "Tom Edwards",
      "title": "Curator, Safari Overland",
      "location": "Victoria Falls, Zimbabwe"
    },
    "prologue": [
      "Africa is not a place you visit. It is a thing that happens to you.",
      "This eleven-day arc carries you from the thunder of the Zambezi…"
    ]
  },
  "chapters": [
    {
      "id": "victoria-falls",
      "place": "Victoria Falls",
      "country": "Zimbabwe",
      "coords": { "lat": -17.924, "lon": 25.857 },
      "nights": 2,
      "dates": "14 — 16 September",
      "palette": "spray",
      "epigraph": "Mosi-oa-Tunya — the smoke that thunders.",
      "intro": ["You arrive on the Zimbabwean side…", "We give you two full days here…"],
      "lodge": {
        "name": "Victoria Falls Hotel",
        "kind": "Grande dame, est. 1904",
        "room": "Stables Garden Suite",
        "blurb": "The colonial-era hotel sits on the lip of the gorge…",
        "amenities": ["Two restaurants", "Edwardian terrace", "Garden bathing pool", "Falls 10 min walk"]
      },
      "rhythm": [
        { "time": "Dawn", "title": "Helicopter — Flight of Angels", "body": "Fifteen minutes from Sprayview airstrip…" }
      ],
      "seeing": ["Verreaux's eagles nesting in the gorge", "Bushbuck and warthog in the hotel grounds at dusk"],
      "note": "If it is your first time, do not rush the Falls…",
      "photos": {
        "hero_url": "https://cdn.safarioverland.com/uploads/abc.webp",
        "lodge_url": "https://cdn.safarioverland.com/uploads/def.webp"
      }
    }
  ],
  "transits": [
    {
      "from_chapter_id": "victoria-falls",
      "to_chapter_id": "chobe",
      "mode": "Private road transfer",
      "duration": "≈ 1 hr 30 min",
      "distance": "78 km",
      "crosses": "Kazungula border (Zimbabwe → Botswana)",
      "note": "Border formalities take 30–45 minutes…"
    }
  ]
}
```

---

## 7. Form UX recommendations

- **Single-form-with-collapsible-sections** layout works well — staff need to see the whole shape.
- **Drag to reorder chapters** — and have the system auto-recalculate roman numerals and re-link transits.
- **Live preview pane** alongside the form pays for itself; it gives the staff member instant feedback on whether the copy "reads right".
- **Markdown for long-form fields** (prologue, intro, blurb, note) — keeps the form simple while letting the staff member style emphasis where needed. Render only inline marks (`*em*`, `**strong**`) — block-level markdown will fight the design.
- **Character counters** on fields with strict max lengths (epigraph, subtitle, amenities) — overruns will break the layout.
- **Pre-flight check** on Publish — verifies all required fields, all photos uploaded, transit count matches chapter count.
- **Clone trip** — most itineraries are variations on a handful of templates. A "Duplicate" action will save significant time.
- **Library / templates** — let the team save a chapter as a reusable template (e.g. "Mombo Camp / 3 nights") and drop it into new trips with one click.
