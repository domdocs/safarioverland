import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Safari Overland</h3>
            <p className="text-sm text-gray-200 mb-4">
              Connecting travelers with safari service providers across Africa since 2018.
            </p>
            <div className="flex space-x-4">
              <Link href="/social/facebook" className="text-white hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="/social/twitter" className="text-white hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="/social/instagram" className="text-white hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/booking-agents" className="hover:text-primary">
                  Booking Agents
                </Link>
              </li>
              <li>
                <Link href="/categories/campsites" className="hover:text-primary">
                  Campsites
                </Link>
              </li>
              <li>
                <Link href="/categories/lodges" className="hover:text-primary">
                  Lodges
                </Link>
              </li>
              <li>
                <Link href="/categories/4x4-rentals" className="hover:text-primary">
                  4x4 Rentals
                </Link>
              </li>
              <li>
                <Link href="/categories/guided-tours" className="hover:text-primary">
                  Guided Tours
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Regions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations/east-africa" className="hover:text-primary">
                  East Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/southern-africa" className="hover:text-primary">
                  Southern Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/west-africa" className="hover:text-primary">
                  West Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/north-africa" className="hover:text-primary">
                  North Africa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/planning-guides" className="hover:text-primary">
                  Safari Planning Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/safety-tips" className="hover:text-primary">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/conservation" className="hover:text-primary">
                  Conservation Information
                </Link>
              </li>
              <li>
                <Link href="/resources/seasonal-guides" className="hover:text-primary">
                  Seasonal Guides
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Safari Overland. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
