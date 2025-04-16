"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function MapView() {
  const [location, setLocation] = useState({ lat: -17.825167, lng: 31.047366 }) // Example: Harare, Zimbabwe
  const [zoom, setZoom] = useState(8)

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center">
          Interactive Map Placeholder
        </div>
        <p className="text-sm text-muted-foreground mt-2">Interactive map showing safari locations across Africa.</p>
      </CardContent>
    </Card>
  )
}
