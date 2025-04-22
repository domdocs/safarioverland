import { ToastProvider } from "./toast-provider"

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  )
} 