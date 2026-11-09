import { REMOTE_PATTERNS } from "./lib/images/remote-patterns.mjs"

let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Vercel image optimization on. The CDN resizes + serves AVIF/WebP
    // on the fly and caches per device-pixel-ratio at the edge —
    // listings load fast even when the raw Supabase Storage source is
    // multi-megabyte.
    //
    // - AVIF first so modern browsers get the smallest payload
    //   (~25-50% smaller than WebP at equivalent quality).
    // - Explicit deviceSizes / imageSizes so the optimizer picks
    //   correctly for editorial heroes (large) and avatars/icons
    //   (small) without falling back to Next's defaults.
    // - minimumCacheTTL: 1 year — image content is immutable per
    //   storage path (Vercel & sharp pipeline both fingerprint),
    //   so long caches are safe.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    //
    // remotePatterns whitelists hosts the optimizer is allowed to proxy.
    // Shared with the API-side hero_image validator via
    // `lib/images/remote-patterns.mjs` so the two lists cannot drift —
    // a URL the optimizer would refuse must never reach the DB.
    remotePatterns: REMOTE_PATTERNS,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // 301 redirects from the old /resources tree to the new
  // /field-notes tree. The folder rename moved every URL; these
  // catch anyone who still has a /resources link bookmarked or
  // syndicated externally. Permanent (308 in Next.js's terminology,
  // which preserves the request method — same SEO effect as a 301).
  async redirects() {
    return [
      { source: "/resources",        destination: "/field-notes",        permanent: true },
      { source: "/resources/:path*", destination: "/field-notes/:path*", permanent: true },
      // Self-drive relaunch: southern Africa is the only region. The
      // off-region atlas pages and the /destinations index were deleted
      // in the same change, so nothing sits unreachable behind these.
      { source: "/destinations",              destination: "/destinations/southern-africa", permanent: true },
      { source: "/destinations/east-africa",  destination: "/destinations/southern-africa", permanent: true },
      { source: "/destinations/west-africa",  destination: "/destinations/southern-africa", permanent: true },
      { source: "/destinations/north-africa", destination: "/destinations/southern-africa", permanent: true },
      // Legacy directory-era URL (404 on production). /submit is left
      // alone pending Dom's decision (D-06).
      { source: "/community",                 destination: "/about",                        permanent: true },
      // Off-region Field Notes deleted in the self-drive relaunch
      // (inventory: handoff/relaunch/FIELD_NOTES_CLEANUP.md). Each goes to
      // the closest surviving section index.
      ...[
        "egypt", "morocco", "ghana", "senegal", "kenya", "tanzania",
        "uganda-rwanda", "west-africa", "north-africa-birds",
        "gorilla-trekking", "great-migration", "bird-watching",
      ].map((slug) => ({
        source: `/field-notes/seasonal-guides/${slug}`,
        destination: "/field-notes/seasonal-guides",
        permanent: true,
      })),
      ...["kenya-corridors", "mountain-gorillas"].map((slug) => ({
        source: `/field-notes/conservation/success-stories/${slug}`,
        destination: "/field-notes/conservation",
        permanent: true,
      })),
      ...["east-vs-southern", "wildlife-events", "off-the-beaten-path"].map((slug) => ({
        source: `/field-notes/planning-guides/${slug}`,
        destination: "/field-notes/planning-guides",
        permanent: true,
      })),
    ]
  },
  // Puppeteer and the slim Chromium binary need to stay outside the
  // Next.js webpack bundle — they're heavy and rely on native module
  // loading at runtime. serverExternalPackages keeps them as plain
  // require()s in the Vercel function bundle. (Sharp was already in
  // serverComponentsExternalPackages by Next.js default for the same
  // reason.)
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium", "puppeteer"],
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
