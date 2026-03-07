"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Send, Mail, BarChart3, Clock, Users, Plus } from "lucide-react";

const distributions = [
  { id: 1, subject: "Series A Funding Announcement", recipients: 45, status: "sent", date: "Feb 15, 2026", open_rate: 62.2, click_rate: 18.5 },
  { id: 2, subject: "New Feature Launch Press Release", recipients: 38, status: "sent", date: "Feb 28, 2026", open_rate: 55.3, click_rate: 14.2 },
  { id: 3, subject: "Q1 Industry Report Embargo", recipients: 22, status: "scheduled", date: "Mar 15, 2026", open_rate: null, click_rate: null },
];

export default function DistributionPage() {
  const [activeTab, setActiveTab] = useState<"history" | "compose">("history");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Distribution</h1>
          <p className="text-gray-500 mt-1">Send press releases to media contacts and track engagement</p>
        </div>
        <Button onClick={() => setActiveTab("compose")}><Plus size={16} /> New Distribution</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Sent", value: "2", icon: Send },
          { label: "Avg Open Rate", value: "58.8%", icon: Mail },
          { label: "Avg Click Rate", value: "16.4%", icon: BarChart3 },
          { label: "Total Recipients", value: "105", icon: Users },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="text-gray-400" size={24} />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(["history", "compose"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded capitalize ${activeTab === tab ? "bg-white shadow" : "text-gray-600"}`}
          >{tab}</button>
        ))}
      </div>

      {activeTab === "history" ? (
        <div className="space-y-4">
          {distributions.map((dist) => (
            <Card key={dist.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{dist.subject}</h3>
                    <p className="text-sm text-gray-500">{dist.date} • {dist.recipients} recipients</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {dist.open_rate !== null && (
                    <>
                      <div className="text-center">
                        <p className="text-lg font-bold">{dist.open_rate}%</p>
                        <p className="text-xs text-gray-500">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{dist.click_rate}%</p>
                        <p className="text-xs text-gray-500">Click Rate</p>
                      </div>
                    </>
                  )}
                  <Badge variant={dist.status === "sent" ? "success" : "warning"}>{dist.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <h2 className="text-lg font-semibold mb-4">Compose Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Select a press release and media list to distribute</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Press Release</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>Partnership Announcement (Draft)</option>
                <option>Product Launch Press Release</option>
                <option>Q1 Industry Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media List</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option>All Contacts (52)</option>
                <option>Tier 1 - Top Outlets (12)</option>
                <option>Tech Beat (28)</option>
                <option>Enterprise Tech (15)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
              <div className="flex gap-3">
                <Button variant="outline">Send Now</Button>
                <Button variant="outline"><Clock size={14} /> Schedule for Later</Button>
              </div>
            </div>
            <Button className="w-full mt-2"><Send size={16} /> Send Distribution</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
