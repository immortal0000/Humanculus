"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Lock, Clock, Users, AlertTriangle, Plus, CheckCircle } from "lucide-react";

const embargoes = [
  { id: "emb-001", title: "Series B Funding Announcement", lift_date: "Mar 10, 2026", lift_time: "9:00 AM ET", recipients: 3, status: "active", notes: "Exclusive first 2 hours to TechCrunch" },
  { id: "emb-002", title: "AI Product Feature Release", lift_date: "Mar 20, 2026", lift_time: "6:00 AM PT", recipients: 2, status: "active", notes: null },
  { id: "emb-003", title: "Q4 Revenue Results", lift_date: "Feb 15, 2026", lift_time: "9:00 AM ET", recipients: 2, status: "lifted", notes: "All recipients honored embargo" },
];

export default function EmbargoPage() {
  const [activeTab, setActiveTab] = useState<"active" | "lifted" | "all">("active");

  const filtered = activeTab === "all" ? embargoes : embargoes.filter((e) => e.status === activeTab);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Embargo Manager</h1>
          <p className="text-gray-500 mt-1">Track embargoes, recipients, and lift times</p>
        </div>
        <Button><Plus size={16} /> New Embargo</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Embargoes", value: "2", icon: Lock, color: "text-red-600" },
          { label: "Lifted This Month", value: "1", icon: CheckCircle, color: "text-green-600" },
          { label: "Recipients Tracked", value: "7", icon: Users, color: "text-blue-600" },
          { label: "Violations", value: "0", icon: AlertTriangle, color: "text-yellow-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={24} />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(["active", "lifted", "all"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded capitalize ${activeTab === tab ? "bg-white shadow" : "text-gray-600"}`}
          >{tab}</button>
        ))}
      </div>

      {/* Embargo List */}
      <div className="space-y-4">
        {filtered.map((emb) => (
          <Card key={emb.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={18} className={emb.status === "active" ? "text-red-600" : "text-gray-400"} />
                  <h3 className="text-lg font-semibold">{emb.title}</h3>
                  <Badge variant={emb.status === "active" ? "danger" : "success"}>{emb.status}</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={14} /> Lift: {emb.lift_date} at {emb.lift_time}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {emb.recipients} recipients</span>
                </div>
                {emb.notes && <p className="text-sm text-gray-600 mt-2 bg-yellow-50 px-3 py-1.5 rounded">{emb.notes}</p>}
              </div>
              <div className="flex gap-2">
                {emb.status === "active" && (
                  <>
                    <Button variant="outline" size="sm">Send Reminder</Button>
                    <Button variant="danger" size="sm">Lift Now</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
