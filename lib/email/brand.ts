/**
 * Brand tokens duplicated as plain hex strings.
 *
 * Email clients don't reliably support CSS custom properties — the same
 * values that live as `--night` / `--bone` / `--amber` in app/globals.css
 * are repeated here so React Email templates can inline them.
 *
 * If the public site palette ever changes, update both places.
 */

export const BRAND = {
  night: "#0E110F",
  ink: "#161A18",
  bone: "#EDE7D8",
  boneMute: "#B2AD9F",
  amber: "#D6A24A",
  amberDeep: "#B8862D",
  rule: "#2A2F2B",
  flame: "#C4582A",
} as const

export const SITE = {
  name: "Safari Overland",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safarioverland.com",
  tagline: "A small collection of African safaris, by hand.",
  address: "Victoria Falls, Zimbabwe",
  fromAddress: process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev",
  logoHorizontal: () =>
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://safarioverland.com"}/images/logo/safari-overland-horizontal-600.png`,
} as const

export const EMAIL_FONT_STACK =
  '"Iowan Old Style", "Apple Garamond", Georgia, "Times New Roman", serif'
export const EMAIL_SANS_STACK =
  "system-ui, -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
