/**
 * Shared embed renderer.
 *
 * Resolves the Calendly (or Cal.com) URL from `NEXT_PUBLIC_CALENDLY_URL`
 * and either renders the iframe or a graceful fallback when the URL
 * hasn't been wired up yet. Niels' calendar is still being set up — the
 * fallback keeps the CTA usable in the meantime.
 *
 * Works for both Calendly and Cal.com; their inline-iframe contracts
 * are interchangeable.
 */

const FALLBACK_EMAIL = "hello@safarioverland.com"

function getUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()
  if (!raw) return null
  try {
    new URL(raw)
    return raw
  } catch {
    return null
  }
}

type Props = {
  /** Iframe height. Calendly recommends ~700px to fit picker + form. */
  height?: number
  /** Optional inline tone — used on the dark page surfaces. */
  className?: string
}

export function PlannerCallEmbed({ height = 720, className }: Props) {
  const url = getUrl()
  if (!url) {
    return (
      <div className={className}>
        <p className="font-serif italic text-bone-mute leading-relaxed">
          The calendar isn&apos;t live yet — we&apos;re finishing setup
          this week. For now, write to{" "}
          <a
            href={`mailto:${FALLBACK_EMAIL}`}
            className="text-amber hover:text-amber-deep transition-colors"
          >
            {FALLBACK_EMAIL}
          </a>{" "}
          with a few times that work and a planner will come back the
          same day.
        </p>
      </div>
    )
  }

  // Append `embed_domain` + `embed_type=Inline` for Calendly so it
  // renders without their own chrome. Cal.com ignores both — safe to
  // include either way.
  const embedSrc = (() => {
    const u = new URL(url)
    if (!u.searchParams.has("embed_domain")) {
      u.searchParams.set(
        "embed_domain",
        typeof window === "undefined" ? "safarioverland.com" : window.location.host,
      )
    }
    if (!u.searchParams.has("embed_type")) {
      u.searchParams.set("embed_type", "Inline")
    }
    return u.toString()
  })()

  return (
    <iframe
      src={embedSrc}
      title="Book a 30-minute call with a planner"
      className={className}
      style={{ width: "100%", height, border: 0, background: "transparent" }}
      loading="lazy"
    />
  )
}
