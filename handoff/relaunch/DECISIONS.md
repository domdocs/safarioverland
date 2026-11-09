# Decisions for Dom — before the relaunch goes live

Everything here has a working placeholder, so the relaunch built around it. Nothing here blocks local review. Each item needs a yes, or a replacement value, before anything is pushed to the live site.

| ID | Decision | Working placeholder | Where it shows |
|---|---|---|---|
| D-01 | Planning fee amount and terms | US$250 per trip, credited in full against the booking; not shown on the site yet | Internal only (STRATEGY §2) |
| D-02 | Names of the DMC partners on the ground | "Our partners in Victoria Falls"; Windhoek and Maun not named until signed | Homepage offer, About, route pages |
| D-03 | Vehicle rental partner(s) | Unnamed — "a vehicle matched to the roads" | Route pages, the offer |
| D-04 | Support line: hours, channel, whether a number is published | "A person you can call while you're on the road" — no number shown | Homepage, route pages |
| D-05 | Instagram handle — `safari_overland` (JSON-LD) or `safarioverland` (CLAUDE.md) | Footer link left on `safari_overland`, matching the live JSON-LD | Footer, JSON-LD |
| D-06 | `/submit` (operator submission form) — keep or retire | Kept, unlinked | — |
| D-07 | Off-region Field Notes (Egypt, Morocco, Ghana, Kenya, Tanzania, gorillas…) — redirect, keep unlinked, or rewrite | Kept live but unlinked from navigation | Field Notes |
| D-08 | Re-tiering existing listings against the new budget bands | Unchanged | Brief form budget step |
| D-09 | Regulatory advice — US seller-of-travel registration / UK Package Travel Regulations | Not yet taken; required before the first paid booking | Terms of service |
| D-10 | Approval of all new user-facing copy (voice is yours) | Draft copy built in, for review on the local preview | Whole site |

| D-11 | Publish a "from US$X" price per route | Placeholder `[US$X]` until route costing is checked | Route detail pages |
| D-12 | Publish the US$150–600 per night target band on About | Bracketed placeholder | About |
| D-13 | One-line bio for Niels van de Meer | `[One-line bio for Niels.]` | About |
| D-14 | Say on About that the brief and first sketch are free, and in general terms who pays us | Included; a shorter fallback line is in SITE_COPY.md | About |
| D-15 | Promise an automatic gearbox on request (depends on the vehicle partner) | Copy says "on request" | Homepage "Can I do this?", Field Notes |
| D-16 | Apply the briefs migration (`20261109_briefs_self_drive_fields.sql`) to production at go-live | Not applied; the API falls back without the new fields | — |

Further entries are added as the team reports them.
