"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseBrowserClient, isSupabaseAvailable } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { AuthError } from "@supabase/supabase-js"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean | undefined>(undefined)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/admin'

  useEffect(() => {
    async function checkConnection() {
      const available = await isSupabaseAvailable()
      setIsConnected(available)
      if (!available) {
        toast.error("Unable to connect to authentication service. Please check your internet connection.")
      }
    }
    checkConnection()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      if (!isConnected) {
        throw new Error("Cannot sign in: No connection to authentication service")
      }

      console.log('Starting sign in process...')
      const supabase = await getSupabaseBrowserClient()
      if (!supabase) {
        throw new Error("Could not initialize authentication client")
      }

      // Clear any existing session first
      await supabase.auth.signOut()

      // Attempt to sign in
      console.log('Attempting to sign in...')
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Sign in error:', signInError)
        throw signInError
      }

      if (!signInData.session) {
        throw new Error("No session created after sign in")
      }

      console.log('Successfully signed in as:', signInData.session.user.email)
      toast.success("Signed in successfully")

      // Use router.push for client-side navigation
      router.push(redirectTo)
    } catch (error) {
      console.error('Sign in error:', error)
      
      if (error instanceof AuthError) {
        switch (error.name) {
          case 'AuthApiError':
            if (error.message.includes('Invalid login credentials')) {
              toast.error("Invalid email or password")
            } else if (error.message.includes('Failed to fetch')) {
              toast.error("Network error: Unable to reach authentication service")
            } else {
              toast.error(error.message)
            }
            break
          case 'AuthRetryableFetchError':
            toast.error("Network error: Please check your internet connection")
            break
          default:
            toast.error(error.message)
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  if (isConnected === false) {
    return (
      <div className="container max-w-md mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Connection Error</h1>
          <p>Unable to connect to authentication service.</p>
          <Button onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || isConnected === undefined || !isConnected}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  )
} 