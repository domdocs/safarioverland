import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Dashboard | Safari Overland",
  description: "Manage your Safari Overland account and listings",
}

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your Safari Overland dashboard</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium">Your Listings</h3>
              <p className="text-sm text-muted-foreground">Manage your safari listings and services</p>
              <p className="mt-4 text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium">Messages</h3>
              <p className="text-sm text-muted-foreground">View and respond to customer inquiries</p>
              <p className="mt-4 text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium">Analytics</h3>
              <p className="text-sm text-muted-foreground">View your listing performance</p>
              <p className="mt-4 text-2xl font-bold">-</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-medium">Account Information</h3>
            <p className="text-sm text-muted-foreground">
              This is a placeholder for user account information that will be populated once connected to Supabase.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
