import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs"

export const metadata: Metadata = {
  title: "About",
  description:
    "Safari Overland plans and books lodge-based self-drive safaris in southern Africa, from Victoria Falls. Operators never pay to be listed.",
  alternates: { canonical: "https://safarioverland.com/about" },
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
