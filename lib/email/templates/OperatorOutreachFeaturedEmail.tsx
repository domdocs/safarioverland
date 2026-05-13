import { Section } from "@react-email/components"

import { Heading } from "./components/Heading"
import { Layout } from "./components/Layout"
import { Paragraph } from "./components/Paragraph"

export type OperatorOutreachFeaturedProps = {
  /** "Sarah", "the Gardiner family", etc. */
  recipientName: string
  /** "Matetsi Victoria Falls" */
  lodgeName: string
  /** 2–3 listing-specific clarifying questions, one per item. */
  customQuestions: string[]
  /** "Niels van de Meer" */
  senderName: string
  /** "niels@safarioverland.com" */
  senderEmail: string
}

/**
 * Hand-rolled plain-text version of the outreach body. Used for the
 * mailto: URL — going through @react-email/render's plainText mode
 * produces unstable output (html-to-text smashes the bullet block into
 * the next paragraph, drops the layout's logo URL into the body, etc).
 *
 * Source of truth for the prose lives in this file alongside the JSX so
 * the two stay in sync.
 */
export function operatorOutreachFeaturedPlainText({
  recipientName,
  lodgeName,
  customQuestions,
  senderName,
  senderEmail,
}: OperatorOutreachFeaturedProps): string {
  const sections: string[] = [
    `Dear ${recipientName},`,
    `We are repositioning safarioverland.com as a small, opinionated collection of African lodges and operators — chosen for what the wild does to you, not just what it shows you. Fewer names than before, but each one written up properly.`,
    `${lodgeName} is staying. We'd like to feature it on our home page rotation, in our planning briefs, and in our Field Notes coverage where it fits.`,
    `Three small asks, only when convenient:`,
    [
      `1. Two or three high-resolution photographs (~3000px wide) we can use across the site. Anything atmospheric — guests on the land at last light, the rooms at dusk, the textures and details.`,
      `2. Fifty words from the owner or founder on what makes a stay different. Written as you'd say it, not as marketing.`,
      `3. Permission to pull two or three traveller quotes from your guest book or testimonials page, with attribution.`,
    ].join("\n\n"),
  ]

  if (customQuestions.length > 0) {
    sections.push(`And a few clarifying questions while we're writing the page:`)
    sections.push(customQuestions.map((q) => `— ${q}`).join("\n"))
  }

  sections.push(
    `No commitments either way; we'll keep the listing live with what we have. But if you have time, the better the source material, the better the page reads.`,
  )
  sections.push(`With thanks,`)
  sections.push(
    [senderName, `Safari Overland · Victoria Falls`, senderEmail].join("\n"),
  )

  return sections.join("\n\n")
}

/**
 * Template A — featured operator outreach. Mirrors the prose in
 * handoff/LISTINGS_AUDIT.md "Template A — featured (kept and going to
 * the home rotation)".
 *
 * Goes out as mailto: so it reads as a personal email from Niels, not
 * a transactional blast. The Layout chrome stays — the from-address is
 * still Safari Overland and an operator clicking through to the site
 * should see a consistent identity.
 */
export function OperatorOutreachFeaturedEmail({
  recipientName,
  lodgeName,
  customQuestions,
  senderName,
  senderEmail,
}: OperatorOutreachFeaturedProps) {
  return (
    <Layout
      preview={`A short note from Safari Overland — ${lodgeName} feature`}
    >
      <Heading>A short note from Safari Overland</Heading>
      <Paragraph>{`Dear ${recipientName},`}</Paragraph>

      <Paragraph muted>
        We are repositioning safarioverland.com as a small, opinionated
        collection of African lodges and operators — chosen for what the
        wild does to you, not just what it shows you. Fewer names than
        before, but each one written up properly.
      </Paragraph>

      <Paragraph>
        {`${lodgeName} is staying. We'd like to feature it on our home page rotation, in our planning briefs, and in our Field Notes coverage where it fits.`}
      </Paragraph>

      <Paragraph>
        Three small asks, only when convenient:
      </Paragraph>
      <Section style={{ paddingLeft: "8px", margin: "0 0 16px" }}>
        <Paragraph>
          1. Two or three high-resolution photographs (~3000px wide) we
          can use across the site. Anything atmospheric — guests on the
          land at last light, the rooms at dusk, the textures and
          details.
        </Paragraph>
        <Paragraph>
          2. Fifty words from the owner or founder on what makes a stay
          different. Written as you&apos;d say it, not as marketing.
        </Paragraph>
        <Paragraph>
          3. Permission to pull two or three traveller quotes from your
          guest book or testimonials page, with attribution.
        </Paragraph>
      </Section>

      {customQuestions.length > 0 ? (
        <>
          <Paragraph>
            And a few clarifying questions while we&apos;re writing the
            page:
          </Paragraph>
          <Section style={{ paddingLeft: "8px", margin: "0 0 16px" }}>
            {customQuestions.map((q, i) => (
              <Paragraph key={i}>— {q}</Paragraph>
            ))}
          </Section>
        </>
      ) : null}

      <Paragraph muted>
        No commitments either way; we&apos;ll keep the listing live with
        what we have. But if you have time, the better the source
        material, the better the page reads.
      </Paragraph>

      <Paragraph>With thanks,</Paragraph>
      <Paragraph style={{ margin: "0 0 4px" }}>{senderName}</Paragraph>
      <Paragraph muted style={{ margin: "0 0 4px" }}>
        Safari Overland · Victoria Falls
      </Paragraph>
      <Paragraph muted style={{ margin: 0 }}>
        {senderEmail}
      </Paragraph>
    </Layout>
  )
}
