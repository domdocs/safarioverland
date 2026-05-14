import type { Itinerary, PracticalCard } from "@/lib/itineraries/types"

/**
 * Render a single practical card body. We accept plain text with line
 * breaks separating paragraphs. Inline emphasis is not parsed in v1 —
 * the brief allows it later, but the form currently saves raw text.
 *
 * A leading "- " on a line creates a bullet (cheap markdown — just enough
 * to support the prototype's mixed paragraph/list cards).
 */
function CardBody({ body }: { body: string }) {
  const lines = body.split(/\n+/).filter((l) => l.trim().length > 0)
  // If most lines look like bullets, render as a list.
  const bulletLines = lines.filter((l) => l.trim().startsWith("- "))
  if (bulletLines.length >= 2 && bulletLines.length / lines.length >= 0.6) {
    return (
      <ul>
        {lines.map((l, i) => {
          const text = l.replace(/^-\s*/, "")
          return <li key={i}>{text}</li>
        })}
      </ul>
    )
  }
  return (
    <>
      {lines.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}

export function Practicals({ cards }: { cards: PracticalCard[] }) {
  if (!cards || cards.length === 0) return null
  return (
    <section className="practicals">
      <div className="practicals-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            The fine print
          </div>
          <h2>The practical bits.</h2>
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: "1.02rem",
              marginTop: "1.2rem",
              lineHeight: 1.65,
            }}
          >
            Kept short on purpose. Anything you need from us beyond what is
            here — call.
          </p>
        </div>
        <div className="cards">
          {cards.map((c, i) => (
            <div key={i} className="practical-card">
              <h4>{c.title}</h4>
              <CardBody body={c.body} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SignOff({ itinerary }: { itinerary: Itinerary }) {
  const curatorName = itinerary.curator_name ?? ""
  const firstName = curatorName.split(" ")[0] || "T"
  const issueDate = new Date(itinerary.updated_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section className="signoff">
      <p className="farewell">We will see you on the river.</p>
      <div
        style={{
          marginTop: "2rem",
          fontFamily: "var(--display)",
          fontStyle: "italic",
          color: "var(--quiet)",
          fontSize: "1.1rem",
        }}
      >
        Until then,
      </div>
      <div className="sig-card">{firstName}</div>
      <div className="curator-meta">
        {curatorName} · {itinerary.curator_title}
        <br />
        {itinerary.curator_location}
      </div>

      <div className="colophon">
        <span>Safari Overland — Curated from Victoria Falls</span>
        <span>{itinerary.reference}</span>
        <span>Document v.1 · Issued {issueDate}</span>
      </div>
    </section>
  )
}
