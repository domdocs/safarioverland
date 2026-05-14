"use client"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  label: string
  hint?: string
  value: string[]
  onChange: (next: string[]) => void
  /** "input" for single-line, "textarea" for paragraph entries. */
  variant?: "input" | "textarea"
  maxItems?: number
  maxLength?: number
  placeholder?: string
  addLabel?: string
}

/**
 * Lightweight repeater for string arrays — used for cover title lines,
 * guests, prologue paragraphs, intro paragraphs, seeing items, amenities.
 *
 * Drag-to-reorder is deferred (Phase 5); for v1 we use up/down arrows
 * implicitly via insert order. Each row has a remove button.
 */
export function StringListEditor({
  label,
  hint,
  value,
  onChange,
  variant = "input",
  maxItems = 20,
  maxLength,
  placeholder,
  addLabel = "Add item",
}: Props) {
  const items = value ?? []
  return (
    <div className="space-y-2">
      <div>
        <span className="text-sm font-medium">{label}</span>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {variant === "textarea" ? (
              <Textarea
                value={item}
                onChange={(e) => {
                  const next = [...items]
                  next[i] = e.target.value
                  onChange(next)
                }}
                placeholder={placeholder}
                maxLength={maxLength}
                rows={3}
                className="flex-1"
              />
            ) : (
              <Input
                value={item}
                onChange={(e) => {
                  const next = [...items]
                  next[i] = e.target.value
                  onChange(next)
                }}
                placeholder={placeholder}
                maxLength={maxLength}
                className="flex-1"
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                const next = items.filter((_, idx) => idx !== i)
                onChange(next)
              }}
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {items.length < maxItems && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange([...items, ""])}
          >
            <Plus className="h-3 w-3 mr-1" /> {addLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
