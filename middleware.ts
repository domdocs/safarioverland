import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * HTTP Basic Auth gate for /admin/* and /api/admin/*.
 *
 * Pragmatic interim auth — replace with proper Supabase auth + role check
 * once the sign-in form is built out. Until then this keeps the subscriber
 * list out of public hands.
 *
 * Required env vars (set in Vercel project settings, all environments):
 *   ADMIN_USERNAME, ADMIN_PASSWORD
 *
 * If either is unset the middleware returns 503 — failing closed is preferable
 * to silently leaving the admin section open if config drifts.
 */

export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPass) {
    return new NextResponse("Admin auth is not configured.", {
      status: 503,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }

  const auth = request.headers.get("authorization") ?? ""
  if (!auth.startsWith("Basic ")) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Safari Overland Admin"',
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }

  let decoded: string
  try {
    decoded = atob(auth.slice(6))
  } catch {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Safari Overland Admin"',
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }

  const idx = decoded.indexOf(":")
  const user = idx < 0 ? "" : decoded.slice(0, idx)
  const pass = idx < 0 ? "" : decoded.slice(idx + 1)

  if (user !== expectedUser || pass !== expectedPass) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Safari Overland Admin"',
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }

  return NextResponse.next()
}

// Narrow matcher: middleware only runs on admin surfaces. Everything else is
// untouched — no risk of a middleware bug breaking the public site.
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
