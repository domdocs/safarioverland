import { readFile } from "node:fs/promises"
import path from "node:path"

/**
 * Generate a tiny base64 blur placeholder for a `/public`-relative
 * image path. Called server-side at render time from page Server
 * Components; the result is interpolated into Next.js's
 * `<Image placeholder="blur" blurDataURL={...} />`.
 *
 * Uses the `plaiceholder` library, which downscales to a few-px
 * thumbnail via sharp and base64-encodes. Output is ~200-400 bytes,
 * inlined into the HTML, so it paints instantly before the real LCP
 * image resolves.
 *
 * Caches per src in-process so the second render of the same hero
 * doesn't re-read the file from disk.
 */

const cache = new Map<string, string>()

const FALLBACK =
  // 1x1 transparent PNG — never visible (we only ever use this as the
  // blur backdrop while the real image loads), but safer than null
  // for components that hard-require a string.
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

/**
 * Lazy-load plaiceholder so it doesn't bundle if no caller actually
 * invokes the helper. Plaiceholder + sharp are heavy and we only want
 * the cost on pages that opt in.
 */
async function loadPlaiceholder() {
  const mod = (await import("plaiceholder")) as unknown as {
    getPlaiceholder: (
      buffer: Buffer,
      opts?: { size?: number },
    ) => Promise<{ base64: string }>
  }
  return mod.getPlaiceholder
}

export async function getBlurDataURL(
  /** Path relative to `/public`, e.g. `/safari-tent.jpg`. */
  publicPath: string,
): Promise<string> {
  if (cache.has(publicPath)) return cache.get(publicPath) as string

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      publicPath.replace(/^\//, ""),
    )
    const buffer = await readFile(filePath)
    const getPlaiceholder = await loadPlaiceholder()
    const { base64 } = await getPlaiceholder(buffer, { size: 10 })
    cache.set(publicPath, base64)
    return base64
  } catch (err) {
    // Never let a missing/unreadable image break a page render. The
    // 1x1 fallback paints transparent and the real image still loads.
    console.warn(`getBlurDataURL: failed for ${publicPath}`, err)
    return FALLBACK
  }
}
