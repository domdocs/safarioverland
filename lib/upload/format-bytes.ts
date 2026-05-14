/**
 * Format a byte count as a short human-readable string.
 *
 * Used by the admin upload UI to render the "Original 4.2 MB → 287 KB"
 * line that surfaces v2 image-processing savings.
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—"
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(decimals)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(decimals)} MB`
  const gb = mb / 1024
  return `${gb.toFixed(decimals)} GB`
}
