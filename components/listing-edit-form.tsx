"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { DirectoryListing, ListingStatus } from "@/lib/listings"

const regions = [
  { value: "Southern Africa", label: "Southern Africa" },
  { value: "East Africa", label: "East Africa" },
  { value: "West Africa", label: "West Africa" },
  { value: "North Africa", label: "North Africa" },
  { value: "Central Africa", label: "Central Africa" }
] as const

const categories = [
  { value: "lodges", label: "Safari Lodges" },
  { value: "campsites", label: "Campsites" },
  { value: "guided-tours", label: "Guided Tours" },
  { value: "4x4-rentals", label: "4x4 Rentals" },
  { value: "adventure-activities", label: "Adventure Activities" },
  { value: "game-viewing", label: "Game Viewing" },
  { value: "overland-tours", label: "Overland Tours" },
  { value: "flights", label: "Safari Flights" },
  { value: "booking-agents", label: "Booking Agents" },
] as const

const formSchema = z.object({
  id: z.string(),
  listing_name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  contact_name: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  contact_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contact_phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  price_info: z.string().optional().or(z.literal("")),
  image_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  featured: z.boolean(),
  status: z.enum(["pending", "approved", "rejected"] as const),

  // ── Editorial / transformational layer ──────────────────────────────
  // All optional. The audit workflow populates these case-by-case.
  verdict: z.string().optional().or(z.literal("")),
  signature_experience: z.string().optional().or(z.literal("")),
  conservation_summary: z.string().optional().or(z.literal("")),
  community_summary: z.string().optional().or(z.literal("")),
  // Stored in form as comma-separated string; converted to/from array on submit/load.
  wellness_offerings_csv: z.string().optional().or(z.literal("")),
  activities_csv: z.string().optional().or(z.literal("")),
  editor_notes: z.string().optional().or(z.literal("")),

  // Founder
  founder_name: z.string().optional().or(z.literal("")),
  founder_note: z.string().optional().or(z.literal("")),
  founder_image_url: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),

  // Reputation — repeating field arrays
  traveller_quotes: z
    .array(
      z.object({
        quote: z.string().optional().or(z.literal("")),
        attributed_to: z.string().optional().or(z.literal("")),
        trip_year: z
          .union([z.number(), z.string()])
          .optional()
          .or(z.literal("")),
      }),
    )
    .optional()
    .default([]),
  external_ratings: z
    .array(
      z.object({
        source: z.string().optional().or(z.literal("")),
        rating: z.union([z.number(), z.string()]).optional().or(z.literal("")),
        max: z.union([z.number(), z.string()]).optional().or(z.literal("")),
        count: z.union([z.number(), z.string()]).optional().or(z.literal("")),
        url: z
          .string()
          .url({ message: "Please enter a valid URL." })
          .optional()
          .or(z.literal("")),
      }),
    )
    .optional()
    .default([]),

  // Photography — one URL per line
  gallery_urls_text: z.string().optional().or(z.literal("")),

  // Practical
  max_guests: z
    .union([z.number(), z.string()])
    .optional()
    .or(z.literal("")),
  best_time_to_visit: z.string().optional().or(z.literal("")),
  price_tier: z.string().optional().or(z.literal("")),
  latitude: z
    .union([z.number(), z.string()])
    .optional()
    .or(z.literal("")),
  longitude: z
    .union([z.number(), z.string()])
    .optional()
    .or(z.literal("")),

  // Cross-references — comma-separated
  field_notes_slugs_csv: z.string().optional().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

interface ListingEditFormProps {
  listing: DirectoryListing
}

export function ListingEditForm({ listing }: ListingEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const defaultValues: FormValues = {
    ...listing,
    featured: listing.featured || false,
    status: listing.status as ListingStatus,
    website: listing.website || "",
    price_info: listing.price_info || "",
    image_url: listing.image_url || "",

    // Editorial — strings
    verdict: listing.verdict ?? "",
    signature_experience: listing.signature_experience ?? "",
    conservation_summary: listing.conservation_summary ?? "",
    community_summary: listing.community_summary ?? "",
    editor_notes: listing.editor_notes ?? "",

    // Editorial — array → CSV for the form UI
    wellness_offerings_csv: (listing.wellness_offerings ?? []).join(", "),
    activities_csv: (listing.activities ?? []).join(", "),
    field_notes_slugs_csv: (listing.field_notes_slugs ?? []).join(", "),
    gallery_urls_text: (listing.gallery_urls ?? []).join("\n"),

    // Founder
    founder_name: listing.founder_name ?? "",
    founder_note: listing.founder_note ?? "",
    founder_image_url: listing.founder_image_url ?? "",

    // Reputation — JSON arrays
    traveller_quotes: (listing.traveller_quotes ?? []).map((q) => ({
      quote: q.quote ?? "",
      attributed_to: q.attributed_to ?? "",
      trip_year: q.trip_year ?? "",
    })),
    external_ratings: (listing.external_ratings ?? []).map((r) => ({
      source: r.source ?? "",
      rating: r.rating ?? "",
      max: r.max ?? "",
      count: r.count ?? "",
      url: r.url ?? "",
    })),

    // Practical
    max_guests: listing.max_guests ?? "",
    best_time_to_visit: listing.best_time_to_visit ?? "",
    price_tier: (listing.price_tier ?? "") as "budget" | "mid" | "luxury" | "exclusive" | "",
    latitude: listing.latitude ?? "",
    longitude: listing.longitude ?? "",
  }

  // The resolver type drifts from useForm's inferred type when the schema
  // grows nested arrays + union members; documented zod/RHF interaction.
  // Cast through `unknown` to keep TS quiet without giving up runtime safety
  // (zod still enforces the schema at submit time).
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as unknown as never,
    defaultValues,
  })

  const travellerQuotes = useFieldArray({
    control: form.control,
    name: "traveller_quotes",
  })
  const externalRatings = useFieldArray({
    control: form.control,
    name: "external_ratings",
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Translate form shape → API shape: split CSV inputs, drop empty
      // repeating-field rows, parse numbers from strings.
      const splitCsv = (s: string | undefined) =>
        (s ?? "")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      const splitLines = (s: string | undefined) =>
        (s ?? "")
          .split(/[\n,]+/)
          .map((x) => x.trim())
          .filter(Boolean)
      const numOrNull = (v: unknown): number | null => {
        if (v === "" || v === undefined || v === null) return null
        const n = typeof v === "number" ? v : Number(v)
        return Number.isFinite(n) ? n : null
      }

      const payload = {
        ...values,
        wellness_offerings: splitCsv(values.wellness_offerings_csv),
        activities: splitCsv(values.activities_csv),
        field_notes_slugs: splitCsv(values.field_notes_slugs_csv),
        gallery_urls: splitLines(values.gallery_urls_text),
        traveller_quotes: (values.traveller_quotes ?? [])
          .filter((q) => (q.quote ?? "").trim() !== "")
          .map((q) => ({
            quote: q.quote!.trim(),
            attributed_to: (q.attributed_to ?? "").trim(),
            trip_year: numOrNull(q.trip_year) ?? undefined,
          })),
        external_ratings: (values.external_ratings ?? [])
          .filter((r) => (r.source ?? "").trim() !== "")
          .map((r) => ({
            source: r.source!.trim(),
            rating: numOrNull(r.rating) ?? 0,
            max: numOrNull(r.max) ?? undefined,
            count: numOrNull(r.count) ?? undefined,
            url: (r.url ?? "").trim() || undefined,
          })),
        max_guests: numOrNull(values.max_guests),
        latitude: numOrNull(values.latitude),
        longitude: numOrNull(values.longitude),
        price_tier: values.price_tier || null,
      }

      const response = await fetch(`/api/listings/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update listing')
      }

      toast({
        title: "Listing updated successfully",
        description: "The listing has been updated and will be reflected in the directory.",
      })

      // Force a cache revalidation and refresh
      router.refresh()
    } catch (error) {
      console.error('Error updating listing:', error)
      toast({
        title: "Error updating listing",
        description: error instanceof Error ? error.message : "Failed to update listing",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleApprove() {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/listings/${listing.id}/approve`, {
        method: 'POST',
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || body.message || `Failed to approve listing (HTTP ${response.status})`)
      }

      toast({
        title: "Listing approved",
        description: "The listing has been approved and is now live in the directory.",
      })

      // Redirect to the listings page
      router.push('/admin/listings')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error approving listing",
        description: error instanceof Error ? error.message : "Failed to approve listing",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Business Information</h2>

                <FormField
                  control={form.control}
                  name="listing_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Location Information</h2>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>

                <FormField
                  control={form.control}
                  name="contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Optional: Include website URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Additional Information</h2>

                <FormField
                  control={form.control}
                  name="price_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Information</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Optional: Add pricing details</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Optional: Add an image URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Featured Listing
                        </FormLabel>
                        <FormDescription>
                          Feature this listing on the homepage and category pages
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Editorial / transformational ─────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Editorial</h3>
                <p className="text-sm text-stone-500">
                  The transformational layer. All optional — fill in when you have it.
                </p>
              </div>

              <FormField
                control={form.control}
                name="verdict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verdict</FormLabel>
                    <FormControl>
                      <Input placeholder="One sentence: the “we'd send this here” line." {...field} />
                    </FormControl>
                    <FormDescription>
                      Editorial voice. Single sentence. Opens the listing detail page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signature_experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signature experience</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="The single thing that makes this stay distinctive — the walking guide, the sleep-out, the hide…"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="conservation_summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conservation summary</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="~200 chars on conservation work funded by stays here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="community_summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Community summary</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="~200 chars on community / local-employment commitments."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="wellness_offerings_csv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wellness offerings</FormLabel>
                      <FormControl>
                        <Input placeholder="spa, yoga, sound bath" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activities_csv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activities</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="walking safaris, mokoro, sleep-out, horseback"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Comma-separated list.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="editor_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Editor notes (internal only)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Audit notes, follow-ups, things to verify on the next visit."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Not shown to public visitors.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Founder story ────────────────────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Founder story</h3>
                <p className="text-sm text-stone-500">
                  Optional. The owner / founder voice — short, in their own words.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="founder_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="founder_image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder photo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="founder_note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founder note</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Up to ~500 chars in the founder's voice."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Reputation ───────────────────────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Reputation</h3>
                <p className="text-sm text-stone-500">
                  Traveller quotes (with attribution) and external ratings (TripAdvisor,
                  Google, Booking, etc.).
                </p>
              </div>

              {/* Traveller quotes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Traveller quotes</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      travellerQuotes.append({ quote: "", attributed_to: "", trip_year: "" })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add quote
                  </Button>
                </div>
                {travellerQuotes.fields.length === 0 && (
                  <p className="text-sm text-stone-500">No quotes yet.</p>
                )}
                {travellerQuotes.fields.map((row, index) => (
                  <div
                    key={row.id}
                    className="grid gap-4 md:grid-cols-[1fr_240px_120px_auto] items-start border rounded-md p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`traveller_quotes.${index}.quote` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Quote</FormLabel>
                          <FormControl>
                            <Textarea rows={2} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`traveller_quotes.${index}.attributed_to` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Attributed to</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`traveller_quotes.${index}.trip_year` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Trip year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="numeric"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => travellerQuotes.remove(index)}
                      aria-label="Remove quote"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* External ratings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">External ratings</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      externalRatings.append({
                        source: "",
                        rating: "",
                        max: "5",
                        count: "",
                        url: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add rating
                  </Button>
                </div>
                {externalRatings.fields.length === 0 && (
                  <p className="text-sm text-stone-500">No external ratings yet.</p>
                )}
                {externalRatings.fields.map((row, index) => (
                  <div
                    key={row.id}
                    className="grid gap-4 md:grid-cols-[180px_100px_80px_100px_1fr_auto] items-start border rounded-md p-4"
                  >
                    <FormField
                      control={form.control}
                      name={`external_ratings.${index}.source` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Source</FormLabel>
                          <FormControl>
                            <Input placeholder="TripAdvisor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`external_ratings.${index}.rating` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Rating</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`external_ratings.${index}.max` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Max</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`external_ratings.${index}.count` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Reviews</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`external_ratings.${index}.url` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://…" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => externalRatings.remove(index)}
                      aria-label="Remove rating"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Photography ──────────────────────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Gallery</h3>
                <p className="text-sm text-stone-500">
                  One image URL per line. Used for the listing detail gallery scroller.
                </p>
              </div>
              <FormField
                control={form.control}
                name="gallery_urls_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gallery URLs</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder={"https://…/photo-1.jpg\nhttps://…/photo-2.jpg"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>One URL per line. Order matters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ── Practical ────────────────────────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Practical</h3>
                <p className="text-sm text-stone-500">
                  Trip-planning facts. Latitude / longitude in decimal degrees.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="max_guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max guests</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price_tier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price tier</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pick a tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="mid">Mid</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="exclusive">Exclusive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="best_time_to_visit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best time to visit</FormLabel>
                      <FormControl>
                        <Input placeholder="Jul–Oct (dry, peak game)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000001"
                          placeholder="-19.123456"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.000001"
                          placeholder="23.123456"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── Cross-references ─────────────────────────────────── */}
            <div className="border-t pt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Field Notes references</h3>
                <p className="text-sm text-stone-500">
                  Slugs of Field Notes articles that mention this stay.
                </p>
              </div>
              <FormField
                control={form.control}
                name="field_notes_slugs_csv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article slugs</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="east-vs-southern, walking-safaris, conservancies-of-the-mara"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Comma-separated slugs.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 border-t pt-8">
              {listing.status === "pending" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(listing.id) && (
                <Button
                  type="button"
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve Listing
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 