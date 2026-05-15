import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Listings | Admin Dashboard",
  description: "Manage every listing in the Safari Overland collection.",
}

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 