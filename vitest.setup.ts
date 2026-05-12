/**
 * Global jsdom polyfills for the admin import page tests.
 *
 * - `File.prototype.text` exists in modern browsers but jsdom@29 doesn't
 *   ship it; our component reads pasted/dropped markdown via `file.text()`.
 * - `URL.createObjectURL` is referenced by some react-dropzone code paths.
 * - `navigator.clipboard.writeText` is used by the "Copy raw" button —
 *   stub it so tests don't blow up if a test path triggers a copy.
 */

import { vi } from "vitest"

if (typeof (File.prototype as { text?: unknown }).text !== "function") {
  Object.defineProperty(File.prototype, "text", {
    value: async function text(this: File) {
      const buf = await this.arrayBuffer()
      return new TextDecoder("utf-8").decode(buf)
    },
    configurable: true,
    writable: true,
  })
}

if (typeof URL.createObjectURL === "undefined") {
  Object.defineProperty(URL, "createObjectURL", {
    value: () => "blob:fake",
    configurable: true,
    writable: true,
  })
}

if (typeof navigator !== "undefined" && !navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  })
}
