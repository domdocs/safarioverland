"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { DownloadGateModal } from "./download-gate-modal"
import { SUBSCRIBER_COOKIE } from "@/lib/downloads/resources"

type RequestPayload = {
  slug: string
  title: string
  description: string
}

type Ctx = {
  request: (payload: RequestPayload) => Promise<void>
}

const DownloadGateContext = createContext<Ctx | null>(null)

export function useDownloadGate(): Ctx {
  const ctx = useContext(DownloadGateContext)
  if (!ctx) throw new Error("useDownloadGate must be used inside DownloadGateProvider")
  return ctx
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function attemptDirectDownload(slug: string): Promise<"ok" | "needs_email" | "pending" | "error"> {
  // Use a HEAD/GET that follows redirects. We open in a new tab to actually download.
  // Strategy: use fetch with redirect: 'manual' to detect the 302; then navigate.
  try {
    const response = await fetch(`/api/downloads/${encodeURIComponent(slug)}`, {
      method: "GET",
      redirect: "manual",
      credentials: "same-origin",
    })
    if (response.status === 401) return "needs_email"
    if (response.status === 202) return "pending"
    if (response.type === "opaqueredirect" || response.status === 302 || response.ok) {
      // Trigger the actual navigation in a new tab so the page state is preserved.
      window.open(`/api/downloads/${encodeURIComponent(slug)}`, "_blank", "noopener,noreferrer")
      return "ok"
    }
    return "error"
  } catch {
    return "error"
  }
}

export function DownloadGateProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<RequestPayload | null>(null)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)

  const request = useCallback(async (payload: RequestPayload) => {
    const known = !!readCookie(SUBSCRIBER_COOKIE)

    if (known) {
      const result = await attemptDirectDownload(payload.slug)
      if (result === "ok") return
      if (result === "pending") {
        setPending(payload)
        setPendingMessage("This resource is being finalised — we'll email it to you the moment it's ready.")
        return
      }
      // 401 / error — fall back to the form
    }

    setPendingMessage(null)
    setPending(payload)
  }, [])

  return (
    <DownloadGateContext.Provider value={{ request }}>
      {children}
      <DownloadGateModal
        request={pending}
        pendingMessage={pendingMessage}
        onClose={() => {
          setPending(null)
          setPendingMessage(null)
        }}
      />
    </DownloadGateContext.Provider>
  )
}
