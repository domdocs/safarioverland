// Transit pages — full-bleed dark sections between chapters

function fromIdFor(t) {
  // map display name → stop id
  const map = {
    "Victoria Falls": "victoria-falls",
    "Chobe": "chobe",
    "Okavango Delta": "okavango",
    "Cape Town": "cape-town",
  };
  return { fromId: map[t.from], toId: map[t.to] };
}

function ModeIcon({ mode }) {
  const m = mode.toLowerCase();
  if (m.includes("road") || m.includes("transfer")) {
    return (
      <svg viewBox="0 0 60 30" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M 4 22 L 18 22 L 22 14 L 38 14 L 44 22 L 56 22" />
        <circle cx="22" cy="22" r="3" fill="currentColor" />
        <circle cx="44" cy="22" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (m.includes("aircraft") || m.includes("flight") || m.includes("bush")) {
    return (
      <svg viewBox="0 0 60 30" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M 4 18 L 24 14 L 30 6 L 36 14 L 56 18 L 50 22 L 30 18 L 28 26 L 22 22 L 16 24 L 14 20 Z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M 4 15 L 56 15" strokeDasharray="3 4" />
    </svg>
  );
}

function Transit({ transit, index }) {
  const { fromId, toId } = fromIdFor(transit);
  return (
    <section className="transit" data-screen-label={`Transit ${index + 1}`}>
      <div className="transit-inner">
        <div>
          <div className="eyebrow">Interlude · transit {index + 1}</div>
          <h3>
            {transit.from}
            <span className="arrow">→</span>
            <br />
            {transit.to}
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
          <TransitMap fromId={fromId} toId={toId} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Transit });
