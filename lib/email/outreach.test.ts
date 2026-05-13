import { test } from "node:test"
import assert from "node:assert/strict"

import {
  buildMailtoUrl,
  extractClarifyingQuestions,
  outreachSubject,
} from "./outreach"

// ── outreachSubject ──────────────────────────────────────────────────

test("outreachSubject: featured includes the lodge name", () => {
  assert.equal(
    outreachSubject("featured", "Matetsi Victoria Falls"),
    "A short note from Safari Overland — Matetsi Victoria Falls feature",
  )
})

test("outreachSubject: kept uses the generic update phrasing", () => {
  assert.equal(
    outreachSubject("kept", "Anywhere"),
    "A short update from Safari Overland",
  )
})

test("outreachSubject: culled uses the polite note phrasing", () => {
  assert.equal(
    outreachSubject("culled", "Anywhere"),
    "A note from Safari Overland",
  )
})

// ── buildMailtoUrl ───────────────────────────────────────────────────

test("buildMailtoUrl: encodes subject and body for the mail client", () => {
  const url = buildMailtoUrl({
    to: "sarah@matetsi.com",
    subject: "A short note from Safari Overland — Matetsi feature",
    body: "Dear Sarah,\n\nWe are repositioning safarioverland.com…",
  })
  assert.ok(url.startsWith("mailto:"), "must start with mailto:")
  assert.ok(url.includes("subject=A+short+note"), `expected encoded subject; got ${url}`)
  assert.ok(
    url.includes("body=Dear+Sarah%2C%0A%0AWe+are+repositioning"),
    `expected encoded body; got ${url}`,
  )
})

test("buildMailtoUrl: includes cc when provided", () => {
  const url = buildMailtoUrl({
    to: "a@example.com",
    subject: "Hi",
    body: "test",
    cc: "b@example.com",
  })
  assert.ok(url.includes("cc=b%40example.com"))
})

test("buildMailtoUrl: omits cc when not provided", () => {
  const url = buildMailtoUrl({
    to: "a@example.com",
    subject: "Hi",
    body: "test",
  })
  assert.ok(!url.includes("cc="))
})

// ── extractClarifyingQuestions ───────────────────────────────────────

test("extractClarifyingQuestions: empty/null input returns empty array", () => {
  assert.deepEqual(extractClarifyingQuestions(null), [])
  assert.deepEqual(extractClarifyingQuestions(""), [])
  assert.deepEqual(extractClarifyingQuestions(undefined), [])
})

test("extractClarifyingQuestions: pulls bullet items from 'For operator outreach' block", () => {
  const notes = `
Strong conservation substance — Amaganyane Unit is the editorial headline.

### For operator outreach
- Are walking safaris part of the offer on the concession?
- Could you tell us more about the gastronomy programme?
- What's the peak total guest capacity?

### Sign-off checklist
- Dom verifies the verdict
  `
  const result = extractClarifyingQuestions(notes)
  assert.equal(result.length, 3)
  assert.ok(result[0].includes("walking safaris"))
  assert.ok(result[1].includes("gastronomy"))
  assert.ok(result[2].includes("peak total guest capacity"))
})

test("extractClarifyingQuestions: pulls bullets after a 'clarifying questions' line", () => {
  const notes = `
We've heard it's a real distinctive marker.

Three clarifying questions while we're writing the page:
— Are walking safaris part of the offer?
— Could you tell us more about the gastronomy programme?
  `
  const result = extractClarifyingQuestions(notes)
  assert.equal(result.length, 2)
})

test("extractClarifyingQuestions: ignores extremely short bullets (likely TOC noise)", () => {
  const notes = `
### For operator outreach
- ok
- This is a real question about something specific?
  `
  const result = extractClarifyingQuestions(notes)
  assert.deepEqual(result, [
    "This is a real question about something specific?",
  ])
})

test("extractClarifyingQuestions: returns [] when no recognisable block is present", () => {
  const notes = `
Just some generic editor notes with no outreach section.
Nothing specific to extract here.
  `
  assert.deepEqual(extractClarifyingQuestions(notes), [])
})
