"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Filter, X } from "lucide-react"

interface CategoryFilterProps {
  category: string
  amenities?: string[]
  features?: string[]
}

export function CategoryFilter({ category, amenities = [], features = [] }: CategoryFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Filter Results</h2>
        <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <X className="h-4 w-4 mr-2" /> : <Filter className="h-4 w-4 mr-2" />}
          {showFilters ? "Close" : "Filters"}
        </Button>
      </div>

      <div className={`${showFilters ? "block" : "hidden"} md:block`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Accordion type="multiple" defaultValue={["location", "price"]}>
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="region">
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="east-africa">East Africa</SelectItem>
                        <SelectItem value="southern-africa">Southern Africa</SelectItem>
                        <SelectItem value="west-africa">West Africa</SelectItem>
                        <SelectItem value="north-africa">North Africa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                        <SelectItem value="south-africa">South Africa</SelectItem>
                        <SelectItem value="botswana">Botswana</SelectItem>
                        <SelectItem value="namibia">Namibia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as number[])}
                  />
                  <div className="flex items-center justify-between">
                    <div className="w-20">
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      />
                    </div>
                    <span>to</span>
                    <div className="w-20">
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center">
                        {rating}+ Stars
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {amenities && amenities.length > 0 && (
              <AccordionItem value="amenities">
                <AccordionTrigger>Amenities</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`} />
                        <Label htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {features && features.length > 0 && (
              <AccordionItem value="features">
                <AccordionTrigger>Features</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`} />
                        <Label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto">Apply Filters</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
