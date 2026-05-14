// Destination chapter — recurring section for each place

function ChapterHero({ chapter }) {
  return (
    <div className="chapter-hero">
      <image-slot
        id={`hero-${chapter.id}`}
        shape="rect"
        placeholder={`Drop a hero photo — ${chapter.place}`}
      ></image-slot>
      <div className="label">
        <div className="numeral-big">{chapter.numeral}</div>
        <div>
          <h2>{chapter.place}</h2>
          <div className="place-meta">
            <span>{chapter.country}</span>
            <span>·</span>
            <span>{chapter.coords.lat.toFixed(3)}°S, {chapter.coords.lon.toFixed(3)}°E</span>
          </div>
        </div>
        <div className="dates">
          <div className="when">{chapter.dates}</div>
          <div className="nights">{chapter.nights} {chapter.nights === 1 ? "night" : "nights"}</div>
        </div>
      </div>
    </div>
  );
}

function ChapterIntro({ chapter }) {
  return (
    <div className="chapter-intro">
      <div className="left">
        <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          Chapter <span className="numeral">{chapter.numeral}</span> · The place
        </div>
        <p className="epigraph">{chapter.epigraph}</p>
      </div>
      <div className="right">
        {chapter.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

function Lodge({ chapter }) {
  const l = chapter.lodge;
  return (
    <div className="lodge">
      <div className="photo">
        <image-slot
          id={`${l.photoId}`}
          shape="rect"
          placeholder={`${l.name} — drop a lodge photo`}
        ></image-slot>
      </div>
      <div className="text">
        <div className="kind">Where you sleep — {l.kind}</div>
        <h3>{l.name}</h3>
        <div className="room">{l.room}</div>
        <p>{l.blurb}</p>
        <ul className="amenities">
          {l.amenities.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Rhythm({ chapter }) {
  return (
    <div className="rhythm-section">
      <div className="rhythm-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: "1.5rem" }}>How the days unfold</div>
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
  );
}

function SeeingAndNote({ chapter, showCuratorNote }) {
  return (
    <div className="seeing-note">
      <div className="seeing">
        <div className="eyebrow" style={{ marginBottom: "1rem" }}>What you'll see</div>
        <h3>The field guide, in short.</h3>
        <ul className="seeing-list">
          {chapter.seeing.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      {showCuratorNote && (
        <div className="note">
          <div className="note-card">
            {chapter.note}
            <span className="sig">— Tom, from Vic Falls</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Chapter({ chapter, showCuratorNote }) {
  return (
    <section className="chapter" id={chapter.id} data-screen-label={`${(parseInt(["I","II","III","IV"].indexOf(chapter.numeral)) + 4).toString().padStart(2, "0")} ${chapter.place}`}>
      <ChapterHero chapter={chapter} />
      <ChapterIntro chapter={chapter} />
      <Lodge chapter={chapter} />
      <Rhythm chapter={chapter} />
      <SeeingAndNote chapter={chapter} showCuratorNote={showCuratorNote} />
    </section>
  );
}

Object.assign(window, { Chapter });
