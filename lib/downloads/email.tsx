import { DownloadConfirmationEmail } from "@/lib/email/templates/DownloadConfirmationEmail"
import { renderEmail } from "@/lib/email/render"
import { fromAddress, send, type SendResult } from "@/lib/email/send"

import type { Resource } from "./resources"

/**
 * Welcome / fulfilment email for gated downloads. The pre-React-Email
 * version assembled HTML by hand in this module; now the template lives
 * in lib/email/templates/DownloadConfirmationEmail.tsx and this module
 * is the thin sender.
 */
export async function sendDownloadEmail(args: {
  to: string
  firstName?: string | null
  resource: Resource
  signedUrl: string | null
  isFirstDownload: boolean
}): Promise<SendResult> {
  const subject = args.isFirstDownload
    ? `Your ${args.resource.title} — and welcome to Safari Overland`
    : `Your ${args.resource.title}`

  const { html, text } = await renderEmail(
    <DownloadConfirmationEmail
      firstName={args.firstName}
      resource={args.resource}
      signedUrl={args.signedUrl}
      isFirstDownload={args.isFirstDownload}
    />,
  )

  return send({
    from: fromAddress(),
    to: args.to,
    subject,
    html,
    text,
  })
}
