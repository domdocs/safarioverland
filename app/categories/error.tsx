"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/editorial/eyebrow"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="container py-24 md:py-32">
      <div className="max-w-2xl">
        <Eyebrow withRule>Error — directory</Eyebrow>
        <h2 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
          Something didn&apos;t load.
        </h2>
        <p className="mt-6 font-serif italic text-h4-fluid text-bone-mute max-w-xl">
          The directory hit an issue rendering this page. Try again, or browse another category.
        </p>
        <div className="mt-12">
          <Button
            onClick={() => reset()}
            size="lg"
            className="rounded-none px-8 py-6 mono"
          >
            Try again
          </Button>
        </div>
      </div>
    </section>
  )
}
