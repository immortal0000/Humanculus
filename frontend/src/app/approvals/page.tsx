"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CheckCircle, XCircle, Clock, AlertTriangle, MessageSquare } from "lucide-react";

const approvals = [
  {
    id: "apr-001", item_type: "press_release", title: "Partnership Announcement Draft",
    content_preview: "FOR IMMEDIATE RELEASE: Humanculus and TechPartner announce strategic partnership...",
    requested_by: "John Doe", reviewers: ["Jane Smith", "Alex Morgan"], priority: "high",
    deadline: "Mar 8, 2026", status: "pending", decisions: [],
  },
  {
    id: "apr-002", item_type: "social_post", title: "LinkedIn Product Launch Post",
    content_preview: "Excited to announce our latest AI-powered feature...",
    requested_by: "John Doe", reviewers: ["Jane Smith"], priority: "medium",
    deadline: "Mar 10, 2026", status: "approved", decisions: [{ reviewer: "Jane Smith", decision: "approved", comments: "Looks great!" }],
  },
  {
    id: "apr-003", item_type: "crisis_response", title: "Data Privacy Incident Response Statement",
    content_preview: "We take our customers' data privacy seriously...",
    requested_by: "Alex Morgan", reviewers: ["Jane Smith", "John Doe", "Jordan Lee"], priority: "urgent",
    deadline: "Mar 6, 2026", status: "pending", decisions: [{ reviewer: "Jane Smith", decision: "revision_requested", comments: "Needs stronger accountability language" }],
  },
];

const typeIcons: Record<string, string> = {
  press_release: "PR",
  social_post: "SP",
  crisis_response: "CR",
  pitch: "PT",
  campaign_task: "CT",
};

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  const filtered = activeTab === "all" ? approvals : approvals.filter((a) => a.status === activeTab);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
          <p className="text-gray-500 mt-1">Review and approve content before publication</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pending Review", value: "2", icon: Clock, color: "text-yellow-600" },
          { label: "Approved", value: "1", icon: CheckCircle, color: "text-green-600" },
          { label: "Rejected", value: "0", icon: XCircle, color: "text-red-600" },
          { label: "Urgent", value: "1", icon: AlertTriangle, color: "text-orange-600" },
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
        {(["pending", "approved", "rejected", "all"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded capitalize ${activeTab === tab ? "bg-white shadow" : "text-gray-600"}`}
          >{tab}</button>
        ))}
      </div>

      {/* Approval Cards */}
      <div className="space-y-4">
        {filtered.map((approval) => (
          <Card key={approval.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center text-xs font-bold text-indigo-700">
                    {typeIcons[approval.item_type] || "??"}
                  </div>
                  <div>
                    <h3 className="font-semibold">{approval.title}</h3>
                    <p className="text-xs text-gray-500">Requested by {approval.requested_by} • Due {approval.deadline}</p>
                  </div>
                  <Badge variant={approval.priority === "urgent" ? "danger" : approval.priority === "high" ? "warning" : "default"}>
                    {approval.priority}
                  </Badge>
                  <Badge variant={approval.status === "approved" ? "success" : approval.status === "rejected" ? "danger" : "warning"}>
                    {approval.status}
                  </Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mt-2">
                  {approval.content_preview}
                </div>
                {approval.decisions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {approval.decisions.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <MessageSquare size={14} className="mt-0.5 text-gray-400" />
                        <span className="font-medium">{d.reviewer}:</span>
                        <Badge variant={d.decision === "approved" ? "success" : d.decision === "rejected" ? "danger" : "warning"} >
                          {d.decision.replace("_", " ")}
                        </Badge>
                        {d.comments && <span className="text-gray-500">- {d.comments}</span>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-500">
                  Reviewers: {approval.reviewers.join(", ")}
                </div>
              </div>
              {approval.status === "pending" && (
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm"><XCircle size={14} /> Reject</Button>
                  <Button size="sm"><CheckCircle size={14} /> Approve</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
