import type React from "react"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs"

export const metadata: Metadata = {
  // Use `absolute` so the root template ("%s | Safari Overland") doesn't
  // double the brand name — "Safari Overland" already appears in this title.
  title: {
    absolute:
      "About Safari Overland — A Curated African Safari Collection from Victoria Falls",
  },
  description:
    "Meet Safari Overland — a small, editor-led African safari collection written from Victoria Falls. Our criteria, our editor, our funding model. Honest, in writing.",
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
