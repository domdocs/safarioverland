/**
 * Server-side hero_image URL validator.
 *
 * A URL that the Next.js image optimizer will refuse must never reach
 * `articles.hero_image` — the first published article had a Pexels page
 * URL saved as hero, and the optimizer returned
 * `400 INVALID_IMAGE_OPTIMIZE_REQUEST` at request time with `og:image`
 * pointing at an HTML page.
 *
 * The allow-list comes from `lib/images/remote-patterns.mjs`, the same
 * file Next.js reads for `images.remotePatterns`, so the two cannot
 * drift.
 */

import { REMOTE_PATTERNS } from "@/lib/images/remote-patterns.mjs"

const PATTERNS = REMOTE_PATTERNS

/**
 * Match Next.js's `remotePatterns` hostname wildcard rule:
 *   "example.com"    → exact match
 *   "*.example.com"  → any single leading subdomain
 *   "**.example.com" → any depth of leading subdomain
 * (See https://nextjs.org/docs/app/api-reference/next-config-js/images.)
 */
function hostnameMatches(pattern: string, host: string): boolean {
  if (pattern === host) return true
  if (pattern.startsWith("**.")) {
    const tail = pattern.slice(3)
    return host.endsWith(`.${tail}`) || host === tail
  }
  if (pattern.startsWith("*.")) {
    const tail = pattern.slice(2)
    if (host === tail) return false
    if (!host.endsWith(`.${tail}`)) return false
    // Only one leading label allowed.
    const prefix = host.slice(0, -tail.length - 1)
    return prefix.length > 0 && !prefix.includes(".")
  }
  return false
}

/**
 * Match Next.js's `remotePatterns` pathname glob (leading match, with
 * `/**` meaning "any suffix"). Prefix without `**` requires an exact
 * prefix match on path segments.
 */
function pathnameMatches(pattern: string, path: string): boolean {
  if (pattern.endsWith("/**")) {
    const prefix = pattern.slice(0, -3)
    return path === prefix || path.startsWith(`${prefix}/`)
  }
  return path === pattern
}

export function isAllowedHeroImageUrl(input: string): boolean {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    return false
  }
  const protocol = url.protocol.replace(/:$/, "") // "https"
  return PATTERNS.some(
    (p) =>
      p.protocol === protocol &&
      hostnameMatches(p.hostname, url.hostname) &&
      pathnameMatches(p.pathname, url.pathname),
  )
}

/**
 * Human-readable reason a URL was rejected. Used to populate the
 * `message` field alongside the `invalid_hero_image` error code so
 * an unattended routine can surface it in its log.
 */
export function heroImageRejectReason(input: string): string {
  let url: URL
  try {
    url = new URL(input)
  } catch {
    return "hero_image must be an absolute URL"
  }
  const protocol = url.protocol.replace(/:$/, "")
  if (protocol !== "https") {
    return `hero_image must use https: (got "${url.protocol}")`
  }
  return `hero_image host is not on the allow-list — must be a Supabase Storage URL (got "${url.hostname}${url.pathname}")`
}
