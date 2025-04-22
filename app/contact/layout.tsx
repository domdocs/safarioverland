import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToastProvider } from "./toast-provider"

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ToastProvider />
    </div>
  )
} 