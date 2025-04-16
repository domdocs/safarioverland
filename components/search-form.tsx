"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown } from "lucide-react"

export function SearchForm() {
  const [searchType, setSearchType] = useState<"category" | "location">("category")
  const [category, setCategory] = useState("lodges")
  const [region, setRegion] = useState("east-africa")
  const [country, setCountry] = useState("kenya")
  const [city, setCity] = useState("Nairobi")

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              type="button"
              variant={searchType === "category" ? "default" : "outline"}
              onClick={() => setSearchType("category")}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              By Category
            </Button>
            <Button
              type="button"
              variant={searchType === "location" ? "default" : "outline"}
              onClick={() => setSearchType("location")}
              className={`w-full ${
                searchType === "location"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-secondary border-secondary hover:bg-secondary/10"
              }`}
            >
              By Location
            </Button>
          </div>

          {searchType === "category" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-2 border-secondary/30 pr-10">
                    <SelectValue />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking-agents">Booking Agents</SelectItem>
                    <SelectItem value="campsites">Campsites</SelectItem>
                    <SelectItem value="lodges">Lodges</SelectItem>
                    <SelectItem value="4x4-rentals">4x4 Rentals</SelectItem>
                    <SelectItem value="guided-tours">Guided Tours</SelectItem>
                    <SelectItem value="adventure-activities">Adventure Activities</SelectItem>
                    <SelectItem value="game-viewing">Game Viewing Activities</SelectItem>
                    <SelectItem value="overland-tours">Overland Tours</SelectItem>
                    <SelectItem value="flights">Flights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="border-2 border-secondary/30 pr-10">
                    <SelectValue />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="east-africa">East Africa</SelectItem>
                    <SelectItem value="southern-africa">Southern Africa</SelectItem>
                    <SelectItem value="west-africa">West Africa</SelectItem>
                    <SelectItem value="north-africa">North Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="border-2 border-secondary/30 pr-10">
                    <SelectValue />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="east-africa">East Africa</SelectItem>
                    <SelectItem value="southern-africa">Southern Africa</SelectItem>
                    <SelectItem value="west-africa">West Africa</SelectItem>
                    <SelectItem value="north-africa">North Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="border-2 border-secondary/30 pr-10">
                    <SelectValue />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="tanzania">Tanzania</SelectItem>
                    <SelectItem value="south-africa">South Africa</SelectItem>
                    <SelectItem value="botswana">Botswana</SelectItem>
                    <SelectItem value="namibia">Namibia</SelectItem>
                    <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                    <SelectItem value="zambia">Zambia</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="rwanda">Rwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="City/Area"
                className="border-2 border-secondary/30"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          )}
        </div>
        <Button size="lg" className="h-auto bg-primary text-white hover:bg-primary/90">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </div>
  )
}
