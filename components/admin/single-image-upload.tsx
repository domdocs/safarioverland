"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { Loader2, RefreshCw, Trash2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type UploadSlot = "hero" | "founder"

type Props = {
  /** Listing UUID the image attaches to — needed for the bucket path. */
  listingId: string
  /** `hero` for the listing card hero, `founder` for the portrait. */
  slot: UploadSlot
  /** Current URL value. Empty string means no image yet. */
  value: string
  onChange: (url: string) => void
  /** Hint shown beneath the dropzone (e.g. "Square crop, ~600×600"). */
  hint?: string
  /** Disable the controls while parent is saving. */
  disabled?: boolean
  /** data-testid prefix for component test selectors. */
  testIdPrefix?: string
}

/**
 * Single-image dropzone for the hero and founder fields on the listing
 * edit form. POSTs to /api/admin/upload, surfaces a thumbnail and the
 * resulting URL, exposes Replace + Remove actions.
 *
 * The component is uncontrolled wrt internal upload state but
 * controlled wrt the resulting URL — onChange fires the moment the
 * upload completes, and parent forms write that URL into their state
 * just like the old `<Input>` would.
 */
export function SingleImageUpload({
  listingId,
  slot,
  value,
  onChange,
  hint,
  disabled = false,
  testIdPrefix = `${slot}-upload`,
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
        form.append("listing_id", listingId)
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
    [listingId, slot, onChange],
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

  // No image yet — render the drop zone.
  if (!value) {
    return (
      <div className="space-y-2">
        <div
          {...dz.getRootProps()}
          className={cn(
            "rounded-md border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
            dz.isDragActive
              ? "border-foreground bg-foreground/5"
              : "border-border hover:border-foreground/50",
            (disabled || uploading) && "opacity-60 cursor-not-allowed",
          )}
          data-testid={`${testIdPrefix}-dropzone`}
        >
          <input
            {...dz.getInputProps()}
            data-testid={`${testIdPrefix}-input`}
          />
          {uploading ? (
            <Loader2
              className="mx-auto h-6 w-6 text-muted-foreground animate-spin"
              aria-hidden
            />
          ) : (
            <UploadCloud
              className="mx-auto h-6 w-6 text-muted-foreground"
              aria-hidden
            />
          )}
          <p className="mt-3 text-sm">
            {uploading
              ? "Uploading…"
              : dz.isDragActive
                ? "Drop the image here"
                : "Drag an image here, or click to choose"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            JPEG, PNG, or WebP · max 10 MB
          </p>
        </div>
        {hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
        {error ? (
          <p className="text-xs text-red-700" data-testid={`${testIdPrefix}-error`}>
            {error}
          </p>
        ) : null}
      </div>
    )
  }

  // Existing image — thumbnail + Replace/Remove.
  return (
    <div className="space-y-2" data-testid={`${testIdPrefix}-filled`}>
      <div className="flex items-start gap-4">
        <div className="relative h-32 w-48 overflow-hidden rounded-md border border-border bg-stone-100 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Current upload preview"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                // Trigger the dropzone's file picker — same as clicking
                // the empty zone. We re-mount it temporarily by clearing
                // value via Replace, which is simpler than poking the
                // dropzone's open() function.
                onChange("")
              }}
              disabled={disabled || uploading}
              data-testid={`${testIdPrefix}-replace`}
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onChange("")}
              disabled={disabled || uploading}
              data-testid={`${testIdPrefix}-remove`}
            >
              <Trash2 className="mr-2 h-3 w-3" />
              Remove
            </Button>
          </div>
          <code className="block max-w-xs break-all text-[10px] text-muted-foreground bg-stone-100 p-2 rounded">
            {value}
          </code>
        </div>
      </div>
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}
