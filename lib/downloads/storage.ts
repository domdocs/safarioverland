import { getSupabaseServerClient } from "@/lib/supabase"
import { SIGNED_URL_TTL_SECONDS, STORAGE_BUCKET, type Resource } from "./resources"

/**
 * Returns a signed Supabase Storage URL for a resource, or null if the file
 * is not yet available in the bucket.
 */
export async function getSignedDownloadUrl(resource: Resource): Promise<string | null> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(resource.storagePath, SIGNED_URL_TTL_SECONDS, {
      download: resource.filename,
    })

  if (error || !data?.signedUrl) {
    return null
  }
  return data.signedUrl
}
