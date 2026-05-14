"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { ArticleForm } from "@/components/article-form"
import type { Article, ArticleInput } from "@/lib/articles"

interface EditArticlePageProps {
  params: Promise<{ id: string }>
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!id) return
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/articles/${id}`, { cache: "no-store" })
        if (res.status === 404) {
          if (!cancelled) {
            setError("Not found")
            setLoading(false)
            router.replace("/admin/articles")
          }
          return
        }
        const body = await res.json()
        if (!res.ok) throw new Error(body.message || body.error || `HTTP ${res.status}`)
        if (!cancelled) {
          setArticle(body.article)
          setLoading(false)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load article")
          setLoading(false)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, router])

  async function handleSubmit(data: ArticleInput) {
    if (!id) return
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(body.message || body.error || `HTTP ${res.status}`)
    }
  }

  async function handleDelete() {
    if (!id) return
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(body.message || body.error || `HTTP ${res.status}`)
    }
  }

  if (loading) {
    return <div className="text-stone-500">Loading…</div>
  }
  if (error || !article) {
    return (
      <div className="text-red-700 bg-red-50 border border-red-200 rounded p-4">
        {error || "Article not found"}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit article</h1>
        <p className="text-stone-600 mt-1">
          /{article.slug} ·{" "}
          <span className="uppercase tracking-wider text-xs">{article.status}</span>
        </p>
      </div>
      <ArticleForm article={article} onSubmit={handleSubmit} onDelete={handleDelete} />
    </div>
  )
}
