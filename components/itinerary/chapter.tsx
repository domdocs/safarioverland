import type { Chapter as ChapterType } from "@/lib/itineraries/types"
import { toRoman } from "@/lib/itineraries/types"

function ChapterHero({
  chapter,
  index,
}: {
  chapter: ChapterType
  index: number
}) {
  const numeral = toRoman(index)
  const heroStyle = chapter.photo_hero_url
    ? { backgroundImage: `url(${chapter.photo_hero_url})` }
    : undefined
  return (
    <div
      className={`chapter-hero${chapter.photo_hero_url ? "" : " no-photo"}`}
      style={heroStyle}
    >
      <div className="label">
        <div className="numeral-big">{numeral}</div>
        <div>
          <h2>{chapter.place}</h2>
          <div className="place-meta">
            <span>{chapter.country}</span>
            {chapter.coords_lat !== null && chapter.coords_lon !== null && (
              <>
                <span>·</span>
                <span>
                  {Math.abs(chapter.coords_lat).toFixed(3)}°
                  {chapter.coords_lat < 0 ? "S" : "N"},{" "}
                  {Math.abs(chapter.coords_lon).toFixed(3)}°
                  {chapter.coords_lon < 0 ? "W" : "E"}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="dates">
          {chapter.dates && <div className="when">{chapter.dates}</div>}
          <div className="nights">
            {chapter.nights} {chapter.nights === 1 ? "night" : "nights"}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChapterIntro({
  chapter,
  index,
}: {
  chapter: ChapterType
  index: number
}) {
  const numeral = toRoman(index)
  return (
    <div className="chapter-intro">
      <div className="left">
        <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          Chapter <span className="numeral">{numeral}</span> · The place
        </div>
        {chapter.epigraph && <p className="epigraph">{chapter.epigraph}</p>}
      </div>
      <div className="right">
        {chapter.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}

function Lodge({ chapter }: { chapter: ChapterType }) {
  const lodge = chapter.lodge
  if (!lodge || !lodge.name) return null
  return (
    <div className="lodge">
      <div className="photo">
        {chapter.photo_lodge_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={chapter.photo_lodge_url} alt="" />
        ) : null}
      </div>
      <div className="text">
        {lodge.kind && <div className="kind">Where you sleep — {lodge.kind}</div>}
        <h3>{lodge.name}</h3>
        {lodge.room && <div className="room">{lodge.room}</div>}
        {lodge.blurb && <p>{lodge.blurb}</p>}
        {lodge.amenities.length > 0 && (
          <ul className="amenities">
            {lodge.amenities.map((a, i) => (
              <li key={`${i}-${a}`}>{a}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Rhythm({ chapter }: { chapter: ChapterType }) {
  if (chapter.rhythm.length === 0) return null
  return (
    <div className="rhythm-section">
      <div className="rhythm-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            How the days unfold
          </div>
          <h3>
            The rhythm <em>of {chapter.place.toLowerCase()}</em>
          </h3>
        </div>
        <div className="rhythm-list">
          {chapter.rhythm.map((r, i) => (
            <div key={i} className="rhythm-item">
              <div className="rhythm-time">{r.time}</div>
              <div className="rhythm-body">
                <h4>{r.title}</h4>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SeeingAndNote({
  chapter,
  showCuratorNote,
  curatorFirstName,
  curatorLocation,
}: {
  chapter: ChapterType
  showCuratorNote: boolean
  curatorFirstName: string
  curatorLocation: string
}) {
  const hasSeeing = chapter.seeing.length > 0
  const showNote = showCuratorNote && chapter.note
  if (!hasSeeing && !showNote) return null

  return (
    <div className="seeing-note">
      {hasSeeing && (
        <div className="seeing">
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            What you&apos;ll see
          </div>
          <h3>The field guide, in short.</h3>
          <ul className="seeing-list">
            {chapter.seeing.map((s, i) => (
              <li key={`${i}-${s}`}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      {showNote && (
        <div className="note">
          <div className="note-card">
            {chapter.note}
            <span className="sig">
              — {curatorFirstName}
              {curatorLocation ? `, from ${curatorLocation.split(",")[0]}` : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

type Props = {
  chapter: ChapterType
  index: number
  showCuratorNote: boolean
  curatorName: string
  curatorLocation: string
}

export function Chapter({
  chapter,
  index,
  showCuratorNote,
  curatorName,
  curatorLocation,
}: Props) {
  const firstName = curatorName.trim().split(" ")[0] ?? "T"
  return (
    <section className="chapter" id={chapter.slug}>
      <ChapterHero chapter={chapter} index={index} />
      <ChapterIntro chapter={chapter} index={index} />
      <Lodge chapter={chapter} />
      <Rhythm chapter={chapter} />
      <SeeingAndNote
        chapter={chapter}
        showCuratorNote={showCuratorNote}
        curatorFirstName={firstName}
        curatorLocation={curatorLocation}
      />
    </section>
  )
}
