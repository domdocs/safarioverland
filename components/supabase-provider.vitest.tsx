/**
 * Regression test — SupabaseProvider must render its children on the
 * server. The previous implementation returned `null` when the browser
 * Supabase client wasn't ready (which is always the case on the server,
 * since `useEffect` doesn't run during SSR). That caused React to bail
 * the entire subtree out of SSR — no `<h1>`s, no per-page JSON-LD, no
 * body content in the initial HTML — silently regressing every field
 * note and listing detail page. Guard against a re-regression here.
 */

import { describe, expect, test, vi } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"

// The provider imports `@/lib/supabase`, which throws at import time if
// the NEXT_PUBLIC_SUPABASE_* env vars aren't set — they aren't in the
// vitest environment. Stub the browser-client factory so the module
// loads cleanly for this test.
vi.mock("@/lib/supabase", () => ({
  getSupabaseBrowserClient: vi.fn(async () => undefined),
}))

import { SupabaseProvider } from "./supabase-provider"

describe("SupabaseProvider — SSR", () => {
  test("renders children during server-side rendering", () => {
    const html = renderToStaticMarkup(
      <SupabaseProvider>
        <p data-testid="ssr-child">visible on the server</p>
      </SupabaseProvider>,
    )
    expect(html).toContain("visible on the server")
    expect(html).toContain('data-testid="ssr-child"')
  })
})
