import { getSupabaseServerClient } from "./supabase"

/**
 * Article — admin-managed long-form content.
 *
 * Schema matches supabase/migrations/20260509_create_articles_and_app_settings.sql.
 * For file-based MDX guides see app/resources/* — those live in code.
 */

export type ArticleStatus = "draft" | "published" | "archived"

export type Article = {
  id: string
  slug: string
  title: string
  category: string | null
  status: ArticleStatus
  hero_image: string | null
  excerpt: string | null
  body_md: string | null
  read_minutes: number | null
  author_name: string | null
  related_listing_ids: string[] | null
  published_at: string | null
  created_at: string
  updated_at: string
}

/** Shape accepted by create + update helpers. All optional except slug + title. */
export type ArticleInput = {
  slug: string
  title: string
  category?: string | null
  status?: ArticleStatus
  hero_image?: string | null
  excerpt?: string | null
  body_md?: string | null
  read_minutes?: number | null
  author_name?: string | null
  related_listing_ids?: string[] | null
  published_at?: string | null
}

export const ARTICLE_CATEGORIES = [
  "planning",
  "safety",
  "conservation",
  "seasonal",
  "travellers",
  "wildlife",
  "culture",
  "gear",
] as const

// ─── Reads ──────────────────────────────────────────────────────────────

export async function getArticles({
  category,
  status,
  limit = 50,
  offset = 0,
}: {
  category?: string
  status?: ArticleStatus | "all"
  limit?: number
  offset?: number
} = {}): Promise<Article[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    console.warn("Supabase client not available")
    return []
  }

  let query = supabase.from("articles").select("*")

  if (status && status !== "all") {
    query = query.eq("status", status)
  }
  if (category) {
    query = query.eq("category", category)
  }

  query = query
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }
  return (data ?? []) as Article[]
}

export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching article by id:", error)
  }
  return (data ?? null) as Article | null
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching article by slug:", error)
  }
  return (data ?? null) as Article | null
}

// ─── Writes (server-only — service role bypasses RLS) ───────────────────

export async function createArticle(article: ArticleInput): Promise<Article> {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase client not available")

  const payload: ArticleInput = {
    ...article,
    // If publishing for the first time without an explicit timestamp,
    // stamp it. Otherwise leave as-is.
    published_at:
      article.status === "published" && !article.published_at
        ? new Date().toISOString()
        : article.published_at ?? null,
  }

  const { data, error } = await supabase
    .from("articles")
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error("Error creating article:", error)
    throw error
  }
  return data as Article
}

export async function updateArticle(
  id: string,
  patch: Partial<ArticleInput>,
): Promise<Article> {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase client not available")

  // If transitioning to "published" without an explicit timestamp, set one.
  let nextPatch = { ...patch }
  if (patch.status === "published" && !patch.published_at) {
    const existing = await getArticleById(id)
    if (existing && !existing.published_at) {
      nextPatch.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .update(nextPatch)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating article:", error)
    throw error
  }
  return data as Article
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = getSupabaseServerClient()
  if (!supabase) throw new Error("Supabase client not available")

  const { error } = await supabase.from("articles").delete().eq("id", id)
  if (error) {
    console.error("Error deleting article:", error)
    throw error
  }
}
