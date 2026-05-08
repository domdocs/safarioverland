import Link from "next/link"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { SignInForm } from "@/components/sign-in-form"
import { Eyebrow } from "@/components/editorial/eyebrow"

export const metadata: Metadata = {
  title: "Sign In | Safari Overland",
  description: "Sign in to your Safari Overland account.",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div>
            <Eyebrow withRule>Sign in</Eyebrow>
            <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
              Welcome back.
            </h1>
            <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              Enter your credentials to access your account.
            </p>
          </div>
          <SignInForm />
          <p className="text-center mono text-bone-mute">
            <Link
              href="/sign-up"
              className="hover:text-amber transition-colors"
            >
              Don&apos;t have an account? Sign up →
            </Link>
          </p>
        </div>
      </main>
      <EditorialFooter />
    </div>
  )
}
