"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useDownloadGate } from "./download-gate-provider"
import { useState } from "react"

export type DownloadButtonProps = Omit<ButtonProps, "onClick"> & {
  slug: string
  title: string
  description: string
  label?: string
  showIcon?: boolean
}

export function DownloadButton({
  slug,
  title,
  description,
  label,
  showIcon = true,
  children,
  ...buttonProps
}: DownloadButtonProps) {
  const { request } = useDownloadGate()
  const [busy, setBusy] = useState(false)

  async function handleClick() {
    setBusy(true)
    try {
      await request({ slug, title, description })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Button {...buttonProps} onClick={handleClick} disabled={busy || buttonProps.disabled}>
      {showIcon && <Download className="h-4 w-4 mr-2" />}
      {label ?? children ?? "Download"}
    </Button>
  )
}
