"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import {
  User,
  Bell,
  Shield,
  Palette,
  Key,
  CreditCard,
  Save,
  Eye,
  EyeOff,
  Check,
  Link as LinkIcon,
} from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "brand", label: "Brand Voice", icon: Palette },
    { key: "integrations", label: "Integrations", icon: LinkIcon },
    { key: "api", label: "API Keys", icon: Key },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="section-subtitle">Manage your account, preferences, and integrations.</p>
        </div>
        <Button className="gap-1.5" onClick={handleSave}>
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.key
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeSection === "profile" && (
            <>
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-gray-400 mt-2">JPG or PNG. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" id="firstName" />
                  <Input label="Last Name" defaultValue="Doe" id="lastName" />
                  <Input label="Email" defaultValue="john@company.com" id="email" type="email" />
                  <Input label="Phone" defaultValue="+1 (415) 555-0100" id="phone" />
                  <Input label="Company" defaultValue="Acme PR" id="company" />
                  <Input label="Role" defaultValue="PR Director" id="role" />
                </div>
              </Card>
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Company Name" defaultValue="Acme PR" id="companyName" />
                  <Input label="Website" defaultValue="https://acmepr.com" id="website" />
                  <Input label="Industry" defaultValue="Technology" id="industry" />
                  <Input label="Team Size" defaultValue="1-10" id="teamSize" />
                </div>
              </Card>
            </>
          )}

          {activeSection === "notifications" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { title: "Crisis Alerts", desc: "Get notified immediately when a potential crisis is detected", enabled: true },
                  { title: "Mention Alerts", desc: "Notifications when your brand is mentioned in media", enabled: true },
                  { title: "Campaign Updates", desc: "Progress updates on active campaigns", enabled: true },
                  { title: "AI Task Completion", desc: "Notifications when AI agents complete tasks", enabled: false },
                  { title: "Weekly Digest", desc: "Weekly summary of all PR activity", enabled: true },
                  { title: "Social Engagement", desc: "Alerts for high-engagement social posts", enabled: false },
                ].map((notification) => (
                  <div key={notification.title} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Notification Channels</h3>
                <div className="flex items-center gap-3">
                  {["Email", "In-App", "Slack", "SMS"].map((channel) => (
                    <label key={channel} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked={channel !== "SMS"} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      {channel}
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeSection === "brand" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Voice Settings</h2>
              <p className="text-sm text-gray-500 mb-6">Configure your default brand voice for AI-generated content.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Tone</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Professional", "Conversational", "Authoritative", "Innovative"].map((tone) => (
                      <button
                        key={tone}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                          tone === "Professional"
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Keywords</label>
                  <div className="flex flex-wrap gap-2">
                    {["innovative", "trustworthy", "data-driven", "human-first", "agile"].map((keyword) => (
                      <Badge key={keyword} variant="info">{keyword}</Badge>
                    ))}
                    <button className="px-2.5 py-0.5 rounded-full border border-dashed border-gray-300 text-xs text-gray-500 hover:border-gray-400">
                      + Add
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style Guidelines</label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y min-h-[100px]"
                    defaultValue="Use active voice. Keep sentences concise. Avoid jargon unless speaking to technical audiences. Always include data points when available."
                    rows={4}
                  />
                </div>
              </div>
            </Card>
          )}

          {activeSection === "integrations" && (
            <div className="space-y-4">
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h2>
                <div className="space-y-4">
                  {[
                    { name: "Slack", desc: "Send notifications and alerts to Slack channels", connected: true },
                    { name: "Google Analytics", desc: "Track newsroom page performance", connected: true },
                    { name: "LinkedIn", desc: "Publish content directly to LinkedIn", connected: false },
                    { name: "X/Twitter", desc: "Publish and monitor social content", connected: false },
                    { name: "PR Newswire", desc: "Distribute press releases to wire services", connected: false },
                    { name: "Muck Rack", desc: "Import journalist contacts and media lists", connected: false },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-semibold text-xs">
                          {integration.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                          <p className="text-sm text-gray-500">{integration.desc}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="success">Connected</Badge>
                          <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeSection === "api" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h2>
              <p className="text-sm text-gray-500 mb-6">Manage API keys for programmatic access to Humanculus.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Production API Key</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                          {showApiKey ? "hmnc_live_sk_a1b2c3d4e5f6g7h8i9j0..." : "hmnc_live_sk_••••••••••••••••"}
                        </code>
                        <button onClick={() => setShowApiKey(!showApiKey)} className="text-gray-400 hover:text-gray-600">
                          {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Active</Badge>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5"><Key size={14} />Create New Key</Button>
              </div>
            </Card>
          )}

          {activeSection === "billing" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h2>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="info">Current Plan</Badge>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">Professional Plan</h3>
                    <p className="text-sm text-gray-600 mt-1">$49/month &middot; Billed monthly</p>
                  </div>
                  <Button>Upgrade Plan</Button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Usage This Month</h3>
                {[
                  { label: "AI Generations", used: 145, limit: 500 },
                  { label: "Press Releases", used: 8, limit: 25 },
                  { label: "Social Posts", used: 47, limit: 200 },
                  { label: "Media Contacts", used: 6, limit: 100 },
                ].map((usage) => (
                  <div key={usage.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{usage.label}</span>
                      <span className="text-gray-900 font-medium">{usage.used} / {usage.limit}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === "security" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
                  <div className="space-y-3 max-w-md">
                    <Input label="Current Password" type="password" id="currentPassword" />
                    <Input label="New Password" type="password" id="newPassword" />
                    <Input label="Confirm New Password" type="password" id="confirmPassword" />
                    <Button size="sm">Update Password</Button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account.</p>
                      <Badge variant="warning" className="mt-2">Not Enabled</Badge>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: "Chrome on Windows", location: "San Francisco, CA", time: "Current session" },
                      { device: "Safari on macOS", location: "San Francisco, CA", time: "2 days ago" },
                    ].map((session, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} &middot; {session.time}</p>
                        </div>
                        {idx > 0 && <Button variant="ghost" size="sm">Revoke</Button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
