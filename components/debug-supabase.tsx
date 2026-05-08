"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugSupabase() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkSupabaseConnection = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/db-check")
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error checking Supabase connection:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Supabase Connection Debugger</CardTitle>
        <CardDescription>Check if your Supabase connection is working properly</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={checkSupabaseConnection} disabled={loading} className="mb-4">
          {loading ? "Checking..." : "Check Supabase Connection"}
        </Button>

        {error && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Connection Status:</h3>
            <p className={result.success ? "text-green-600" : "text-red-600"}>
              {result.connectionStatus || "Connection failed"}
            </p>

            {result.knownTables && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Known tables:</h3>
                <ul className="list-disc pl-5">
                  {result.knownTables.map((table: string, index: number) => (
                    <li key={index}>{table}</li>
                  ))}
                </ul>
                <p className="text-xs text-stone-500 mt-2">
                  These are the tables our migrations create. To browse rows, use the Supabase dashboard.
                </p>
              </>
            )}

            {result.errors && Object.values(result.errors).some(Boolean) && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Errors:</h3>
                <ul className="list-disc pl-5">
                  {Object.entries(result.errors).map(
                    ([key, value]: [string, any]) =>
                      value && (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ),
                  )}
                </ul>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
