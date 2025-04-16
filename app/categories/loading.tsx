export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="h-10 w-1/2 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
