import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { ToastProvider } from "./toast-provider"

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
      <ToastProvider />
    </div>
  )
}
