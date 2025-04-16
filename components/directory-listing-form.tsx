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

const regions = [
  { value: "Southern Africa", label: "Southern Africa" },
  { value: "East Africa", label: "East Africa" },
  { value: "West Africa", label: "West Africa" },
  { value: "North Africa", label: "North Africa" },
  { value: "Central Africa", label: "Central Africa" }
]

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL starting with http:// or https://",
    })
    .optional()
    .or(z.literal("")),
  logo: z.any().optional(),
  images: z.any().optional(),
  amenities: z.array(z.string()).optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

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
]

const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "pool", label: "Swimming Pool" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar" },
  { id: "aircon", label: "Air Conditioning" },
  { id: "guided_tours", label: "Guided Tours" },
  { id: "airport_shuttle", label: "Airport Shuttle" },
  { id: "family_friendly", label: "Family Friendly" },
]

export function DirectoryListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      category: "",
      region: "",
      description: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      website: "",
      amenities: [],
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/listings/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listing_name: values.businessName,
          category: values.category,
          region: values.region,
          description: values.description,
          location: `${values.address}, ${values.city}`,
          country: values.country,
          contact_name: values.businessName, // Use business name as contact name
          contact_phone: values.phone,
          contact_email: values.email,
          website: values.website && values.website.trim() !== '' ? values.website : undefined,
          price_info: '', // Optional field
          image_url: undefined, // Don't send empty string for URL fields
          featured: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to submit listing');
      }

      const data = await response.json();
      
      setIsSuccess(true);
      toast({
        title: "Listing submitted successfully!",
        description: "Your listing has been submitted and is pending review.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong.",
        description: error instanceof Error ? error.message : "Your listing could not be submitted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Submission Successful!</h2>
            <p className="text-gray-600">
              Thank you for submitting your listing. Our team will review it shortly and get back to you.
            </p>
            <Button onClick={() => setIsSuccess(false)} className="mt-4">
              Submit Another Listing
            </Button>
          </div>
        </CardContent>
      </Card>
    )
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
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business name" {...field} />
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
                            <SelectValue placeholder="Select a category" />
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
                      <FormDescription>Choose the category that best describes your business.</FormDescription>
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
                        <Textarea
                          placeholder="Describe your business (max 500 characters)"
                          className="resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City*</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a region" />
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
                      </FormControl>
                      <FormDescription>Choose the region where your business is located.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} />
                      </FormControl>
                      <FormDescription>Optional: Include your website URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Amenities</h2>
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenities.map((amenity) => (
                          <FormField
                            key={amenity.id}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem key={amenity.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(amenity.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), amenity.id])
                                          : field.onChange(field.value?.filter((value) => value !== amenity.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{amenity.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormDescription>Select all amenities that your business offers.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Media</h2>
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            field.onChange(file)
                          }}
                        />
                      </FormControl>
                      <FormDescription>Upload your business logo (recommended size: 200x200px)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files
                            field.onChange(files)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload up to 5 images of your business (recommended size: 1200x800px)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms and Conditions*</FormLabel>
                      <FormDescription>
                        I agree to the terms of service and privacy policy. I confirm that all information provided is
                        accurate.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
