"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import type { Article, ArticleInput } from "@/lib/articles"

const CATEGORIES = [
  "Planning Guides",
  "Safety Tips",
  "Conservation",
  "Seasonal Guides",
  "Wildlife Guides",
  "Cultural Insights",
  "Travel Tips",
  "Equipment Reviews"
]

interface ArticleFormProps {
  article?: Article
  onSubmit: (data: ArticleInput) => Promise<void>
}

export function ArticleForm({ article, onSubmit }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const data: ArticleInput = {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        slug: formData.get("slug") as string,
        content: formData.get("content") as string,
        category: formData.get("category") as string,
        featured_image: formData.get("featured_image") as string || null,
        pdf_url: formData.get("pdf_url") as string || null,
        author: formData.get("author") as string || null,
        meta_description: formData.get("meta_description") as string || null,
        status: formData.get("status") as "draft" | "published",
      }

      await onSubmit(data)
      toast.success("Article saved successfully!")
      router.push("/admin/articles")
    } catch (error) {
      console.error("Error saving article:", error)
      toast.error("Failed to save article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={article?.title}
            required
            placeholder="Enter article title"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            defaultValue={article?.subtitle || ""}
            placeholder="Enter article subtitle (optional)"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={article?.slug}
            required
            placeholder="enter-url-friendly-slug"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={article?.category || CATEGORIES[0]}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={article?.content}
            required
            placeholder="Enter article content (supports markdown)"
            className="min-h-[300px]"
          />
        </div>

        <div>
          <Label htmlFor="featured_image">Featured Image URL</Label>
          <Input
            id="featured_image"
            name="featured_image"
            defaultValue={article?.featured_image || ""}
            placeholder="Enter featured image URL (optional)"
          />
        </div>

        <div>
          <Label htmlFor="pdf_url">PDF URL</Label>
          <Input
            id="pdf_url"
            name="pdf_url"
            defaultValue={article?.pdf_url || ""}
            placeholder="Enter PDF URL (optional)"
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            defaultValue={article?.author || ""}
            placeholder="Enter author name (optional)"
          />
        </div>

        <div>
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            name="meta_description"
            defaultValue={article?.meta_description || ""}
            placeholder="Enter meta description for SEO (optional)"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={article?.status || "draft"}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Article"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
} 