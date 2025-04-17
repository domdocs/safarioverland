import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pending Listings | Admin Dashboard",
  description: "Review and approve pending listings in the Safari Overland Directory.",
}

export default function PendingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 