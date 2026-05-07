import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

export const metadata: Metadata = {
  title: "Atlas | Safari Overland",
  description: "Explore safari destinations across Africa.",
}

export default function DestinationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  )
}
