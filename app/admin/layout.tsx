import type React from "react"
import Link from "next/link"
import { Header } from "@/components/header"

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/briefs", label: "Briefs" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/listings", label: "Manage Listings" },
  { href: "/admin/pending", label: "Pending Approvals" },
  { href: "/admin/listings/import", label: "Import records" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/settings", label: "Settings" },
] as const

/**
 * Admin layout — wrapped in `.light` per the locked design decision.
 * The CSS variables in app/globals.css `.light` block flip --background,
 * --foreground, --card and --primary to a warm-bone / near-black scheme,
 * so admin reads as a back-office tool rather than the cinematic dark site.
 *
 * Marketing site Header is retained at the top — useful for "go back to
 * the public site" navigation.
 *
 * No footer: the sidebar nav covers wayfinding, and admin pages don't
 * benefit from the public footer's Categories / Regions / Field Notes
 * link columns or "Connecting travelers" marketing copy.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="light bg-background text-foreground flex-1">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
            <aside className="space-y-4 rounded-md border border-border bg-card p-4 shadow-sm">
              <h2 className="text-lg font-semibold tracking-tight">Admin</h2>
              <nav className="space-y-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>
            <main className="min-h-[50vh]">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}
