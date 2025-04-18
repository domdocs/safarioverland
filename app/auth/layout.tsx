"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
} 