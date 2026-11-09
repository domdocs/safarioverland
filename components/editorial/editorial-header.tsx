import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { MobileDrawer, type DrawerLink } from "./mobile-drawer"
import { StartBriefLink } from "@/components/analytics/start-brief-link"
import { cn } from "@/lib/utils"

type EditorialHeaderProps = {
  /** Variant: floating overlays a hero image; standard sits on the page bg. */
  variant?: "standard" | "floating"
  className?: string
}

// Self-drive relaunch IA (handoff/relaunch/STRATEGY.md §7). Sign in and
// Register are no longer advertised here; /sign-in and /sign-up still work.
const PRIMARY: DrawerLink[] = [
  { href: "/routes", label: "Routes" },
  { href: "/categories", label: "The collection" },
  { href: "/destinations/southern-africa", label: "Southern Africa" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/plan", label: "By hand" },
  { href: "/about", label: "About" },
]

// Bottom-of-drawer CTA, in the slot Sign in / Register used to fill.
const DRAWER_CTA: DrawerLink[] = [
  { href: "/plan", label: "Start a brief →", primary: true },
]

const SECONDARY: DrawerLink[] = [
  { href: "/search", label: "Search" },
  { href: "/contact", label: "Contact" },
]

/**
 * Editorial site header — replaces components/header.tsx.
 *
 * Layout:
 *   [logo]          [primary nav]                 [search] [start a brief]
 *
 * On <xl the primary nav collapses into the MobileDrawer overlay (six
 * items no longer fit beside the logo and CTA at lg).
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

        {/* Primary nav (xl+) */}
        <nav aria-label="Primary" className="hidden xl:flex items-center gap-6">
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

        {/* Search + brief CTA (xl+) */}
        <div className="hidden xl:flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="text-bone-mute hover:text-amber transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>
          <StartBriefLink
            source="header"
            className="bg-amber px-4 py-2 mono text-night hover:bg-amber-deep transition-colors"
          >
            Start a brief →
          </StartBriefLink>
        </div>

        {/* Mobile drawer (xl-) */}
        <MobileDrawer links={PRIMARY} authLinks={DRAWER_CTA} secondaryLinks={SECONDARY} />
      </div>
    </header>
  )
}
