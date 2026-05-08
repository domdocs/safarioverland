import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"

export const metadata: Metadata = {
  title: "Dashboard | Safari Overland",
  description: "Manage your Safari Overland account and listings.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mb-12 max-w-3xl">
          <Eyebrow withRule>Your account</Eyebrow>
          <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
            Dashboard.
          </h1>
          <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute leading-snug">
            Welcome to your Safari Overland account.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Your listings", body: "Manage your safari listings and services.", value: "0" },
            { label: "Messages", body: "View and respond to customer inquiries.", value: "0" },
            { label: "Analytics", body: "View your listing performance.", value: "—" },
          ].map((tile) => (
            <div key={tile.label} className="border border-rule bg-card p-6">
              <p className="eyebrow mb-2">{tile.label}</p>
              <p className="font-serif text-display-fluid text-amber tabular-nums leading-none">
                {tile.value}
              </p>
              <p className="mt-3 text-bone-mute leading-relaxed">{tile.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-rule p-6 max-w-3xl">
          <p className="eyebrow mb-3">Account information</p>
          <p className="text-bone-mute leading-relaxed">
            Account details will appear here once your profile is connected. Until then,
            head over to the directory or open a planning brief.
          </p>
        </div>
      </main>
      <EditorialFooter />
    </div>
  )
}
