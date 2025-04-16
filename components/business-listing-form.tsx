"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImagePlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const businessCategories = [
  { label: "Lodge", value: "lodge" },
  { label: "Campsite", value: "campsite" },
  { label: "4x4 Rental", value: "4x4-rental" },
  { label: "Guided Tour", value: "guided-tour" },
  { label: "Adventure Activity", value: "adventure-activity" },
  { label: "Game Viewing", value: "game-viewing" },
  { label: "Overland Tour", value: "overland-tour" },
  { label: "Flight Service", value: "flight" },
  { label: "Booking Agent", value: "booking-agent" },
]

const regions = [
  { label: "East Africa", value: "east-africa" },
  { label: "Southern Africa", value: "southern-africa" },
  { label: "West Africa", value: "west-africa" },
  { label: "North Africa", value: "north-africa" },
]

const countries = [
  { label: "Kenya", value: "kenya" },
  { label: "Tanzania", value: "tanzania" },
  { label: "Uganda", value: "uganda" },
  { label: "Rwanda", value: "rwanda" },
  { label: "South Africa", value: "south-africa" },
  { label: "Botswana", value: "botswana" },
  { label: "Namibia", value: "namibia" },
  { label: "Zimbabwe", value: "zimbabwe" },
  { label: "Zambia", value: "zambia" },
  { label: "Mozambique", value: "mozambique" },
  { label: "Malawi", value: "malawi" },
  { label: "Ghana", value: "ghana" },
  { label: "Nigeria", value: "nigeria" },
  { label: "Senegal", value: "senegal" },
  { label: "Morocco", value: "morocco" },
  { label: "Egypt", value: "egypt" },
]

const amenities = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "pool", label: "Swimming Pool" },
  { id: "ac", label: "Air Conditioning" },
  { id: "restaurant", label: "Restaurant" },
  { id: "bar", label: "Bar" },
  { id: "spa", label: "Spa" },
  { id: "gym", label: "Gym" },
  { id: "laundry", label: "Laundry Service" },
  { id: "parking", label: "Parking" },
  { id: "airport-shuttle", label: "Airport Shuttle" },
  { id: "guided-tours", label: "Guided Tours" },
  { id: "wildlife-viewing", label: "Wildlife Viewing" },
]

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a business category.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  priceRange: z.string({
    required_error: "Please select a price range.",
  }),
  amenities: z.array(z.string()).optional(),
  openingHours: z.string().min(2, {
    message: "Please provide opening hours.",
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

export function BusinessListingForm({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      city: "",
      address: "",
      openingHours: "",
      amenities: [],
      acceptTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Use a shorter timeout to avoid promise timeout issues
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setOpen(false)
      setStep(1)
      form.reset()
      setImagePreview(null)

      toast({
        title: "Business listing submitted",
        description: "Your business has been submitted for review. We'll be in touch soon!",
      })
    }, 500) // Reduced from 1500ms to 500ms
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Add size check to prevent large file processing
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        })
        return
      }

      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.onerror = () => {
          toast({
            title: "Error",
            description: "Failed to load image",
            variant: "destructive",
          })
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Image upload error:", error)
        toast({
          title: "Error",
          description: "Failed to process image",
          variant: "destructive",
        })
      }
    }
  }

  const nextStep = async () => {
    try {
      if (step === 1) {
        const valid = await form.trigger(["businessName", "category", "description"])
        if (valid) setStep(2)
      } else if (step === 2) {
        const valid = await form.trigger(["region", "country", "city", "address"])
        if (valid) setStep(3)
      } else if (step === 3) {
        const valid = await form.trigger(["email", "phone", "priceRange", "openingHours"])
        if (valid) setStep(4)
      }
    } catch (error) {
      console.error("Form validation error:", error)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List Your Safari Business</DialogTitle>
          <DialogDescription>Fill out the form below to add your business to Safari Overland.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-4 text-sm">
          <div className={`px-3 py-1 rounded-full ${step === 1 ? "bg-[#4F6D7A] text-white" : "bg-gray-200"}`}>
            Basic Info
          </div>
          <div className={`px-3 py-1 rounded-full ${step === 2 ? "bg-[#4F6D7A] text-white" : "bg-gray-200"}`}>
            Location
          </div>
          <div className={`px-3 py-1 rounded-full ${step === 3 ? "bg-[#4F6D7A] text-white" : "bg-gray-200"}`}>
            Contact & Pricing
          </div>
          <div className={`px-3 py-1 rounded-full ${step === 4 ? "bg-[#4F6D7A] text-white" : "bg-gray-200"}`}>
            Finalize
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
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
                      <FormLabel>Business Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessCategories.map((category) => (
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your business, services, and what makes it special"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City/Town</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city or town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your business address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business phone" {...field} />
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
                      <FormLabel>Website (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourbusiness.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Range</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="budget" />
                            </FormControl>
                            <FormLabel className="font-normal">Budget ($)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mid-range" />
                            </FormControl>
                            <FormLabel className="font-normal">Mid-Range ($$)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="luxury" />
                            </FormControl>
                            <FormLabel className="font-normal">Luxury ($$$)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mon-Fri: 9am-5pm, Sat: 10am-4pm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Business Photos</h3>
                  <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md mb-2">
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Business preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <ImagePlus className="h-10 w-10 mb-2" />
                        <span>Upload business photos</span>
                      </div>
                    )}
                  </div>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
                  <p className="text-xs text-gray-500">
                    Upload high-quality images of your business (max 5MB). You can add more photos after your listing is
                    approved.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Amenities & Services</FormLabel>
                        <FormDescription>Select the amenities and services your business offers.</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {amenities.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item.id])
                                          : field.onChange(field.value?.filter((value) => value !== item.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept terms and conditions</FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            terms of service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            privacy policy
                          </a>
                          .
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}

              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Listing"
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
