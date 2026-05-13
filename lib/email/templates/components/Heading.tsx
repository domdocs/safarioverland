import { Heading as REHeading } from "@react-email/components"
import type { CSSProperties, ReactNode } from "react"

import { BRAND, EMAIL_FONT_STACK } from "../../brand"

type Props = {
  children: ReactNode
  as?: "h1" | "h2" | "h3"
  style?: CSSProperties
}

/**
 * Serif heading in the editorial register. Defaults to h2 — h1 is the
 * email subject line, which is set elsewhere.
 */
export function Heading({ children, as = "h2", style }: Props) {
  const sizes = {
    h1: { fontSize: "32px", lineHeight: "1.1" },
    h2: { fontSize: "24px", lineHeight: "1.2" },
    h3: { fontSize: "18px", lineHeight: "1.3" },
  } as const
  return (
    <REHeading
      as={as}
      style={{
        ...baseStyle,
        ...sizes[as],
        ...style,
      }}
    >
      {children}
    </REHeading>
  )
}

const baseStyle: CSSProperties = {
  fontFamily: EMAIL_FONT_STACK,
  color: BRAND.bone,
  margin: "0 0 16px 0",
  fontWeight: 400,
  letterSpacing: "-0.01em",
}
