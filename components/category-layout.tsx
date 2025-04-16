import type React from "react"

interface CategoryLayoutProps {
  title: string
  description: string
  image: string
  children: React.ReactNode
}

export function CategoryLayout({ title, description, image, children }: CategoryLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative h-64 w-full overflow-hidden rounded-lg mb-4">
          {/* Use next/image if available, otherwise use a regular img tag */}
          <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  )
}
