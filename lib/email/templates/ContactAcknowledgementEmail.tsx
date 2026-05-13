import { Section } from "@react-email/components"

import { BRAND } from "../brand"
import { Field } from "./components/Field"
import { Heading } from "./components/Heading"
import { Layout } from "./components/Layout"
import { Paragraph } from "./components/Paragraph"

type Props = {
  /** The form data captured. */
  name: string
  email: string
  subject: string
  message: string
  /** When true, this is the admin-facing notification. */
  internal?: boolean
}

/**
 * Single component covering both sides of the contact-form fan-out:
 *   - internal=true: the planner-inbox notification
 *   - internal=false: the acknowledgement to the user
 *
 * The pre-React-Email code only sent the internal notification — the
 * user acknowledgement is a small enhancement worth folding in while
 * we're here.
 */
export function ContactAcknowledgementEmail({
  name,
  email,
  subject,
  message,
  internal = false,
}: Props) {
  if (internal) {
    return (
      <Layout preview={`Contact form — ${name}: ${subject}`}>
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
          Contact form
        </Paragraph>
        <Heading>{subject}</Heading>

        <Section style={{ margin: "24px 0" }}>
          <Field label="From" value={`${name} <${email}>`} />
        </Section>

        <Section
          style={{
            margin: "16px 0",
            padding: "16px",
            borderLeft: `3px solid ${BRAND.amber}`,
            backgroundColor: "rgba(214,162,74,0.05)",
          }}
        >
          <Paragraph style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {message}
          </Paragraph>
        </Section>
      </Layout>
    )
  }

  const greeting = name.split(" ")[0] || "there"
  return (
    <Layout preview="Thanks — we'll come back to you within 48 hours.">
      <Heading>Thanks for writing.</Heading>
      <Paragraph>{`Hi ${greeting},`}</Paragraph>
      <Paragraph muted>
        {`We've received your note about “${subject}” and someone will come back to you within 48 hours. If it's urgent, reply to this email and it'll land in the planner inbox.`}
      </Paragraph>
    </Layout>
  )
}
