> ✓ **SHIPPED** — May 2026, PR #3 merged to `main`. Final commit `431add6`.
> See `handoff/CHANGELOG.md` for the session-level summary.

# React Email + outreach tracking

Three pieces of work that ship together:

1. **Refactor existing transactional emails** into React Email
   components. Pure tidy-up; same Resend pipeline, much better
   authoring story.
2. **Add operator-outreach templates** (Templates A / B / C from
   `LISTINGS_AUDIT.md`) as React Email components, accessible from
   the admin listing edit form.
3. **Add an outreach-tracking schema and UI** so each listing carries
   a visible outreach history.

The send model is split deliberately: **transactional emails send
server-side via Resend** (existing pattern); **operator outreach uses
mailto:** to open the user's mail client with the body pre-filled, so
the email looks and feels personal to operators rather than
transactional. We track outreach events in the database either way.

## Branch

Wait for `feature/listing-import-api` to merge to main before starting
this — they don't conflict but the admin UI work in this brief sits
on top of the import flow.

```bash
git checkout main
git pull
git checkout -b feature/react-email-and-outreach
```

## Dependencies

Add to `package.json`:

```json
{
  "dependencies": {
    "react-email": "^6.x.x",
    "@react-email/render": "^6.x.x"
  }
}
```

`@react-email/components` and `@react-email/preview-server` are
deprecated in v6 — exports consolidate under `react-email` directly.
Don't install them.

Optional dev dependency for the local preview server:

```json
{
  "devDependencies": {
    "react-email-preview": "^6.x.x"
  }
}
```

This adds a `pnpm email` script that serves email previews at
`localhost:3001` while authoring templates. Recommended.

## Schema migration

Single migration. Idempotent.

`supabase/migrations/20260513_listing_outreach.sql`:

```sql
CREATE TABLE IF NOT EXISTS listing_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES directory_listings(id) ON DELETE CASCADE,
  template TEXT NOT NULL CHECK (template IN ('featured', 'kept', 'culled')),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  custom_questions TEXT,                     -- the property-specific clarifying questions
  sent_at TIMESTAMPTZ,
  sent_via TEXT CHECK (sent_via IS NULL OR sent_via IN ('mailto', 'resend', 'manual')),
  status TEXT NOT NULL DEFAULT 'drafted'
    CHECK (status IN ('drafted', 'sent', 'replied', 'no_response', 'archived')),
  notes TEXT,                                -- free-text follow-up notes from Dom
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS listing_outreach_listing_id_idx
  ON listing_outreach (listing_id);
CREATE INDEX IF NOT EXISTS listing_outreach_status_idx
  ON listing_outreach (status);
CREATE INDEX IF NOT EXISTS listing_outreach_sent_at_idx
  ON listing_outreach (sent_at);

-- updated_at trigger (reuses helper from earlier migrations)
DROP TRIGGER IF EXISTS update_listing_outreach_updated_at ON listing_outreach;
CREATE TRIGGER update_listing_outreach_updated_at
BEFORE UPDATE ON listing_outreach
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS — admin-only writes via service role
ALTER TABLE listing_outreach ENABLE ROW LEVEL SECURITY;

-- No public read or write policies; admin access via service role bypasses RLS
```

---

## Part 1 — React Email base + transactional refactor

### Directory structure

```
lib/email/
  templates/
    components/
      Layout.tsx              -- shared wrapper: brand styles, footer
      Heading.tsx             -- branded serif heading
      Paragraph.tsx           -- body text in brand palette
      BrandedButton.tsx       -- CTA in --amber on --night
      BrandedRule.tsx         -- hairline separator
    BriefReceivedEmail.tsx
    BriefNotifyEmail.tsx
    DownloadConfirmationEmail.tsx
    ContactAcknowledgementEmail.tsx
  render.ts                   -- thin wrapper around @react-email/render
  send.ts                     -- existing send() function, unchanged
```

### Shared components

`Layout.tsx` should wrap every email with:

- A header containing the Safari Overland mark + wordmark (use the
  upgraded horizontal-300 PNG hosted at `public/images/logo/`)
- A footer with: address line, link to privacy policy, unsubscribe
  link for non-transactional emails
- Brand-styled inline CSS using `--night` / `--bone` / `--amber` token
  values (hardcoded hex since email clients don't support CSS
  variables). Match the values in `app/globals.css`:
  - `--night` → `#0E110F`
  - `--bone` → `#EDE7D8`
  - `--bone-mute` → `#B2AD9F`
  - `--amber` → `#D6A24A`
  - `--rule` → `#2A2F2B`

Email clients are inconsistent about CSS support — keep inline styles
defensive, use `<table>` for layout where Outlook will be reading,
and rely on `react-email`'s component library which handles these
quirks.

### Refactor targets

**`lib/briefs/email.ts` — `sendBriefReceived` and `sendBriefNotify`**

Currently hand-coded HTML strings. Replace with:

```ts
import { render } from "@react-email/render"
import { BriefReceivedEmail } from "@/lib/email/templates/BriefReceivedEmail"
import { send } from "@/lib/email/send"

export async function sendBriefReceived(brief: Brief) {
  const html = await render(<BriefReceivedEmail brief={brief} />)
  return send({
    from: fromAddress(),
    to: brief.contact_email,
    subject: "Your Safari Overland trip brief — received",
    html,
  })
}
```

Same for `sendBriefNotify`.

**`lib/downloads/email.ts`** — same treatment.

**`app/api/contact/route.ts` and `supabase/functions/notify-contact/index.ts`**
— audit these for inline email HTML, refactor anything we own.

### Local preview

Add a `pnpm email` script that runs `react-email dev`. Place a thin
preview shim in `lib/email/preview.tsx` that imports each template
with realistic mock data so authoring is fast.

### Verify (Part 1)

- All four existing transactional emails still send and render
  identically (or better) to the inline-HTML versions
- `pnpm email` serves previews at localhost:3001 with all templates
  visible and rendering with mock data
- No regressions in the brief submission flow or the download flow

---

## Part 2 — Outreach templates

Three React Email components, mirroring Templates A / B / C from
`handoff/LISTINGS_AUDIT.md`.

### `lib/email/templates/OperatorOutreachFeaturedEmail.tsx` (Template A)

Props:

```ts
type Props = {
  recipientName: string         // "Sarah" or "the Gardiner family"
  lodgeName: string             // "Matetsi Victoria Falls"
  customQuestions: string[]     // 2-3 listing-specific clarifying questions
                                 // pulled from the research record's
                                 // "Outstanding gaps — For operator outreach"
                                 // section
  senderName: string            // "Niels van de Meer"
  senderEmail: string           // "niels@safarioverland.com"
}
```

Body should follow the Template A structure from LISTINGS_AUDIT.md
exactly:

- Greeting
- Repositioning paragraph
- *"[lodgeName] is staying. We'd like to feature it..."*
- The three asks (photos, founder note, traveller quotes)
- The custom clarifying questions (passed as props, listed as bullets)
- *"No commitments either way..."*
- Sign-off as `senderName` / Safari Overland · Victoria Falls /
  `senderEmail`

### `lib/email/templates/OperatorOutreachKeptEmail.tsx` (Template B)

Same prop shape, different body — kept but not featured.

### `lib/email/templates/OperatorOutreachCulledEmail.tsx` (Template C)

Same prop shape, different body — polite cull.

### Subject lines

Hardcoded per template:

- Featured: `A short note from Safari Overland — [lodge] feature`
- Kept: `A short update from Safari Overland`
- Culled: `A note from Safari Overland`

Generated by a helper in `lib/email/outreach.ts`:

```ts
export function outreachSubject(template: "featured" | "kept" | "culled", lodgeName: string): string
```

---

## Part 3 — Admin UI + tracking

### Routes (new)

**`POST /api/admin/listings/[id]/outreach`** — create a drafted
outreach record.

Request body:

```json
{
  "template": "featured" | "kept" | "culled",
  "recipient_email": "string",
  "recipient_name": "string",
  "custom_questions": ["string"]
}
```

Server:

1. Loads the listing from `directory_listings`
2. Renders the chosen template with the listing + recipient data
3. Inserts a row into `listing_outreach` with `status='drafted'`,
   `body_html` set to the rendered output, `subject` set
4. Returns `{ id, body_html, subject, mailto_url }` where `mailto_url`
   is a properly-encoded mailto: link

**`PATCH /api/admin/listings/[id]/outreach/[outreachId]`** — update
an existing outreach record.

Request body:

```json
{
  "status": "sent" | "replied" | "no_response" | "archived",
  "sent_via": "mailto" | "resend" | "manual",
  "sent_at": "2026-05-12T09:30:00Z",
  "notes": "string (optional)"
}
```

Server: validates, updates, returns the updated row.

**`GET /api/admin/listings/[id]/outreach`** — list outreach history
for the listing.

Returns array of outreach records, most recent first.

### Admin UI changes

Edit `app/admin/listings/edit/[id]/page.tsx` (or its current admin
component) to add an **"Outreach" section** below the existing
editorial fields.

#### Outreach section layout

```
┌─ Outreach ─────────────────────────────────────┐
│                                                 │
│ Status: Sent · 3 days ago · Awaiting reply     │
│ Last template: Featured (Template A)            │
│ Recipient: sarah@matetsi.com                    │
│                                                 │
│ ┌─ Outreach history ──────────────────────────┐│
│ │ 2026-05-12 — Featured · Sent via mailto    ││
│ │ 2026-04-08 — Featured · Drafted, not sent  ││
│ └────────────────────────────────────────────┘│
│                                                 │
│ [ Draft new outreach ▾ ]                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

The "Draft new outreach" button opens a modal:

```
┌─ Draft outreach: Matetsi Victoria Falls ──────┐
│                                                 │
│ Template:  ● Featured (Template A)             │
│            ○ Kept (Template B)                  │
│            ○ Culled (Template C)                │
│                                                 │
│ Recipient name:  [_____________________________]│
│ Recipient email: [_____________________________]│
│                                                 │
│ Clarifying questions to include (one per line):│
│ [________________________________________________]│
│ [Pre-populated from editor_notes if present     ]│
│                                                 │
│ ─── Preview ────────────────────────────────── │
│ [Rendered email preview, scrollable]            │
│                                                 │
│           [Open in mail client]  [Mark as sent]│
└─────────────────────────────────────────────────┘
```

**Open in mail client** button:

1. Calls POST to create the drafted outreach record (status=drafted)
2. On success, constructs a mailto: URL with subject + body
3. `window.location.href = mailtoUrl` opens the user's default mail
   client (Niels' Gmail in this case, if it's set as default)
4. Modal stays open with the "Mark as sent" button still active

**Mark as sent** button (visible only after Open in mail client clicked, or as a separate option):

1. PATCH the outreach record: `status=sent`, `sent_via=mailto`,
   `sent_at=now()`
2. Closes the modal
3. Refreshes the outreach section to show the new status

### Default-template logic

When the modal opens for a listing:

- If `status='approved'` AND `featured=true` → default to **Featured (A)**
- If `status='approved'` AND `featured=false` → default to **Kept (B)**
- If `status='rejected'` → default to **Culled (C)**
- If `status='pending'` → no default, show all three with no
  pre-selection

### Pre-populating clarifying questions

Parse the listing's `editor_notes` field for lines that look like
"For operator outreach" items, or look for a structured section in
the editor_notes (templates created via the import API will have
the operator-outreach questions captured there).

If no questions can be auto-extracted, leave the textarea empty —
the user can fill it manually.

### Mailto URL construction

```ts
function buildMailtoUrl({
  to,
  subject,
  body,
  cc,
}: {
  to: string
  subject: string
  body: string          // plain text version of the email
  cc?: string
}): string {
  const params = new URLSearchParams()
  params.set("subject", subject)
  params.set("body", body)
  if (cc) params.set("cc", cc)
  return `mailto:${to}?${params.toString()}`
}
```

Important: mailto bodies are *plain text*, not HTML. The React Email
templates need to expose a `toPlainText()` helper or use
`@react-email/render`'s text-output mode. Verify the plain-text
output reads cleanly before merging.

### Auth

All new routes are under `/api/admin/*` — covered by existing admin
Basic Auth middleware. Verify the matcher includes the new paths.

---

## Tests

### Part 1 — transactional

- Unit tests for each refactored template: render with mock data,
  snapshot the HTML output
- Integration test: submit a brief, verify the user receives the
  React-Email-rendered email (compare to prior inline-HTML version
  for behaviour parity)

### Part 2 — outreach templates

- Render each template with realistic mock data
- Verify subject lines match the convention
- Verify the custom-questions array renders as a bulleted list

### Part 3 — admin UI

- Unit tests for the mailto URL builder
- Integration test: open a listing's edit page, click "Draft new
  outreach", select Template A, enter recipient, click "Open in mail
  client" — verify a `listing_outreach` row is created with
  status=drafted and the mailto URL is correctly formed
- Integration test: click "Mark as sent" — verify the row updates to
  status=sent with sent_via=mailto and sent_at set

## Verify (end-to-end)

1. Run `pnpm email` locally — all six templates render with mock data
2. Submit a brief on the live preview — confirmation email arrives in
   the planner inbox, rendered from React Email
3. Open Matetsi in `/admin/listings/edit/[id]` — Outreach section is
   present, empty history
4. Click "Draft new outreach" → modal opens, Featured template
   pre-selected (Matetsi is approved + featured)
5. Enter recipient (test address), confirm preview renders the
   merged email with Matetsi-specific questions pulled from
   editor_notes
6. Click "Open in mail client" — user's default mail client opens
   with the email drafted
7. Click "Mark as sent" — status changes to "Sent · just now ·
   Awaiting reply"
8. Verify the new row in the `listing_outreach` table via Supabase
   directly

## Out of scope

- Server-side send for outreach via Resend — explicitly not doing
  this. Outreach is personal-feel; mailto is the right model.
- Automated reminder system ("no reply in 7 days → send Template B
  reminder") — future iteration if outreach volume justifies it.
- Reply tracking via email-webhook integration — future iteration.
- The visual editor (`@react-email/editor`) — not needed for our
  scale; six hand-coded templates are fewer moving parts than a
  WYSIWYG.

## Done means

- All four existing transactional emails consolidated into React Email
  templates, still sending correctly via Resend
- Three outreach templates available in the admin listing edit form
- Drafting outreach for a listing creates a `listing_outreach` row
- Open-in-mail-client button populates the user's default mail client
  correctly
- Mark-as-sent updates the row and reflects in the UI
- Outreach history is visible per listing
- Tests pass
- PR description references this brief and links to
  `handoff/LISTINGS_AUDIT.md` for the template content reference
