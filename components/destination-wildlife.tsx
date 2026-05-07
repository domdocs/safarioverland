import Image from "next/image"
import { PawPrint } from "lucide-react"
import { Eyebrow } from "@/components/editorial/eyebrow"

interface Wildlife {
  name: string
  description: string
  image: string
}

interface DestinationWildlifeProps {
  wildlife: Wildlife[]
  title: string
  description: string
}

function isMissing(src: string | null | undefined): boolean {
  if (!src) return true
  if (src.includes("placeholder.svg")) return true
  return false
}

export function DestinationWildlife({ wildlife, title, description }: DestinationWildlifeProps) {
  return (
    <section className="border-t border-rule py-20">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Wildlife</Eyebrow>
          <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-6 text-bone-mute leading-relaxed max-w-2xl">{description}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {wildlife.map((animal, index) => (
            <div key={index} className="border-t border-rule pt-5">
              <div className="relative aspect-square overflow-hidden bg-card mb-4">
                {isMissing(animal.image) ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <PawPrint
                      className="h-10 w-10 text-amber/70"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="mono text-amber" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-serif text-lg text-bone leading-tight">{animal.name}</h3>
              <p className="mt-1 text-sm text-bone-mute leading-relaxed">{animal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
