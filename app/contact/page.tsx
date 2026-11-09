import Link from "next/link"
import { Metadata } from "next"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { ContactForm } from "./contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with the Safari Overland team for inquiries about safari listings, partnerships, or support.",
  alternates: { canonical: "https://safarioverland.com/contact" },
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about safari planning? Need help with your listing? 
            We&apos;re based in Victoria Falls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contact information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Victoria Falls</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+44 7537 143 112</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@safarioverland.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">I run a lodge — can I be listed?</h3>
                <p className="text-muted-foreground mb-4">
                  We add operators by invitation, after we've visited or spoken at length. The bar is editorial fit, not category coverage. If you'd like to be considered, write to Niels directly.
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  For operators <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How can I update an existing listing?</h3>
                <p className="text-muted-foreground mb-4">
                  Email Niels directly with any change you'd like reflected — new photography, an updated founder note, a seasonal price shift. We'll review and update the entry promptly.
                </p>
                <Link 
                  href="mailto:info@safarioverland.com" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Contact support <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Do you offer advertising opportunities?</h3>
                <p className="text-muted-foreground mb-4">
                  No. Operators never pay to be listed, and we don&apos;t sell featured placements or advertising. We earn from the trips we book.
                </p>
                <Link 
                  href="mailto:info@safarioverland.com" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Contact us <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How can I partner with Safari Overland?</h3>
                <p className="text-muted-foreground mb-4">
                  We're always open to collaborations with travel agencies, conservation organizations, and other stakeholders in the safari industry. Send us an email outlining your partnership proposal. A partnership never buys a place in the collection.
                </p>
                <Link 
                  href="mailto:info@safarioverland.com" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Propose a partnership <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 