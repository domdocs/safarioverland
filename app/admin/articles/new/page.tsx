"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

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

export default function NewArticlePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const articleData = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        content: formData.get("content") as string,
        category: formData.get("category") as string,
        status: "draft"
      }

      // For now, just log the data and show success
      console.log('Article data:', articleData)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Article</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Enter article title"
          />
        </div>

        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            name="slug"
            required
            placeholder="enter-url-friendly-slug"
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue={CATEGORIES[0]}>
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
            required
            placeholder="Enter article content (supports markdown)"
            className="min-h-[300px]"
          />
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
    </div>
  )
} 