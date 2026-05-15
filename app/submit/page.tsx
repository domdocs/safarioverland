import Link from "next/link"

import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "For operators | Safari Overland",
  description:
    "Safari Overland is a small editorial collection of African lodges and operators we know personally. We add new listings by invitation, not by submission — but we always read.",
}

export default function OperatorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow withRule>For operators</Eyebrow>
            <h1 className="mt-6 font-serif text-display-fluid text-bone leading-[0.96] tracking-tighter text-balance">
              We add listings <span className="italic text-amber">by hand</span>.
            </h1>
            <p className="mt-8 font-serif italic text-h4-fluid text-bone-mute max-w-2xl leading-snug">
              Safari Overland is a small editorial collection — fewer
              names than most platforms, each one written up properly.
              We add operators by invitation, after we&apos;ve visited or
              spoken at length. The bar is editorial fit, not category coverage.
            </p>
            <p className="mt-8 text-bone-mute leading-relaxed max-w-2xl">
              If you run a lodge, camp, or specialist operator and you think
              you&apos;d fit the editorial — slower pace, conservation work,
              community involvement, intentional design — write to Niels
              directly. Tell us what you&apos;d want us to know about your
              operation, ideally in your own words rather than the marketing
              version. We read everything.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-none px-8 py-6 mono">
                <Link href="mailto:niels@safarioverland.com">
                  Write to Niels →
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none px-8 py-6 mono border-rule text-bone hover:border-amber hover:text-amber"
              >
                <Link href="/about">Read about us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  )
}
