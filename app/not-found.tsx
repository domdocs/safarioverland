import Link from "next/link"
import Image from "next/image"

import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Button } from "@/components/ui/button"

/**
 * Site-wide 404 — editorial register, full-bleed dark hero.
 * Matches the visual language of /resources/conservation/anti-poaching.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />

      <main className="flex-1">
        <section className="relative h-[78vh] min-h-[600px] w-full overflow-hidden bg-night">
          <Image
            src="/safari-tent.jpg"
            alt="Tented camp at sunset in the African bush"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night"
          />

          <div className="container relative h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="max-w-3xl">
              <Eyebrow withRule>404 — not found</Eyebrow>
              <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
                We don&apos;t have a chapter
                <br />
                for <span className="italic text-amber">that</span>.
              </h1>
              <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
                The page you tried to reach has moved, been renamed, or never
                existed. The directory still has plenty to read.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-8 py-6 mono" asChild>
                  <Link href="/">Return home →</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <Link href="/destinations">Open the atlas</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 py-6 mono border-bone/30 text-bone hover:border-amber hover:text-amber bg-transparent"
                  asChild
                >
                  <StartBriefLink source="404">Plan a trip</StartBriefLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  )
}
