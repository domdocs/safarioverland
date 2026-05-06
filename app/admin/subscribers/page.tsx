import { getSupabaseServerClient } from "@/lib/supabase"
import { RESOURCES } from "@/lib/downloads/resources"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

type SubscriberRow = {
  id: string
  email: string
  first_name: string | null
  marketing_consent: boolean
  unsubscribed_at: string | null
  source_resource: string | null
  download_count: number
  last_download_at: string | null
  created_at: string
}

type ResourceCount = {
  resource_slug: string
  count: number
}

async function loadData() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const [subsResult, eventsResult] = await Promise.all([
    supabase
      .from("subscribers")
      .select(
        "id, email, first_name, marketing_consent, unsubscribed_at, source_resource, download_count, last_download_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(500),
    supabase.from("download_events").select("resource_slug"),
  ])

  const subscribers: SubscriberRow[] = subsResult.data ?? []
  const events: { resource_slug: string }[] = eventsResult.data ?? []

  const counts = new Map<string, number>()
  for (const e of events) counts.set(e.resource_slug, (counts.get(e.resource_slug) ?? 0) + 1)
  const resourceCounts: ResourceCount[] = Array.from(counts.entries())
    .map(([slug, count]) => ({ resource_slug: slug, count }))
    .sort((a, b) => b.count - a.count)

  const totalSubscribers = subscribers.length
  const consented = subscribers.filter((s) => s.marketing_consent && !s.unsubscribed_at).length
  const totalDownloads = events.length

  return { subscribers, resourceCounts, totalSubscribers, consented, totalDownloads }
}

export default async function AdminSubscribersPage() {
  const data = await loadData()

  if (!data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Subscribers</h1>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Could not connect to the database. Confirm Supabase environment variables are set.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Subscribers</h1>
          <p className="text-muted-foreground mt-1">Email captures from the gated download workflow.</p>
        </div>
        <Button asChild>
          <a href="/api/admin/subscribers/export">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Total subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.totalSubscribers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Marketing-opted-in</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.consented.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Total downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.totalDownloads.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Downloads by resource</CardTitle>
        </CardHeader>
        <CardContent>
          {data.resourceCounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No downloads yet.</p>
          ) : (
            <ul className="divide-y">
              {data.resourceCounts.map((rc) => {
                const resource = RESOURCES[rc.resource_slug]
                return (
                  <li key={rc.resource_slug} className="flex items-center justify-between py-2 text-sm">
                    <span className="font-medium">{resource?.title ?? rc.resource_slug}</span>
                    <span className="text-muted-foreground tabular-nums">{rc.count}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent subscribers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Email</th>
                  <th className="text-left px-4 py-2 font-medium">Name</th>
                  <th className="text-left px-4 py-2 font-medium">First resource</th>
                  <th className="text-left px-4 py-2 font-medium">Downloads</th>
                  <th className="text-left px-4 py-2 font-medium">Marketing</th>
                  <th className="text-left px-4 py-2 font-medium">Captured</th>
                </tr>
              </thead>
              <tbody>
                {data.subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                      No subscribers yet.
                    </td>
                  </tr>
                ) : (
                  data.subscribers.map((s) => {
                    const sourceTitle =
                      (s.source_resource && RESOURCES[s.source_resource]?.title) || s.source_resource || "—"
                    const status = s.unsubscribed_at
                      ? "Unsubscribed"
                      : s.marketing_consent
                        ? "Opted in"
                        : "Transactional only"
                    return (
                      <tr key={s.id} className="border-t">
                        <td className="px-4 py-2">{s.email}</td>
                        <td className="px-4 py-2">{s.first_name ?? "—"}</td>
                        <td className="px-4 py-2 text-muted-foreground">{sourceTitle}</td>
                        <td className="px-4 py-2 tabular-nums">{s.download_count}</td>
                        <td className="px-4 py-2 text-muted-foreground">{status}</td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing the most recent 500 subscribers. Use{" "}
        <Link href="/api/admin/subscribers/export" className="underline">
          CSV export
        </Link>{" "}
        for the full list.
      </p>
    </div>
  )
}
