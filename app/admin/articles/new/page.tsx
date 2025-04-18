"use client"

import { createArticle, type ArticleInput } from "@/lib/articles"
import { ArticleForm } from "@/components/article-form"

export default function NewArticlePage() {
  async function handleSubmit(data: ArticleInput) {
    await createArticle(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Article</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  )
} 