import { Section } from "@react-email/components"

import type { Resource } from "@/lib/downloads/resources"

import { BRAND } from "../brand"
import { BrandedButton } from "./components/BrandedButton"
import { Heading } from "./components/Heading"
import { Layout } from "./components/Layout"
import { Paragraph } from "./components/Paragraph"

type Props = {
  firstName?: string | null
  resource: Resource
  signedUrl: string | null
  isFirstDownload: boolean
}

export function DownloadConfirmationEmail({
  firstName,
  resource,
  signedUrl,
  isFirstDownload,
}: Props) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,"
  const preview = signedUrl
    ? `Your ${resource.title} is ready to download.`
    : `Your ${resource.title} is being finalised — we'll email it shortly.`

  return (
    <Layout preview={preview} showUnsubscribe>
      <Heading>{resource.title}</Heading>
      <Paragraph muted>{resource.description}</Paragraph>
      <Paragraph>{greeting}</Paragraph>

      {signedUrl ? (
        <>
          <Paragraph muted>
            You can download your copy here (link expires in 1 hour):
          </Paragraph>
          <Section style={{ margin: "24px 0" }}>
            <BrandedButton href={signedUrl}>
              {`Download ${resource.title}`}
            </BrandedButton>
          </Section>
          <Paragraph
            muted
            style={{ fontSize: "12px", wordBreak: "break-all" }}
          >
            If the button doesn&apos;t work, paste this link into your
            browser:
            <br />
            <span style={{ color: BRAND.bone }}>{signedUrl}</span>
          </Paragraph>
        </>
      ) : (
        <Paragraph>
          The {resource.title} is being finalised — we&apos;ll email it the
          moment it&apos;s ready. Thanks for your patience.
        </Paragraph>
      )}

      {isFirstDownload ? (
        <Paragraph muted>
          You&apos;ll occasionally hear from us with new planning
          resources, seasonal tips and operator recommendations. You can
          unsubscribe any time.
        </Paragraph>
      ) : null}
    </Layout>
  )
}
