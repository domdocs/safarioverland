"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, UploadCloud, X } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  listingId: string
  /** Current gallery URLs in display order. */
  value: string[]
  onChange: (urls: string[]) => void
  disabled?: boolean
  testIdPrefix?: string
}

/**
 * Multi-image dropzone for `gallery_urls`. Uploads sequentially to
 * /api/admin/upload (sequential rather than Promise.all so per-file
 * errors are visible and ordering is preserved on the way out). Once
 * uploaded, items are draggable horizontally to reorder; the resulting
 * order is the order on the public listing detail page.
 */
export function GalleryUpload({
  listingId,
  value,
  onChange,
  disabled = false,
  testIdPrefix = "gallery-upload",
}: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (accepted.length === 0) return
      setError(null)
      setUploading(true)
      setProgress({ done: 0, total: accepted.length })

      const newUrls: string[] = []
      for (let i = 0; i < accepted.length; i++) {
        const file = accepted[i]
        try {
          const form = new FormData()
          form.append("file", file)
          form.append("listing_id", listingId)
          form.append("slot", "gallery")
          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: form,
          })
          const data = await res.json().catch(() => ({}))
          if (!res.ok) {
            setError(`${file.name}: ${data.error || `HTTP ${res.status}`}`)
            break
          }
          newUrls.push(data.url as string)
        } catch (err) {
          setError(
            `${file.name}: ${err instanceof Error ? err.message : "network error"}`,
          )
          break
        }
        setProgress({ done: i + 1, total: accepted.length })
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls])
      }
      setUploading(false)
      // Hold progress on screen briefly so the user sees the final
      // count before it clears, unless an error broke us out early.
      if (!error) {
        setTimeout(() => setProgress(null), 800)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listingId, value, onChange],
  )

  const dz = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: true,
    disabled: disabled || uploading,
  })

  // dnd-kit sensors — pointer for mouse/touch, keyboard for a11y.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = value.indexOf(active.id as string)
    const newIndex = value.indexOf(over.id as string)
    if (oldIndex < 0 || newIndex < 0) return
    onChange(arrayMove(value, oldIndex, newIndex))
  }

  function removeAt(index: number) {
    const next = [...value]
    next.splice(index, 1)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <div
        {...dz.getRootProps()}
        className={cn(
          "rounded-md border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
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
            ? progress
              ? `Uploading ${progress.done} / ${progress.total}…`
              : "Uploading…"
            : dz.isDragActive
              ? "Drop the images here"
              : "Drag images here, or click to choose. Multiple OK."}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          JPEG, PNG, or WebP · max 10 MB each · order them by dragging
          after upload
        </p>
      </div>

      {error ? (
        <p className="text-xs text-red-700" data-testid={`${testIdPrefix}-error`}>
          {error}
        </p>
      ) : null}

      {value.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value}
            strategy={horizontalListSortingStrategy}
          >
            <ul
              className="flex flex-wrap gap-3"
              data-testid={`${testIdPrefix}-list`}
            >
              {value.map((url, i) => (
                <SortableThumb
                  key={url}
                  url={url}
                  index={i}
                  onRemove={() => removeAt(i)}
                  disabled={disabled || uploading}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      ) : null}
    </div>
  )
}

function SortableThumb({
  url,
  index,
  onRemove,
  disabled,
}: {
  url: string
  index: number
  onRemove: () => void
  disabled: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="relative w-32 group"
      data-testid={`gallery-upload-thumb-${index}`}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "relative h-24 w-32 overflow-hidden rounded-md border border-border bg-stone-100",
          !disabled && "cursor-grab active:cursor-grabbing",
        )}
        aria-label={`Gallery image ${index + 1} — drag to reorder`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={`Gallery image ${index + 1}`}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute bottom-1 left-1 text-[10px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded-sm tabular-nums">
          {index + 1}
        </span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`Remove gallery image ${index + 1}`}
        className={cn(
          "absolute -top-2 -right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white border border-border shadow-sm",
          "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity",
          "hover:text-red-700 disabled:opacity-30",
        )}
        data-testid={`gallery-upload-remove-${index}`}
      >
        <X className="h-3 w-3" />
      </button>
    </li>
  )
}
