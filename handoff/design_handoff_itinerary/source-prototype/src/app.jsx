// Root app — assembles the whole document.

const { useEffect, useState } = React;

function ProgressNav({ sections }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="progress" aria-label="Jump to section">
      {sections.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className={i === active ? "is-active" : ""}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}

// ── Custom palette swatch (multi-color rows) ───────────────────────────
function PaletteSwatch({ label, value, onChange, options, optionLabels, optionValues }) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <div style={{ fontFamily: "var(--sans, sans-serif)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.6rem" }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: "0.5rem" }}>
        {options.map((swatches, i) => {
          const v = optionValues[i];
          const active = v === value;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                background: "transparent",
                border: active ? "1.5px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.15)",
                padding: "0.35rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                borderRadius: "4px",
              }}
            >
              <div style={{ display: "flex", height: "26px", borderRadius: "2px", overflow: "hidden" }}>
                {swatches.map((c, j) => (
                  <div key={j} style={{ flex: 1, background: c }} />
                ))}
              </div>
              <div style={{ fontFamily: "var(--sans, sans-serif)", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", textAlign: "left" }}>
                {optionLabels[i]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── tweaks defaults ──────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "savanna",
  "typography": "editorial",
  "density": "spacious",
  "showCuratorNotes": true,
  "showProgressNav": true
}/*EDITMODE-END*/;

function App() {
  const { TRIP, CHAPTERS, TRANSITS } = window.TRIP_DATA;
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync data attributes on <html> so CSS vars can switch
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-palette", tw.palette);
    html.setAttribute("data-typography", tw.typography);
    html.setAttribute("data-density", tw.density);
  }, [tw.palette, tw.typography, tw.density]);

  const sections = [
    { id: "cover", label: "Cover" },
    { id: "prologue", label: "Prologue" },
    { id: "route", label: "The Route" },
    ...CHAPTERS.map((c) => ({ id: c.id, label: c.place })),
    { id: "practicals", label: "Practicals" },
    { id: "signoff", label: "Sign-off" },
  ];

  return (
    <>
      {tw.showProgressNav && <ProgressNav sections={sections} />}

      <div id="cover"><Cover trip={TRIP} /></div>
      <div id="prologue"><Prologue trip={TRIP} /></div>
      <div id="route"><Overview trip={TRIP} chapters={CHAPTERS} /></div>

      {CHAPTERS.map((c, i) => (
        <React.Fragment key={c.id}>
          <div id={c.id}>
            <Chapter chapter={c} showCuratorNote={tw.showCuratorNotes} />
          </div>
          {TRANSITS[i] && <Transit transit={TRANSITS[i]} index={i} />}
        </React.Fragment>
      ))}

      <div id="practicals"><Practicals /></div>
      <div id="signoff"><SignOff trip={TRIP} /></div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <PaletteSwatch
            label="Mood"
            value={tw.palette}
            onChange={(v) => setTweak("palette", v)}
            options={[
              ["#f3ead8", "#a86b1e", "#6e3f0d", "#1a160e"],
              ["#ece6d4", "#335c3a", "#1f3a25", "#16201a"],
              ["#ecebe2", "#2f5468", "#16313f", "#16202a"],
            ]}
            optionLabels={["Savanna", "Forest", "Coast"]}
            optionValues={["savanna", "forest", "coast"]}
          />
        </TweakSection>

        <TweakSection title="Typography">
          <TweakRadio
            label="Pairing"
            value={tw.typography}
            onChange={(v) => setTweak("typography", v)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "modern", label: "Modern" },
              { value: "classic", label: "Classic" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Layout">
          <TweakRadio
            label="Density"
            value={tw.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "spacious", label: "Spacious" },
              { value: "compact", label: "Compact" },
            ]}
          />
          <TweakToggle
            label="Curator's notes"
            value={tw.showCuratorNotes}
            onChange={(v) => setTweak("showCuratorNotes", v)}
          />
          <TweakToggle
            label="Side progress nav"
            value={tw.showProgressNav}
            onChange={(v) => setTweak("showProgressNav", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

window.App = App;
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
