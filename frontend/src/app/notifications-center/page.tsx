"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Bell, AlertTriangle, CheckCircle, Eye, BarChart3, Lock, Settings } from "lucide-react";

const notifications = [
  { id: 1, type: "crisis_alert", title: "New Crisis Alert: Negative Press Coverage", message: "TechBlog published a critical article about data practices", severity: "high", read: false, time: "2h ago", url: "/crisis" },
  { id: 2, type: "embargo_reminder", title: "Embargo Lifts Tomorrow: Series B", message: "Series B embargo lifts on Mar 10 at 9:00 AM ET", severity: "high", read: false, time: "5h ago", url: "/embargo" },
  { id: 3, type: "approval_needed", title: "Approval Requested: Partnership Release", message: "John Doe requested approval for partnership announcement draft", severity: "medium", read: false, time: "1d ago", url: "/approvals" },
  { id: 4, type: "mention", title: "New Media Mention: TechCrunch", message: "Mentioned in 'Rising AI Startups to Watch in 2026'", severity: "low", read: true, time: "5d ago", url: "/monitoring" },
  { id: 5, type: "campaign_milestone", title: "Q2 Product Launch at 65%", message: "Campaign reached 65% completion milestone", severity: "low", read: true, time: "2d ago", url: "/campaigns" },
];

const typeIcons: Record<string, typeof Bell> = {
  crisis_alert: AlertTriangle,
  embargo_reminder: Lock,
  approval_needed: CheckCircle,
  mention: Eye,
  campaign_milestone: BarChart3,
};

export default function NotificationsCenterPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [activeTab, setActiveTab] = useState<"notifications" | "settings">("notifications");

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}><Settings size={14} /> Settings</Button>
          <Button variant="outline" size="sm">Mark All Read</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(["notifications", "settings"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded capitalize ${activeTab === tab ? "bg-white shadow" : "text-gray-600"}`}
          >{tab}</button>
        ))}
      </div>

      {activeTab === "notifications" ? (
        <>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setFilter("all")} className={`px-3 py-1 text-sm rounded ${filter === "all" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"}`}>All ({notifications.length})</button>
            <button onClick={() => setFilter("unread")} className={`px-3 py-1 text-sm rounded ${filter === "unread" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"}`}>Unread ({unreadCount})</button>
          </div>
          <div className="space-y-2">
            {filtered.map((notif) => {
              const Icon = typeIcons[notif.type] || Bell;
              return (
                <Card key={notif.id} className={!notif.read ? "border-l-4 border-l-indigo-500" : ""}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.severity === "high" ? "bg-red-100" : notif.severity === "medium" ? "bg-yellow-100" : "bg-gray-100"
                    }`}>
                      <Icon size={18} className={
                        notif.severity === "high" ? "text-red-600" : notif.severity === "medium" ? "text-yellow-600" : "text-gray-600"
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className={`text-sm font-medium ${!notif.read ? "text-gray-900" : "text-gray-600"}`}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
                      </div>
                      <p className="text-xs text-gray-500">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                    <Badge variant={notif.severity === "high" ? "danger" : notif.severity === "medium" ? "warning" : "default"}>
                      {notif.severity}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            {[
              { event: "Crisis Alerts", channels: ["email", "slack", "in_app"], enabled: true },
              { event: "Embargo Reminders", channels: ["email", "slack", "in_app"], enabled: true },
              { event: "Approval Requests", channels: ["email", "slack", "in_app"], enabled: true },
              { event: "Media Mentions", channels: ["in_app"], enabled: true },
              { event: "Campaign Milestones", channels: ["in_app"], enabled: true },
              { event: "Social Engagement", channels: [], enabled: false },
            ].map((setting) => (
              <div key={setting.event} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{setting.event}</p>
                  <div className="flex gap-1 mt-1">
                    {setting.channels.map((ch) => (
                      <Badge key={ch} variant="info">{ch}</Badge>
                    ))}
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Slack Integration</p>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Slack webhook URL" />
            <Button variant="outline" size="sm" className="mt-2">Save Webhook</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
