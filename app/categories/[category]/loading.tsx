export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative h-64 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
