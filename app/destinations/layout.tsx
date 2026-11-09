import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs"
import { BreadcrumbsJsonLd } from "@/components/JsonLd/BreadcrumbsJsonLd"

export const metadata: Metadata = {
  title: "Southern Africa",
  description: "Self-drive safaris through southern Africa.",
  alternates: { canonical: "https://safarioverland.com/destinations/southern-africa" },
}

// Southern Africa is the only region since the self-drive relaunch, and
// /destinations itself redirects to it (next.config.mjs). A fixed trail
// avoids the auto-generated "Atlas" crumb pointing at that redirect.
const CRUMBS: Crumb[] = [
  { name: "Home", href: "/", item: "https://safarioverland.com" },
  { name: "Southern Africa" },
]

export default function DestinationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs crumbs={CRUMBS} />
        <BreadcrumbsJsonLd crumbs={CRUMBS} />
      </div>
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  )
}
