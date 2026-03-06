"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import {
  Plus,
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  BarChart3,
  FileText,
  Share2,
  Lightbulb,
  MoreVertical,
  Sparkles,
  Loader2,
  Target,
} from "lucide-react";

type CampaignStatus = "active" | "planning" | "completed" | "paused";
type TaskStatus = "todo" | "in-progress" | "review" | "done";

const campaigns = [
  {
    id: 1,
    name: "Q2 Product Launch",
    client: "Self",
    status: "active" as CampaignStatus,
    startDate: "Mar 1, 2026",
    endDate: "May 31, 2026",
    budget: "$8,500",
    spent: "$2,100",
    progress: 35,
    tasks: { total: 24, completed: 8 },
    pressReleases: 2,
    socialPosts: 15,
    mediaMentions: 12,
  },
  {
    id: 2,
    name: "Brand Awareness Initiative",
    client: "Self",
    status: "active" as CampaignStatus,
    startDate: "Feb 15, 2026",
    endDate: "Apr 30, 2026",
    budget: "$5,000",
    spent: "$3,200",
    progress: 64,
    tasks: { total: 18, completed: 11 },
    pressReleases: 1,
    socialPosts: 28,
    mediaMentions: 8,
  },
  {
    id: 3,
    name: "Industry Conference Coverage",
    client: "Self",
    status: "planning" as CampaignStatus,
    startDate: "Apr 10, 2026",
    endDate: "Apr 15, 2026",
    budget: "$3,000",
    spent: "$0",
    progress: 10,
    tasks: { total: 12, completed: 1 },
    pressReleases: 0,
    socialPosts: 0,
    mediaMentions: 0,
  },
  {
    id: 4,
    name: "Year-End Recap Campaign",
    client: "Self",
    status: "completed" as CampaignStatus,
    startDate: "Dec 1, 2025",
    endDate: "Jan 15, 2026",
    budget: "$4,000",
    spent: "$3,800",
    progress: 100,
    tasks: { total: 20, completed: 20 },
    pressReleases: 3,
    socialPosts: 22,
    mediaMentions: 15,
  },
];

const statusConfig: Record<CampaignStatus, { variant: "success" | "info" | "default" | "warning"; label: string }> = {
  active: { variant: "success", label: "Active" },
  planning: { variant: "info", label: "Planning" },
  completed: { variant: "default", label: "Completed" },
  paused: { variant: "warning", label: "Paused" },
};

const kanbanColumns: { id: TaskStatus; name: string; color: string }[] = [
  { id: "todo", name: "To Do", color: "bg-gray-100" },
  { id: "in-progress", name: "In Progress", color: "bg-blue-50" },
  { id: "review", name: "Approval", color: "bg-yellow-50" },
  { id: "done", name: "Done", color: "bg-green-50" },
];

const sampleTasks: { id: number; title: string; status: TaskStatus; type: string; priority: string; dueDate: string }[] = [
  { id: 1, title: "Draft press release for product announcement", status: "done", type: "press-release", priority: "high", dueDate: "Mar 5" },
  { id: 2, title: "Create social media content calendar", status: "done", type: "social", priority: "high", dueDate: "Mar 4" },
  { id: 3, title: "Finalize journalist pitch list", status: "in-progress", type: "outreach", priority: "high", dueDate: "Mar 7" },
  { id: 4, title: "Design infographic for launch stats", status: "in-progress", type: "social", priority: "medium", dueDate: "Mar 8" },
  { id: 5, title: "Review and approve social posts batch 1", status: "review", type: "social", priority: "medium", dueDate: "Mar 6" },
  { id: 6, title: "Schedule LinkedIn campaign posts", status: "todo", type: "social", priority: "medium", dueDate: "Mar 10" },
  { id: 7, title: "Send press release to wire services", status: "todo", type: "press-release", priority: "high", dueDate: "Mar 12" },
  { id: 8, title: "Prepare executive talking points", status: "todo", type: "strategy", priority: "medium", dueDate: "Mar 9" },
  { id: 9, title: "Monitor launch day media coverage", status: "todo", type: "monitoring", priority: "high", dueDate: "Mar 15" },
];

const typeIcons: Record<string, React.ElementType> = {
  "press-release": FileText,
  social: Share2,
  outreach: Users,
  strategy: Lightbulb,
  monitoring: BarChart3,
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "board">("board");
  const [isGenerating, setIsGenerating] = useState(false);

  const campaign = campaigns.find((c) => c.id === selectedCampaign);

  if (showNewCampaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => setShowNewCampaign(false)}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h1 className="section-title">New Campaign</h1>
            <p className="section-subtitle">AI will help you plan and structure your campaign.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Campaign Details</h2>
            <div className="space-y-4">
              <Input label="Campaign Name" placeholder="e.g., Q2 Product Launch" />
              <Textarea label="Objective" placeholder="What do you want this campaign to achieve?" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" />
                <Input label="End Date" type="date" />
              </div>
              <Input label="Budget" placeholder="e.g., $5,000" />
              <Textarea label="Target Audience" placeholder="Who are you trying to reach?" />
            </div>
            <Button
              className="w-full mt-6 gap-1.5"
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setIsGenerating(false);
                  setShowNewCampaign(false);
                  setSelectedCampaign(1);
                }, 2000);
              }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><Loader2 size={16} className="animate-spin" /> Creating Campaign Plan...</>
              ) : (
                <><Sparkles size={16} /> Generate Campaign Plan</>
              )}
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <h2 className="font-semibold text-gray-900 mb-4">AI Campaign Planner</h2>
            <p className="text-sm text-gray-600 mb-4">
              Based on your details, AI will automatically generate:
            </p>
            <div className="space-y-3">
              {[
                { icon: Target, text: "Campaign strategy with milestones" },
                { icon: CheckCircle2, text: "Task breakdown with deadlines" },
                { icon: FileText, text: "Content plan (press releases, social posts)" },
                { icon: Users, text: "Target media list and pitch schedule" },
                { icon: DollarSign, text: "Budget allocation recommendations" },
                { icon: BarChart3, text: "KPIs and success metrics" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-700">
                  <item.icon size={16} className="text-indigo-500 mr-2 flex-shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedCampaign && campaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedCampaign(null)}>
              <ArrowLeft size={16} />
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="section-title">{campaign.name}</h1>
                <Badge variant={statusConfig[campaign.status].variant}>
                  {statusConfig[campaign.status].label}
                </Badge>
              </div>
              <p className="section-subtitle">{campaign.startDate} - {campaign.endDate}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "board" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("board")}
            >
              Board
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: "Progress", value: `${campaign.progress}%`, icon: BarChart3 },
            { label: "Tasks", value: `${campaign.tasks.completed}/${campaign.tasks.total}`, icon: CheckCircle2 },
            { label: "Budget", value: campaign.budget, icon: DollarSign },
            { label: "Spent", value: campaign.spent, icon: DollarSign },
            { label: "Press Releases", value: String(campaign.pressReleases), icon: FileText },
            { label: "Media Mentions", value: String(campaign.mediaMentions), icon: BarChart3 },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Progress Bar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
            <span className="text-sm font-bold text-indigo-600">{campaign.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </Card>

        {/* Kanban Board */}
        {viewMode === "board" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {kanbanColumns.map((column) => {
              const tasks = sampleTasks.filter((t) => t.status === column.id);
              return (
                <div key={column.id}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">{column.name}</h3>
                    <Badge>{tasks.length}</Badge>
                  </div>
                  <div className={`${column.color} rounded-xl p-2 space-y-2 min-h-[200px]`}>
                    {tasks.map((task) => {
                      const TypeIcon = typeIcons[task.type] || CheckCircle2;
                      return (
                        <div
                          key={task.id}
                          className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <TypeIcon size={14} className="text-gray-400 mt-0.5" />
                            <Badge className={priorityColors[task.priority]} >{task.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-900 font-medium">{task.title}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <Calendar size={12} className="mr-1" />
                            {task.dueDate}
                          </div>
                        </div>
                      );
                    })}
                    <button className="w-full p-2 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                      <Plus size={14} className="mx-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="p-0 divide-y divide-gray-100">
            {sampleTasks.map((task) => {
              const TypeIcon = typeIcons[task.type] || CheckCircle2;
              return (
                <div key={task.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      readOnly
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <TypeIcon size={16} className="text-gray-400" />
                    <span className={`text-sm ${task.status === "done" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    <span className="text-xs text-gray-400">{task.dueDate}</span>
                    <Button variant="ghost" size="sm"><MoreVertical size={14} /></Button>
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Campaign Dashboard</h1>
          <p className="section-subtitle">Manage your PR campaigns from planning to reporting.</p>
        </div>
        <Button onClick={() => setShowNewCampaign(true)} className="gap-1.5">
          <Plus size={16} />
          New Campaign
        </Button>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((c) => (
          <Card key={c.id} hover onClick={() => setSelectedCampaign(c.id)}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{c.startDate} - {c.endDate}</p>
              </div>
              <Badge variant={statusConfig[c.status].variant}>
                {statusConfig[c.status].label}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{c.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: "Tasks", value: `${c.tasks.completed}/${c.tasks.total}` },
                { label: "Budget", value: c.budget },
                { label: "Releases", value: String(c.pressReleases) },
                { label: "Mentions", value: String(c.mediaMentions) },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
