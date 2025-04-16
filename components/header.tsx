import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full py-2 px-4">
      <div
        className="container flex h-16 items-center justify-between rounded-lg shadow-lg"
        style={{ backgroundColor: "#4F6D7A" }}
      >
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white flex items-center justify-center border border-gray-200">
              <Image
                src="/images/logo.png"
                alt="Safari Overland Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-medium text-sm hidden sm:inline-block text-white">Safari Overland</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white">
          <Link href="/categories" className="text-sm font-medium hover:text-primary">
            Categories
          </Link>
          <Link href="/destinations" className="text-sm font-medium hover:text-primary">
            Destinations
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/resources" className="text-sm font-medium hover:text-primary">
            Resources
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary">
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden md:flex">
              Register
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/signin">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
