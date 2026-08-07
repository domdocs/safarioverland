-- ============================================================================
-- Image attribution metadata for articles — paper trail + credit line.
--
-- Mirrors the `image_attribution` column on directory_listings (see
-- 20260515_image_attribution.sql). Single JSONB column so we can extend
-- the shape without another migration. Populated by the admin article form
-- and by unattended routines that publish field notes end-to-end.
--
-- The form today captures a single free-text credit line into
-- `hero.credit`; the shape below is the fuller structure a routine
-- should populate. All fields optional.
-- ============================================================================

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS image_attribution JSONB;

COMMENT ON COLUMN articles.image_attribution IS
$$JSON shape (all fields optional):
{
  "hero": {
    "source": "Pexels",
    "supplied_by": "Photographer: Vlad Chetan",
    "licence": "Pexels licence — free to use",
    "credit": "Photo: Vlad Chetan / Pexels",
    "granted_social_use": true,
    "uploaded_at": "2026-08-07T10:00:00Z",
    "alt_text": "Elephant at dusk in Hwange"
  }
}
Documentation-only. The column is JSONB so adding fields doesn't
require a schema change.$$;
