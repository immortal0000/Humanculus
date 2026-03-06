"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  BarChart3,
  TrendingUp,
  Globe,
  Newspaper,
  MessageSquare,
  Eye,
  Download,
  RefreshCw,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Sparkles,
  Clock,
} from "lucide-react";

interface Mention {
  id: string;
  source: string;
  outlet: string;
  title: string;
  snippet: string;
  sentiment: "positive" | "negative" | "neutral";
  reach: string;
  date: string;
  url: string;
  platform: "news" | "social" | "blog" | "broadcast";
}

const mockMentions: Mention[] = [
  {
    id: "1",
    source: "TechCrunch",
    outlet: "News",
    title: "Rising AI Startups to Watch in 2026",
    snippet: "Humanculus was highlighted among the most promising AI-powered PR platforms, praised for its agentic approach to communications...",
    sentiment: "positive",
    reach: "2.4M",
    date: "2 hours ago",
    url: "#",
    platform: "news",
  },
  {
    id: "2",
    source: "@techreporter",
    outlet: "X/Twitter",
    title: "Thread on AI PR tools",
    snippet: "Just tried Humanculus for our latest product launch. The AI strategy builder saved us roughly 15 hours of work. Impressed by the quality.",
    sentiment: "positive",
    reach: "45.2K",
    date: "5 hours ago",
    url: "#",
    platform: "social",
  },
  {
    id: "3",
    source: "PR Week",
    outlet: "News",
    title: "The State of AI in Public Relations",
    snippet: "While platforms like Humanculus show promise, industry experts caution that the human element remains essential in crisis communications...",
    sentiment: "neutral",
    reach: "890K",
    date: "1 day ago",
    url: "#",
    platform: "news",
  },
  {
    id: "4",
    source: "Medium",
    outlet: "Blog",
    title: "Why Agentic AI Is Overhyped",
    snippet: "Tools like Humanculus claim autonomous PR management, but the reality falls short of the marketing. Here's what you actually get...",
    sentiment: "negative",
    reach: "12.3K",
    date: "2 days ago",
    url: "#",
    platform: "blog",
  },
  {
    id: "5",
    source: "LinkedIn",
    outlet: "Social",
    title: "PR Innovation Roundup",
    snippet: "Exciting developments in the PR tech space. Humanculus recently launched their campaign dashboard — the integration with social publishing is smooth.",
    sentiment: "positive",
    reach: "28.7K",
    date: "3 days ago",
    url: "#",
    platform: "social",
  },
];

const sentimentIcons = {
  positive: <ThumbsUp size={14} className="text-green-600" />,
  negative: <ThumbsDown size={14} className="text-red-600" />,
  neutral: <Minus size={14} className="text-gray-500" />,
};

const sentimentBadge: Record<string, "success" | "danger" | "default"> = {
  positive: "success",
  negative: "danger",
  neutral: "default",
};

const platformIcons: Record<string, React.ReactNode> = {
  news: <Newspaper size={16} className="text-blue-600" />,
  social: <MessageSquare size={16} className="text-purple-600" />,
  blog: <Globe size={16} className="text-green-600" />,
  broadcast: <Eye size={16} className="text-amber-600" />,
};

export default function MonitoringPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const filteredMentions = mockMentions.filter(
    (m) => selectedSentiment === "all" || m.sentiment === selectedSentiment
  );

  const positiveCount = mockMentions.filter((m) => m.sentiment === "positive").length;
  const negativeCount = mockMentions.filter((m) => m.sentiment === "negative").length;
  const neutralCount = mockMentions.filter((m) => m.sentiment === "neutral").length;
  const totalReach = "3.4M";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Monitoring</h1>
          <p className="section-subtitle">Track brand mentions across news, social media, and the web.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download size={16} />
            Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <RefreshCw size={16} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Total Mentions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{mockMentions.length}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            +12% vs last period
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Reach</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalReach}</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            +8% vs last period
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Positive</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-green-600">{positiveCount}</p>
            <ThumbsUp size={18} className="text-green-500" />
          </div>
          <p className="text-xs text-gray-400 mt-1">{Math.round((positiveCount / mockMentions.length) * 100)}% of mentions</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Neutral</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-600">{neutralCount}</p>
            <Minus size={18} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mt-1">{Math.round((neutralCount / mockMentions.length) * 100)}% of mentions</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Negative</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-red-600">{negativeCount}</p>
            <ThumbsDown size={18} className="text-red-500" />
          </div>
          <p className="text-xs text-gray-400 mt-1">{Math.round((negativeCount / mockMentions.length) * 100)}% of mentions</p>
        </Card>
      </div>

      {/* Sentiment Trend Chart Placeholder */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sentiment Trend</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" />Positive</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-400" />Neutral</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />Negative</span>
          </div>
        </div>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
          <div className="text-center">
            <BarChart3 size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Sentiment chart visualization</p>
            <p className="text-xs text-gray-400">Chart integration coming soon</p>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">AI Monitoring Insights</p>
            <p className="text-sm text-gray-600">Auto-generated from your mentions this week</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/70 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Key Narrative</p>
            <p className="text-sm text-gray-600 mt-1">Your brand is being associated with &quot;innovation&quot; and &quot;AI-first PR&quot; across top-tier outlets.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Emerging Topic</p>
            <p className="text-sm text-gray-600 mt-1">Discussion around &quot;agentic AI&quot; is growing. Consider positioning content around this trend.</p>
          </div>
          <div className="bg-white/70 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Risk Alert</p>
            <p className="text-sm text-gray-600 mt-1">1 negative mention detected in a tech blog. Recommended action: respond with a thought leadership piece.</p>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {["all", "positive", "neutral", "negative"].map((sentiment) => (
          <button
            key={sentiment}
            onClick={() => setSelectedSentiment(sentiment)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSentiment === sentiment
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </button>
        ))}
      </div>

      {/* Mentions Feed */}
      <div className="space-y-3">
        {filteredMentions.map((mention) => (
          <Card key={mention.id} hover>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">{platformIcons[mention.platform]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{mention.source}</span>
                    <span className="text-xs text-gray-400">{mention.outlet}</span>
                    <Badge variant={sentimentBadge[mention.sentiment]}>
                      <span className="flex items-center gap-1">
                        {sentimentIcons[mention.sentiment]}
                        {mention.sentiment}
                      </span>
                    </Badge>
                  </div>
                  <h3 className="font-medium text-gray-900">{mention.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{mention.snippet}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {mention.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {mention.reach} reach
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <ExternalLink size={14} />
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
