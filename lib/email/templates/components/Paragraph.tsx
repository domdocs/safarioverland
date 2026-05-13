import { Text } from "@react-email/components"
import type { CSSProperties, ReactNode } from "react"

import { BRAND, EMAIL_SANS_STACK } from "../../brand"

type Props = {
  children: ReactNode
  /** Use the muted bone for ledes and meta lines. */
  muted?: boolean
  style?: CSSProperties
}

export function Paragraph({ children, muted = false, style }: Props) {
  return (
    <Text
      style={{
        ...baseStyle,
        color: muted ? BRAND.boneMute : BRAND.bone,
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

const baseStyle: CSSProperties = {
  fontFamily: EMAIL_SANS_STACK,
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
}
