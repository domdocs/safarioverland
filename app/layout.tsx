import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"
import { DownloadGateProvider } from "@/components/download-gate-provider"
import { VercelProviders } from "@/components/analytics/vercel-providers"
import Script from "next/script"

// Editorial typography — wired via CSS variables, picked up in tailwind.config.ts
// and globals.css (--font-serif / --font-sans / --font-mono).
// Cormorant Garamond is the free fallback for the licensed serif (GT Sectra /
// Tiempos Headline) — the variable stays the same when the licensed woff2 lands.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
})
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://safarioverland.com"),
  title: {
    default: "Safari Overland — A small collection of African safaris, by hand",
    template: "%s | Safari Overland",
  },
  description:
    "A small, opinionated collection of African lodges and operators chosen for what the wild does to you — not just what it shows you. Curated from Victoria Falls.",
  manifest: "/manifest.json",
  applicationName: "Safari Overland",
  keywords: [
    "African safari",
    "safari operators",
    "safari lodges",
    "safari planning",
    "Africa travel",
    "wildlife conservation",
    "safari guides",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safarioverland.com",
    siteName: "Safari Overland",
    title: "Safari Overland — A small collection of African safaris, by hand",
    description:
      "A curated collection of African lodges and operators — chosen for what the wild does to you, not just what it shows you. Field notes, planning briefs, and an honest second opinion. From Victoria Falls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safari Overland — A small collection of African safaris, by hand",
    description:
      "A curated collection of African lodges and operators — chosen for what the wild does to you, not just what it shows you. From Victoria Falls.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  themeColor: "#0E110F", // night — matches the cinematic dark theme
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0F0QHDH7T0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0F0QHDH7T0');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <SupabaseProvider>
            <DownloadGateProvider>
              {children}
              <Toaster />
            </DownloadGateProvider>
          </SupabaseProvider>
        </ThemeProvider>
        {/*
         * Vercel Web Analytics + Speed Insights.
         *
         * Wrapped in a "use client" island so the beforeSend functions
         * (which filter /admin/* from both dashboards) live on the
         * client side of the RSC boundary. The custom events fired
         * via lib/analytics/track.ts are also gated on /admin/* — see
         * handoff/ANALYTICS.md for the full taxonomy.
         *
         * Cookieless, no PII by design.
         */}
        <VercelProviders />
      </body>
    </html>
  )
}