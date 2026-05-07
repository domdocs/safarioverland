import { Eyebrow } from "@/components/editorial/eyebrow"
import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Season {
  name: string
  months: string
  weather: string
  wildlife: string
  crowds: string
  costs: string
  pros: string[]
  cons: string[]
  icon: "sun" | "cloud" | "rain" | "thermometer"
}

interface DestinationSeasonsProps {
  seasons: Season[]
}

const ICONS: Record<Season["icon"], LucideIcon> = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  thermometer: Thermometer,
}

export function DestinationSeasons({ seasons }: DestinationSeasonsProps) {
  return (
    <section className="border-t border-rule bg-ink py-20">
      <div className="container">
        <Eyebrow>When to go</Eyebrow>
        <h2 className="mt-4 mb-12 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance max-w-3xl">
          The same park reads differently in every season.
        </h2>

        <div className="space-y-12">
          {seasons.map((season, idx) => {
            const Icon = ICONS[season.icon]
            return (
              <article
                key={season.name}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 border-t border-rule pt-8"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="mono text-amber" aria-hidden>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-4 w-4 text-amber" aria-hidden />
                    <span className="eyebrow">{season.months}</span>
                  </div>
                  <h3 className="font-serif text-h3-fluid text-bone leading-tight">
                    {season.name}
                  </h3>
                  <p className="mt-3 font-serif italic text-lg text-bone-mute leading-snug">
                    {season.weather}
                  </p>
                </div>

                <dl className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-6">
                  <div>
                    <dt className="eyebrow mb-2">Wildlife</dt>
                    <dd className="text-bone-mute leading-relaxed">{season.wildlife}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-2">Crowds & costs</dt>
                    <dd className="text-bone-mute leading-relaxed">{season.crowds}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-2">Why it works</dt>
                    <dd>
                      <ul className="space-y-1.5 text-bone leading-relaxed">
                        {season.pros.map((pro, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <span className="mono text-moss">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-2">What to consider</dt>
                    <dd>
                      <ul className="space-y-1.5 text-bone-mute leading-relaxed">
                        {season.cons.map((con, i) => (
                          <li key={i} className="flex items-baseline gap-2">
                            <span className="mono text-flame">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
