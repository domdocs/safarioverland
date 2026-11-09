# Visual brief: Safari Overland relaunch

**For:** Dom, the design and build agents, the map developer, the media researcher.
**Date:** 2026-11-09. **Status:** proposal. Nothing here changes code. Changes to voice or structure need Dom's approval (CLAUDE.md rule 2).
**Problem:** Dom says the site is too text-heavy. Today the homepage runs three text-only sections in a row (by hand, three things, can I do this?) before the first photograph after the hero. The route pages show one hero photo, a facts strip, then a long text itinerary, stays and checklists with no images. The three routes and the three country pages share three photos (`/images/about/zimbabwe.jpg`, `namibia.jpg`, `botswana.jpg`). The Field Notes guides have no imagery at all ("the guides carry no hero image").
**Aim:** make the trip feel real before anyone reads a paragraph. Show the road, the place and the night's stay, and keep the restraint that makes the site ours.

---

## 0. Method and limits (read first)

- I read the live pages with a text-only fetcher, which shows markup and alt text, not rendered motion. Where I describe motion I either saw it in markup (video files, play/unmute controls, slide counters) or I'm inferring it, and I say which. **I did not watch these sites in a browser.** Before build, a designer should spend 30 minutes clicking through the links in §1.
- andBeyond (andbeyond.com) only returned its cookie banner, and Black Tomato (blacktomato.com) returned 403. I haven't used either as evidence.
- Awwwards' travel category is mostly small agency sites. The best scroll-and-map reference I found is the Codrops "Storytelling Map" demo and Mapbox's scrollytelling template, not an award-winning safari site. No safari brand I could read uses a scroll-linked route map. **That gap is our opening.**

---

## 1. Findings: 13 patterns from the sector

### 1. The first screen is one image and very few words
- **Singita** (https://singita.com/): full-bleed still, H1 "Place of Miracles" (three words), a short subhead, one link.
- **Singita Pamushana** (https://singita.com/lodge/singita-pamushana-lodge/): a single still, name, one line ("Overlooking Zimbabwe's remote southeast").
- **Wilderness** (https://www.wildernessdestinations.com/): a full-bleed lion still, a one-word H1 ("Wilderness") and a GPS coordinate line in place of a tagline.
- **Time + Tide** (https://www.timeandtideafrica.com/): a canoeing still with "Come touch the earth" and one CTA.
**Why it works:** the photo does the selling and the words only name it. Our hero already follows this pattern ("Africa, slowly."). The problem is everything after it.

### 2. Video is used, but as a muted loop or behind a "play" button, never with sound
- **Safari Drive** (https://www.safaridrive.com/): the hero has an "unmute" control, so it's a muted background loop with a vehicle still loaded as well (the poster).
- **Time + Tide**: the hero is a still with a "Play full video" link to a hosted MP4. The film is opt-in.
- **Great Plains Conservation** (https://www.greatplainsconservation.com/): opens on a founder quote with "Watch the full video" (720p MP4).
- **Natural Selection** (https://naturalselection.travel/): the camp URLs resolve to "NS Website Video Thumbnails", so each camp has a short film with a designed poster frame.
**Why it works:** motion catches the eye in the first second. Sound is the visitor's choice. The poster means the page still looks finished if the video never loads.

### 3. Images and text alternate, so you're rarely more than one scroll from a photo
- **Time + Tide**: full-width image, statement, value grid, full-width leopard, and so on. "Text-heavy stretches are short."
- **Journeys by Design** (https://www.journeysbydesign.com/): about 50 words, then a credited full-width photo (Suguta Valley), two short text blocks, then two more photos. Every image carries a place-name caption and photographer credit.
- **Safari Drive**: six alternating image/text bands (tailor-made, itineraries, fleet, navigation, 24-hour support), each with one photo, two lines and one CTA.
**Why it works:** the rhythm is predictable, so the eye relaxes. Each text block is short enough to read between images.

### 4. Captions name the place, so the photo carries information
- **Journeys by Design**: "Suguta Valley, northern Kenya", "Laikipia, Kenya", "Lake Manyara, Tanzania", each credited.
- **Wilderness**: a coordinate line under the H1.
**Why it works:** a captioned photo is evidence as well as decoration, which suits an editorial brand. A JetBrains Mono caption ("Hwange · Ngamo pan · 06:10") is native to our design system.

### 5. Credible numbers in a strip, not in paragraphs
- **Wilderness journey page** (https://www.wildernessdestinations.com/africa/tours/a-botswana-family-safari): "6 nights · 3 camps · price" as a definition-list strip under the hero, repeated near the end.
- **Time + Tide**: per-region stats (camp count, best time, "known for").
- **Singita Pamushana** puts its numbers inline (115,000 acres, 38 habitats). They get lost, which is the counter-example.
**Why it works:** numbers scan in a second and make the trip feel concrete. Ours are better than theirs: kilometres, hours at the wheel, borders, gravel versus tar.

### 6. A gallery per stay, not one hero per lodge
- **Wilderness journey page**: each camp and each experience has its own carousel of about eight photos, with "01 / 08" counters.
- **Singita Pamushana**: an 11-image gallery ("1/11") and a 12-image suite strip.
**Why it works:** people buy the room, the deck and the view. **But** stacked carousels are slow and most visitors never swipe past the first image. We should use a fixed 3-image mosaic per stay, with a "more photos" lightbox.

### 7. Itineraries as cards on index pages
- **Wilderness /journeys** (https://www.wildernessdestinations.com/journeys): image, traveller tag, nights, camps, "From USD", filters.
- **Safari Drive /itineraries** (https://www.safaridrive.com/itineraries/): photo, country, nights, "from £".
- **African Bush Camps** (https://www.africanbushcamps.com/): image, nights, "From USD", description.
**Why it works:** a familiar pattern for comparing trips. **What's missing:** none of them shows the shape of the route on the card. A small route-line thumbnail on each card would be ours alone.

### 8. Day by day with one photo per stop is the minimum. Nobody does a map well.
- **Safari Drive Classic Namibia** (https://www.safaridrive.com/itineraries/classic-namibia): tabs (Overview, Gallery, Prices, Route, Itinerary, Vehicle). 12 of 14 stops have one photo, but the "Route" tab has **no map** and there are **no drive times or road surfaces**.
- **Expert Africa Premier Namibia** (https://www.expertafrica.com/namibia/trip/premier-namibia-self-drive-safari): a sticky tab bar (Summary, Map, Day-by-day, Price) and a route map section, but distances only appear inside the prose. Day text is duplicated and the page is very long.
- **Wilderness**: rich day-by-day with carousels, **no map**.
**Why it matters:** the self-drive specialists hold the practical data and bury it. The luxury brands have the photos and no maps. We already have structured drive times, distances and surfaces in `RouteItinerary`. **Put them beside a map and a photo and we beat both camps.**

### 9. Scroll-linked route maps are a proven storytelling pattern, just not yet in safari
- **Codrops Storytelling Map** (demo https://tympanus.net/Development/StorytellingMap/, write-up https://tympanus.net/codrops/2015/12/16/animated-map-path-for-interactive-storytelling/, summary https://gigazine.net/gsc_news/en/20250309-storytelling-map): an SVG route draws as you scroll, photos appear at the stops where they were taken, and flight legs get their own icon.
- **Mapbox storytelling template** (https://github.com/mapbox/storytelling, https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/): each text "chapter" maps to a camera view. The map flies as the reader scrolls. There is a MapLibre port (https://www.github.com/digidem/maplibre-storymap).
- **Explora** (https://www.explora.com/): a regional locator map with place labels sits between the hero and the destination blocks.
**Why it works:** the line answers "where is this, and how far?" without words. For a self-drive product the line *is* the product.

### 10. Pull quotes as full-width typographic moments
- **Singita**: a large centred quote banner (its 100-year purpose).
- **Time + Tide**: a founder pull-quote in large type near the end.
- **Journeys by Design**: testimonial blockquotes between every text block.
- **African Bush Camps**: a founder portrait beside a long quote.
**Why it works:** it breaks the rhythm and slows the reader. A quote over a photo is a cheap and effective "image" section. For us it should be a guide's line or a traveller's, never a made-up endorsement (accuracy rules, STRATEGY §5).

### 11. Trust strips stay small and come late
- Press-logo strips on **Natural Selection**, **Journeys by Design** and **Safari Drive**, and Trustpilot on **Wilderness**, all in the lower third.
**Why it works:** they reassure without stealing the opening. (We have no press yet. Leave space, don't fake it.)

### 12. The weak spots, and what to avoid
- **Dense card grids and utility blocks in the lower half** (Singita's 20-lodge grid, Aman's repeated "Discover more" modules, https://www.aman.com/). The page goes flat.
- **Duplicated markup for carousels** (Wilderness, Time + Tide, Explora all repeat blocks). Carousels add weight, and content hidden in later slides is rarely seen.
- **Text-only openings** (African Bush Camps opens with a planner block and no image; Great Plains goes text-heavy after the video). Both feel like brochures.
- **Long, duplicated day text** (Expert Africa).
- **Video with sound or a forced full-screen player**. None of the leaders does it, and we shouldn't.

### 13. Performance norms for video heroes
- Chrome guidance: don't lazy-load an above-the-fold video, let the poster be the LCP element, and respect `prefers-reduced-motion` (https://developer.chrome.com/docs/modern-web-guidance/guides/performance/lazy-load-video-and-audio, https://web.dev/learn/performance/video-performance).
- Muted autoplay needs `autoplay muted loop playsinline`. Loops of 6 to 10 seconds keep files small. Vendor guidance puts hero video under about 5 MB (https://assets.transloadit.com/guides/video-on-landing-pages/, https://support.adventistconnect.org/help/hero-video-best-practices). These are rules of thumb, not standards.
- Core Web Vitals targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile (https://web.dev/articles/defining-core-web-vitals-thresholds).

---

## 2. The brief, page by page

### Global rules

- **Text-to-image ratio.** On scroll, a visitor should never travel more than **one viewport height without a photo, a map or a video**. Measure it on a 1440×900 desktop and a 390×844 phone. As a working target, by area of page roughly **60% imagery and maps, 40% type** on the homepage, routes and country pages. Field Notes guides can run **35/65** because they are reference pages.
- **Full-bleed rhythm.** One full-bleed image (100vw, 70–90vh) **every two to three sections**, between the contained sections that hold text.
- **Every photo gets a mono caption** (place · detail, optionally a time): `Hwange · Ngamo pan · 06:10`. It replaces text we would otherwise write, and it fits the existing `.mono` and `.eyebrow` styles. Photographer credit goes in the same line where licensing requires it.
- **Paragraph caps.** No intro or lede longer than **45 words** on landing and route pages. Day notes in the itinerary: **35 words max**, the rest moves to the road book. If copy needs cutting, Dom and Cowork make the cuts (CLAUDE.md: voice work stays in Cowork). This brief only sets the caps.
- **Image treatment.** Keep the existing night-to-transparent gradient (`from-night/40 … to-night`) and `BlendOverlay`, so photos sink into the dark page. Warm, low-sun images. No HDR, no saturated sunset clichés. Grade towards our palette: deep shadows, bone highlights, amber in the light.
- **No carousels with auto-advance.** Use fixed mosaics with a lightbox on click.

### 2.1 Homepage `/`

| # | Section | Treatment |
|---|---|---|
| 1 | **Hero** | **Looping muted video**, 100svh on phones and 92vh on desktop (min 640px). Subject: a 4×4 on red gravel at low sun, dust lit from behind, seen from a distance (H-01). 8 to 12 s seamless loop, no cuts, or at most two slow cuts. Poster frame = first frame, served as an AVIF/WebP still with `priority`. Keep the current overlay gradient, "Africa, *slowly*." and the two CTAs. Small mono caption bottom-right: `Damaraland · C39 · 16:40` (or wherever the clip is from). A small pause button (accessibility, WCAG 2.2.2) bottom-left, mono "Pause". |
| 2 | **The drive is part of the safari** (new, replaces the opening text block) | A **three-frame horizontal strip**, full width, no gutters: the road (H-02), the stay (H-03), the guided morning (H-04). One mono caption each. Under it, a single line in Cormorant: the positioning sentence from SITE_COPY, nothing more. |
| 3 | **By hand** (existing) | Keep the headline and the three steps, but put them in a **split**: left 5 columns text, right 7 columns a photo of a printed road book on a car seat or bonnet with a paper map (H-05). This is the "tangible" moment, where the road book becomes an object. |
| 4 | **Full-bleed image** | Elephants at a Hwange waterhole at dusk (H-06), 80vh, with a **pull quote over the image** (a guide's line, real and attributed, or nothing; see D-note below). Subtle Ken Burns (see §3). |
| 5 | **Routes overview map + route cards** | The routes teaser moves up, ahead of "three things". Desktop: the **overview map** on the left (7 columns, sticky inside this section only) and the three route cards stacked on the right. Hovering or focusing a card highlights that route's line on the map. Phone: map on top (4:5), cards below. Each card: 4:3 photo, number, countries · nights, title, one-line hook, and a **by-the-numbers line** in mono (`~1,300 km · 11 nights · 0 borders`). Figures must come from the route data, not this brief. |
| 6 | **Three things** (existing) | Keep the numbered list, but give each item a **small square image** (1:1, 160px) beside the number: the road book (H-05 crop), a lodge room (H-03 crop), a phone on a dashboard or a partner handing over keys (H-07). Body text capped at 35 words each. |
| 7 | **Full-bleed image** | Sossusvlei or Deadvlei at first light (H-08), 70vh, caption only. |
| 8 | **Can I do this?** (existing) | Cut to **four** items max on the homepage, set two by two, with a link to the full list in Field Notes. No image here, which is fine because 7 and 9 are both images. |
| 9 | **Featured stays** (existing) | Keep `ListingCardEditorial`. Make sure each card carries a real lodge image. |
| 10 | **Field Notes** (existing) | Keep the three cards. They need real images (see the shot list, F-series). |

**Removed or merged:** nothing structural is deleted. "Can I do this?" is shortened. If Dom wants the order kept as it is, the minimum change is to insert sections 2, 4 and 7.

### 2.2 `/routes` (index)

- **Hero:** today it's typographic. Make it a **60vh band with the overview map as the hero**: the three routes drawn on a dark southern-Africa base, lines drawing in on load (1.6 s, staggered by 300 ms), H1 overlaid bottom-left. With reduced motion, the lines appear fully drawn. No photo here: the map is the image.
- **Route list:** each route as a **full-width editorial row** instead of a three-column grid. Image 16:9 on the left (7 columns), text on the right (5 columns), alternating sides. Each row has a **route-shape thumbnail** (the line alone, amber on night, about 120px) next to the title, plus the numbers line (km, nights, borders, % gravel if we have it).
- **How a route works:** keep it, and add a photo of the road book (reuse H-05) and of the vehicle (H-09).
- **Variants:** if shown, use dashed lines on the overview map (same convention as optional days in `RouteItinerary`).

### 2.3 `/routes/[slug]` (the most important page)

1. **Hero:** **looping muted video** where we have footage for that route, otherwise a still with slow Ken Burns. 85vh. Title, country · nights eyebrow, mono caption. Per route: R1 Victoria Falls spray from the air or the gorge (R1-01), R2 a 4×4 on the gravel towards Sesriem with dunes (R2-01), R3 elephants crossing the Chobe from a boat (R3-01).
2. **By-the-numbers strip:** the existing facts strip, restyled as **large numerals**. Cormorant numbers at `h2-fluid` size, mono labels under them: `~1,300 km` · `11 nights` · `5 stays` · `0 borders` · `longest day 5–6 h`. Price stays as now, smaller. The values come from route data only.
3. **The drive: split screen with the sticky map** (built by the map developer). See §2.3.1 for look and behaviour.
4. **Full-bleed image** between "The drive" and "Where you stay": the route's signature landscape (R1-05 Matobo kopjes at dusk, R2-06 Damaraland, R3-05 Kwando floodplain).
5. **Where you stay:** each stay gets a **3-image mosaic** (one large 4:3 image plus two stacked) above the existing `StayCard` text. Click opens a lightbox (keyboard accessible, Esc to close). Alternatives keep a single 4:3 image. **Lodge photos must be licensed or supplied by the lodge**, never copied (STRATEGY §5). Until then, a placeholder block in `bg-card` with a mono label `Photograph to come`.
6. **On the road:** turn the text list into a **horizontal row of small photo cards** (3:4 portrait: a farm stall, a bakery, a border post, a fuel stop; R2-10 Solitaire, for example), scrolling sideways on phones with snap, laid out as a grid on desktop. Text capped at 25 words.
7. **Pull quote over image:** one per route, on a full-bleed image, from a guide or past traveller. Placeholder until real (needs a D-entry).
8. **Before you go:** keep it text-led, with a small 16:9 image of the vehicle on a gravel road (H-09).
9. **Make it yours / CTA:** a closing full-bleed image at 60vh with the CTA over it (lodge fire at night, H-10).

#### 2.3.1 The sticky route map: look and behaviour (for the map developer)

**Layout**
- **Desktop (≥1024px):** two columns. **Left: the day-by-day**, about 45% (`RouteItinerary`, unchanged in content). **Right: the map**, about 55%, `position: sticky; top: header height`, height `100vh − header`. The map is sticky only for the length of "The drive" section. It releases at the end. No scroll-jacking: the page scrolls at native speed.
- **Tablet (768–1023px):** same, but the map is 40% wide.
- **Phone:** no sticky side map. A **compact sticky strip map** (about 140px tall) pinned under the header while "The drive" is in view, showing the whole route with the current stop lit. Tapping it opens a full-screen map sheet. If the developer judges the strip too cramped, fallback: a static 4:5 map at the top of the section, plus a small map thumbnail inside each day.

**Look**
- **Base:** dark and quiet. Night `#0E110F` land, a slightly lighter ink for neighbouring countries, bone at 10–15% for borders, rivers in a muted blue-grey at low opacity (Zambezi, Chobe, Okavango are worth showing; they explain the geography). No road network except our route. A light hillshade or texture is fine if it stays below 10% contrast. No satellite imagery, no default Mapbox or Google styling.
- **Route line:** amber `#D6A24A`, 2.5px at desktop, round caps. Gravel legs as a **dashed amber line** or with a fine bone dash overlay. Tar solid. Optional extensions: dashed `amber/50`, matching `RouteItinerary`. Border crossings: a small bone tick across the line and a mono label (`Kazungula`).
- **Stops:** circles. Unvisited stops: 8px, amber outline on night. Visited: amber filled. **Current:** filled, 12px, with a soft amber halo (static, or one slow pulse; no continuous pulsing). Labels in JetBrains Mono, 11px uppercase, tracking 0.18em, bone at 70%; the current stop's label goes to full bone. Overnight stops vs drive-through points: filled vs hollow.
- **Type on the map:** mono only. Country names in very faint mono caps (bone/25). No serif on the map.
- **Furniture:** a small scale bar (km) and a north mark in mono, bottom-left. Day counter in mono, top-left: `Day 4 of 11 · Hwange → Matobo · 4–5 h · tar`. Attribution as required by the tile licence, as small as allowed.

**Behaviour**
- **The line draws with the reading.** As the reader scrolls through the day-by-day, the route line draws from the start up to the current day's destination (stroke-dashoffset or the equivalent). Scrolling back un-draws it. Drawing is tied to the active day, interpolated within a day, not to an independent timeline.
- **Stops light up** when their day crosses the reading line (about 40% from the top of the viewport): the dot fills, the label brightens, and the camera eases to frame that leg (ease, 600–800 ms; no dramatic fly-to with pitch or 3D tilt).
- **Rest days ("No driving")** hold the line and fade a small mono "No driving" chip near the stop.
- **Two-way link:** hovering or focusing a stop on the map highlights its day in the list; clicking scrolls the list to that day (smooth unless reduced motion).
- **Optional legs** draw in dashed only when the optional day is in view, then remain dashed.
- **Before the section** the map shows the whole route faintly (bone/20), so the reader sees the full shape first, then watches it fill with amber.
- **Reduced motion:** full route drawn on load, no camera movement. The current stop still highlights (a colour change, not motion). The camera stays on the whole route.
- **Accessibility:** the map is `aria-hidden` decoration *if* the list carries all the information (it does today), with a visually hidden summary ("Route map: Victoria Falls to Hwange to Matobo, about N km"). Focus states visible in amber. Every control reachable by keyboard.
- **Performance:** the map loads only when "The drive" section nears the viewport (IntersectionObserver, about one viewport ahead). It must not block LCP. A static SVG or image of the full route is the placeholder and the no-JS fallback. Budget: map JS + tiles ≤ 250 KB compressed before interaction, if possible. The developer decides the stack. An SVG route drawn on a pre-rendered base fits the "drawn by hand" idea and needs no API token. Mapbox needs a token and has usage costs.
- **Data gap:** the route data in `lib/relaunch/data/*.json` has `"lat": null, "lng": null` for stops. **Coordinates need to be filled and sourced** before any map works. Flag for the chief of staff.

**Photos in the day-by-day**
- Each day gets **one image**, 16:9 (desktop, in the left column above the day's text) or 4:3 (phone). Rest days get a "what you do" photo (a guided walk, a game drive, a boat). Driving days get a **road photo for that leg** where possible (the gravel into Hwange, the C14 through the Gaub Pass, the Kazungula bridge). That's the point: the drive is part of the safari.
- Images in the itinerary are lazy-loaded with fixed aspect boxes (no CLS).

### 2.4 `/self-drive/[country]` (ad landing pages)

These receive paid traffic. Fast and visual matters most here.
- **Hero:** **still image, not video**, 82vh as now, LCP under 2.0 s on 4G. Swap the shared about-page photos for country-specific ones (C-01 to C-03). Optionally, a short muted loop on desktop only (≥1024px, not on Save-Data, not with reduced motion), loading after the still.
- **Numbers strip directly under the hero:** routes available, nights, km of the signature route, best months. Mono labels, serif numerals.
- **What we do (three things):** same treatment as the homepage (small square image per item).
- **The route:** a **static route map image** (from the map developer, exported as SVG or a still) next to the route card, linking to the full route page. No sticky map here: these pages should stay light.
- **Image strip:** a 4-image strip of the country (wildlife, landscape, stay, road), captioned.
- **Can I do this?:** compact, as now.
- **CTA band:** over a full-bleed image (country-specific night or fire image).
- Text: cut to the minimum. Visitors from ads give the page seconds.

### 2.5 Field Notes guides (`/field-notes/self-drive/[slug]`)

- Keep the typographic title block, but add a **wide image under it** (21:9, max 60vh, not full-height) that shows the subject literally:
  - `namibia-or-zimbabwe-first`: a diptych, a Namibian dune road and a Zimbabwean teak-forest track (F-01a/b).
  - `choosing-a-vehicle`: a high-clearance 4×4 SUV on gravel, **no rooftop tent** (F-02).
  - `driving-on-the-left`: right-hand-drive dashboard, the road ahead (F-03).
  - `gravel-roads`: dust, corrugations, a lowered tyre or a gravel bend (F-04).
  - `border-crossings`: a border post or the Kazungula bridge (F-05). Check photography rules at borders; many prohibit it. Use a wide shot from a public road or an illustration.
  - `fuel-cash-and-signal`: a rural fuel station (F-06).
  - `after-dark-and-wildlife-on-the-road`: an elephant crossing a road at dusk or a road-sign for wildlife (F-07).
- **In the body:** one inline image or diagram roughly every 400–500 words, plus one "at a glance" box (mono labels) per guide. Diagrams (stopping distances on gravel, a sample day's timing) can be simple line drawings in amber on night.
- Small route or location maps where the guide is about a place (from the map developer, static).

### 2.6 About

- **Hero:** keep the existing hero, but use an image of **people**, not landscape: a guide walking with two guests, or a guide reading a track (A-01). It's the page about who we are.
- **Three things:** small square images as on the homepage.
- **From Victoria Falls:** a full-bleed image of Victoria Falls town or the bridge at dusk (A-02), with the hub copy.
- **What earns a place:** five criteria, each with a small photo example (a hide, a walking guide, a community-owned lodge, a view, a farm stay). Five 1:1 images (A-03 to A-07).
- **Who we are:** a portrait of Niels (pending D-13). If no portrait, use a photo of a working desk with maps and a road book, not a stock face.

---

## 3. Motion principles

1. **Motion explains or it goes.** Allowed: the route line drawing, stops lighting up, an image fading in once as it enters, a hero loop, slow Ken Burns on a few full-bleed stills. Not allowed: parallax on text, scroll-jacking or snapping, horizontal scroll hijack on desktop, cursor effects, animated counters for numbers (the numbers are facts; show them).
2. **Restrained timing.** Fades 400–600 ms, ease-out. Image reveal: opacity 0→1 and translateY 12px→0 at most. Ken Burns: scale 1.00→1.06 over 20–30 s, one direction, no pan-and-zoom combination. **Parallax:** at most on two full-bleed images per page, background moving at 0.9× scroll speed, via CSS (`animation-timeline: view()` with a fallback to static), never JS on scroll events.
3. **`prefers-reduced-motion: reduce`:** no autoplay video (show the poster), no Ken Burns, no parallax, no line-drawing animation (show the finished route), instant state changes. Also honour `Save-Data` and slow connections (`navigator.connection.effectiveType` 2g/3g): serve the still instead of video.
4. **Video:** `autoplay muted loop playsinline`, no audio track in the file at all, a visible pause control. Pause when off-screen (IntersectionObserver) to save battery.
5. **No scroll-jacking.** The page always scrolls natively. Sticky elements are fine; taking control of the scroll is not.
6. **Performance budget**
   - **Hero video:** ≤ 4 MB desktop (1920×1080, H.264 MP4 + AV1 or VP9 WebM, 8–12 s, no audio, CRF tuned so it still looks clean in the dark tones). Mobile version ≤ 1.5 MB at 720p portrait or 4:5 crop. Hosting: Vercel Blob or a video CDN. Don't put large MP4s in the repo.
   - **Poster:** ≤ 150 KB AVIF/WebP, `priority` / `fetchpriority="high"`. The poster is the LCP element.
   - **LCP ≤ 2.5 s** at p75 on mobile (target 2.0 s on the country landing pages). **CLS ≤ 0.1**: every image and the map have fixed aspect boxes. **INP ≤ 200 ms**: no heavy work on scroll.
   - **Below the fold:** all images `loading="lazy"` through `next/image` with `sizes` set correctly. Map, lightbox and any video below the fold are loaded on approach.
   - **Total page weight** at first load (before scrolling): ≤ 1.5 MB on mobile excluding the hero video.
   - **Image sizes:** full-bleed sources at least 2400px wide; cards 1200px; Vercel Image Optimizer does the rest. Keep `placeholder="blur"` as now.

---

## 4. Media shot list

**Rules for the media researcher:** licensed or commissioned only. Record the licence, photographer and source URL for every file. Never use a lodge's photos without written permission (STRATEGY §5). Vehicles: **a 4×4 or SUV without a rooftop tent or camping kit**, every time. No people looking at camera, no selfie poses, no drones over wildlife (often illegal in parks; check), no baiting. Light: early morning or late afternoon, warm, with real shadows. Grade consistently. Orientation: **L** landscape, **P** portrait, **S** square. Video: **V**, 8–12 s, locked-off or very slow move, no audio needed.

### Homepage (H)
| ID | Subject | Place | Format | Mood |
|---|---|---|---|---|
| H-01 | 4×4 driving away down a red gravel road, dust lit from behind | Damaraland or the C14/C19 near Sesriem, Namibia | **V** + L still (poster), 16:9 and a 4:5 crop | Golden hour, wide, small vehicle in big land |
| H-02 | The road ahead through the windscreen, hand on wheel, no faces | Hwange approach road through teak forest, Zimbabwe | L | Calm, morning |
| H-03 | Lodge deck with two chairs facing a waterhole or river | Hwange or Chobe riverfront area | L | Late afternoon, inviting |
| H-04 | Guests on a game drive, backs to camera, guide pointing | Hwange | L | Early morning, cool light |
| H-05 | Printed road book and paper map on a car seat or bonnet, coffee cup | Any; staged | L and S | Tactile, close, warm |
| H-06 | Elephants drinking at a waterhole at dusk | Hwange (e.g. a pan in the Main Camp/Ngamo area) | L, full-bleed 21:9 safe | Quiet, dusty, amber sky |
| H-07 | Keys handed over at a vehicle, hands only | Victoria Falls | S | Practical, friendly |
| H-08 | Deadvlei camel-thorn trees against the dune at first light | Sossusvlei, Namibia | L, full-bleed | Stark, still |
| H-09 | High-clearance SUV parked on a gravel shoulder, doors open | Namibia or Zimbabwe | L | Ready to go |
| H-10 | Fire at night at a lodge, chairs around it, faces not identifiable | Any lodge we list (with permission) or generic | L | Dark, warm, low-key |

### /routes (RT)
| ID | Subject | Place | Format | Mood |
|---|---|---|---|---|
| RT-01 | One 16:9 lead image per route (reuse R1-01, R2-01, R3-01 stills) | — | L | — |
| RT-02 | Interior or dashboard detail with a phone showing the offline road book | Any | L | Practical |

### R1 Zimbabwe: Victoria Falls → Hwange → Matobo (R1)
| ID | Subject | Place | Format | Mood |
|---|---|---|---|---|
| R1-01 | The Falls in full flow, spray and rainbow; aerial or gorge-edge | Victoria Falls | **V** + L still | Big, wet, bright morning |
| R1-02 | Victoria Falls Bridge at dusk | Victoria Falls | L | Quiet, warm |
| R1-03 | Teak forest road (Kalahari sand, tall trees) | Between Victoria Falls and Hwange | L | Dappled, morning |
| R1-04 | Elephants at a pan, many animals, dust | Hwange | L | Dusk |
| R1-05 | Granite kopjes and balancing rocks at dusk | Matobo Hills | L, full-bleed | Golden, vast |
| R1-06 | San rock art detail (paintings in a shelter, e.g. Nswatugi or similar) | Matobo | P and S | Close, respectful; no touching or flash |
| R1-07 | Walking with a guide, tracking rhino (guests from behind) | Matobo National Park | L | Focused, early |
| R1-08 | Bulawayo street: colonial-era buildings, wide streets, jacarandas if in season | Bulawayo | L | Everyday, warm |
| R1-09 | A road stop: roadside stall or the Hwange–Bulawayo road | A8 corridor | L or P | Life on the road |
| R1-10 | Hide at a waterhole, eye-level elephants | Hwange | L | Intimate |

### R2 Namibia: Windhoek → Kalahari → Sossusvlei → Swakopmund → Damaraland → Etosha (R2)
| ID | Subject | Place | Format | Mood |
|---|---|---|---|---|
| R2-01 | 4×4 on the gravel towards the dunes | Sesriem / C19 | **V** + L still | Wide, warm |
| R2-02 | Red Kalahari dunes with grass and a camel-thorn tree | Kalahari, near Mariental | L | Late light |
| R2-03 | Big Daddy or Dune 45 ridge with walkers, tiny in frame | Sossusvlei | L and P | Early, long shadows |
| R2-04 | Deadvlei (use H-08) | Sossusvlei | L | — |
| R2-05 | Fog on the coast, the Swakopmund jetty or shoreline | Swakopmund | L | Cool, grey-blue (deliberate contrast) |
| R2-06 | Damaraland boulders and table mountains | Damaraland | L, full-bleed | Burnt orange |
| R2-07 | Twyfelfontein rock engravings detail | Twyfelfontein | S | Close, raking light |
| R2-08 | Etosha pan, white salt flat with distant animals | Etosha | L, full-bleed | Bleached, hot |
| R2-09 | Night at an Etosha waterhole: rhino or elephants under floodlight | Okaukuejo or similar | L | Dark, hushed |
| R2-10 | Solitaire: the bakery or the old cars in the sand | Solitaire | P | On the road, quirky |
| R2-11 | Okonjima: a guided tracking walk or a cheetah/leopard sighting from a vehicle | Okonjima Nature Reserve | L | Focused |
| R2-12 | Gaub or Kuiseb pass gravel road, switchback | C14 | L | Drama, dust |

### R3 Four corners: Victoria Falls → Chobe → Caprivi → Popa Falls (R3)
| ID | Subject | Place | Format | Mood |
|---|---|---|---|---|
| R3-01 | Elephants crossing the Chobe river, filmed from a boat | Chobe riverfront, Kasane | **V** + L still | Late afternoon, water glinting |
| R3-02 | Small photo boat on the Chobe at sunset | Chobe | L | Warm, peaceful |
| R3-03 | Kazungula bridge or the river border area (wide, from a public spot) | Kazungula | L | Practical, place-setting |
| R3-04 | B8 road through the Zambezi Region, villages and forest | Caprivi Strip | L | Everyday, the road |
| R3-05 | Kwando floodplain with red lechwe or buffalo | Bwabwata / Mudumu area | L, full-bleed | Green, watery |
| R3-06 | Popa Falls rapids on the Okavango | Divundu | L | Moving water |
| R3-07 | Hippos in a channel | Kwando or Chobe | L | Close |
| R3-08 | Guided boat or walking safari in the Zambezi Region | Mudumu/Bwabwata | L | Active |

### Country pages (C)
| ID | Subject | Place | Format |
|---|---|---|---|
| C-01 | Zimbabwe hero: Matobo kopjes or Hwange elephants (not the Falls; the Falls lead R1) | Zimbabwe | L, full-bleed + 4:5 crop |
| C-02 | Namibia hero: 4×4 in Damaraland or dune road | Namibia | L + 4:5 |
| C-03 | Botswana–Zambia hero: Chobe river with elephants and a boat | Kasane | L + 4:5 |
| C-04 to C-06 | Four-image strip per country (wildlife, landscape, stay, road), drawn from the route lists above | — | Mixed |

### Field Notes (F)
F-01a/b dune road (Namibia) and teak track (Zimbabwe), L · F-02 4×4 SUV on gravel, no rooftop tent, L · F-03 right-hand-drive interior looking out, L · F-04 corrugated gravel close-up with tyre, L · F-05 border area or bridge (public vantage only), L · F-06 rural fuel station, L · F-07 elephant crossing a tar road at dusk, or a wildlife warning sign, L.

### About (A)
A-01 guide walking with two guests, from behind, L · A-02 Victoria Falls town or bridge at dusk, L · A-03 a hide · A-04 a walking guide reading a track · A-05 a community-owned lodge (only with the community's permission; don't caption ownership without a source) · A-06 a view from a deck · A-07 a farm-stay stopover. A-03 to A-07 square.

**Video count:** five loops (H-01, R1-01, R2-01, R3-01, optionally a country hero). Everything else is stills. Stills total: roughly 75.

---

## 5. What to keep (so it stays ours)

- **The palette.** Night background, bone type, amber for one accent per heading and for the route line. No new colours. The map uses only these.
- **Cormorant Garamond headlines with one amber italic word.** It's our signature. Big numerals in the numbers strip use Cormorant too.
- **JetBrains Mono eyebrows** and labels, now also used for captions, map labels and the numbers strip. This makes the images feel catalogued rather than decorative.
- **The hairline rules** (`border-rule`) and the numbered list style (`01`, `02`, in amber mono).
- **Sharp corners** (`rounded-none`) and the bordered CTA buttons.
- **The night gradient over images** and `BlendOverlay`, so photos sit inside the dark page instead of on top of it.
- **The itinerary rail** in `RouteItinerary`: amber dots, dashed optional legs. The map should mirror it exactly so the list and the map feel like one object.
- **"Africa, slowly."** and the restraint. Fewer, better images, not more of everything. The aim is image-led, not busy.
- **Voice.** Captions are factual (place, detail, time), sentence case, no exclamation marks.

---

## 6. Decisions to log (for the chief of staff)

- **Coordinates:** stops in `lib/relaunch/data/*.json` have null lat/lng; the maps need sourced coordinates.
- **Pull quotes:** need real, attributed quotes from guides or travellers, with permission. Until then, no quote sections (or a placeholder marked `[Quote to come]`).
- **Lodge photography:** permission requests to lodges, or a budget for licensed stock and commissioned footage.
- **Video hosting:** Vercel Blob vs a video CDN.
- **Homepage section order:** moving routes above "three things" changes the flow, so needs Dom's yes.
- **Copy cuts** to meet the word caps happen in Cowork.
