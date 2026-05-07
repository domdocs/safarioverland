import Image from "next/image"
import { MapPin, Compass } from "lucide-react"
import { Eyebrow } from "@/components/editorial/eyebrow"

interface Attraction {
  name: string
  location: string
  description: string
  image: string | null
  highlights: string[]
  bestTime: string
}

interface DestinationAttractionsProps {
  attractions: Attraction[]
}

function isMissingImage(src: string | null | undefined): boolean {
  if (!src) return true
  if (src.includes("placeholder.svg")) return true
  return false
}

export function DestinationAttractions({ attractions }: DestinationAttractionsProps) {
  return (
    <section className="container py-20">
      <Eyebrow withRule>Signature destinations</Eyebrow>
      <h2 className="mt-6 mb-12 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance max-w-3xl">
        Where to go, and what makes it worth the journey.
      </h2>

      <div>
        {attractions.map((attraction, index) => (
          <article
            key={`${attraction.name}-${index}`}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 border-t border-rule py-10"
          >
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-card">
                {isMissingImage(attraction.image) ? (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                    <Compass
                      className="h-12 w-12 text-primary/60"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <Image
                    src={attraction.image as string}
                    alt={attraction.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="mono text-amber" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mono text-bone-mute inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {attraction.location}
                </span>
              </div>
              <h3 className="font-serif text-h3-fluid text-bone leading-tight text-balance">
                {attraction.name}
              </h3>
              <p className="mt-4 text-bone-mute leading-relaxed">{attraction.description}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-rule pt-5">
                <div>
                  <p className="eyebrow mb-2">Highlights</p>
                  <ul className="text-bone leading-relaxed">
                    {attraction.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-baseline gap-2 py-0.5">
                        <span className="mono text-amber">{String(i + 1).padStart(2, "0")}</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-2">Best time</p>
                  <p className="font-serif italic text-bone leading-snug">{attraction.bestTime}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
