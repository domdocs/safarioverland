import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignUpForm } from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up | Safari Overland",
  description: "Create a new Safari Overland account",
}

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="container flex-1 py-10 md:py-16">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details to create your Safari Overland account</p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/sign-in" className="hover:text-brand underline underline-offset-4">
              Already have an account? Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
