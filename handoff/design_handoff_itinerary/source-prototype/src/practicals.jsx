// Practicals — back matter

const PRACTICAL_CARDS = [
  {
    title: "Included",
    body: (
      <ul>
        <li>All accommodation, listed</li>
        <li>All transfers, transits & internal flights</li>
        <li>All activities specified in the rhythm</li>
        <li>Park & conservancy fees</li>
        <li>Meals & house drinks at camps</li>
        <li>Local SIM card at Vic Falls</li>
      </ul>
    ),
  },
  {
    title: "Not Included",
    body: (
      <ul>
        <li>International flights to/from CPT &amp; VFA</li>
        <li>Visa fees (≈ $50 USD on arrival, Zim &amp; Bots)</li>
        <li>Travel insurance — required, not optional</li>
        <li>Premium spirits & wine pairings</li>
        <li>Gratuities (we'll brief you separately)</li>
      </ul>
    ),
  },
  {
    title: "Weather, September",
    body: (
      <ul>
        <li>Vic Falls / Chobe: 14–32°C, dry, full spray on the Falls</li>
        <li>Delta: 10–34°C, dry, high water still flooding</li>
        <li>Cape Town: 10–20°C, late winter — pack a fleece</li>
      </ul>
    ),
  },
  {
    title: "Packing, in essence",
    body: (
      <ul>
        <li>Soft duffel bag (hard cases won't fit the bush plane)</li>
        <li>20 kg total on Delta sector — we forward overflow to Cape Town</li>
        <li>Neutrals for the bush, layers for Cape Town</li>
        <li>Binoculars (8×42 if you have them)</li>
        <li>Adapters: Type G (UK) in Zim & Bots; Type M in SA</li>
      </ul>
    ),
  },
  {
    title: "Health & visas",
    body: (
      <ul>
        <li>Visas on arrival, both countries — bring USD cash</li>
        <li>Yellow Fever: not required from UK/EU/US direct</li>
        <li>Malaria: prophylaxis advised, Vic Falls — Delta</li>
        <li>Routine boosters up to date</li>
      </ul>
    ),
  },
  {
    title: "On the ground",
    body: (
      <p>
        Tom is your single point of contact for the trip. WhatsApp +263 71 234 5678 — read at all hours, answered within thirty minutes during waking hours (CAT). Local hosts at each lodge are briefed; you will be met at every airstrip.
      </p>
    ),
  },
];

function Practicals() {
  return (
    <section className="practicals" data-screen-label="Practicals">
      <div className="practicals-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>The fine print</div>
          <h2>The practical bits.</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "1.02rem", marginTop: "1.2rem", lineHeight: 1.65 }}>
            We have kept these short on purpose. Anything you need from us beyond what is here — call.
          </p>
        </div>
        <div className="cards">
          {PRACTICAL_CARDS.map((c) => (
            <div key={c.title} className="practical-card">
              <h4>{c.title}</h4>
              {c.body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignOff({ trip }) {
  return (
    <section className="signoff" data-screen-label="Sign-off">
      <p className="farewell">
        We will see you on the river.
      </p>
      <div style={{ marginTop: "2rem", fontFamily: "var(--display)", fontStyle: "italic", color: "var(--quiet)", fontSize: "1.1rem" }}>
        Until then,
      </div>
      <div className="sig-card">Tom</div>
      <div className="curator-meta">
        {trip.curator.name} · {trip.curator.title}<br />
        {trip.curator.location}
      </div>

      <div className="colophon">
        <span>Safari Overland — Curated from Victoria Falls</span>
        <span>{trip.reference}</span>
        <span>Document v.1 · Issued {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
      </div>
    </section>
  );
}

Object.assign(window, { Practicals, SignOff });
