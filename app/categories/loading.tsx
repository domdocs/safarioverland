export default function Loading() {
  return (
    <>
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl">
          <div className="h-3 w-40 bg-rule animate-pulse mb-6" />
          <div className="h-12 w-3/4 bg-card animate-pulse mb-3" />
          <div className="h-12 w-1/2 bg-card animate-pulse mb-6" />
          <div className="h-5 w-full bg-card animate-pulse" />
          <div className="mt-2 h-5 w-5/6 bg-card animate-pulse" />
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-rule bg-card p-8 animate-pulse">
              <div className="h-3 w-20 bg-rule mb-4" />
              <div className="h-8 w-3/4 bg-rule mb-3" />
              <div className="h-4 w-full bg-rule mb-2" />
              <div className="h-4 w-5/6 bg-rule" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
