import Link from "next/link"
import type { Metadata } from "next"
import { EditorialHeader } from "@/components/editorial/editorial-header"
import { EditorialFooter } from "@/components/editorial/editorial-footer"
import { SignUpForm } from "@/components/sign-up-form"
import { Eyebrow } from "@/components/editorial/eyebrow"

export const metadata: Metadata = {
  title: "Sign Up | Safari Overland",
  description: "Create a new Safari Overland account.",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-bone">
      <EditorialHeader variant="floating" />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mx-auto flex w-full max-w-md flex-col gap-8">
          <div>
            <Eyebrow withRule>Sign up</Eyebrow>
            <h1 className="mt-6 font-serif text-h1-fluid text-bone leading-tight tracking-tight text-balance">
              Create an account.
            </h1>
            <p className="mt-4 font-serif italic text-h4-fluid text-bone-mute leading-snug">
              Enter your details to create your Safari Overland account.
            </p>
          </div>
          <SignUpForm />
          <p className="text-center mono text-bone-mute">
            <Link
              href="/sign-in"
              className="hover:text-amber transition-colors"
            >
              Already have an account? Sign in →
            </Link>
          </p>
        </div>
      </main>
      <EditorialFooter />
    </div>
  )
}
