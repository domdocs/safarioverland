import { Section } from "@react-email/components"

import {
  BUDGET_TIER_OPTIONS,
  DURATION_OPTIONS,
  INTENT_OPTIONS,
  PACE_OPTIONS,
  QUIET_OPTIONS,
  SEASON_OPTIONS,
  WILDLIFE_OPTIONS,
  labelFor,
} from "@/lib/briefs/options"
import type { Brief } from "@/lib/briefs/types"

import { Field } from "./components/Field"
import { Heading } from "./components/Heading"
import { Layout } from "./components/Layout"
import { Paragraph } from "./components/Paragraph"

type Props = {
  brief: Brief
}

/**
 * Brief confirmation to the user. Replaces the inline-HTML version in
 * lib/briefs/email.ts. Renders the structured intake answers back as a
 * label/value summary so they can see what we received.
 */
export function BriefReceivedEmail({ brief }: Props) {
  const greeting = brief.contact_name?.split(" ")[0] || "there"

  const intentLine =
    brief.intent
      ?.map((v) => labelFor(INTENT_OPTIONS, v))
      .filter(Boolean)
      .join(", ") || null

  const wildlifeLine =
    brief.wildlife_priorities
      ?.map((v) => labelFor(WILDLIFE_OPTIONS, v))
      .filter(Boolean)
      .join(", ") || null

  const quietLine =
    brief.quiet_markers
      ?.map((v) => labelFor(QUIET_OPTIONS, v))
      .filter(Boolean)
      .join(", ") || null

  return (
    <Layout preview="Your brief is in. Three routes within 48 hours.">
      <Heading>Your brief is in.</Heading>
      <Paragraph>{`Hi ${greeting},`}</Paragraph>
      <Paragraph muted>
        Thanks for sending across your trip brief. Here&apos;s what we
        heard:
      </Paragraph>

      <Section style={{ margin: "24px 0" }}>
        <Field label="Months" value={brief.months?.join(", ") || null} />
        <Field label="Trip" value={intentLine} />
        <Field
          label="Rhythm"
          value={labelFor(PACE_OPTIONS, brief.pace) ?? brief.rhythm}
        />
        <Field label="Wildlife / landscape" value={wildlifeLine} />
        <Field label="Quiet markers" value={quietLine} />
        <Field
          label="Duration"
          value={labelFor(DURATION_OPTIONS, brief.duration)}
        />
        <Field
          label="Season"
          value={labelFor(SEASON_OPTIONS, brief.season_preference)}
        />
        <Field
          label="Budget"
          value={
            labelFor(BUDGET_TIER_OPTIONS, brief.budget_tier) ??
            brief.budget_per_person
          }
        />
      </Section>

      <Paragraph>
        A planner will be in touch within 48 hours with three routes at
        different price points. If you remember anything else worth
        knowing, just reply to this email.
      </Paragraph>
    </Layout>
  )
}
