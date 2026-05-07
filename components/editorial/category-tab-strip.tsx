import Link from "next/link"
import { cn } from "@/lib/utils"

export type CategoryTab = {
  href: string
  label: string
  /** Whether this tab is the current page. */
  active?: boolean
}

type Props = {
  tabs: CategoryTab[]
  className?: string
  /** When true, sticks to the top of the viewport. */
  sticky?: boolean
}

/**
 * Sticky horizontal category tab strip — used at the top of category /
 * listings index pages. Server Component.
 *
 * Visual: hairline-ruled row of mono labels; the active tab is amber and
 * underlined with a 2px amber rule.
 *
 * Scrolls horizontally on overflow, so it works on every viewport without
 * collapsing into a select.
 */
export function CategoryTabStrip({ tabs, className, sticky = true }: Props) {
  return (
    <div
      className={cn(
        "z-40 w-full border-y border-rule bg-night/95 backdrop-blur",
        sticky && "sticky top-16",
        className,
      )}
    >
      <nav aria-label="Categories" className="container">
        <ul className="-mx-1 flex items-stretch overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <li key={tab.href} className="shrink-0">
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={cn(
                  "block px-4 py-4 mono transition-colors",
                  tab.active
                    ? "text-amber border-b-2 border-amber"
                    : "text-bone-mute hover:text-amber border-b-2 border-transparent",
                )}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
