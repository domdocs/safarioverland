import Link from "next/link"

import { getSupabaseServerClient } from "@/lib/supabase"
import { CATEGORY_TABS } from "@/lib/category-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DebugSupabase } from "@/components/debug-supabase"

export const dynamic = "force-dynamic"

type RecentPending = {
  id: string
  listing_name: string
  category: string | null
  country: string | null
  location: string | null
  created_at: string
}

type RecentBrief = {
  id: string
  contact_name: string
  contact_email: string
  status: string
  chapters: string[]
  months: string[]
  created_at: string
}

async function loadStats() {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const [
    approved,
    pending,
    featured,
    newBriefs,
    reviewingBriefs,
    subscribers,
    publishedArticles,
    draftArticles,
    recentPending,
    recentBriefs,
  ] = await Promise.all([
    supabase
      .from("directory_listings")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("directory_listings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("directory_listings")
      .select("id", { count: "exact", head: true })
      .eq("featured", true),
    supabase.from("briefs").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("briefs")
      .select("id", { count: "exact", head: true })
      .eq("status", "reviewing"),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("directory_listings")
      .select("id, listing_name, category, country, location, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("briefs")
      .select("id, contact_name, contact_email, status, chapters, months, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  return {
    counts: {
      approved: approved.count ?? 0,
      pending: pending.count ?? 0,
      featured: featured.count ?? 0,
      newBriefs: newBriefs.count ?? 0,
      reviewingBriefs: reviewingBriefs.count ?? 0,
      subscribers: subscribers.count ?? 0,
      publishedArticles: publishedArticles.count ?? 0,
      draftArticles: draftArticles.count ?? 0,
    },
    recentPending: (recentPending.data ?? []) as RecentPending[],
    recentBriefs: (recentBriefs.data ?? []) as RecentBrief[],
  }
}

export default async function AdminPage() {
  const stats = await loadStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        <p className="text-stone-600 mt-1">
          Live counts from the database. Numbers update on every page load.
        </p>
      </div>

      {!stats ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-stone-600">
              Could not connect to the database. Confirm Supabase environment variables are set.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Kpi label="Listings live" value={stats.counts.approved} href="/admin/listings" />
            <Kpi
              label="Pending review"
              value={stats.counts.pending}
              href="/admin/pending"
              accent={stats.counts.pending > 0}
            />
            <Kpi label="Featured" value={stats.counts.featured} href="/admin/listings" />
            <Kpi label="Categories" value={CATEGORY_TABS.length} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Kpi
              label="New briefs"
              value={stats.counts.newBriefs}
              href="/admin/briefs"
              accent={stats.counts.newBriefs > 0}
            />
            <Kpi label="Reviewing" value={stats.counts.reviewingBriefs} href="/admin/briefs" />
            <Kpi
              label="Subscribers"
              value={stats.counts.subscribers}
              href="/admin/subscribers"
            />
            <Kpi
              label="Articles"
              value={stats.counts.publishedArticles}
              href="/admin/articles"
              hint={
                stats.counts.draftArticles > 0
                  ? `${stats.counts.draftArticles} drafts`
                  : undefined
              }
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent pending listings</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentPending.length === 0 ? (
                  <p className="text-sm text-stone-500">Nothing waiting for review.</p>
                ) : (
                  <ul className="divide-y">
                    {stats.recentPending.map((row) => (
                      <li key={row.id} className="py-3">
                        <Link
                          href={`/admin/listings/edit/${row.id}`}
                          className="block hover:bg-stone-50 -mx-2 px-2 py-1 rounded"
                        >
                          <p className="font-medium text-stone-900">{row.listing_name}</p>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {row.category ?? "—"} · {row.location ?? row.country ?? "—"} ·{" "}
                            {new Date(row.created_at).toLocaleDateString()}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/admin/pending"
                  className="text-xs uppercase tracking-wider text-stone-700 hover:text-stone-900 underline mt-4 inline-block"
                >
                  See all pending →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent briefs</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentBriefs.length === 0 ? (
                  <p className="text-sm text-stone-500">No briefs yet.</p>
                ) : (
                  <ul className="divide-y">
                    {stats.recentBriefs.map((row) => (
                      <li key={row.id} className="py-3">
                        <Link
                          href="/admin/briefs"
                          className="block hover:bg-stone-50 -mx-2 px-2 py-1 rounded"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="font-medium text-stone-900">{row.contact_name}</p>
                            <span className="text-xs uppercase tracking-wider text-stone-500">
                              {row.status}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {row.chapters?.join(", ") || "—"} ·{" "}
                            {row.months?.join(", ") || "—"} ·{" "}
                            {new Date(row.created_at).toLocaleDateString()}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/admin/briefs"
                  className="text-xs uppercase tracking-wider text-stone-700 hover:text-stone-900 underline mt-4 inline-block"
                >
                  See all briefs →
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Database connection</h2>
        <DebugSupabase />
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  href,
  accent,
  hint,
}: {
  label: string
  value: number
  href?: string
  accent?: boolean
  hint?: string
}) {
  const card = (
    <Card className={accent ? "border-amber-300" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-stone-500 font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-3xl font-bold tabular-nums ${
            accent ? "text-amber-700" : "text-stone-900"
          }`}
        >
          {value.toLocaleString()}
        </p>
        {hint && <p className="text-xs text-stone-500 mt-1">{hint}</p>}
      </CardContent>
    </Card>
  )
  return href ? (
    <Link href={href} className="block hover:opacity-90 transition-opacity">
      {card}
    </Link>
  ) : (
    card
  )
}
