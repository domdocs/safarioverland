import { Hr } from "@react-email/components"
import type { CSSProperties } from "react"

import { BRAND } from "../../brand"

type Props = {
  style?: CSSProperties
}

/** Hairline separator. Use sparingly — body sections should breathe. */
export function BrandedRule({ style }: Props) {
  return <Hr style={{ ...baseStyle, ...style }} />
}

const baseStyle: CSSProperties = {
  border: "none",
  borderTop: `1px solid ${BRAND.rule}`,
  margin: "32px 0",
}
