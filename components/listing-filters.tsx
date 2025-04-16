"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

interface ListingFiltersProps {
  categories: { name: string; slug: string }[]
  regions: { name: string; count: number }[]
  onFilterChange?: (filters: any) => void
}

export function ListingFilters({ categories, regions, onFilterChange }: ListingFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(false)

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedRegions([])
    setPriceRange([0, 1000])
    setIsFeaturedOnly(false)

    if (onFilterChange) {
      onFilterChange({
        categories: [],
        regions: [],
        priceRange: [0, 1000],
        featured: false,
      })
    }
  }

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        regions: selectedRegions,
        priceRange,
        featured: isFeaturedOnly,
      })
    }
  }

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]))
  }

  const toggleRegion = (name: string) => {
    setSelectedRegions((prev) => (prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]))
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={toggleFilter} className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>

        {(selectedCategories.length > 0 ||
          selectedRegions.length > 0 ||
          isFeaturedOnly ||
          priceRange[0] > 0 ||
          priceRange[1] < 1000) && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
            <X className="h-3.5 w-3.5 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <div key={category.slug} className="flex items-center">
                      <Checkbox
                        id={`category-${category.slug}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => toggleCategory(category.slug)}
                      />
                      <Label htmlFor={`category-${category.slug}`} className="ml-2 text-sm cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Regions</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {regions.map((region) => (
                    <div key={region.name} className="flex items-center">
                      <Checkbox
                        id={`region-${region.name}`}
                        checked={selectedRegions.includes(region.name)}
                        onCheckedChange={() => toggleRegion(region.name)}
                      />
                      <Label htmlFor={`region-${region.name}`} className="ml-2 text-sm cursor-pointer">
                        {region.name} ({region.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>
                      ${priceRange[1]}
                      {priceRange[1] === 1000 ? "+" : ""}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Other Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="featured-only"
                        checked={isFeaturedOnly}
                        onCheckedChange={(checked) => setIsFeaturedOnly(!!checked)}
                      />
                      <Label htmlFor="featured-only" className="ml-2 text-sm cursor-pointer">
                        Featured listings only
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
