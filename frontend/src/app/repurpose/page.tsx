"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { Repeat, FileText, Mail, MessageSquare, Copy, Download } from "lucide-react";

const sourceTypes = [
  { id: "press_release", name: "Press Release" },
  { id: "blog_post", name: "Blog Post" },
  { id: "social_post", name: "Social Post" },
  { id: "speech", name: "Speech" },
  { id: "report", name: "Report" },
];

const targetFormats = [
  { id: "blog_post", name: "Blog Post", icon: FileText, description: "SEO-optimized blog article" },
  { id: "email_newsletter", name: "Email Newsletter", icon: Mail, description: "Scannable email with CTA" },
  { id: "talking_points", name: "Talking Points", icon: MessageSquare, description: "Executive bullet points" },
  { id: "faq", name: "FAQ", icon: FileText, description: "Question & answer pairs" },
  { id: "investor_update", name: "Investor Update", icon: FileText, description: "Metrics-focused update" },
  { id: "internal_memo", name: "Internal Memo", icon: FileText, description: "Internal communication" },
  { id: "tweet_thread", name: "Tweet Thread", icon: MessageSquare, description: "Multi-tweet thread" },
  { id: "linkedin_article", name: "LinkedIn Article", icon: FileText, description: "Thought leadership" },
];

const sampleOutput = [
  { format: "Blog Post", word_count: 890, title: "How AI is Transforming PR: Our Platform Launch Story" },
  { format: "Email Newsletter", word_count: 320, title: "Big News: Meet the Future of PR" },
  { format: "Tweet Thread", word_count: 180, title: "🧵 1/7 We just launched something that will change PR forever..." },
];

export default function RepurposePage() {
  const [sourceContent, setSourceContent] = useState("");
  const [sourceType, setSourceType] = useState("press_release");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<typeof sampleOutput | null>(null);
  const [activeResult, setActiveResult] = useState(0);

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setResults(sampleOutput);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Repurposer</h1>
          <p className="text-gray-500 mt-1">Transform one piece of content into multiple formats</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Content Repurposed", value: "28" },
          { label: "Formats Generated", value: "142" },
          { label: "Time Saved", value: "45h" },
          { label: "Avg Formats/Source", value: "5.1" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Source Content</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Source Type</label>
              <div className="flex flex-wrap gap-2">
                {sourceTypes.map((t) => (
                  <button key={t.id} onClick={() => setSourceType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${sourceType === t.id ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >{t.name}</button>
                ))}
              </div>
            </div>
            <Textarea label="Paste your content" value={sourceContent} onChange={(e) => setSourceContent(e.target.value)}
              placeholder="Paste your press release, blog post, or other content here..." />
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Target Formats</h2>
            <div className="grid grid-cols-2 gap-3">
              {targetFormats.map((f) => (
                <button key={f.id} onClick={() => toggleFormat(f.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${selectedFormats.includes(f.id) ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.description}</p>
                </button>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={handleGenerate} disabled={generating || selectedFormats.length === 0}>
              {generating ? "Repurposing Content..." : `Generate ${selectedFormats.length} Format${selectedFormats.length !== 1 ? "s" : ""}`}
            </Button>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-6">
          {results ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Generated Content</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Copy size={14} /> Copy All</Button>
                  <Button variant="outline" size="sm"><Download size={14} /> Export</Button>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                {results.map((r, i) => (
                  <button key={i} onClick={() => setActiveResult(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${activeResult === i ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"}`}
                  >{r.format}</button>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">{results[activeResult].title}</h3>
                <p className="text-xs text-gray-500 mb-3">{results[activeResult].word_count} words</p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>AI is no longer just a buzzword in public relations — it&apos;s becoming the backbone of how modern PR teams operate. Today, we&apos;re excited to share the story behind our platform launch and what it means for the future of communications...</p>
                  <p>The traditional PR workflow hasn&apos;t changed much in decades. Strategy documents take days to create. Press releases go through endless revision cycles. Media lists are maintained in spreadsheets...</p>
                  <p>That&apos;s exactly why we built Humanculus — an agentic AI platform designed specifically for PR professionals who want to work smarter, not harder.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm"><Copy size={14} /> Copy</Button>
                <Button variant="outline" size="sm"><Repeat size={14} /> Regenerate</Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <Repeat size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Repurpose Your Content</p>
                <p className="text-sm mt-1">Paste source content, select target formats, and generate</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
