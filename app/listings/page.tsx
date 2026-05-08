import { redirect } from "next/navigation"

/**
 * /listings → /categories
 *
 * The original brief used /listings as the directory index route. The team
 * built it at /categories instead. This file redirects so any external
 * link, bookmark, or stale CTA pointing at /listings lands on the right
 * page rather than a 404.
 */
export default function ListingsRedirect() {
  redirect("/categories")
}
