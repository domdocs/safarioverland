import Image from "next/image"

interface Wildlife {
  name: string
  description: string
  image: string
}

interface DestinationWildlifeProps {
  wildlife: Wildlife[]
  title: string
  description: string
}

export function DestinationWildlife({ wildlife, title, description }: DestinationWildlifeProps) {
  return (
    <div className="mb-16 bg-muted py-12 px-4 rounded-lg">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {wildlife.map((animal, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden">
                <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold mb-1">{animal.name}</h3>
              <p className="text-xs text-muted-foreground">{animal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
