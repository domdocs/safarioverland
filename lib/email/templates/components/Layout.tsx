import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { ReactNode } from "react"

import { BRAND, EMAIL_SANS_STACK, SITE } from "../../brand"

type Props = {
  preview: string
  children: ReactNode
  /** Show the unsubscribe link in the footer. Suppress on transactional. */
  showUnsubscribe?: boolean
}

/**
 * Shared wrapper for every Safari Overland email. Establishes the
 * brand palette, the header lockup, and a consistent footer.
 *
 * All styles inline — email clients are inconsistent about CSS support
 * and css-in-js with media queries breaks at Outlook anyway. Inline
 * styles in JSX render to the right shape via @react-email/components.
 */
export function Layout({ preview, children, showUnsubscribe = false }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Link href={SITE.url} style={{ textDecoration: "none" }}>
              <Img
                src={SITE.logoHorizontal()}
                alt={SITE.name}
                width="220"
                height="44"
                style={{ display: "block" }}
              />
            </Link>
          </Section>

          {/* Body */}
          <Section style={contentStyle}>{children}</Section>

          {/* Footer */}
          <Hr style={ruleStyle} />
          <Section style={footerStyle}>
            <Text style={footerLine}>
              {SITE.name} · {SITE.address}
            </Text>
            <Text style={footerLine}>
              <Link href={`${SITE.url}/privacy-policy`} style={footerLink}>
                Privacy
              </Link>
              {" · "}
              <Link href={`${SITE.url}/contact`} style={footerLink}>
                Contact
              </Link>
              {showUnsubscribe ? (
                <>
                  {" · "}
                  <Link
                    href={`${SITE.url}/unsubscribe`}
                    style={footerLink}
                  >
                    Unsubscribe
                  </Link>
                </>
              ) : null}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const bodyStyle = {
  backgroundColor: BRAND.night,
  margin: 0,
  padding: "32px 16px",
  fontFamily: EMAIL_SANS_STACK,
  color: BRAND.bone,
} as const

const containerStyle = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: BRAND.ink,
  padding: "0",
} as const

const headerStyle = {
  padding: "32px 32px 24px",
  borderBottom: `1px solid ${BRAND.rule}`,
} as const

const contentStyle = {
  padding: "32px",
} as const

const ruleStyle = {
  border: "none",
  borderTop: `1px solid ${BRAND.rule}`,
  margin: 0,
} as const

const footerStyle = {
  padding: "24px 32px",
} as const

const footerLine = {
  margin: "4px 0",
  fontSize: "12px",
  color: BRAND.boneMute,
  lineHeight: "1.5",
} as const

const footerLink = {
  color: BRAND.boneMute,
  textDecoration: "underline",
} as const
