import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/editorial/eyebrow"

export default function FieldNoteNotFound() {
  return (
    <main className="container py-24 md:py-32">
      <div className="max-w-2xl">
        <Eyebrow withRule>404 — not in the collection</Eyebrow>
        <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight text-balance">
          That field note isn&apos;t here.
        </h1>
        <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-xl">
          It may have been unpublished, renamed, or it never existed. The rest
          of the collection is still there.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
            <Link href="/field-notes">Browse field notes</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-none px-8 py-6 mono"
            asChild
          >
            <Link href="/categories">Browse categories</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
