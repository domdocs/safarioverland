import { Button } from "@react-email/components"
import type { CSSProperties } from "react"

import { BRAND, EMAIL_SANS_STACK } from "../../brand"

type Props = {
  href: string
  children: string
  style?: CSSProperties
}

/** Amber-on-night CTA. Inline styles only — Outlook reads these. */
export function BrandedButton({ href, children, style }: Props) {
  return (
    <Button href={href} style={{ ...baseStyle, ...style }}>
      {children}
    </Button>
  )
}

const baseStyle: CSSProperties = {
  backgroundColor: BRAND.amber,
  color: BRAND.night,
  padding: "14px 28px",
  fontFamily: EMAIL_SANS_STACK,
  fontSize: "13px",
  fontWeight: 500,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  textDecoration: "none",
  display: "inline-block",
}
