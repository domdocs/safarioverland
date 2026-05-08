"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent flash of content before client-side hydration
  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <div className="flex-1 flex items-center justify-center container py-24">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <EditorialFooter />
    </div>
  )
}
