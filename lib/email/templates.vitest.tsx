import { describe, expect, test } from "vitest"
import { render } from "@react-email/render"

import {
  OperatorOutreachFeaturedEmail,
  operatorOutreachFeaturedPlainText,
} from "./templates/OperatorOutreachFeaturedEmail"
import { ContactAcknowledgementEmail } from "./templates/ContactAcknowledgementEmail"
import { DownloadConfirmationEmail } from "./templates/DownloadConfirmationEmail"
import { BriefReceivedEmail } from "./templates/BriefReceivedEmail"
import { BriefNotifyEmail } from "./templates/BriefNotifyEmail"

import type { Brief } from "@/lib/briefs/types"
import type { Resource } from "@/lib/downloads/resources"

/**
 * Render-shape tests for each React Email template. We don't snapshot
 * full HTML — clients rendering email markup change byte-for-byte
 * between react-email versions. Instead we assert the user-meaningful
 * bits made it into the output.
 */

const briefFixture: Brief = {
  id: "brief-1",
  created_at: "2026-05-13T10:00:00Z",
  updated_at: "2026-05-13T10:00:00Z",
  chapters: [],
  rhythm: null,
  months: ["Jul", "Aug"],
  nights: null,
  travelers: null,
  budget_per_person: null,
  notes: "Honeymoon, no kids, want walking days.",
  intent: ["walking", "slow"],
  pace: "slow",
  quiet_markers: ["walking-days", "sundowners"],
  wildlife_priorities: ["big-cats", "elephants"],
  duration: "8-10",
  season_preference: "dry-high",
  budget_tier: "luxury",
  source_listing_id: null,
  contact_name: "Test Traveller",
  contact_email: "test@example.com",
  contact_phone: null,
  status: "new",
  assigned_to: null,
  internal_notes: null,
  source_url: null,
  utm: null,
}

const resourceFixture: Resource = {
  slug: "safari-planning-checklist",
  title: "Safari Planning Checklist",
  description: "The checklist we use ourselves.",
  filename: "checklist.pdf",
  storagePath: "downloads/checklist.pdf",
  available: true,
}

describe("Email templates render", () => {
  test("BriefReceivedEmail surfaces greeting + structured summary", async () => {
    const html = await render(<BriefReceivedEmail brief={briefFixture} />)
    expect(html).toContain("Hi Test,")
    expect(html).toContain("48 hours")
    // Structured field labels
    expect(html).toContain("Months")
    expect(html).toContain("Jul, Aug")
    // Label for the pace enum
    expect(html).toContain("Slow")
  })

  test("BriefNotifyEmail includes admin URL and contact email", async () => {
    const html = await render(
      <BriefNotifyEmail
        brief={briefFixture}
        adminUrl="https://example.com/admin/briefs"
      />,
    )
    expect(html).toContain("https://example.com/admin/briefs")
    expect(html).toContain("test@example.com")
    expect(html).toContain("Open in admin")
    // Notes block renders
    expect(html).toContain("Honeymoon")
  })

  test("DownloadConfirmationEmail shows download CTA when signedUrl present", async () => {
    const html = await render(
      <DownloadConfirmationEmail
        firstName="Sarah"
        resource={resourceFixture}
        signedUrl="https://example.com/dl/abc"
        isFirstDownload
      />,
    )
    expect(html).toContain("Hi Sarah,")
    expect(html).toContain("Safari Planning Checklist")
    expect(html).toContain("https://example.com/dl/abc")
    expect(html).toContain("unsubscribe any time")
  })

  test("DownloadConfirmationEmail shows fallback when signedUrl is null", async () => {
    const html = await render(
      <DownloadConfirmationEmail
        firstName={null}
        resource={resourceFixture}
        signedUrl={null}
        isFirstDownload={false}
      />,
    )
    expect(html).toContain("being finalised")
    expect(html).not.toContain("Download Safari Planning Checklist")
  })

  test("ContactAcknowledgementEmail in internal mode shows From + message", async () => {
    const html = await render(
      <ContactAcknowledgementEmail
        name="Sarah K"
        email="sarah@example.com"
        subject="Custom safari for Botswana"
        message="Looking for September walking-led trip."
        internal
      />,
    )
    expect(html).toContain("Sarah K")
    expect(html).toContain("sarah@example.com")
    expect(html).toContain("Custom safari for Botswana")
    expect(html).toContain("walking-led trip")
  })

  test("ContactAcknowledgementEmail user mode greets and confirms", async () => {
    const html = await render(
      <ContactAcknowledgementEmail
        name="Sarah K"
        email="sarah@example.com"
        subject="Custom safari for Botswana"
        message="Looking for September walking-led trip."
      />,
    )
    expect(html).toContain("Hi Sarah,")
    expect(html).toContain("48 hours")
  })

  test("OperatorOutreachFeaturedEmail renders custom questions as bullets", async () => {
    const html = await render(
      <OperatorOutreachFeaturedEmail
        recipientName="Sarah"
        lodgeName="Matetsi Victoria Falls"
        customQuestions={[
          "Are walking safaris part of the offer?",
          "Could you tell us more about the gastronomy programme?",
        ]}
        senderName="Niels van de Meer"
        senderEmail="niels@safarioverland.com"
      />,
    )
    expect(html).toContain("Dear Sarah,")
    expect(html).toContain("Matetsi Victoria Falls")
    expect(html).toContain("Are walking safaris part of the offer?")
    expect(html).toContain("gastronomy programme")
    expect(html).toContain("Niels van de Meer")
    expect(html).toContain("Victoria Falls")
  })

  test("OperatorOutreachFeaturedEmail omits the questions block when empty", async () => {
    const html = await render(
      <OperatorOutreachFeaturedEmail
        recipientName="the team"
        lodgeName="Anywhere Lodge"
        customQuestions={[]}
        senderName="Niels van de Meer"
        senderEmail="niels@safarioverland.com"
      />,
    )
    expect(html).not.toContain("clarifying questions while")
  })

  test("operatorOutreachFeaturedPlainText: sections separated by blank lines, sign-off not glued to bullets", () => {
    const text = operatorOutreachFeaturedPlainText({
      recipientName: "Sarah",
      lodgeName: "Matetsi Victoria Falls",
      customQuestions: [
        "Are walking safaris part of the offer on the concession?",
        "Could you tell us more about the gastronomy programme?",
        "What's the peak total guest capacity across the 16 suites, 2 family suites, and Matetsi River House?",
      ],
      senderName: "Niels van de Meer",
      senderEmail: "niels@safarioverland.com",
    })

    // Opens with the greeting (no logo URL / chrome leakage).
    expect(text.startsWith("Dear Sarah,\n\n")).toBe(true)

    // No html-to-text artefacts.
    expect(text).not.toContain("https://safarioverland.com")
    expect(text).not.toContain("A SHORT NOTE FROM")

    // Sign-off prose lives on its own paragraph — verify there's a
    // blank line immediately before it. The pre-fix bug had the
    // last bullet glued directly to "No commitments…".
    const beforeSignoff = text.split(
      "No commitments either way",
    )[0] as string
    expect(beforeSignoff.endsWith("\n\n")).toBe(true)

    // Each clarifying question appears once, prefixed with the em dash,
    // and the third question survives in full (the pre-fix parser
    // truncated mid-sentence).
    expect(text).toContain(
      "— What's the peak total guest capacity across the 16 suites, 2 family suites, and Matetsi River House?",
    )
    expect(text.match(/No commitments either way/g)?.length).toBe(1)

    // Sign-off lines stack with single line breaks, not blank lines,
    // so the signature reads as a block.
    expect(text).toContain(
      "Niels van de Meer\nSafari Overland · Victoria Falls\nniels@safarioverland.com",
    )
  })

  test("operatorOutreachFeaturedPlainText: omits the questions block when none provided", () => {
    const text = operatorOutreachFeaturedPlainText({
      recipientName: "the team",
      lodgeName: "Anywhere Lodge",
      customQuestions: [],
      senderName: "Niels van de Meer",
      senderEmail: "niels@safarioverland.com",
    })
    expect(text).not.toContain("clarifying questions while")
    // Three asks → No commitments. No question block in between.
    const askIdx = text.indexOf("3. Permission to pull")
    const closingIdx = text.indexOf("No commitments either way")
    expect(askIdx).toBeGreaterThan(0)
    expect(closingIdx).toBeGreaterThan(askIdx)
  })
})
