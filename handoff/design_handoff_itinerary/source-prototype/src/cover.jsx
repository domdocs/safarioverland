// Cover + overview + prologue

function Cover({ trip }) {
  return (
    <section className="cover" data-screen-label="01 Cover">
      <div className="cover-photo">
        <image-slot
          id="cover-hero"
          shape="rect"
          placeholder="Drop a cover image — Zambezi at dusk, or your hero photo"
        ></image-slot>
      </div>
      <div className="cover-meta">
        <div className="cover-mast">
          <span className="dot"></span>
          <span>Safari Overland</span>
          <span style={{ marginLeft: "auto", opacity: 0.5 }}>{trip.reference}</span>
        </div>

        <div>
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: "1.4rem" }}>
            An Itinerary, prepared for
          </div>
          <div style={{ fontFamily: "var(--display)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--paper)", marginBottom: "2.4rem" }}>
            {trip.guests.join(" & ")}
          </div>
          <h1>
            <em>The Smoke,</em>
            <em>the Delta,</em>
            <em>&amp; the Cape</em>
          </h1>
          <p style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: "1.3rem", color: "var(--paper)", opacity: 0.75, marginTop: "2rem", maxWidth: "26rem", lineHeight: 1.4 }}>
            Eleven days from the thunder of the Zambezi to the southern tip of the continent.
          </p>
        </div>

        <dl className="cover-foot">
          <div>
            <dt>Travelling</dt>
            <dd>{trip.dates.from} — {trip.dates.to}, {trip.dates.year}</dd>
          </div>
          <div>
            <dt>Pace</dt>
            <dd>{trip.pace}</dd>
          </div>
          <div>
            <dt>Curated by</dt>
            <dd>{trip.curator.name}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{trip.curator.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Prologue({ trip }) {
  return (
    <section className="prologue page tight" data-screen-label="02 Prologue">
      <div className="eyebrow" style={{ marginBottom: "2rem" }}>An Introduction</div>
      <p className="lede">{trip.prologue[0]}</p>
      {trip.prologue.slice(1).map((p, i) => <p key={i}>{p}</p>)}
      <hr className="rule" style={{ marginTop: "4rem", maxWidth: "8rem" }} />
    </section>
  );
}

function Overview({ trip, chapters }) {
  return (
    <section className="overview" data-screen-label="03 The Route">
      <div className="page wide">
        <div className="overview-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>The Route</div>
            <h2 style={{ fontSize: "clamp(2.4rem, 4vw, 3.4rem)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.05, marginBottom: "1.4rem" }}>
              Four places,<br />three borders,<br />one arc.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: "28rem" }}>
              You begin at the Falls, drop into Botswana for two slow legs in the bush, and finish at the bottom of the continent. The whole journey is roughly 2,500 km — most of it covered by light aircraft, none of it covered in a hurry.
            </p>

            <ol className="stops">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <span className="num">{c.numeral}</span>
                  <span>
                    <span className="name">{c.place}</span>
                    <span className="country">{c.country}</span>
                  </span>
                  <span className="nights">{c.nights} {c.nights === 1 ? "night" : "nights"}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="overview-map-wrap">
            <OverviewMap />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Cover, Prologue, Overview });
