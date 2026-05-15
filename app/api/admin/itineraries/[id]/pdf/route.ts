import { NextRequest, NextResponse } from "next/server"

import { getItinerary } from "@/lib/itineraries"
import { generateItineraryPdf } from "@/lib/pdf/generate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Puppeteer + image-load + PDF rasterise on a cold function can take
// 8-15 s. 60 s gives plenty of headroom even for chunky chapters.
export const maxDuration = 60

/**
 * GET /api/admin/itineraries/[id]/pdf
 *
 * Generates a print-ready A4 PDF of the itinerary by booting headless
 * Chromium, navigating it to the same /admin/itineraries/[id]/preview
 * page Niels uses on screen, and capturing the print render via
 * `page.pdf()`. Output streams back as a download with a filename of
 * the form `SO-2026-0001-Whitford-2026-09.pdf` (the convention from
 * the design handoff §8).
 *
 * Auth: covered by the existing admin Basic Auth middleware for the
 * caller. Puppeteer needs the same credentials to fetch the preview
 * route — they're forwarded from the request's Authorization header
 * (preferred, so the credentials never leave the request) with a
 * fallback to ADMIN_USERNAME / ADMIN_PASSWORD env vars when running
 * locally without a real auth header (e.g. via curl during dev).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  const data = await getItinerary(id)
  if (!data) {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }

  // ── Resolve credentials ─────────────────────────────────────────────
  const credentials = resolveBasicAuth(request)
  if (!credentials) {
    return NextResponse.json(
      { error: "admin credentials not available to generate PDF" },
      { status: 500 },
    )
  }

  // ── Construct the preview URL on the current deployment ────────────
  // x-forwarded-proto is set by Vercel/most proxies; falls back to https
  // unless we're explicitly on localhost.
  const host = request.headers.get("host")
  if (!host) {
    return NextResponse.json(
      { error: "missing host header" },
      { status: 500 },
    )
  }
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https")
  const previewUrl = `${protocol}://${host}/admin/itineraries/${id}/preview`

  try {
    const pdf = await generateItineraryPdf({
      url: previewUrl,
      basicAuth: credentials,
      // Vercel Deployment Protection on preview deployments wraps the
      // app in an SSO check (separate from our admin Basic Auth). The
      // caller's browser has the _vercel_jwt cookie set; forwarding the
      // raw Cookie header gets Puppeteer past that login screen.
      cookieHeader: request.headers.get("cookie") ?? undefined,
    })

    const filename = buildFilename(data.itinerary)

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    console.error(`PDF generation failed for itinerary ${id}`, err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 },
    )
  }
}

function resolveBasicAuth(
  request: NextRequest,
): { user: string; pass: string } | null {
  // Prefer the credentials Niels just authenticated with — that way the
  // service-role env fallback isn't needed in production.
  const header = request.headers.get("authorization") ?? ""
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6))
      const idx = decoded.indexOf(":")
      if (idx > 0) {
        return {
          user: decoded.slice(0, idx),
          pass: decoded.slice(idx + 1),
        }
      }
    } catch {
      // Fall through to env fallback.
    }
  }

  const user = process.env.ADMIN_USERNAME
  const pass = process.env.ADMIN_PASSWORD
  if (!user || !pass) return null
  return { user, pass }
}

function buildFilename(itinerary: {
  reference: string
  guests: string[]
  dates_year: string | null
  updated_at: string
}): string {
  // SO-YYYY-NNNN-LASTNAME-YYYY-MM.pdf — per design handoff §8.
  const lastName =
    itinerary.guests[0]?.split(/\s+/).filter(Boolean).pop() ?? "trip"
  const yyyy =
    itinerary.dates_year ?? new Date(itinerary.updated_at).getFullYear()
  const mm = new Date(itinerary.updated_at)
    .toLocaleString("en-GB", { month: "2-digit" })
    .padStart(2, "0")
  const safe = (s: string) =>
    s
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "")
  return `${safe(itinerary.reference)}-${safe(lastName)}-${yyyy}-${mm}.pdf`
}
