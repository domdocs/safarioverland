import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

export const metadata: Metadata = {
  title: "About | Safari Overland",
  description: "About Safari Overland — a directory written from the bush, headquartered in Victoria Falls.",
}

export default function AboutLayout({
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
