import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">General Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="Safari Overland Directory" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-url">Site URL</Label>
              <Input id="site-url" defaultValue="https://safari-overland.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              defaultValue="The ultimate directory for safari and overland travel experiences across Africa."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="maintenance-mode" />
            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">Listing Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-approve" />
            <Label htmlFor="auto-approve">Auto-approve new listings</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="allow-reviews" defaultChecked />
            <Label htmlFor="allow-reviews">Allow user reviews</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="featured-on-homepage" defaultChecked />
            <Label htmlFor="featured-on-homepage">Show featured listings on homepage</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="listings-per-page">Listings per page</Label>
            <Input id="listings-per-page" type="number" defaultValue="12" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-medium mb-4">Email Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input id="admin-email" type="email" defaultValue="admin@safari-overland.com" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" defaultChecked />
            <Label htmlFor="email-notifications">Email notifications for new listings</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="user-notifications" defaultChecked />
            <Label htmlFor="user-notifications">Email users when their listing is approved</Label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2">
          Cancel
        </Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
