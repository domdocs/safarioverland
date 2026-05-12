import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

/**
 * Vitest config — paired with @testing-library/react for component tests.
 * The existing node:test files under lib/listings/ continue to run via
 * `tsx --test`; vitest only picks up *.vitest.{ts,tsx} (see `include`).
 *
 * The path alias mirrors tsconfig.json so component files importing
 * `@/components/...` resolve identically inside tests.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: false,
    include: ["**/*.vitest.{ts,tsx}"],
    css: false,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
