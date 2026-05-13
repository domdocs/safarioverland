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

test("buildMailtoUrl: encodes subject + body per RFC 6068 (spaces → %20, not +)", () => {
  const url = buildMailtoUrl({
    to: "sarah@matetsi.com",
    subject: "A short note from Safari Overland — Matetsi feature",
    body: "Dear Sarah,\n\nWe are repositioning safarioverland.com…",
  })
  assert.ok(url.startsWith("mailto:"), "must start with mailto:")
  // RFC 6068 — space is %20, NOT +. The latter is form-urlencoded and
  // most mail clients render it as a literal plus sign.
  assert.ok(
    url.includes("subject=A%20short%20note"),
    `expected %20-encoded subject; got ${url}`,
  )
  assert.ok(
    url.includes("body=Dear%20Sarah%2C%0A%0AWe%20are%20repositioning"),
    `expected %20-encoded body with %0A newlines; got ${url}`,
  )
  // Never emit `+` as a space stand-in.
  assert.ok(
    !/[?&](subject|body|cc|bcc)=[^&]*\+/.test(url),
    `mailto query params must not contain '+' as a space; got ${url}`,
  )
})

test("buildMailtoUrl: literal '+' in body is encoded as %2B (not lost)", () => {
  const url = buildMailtoUrl({
    to: "a@example.com",
    subject: "Hi",
    body: "Phone: +1 555 0100",
  })
  assert.ok(
    url.includes("body=Phone%3A%20%2B1%20555%200100"),
    `expected literal + to be encoded as %2B; got ${url}`,
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

test("extractClarifyingQuestions: joins continuation lines into a single question", () => {
  // Mirrors the Matetsi research-record shape: blockquoted bullets that
  // wrap across multiple lines. The pre-fix parser truncated each
  // question at the first newline.
  const notes = `
Three clarifying questions while we're writing the page:

> — Are walking safaris part of the offer on the concession? They're
>   not prominently surfaced on the experiences page and we want to
>   describe the activity mix accurately.
> — Could you tell us more about the gastronomy programme? Tasting
>   menus, chef's table, guest chefs, regional sourcing — whatever
>   shape it takes.
> — What's the peak total guest capacity across the 16 suites, 2
>   family suites, and Matetsi River House?
  `
  const result = extractClarifyingQuestions(notes)
  assert.equal(result.length, 3)
  assert.ok(
    result[0].includes("describe the activity mix accurately"),
    `question 1 should include continuation; got: ${result[0]}`,
  )
  assert.ok(
    result[1].includes("shape it takes"),
    `question 2 should include continuation; got: ${result[1]}`,
  )
  assert.ok(
    result[2].endsWith("Matetsi River House?"),
    `question 3 should include the trailing line; got: ${result[2]}`,
  )
  // No accidental newlines or blockquote markers retained.
  assert.ok(!result.some((q) => /[\r\n>]/.test(q)))
})
