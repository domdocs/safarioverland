import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Safari Overland — a small, opinionated collection of African lodges and operators, chosen for what the wild does to you, not just what it shows you.",
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <AutoBreadcrumbs />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  )
}
