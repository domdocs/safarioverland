/**
 * Allow-list of hosts + path prefixes the Next.js Image optimizer will
 * proxy AND the server-side hero_image validator will accept.
 *
 * Kept in a shared `.mjs` so `next.config.mjs` can import it directly
 * and `lib/upload/hero-image.ts` can consume the same entries. Prevents
 * the two lists drifting — a URL the optimizer would refuse must never
 * reach `articles.hero_image` (which is exactly how a Pexels webpage
 * URL landed on the first published article, causing
 * `400 INVALID_IMAGE_OPTIMIZE_REQUEST` at request time).
 *
 * Each entry follows Next.js's `remotePatterns` schema:
 *   - `protocol`: "https" (never "http" — enforced by the validator too)
 *   - `hostname`: exact host or leading-wildcard host, e.g. "*.supabase.co"
 *   - `pathname`: leading-glob prefix, e.g. "/storage/v1/object/public/**"
 */
export const REMOTE_PATTERNS = [
  {
    protocol: "https",
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },
]
