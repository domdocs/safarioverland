import { getSettings } from "@/lib/settings"
import { SettingsForm } from "@/components/settings-form"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin settings</h1>
        <p className="text-stone-600 mt-1">
          Site-wide configuration. Changes apply on the next page load — most
          consumers read these values fresh per request.
        </p>
      </div>

      <SettingsForm initial={settings} />
    </div>
  )
}
