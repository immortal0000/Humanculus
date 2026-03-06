"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import {
  Share2,
  Sparkles,
  Plus,
  Image as ImageIcon,
  Video,
  Type,
  Layers,
  Calendar,
  Copy,
  RefreshCw,
  Loader2,
  ArrowLeft,
  Heart,
  MessageCircle,
  Repeat2,
  Eye,
  Clock,
  CheckCircle2,
} from "lucide-react";

type Platform = "linkedin" | "twitter" | "instagram" | "facebook" | "tiktok";
type ContentType = "text" | "image" | "video" | "carousel" | "story";

const platforms: { id: Platform; name: string; color: string }[] = [
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-600" },
  { id: "twitter", name: "X / Twitter", color: "bg-gray-900" },
  { id: "instagram", name: "Instagram", color: "bg-pink-500" },
  { id: "facebook", name: "Facebook", color: "bg-blue-500" },
  { id: "tiktok", name: "TikTok", color: "bg-gray-800" },
];

const contentTypes: { id: ContentType; name: string; icon: React.ElementType }[] = [
  { id: "text", name: "Text Post", icon: Type },
  { id: "image", name: "Image Post", icon: ImageIcon },
  { id: "video", name: "Video Script", icon: Video },
  { id: "carousel", name: "Carousel", icon: Layers },
  { id: "story", name: "Story", icon: Clock },
];

const scheduledPosts = [
  { platform: "linkedin", content: "Thrilled to share our latest milestone...", time: "Today 2:00 PM", status: "scheduled", engagement: null },
  { platform: "twitter", content: "Big announcement coming tomorrow! Stay tuned...", time: "Tomorrow 10:00 AM", status: "scheduled", engagement: null },
  { platform: "instagram", content: "Behind the scenes at our product lab...", time: "Mar 8, 9:00 AM", status: "draft", engagement: null },
  { platform: "linkedin", content: "AI is transforming how solo PR practitioners...", time: "Mar 3, 11:00 AM", status: "published", engagement: { likes: 234, comments: 18, shares: 45, views: 3420 } },
  { platform: "twitter", content: "The future of PR is autonomous. Here's why...", time: "Mar 2, 3:00 PM", status: "published", engagement: { likes: 89, comments: 12, shares: 34, views: 5600 } },
];

const platformColors: Record<string, string> = {
  linkedin: "bg-blue-100 text-blue-700",
  twitter: "bg-gray-100 text-gray-700",
  instagram: "bg-pink-100 text-pink-700",
  facebook: "bg-blue-100 text-blue-600",
  tiktok: "bg-gray-100 text-gray-800",
};

export default function SocialPage() {
  const [showCreator, setShowCreator] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "schedule" | "analytics">("create");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["linkedin", "twitter"]);
  const [selectedContentType, setSelectedContentType] = useState<ContentType>("text");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const statusBadge: Record<string, "success" | "info" | "default"> = {
    published: "success",
    scheduled: "info",
    draft: "default",
  };

  if (!showCreator) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">Social Content Engine</h1>
            <p className="section-subtitle">Create, schedule, and analyze multi-platform social content.</p>
          </div>
          <Button onClick={() => setShowCreator(true)} className="gap-1.5">
            <Plus size={16} />
            Create Content
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          {[
            { id: "create" as const, label: "Recent Posts" },
            { id: "schedule" as const, label: "Schedule" },
            { id: "analytics" as const, label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div className="space-y-3">
          {scheduledPosts.map((post, idx) => (
            <Card key={idx} hover>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Badge className={platformColors[post.platform]}>
                    {post.platform}
                  </Badge>
                  <div>
                    <p className="text-sm text-gray-900">{post.content}</p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.time}
                      </span>
                      {post.engagement && (
                        <>
                          <span className="flex items-center gap-1"><Heart size={12} /> {post.engagement.likes}</span>
                          <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.engagement.comments}</span>
                          <span className="flex items-center gap-1"><Repeat2 size={12} /> {post.engagement.shares}</span>
                          <span className="flex items-center gap-1"><Eye size={12} /> {post.engagement.views.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Badge variant={statusBadge[post.status]}>{post.status}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Analytics */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reach", value: "12.4K", change: "+18%" },
              { label: "Engagements", value: "1,847", change: "+24%" },
              { label: "Link Clicks", value: "342", change: "+9%" },
              { label: "Avg. Engagement Rate", value: "4.2%", change: "+0.8%" },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} vs last week</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={() => { setShowCreator(false); setGenerated(false); }}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="section-title">Create Social Content</h1>
          <p className="section-subtitle">AI generates platform-specific content from your topic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Content Setup</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedPlatforms.includes(p.id)
                        ? `${p.color} text-white`
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => setSelectedContentType(ct.id)}
                    className={`flex flex-col items-center p-2.5 rounded-lg border-2 text-xs font-medium transition-colors ${
                      selectedContentType === ct.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <ct.icon size={16} className="mb-1" />
                    {ct.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Topic / Headline"
                placeholder="e.g., Product launch, industry insight, team achievement..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Textarea
                label="Context / Key Points"
                placeholder="Add details, facts, links, or talking points..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            {(selectedContentType === "image" || selectedContentType === "carousel") && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-1">
                  <ImageIcon size={14} className="text-purple-600" />
                  <span className="text-xs font-medium text-purple-700">AI Image Generation</span>
                </div>
                <p className="text-xs text-purple-600">
                  AI will generate custom images matching your content and brand style.
                </p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 gap-1.5"
            >
              {isGenerating ? (
                <><Loader2 size={16} className="animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={16} /> Generate Content</>
              )}
            </Button>
          </Card>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          {!generated ? (
            <Card className="flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Share2 size={28} className="text-gray-300" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Content Preview</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Select platforms and content type, then generate. AI will create optimized content for each platform.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    {selectedPlatforms.length} platform variants generated
                  </span>
                </div>
                <Button variant="secondary" size="sm" className="gap-1" onClick={handleGenerate}>
                  <RefreshCw size={14} /> Regenerate All
                </Button>
              </div>

              {selectedPlatforms.map((platform) => {
                const content: Record<Platform, { text: string; hashtags: string; imagePrompt: string }> = {
                  linkedin: {
                    text: "We're thrilled to announce a major milestone in our journey.\n\nAfter months of development, our AI-powered PR platform now autonomously handles the entire communication lifecycle — from strategy to execution.\n\nHere's what this means for solo PR practitioners:\n\n- 67% time savings on routine tasks\n- 40% higher media response rates\n- 3x more clients managed per person\n\nThe future of PR isn't about working harder. It's about working smarter with AI that truly understands communications.\n\nWhat's your take on AI in PR? I'd love to hear your thoughts.",
                    hashtags: "#PublicRelations #AI #PRTech #Communications #Startup",
                    imagePrompt: "Professional AI technology visualization with communication network nodes",
                  },
                  twitter: {
                    text: "Big milestone: Our AI PR platform now handles the full comms lifecycle autonomously.\n\n- 67% time saved\n- 40% higher response rates\n- 3x more clients per practitioner\n\nSolo PR practitioners: the game just changed.",
                    hashtags: "#PRTech #AI #PublicRelations",
                    imagePrompt: "Clean tech visualization with PR theme",
                  },
                  instagram: {
                    text: "The future of PR is here. Our AI platform just hit a major milestone — and it's going to change how solo practitioners work forever.\n\nSwipe to see the numbers that matter.",
                    hashtags: "#PRLife #AITechnology #PublicRelations #PRProfessional #StartupLife #TechInnovation #Communications",
                    imagePrompt: "Vibrant gradient background with key statistics overlay",
                  },
                  facebook: {
                    text: "Exciting news from our team! We've reached a major milestone — our AI-powered PR platform now handles the entire communication lifecycle autonomously.\n\nFor solo PR practitioners, this means:\n- Save 67% of your time on routine tasks\n- Get 40% higher media response rates\n- Manage 3x more clients\n\nWe built this because we believe every PR professional deserves enterprise-grade tools.",
                    hashtags: "#PublicRelations #AITools #PRTech",
                    imagePrompt: "Team celebration with technology overlay",
                  },
                  tiktok: {
                    text: "POV: You're a solo PR practitioner and AI just 10x'd your output.\n\nHere's what our platform does:\n- Writes press releases in your brand voice\n- Generates social content for 5 platforms at once\n- Manages entire campaigns autonomously\n\nThe future is here and it's wild.",
                    hashtags: "#PRTok #AITools #PublicRelations #TechTok #StartupLife",
                    imagePrompt: "Dynamic, trendy visual with bold text overlays",
                  },
                };

                const p = content[platform];
                const platformInfo = platforms.find((x) => x.id === platform)!;

                return (
                  <Card key={platform}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-md ${platformInfo.color} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{platformInfo.name[0]}</span>
                        </div>
                        <span className="font-medium text-gray-900">{platformInfo.name}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm"><Copy size={14} /></Button>
                        <Button variant="ghost" size="sm"><RefreshCw size={14} /></Button>
                        <Button variant="ghost" size="sm"><Calendar size={14} /></Button>
                      </div>
                    </div>

                    {(selectedContentType === "image" || selectedContentType === "carousel") && (
                      <div className="w-full h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon size={24} className="text-indigo-300 mx-auto mb-1" />
                          <p className="text-xs text-indigo-400">AI Image: {p.imagePrompt}</p>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-gray-700 whitespace-pre-line">{p.text}</p>
                    <p className="text-xs text-indigo-500 mt-3">{p.hashtags}</p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{p.text.length} characters</span>
                      <Button size="sm" className="gap-1">
                        <Calendar size={14} /> Schedule
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
