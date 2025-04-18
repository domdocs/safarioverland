"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArticleForm } from "@/components/article-form"
import type { Article, ArticleInput } from "@/lib/articles"

// Mock data for development
const mockArticles = {
  "1": {
    id: "1",
    title: "Safari Planning Guide",
    subtitle: "Essential tips for planning your African safari",
    slug: "safari-planning-guide",
    content: "This is a comprehensive guide to planning your safari...",
    category: "Planning Guides",
    status: "draft",
    images: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  "2": {
    id: "2",
    title: "Wildlife Photography Tips",
    subtitle: "Capture amazing wildlife moments",
    slug: "wildlife-photography-tips",
    content: "Learn how to take stunning wildlife photographs...",
    category: "Travel Tips",
    status: "published",
    images: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  }
} as Record<string, Article>

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter()
  const article = mockArticles[params.id]

  useEffect(() => {
    if (!article) {
      router.push("/admin/articles")
    }
  }, [article, router])

  if (!article) {
    return null
  }

  async function handleSubmit(data: ArticleInput) {
    // For now, just log the update
    console.log("Updating article:", data)
    router.push("/admin/articles")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      <ArticleForm article={article} onSubmit={handleSubmit} />
    </div>
  )
} 