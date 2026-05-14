"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Chapter, Transit } from "@/lib/itineraries/types"

type Props = {
  transit: Transit
  fromChapter: Chapter | undefined
  toChapter: Chapter | undefined
  onChange: (patch: Partial<Transit>) => void
}

export function TransitEditor({ transit, fromChapter, toChapter, onChange }: Props) {
  const label = `Transit: ${fromChapter?.place ?? "—"} → ${toChapter?.place ?? "—"}`
  return (
    <div className="border border-stone-200 rounded-md bg-white p-4 space-y-3">
      <p className="text-sm font-semibold text-stone-700">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Mode</Label>
          <Input
            value={transit.mode}
            onChange={(e) => onChange({ mode: e.target.value })}
            maxLength={60}
            placeholder="Light aircraft (Cessna 208)"
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={transit.duration}
            onChange={(e) => onChange({ duration: e.target.value })}
            maxLength={32}
            placeholder="≈ 1 hr 10 min"
          />
        </div>
        <div>
          <Label>Distance</Label>
          <Input
            value={transit.distance}
            onChange={(e) => onChange({ distance: e.target.value })}
            maxLength={32}
            placeholder="440 km"
          />
        </div>
        <div>
          <Label>Crosses</Label>
          <Input
            value={transit.crosses}
            onChange={(e) => onChange({ crosses: e.target.value })}
            maxLength={120}
            placeholder="Kazungula border (Zimbabwe → Botswana)"
          />
        </div>
      </div>
      <div>
        <Label>Note</Label>
        <Textarea
          value={transit.note}
          onChange={(e) => onChange({ note: e.target.value })}
          maxLength={300}
          rows={3}
          placeholder="Border formalities take 30–45 minutes…"
        />
      </div>
    </div>
  )
}
