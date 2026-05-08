import { cn } from "@/lib/utils"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Generic page shell — used by /submit and other one-offs without a
 * dedicated layout. Editorial chrome (dark, floating header, dark footer)
 * for consistency with the rest of the marketing site.
 */
export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className="min-h-screen flex flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main
        className={cn("flex-1 container mx-auto px-4 py-16 md:py-24", className)}
        {...props}
      >
        {children}
      </main>
      <EditorialFooter />
    </div>
  )
}
