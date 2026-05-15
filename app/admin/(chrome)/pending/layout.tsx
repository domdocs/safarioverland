import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pending Listings | Admin Dashboard",
  description: "Review and approve pending listings for the Safari Overland collection.",
}

export default function PendingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 