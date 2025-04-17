"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/listings/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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
        const error = await response.json()
        throw new Error(error.message || 'Failed to approve listing')
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

            <div className="flex justify-end gap-4">
              {listing.status === "pending" && (
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