import Link from "next/link"

export function SimpleMapView() {
  const regions = [
    {
      id: 1,
      name: "East Africa",
      description: "Kenya, Tanzania, Uganda, Rwanda",
      image: "/images/regions/east-africa.jpg",
      count: 45,
      slug: "east-africa",
    },
    {
      id: 2,
      name: "Southern Africa",
      description: "South Africa, Botswana, Zimbabwe, Namibia",
      image: "/images/regions/southern-africa.jpg",
      count: 62,
      slug: "southern-africa",
    },
    {
      id: 3,
      name: "West Africa",
      description: "Ghana, Senegal, Ivory Coast",
      image: "/images/regions/west-africa.jpg",
      count: 18,
      slug: "west-africa",
    },
    {
      id: 4,
      name: "North Africa",
      description: "Morocco, Egypt, Tunisia",
      image: "/images/regions/north-africa.jpg",
      count: 24,
      slug: "north-africa",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {regions.map((region) => (
        <Link href={`/destinations/${region.slug}`} key={region.id} className="group">
          <div className="overflow-hidden rounded-lg shadow transition-all duration-200 hover:shadow-md">
            <div className="relative h-48 overflow-hidden">
              <img
                src={region.image || "/placeholder.svg"}
                alt={region.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">{region.name}</h3>
                <p className="text-sm text-white/80">{region.description}</p>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{region.count} listings</span>
                <span className="text-sm font-medium text-orange-600 group-hover:underline">Explore region</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
