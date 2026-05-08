import { NextResponse } from "next/server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { CATEGORY_TABS } from "@/lib/category-tabs"

export const dynamic = "force-dynamic"

/**
 * GET /api/admin/stats
 *
 * Aggregated counts powering the /admin dashboard tiles + recent-activity
 * panel. Fans out parallel HEAD/COUNT queries against each table; cheap
 * even at scale because no row data is fetched.
 *
 * Admin-gated by middleware.ts (HTTP basic auth on /api/admin/*).
 */
export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "server_unavailable" }, { status: 503 })
  }

  const [
    approvedListings,
    pendingListings,
    featuredListings,
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
      .select("id, contact_name, contact_email, status, created_at, chapters, months")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  return NextResponse.json({
    counts: {
      approved_listings: approvedListings.count ?? 0,
      pending_listings: pendingListings.count ?? 0,
      featured_listings: featuredListings.count ?? 0,
      new_briefs: newBriefs.count ?? 0,
      reviewing_briefs: reviewingBriefs.count ?? 0,
      subscribers: subscribers.count ?? 0,
      published_articles: publishedArticles.count ?? 0,
      draft_articles: draftArticles.count ?? 0,
      categories: CATEGORY_TABS.length,
    },
    recent: {
      pending_listings: recentPending.data ?? [],
      briefs: recentBriefs.data ?? [],
    },
  })
}
