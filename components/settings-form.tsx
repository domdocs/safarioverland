"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { AppSettings } from "@/lib/settings"

type Props = { initial: AppSettings }

export function SettingsForm({ initial }: Props) {
  const [values, setValues] = useState<AppSettings>(initial)
  const [pristine, setPristine] = useState<AppSettings>(initial)
  const [saving, setSaving] = useState(false)

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  const dirty = JSON.stringify(values) !== JSON.stringify(pristine)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_name: values.site_name,
          site_description: values.site_description,
          maintenance_mode: values.maintenance_mode,
          auto_approve_listings: values.auto_approve_listings,
          allow_user_reviews: values.allow_user_reviews,
          show_featured_on_home: values.show_featured_on_home,
          listings_per_page: values.listings_per_page,
          notification_email: values.notification_email || null,
          notify_admin_on_new: values.notify_admin_on_new,
          notify_user_on_approval: values.notify_user_on_approval,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(body.message || body.error || `HTTP ${res.status}`)
      }
      const next: AppSettings = body.settings
      setValues(next)
      setPristine(next)
      toast.success("Settings saved")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setValues(pristine)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General */}
      <Section
        title="General"
        body="Site identity and a global maintenance toggle. Maintenance mode is an honest banner; you'll need to wire it where you want it shown."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="site_name">Site name</Label>
            <Input
              id="site_name"
              value={values.site_name ?? ""}
              onChange={(e) => update("site_name", e.target.value)}
              placeholder="Safari Overland"
            />
          </div>
          <div>
            <Label htmlFor="listings_per_page">Listings per page</Label>
            <Input
              id="listings_per_page"
              type="number"
              inputMode="numeric"
              min={1}
              max={100}
              value={values.listings_per_page}
              onChange={(e) => update("listings_per_page", Number(e.target.value) || 1)}
            />
            <p className="text-xs text-stone-500 mt-1">
              Used by /admin/listings, /admin/pending, and /categories/[category].
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="site_description">Site description</Label>
          <Textarea
            id="site_description"
            value={values.site_description ?? ""}
            onChange={(e) => update("site_description", e.target.value)}
            rows={3}
          />
        </div>

        <SwitchRow
          id="maintenance_mode"
          label="Maintenance mode"
          hint="Soft-flag for use by a future maintenance banner. Doesn't disable anything yet."
          checked={values.maintenance_mode}
          onCheckedChange={(v) => update("maintenance_mode", v)}
        />
      </Section>

      {/* Listings */}
      <Section
        title="Listings"
        body="Workflow toggles for the directory."
      >
        <SwitchRow
          id="auto_approve_listings"
          label="Auto-approve new listings"
          hint="When ON, new submissions land as approved. When OFF, they go to /admin/pending for review."
          checked={values.auto_approve_listings}
          onCheckedChange={(v) => update("auto_approve_listings", v)}
        />
        <SwitchRow
          id="allow_user_reviews"
          label="Allow user reviews"
          hint="Reviews UI not shipped yet. Toggle ready for the consumer."
          checked={values.allow_user_reviews}
          onCheckedChange={(v) => update("allow_user_reviews", v)}
        />
        <SwitchRow
          id="show_featured_on_home"
          label="Show featured listings on the home page"
          hint="When OFF, the homepage's featured rail is hidden."
          checked={values.show_featured_on_home}
          onCheckedChange={(v) => update("show_featured_on_home", v)}
        />
      </Section>

      {/* Email */}
      <Section
        title="Email"
        body="Inbox + transactional toggles. Used by the listing-approval flow and the contact / brief-notify emails."
      >
        <div>
          <Label htmlFor="notification_email">Notification email</Label>
          <Input
            id="notification_email"
            type="email"
            value={values.notification_email ?? ""}
            onChange={(e) => update("notification_email", e.target.value)}
            placeholder="planner@safarioverland.com"
          />
          <p className="text-xs text-stone-500 mt-1">
            Falls back to the <code>NOTIFICATION_EMAIL</code> env var when blank.
          </p>
        </div>

        <SwitchRow
          id="notify_admin_on_new"
          label="Email me when a new listing is submitted"
          hint="Sends to the notification email above."
          checked={values.notify_admin_on_new}
          onCheckedChange={(v) => update("notify_admin_on_new", v)}
        />
        <SwitchRow
          id="notify_user_on_approval"
          label="Email submitter when their listing is approved"
          hint="Sends to the listing's contact_email."
          checked={values.notify_user_on_approval}
          onCheckedChange={(v) => update("notify_user_on_approval", v)}
        />
      </Section>

      <div className="flex items-center gap-3 border-t pt-6">
        <Button type="submit" disabled={saving || !dirty}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving…
            </>
          ) : (
            "Save settings"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={saving || !dirty}
        >
          Reset
        </Button>
        {!dirty && (
          <span className="text-xs text-stone-500">
            Last saved {new Date(values.updated_at).toLocaleString()}
          </span>
        )}
      </div>
    </form>
  )
}

function Section({
  title,
  body,
  children,
}: {
  title: string
  body?: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {body && <p className="text-sm text-stone-500 mt-1">{body}</p>}
      </div>
      {children}
    </section>
  )
}

function SwitchRow({
  id,
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  hint?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t pt-4 first:border-t-0 first:pt-0">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
        {hint && <p className="text-xs text-stone-500 mt-1">{hint}</p>}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
