import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"
import { DownloadGateProvider } from "@/components/download-gate-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://safarioverland.com"),
  title: {
    default: "Safari Overland — African safari operators, lodges & travel guides",
    template: "%s | Safari Overland",
  },
  description:
    "A directory of African safari operators, lodges, and travel resources, with editorial planning guides, seasonal information and conservation content.",
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
    title: "Safari Overland — African safari operators, lodges & travel guides",
    description:
      "Discover safari operators, lodges and travel resources across Africa. Plan your trip with our editorial guides, seasonal advice, and conservation stories.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safari Overland — African safari operators, lodges & travel guides",
    description:
      "Discover safari operators, lodges and travel resources across Africa. Plan your trip with our editorial guides, seasonal advice, and conservation stories.",
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
  themeColor: "#4D6C7F",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <DownloadGateProvider>
              {children}
              <Toaster />
            </DownloadGateProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'