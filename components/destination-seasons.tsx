import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sun, Cloud, CloudRain, Thermometer } from "lucide-react"

interface Season {
  name: string
  months: string
  weather: string
  wildlife: string
  crowds: string
  costs: string
  pros: string[]
  cons: string[]
  icon: "sun" | "cloud" | "rain" | "thermometer"
}

interface DestinationSeasonsProps {
  seasons: Season[]
}

export function DestinationSeasons({ seasons }: DestinationSeasonsProps) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Best Time to Visit</h2>
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={seasons[0].name.toLowerCase().replace(/\s+/g, "-")}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              {seasons.map((season) => (
                <TabsTrigger key={season.name} value={season.name.toLowerCase().replace(/\s+/g, "-")}>
                  {season.icon === "sun" && <Sun className="h-4 w-4 mr-2" />}
                  {season.icon === "cloud" && <Cloud className="h-4 w-4 mr-2" />}
                  {season.icon === "rain" && <CloudRain className="h-4 w-4 mr-2" />}
                  {season.icon === "thermometer" && <Thermometer className="h-4 w-4 mr-2" />}
                  {season.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {seasons.map((season) => (
              <TabsContent key={season.name} value={season.name.toLowerCase().replace(/\s+/g, "-")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Months</p>
                        <p className="text-muted-foreground">{season.months}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Weather</p>
                        <p className="text-muted-foreground">{season.weather}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Wildlife</p>
                        <p className="text-muted-foreground">{season.wildlife}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Crowds & Costs</p>
                        <p className="text-muted-foreground">{season.crowds}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {season.pros.map((pro, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {pro}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Considerations</p>
                    <ul className="space-y-2">
                      {season.cons.map((con, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
