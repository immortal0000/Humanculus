"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { pressReleaseApi } from "@/lib/api";
import {
  FileText,
  Sparkles,
  ArrowLeft,
  Plus,
  Download,
  Copy,
  RefreshCw,
  Loader2,
  Eye,
  Edit3,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type ReleaseFormat = "traditional" | "multimedia" | "social";

const existingReleases = [
  {
    id: 1,
    title: "Series A Funding Announcement - $15M Round",
    status: "published",
    format: "traditional",
    date: "Mar 5, 2026",
    wordCount: 487,
  },
  {
    id: 2,
    title: "New Product Feature: AI Campaign Automation",
    status: "draft",
    format: "multimedia",
    date: "Mar 4, 2026",
    wordCount: 623,
  },
  {
    id: 3,
    title: "Partnership Announcement with TechCorp",
    status: "review",
    format: "social",
    date: "Mar 3, 2026",
    wordCount: 312,
  },
];

const statusMap: Record<string, { variant: "success" | "default" | "warning"; label: string }> = {
  published: { variant: "success", label: "Published" },
  draft: { variant: "default", label: "Draft" },
  review: { variant: "warning", label: "In Review" },
};

export default function PressReleasePage() {
  const [showEditor, setShowEditor] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [, setAiContent] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ReleaseFormat>("traditional");
  const [form, setForm] = useState({
    headline: "",
    subheadline: "",
    announcement: "",
    quotes: "",
    boilerplate: "",
    brandVoice: "professional",
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setApiError(null);

    if (form.headline && form.announcement) {
      try {
        const result = await pressReleaseApi.generate({
          headline: form.headline,
          subheadline: form.subheadline || undefined,
          announcement: form.announcement,
          quotes: form.quotes || undefined,
          boilerplate: form.boilerplate || undefined,
          brand_voice: form.brandVoice,
          format: selectedFormat,
        });
        setAiContent(result.data);
      } catch {
        setApiError("Backend unavailable — showing sample preview. Start the backend to use AI generation.");
      }
    }
    setIsGenerating(false);
    setGenerated(true);
  };

  if (!showEditor) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">Press Release Studio</h1>
            <p className="section-subtitle">Create AI-powered press releases with brand voice consistency.</p>
          </div>
          <Button onClick={() => setShowEditor(true)} className="gap-1.5">
            <Plus size={16} />
            New Press Release
          </Button>
        </div>

        <div className="space-y-3">
          {existingReleases.map((release) => (
            <Card key={release.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{release.title}</h3>
                    <p className="text-sm text-gray-500">
                      {release.date} &middot; {release.format} &middot; {release.wordCount} words
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={statusMap[release.status].variant}>
                    {statusMap[release.status].label}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit3 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" onClick={() => { setShowEditor(false); setGenerated(false); }}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="section-title">New Press Release</h1>
          <p className="section-subtitle">AI will draft your release. You review and refine.</p>
        </div>
      </div>

      {apiError && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <AlertCircle size={16} className="flex-shrink-0" />
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Release Details</h2>

            {/* Format Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "traditional" as ReleaseFormat, label: "Traditional", icon: FileText },
                  { id: "multimedia" as ReleaseFormat, label: "Multimedia", icon: Monitor },
                  { id: "social" as ReleaseFormat, label: "Social", icon: Smartphone },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 text-xs font-medium transition-colors ${
                      selectedFormat === fmt.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <fmt.icon size={18} className="mb-1" />
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Headline"
                placeholder="e.g., Company Raises $15M Series A..."
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
              />
              <Input
                label="Subheadline (Optional)"
                placeholder="Supporting context..."
                value={form.subheadline}
                onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
              />
              <Textarea
                label="What are you announcing?"
                placeholder="Describe the news in plain language. Include key facts, figures, and context..."
                value={form.announcement}
                onChange={(e) => setForm({ ...form, announcement: e.target.value })}
                className="min-h-[120px]"
              />
              <Textarea
                label="Quotes (Optional)"
                placeholder="Include quotes from executives or stakeholders..."
                value={form.quotes}
                onChange={(e) => setForm({ ...form, quotes: e.target.value })}
              />
              <Textarea
                label="Company Boilerplate"
                placeholder="Standard company description for the end of the release..."
                value={form.boilerplate}
                onChange={(e) => setForm({ ...form, boilerplate: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice</label>
                <div className="flex flex-wrap gap-2">
                  {["professional", "conversational", "authoritative", "innovative"].map((voice) => (
                    <button
                      key={voice}
                      onClick={() => setForm({ ...form, brandVoice: voice })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                        form.brandVoice === voice
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                          : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                      }`}
                    >
                      {voice}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-6 gap-1.5"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Press Release
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card className="min-h-[600px]">
            {!generated ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileText size={28} className="text-gray-300" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Press Release Preview</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Fill in the details on the left and click Generate. AI will create a professional press release matching your brand voice.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="text-sm font-medium text-green-700">Generated Successfully</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Copy size={14} /> Copy
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download size={14} /> Export
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1" onClick={handleGenerate}>
                      <RefreshCw size={14} /> Regenerate
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-8 bg-white">
                  <div className="text-center mb-8">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                      FOR IMMEDIATE RELEASE
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {form.headline || "Acme Technologies Secures $15 Million in Series A Funding"}
                    </h1>
                    <p className="text-base text-gray-600 italic">
                      {form.subheadline || "Investment will accelerate AI-powered PR platform development and market expansion"}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 mb-6">
                    <strong>San Francisco, CA — March 6, 2026</strong>
                  </div>

                  <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                    <p>
                      Acme Technologies, a pioneering AI-powered public relations platform, today announced
                      it has raised $15 million in Series A funding led by Innovation Ventures, with
                      participation from existing investors TechFund Capital and Seed Partners.
                    </p>
                    <p>
                      The funding will be used to expand the company&apos;s agentic AI capabilities, grow
                      the engineering team, and accelerate market penetration in the rapidly evolving PR
                      technology landscape. The company has seen 300% growth in user adoption since its
                      beta launch in Q4 2025.
                    </p>
                    <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-600 my-4">
                      &ldquo;This funding validates our vision that AI can fundamentally transform how PR
                      professionals work. We&apos;re building the first truly autonomous PR platform that
                      doesn&apos;t just assist — it actively drives results.&rdquo;
                      <br />
                      <span className="not-italic font-medium text-gray-900">— CEO, Acme Technologies</span>
                    </blockquote>
                    <p>
                      The PR technology market is experiencing rapid transformation as artificial intelligence
                      moves from simple automation to autonomous agent-based workflows. According to industry
                      research, 76% of PR professionals now actively use generative AI in their daily work,
                      with AI-augmented teams reporting 67% time savings.
                    </p>

                    <h4 className="font-semibold text-gray-900 mt-6">About Acme Technologies</h4>
                    <p>
                      {form.boilerplate || "Acme Technologies is an AI-powered PR communication platform that helps independent PR practitioners manage the entire PR lifecycle autonomously. Founded in 2025, the company is headquartered in San Francisco."}
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900">Media Contact</h4>
                      <p>
                        Press Relations<br />
                        press@acmetechnologies.com<br />
                        (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>

                {/* Format variants */}
                {selectedFormat !== "traditional" && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900 mb-2">
                      {selectedFormat === "multimedia" ? "Multimedia Assets" : "Social Snippets"}
                    </p>
                    {selectedFormat === "multimedia" ? (
                      <div className="grid grid-cols-3 gap-3">
                        {["Hero Image", "Infographic", "Executive Headshot"].map((asset) => (
                          <div key={asset} className="bg-white p-3 rounded-lg text-center border border-indigo-100">
                            <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center">
                              <Globe size={20} className="text-gray-300" />
                            </div>
                            <p className="text-xs text-gray-600">{asset}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {[
                          { platform: "LinkedIn", text: "Excited to announce our $15M Series A! This funding will..." },
                          { platform: "X/Twitter", text: "Big news: We just raised $15M to build the future of AI-powered PR..." },
                          { platform: "Instagram", text: "$15M raised. New chapter begins. AI-powered PR for everyone..." },
                        ].map((post) => (
                          <div key={post.platform} className="bg-white p-3 rounded-lg border border-indigo-100 flex items-start justify-between">
                            <div>
                              <Badge variant="info">{post.platform}</Badge>
                              <p className="text-sm text-gray-600 mt-1">{post.text}</p>
                            </div>
                            <Button variant="ghost" size="sm"><Copy size={14} /></Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
