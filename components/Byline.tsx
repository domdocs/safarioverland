import Image from "next/image"

import type { Editor } from "@/lib/editors"

type Props = {
  editor: Editor
  /** ISO date string. */
  published: string
  /** ISO date string. */
  updated: string
}

/**
 * Visible byline + dateline shown under the H1 on every field note.
 * Photo is omitted when editor.photo is null (current state for
 * Niels — until a portrait is supplied).
 *
 * Style tokens kept brand-consistent: bone for the name, bone-mute
 * for the meta line, .eyebrow for the date small-print.
 */
export function Byline({ editor, published, updated }: Props) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  return (
    <div className="flex items-center gap-4 my-8 text-sm text-bone-mute">
      {editor.photo && (
        <Image
          src={editor.photo}
          alt={editor.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      )}
      <div>
        <div>
          By <span className="font-medium text-bone">{editor.name}</span> —{" "}
          {editor.jobTitle}
        </div>
        <div className="text-xs eyebrow mt-1">
          Published {fmt(published)}
          {published !== updated && <> · Updated {fmt(updated)}</>}
        </div>
      </div>
    </div>
  )
}
