// SVG maps — editorial / illustrated style.
// Stylized southern Africa with the route plotted. Country shapes are
// hand-traced approximations, not survey-grade; the point is atmosphere.

const { useId } = React;

// ── projection (rough, stylized) ────────────────────────────────────────
// lon 10°E → 36°E, lat -36°S → -8°S, mapped into a 800×900 viewBox.
const X0 = 10, X1 = 36, Y0 = -36, Y1 = -8;
const VW = 800, VH = 900;
function proj(lon, lat) {
  const x = ((lon - X0) / (X1 - X0)) * VW;
  const y = (1 - (lat - Y0) / (Y1 - Y0)) * VH;
  return { x, y };
}

// Pre-projected stops
const STOPS = {
  "victoria-falls": { ...proj(25.857, -17.924), label: "Victoria Falls" },
  "chobe":          { ...proj(25.165, -17.819), label: "Chobe" },
  "okavango":       { ...proj(22.847, -19.282), label: "Okavango Delta" },
  "cape-town":      { ...proj(18.424, -33.925), label: "Cape Town" },
};

// ── country outlines (stylized polygons) ────────────────────────────────
// Hand-traced from memory; designed to read as a regional sketch, not a survey.
const COUNTRIES = [
  {
    name: "ANGOLA",
    d: "M 80 180 L 350 175 L 360 240 L 380 320 L 350 360 L 270 365 L 170 355 L 110 320 L 80 250 Z",
    labelAt: [200, 270],
  },
  {
    name: "ZAMBIA",
    d: "M 360 240 L 540 230 L 600 270 L 615 305 L 555 335 L 480 340 L 420 345 L 380 320 Z",
    labelAt: [475, 290],
  },
  {
    name: "MOZAMBIQUE",
    d: "M 620 260 L 680 280 L 700 360 L 720 460 L 715 560 L 680 640 L 650 660 L 615 580 L 600 480 L 590 410 L 610 340 Z",
    labelAt: [665, 470],
  },
  {
    name: "ZIMBABWE",
    d: "M 460 345 L 600 335 L 615 410 L 600 465 L 530 480 L 460 460 L 430 415 Z",
    labelAt: [520, 410],
  },
  {
    name: "NAMIBIA",
    d: "M 110 320 L 270 365 L 305 410 L 330 480 L 340 565 L 295 605 L 220 600 L 180 555 L 145 480 L 115 410 Z",
    labelAt: [220, 480],
  },
  {
    name: "BOTSWANA",
    d: "M 305 410 L 460 410 L 470 470 L 500 530 L 470 590 L 380 605 L 330 595 L 320 540 L 320 480 Z",
    labelAt: [395, 510],
  },
  {
    name: "SOUTH AFRICA",
    d: "M 145 605 L 300 605 L 380 605 L 470 595 L 530 605 L 600 615 L 615 670 L 580 740 L 490 810 L 380 855 L 290 845 L 220 800 L 175 740 L 150 680 Z",
    labelAt: [380, 720],
  },
  {
    name: "LESOTHO",
    d: "M 430 760 L 470 750 L 485 780 L 470 800 L 430 795 Z",
    labelAt: [455, 778],
  },
  {
    name: "ESWATINI",
    d: "M 555 695 L 575 690 L 580 715 L 565 720 Z",
    labelAt: [567, 707],
  },
];

// ── ocean / decorative lines ────────────────────────────────────────────
function OceanHatch() {
  return (
    <g opacity="0.35">
      {Array.from({ length: 20 }).map((_, i) => (
        <path
          key={i}
          d={`M ${-50 + i * 18} ${VH - 20} q 40 -8 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={0.4 + Math.sin(i) * 0.2}
        />
      ))}
    </g>
  );
}

// ── compass rose ────────────────────────────────────────────────────────
function Compass({ x = 70, y = 110 }) {
  return (
    <g transform={`translate(${x} ${y})`} fontFamily="var(--display)" fontSize="11">
      <circle r="28" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <circle r="3" fill="currentColor" />
      <path d="M 0 -34 L 4 0 L 0 8 L -4 0 Z" fill="currentColor" />
      <path d="M 0 34 L 4 0 L 0 -8 L -4 0 Z" fill="currentColor" opacity="0.5" />
      <text x="0" y="-40" textAnchor="middle" fontStyle="italic">N</text>
      <text x="0" y="48" textAnchor="middle" fontStyle="italic" opacity="0.6">S</text>
    </g>
  );
}

// ── scale bar ───────────────────────────────────────────────────────────
function Scale({ x = 540, y = 850 }) {
  return (
    <g transform={`translate(${x} ${y})`} fontFamily="var(--sans)" fontSize="9" letterSpacing="0.15em">
      <line x1="0" y1="0" x2="180" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="-4" x2="0" y2="4" stroke="currentColor" />
      <line x1="60" y1="-4" x2="60" y2="4" stroke="currentColor" />
      <line x1="120" y1="-4" x2="120" y2="4" stroke="currentColor" />
      <line x1="180" y1="-4" x2="180" y2="4" stroke="currentColor" />
      <text x="0" y="18" textAnchor="middle" opacity="0.7">0</text>
      <text x="90" y="18" textAnchor="middle" opacity="0.7">300</text>
      <text x="180" y="18" textAnchor="middle" opacity="0.7">600 KM</text>
    </g>
  );
}

function Frame() {
  return (
    <g>
      <rect x="6" y="6" width={VW - 12} height={VH - 12} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <rect x="14" y="14" width={VW - 28} height={VH - 28} fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
    </g>
  );
}

// ── overview map ────────────────────────────────────────────────────────
function OverviewMap({ stops = ["victoria-falls", "chobe", "okavango", "cape-town"] }) {
  const path = stops.map((id, i) => {
    const s = STOPS[id];
    return `${i === 0 ? "M" : "L"} ${s.x.toFixed(1)} ${s.y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} style={{ color: "var(--ink)" }}>
      <Frame />
      {/* ocean texture */}
      <g style={{ color: "var(--quiet)" }}>
        <OceanHatch />
      </g>

      {/* countries */}
      <g>
        {COUNTRIES.map((c) => (
          <g key={c.name}>
            <path
              d={c.d}
              fill="var(--bone)"
              stroke="var(--ink-soft)"
              strokeWidth="0.9"
              strokeLinejoin="round"
              opacity="0.95"
            />
          </g>
        ))}
        {/* light fill for non-route countries */}
        {COUNTRIES.map((c) => (
          <text
            key={c.name + "l"}
            x={c.labelAt[0]}
            y={c.labelAt[1]}
            textAnchor="middle"
            fontFamily="var(--sans)"
            fontSize={c.name.length > 8 ? "8.5" : "10"}
            letterSpacing="0.32em"
            fill="var(--quiet)"
            opacity="0.7"
          >
            {c.name}
          </text>
        ))}
      </g>

      {/* the route */}
      <g>
        <path
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {/* stops */}
        {stops.map((id, i) => {
          const s = STOPS[id];
          // label placement — alternate sides to avoid collision
          const right = id === "chobe" || id === "cape-town";
          const labelX = s.x + (right ? 16 : -16);
          const numeral = ["I","II","III","IV"][i];
          return (
            <g key={id}>
              <circle cx={s.x} cy={s.y} r="9" fill="var(--bone)" stroke="var(--accent-deep)" strokeWidth="1.5" />
              <circle cx={s.x} cy={s.y} r="3.5" fill="var(--accent-deep)" />
              <text
                x={labelX}
                y={s.y - 12}
                textAnchor={right ? "start" : "end"}
                fontFamily="var(--display)"
                fontStyle="italic"
                fontSize="22"
                fill="var(--ink)"
              >
                {s.label}
              </text>
              <text
                x={labelX}
                y={s.y + 5}
                textAnchor={right ? "start" : "end"}
                fontFamily="var(--sans)"
                fontSize="10"
                letterSpacing="0.22em"
                fill="var(--accent-deep)"
              >
                {numeral} · STOP {i + 1}
              </text>
            </g>
          );
        })}
      </g>

      <Compass />
      <Scale />

      {/* caption */}
      <g fontFamily="var(--display)" fontStyle="italic">
        <text x={VW / 2} y="60" textAnchor="middle" fontSize="20" fill="var(--ink)" opacity="0.85">
          The Route — Southern Africa
        </text>
        <text x={VW / 2} y="80" textAnchor="middle" fontSize="11" fontStyle="normal" fontFamily="var(--sans)" letterSpacing="0.32em" fill="var(--quiet)">
          14 — 24 SEPTEMBER 2026  ·  ≈ 2,500 KM
        </text>
      </g>
    </svg>
  );
}

// ── inset (transit) map ────────────────────────────────────────────────
// Renders just the leg between two stops, with their immediate neighbourhood.
function TransitMap({ fromId, toId }) {
  const from = STOPS[fromId];
  const to = STOPS[toId];
  if (!from || !to) return null;

  // bounding box of the two stops + padding
  const padX = Math.max(60, Math.abs(to.x - from.x) * 0.6);
  const padY = Math.max(60, Math.abs(to.y - from.y) * 0.6);
  const minX = Math.min(from.x, to.x) - padX;
  const minY = Math.min(from.y, to.y) - padY;
  const w = Math.abs(to.x - from.x) + padX * 2;
  const h = Math.abs(to.y - from.y) + padY * 2;

  // Find countries whose label is within view (for atmosphere)
  const visibleCountries = COUNTRIES.filter((c) =>
    c.labelAt[0] > minX - 40 && c.labelAt[0] < minX + w + 40 &&
    c.labelAt[1] > minY - 40 && c.labelAt[1] < minY + h + 40
  );

  return (
    <svg viewBox={`${minX} ${minY} ${w} ${h}`} style={{ color: "var(--bone)" }}>
      {/* country outlines */}
      {COUNTRIES.map((c) => (
        <path
          key={c.name}
          d={c.d}
          fill="none"
          stroke="var(--paper)"
          strokeWidth="0.8"
          opacity="0.4"
          strokeLinejoin="round"
        />
      ))}
      {visibleCountries.map((c) => (
        <text
          key={c.name}
          x={c.labelAt[0]}
          y={c.labelAt[1]}
          textAnchor="middle"
          fontFamily="var(--sans)"
          fontSize={Math.min(w, h) * 0.025}
          letterSpacing="0.32em"
          fill="var(--paper)"
          opacity="0.45"
        >
          {c.name}
        </text>
      ))}

      {/* route line */}
      <path
        d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={Math.min(w, h) * 0.006}
        strokeDasharray={`${Math.min(w, h) * 0.008} ${Math.min(w, h) * 0.02}`}
        strokeLinecap="round"
      />

      {/* stops */}
      {[from, to].map((s, i) => {
        const r = Math.min(w, h) * 0.022;
        return (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={r} fill="var(--ink)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx={s.x} cy={s.y} r={r * 0.35} fill="var(--accent)" />
            <text
              x={s.x}
              y={s.y - r - 6}
              textAnchor="middle"
              fontFamily="var(--display)"
              fontStyle="italic"
              fontSize={Math.min(w, h) * 0.045}
              fill="var(--bone)"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { OverviewMap, TransitMap, STOPS });
