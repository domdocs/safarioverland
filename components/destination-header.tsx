import Image from "next/image"

interface DestinationHeaderProps {
  title: string
  description: string
  image: string
  facts: {
    label: string
    value: string
  }[]
}

export function DestinationHeader({ title, description, image, facts }: DestinationHeaderProps) {
  return (
    <div className="relative">
      <div className="relative h-[400px] w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-40 mb-12 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl max-w-3xl">{description}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md -mt-6 mb-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {facts.map((fact, index) => (
            <div key={index} className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{fact.label}</p>
              <p className="font-bold">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
