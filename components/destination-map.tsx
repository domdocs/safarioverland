"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Country {
  name: string
  description: string
  listings: number
}

interface DestinationMapProps {
  countries: Country[]
  regionName: string
}

export function DestinationMap({ countries, regionName }: DestinationMapProps) {
  const [activeCountry, setActiveCountry] = useState(countries[0].name.toLowerCase())

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore {regionName}</h2>
      <Card>
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={countries[0].name.toLowerCase()} onValueChange={setActiveCountry}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              {countries.map((country) => (
                <TabsTrigger key={country.name} value={country.name.toLowerCase()}>
                  {country.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center mb-4">
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-2">Interactive Map - {activeCountry.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground">
                  Showing {countries.find((c) => c.name.toLowerCase() === activeCountry)?.listings || 0} safari listings
                </p>
              </div>
            </div>
            {countries.map((country) => (
              <TabsContent key={country.name} value={country.name.toLowerCase()} className="mt-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{country.name}</h3>
                  <Badge variant="outline">{country.listings} Listings</Badge>
                </div>
                <p className="text-muted-foreground">{country.description}</p>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
