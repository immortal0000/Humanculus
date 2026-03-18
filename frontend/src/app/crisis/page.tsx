"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  AlertTriangle,
  Shield,
  Bell,
  Clock,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Activity,
} from "lucide-react";

interface CrisisAlert {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "monitoring" | "resolved";
  source: string;
  detectedAt: string;
  description: string;
  mentions: number;
  sentiment: number;
}

interface ResponseTemplate {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
}

const mockAlerts: CrisisAlert[] = [
  {
    id: "1",
    title: "Negative Press Coverage - Data Practices",
    severity: "high",
    status: "active",
    source: "TechCrunch article",
    detectedAt: "45 minutes ago",
    description: "A journalist published an article questioning our data handling practices. The article is gaining traction on social media.",
    mentions: 34,
    sentiment: -0.6,
  },
  {
    id: "2",
    title: "Social Media Backlash - Product Issue",
    severity: "medium",
    status: "monitoring",
    source: "X/Twitter trending",
    detectedAt: "3 hours ago",
    description: "Users reporting a bug that causes data loss. Multiple tweets gaining traction with negative sentiment.",
    mentions: 89,
    sentiment: -0.4,
  },
  {
    id: "3",
    title: "Competitor FUD Campaign",
    severity: "low",
    status: "monitoring",
    source: "LinkedIn posts",
    detectedAt: "1 day ago",
    description: "A competitor is posting misleading comparisons. Low volume but targeting our key audience.",
    mentions: 12,
    sentiment: -0.2,
  },
  {
    id: "4",
    title: "Executive Quote Misrepresented",
    severity: "medium",
    status: "resolved",
    source: "News outlets",
    detectedAt: "3 days ago",
    description: "CEO quote taken out of context in an industry article. Successfully issued correction.",
    mentions: 8,
    sentiment: -0.1,
  },
];

const mockTemplates: ResponseTemplate[] = [
  { id: "1", name: "Data Breach Response", type: "Statement", lastUsed: "Never" },
  { id: "2", name: "Product Issue Acknowledgment", type: "Social + Press", lastUsed: "2 months ago" },
  { id: "3", name: "Misinformation Correction", type: "Press Release", lastUsed: "3 weeks ago" },
  { id: "4", name: "Executive Crisis Statement", type: "Statement", lastUsed: "Never" },
];

const severityConfig = {
  critical: { color: "danger" as const, bg: "bg-red-50 border-red-200", icon: <XCircle size={20} className="text-red-600" /> },
  high: { color: "danger" as const, bg: "bg-orange-50 border-orange-200", icon: <AlertTriangle size={20} className="text-orange-600" /> },
  medium: { color: "warning" as const, bg: "bg-yellow-50 border-yellow-200", icon: <AlertCircle size={20} className="text-yellow-600" /> },
  low: { color: "info" as const, bg: "bg-blue-50 border-blue-200", icon: <AlertCircle size={20} className="text-blue-600" /> },
};

const statusConfig = {
  active: { color: "danger" as const, label: "Active" },
  monitoring: { color: "warning" as const, label: "Monitoring" },
  resolved: { color: "success" as const, label: "Resolved" },
};

export default function CrisisCenterPage() {
  const [selectedTab, setSelectedTab] = useState<"alerts" | "playbooks" | "team">("alerts");

  const activeAlerts = mockAlerts.filter((a) => a.status === "active").length;
  const monitoringAlerts = mockAlerts.filter((a) => a.status === "monitoring").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Crisis Center</h1>
          <p className="section-subtitle">Monitor threats, manage responses, and protect your brand reputation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Bell size={16} />
            Alert Settings
          </Button>
          <Button variant="danger" size="sm" className="gap-1.5">
            <AlertTriangle size={16} />
            Declare Crisis
          </Button>
        </div>
      </div>

      {/* Threat Level Banner */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-yellow-800 font-medium">Current Threat Level</p>
              <p className="text-2xl font-bold text-yellow-900">ELEVATED</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-yellow-800">{activeAlerts} active alert{activeAlerts !== 1 ? "s" : ""} | {monitoringAlerts} monitoring</p>
            <p className="text-xs text-yellow-600 mt-1">Last scan: 5 minutes ago</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><AlertTriangle size={20} className="text-red-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{activeAlerts}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg"><Activity size={20} className="text-amber-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Monitoring</p>
              <p className="text-2xl font-bold text-gray-900">{monitoringAlerts}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><CheckCircle2 size={20} className="text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Resolved (30d)</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Clock size={20} className="text-blue-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">23m</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "alerts" as const, label: "Active Alerts", icon: AlertTriangle },
          { key: "playbooks" as const, label: "Response Playbooks", icon: FileText },
          { key: "team" as const, label: "Crisis Team", icon: Users },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === "alerts" && (
        <div className="space-y-4">
          {/* AI Quick Response */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">AI Crisis Assistant</p>
                  <p className="text-sm text-gray-600">Get AI-generated response recommendations for active alerts.</p>
                </div>
              </div>
              <Button size="sm">Generate Response Plan</Button>
            </div>
          </Card>

          {mockAlerts.map((alert) => (
            <Card key={alert.id} className={severityConfig[alert.severity].bg}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {severityConfig[alert.severity].icon}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <Badge variant={severityConfig[alert.severity].color}>{alert.severity.toUpperCase()}</Badge>
                      <Badge variant={statusConfig[alert.status].color}>{statusConfig[alert.status].label}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={14} />{alert.detectedAt}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={14} />{alert.mentions} mentions</span>
                      <span className="flex items-center gap-1"><TrendingUp size={14} />Sentiment: {alert.sentiment}</span>
                      <span>Source: {alert.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {alert.status !== "resolved" && (
                    <>
                      <Button variant="outline" size="sm">Dismiss</Button>
                      <Button size="sm" className="gap-1">
                        Respond <ArrowRight size={14} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "playbooks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pre-built response templates for common crisis scenarios</p>
            <Button size="sm" className="gap-1.5"><Plus size={16} />New Playbook</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg"><FileText size={20} className="text-gray-600" /></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Type: {template.type}</p>
                      <p className="text-xs text-gray-400 mt-1">Last used: {template.lastUsed}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "team" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Your designated crisis response team</p>
            <Button size="sm" className="gap-1.5"><Plus size={16} />Add Member</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Alex Morgan", role: "Crisis Lead", phone: "+1 (415) 555-0101", email: "alex@company.com", status: "Available" },
              { name: "Jordan Lee", role: "Legal Counsel", phone: "+1 (415) 555-0102", email: "jordan@company.com", status: "Available" },
              { name: "Sam Patel", role: "Communications Director", phone: "+1 (415) 555-0103", email: "sam@company.com", status: "In Meeting" },
              { name: "Riley Chen", role: "Social Media Lead", phone: "+1 (415) 555-0104", email: "riley@company.com", status: "Available" },
            ].map((member) => (
              <Card key={member.name} hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-sm">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Phone size={14} />{member.phone}</span>
                      </div>
                      <span className="flex items-center gap-1 text-sm text-gray-500 mt-1"><Mail size={14} />{member.email}</span>
                    </div>
                  </div>
                  <Badge variant={member.status === "Available" ? "success" : "warning"}>{member.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
