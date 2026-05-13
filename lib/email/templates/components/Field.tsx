import { Row, Column, Text } from "@react-email/components"
import type { CSSProperties } from "react"

import { BRAND, EMAIL_SANS_STACK } from "../../brand"

type Props = {
  label: string
  value: string | null | undefined
}

/**
 * Label + value pair used to render the brief-summary block in brief
 * acknowledgement / planner-notify emails. Uses `<Row>` / `<Column>`
 * which `react-email` translates into Outlook-safe `<table>` markup.
 *
 * Returns `null` when value is empty so consumers can map an arbitrary
 * list and skip blanks without their own filtering.
 */
export function Field({ label, value }: Props) {
  if (!value || !value.trim()) return null
  return (
    <Row style={rowStyle}>
      <Column style={labelCellStyle}>{label}</Column>
      <Column style={valueCellStyle}>{value}</Column>
    </Row>
  )
}

const rowStyle: CSSProperties = {
  marginBottom: "12px",
}

const labelCellStyle: CSSProperties = {
  width: "140px",
  verticalAlign: "top",
  fontFamily: EMAIL_SANS_STACK,
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: BRAND.boneMute,
  paddingRight: "16px",
}

const valueCellStyle: CSSProperties = {
  verticalAlign: "top",
  fontFamily: EMAIL_SANS_STACK,
  fontSize: "15px",
  lineHeight: "1.5",
  color: BRAND.bone,
}
