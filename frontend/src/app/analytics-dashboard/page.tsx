"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { TrendingUp, Eye, DollarSign, BarChart3, Users, Share2 } from "lucide-react";

const overviewMetrics = [
  { label: "Total Reach", value: "12.4M", change: "+24%", icon: Eye },
  { label: "Total Mentions", value: "156", change: "+18%", icon: BarChart3 },
  { label: "Media Value", value: "$245K", change: "+32%", icon: DollarSign },
  { label: "Share of Voice", value: "18.3%", change: "+5.2%", icon: TrendingUp },
  { label: "Sentiment Score", value: "78/100", change: "+3", icon: TrendingUp },
  { label: "Active Campaigns", value: "3", change: "0", icon: Share2 },
];

const channels = [
  { name: "Media Coverage", mentions: 45, reach: "8.2M", sentiment: 82, topSources: ["TechCrunch", "Forbes", "Reuters"] },
  { name: "Social Media", mentions: 89, reach: "3.1M", sentiment: 75, topSources: ["LinkedIn", "X/Twitter", "Instagram"] },
  { name: "Blogs", mentions: 15, reach: "720K", sentiment: 71, topSources: ["Medium", "Substack"] },
  { name: "Broadcast", mentions: 7, reach: "350K", sentiment: 85, topSources: ["Bloomberg TV", "CNBC"] },
];

const socialPlatforms = [
  { name: "LinkedIn", followers: "12.4K", growth: "+8.2%", engagement: "4.3%", posts: 18 },
  { name: "X/Twitter", followers: "8.9K", growth: "+5.1%", engagement: "3.5%", posts: 34 },
  { name: "Instagram", followers: "3.2K", growth: "+12.4%", engagement: "6.7%", posts: 12 },
];

const campaignPerformance = [
  { name: "Q2 Product Launch", progress: 65, reach: "4.5M", mentions: 18, roi: "3.2x", status: "active" },
  { name: "Brand Awareness Q1", progress: 100, reach: "7.8M", mentions: 34, roi: "4.1x", status: "completed" },
];

const trendData = [
  { week: "Feb 1", mentions: 12, reach: 890 },
  { week: "Feb 8", mentions: 18, reach: 1200 },
  { week: "Feb 15", mentions: 34, reach: 2100 },
  { week: "Feb 22", mentions: 28, reach: 1800 },
  { week: "Mar 1", mentions: 47, reach: 3400 },
];

export default function AnalyticsDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Comprehensive PR performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {overviewMetrics.map((metric) => (
          <Card key={metric.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500">{metric.label}</p>
                <p className="text-xl font-bold mt-1">{metric.value}</p>
                <span className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-green-600" : "text-gray-500"}`}>{metric.change}</span>
              </div>
              <metric.icon size={16} className="text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* Trend Chart Placeholder */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Mentions & Reach Trend</h2>
        <div className="flex items-end gap-4 h-48">
          {trendData.map((d) => (
            <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end justify-center" style={{ height: "160px" }}>
                <div className="bg-indigo-200 rounded-t w-6" style={{ height: `${(d.mentions / 50) * 100}%` }} title={`${d.mentions} mentions`} />
                <div className="bg-blue-400 rounded-t w-6" style={{ height: `${(d.reach / 3500) * 100}%` }} title={`${d.reach}K reach`} />
              </div>
              <p className="text-xs text-gray-500">{d.week}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 bg-indigo-200 rounded" /> Mentions</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 bg-blue-400 rounded" /> Reach (K)</span>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Channel Analytics */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Channel Breakdown</h2>
          <div className="space-y-4">
            {channels.map((ch) => (
              <div key={ch.name} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{ch.name}</h3>
                  <Badge variant={ch.sentiment >= 80 ? "success" : ch.sentiment >= 70 ? "warning" : "danger"}>
                    Sentiment: {ch.sentiment}
                  </Badge>
                </div>
                <div className="flex gap-6 text-xs text-gray-500">
                  <span>{ch.mentions} mentions</span>
                  <span>{ch.reach} reach</span>
                  <span>Top: {ch.topSources.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Social Analytics */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Social Media Performance</h2>
          <div className="space-y-4">
            {socialPlatforms.map((p) => (
              <div key={p.name} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{p.name}</h3>
                  <span className="text-sm font-bold">{p.followers} followers</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span className="text-green-600">{p.growth} growth</span>
                  <span>{p.engagement} engagement</span>
                  <span>{p.posts} posts</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
        <div className="space-y-4">
          {campaignPerformance.map((camp) => (
            <div key={camp.name} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{camp.name}</h3>
                  <Badge variant={camp.status === "active" ? "info" : "success"}>{camp.status}</Badge>
                </div>
                <span className="text-lg font-bold text-indigo-600">{camp.roi} ROI</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${camp.progress}%` }} />
              </div>
              <div className="flex gap-6 text-xs text-gray-500">
                <span>{camp.progress}% complete</span>
                <span>{camp.reach} reach</span>
                <span>{camp.mentions} mentions</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
