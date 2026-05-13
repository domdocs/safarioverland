import { render as reactEmailRender } from "@react-email/render"
import type { ReactElement } from "react"

/**
 * Thin wrapper around `@react-email/render` that exposes both the HTML
 * and a plain-text version of a template — the plain-text output is the
 * mailto-body shape and is also a good fallback for clients that strip
 * HTML.
 *
 * Keep this the only consumer of `@react-email/render` so we have one
 * place to swap the renderer if the dep ever changes shape.
 */
export async function renderEmail(
  element: ReactElement,
): Promise<{ html: string; text: string }> {
  const [html, text] = await Promise.all([
    reactEmailRender(element),
    reactEmailRender(element, { plainText: true }),
  ])
  return { html, text }
}

/** HTML only — for senders that don't care about the plain-text part. */
export async function renderEmailHtml(element: ReactElement): Promise<string> {
  return reactEmailRender(element)
}

/** Plain text only — used by the outreach mailto-body builder. */
export async function renderEmailText(element: ReactElement): Promise<string> {
  return reactEmailRender(element, { plainText: true })
}
