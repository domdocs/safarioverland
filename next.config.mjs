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
    // Vercel image optimization on. The CDN resizes + serves WebP on the
    // fly and caches per device-pixel-ratio at the edge — listings load
    // fast even when the raw Supabase Storage source is multi-megabyte.
    //
    // remotePatterns whitelists hosts the optimizer is allowed to proxy.
    // *.supabase.co covers the `listing-media` bucket and any future
    // public-asset URLs from the same project.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
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
