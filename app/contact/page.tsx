import Link from "next/link"
import { Metadata } from "next"
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, Clock } from "lucide-react"
import { ContactForm } from "./contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Contact Us | Safari Overland",
  description: "Get in touch with the Safari Overland team for inquiries about safari listings, partnerships, or support.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about safari planning? Need help with your listing? 
            Get in touch with our team based in Victoria Falls, Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">Aerodrome</p>
                      <p className="text-muted-foreground">Victoria Falls</p>
                      <p className="text-muted-foreground">Zimbabwe</p>
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
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM CAT</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM CAT</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Department Emails</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <p className="text-muted-foreground">info@safarioverland.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Partnerships</p>
                      <p className="text-muted-foreground">partners@safarioverland.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-muted-foreground">support@safarioverland.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Privacy Concerns</p>
                      <p className="text-muted-foreground">privacy@safarioverland.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Legal Matters</p>
                      <p className="text-muted-foreground">legal@safarioverland.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How do I list my safari business?</h3>
                <p className="text-muted-foreground mb-4">
                  To add your safari business to our directory, navigate to the 'Submit Listing' page and fill out the form. Our team will review your submission and get back to you within 48 hours.
                </p>
                <Link 
                  href="/submit" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Submit a listing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How can I update my existing listing?</h3>
                <p className="text-muted-foreground mb-4">
                  Log in to your account and navigate to 'Dashboard' > 'My Listings' to edit your business information. Alternatively, contact our support team for assistance.
                </p>
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Go to dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Do you offer advertising opportunities?</h3>
                <p className="text-muted-foreground mb-4">
                  Yes, we offer various promotional opportunities for safari businesses. Contact our partnerships team at partners@safarioverland.com for information about featured listings and advertising packages.
                </p>
                <Link 
                  href="mailto:partners@safarioverland.com" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  Contact partnerships <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">How can I partner with Safari Overland?</h3>
                <p className="text-muted-foreground mb-4">
                  We're always open to collaborations with travel agencies, conservation organizations, and other stakeholders in the safari industry. Send us an email outlining your partnership proposal.
                </p>
                <Link 
                  href="mailto:partners@safarioverland.com" 
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