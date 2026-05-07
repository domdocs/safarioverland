export default function CategoryLoading() {
  return (
    <>
      {/* Hero band placeholder */}
      <section className="relative h-[48vh] min-h-[360px] w-full bg-card animate-pulse">
        <div className="container relative h-full flex flex-col justify-end pb-12">
          <div className="h-3 w-40 bg-rule mb-4" />
          <div className="h-12 w-2/3 bg-rule mb-3" />
          <div className="h-12 w-1/3 bg-rule" />
        </div>
      </section>

      {/* Tab strip placeholder */}
      <div className="border-y border-rule bg-night/95">
        <div className="container">
          <div className="flex gap-6 py-4">
            {[80, 60, 70, 90, 65, 75, 70, 60].map((w, i) => (
              <div
                key={i}
                className="h-3 bg-rule animate-pulse"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <section className="container py-16 md:py-20 space-y-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 border-t border-rule pt-8 animate-pulse"
          >
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] bg-card" />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="h-3 w-32 bg-rule" />
              <div className="h-8 w-3/4 bg-card" />
              <div className="h-4 w-full bg-card" />
              <div className="h-4 w-5/6 bg-card" />
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
