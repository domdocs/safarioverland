"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, RefreshCw, Trash2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ItinerarySlot = "itinerary-cover" | "chapter-hero" | "chapter-lodge"

type Props = {
  itineraryId: string
  /** Required for chapter-hero and chapter-lodge slots. */
  chapterId?: string
  slot: ItinerarySlot
  value: string | null
  onChange: (url: string | null) => void
  hint?: string
  disabled?: boolean
}

/**
 * Image dropzone for itinerary cover and per-chapter hero / lodge photos.
 *
 * Wraps the existing /api/admin/upload endpoint (extended in this PR to
 * accept itinerary_id + chapter_id form fields). On success, calls
 * onChange with the public URL so the parent form can persist it.
 */
export function ItineraryImageUpload({
  itineraryId,
  chapterId,
  slot,
  value,
  onChange,
  hint,
  disabled = false,
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (accepted.length === 0) return
      const file = accepted[0]
      setError(null)
      setUploading(true)
      try {
        const form = new FormData()
        form.append("file", file)
        form.append("itinerary_id", itineraryId)
        if (chapterId) form.append("chapter_id", chapterId)
        form.append("slot", slot)
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: form,
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(data.error || `HTTP ${res.status}`)
          setUploading(false)
          return
        }
        onChange(data.url as string)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error")
      } finally {
        setUploading(false)
      }
    },
    [itineraryId, chapterId, slot, onChange],
  )

  const dz = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: false,
    maxFiles: 1,
    disabled: disabled || uploading,
  })

  if (!value) {
    return (
      <div className="space-y-2">
        <div
          {...dz.getRootProps()}
          className={cn(
            "rounded-md border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
            dz.isDragActive
              ? "border-foreground bg-foreground/5"
              : "border-border hover:border-foreground/50",
            (disabled || uploading) && "opacity-60 cursor-not-allowed",
          )}
        >
          <input {...dz.getInputProps()} />
          {uploading ? (
            <Loader2 className="mx-auto h-5 w-5 text-muted-foreground animate-spin" />
          ) : (
            <UploadCloud className="mx-auto h-5 w-5 text-muted-foreground" />
          )}
          <p className="mt-2 text-xs">
            {uploading
              ? "Uploading…"
              : dz.isDragActive
                ? "Drop the image here"
                : "Drag an image here, or click to choose"}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            JPEG, PNG, or WebP · max 10 MB
          </p>
        </div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-32 overflow-hidden rounded-md border border-border bg-stone-100 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onChange(null)}
            disabled={disabled || uploading}
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Replace
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onChange(null)}
            disabled={disabled || uploading}
          >
            <Trash2 className="mr-2 h-3 w-3" />
            Remove
          </Button>
        </div>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
