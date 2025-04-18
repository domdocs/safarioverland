import { getSupabaseServerClient } from "./supabase"

export type Article = {
  id: string
  title: string
  subtitle?: string | null
  slug: string
  content: string
  category: string
  featured_image?: string | null
  pdf_url?: string | null
  author?: string | null
  published_at: string
  updated_at: string
  status: "draft" | "published"
  meta_description?: string | null
  created_at: string
}

export type ArticleInput = Omit<Article, "id" | "created_at" | "updated_at" | "published_at"> & {
  published_at?: string
}

export async function getArticles({ 
  category,
  status = "published",
  limit = 10,
  offset = 0 
}: { 
  category?: string
  status?: "draft" | "published"
  limit?: number
  offset?: number
} = {}) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    console.warn("Supabase client not available")
    return []
  }

  let query = supabase.from("articles").select("*")

  if (status) {
    query = query.eq("status", status)
  }

  if (category) {
    query = query.eq("category", category)
  }

  query = query.order("published_at", { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  return data as Article[]
}

export async function getArticleBySlug(slug: string) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    console.warn("Supabase client not available")
    return null
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching article:", error)
    return null
  }

  return data as Article
}

export async function createArticle(article: ArticleInput) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error("Supabase client not available")
  }

  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Article
}

export async function updateArticle(id: string, article: Partial<ArticleInput>) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error("Supabase client not available")
  }

  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Article
}

export async function deleteArticle(id: string) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error("Supabase client not available")
  }

  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id)

  if (error) {
    throw error
  }
} 