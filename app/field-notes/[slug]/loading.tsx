/**
 * Loading skeleton for a DB-backed field note. Mirrors the real
 * layout — hero band, back link, byline, body column — with
 * low-contrast pulse blocks. Chrome (header, footer, breadcrumbs)
 * comes from app/field-notes/layout.tsx.
 */
export default function FieldNoteLoading() {
  return (
    <>
      {/* Hero band */}
      <div className="relative h-[68vh] min-h-[480px] w-full overflow-hidden bg-card animate-pulse">
        <div className="absolute inset-x-0 bottom-16 container">
          <div className="mb-4 h-3 w-32 bg-rule" />
          <div className="h-12 w-3/4 bg-rule" />
          <div className="mt-3 h-12 w-1/2 bg-rule" />
        </div>
      </div>

      {/* Body */}
      <article className="container py-16 md:py-20 max-w-3xl">
        <div className="mb-8 h-4 w-40 bg-rule animate-pulse" />
        <div className="mb-10 h-14 w-64 bg-card animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-card animate-pulse" />
          <div className="h-4 w-11/12 bg-card animate-pulse" />
          <div className="h-4 w-10/12 bg-card animate-pulse" />
          <div className="h-4 w-3/4 bg-card animate-pulse" />
        </div>
      </article>
    </>
  )
}
