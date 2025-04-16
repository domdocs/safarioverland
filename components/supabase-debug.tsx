"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SupabaseDebugProps {
  data: any
  title?: string
  description?: string
}

export function SupabaseDebug({
  data,
  title = "Supabase Data",
  description = "Debug information",
}: SupabaseDebugProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Hide Details" : "Show Details"}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
