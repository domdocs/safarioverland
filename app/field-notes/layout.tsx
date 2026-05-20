import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs"
import { AutoArticleMeta } from "@/components/AutoArticleMeta"

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Long-form planning, conservation and seasonal field notes from across Africa.",
  alternates: { canonical: "https://safarioverland.com/field-notes" },
}

export default function ResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <AutoBreadcrumbs />
      <div className="container mx-auto px-4">
        <AutoArticleMeta />
      </div>
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  )
}
