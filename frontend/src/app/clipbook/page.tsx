"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { BookOpen, Download, Plus, CheckSquare } from "lucide-react";

const clipbooks = [
  { id: 1, title: "Q1 2026 Media Coverage Report", mentions: 23, reach: "5.2M", sentiment: { positive: 15, neutral: 6, negative: 2 }, date: "Mar 1, 2026" },
  { id: 2, title: "Product Launch Coverage Clips", mentions: 8, reach: "2.1M", sentiment: { positive: 6, neutral: 2, negative: 0 }, date: "Feb 28, 2026" },
];

const availableMentions = [
  { id: "m-001", headline: "Rising AI Startups to Watch in 2026", source: "TechCrunch", sentiment: "positive", reach: "1.2M", date: "Mar 1", selected: false },
  { id: "m-002", headline: "Thread on AI PR tools", source: "X/Twitter", sentiment: "positive", reach: "850K", date: "Mar 2", selected: false },
  { id: "m-003", headline: "PR Industry Embraces AI", source: "PR Week", sentiment: "neutral", reach: "340K", date: "Feb 28", selected: false },
  { id: "m-004", headline: "Why Agentic AI Is Overhyped", source: "Medium", sentiment: "negative", reach: "120K", date: "Feb 25", selected: false },
  { id: "m-005", headline: "AI PR Tools Comparison", source: "LinkedIn", sentiment: "positive", reach: "920K", date: "Mar 3", selected: false },
];

export default function ClipbookPage() {
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"clipbooks" | "create">("clipbooks");

  const toggleMention = (id: string) => {
    setSelectedMentions((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Clipbook</h1>
          <p className="text-gray-500 mt-1">Compile media mentions into branded coverage reports</p>
        </div>
        <Button onClick={() => setActiveTab("create")}><Plus size={16} /> New Clipbook</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(["clipbooks", "create"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded capitalize ${activeTab === tab ? "bg-white shadow" : "text-gray-600"}`}
          >{tab}</button>
        ))}
      </div>

      {activeTab === "clipbooks" ? (
        <div className="space-y-4">
          {clipbooks.map((clip) => (
            <Card key={clip.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{clip.title}</h3>
                    <p className="text-sm text-gray-500">{clip.date} • {clip.mentions} mentions • {clip.reach} reach</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    <Badge variant="success">{clip.sentiment.positive} pos</Badge>
                    <Badge variant="default">{clip.sentiment.neutral} neu</Badge>
                    <Badge variant="danger">{clip.sentiment.negative} neg</Badge>
                  </div>
                  <Button variant="outline" size="sm"><Download size={14} /> Export PDF</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Select Mentions</h2>
              <div className="space-y-2">
                {availableMentions.map((mention) => (
                  <button key={mention.id} onClick={() => toggleMention(mention.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between ${selectedMentions.includes(mention.id) ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckSquare size={18} className={selectedMentions.includes(mention.id) ? "text-indigo-600" : "text-gray-300"} />
                      <div>
                        <p className="text-sm font-medium">{mention.headline}</p>
                        <p className="text-xs text-gray-500">{mention.source} • {mention.date} • {mention.reach} reach</p>
                      </div>
                    </div>
                    <Badge variant={mention.sentiment === "positive" ? "success" : mention.sentiment === "negative" ? "danger" : "default"}>{mention.sentiment}</Badge>
                  </button>
                ))}
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <h2 className="text-lg font-semibold mb-4">Clipbook Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Coverage Report Title" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" id="summary" />
                  <label htmlFor="summary" className="text-sm">Include AI summary</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" id="charts" />
                  <label htmlFor="charts" className="text-sm">Include charts</label>
                </div>
                <p className="text-sm text-gray-500">{selectedMentions.length} mentions selected</p>
                <Button className="w-full" disabled={selectedMentions.length === 0}>
                  Generate Clipbook
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
