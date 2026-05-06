import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * HTTP Basic Auth gate for /admin/* and /api/admin/*.
 *
 * Pragmatic interim auth — replace with proper Supabase auth + role check once
 * the sign-in form (currently a stub) is built out. Until then this is the
 * minimum bar to keep the subscriber list out of public hands.
 *
 * Required env vars (set in Vercel project settings):
 *   ADMIN_USERNAME, ADMIN_PASSWORD
 *
 * If either is unset the middleware returns 503 — failing closed is preferable
 * to silently leaving the admin section open if config drifts.
 */

const REALM = "Safari Overland Admin"

function unauthorized(message = "Authentication required.") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

/** Constant-time string comparison — guards against timing attacks. */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

function isAdminPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  )
}

export function middleware(request: NextRequest) {
  // Belt-and-braces: even though the matcher narrows to admin paths,
  // explicitly bail on anything else so non-admin routes are guaranteed untouched.
  if (!isAdminPath(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Admin auth is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.",
      {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      },
    )
  }

  const auth = request.headers.get("authorization")
  if (!auth || !auth.toLowerCase().startsWith("basic ")) {
    return unauthorized()
  }

  let decoded: string
  try {
    decoded = atob(auth.slice("Basic ".length).trim())
  } catch {
    return unauthorized()
  }

  const colon = decoded.indexOf(":")
  if (colon < 0) return unauthorized()

  const user = decoded.slice(0, colon)
  const pass = decoded.slice(colon + 1)

  // Compare BOTH halves even on early mismatch so we don't leak length differences via timing.
  const userOk = safeCompare(user, expectedUser)
  const passOk = safeCompare(pass, expectedPass)
  if (!userOk || !passOk) {
    return unauthorized()
  }

  return NextResponse.next()
}

export const config = {
  // Match all paths except Next.js internals, the favicon, and public assets.
  // The function itself bails immediately on non-admin paths via isAdminPath().
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
