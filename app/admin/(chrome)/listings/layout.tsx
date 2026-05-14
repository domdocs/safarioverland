import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Listings | Admin Dashboard",
  description: "Manage all directory listings in the Safari Overland Directory.",
}

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 