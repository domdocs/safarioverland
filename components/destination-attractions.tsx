import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Attraction {
  name: string
  location: string
  description: string
  image: string
  highlights: string[]
  bestTime: string
}

interface DestinationAttractionsProps {
  attractions: Attraction[]
}

export function DestinationAttractions({ attractions }: DestinationAttractionsProps) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Top Safari Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction, index) => (
          <Card key={index} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={attraction.image || "/placeholder.svg"} alt={attraction.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{attraction.name}</h3>
                <Badge variant="outline" className="bg-secondary/10">
                  {attraction.bestTime}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{attraction.location}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{attraction.description}</p>
              <div className="flex flex-wrap gap-1">
                {attraction.highlights.map((highlight, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
