"use client"

import { useState } from "react"
import { Eyebrow } from "@/components/editorial/eyebrow"
import { cn } from "@/lib/utils"

interface Country {
  name: string
  description: string
  listings: number
}

interface DestinationMapProps {
  countries: Country[]
  regionName: string
}

export function DestinationMap({ countries, regionName }: DestinationMapProps) {
  const [activeName, setActiveName] = useState(countries[0]?.name)
  const active = countries.find((c) => c.name === activeName) ?? countries[0]

  return (
    <section className="border-t border-rule py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Eyebrow>Explore by country</Eyebrow>
            <h2 className="mt-4 font-serif text-h2-fluid text-bone leading-tight tracking-tight text-balance">
              {regionName}, country by country.
            </h2>
          </div>
          <p className="mono text-bone-mute">{countries.length} countries</p>
        </div>

        {/* Country tab strip */}
        <div className="border-y border-rule mb-12">
          <ul className="-mx-1 flex items-stretch overflow-x-auto scrollbar-none">
            {countries.map((country) => {
              const isActive = country.name === active?.name
              return (
                <li key={country.name} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveName(country.name)}
                    aria-pressed={isActive}
                    className={cn(
                      "block px-4 py-4 mono transition-colors",
                      isActive
                        ? "text-amber border-b-2 border-amber"
                        : "text-bone-mute hover:text-amber border-b-2 border-transparent",
                    )}
                  >
                    {country.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {active && (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] border border-rule bg-card flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="eyebrow text-bone-mute mb-2">Map</p>
                  <p className="font-serif text-h3-fluid italic text-amber leading-tight">
                    {active.name}
                  </p>
                  <p className="mt-3 mono text-bone-mute">
                    {active.listings} on the kept list
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="mono text-amber" aria-hidden>
                {String(countries.findIndex((c) => c.name === active.name) + 1).padStart(2, "0")} /{" "}
                {String(countries.length).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-h2-fluid text-bone leading-tight tracking-tight">
                {active.name}
              </h3>
              <p className="mt-6 text-bone-mute leading-relaxed text-lg">{active.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
