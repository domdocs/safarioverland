import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-night/95 backdrop-blur border-b border-rule">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-bone hover:bg-card hover:text-amber"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-night text-bone border-rule">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Safari Overland — home"
          >
            <Image
              src="/images/logo/safari-overland-mark-256.webp"
              alt=""
              width={40}
              height={40}
              priority
              className="h-10 w-10"
            />
            <span className="font-serif text-xl tracking-tight hidden sm:inline-block text-bone">
              Safari Overland
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 mono text-bone-mute">
          <Link href="/categories" className="transition-colors hover:text-amber">
            Categories
          </Link>
          <Link href="/destinations" className="transition-colors hover:text-amber">
            Destinations
          </Link>
          <Link href="/about" className="transition-colors hover:text-amber">
            About
          </Link>
          <Link href="/resources" className="transition-colors hover:text-amber">
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button
              variant="ghost"
              size="icon"
              className="text-bone-mute hover:bg-card hover:text-amber"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-bone-mute hover:bg-card hover:text-amber"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm" className="hidden md:flex">
              Register
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-bone-mute hover:bg-card hover:text-amber"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-night text-bone border-rule">
              <div className="flex flex-col gap-4 py-4">
                <Link href="/sign-in">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
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
