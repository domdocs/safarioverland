"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleInput,
  type ArticleStatus,
  type ImageAttribution,
} from "@/lib/articles"
import { SingleImageUpload } from "@/components/admin/single-image-upload"

interface ArticleFormProps {
  article?: Article
  onSubmit: (data: ArticleInput) => Promise<void>
  /** Optional callback for the Delete button. Hidden if not provided. */
  onDelete?: () => Promise<void>
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function ArticleForm({ article, onSubmit, onDelete }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [title, setTitle] = useState(article?.title ?? "")
  const [slug, setSlug] = useState(article?.slug ?? "")
  const [slugDirty, setSlugDirty] = useState(!!article?.slug)
  // Hero image is state-controlled so the uploader and the manual URL
  // override can both write to the same field, and so the "Remove"
  // action in the uploader clears the form correctly.
  const [heroImage, setHeroImage] = useState(article?.hero_image ?? "")
  const existingCredit =
    (article?.image_attribution as ImageAttribution | null | undefined)?.hero
      ?.credit ?? ""
  const [imageCredit, setImageCredit] = useState(existingCredit)

  function onTitleChange(value: string) {
    setTitle(value)
    if (!slugDirty) setSlug(slugify(value))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const readMin = formData.get("read_minutes")
      const relatedRaw = formData.get("related_listing_ids") as string
      const cleanedHero = heroImage.trim() || null

      // Preserve any existing attribution fields the routine may have
      // populated (source, licence, granted_social_use, uploaded_at) —
      // the form only touches `hero.credit`.
      const existingAttribution =
        (article?.image_attribution as ImageAttribution | null | undefined) ??
        null
      const trimmedCredit = imageCredit.trim()
      let nextAttribution: ImageAttribution | null = existingAttribution
      if (trimmedCredit) {
        nextAttribution = {
          ...(existingAttribution ?? {}),
          hero: {
            ...(existingAttribution?.hero ?? {}),
            credit: trimmedCredit,
          },
        }
      } else if (existingAttribution?.hero?.credit) {
        // Editor cleared the field — drop just the credit, keep the rest.
        const { credit: _drop, ...restHero } = existingAttribution.hero
        nextAttribution = { ...existingAttribution, hero: restHero }
      }

      const data: ArticleInput = {
        slug: slug.trim(),
        title: title.trim(),
        category: ((formData.get("category") as string) || "").trim() || null,
        status: (formData.get("status") as ArticleStatus) || "draft",
        hero_image: cleanedHero,
        excerpt: ((formData.get("excerpt") as string) || "").trim() || null,
        body_md: ((formData.get("body_md") as string) || "").trim() || null,
        read_minutes: readMin ? Number(readMin) : null,
        author_name: ((formData.get("author_name") as string) || "").trim() || null,
        related_listing_ids: relatedRaw
          ? relatedRaw
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : null,
        image_attribution: nextAttribution,
      }

      await onSubmit(data)
      toast.success(article ? "Article updated" : "Article created")
      router.push("/admin/articles")
      router.refresh()
    } catch (error) {
      console.error("Error saving article:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save article.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    if (!window.confirm("Delete this article? This cannot be undone.")) return
    setIsDeleting(true)
    try {
      await onDelete()
      toast.success("Article deleted")
      router.push("/admin/articles")
      router.refresh()
    } catch (error) {
      console.error("Error deleting article:", error)
      toast.error(error instanceof Error ? error.message : "Failed to delete article.")
      setIsDeleting(false)
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
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            placeholder="Enter article title"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
              setSlugDirty(true)
            }}
            required
            placeholder="enter-url-friendly-slug"
          />
          <p className="text-xs text-stone-500 mt-1">
            Auto-derived from the title. Edit if you want a different URL.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={article?.category ?? ARTICLE_CATEGORIES[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {ARTICLE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={article?.status ?? "draft"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={article?.excerpt ?? ""}
            placeholder="One- or two-sentence summary shown in cards and lists."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="body_md">Body (markdown)</Label>
          <Textarea
            id="body_md"
            name="body_md"
            defaultValue={article?.body_md ?? ""}
            placeholder="Write the article in markdown. Headings, lists, links — same as the file-based guides."
            className="min-h-[400px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label>Hero image</Label>
          {article?.id ? (
            <SingleImageUpload
              ownerType="article"
              listingId={article.id}
              slot="hero"
              value={heroImage}
              onChange={setHeroImage}
              hint="Landscape works best, ~1600×1200 or wider. Processed to WebP, EXIF stripped, max 10 MB."
              disabled={isSubmitting}
              testIdPrefix="article-hero-upload"
            />
          ) : (
            <p className="text-xs text-stone-500">
              Save the article as a draft first, then a hero uploader will appear here.
              You can paste a Supabase Storage URL manually below in the meantime.
            </p>
          )}
          <details className="pt-1">
            <summary className="cursor-pointer text-xs text-stone-500 hover:text-stone-700">
              Paste a Supabase Storage URL directly
            </summary>
            <Input
              id="hero_image_manual"
              className="mt-2"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="https://<project>.supabase.co/storage/v1/object/public/listing-media/…"
            />
            <p className="mt-1 text-xs text-stone-500">
              Only Supabase Storage URLs are accepted — the API rejects anything else with
              <code className="mx-1">invalid_hero_image</code>.
            </p>
          </details>
        </div>

        <div>
          <Label htmlFor="image_credit">Image credit</Label>
          <Input
            id="image_credit"
            name="image_credit"
            value={imageCredit}
            onChange={(e) => setImageCredit(e.target.value)}
            placeholder="e.g. Photo: Vlad Chetan / Pexels"
          />
          <p className="text-xs text-stone-500 mt-1">
            Free-text credit line displayed with the article. Written into
            <code className="mx-1">image_attribution.hero.credit</code>.
          </p>
        </div>

        <div>
          <Label htmlFor="read_minutes">Read time (minutes)</Label>
          <Input
            id="read_minutes"
            name="read_minutes"
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            defaultValue={article?.read_minutes ?? ""}
            placeholder="e.g. 6"
          />
        </div>

        <div>
          <Label htmlFor="author_name">Author</Label>
          <Input
            id="author_name"
            name="author_name"
            defaultValue={article?.author_name ?? ""}
            placeholder="Author name (optional)"
          />
        </div>

        <div>
          <Label htmlFor="related_listing_ids">Related listing IDs</Label>
          <Input
            id="related_listing_ids"
            name="related_listing_ids"
            defaultValue={(article?.related_listing_ids ?? []).join(", ")}
            placeholder="comma-separated UUIDs of listings this article mentions"
          />
          <p className="text-xs text-stone-500 mt-1">
            Optional. Surfaces this article on those listing detail pages.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t pt-6">
        <Button type="submit" disabled={isSubmitting || isDeleting}>
          {isSubmitting ? "Saving…" : article ? "Save changes" : "Create article"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting || isDeleting}
        >
          Cancel
        </Button>
        {onDelete && (
          <Button
            type="button"
            variant="destructive"
            className="ml-auto"
            onClick={handleDelete}
            disabled={isSubmitting || isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete article"}
          </Button>
        )}
      </div>
    </form>
  )
}
