import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In | Safari Overland",
  description: "Sign in to your Safari Overland account",
}

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="container flex-1 py-10 md:py-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/sign-up" className="hover:text-brand underline underline-offset-4">
              Don&apos;t have an account? Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
