import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex-1 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
          <aside className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <nav className="space-y-2">
              <Link
                href="/admin"
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Overview
              </Link>
              <Link
                href="/admin/listings"
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Manage Listings
              </Link>
              <Link
                href="/admin/pending"
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Pending Approvals
              </Link>
              <Link
                href="/admin/settings"
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Settings
              </Link>
            </nav>
          </aside>
          <main className="min-h-[50vh]">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
