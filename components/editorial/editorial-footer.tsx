import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { SectionRule } from "./section-rule"

const COLUMNS = [
  {
    label: "Categories",
    links: [
      { href: "/categories/lodges", label: "Lodges" },
      { href: "/categories/guided-tours", label: "Guided tours" },
      { href: "/categories/game-viewing", label: "Game viewing" },
    ],
  },
  {
    label: "Regions",
    links: [
      { href: "/destinations/east-africa", label: "East Africa" },
      { href: "/destinations/southern-africa", label: "Southern Africa" },
      { href: "/destinations/west-africa", label: "West Africa" },
      { href: "/destinations/north-africa", label: "North Africa" },
    ],
  },
  {
    label: "Field notes",
    links: [
      { href: "/resources/planning-guides", label: "Planning guides" },
      { href: "/resources/seasonal-guides", label: "Seasonal guides" },
      { href: "/resources/conservation", label: "Conservation" },
      { href: "/resources/safety-tips", label: "Safety" },
    ],
  },
]

const SOCIAL = [
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "Twitter", Icon: Twitter },
  { href: "#", label: "Instagram", Icon: Instagram },
]

const POLICY = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
  { href: "/contact", label: "Contact" },
]

/**
 * Editorial site footer — replaces components/footer.tsx.
 *
 * Layout:
 *   Top: brand + manifesto, then 3 link columns
 *   Hairline rule
 *   Bottom: copyright, social, policy
 */
export function EditorialFooter() {
  return (
    <footer className="bg-ink text-bone border-t border-rule">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-5 max-w-md">
            <p className="eyebrow mb-4">Safari Overland</p>
            <p className="font-serif text-h3-fluid text-bone leading-tight mb-6">
              A small collection of African safaris, by hand.
            </p>
            <p className="text-bone-mute leading-relaxed">
              Lodges and operators chosen for what the wild does to you —
              not just what it shows you. From Victoria Falls.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.label}>
                <p className="eyebrow mb-4">{col.label}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-bone-mute hover:text-amber transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <SectionRule className="my-12" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="mono text-bone-mute">
            © {new Date().getFullYear()} Safari Overland. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone-mute hover:text-amber transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <ul className="flex flex-wrap items-center gap-6 mono">
            {POLICY.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="text-bone-mute hover:text-amber transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
