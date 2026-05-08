"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"
import { Loader2, Check, X, ChevronLeft, ChevronRight } from "lucide-react"

import type { DirectoryListing, ListingStatus } from "@/lib/listings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type ListingsTableMode = "all" | "pending"

type Filters = {
  status: ListingStatus | "all"
  category: string
  country: string
  featured: "true" | "false" | ""
}

type Props = {
  mode: ListingsTableMode
  rows: DirectoryListing[]
  page: number
  pageSize: number
  totalCount: number
  filters: Filters
  categoryOptions: { slug: string; label: string }[]
  countryOptions: string[]
  /** Path the filter form should preserve as the base URL. */
  basePath: string
}

const STATUS_OPTIONS: ListingStatus[] = ["pending", "approved", "rejected"]

const STATUS_TONE: Record<ListingStatus, string> = {
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  rejected: "bg-stone-200 text-stone-700 border-stone-300",
}

/**
 * Interactive client child for /admin/listings and /admin/pending.
 *
 * Server Component (parent) does the data fetch with the live Supabase
 * service-role client. We render rows here and own the interactive bits:
 * filter form (writes URL search params), inline row controls (PATCH the
 * status endpoint and `router.refresh()` to re-fetch the parent), and
 * pagination links. Mirrors the briefs pattern at app/admin/briefs/.
 *
 * Modes:
 *   - "all"     → /admin/listings: full filter set + status select +
 *                  featured toggle + edit link.
 *   - "pending" → /admin/pending : approve / reject buttons + edit link.
 */
export function ListingsTableClient({
  mode,
  rows,
  page,
  pageSize,
  totalCount,
  filters,
  categoryOptions,
  countryOptions,
  basePath,
}: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  // Rebuild URL params from the server-passed filter snapshot. We deliberately
  // avoid `useSearchParams()` here — that hook would force the whole route to
  // client-side rendering unless wrapped in a Suspense boundary, hiding the
  // table from the initial server-rendered HTML.
  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams()
    const current: Record<string, string> = {
      status: filters.status,
      category: filters.category,
      country: filters.country,
      featured: filters.featured,
      page: page > 1 ? String(page) : "",
    }
    current[key] = value ?? ""
    // Any filter change resets pagination.
    if (key !== "page") current.page = ""
    for (const [k, v] of Object.entries(current)) {
      if (v) params.set(k, v)
    }
    const qs = params.toString()
    router.push(qs ? `${basePath}?${qs}` : basePath)
  }

  async function patch(id: string, body: { status?: ListingStatus; featured?: boolean }) {
    setActiveRowId(id)
    setError(null)
    try {
      const res = await fetch(`/api/admin/listings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      // Server Component re-fetches → row falls out of pending list, etc.
      startTransition(() => router.refresh())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setActiveRowId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* ─── Filter row ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end gap-3">
        {mode === "all" && (
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(v) => setParam("status", v === "all" ? null : v)}
            options={[
              { value: "all", label: "All" },
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        )}
        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={(v) => setParam("category", v || null)}
          options={[
            { value: "", label: "All" },
            ...categoryOptions.map((c) => ({ value: c.slug, label: c.label })),
          ]}
        />
        <FilterSelect
          label="Country"
          value={filters.country}
          onChange={(v) => setParam("country", v || null)}
          options={[
            { value: "", label: "All" },
            ...countryOptions.map((c) => ({ value: c, label: c })),
          ]}
        />
        <FilterSelect
          label="Featured"
          value={filters.featured}
          onChange={(v) => setParam("featured", v || null)}
          options={[
            { value: "", label: "All" },
            { value: "true", label: "Featured only" },
            { value: "false", label: "Not featured" },
          ]}
        />
        <div className="ml-auto text-xs text-muted-foreground tabular-nums">
          {totalCount.toLocaleString()} {mode === "pending" ? "pending" : "matching"}{" "}
          listing{totalCount === 1 ? "" : "s"}
        </div>
      </div>

      {/* ─── Table ───────────────────────────────────────────────── */}
      <div className="rounded-md border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                {mode === "all" && <TableHead>Status</TableHead>}
                {mode === "all" && <TableHead>Featured</TableHead>}
                {mode === "pending" && <TableHead>Submitted</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={mode === "all" ? 6 : 5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    {mode === "pending"
                      ? "No pending listings."
                      : "No listings match the current filters."}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((listing) => {
                  const isActive = activeRowId === listing.id
                  const location =
                    listing.location && listing.country && listing.location !== listing.country
                      ? `${listing.location}, ${listing.country}`
                      : listing.location || listing.country
                  const status = listing.status as ListingStatus
                  return (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.listing_name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {prettyCategory(listing.category)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{location}</TableCell>

                      {mode === "all" && (
                        <TableCell>
                          <select
                            value={status}
                            disabled={isActive}
                            onChange={(e) =>
                              patch(listing.id, { status: e.target.value as ListingStatus })
                            }
                            className={cn(
                              "border px-2 py-1 text-xs font-medium uppercase tracking-wider rounded-none",
                              STATUS_TONE[status],
                            )}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {isActive && pending && (
                            <Loader2 className="inline-block ml-2 h-3 w-3 animate-spin text-muted-foreground" />
                          )}
                        </TableCell>
                      )}

                      {mode === "all" && (
                        <TableCell>
                          <button
                            type="button"
                            disabled={isActive}
                            onClick={() => patch(listing.id, { featured: !listing.featured })}
                            className="text-left"
                            aria-label={listing.featured ? "Unfeature" : "Feature"}
                          >
                            <Badge
                              variant="outline"
                              className={cn(
                                "cursor-pointer",
                                listing.featured
                                  ? "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
                                  : "bg-muted text-muted-foreground hover:bg-accent",
                              )}
                            >
                              {listing.featured ? "Featured" : "—"}
                            </Badge>
                          </button>
                        </TableCell>
                      )}

                      {mode === "pending" && (
                        <TableCell className="text-muted-foreground tabular-nums">
                          {new Date(listing.created_at).toLocaleDateString()}
                        </TableCell>
                      )}

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {mode === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={isActive}
                                onClick={() => patch(listing.id, { status: "approved" })}
                                className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                              >
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={isActive}
                                onClick={() => patch(listing.id, { status: "rejected" })}
                                className="text-stone-700 border-stone-300 hover:bg-stone-100"
                              >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Link href={`/admin/listings/edit/${listing.id}`}>
                            <Button variant="outline" size="sm">
                              {mode === "pending" ? "Review" : "Edit"}
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ─── Pagination ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-sm">
        <div className="w-[120px]">
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setParam("page", String(page - 1))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
        </div>
        <div className="text-muted-foreground tabular-nums">
          Page {page} of {totalPages}
        </div>
        <div className="w-[120px] flex justify-end">
          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setParam("page", String(page + 1))}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// ─── helpers ──────────────────────────────────────────────────────────

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      <span className="font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border bg-card px-3 py-1.5 text-sm rounded-none focus:outline-none focus:border-foreground/40 min-w-[160px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function prettyCategory(slug: string): string {
  if (!slug) return "—"
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
