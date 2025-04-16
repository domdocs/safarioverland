import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | Safari Overland",
  description: "Reset your Safari Overland account password",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="container flex-1 py-10 md:py-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          <ForgotPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/sign-in" className="hover:text-brand underline underline-offset-4">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
