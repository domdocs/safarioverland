import { Link, Section } from "@react-email/components"

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

import { BRAND } from "../brand"
import { BrandedButton } from "./components/BrandedButton"
import { Field } from "./components/Field"
import { Heading } from "./components/Heading"
import { Layout } from "./components/Layout"
import { Paragraph } from "./components/Paragraph"

type Props = {
  brief: Brief
  adminUrl: string
}

/**
 * Internal notification to the planner inbox. CTA links straight to the
 * admin brief view so triage is one click.
 */
export function BriefNotifyEmail({ brief, adminUrl }: Props) {
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
    <Layout preview={`New brief — ${brief.contact_name}`}>
      <Paragraph
        muted
        style={{
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: BRAND.amber,
          marginBottom: "8px",
        }}
      >
        New brief — Trip Builder
      </Paragraph>
      <Heading>{brief.contact_name}</Heading>

      <Section style={{ margin: "24px 0" }}>
        <Field
          label="From"
          value={`${brief.contact_name} <${brief.contact_email}>`}
        />
        <Field label="Phone" value={brief.contact_phone} />
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

      {brief.notes ? (
        <Section
          style={{
            margin: "24px 0",
            padding: "16px",
            backgroundColor: "rgba(214,162,74,0.08)",
            borderLeft: `3px solid ${BRAND.amber}`,
          }}
        >
          <Paragraph
            muted
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Notes
          </Paragraph>
          <Paragraph style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {brief.notes}
          </Paragraph>
        </Section>
      ) : null}

      <Section style={{ margin: "32px 0" }}>
        <BrandedButton href={adminUrl}>Open in admin</BrandedButton>
      </Section>
      <Paragraph muted style={{ fontSize: "12px" }}>
        <Link href={adminUrl} style={{ color: BRAND.boneMute }}>
          {adminUrl}
        </Link>
      </Paragraph>
    </Layout>
  )
}
