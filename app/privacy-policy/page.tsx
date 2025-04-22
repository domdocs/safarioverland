import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Privacy Policy | Safari Overland",
  description: "Learn how Safari Overland collects, uses, and protects your personal information in compliance with GDPR and global privacy laws.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <Card className="mb-8">
          <CardContent className="p-6 prose prose-slate max-w-none">
            <p className="lead text-lg">
              At Safari Overland, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
            <p className="mb-4">
              This Privacy Policy applies to all information collected through our website <Link href="/" className="text-primary hover:underline">https://safarioverland.com</Link>, and any related services, sales, marketing, or events (collectively, the "Services").
            </p>
            <p className="mb-4">
              By using our website, you consent to the data practices described in this policy. If you do not agree with the data practices described, you should not use our website.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <p className="mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Register on our website</li>
              <li>Submit a listing</li>
              <li>Subscribe to our newsletter</li>
              <li>Request information or assistance</li>
              <li>Participate in promotions, contests, or surveys</li>
              <li>Contact us through our forms</li>
            </ul>
            <p className="mb-4">
              The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Name, email address, phone number</li>
              <li>Billing address and payment information</li>
              <li>Business information (for listings)</li>
              <li>Account preferences and settings</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring websites</li>
              <li>Geographic location (country and city level)</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Providing, operating, and maintaining our website</li>
              <li>Creating and managing your account</li>
              <li>Processing transactions and listing submissions</li>
              <li>Sending administrative information</li>
              <li>Sending marketing and promotional communications</li>
              <li>Responding to inquiries and customer service requests</li>
              <li>Improving user experience</li>
              <li>Protecting against fraud and unauthorized access</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookie Policy</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to collect and use information while you browse. Cookies are small data files placed on your device that allow us to remember your actions and preferences over time.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Essential cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Functional cookies:</strong> Enable personalized features and remember your preferences</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing cookies:</strong> Track your browsing habits to deliver targeted advertising</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">4.2 Cookie Management</h3>
            <p className="mb-4">
              You can control and manage cookies in various ways. Most browsers allow you to refuse or accept cookies and to delete them. The methods for doing so vary from browser to browser, and from version to version.
            </p>
            <p className="mb-4">
              Please note that blocking cookies may impact your experience on our website, as some features may not function properly.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
            <p className="mb-4">
              We may use third-party service providers to help us operate our website, conduct our business, or serve our users. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            <p className="mb-4">
              Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
            <p className="mb-4">
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Data Protection Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the following data protection rights:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">7.1 GDPR Rights (for EU Residents)</h3>
            <p className="mb-4">
              Under the General Data Protection Regulation (GDPR), you have:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Right to access:</strong> You can request copies of your personal data.</li>
              <li><strong>Right to rectification:</strong> You can request that we correct inaccurate information.</li>
              <li><strong>Right to erasure:</strong> You can request that we delete your personal data.</li>
              <li><strong>Right to restrict processing:</strong> You can request that we restrict the processing of your data.</li>
              <li><strong>Right to data portability:</strong> You can request the transfer of your data to another organization.</li>
              <li><strong>Right to object:</strong> You can object to our processing of your personal data.</li>
              <li><strong>Right regarding automated decision making:</strong> You have rights related to automated decision making and profiling.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">7.2 CCPA Rights (for California Residents)</h3>
            <p className="mb-4">
              Under the California Consumer Privacy Act (CCPA), California residents have specific rights regarding their personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Right to know:</strong> You can request information about the personal information we collect about you.</li>
              <li><strong>Right to delete:</strong> You can request that we delete your personal information.</li>
              <li><strong>Right to opt-out:</strong> You can opt-out of the sale of your personal information.</li>
              <li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
            </ul>
            <p className="mb-4">
              To exercise any of these rights, please contact us using the details provided in the "Contact Us" section.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
            <p className="mb-4">
              Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            <p className="mb-4">
              If you are located outside Zimbabwe and choose to provide information to us, please note that we transfer the data, including personal data, to Zimbabwe and process it there.
            </p>
            <p className="mb-4">
              Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our Services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take appropriate action.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="mb-2"><strong>Safari Overland</strong></p>
              <p className="mb-2">123 Livingstone Way</p>
              <p className="mb-2">Victoria Falls, Zimbabwe</p>
              <p className="mb-2">Email: privacy@safarioverland.com</p>
              <p>Phone: +263 83 123 4567</p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 