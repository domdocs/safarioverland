import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn("flex-1 container mx-auto px-4", className)} {...props}>
        {children}
      </main>
      <Footer />
    </div>
  )
} 