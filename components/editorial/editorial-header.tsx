import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { MobileDrawer, type DrawerLink } from "./mobile-drawer"
import { cn } from "@/lib/utils"

type EditorialHeaderProps = {
  /** Variant: floating overlays a hero image; standard sits on the page bg. */
  variant?: "standard" | "floating"
  className?: string
}

const PRIMARY: DrawerLink[] = [
  { href: "/categories", label: "Categories" },
  { href: "/destinations", label: "Destinations" },
  { href: "/plan", label: "By hand" },
  { href: "/resources", label: "Field notes" },
  { href: "/about", label: "About" },
]

const AUTH: DrawerLink[] = [
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Register", primary: true },
]

const SECONDARY: DrawerLink[] = [
  { href: "/search", label: "Search" },
  { href: "/contact", label: "Contact" },
]

/**
 * Editorial site header — replaces components/header.tsx.
 *
 * Layout:
 *   [logo]          [primary nav]                 [search] [sign in] [register]
 *
 * On <lg the primary nav collapses into the MobileDrawer overlay.
 *
 * Server Component. The MobileDrawer is the only client island inside.
 */
export function EditorialHeader({ variant = "standard", className }: EditorialHeaderProps) {
  const wrapperClass = cn(
    "sticky top-0 z-50 w-full",
    variant === "floating"
      ? "bg-night/70 backdrop-blur-md"
      : "bg-night/95 backdrop-blur border-b border-rule",
    className,
  )

  return (
    <header className={wrapperClass}>
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Safari Overland — home"
        >
          <Image
            src="/images/logo/safari-overland-mark-256.webp"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-serif text-xl tracking-tight text-bone group-hover:text-amber transition-colors">
            Safari Overland
          </span>
        </Link>

        {/* Primary nav (lg+) */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {PRIMARY.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mono text-bone-mute hover:text-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth + search (lg+) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="text-bone-mute hover:text-amber transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/sign-in"
            className="mono text-bone-mute hover:text-amber transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/plan"
            className="bg-amber px-4 py-2 mono text-night hover:bg-amber-deep transition-colors"
          >
            Start a brief →
          </Link>
        </div>

        {/* Mobile drawer (lg-) */}
        <MobileDrawer links={PRIMARY} authLinks={AUTH} secondaryLinks={SECONDARY} />
      </div>
    </header>
  )
}
