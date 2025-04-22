import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Terms of Service | Safari Overland",
  description: "Read the Safari Overland Terms of Service agreement, governing your use of our website and services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <Card className="mb-8">
          <CardContent className="p-6 prose prose-slate max-w-none">
            <p className="lead text-lg">
              Welcome to Safari Overland. These Terms of Service govern your use of our website and the services we offer. 
              By accessing or using our website, you agree to be bound by these Terms.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using the Safari Overland website, located at <Link href="/" className="text-primary hover:underline">https://safarioverland.com</Link> (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these Terms, you should not access or use the Site.
            </p>
            <p className="mb-4">
              We may modify these Terms at any time. Your continued use of the Site after any modifications indicates your acceptance of the modified Terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>"User"</strong> refers to any individual who accesses or uses the Site.</li>
              <li><strong>"Provider"</strong> refers to any business, organization, or individual who lists their services on the Site.</li>
              <li><strong>"Listing"</strong> refers to any safari service offered by a Provider on the Site.</li>
              <li><strong>"Content"</strong> refers to all text, images, videos, and other materials on the Site.</li>
              <li><strong>"Services"</strong> refers to all the services offered by Safari Overland.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
            <p className="mb-4">
              To access certain features of the Site, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.2 Account Security</h3>
            <p className="mb-4">
              You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.3 Account Termination</h3>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Listing Policies</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Listing Creation</h3>
            <p className="mb-4">
              When creating a listing on Safari Overland, Providers must provide accurate and complete information about their services. We reserve the right to reject, edit, or remove listings that do not comply with our policies.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">4.2 Listing Verification</h3>
            <p className="mb-4">
              While we make efforts to verify the accuracy of listings, we cannot guarantee that all information provided by Providers is accurate, complete, or reliable. Users are encouraged to conduct their own research before booking any services.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">4.3 Listing Reviews</h3>
            <p className="mb-4">
              Users who have booked services through a listing may leave reviews. Reviews must be truthful, accurate, and based on the user's actual experience. We reserve the right to remove reviews that violate our review policies.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">5. User Conduct</h2>
            <p className="mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating another person or entity</li>
              <li>Harassing, threatening, or intimidating any person</li>
              <li>Posting or transmitting unauthorized commercial messages or spam</li>
              <li>Attempting to access or tamper with non-public areas of the Site</li>
              <li>Interfering with or disrupting the functionality of the Site</li>
              <li>Using the Site for any illegal or unauthorized purpose</li>
              <li>Collecting or harvesting user data without permission</li>
              <li>Posting false, misleading, or deceptive content</li>
              <li>Using the Site in any way that could disable, overburden, or impair it</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Site Content</h3>
            <p className="mb-4">
              The Site and its original content, features, and functionality are owned by Safari Overland and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">6.2 User Content</h3>
            <p className="mb-4">
              By posting content on the Site, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, publicly display, publicly perform, reproduce, and distribute your content in connection with our Services. You retain all rights to your content.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">6.3 Provider Content</h3>
            <p className="mb-4">
              Providers retain all rights to their content. By submitting a listing, Providers grant us a license to use, display, and distribute their content in connection with our Services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The Site and all content and services provided through it are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p className="mb-4">
              Safari Overland does not warrant that the Site will be uninterrupted or error-free, that defects will be corrected, or that the Site or the server that makes it available are free of viruses or other harmful components.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Safari Overland shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Your access to or use of or inability to access or use the Site</li>
              <li>Any conduct or content of any third party on the Site</li>
              <li>Any content obtained from the Site</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Issues with services booked through the Site</li>
            </ul>
            <p className="mb-4">
              This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if we have been advised of the possibility of such damage.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Safari Overland and its licensors, service providers, employees, contractors, agents, officers, and directors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
            <p className="mb-4">
              The Site may contain links to third-party websites or services that are not owned or controlled by Safari Overland. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="mb-4">
              You acknowledge and agree that Safari Overland shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Zimbabwe, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Any dispute arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date at the top of this page.
            </p>
            <p className="mb-4">
              Your continued use of the Site after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new terms, please stop using the Site.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="mb-2"><strong>Safari Overland</strong></p>
              <p className="mb-2">123 Livingstone Way</p>
              <p className="mb-2">Victoria Falls, Zimbabwe</p>
              <p className="mb-2">Email: legal@safarioverland.com</p>
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