import type React from "react"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

/**
 * Pages here render their own breadcrumbs (with real titles) and
 * BreadcrumbList JSON-LD, so there's no AutoBreadcrumbs in this layout.
 */
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  )
}
