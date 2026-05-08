import Link from "next/link"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Eyebrow } from "@/components/editorial/eyebrow"

export const metadata: Metadata = {
  title: "Forgot Password | Safari Overland",
  description: "Reset your Safari Overland account password.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div>
            <Eyebrow withRule>Reset password</Eyebrow>
            <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
              Forgot password?
            </h1>
            <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          <ForgotPasswordForm />
          <p className="text-center mono text-bone-mute">
            <Link
              href="/sign-in"
              className="hover:text-amber transition-colors"
            >
              ← Back to sign in
            </Link>
          </p>
        </div>
      </main>
      <EditorialFooter />
    </div>
  )
}
