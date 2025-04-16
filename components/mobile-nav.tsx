import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Safari Overland Logo" width={150} height={40} className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="/categories"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            Categories
          </Link>
          <Link
            href="/destinations"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            Destinations
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            About
          </Link>
          <Link
            href="/resources"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            Resources
          </Link>
          <Link
            href="/community"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            Community
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
            Contact
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2 p-4 border-t">
        <Button variant="outline" className="w-full">
          Sign In
        </Button>
        <Button className="w-full">Register</Button>
      </div>
    </div>
  )
}
