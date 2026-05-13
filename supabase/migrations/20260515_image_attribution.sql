-- ============================================================================
-- Image attribution metadata for listings — paper trail + alt text.
--
-- Single JSONB column on directory_listings; shape documented in the
-- migration body. Used by the admin upload UI to capture "supplied by"
-- and alt-text per upload, and by the public listing detail page for
-- accessibility (`<Image alt={...}>`).
-- ============================================================================

ALTER TABLE directory_listings
  ADD COLUMN IF NOT EXISTS image_attribution JSONB;

COMMENT ON COLUMN directory_listings.image_attribution IS
$$JSON shape:
{
  "hero": {
    "supplied_by": "Operator: Matetsi Victoria Falls",
    "uploaded_at": "2026-05-15T10:00:00Z",
    "licence": "Editorial use, operator permission",
    "alt_text": "Suite at last light over the Zambezi"
  },
  "gallery": [
    {
      "url": "...",
      "supplied_by": "Operator",
      "uploaded_at": "...",
      "licence": "Editorial use",
      "alt_text": "..."
    }
  ],
  "founder": {
    "supplied_by": "...",
    "uploaded_at": "...",
    "licence": "...",
    "alt_text": "Portrait of [founder name]"
  }
}
All fields optional. The shape is captured here as documentation only —
the column is JSONB so adding fields doesn't require a schema change.$$;
