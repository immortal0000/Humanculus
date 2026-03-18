"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Lightbulb,
  FileText,
  Share2,
  FolderKanban,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "New Strategy",
    description: "Generate a communication strategy from a brief",
    icon: Lightbulb,
    href: "/strategy",
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Press Release",
    description: "Draft an AI-powered press release",
    icon: FileText,
    href: "/press-release",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Social Content",
    description: "Create multi-platform social posts",
    icon: Share2,
    href: "/social",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "New Campaign",
    description: "Plan and launch a PR campaign",
    icon: FolderKanban,
    href: "/campaigns",
    color: "bg-purple-50 text-purple-600",
  },
];

const recentActivity = [
  {
    type: "strategy",
    title: "Q2 Product Launch Strategy",
    status: "completed",
    time: "2 hours ago",
  },
  {
    type: "press-release",
    title: "Series A Funding Announcement",
    status: "draft",
    time: "5 hours ago",
  },
  {
    type: "social",
    title: "LinkedIn Campaign - Tech Conference",
    status: "scheduled",
    time: "1 day ago",
  },
  {
    type: "campaign",
    title: "Brand Awareness Q1 2026",
    status: "active",
    time: "2 days ago",
  },
];

const statusConfig: Record<string, { badge: "success" | "warning" | "info" | "default"; label: string }> = {
  completed: { badge: "success", label: "Completed" },
  draft: { badge: "default", label: "Draft" },
  scheduled: { badge: "info", label: "Scheduled" },
  active: { badge: "warning", label: "Active" },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle">Welcome back. Here&apos;s your PR overview.</p>
        </div>
        <Button className="gap-1.5">
          <Sparkles size={16} />
          Ask AI
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: "3", icon: FolderKanban, change: "+1 this week" },
          { label: "Press Releases", value: "12", icon: FileText, change: "2 pending" },
          { label: "Social Posts", value: "47", icon: Share2, change: "8 scheduled" },
          { label: "Media Mentions", value: "156", icon: TrendingUp, change: "+23% vs last month" },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon size={20} className="text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card hover className="h-full">
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon size={20} />
                </div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
          <Card className="divide-y divide-gray-100 p-0">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400 flex items-center mt-0.5">
                      <Clock size={12} className="mr-1" />
                      {item.time}
                    </p>
                  </div>
                </div>
                <Badge variant={statusConfig[item.status].badge}>
                  {statusConfig[item.status].label}
                </Badge>
              </div>
            ))}
          </Card>
        </div>

        {/* AI Agent Status */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Agent</h2>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Agentic Mode</p>
                <p className="text-xs text-gray-500">Autonomous + Human-in-the-loop</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Strategy analysis complete</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle2 size={16} className="text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Press release drafted</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={16} className="text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Social posts generating...</span>
              </div>
              <div className="flex items-center text-sm">
                <AlertCircle size={16} className="text-gray-300 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Awaiting approval for pitch send</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Agent Activity
            </Button>
          </Card>

          <Card className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Tasks</h3>
            <div className="space-y-2">
              {[
                "Review pitch for TechCrunch",
                "Approve social campaign assets",
                "Finalize Q2 strategy brief",
              ].map((task, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 flex-shrink-0" />
                  {task}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
