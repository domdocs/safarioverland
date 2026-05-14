import type { Chapter, Itinerary } from "@/lib/itineraries/types"
import { toRoman } from "@/lib/itineraries/types"

import { OverviewMap, type MapStop } from "./maps"

export function Cover({ itinerary }: { itinerary: Itinerary }) {
  const titleLines = itinerary.cover_title_lines.length > 0
    ? itinerary.cover_title_lines
    : [itinerary.title]

  return (
    <section className="cover">
      <div className="cover-photo">
        {itinerary.cover_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={itinerary.cover_photo_url}
            alt=""
            loading="eager"
            decoding="sync"
          />
        ) : null}
      </div>
      <div className="cover-meta">
        <div className="cover-mast">
          <span className="dot" />
          <span>Safari Overland</span>
          <span style={{ marginLeft: "auto", opacity: 0.5 }}>
            {itinerary.reference}
          </span>
        </div>

        <div>
          <div
            className="eyebrow"
            style={{ color: "var(--accent)", marginBottom: "1.4rem" }}
          >
            An Itinerary, prepared for
          </div>
          {itinerary.guests.length > 0 && (
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: "1.4rem",
                fontStyle: "italic",
                color: "var(--paper)",
                marginBottom: "2.4rem",
              }}
            >
              {itinerary.guests.join(" & ")}
            </div>
          )}
          <h1>
            {titleLines.map((line, i) => (
              <em key={i}>{line}</em>
            ))}
          </h1>
          {itinerary.subtitle && (
            <p
              style={{
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: "1.3rem",
                color: "var(--paper)",
                opacity: 0.75,
                marginTop: "2rem",
                maxWidth: "26rem",
                lineHeight: 1.4,
              }}
            >
              {itinerary.subtitle}
            </p>
          )}
        </div>

        <dl className="cover-foot">
          {(itinerary.dates_from || itinerary.dates_to || itinerary.dates_year) && (
            <div>
              <dt>Travelling</dt>
              <dd>
                {itinerary.dates_from}
                {itinerary.dates_from && itinerary.dates_to ? " — " : ""}
                {itinerary.dates_to}
                {itinerary.dates_year ? `, ${itinerary.dates_year}` : ""}
              </dd>
            </div>
          )}
          {itinerary.pace && (
            <div>
              <dt>Pace</dt>
              <dd>{itinerary.pace}</dd>
            </div>
          )}
          {itinerary.curator_name && (
            <div>
              <dt>Curated by</dt>
              <dd>{itinerary.curator_name}</dd>
            </div>
          )}
          {itinerary.curator_location && (
            <div>
              <dt>From</dt>
              <dd>{itinerary.curator_location}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  )
}

export function Prologue({ itinerary }: { itinerary: Itinerary }) {
  if (itinerary.prologue.length === 0) return null
  const [lede, ...rest] = itinerary.prologue
  return (
    <section className="prologue page tight">
      <div className="eyebrow" style={{ marginBottom: "2rem" }}>
        An Introduction
      </div>
      <p className="lede">{lede}</p>
      {rest.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <hr className="rule" style={{ marginTop: "4rem", maxWidth: "8rem" }} />
    </section>
  )
}

export function Overview({
  itinerary,
  chapters,
}: {
  itinerary: Itinerary
  chapters: Chapter[]
}) {
  const mapStops: MapStop[] = chapters
    .filter((c) => c.coords_lat !== null && c.coords_lon !== null)
    .map((c) => ({
      id: c.id,
      place: c.place,
      lat: c.coords_lat as number,
      lon: c.coords_lon as number,
    }))

  const subCaption =
    itinerary.dates_from && itinerary.dates_to && itinerary.dates_year
      ? `${itinerary.dates_from.toUpperCase()} — ${itinerary.dates_to.toUpperCase()} ${itinerary.dates_year}`
      : undefined

  return (
    <section className="overview">
      <div className="page wide">
        <div className="overview-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
              The Route
            </div>
            <h2
              style={{
                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.05,
                marginBottom: "1.4rem",
              }}
            >
              {chapters.length === 1 ? "One place," : `${chapters.length} places,`}
              <br />
              one arc.
            </h2>
            {itinerary.pace && (
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.65,
                  maxWidth: "28rem",
                }}
              >
                {itinerary.pace}
              </p>
            )}

            <ol className="stops">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <span className="num">{toRoman(i)}</span>
                  <span>
                    <span className="name">{c.place}</span>
                    <span className="country">{c.country}</span>
                  </span>
                  <span className="nights">
                    {c.nights} {c.nights === 1 ? "night" : "nights"}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="overview-map-wrap">
            {mapStops.length > 0 && (
              <OverviewMap stops={mapStops} subCaption={subCaption} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
