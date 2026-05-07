import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-ink text-bone border-t border-rule">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl text-bone mb-4">Safari Overland</h3>
            <p className="text-sm text-bone-mute mb-4">
              Connecting travelers with safari service providers across Africa since 2018.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-bone-mute hover:text-amber transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-bone-mute hover:text-amber transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-bone-mute hover:text-amber transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/booking-agents" className="text-bone-mute hover:text-amber transition-colors">
                  Booking Agents
                </Link>
              </li>
              <li>
                <Link href="/categories/campsites" className="text-bone-mute hover:text-amber transition-colors">
                  Campsites
                </Link>
              </li>
              <li>
                <Link href="/categories/lodges" className="text-bone-mute hover:text-amber transition-colors">
                  Lodges
                </Link>
              </li>
              <li>
                <Link href="/categories/4x4-rentals" className="text-bone-mute hover:text-amber transition-colors">
                  4x4 Rentals
                </Link>
              </li>
              <li>
                <Link href="/categories/guided-tours" className="text-bone-mute hover:text-amber transition-colors">
                  Guided Tours
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Regions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations/east-africa" className="text-bone-mute hover:text-amber transition-colors">
                  East Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/southern-africa" className="text-bone-mute hover:text-amber transition-colors">
                  Southern Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/west-africa" className="text-bone-mute hover:text-amber transition-colors">
                  West Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/north-africa" className="text-bone-mute hover:text-amber transition-colors">
                  North Africa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/planning-guides" className="text-bone-mute hover:text-amber transition-colors">
                  Safari Planning Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/safety-tips" className="text-bone-mute hover:text-amber transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/conservation" className="text-bone-mute hover:text-amber transition-colors">
                  Conservation Information
                </Link>
              </li>
              <li>
                <Link href="/resources/seasonal-guides" className="text-bone-mute hover:text-amber transition-colors">
                  Seasonal Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-rule mt-8 pt-8 text-sm text-bone-mute">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Safari Overland. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-bone-mute hover:text-amber transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-bone-mute hover:text-amber transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-bone-mute hover:text-amber transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
