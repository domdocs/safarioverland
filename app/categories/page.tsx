import type { Metadata } from "next"
import Link from "next/link"
import { getCategories } from "@/lib/listings"

type Category = {
  name: string
  slug: string
  description: string
  count?: number
}

export const metadata: Metadata = {
  title: "Safari Categories | Safari Overland Directory",
  description:
    "Browse all safari categories in our comprehensive directory of African safari services and accommodations.",
}

// Force dynamic rendering and revalidation
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await getCategories() as Category[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Safari Categories</h1>
        <p className="text-gray-600">
          Browse our comprehensive directory of African safari services and accommodations by category.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {category.count !== undefined ? `${category.count} listings` : "Browse listings"}
              </span>
              <span className="text-green-600 font-medium">View &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
