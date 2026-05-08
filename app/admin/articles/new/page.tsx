"use client"

import { ArticleForm } from "@/components/article-form"
import type { ArticleInput } from "@/lib/articles"

export default function NewArticlePage() {
  async function handleSubmit(data: ArticleInput) {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(body.message || body.error || `HTTP ${res.status}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New article</h1>
        <p className="text-stone-600 mt-1">
          Long-form content for /admin/articles. Saves to the <code>articles</code> table.
        </p>
      </div>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  )
}
