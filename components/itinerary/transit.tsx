import type { Chapter, Transit as TransitType } from "@/lib/itineraries/types"

import { TransitMap } from "./maps"

function ModeIcon({ mode }: { mode: string }) {
  const m = mode.toLowerCase()
  if (m.includes("road") || m.includes("transfer")) {
    return (
      <svg
        viewBox="0 0 60 30"
        width="60"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M 4 22 L 18 22 L 22 14 L 38 14 L 44 22 L 56 22" />
        <circle cx="22" cy="22" r="3" fill="currentColor" />
        <circle cx="44" cy="22" r="3" fill="currentColor" />
      </svg>
    )
  }
  if (m.includes("aircraft") || m.includes("flight") || m.includes("bush")) {
    return (
      <svg
        viewBox="0 0 60 30"
        width="60"
        height="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path
          d="M 4 18 L 24 14 L 30 6 L 36 14 L 56 18 L 50 22 L 30 18 L 28 26 L 22 22 L 16 24 L 14 20 Z"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 60 30"
      width="60"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M 4 15 L 56 15" strokeDasharray="3 4" />
    </svg>
  )
}

type Props = {
  transit: TransitType
  fromChapter: Chapter
  toChapter: Chapter
}

export function Transit({ transit, fromChapter, toChapter }: Props) {
  const canDrawMap =
    fromChapter.coords_lat !== null &&
    fromChapter.coords_lon !== null &&
    toChapter.coords_lat !== null &&
    toChapter.coords_lon !== null

  return (
    <section className="transit">
      <div className="transit-inner">
        <div>
          <div className="eyebrow">Interlude · transit {transit.position + 1}</div>
          <h3>
            {fromChapter.place}
            <span className="arrow">→</span>
            <br />
            {toChapter.place}
          </h3>
          <div style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
            <ModeIcon mode={transit.mode} />
          </div>
          <dl className="transit-meta">
            <div>
              <dt>Mode</dt>
              <dd>{transit.mode}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{transit.duration}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{transit.distance}</dd>
            </div>
            <div>
              <dt>Crossing</dt>
              <dd>{transit.crosses}</dd>
            </div>
          </dl>
          <p>{transit.note}</p>
        </div>

        <div className="transit-map">
          {canDrawMap && (
            <TransitMap
              from={{
                lat: fromChapter.coords_lat as number,
                lon: fromChapter.coords_lon as number,
                place: fromChapter.place,
              }}
              to={{
                lat: toChapter.coords_lat as number,
                lon: toChapter.coords_lon as number,
                place: toChapter.place,
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
