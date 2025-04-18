"use client"

import { notFound } from "next/navigation"
import { getArticleBySlug, updateArticle, type Article, type ArticleInput } from "@/lib/articles"
import { ArticleForm } from "@/components/article-form"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const article = await getArticleBySlug(params.id)

  if (!article) {
    notFound()
  }

  // We know article is not null here because of the notFound() check above
  const articleData: Article = article

  async function handleSubmit(data: ArticleInput) {
    await updateArticle(articleData.id, data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <ArticleForm article={articleData} onSubmit={handleSubmit} />
    </div>
  )
} 