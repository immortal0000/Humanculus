"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { Type, Star, Copy, RefreshCw } from "lucide-react";

const goals = [
  { id: "general", name: "General", description: "Balanced across all criteria" },
  { id: "click_through", name: "Click-Through", description: "Curiosity & emotional triggers" },
  { id: "seo", name: "SEO", description: "Keyword-optimized, 50-60 chars" },
  { id: "shareability", name: "Shareability", description: "Social proof & quotability" },
  { id: "authority", name: "Authority", description: "Data-driven & credible" },
];

const sampleHeadlines = [
  { text: "AI-Powered PR Platform Cuts Campaign Planning Time by 67%", score: 92, appeal: "Data-driven", chars: 58 },
  { text: "The Future of PR is Agentic — And It's Here", score: 88, appeal: "Curiosity", chars: 45 },
  { text: "How Humanculus is Reinventing Public Relations with AI", score: 85, appeal: "Authority", chars: 54 },
  { text: "PR Teams Are Switching to AI. Here's Why.", score: 90, appeal: "Social proof", chars: 43 },
  { text: "From Strategy to Social: One AI Platform Does It All", score: 83, appeal: "Benefit-driven", chars: 53 },
];

export default function HeadlinesPage() {
  const [content, setContent] = useState("");
  const [goal, setGoal] = useState("general");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [headlines, setHeadlines] = useState<typeof sampleHeadlines | null>(null);
  const [bestPick, setBestPick] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setHeadlines(sampleHeadlines);
      setBestPick(0);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Headline A/B Generator</h1>
          <p className="text-gray-500 mt-1">Generate and score multiple headline variants for any content</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Content to Headline</h2>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the content you want to create headlines for..." />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Goal</label>
              <div className="space-y-2">
                {goals.map((g) => (
                  <button key={g.id} onClick={() => setGoal(g.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${goal === g.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <p className="text-sm font-medium">{g.name}</p>
                    <p className="text-xs text-gray-500">{g.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Variants</label>
              <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option value={3}>3 headlines</option>
                <option value={5}>5 headlines</option>
                <option value={10}>10 headlines</option>
              </select>
            </div>
            <Button className="w-full mt-4" onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating Headlines..." : "Generate Headlines"}
            </Button>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="col-span-3 space-y-6">
          {headlines ? (
            <>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Generated Headlines</h2>
                  <Button variant="outline" size="sm" onClick={handleGenerate}><RefreshCw size={14} /> Regenerate</Button>
                </div>
                <div className="space-y-3">
                  {headlines.map((h, i) => (
                    <div key={i} className={`p-4 rounded-lg border transition-colors ${i === bestPick ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {i === bestPick && <Badge variant="success">Best Pick</Badge>}
                            <Badge variant="default">{h.appeal}</Badge>
                          </div>
                          <p className="text-base font-medium mt-1">{h.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{h.chars} characters</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">{h.score}</p>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                          <Button variant="ghost" size="sm"><Copy size={14} /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold mb-3">A/B Test Suggestion</h2>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Recommended Test Pair</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="info">A</Badge>
                      <span className="text-sm">{headlines[0].text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">B</Badge>
                      <span className="text-sm">{headlines[3].text}</span>
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700 mt-2">These headlines use different emotional appeals (data-driven vs social proof) making them ideal for A/B testing.</p>
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <Type size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Generate Headlines</p>
                <p className="text-sm mt-1">Paste your content and select a goal to generate optimized headline variants</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
