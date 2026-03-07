"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { TrendingUp, AlertCircle, MessageSquare, Clock } from "lucide-react";

const sampleMentions = [
  { id: 1, headline: "Rising AI Startups to Watch in 2026", source: "TechCrunch", sentiment: "positive" },
  { id: 2, headline: "Why Agentic AI Is Overhyped", source: "Medium", sentiment: "negative" },
  { id: 3, headline: "PR Industry Embraces AI", source: "PR Week", sentiment: "neutral" },
];

export default function SentimentPage() {
  const [headline, setHeadline] = useState("");
  const [source, setSource] = useState("");
  const [mentionText, setMentionText] = useState("");
  const [sentiment, setSentiment] = useState<string>("negative");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        sentiment_drivers: ["Use of 'overhyped' in headline", "Skeptical tone throughout", "Comparison to failed AI products"],
        risk_level: "medium",
        trajectory: "Could worsen if amplified by other outlets",
        response_urgency: "within_24h",
        narrative: "Growing skepticism about AI-powered tools delivering on promises. Author questions whether agentic AI is meaningful or just marketing.",
        recommended_response: "Publish a data-driven response showcasing concrete customer results. Do not engage directly — respond through owned channels.",
        talking_points: [
          "67% time savings backed by customer data from 50+ teams",
          "Human-in-the-loop distinguishes us from pure automation",
          "Named customers willing to provide testimonials",
        ],
      });
      setAnalyzing(false);
    }, 1500);
  };

  const selectMention = (mention: typeof sampleMentions[0]) => {
    setHeadline(mention.headline);
    setSource(mention.source);
    setSentiment(mention.sentiment);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sentiment Explainer</h1>
          <p className="text-gray-500 mt-1">Understand what drives sentiment in media mentions and get response strategies</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Select or Enter Mention</h2>
            <div className="space-y-2 mb-4">
              {sampleMentions.map((m) => (
                <button key={m.id} onClick={() => selectMention(m)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${headline === m.headline ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <p className="text-sm font-medium">{m.headline}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{m.source}</span>
                    <Badge variant={m.sentiment === "positive" ? "success" : m.sentiment === "negative" ? "danger" : "default"}>{m.sentiment}</Badge>
                  </div>
                </button>
              ))}
            </div>
            <Input label="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Article headline" />
            <div className="mt-3"><Input label="Source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="TechCrunch" /></div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
              <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
            <div className="mt-3"><Textarea label="Full Mention Text" value={mentionText} onChange={(e) => setMentionText(e.target.value)} placeholder="Paste the full article text or excerpt..." /></div>
            <Button className="w-full mt-4" onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? "Analyzing..." : "Explain Sentiment"}
            </Button>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-6">
          {analysis ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <p className="text-xs text-gray-500 uppercase">Risk Level</p>
                  <p className="text-xl font-bold text-yellow-600 mt-1 capitalize">{analysis.risk_level as string}</p>
                </Card>
                <Card>
                  <p className="text-xs text-gray-500 uppercase">Trajectory</p>
                  <p className="text-sm font-medium mt-1">{analysis.trajectory as string}</p>
                </Card>
                <Card>
                  <p className="text-xs text-gray-500 uppercase">Response Urgency</p>
                  <p className="text-sm font-bold text-orange-600 mt-1 capitalize">{(analysis.response_urgency as string).replace(/_/g, " ")}</p>
                </Card>
              </div>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-red-600" />
                  <h2 className="text-lg font-semibold">Sentiment Drivers</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(analysis.sentiment_drivers as string[]).map((d, i) => (
                    <span key={i} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm">{d}</span>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-blue-600" />
                  <h2 className="text-lg font-semibold">Narrative Analysis</h2>
                </div>
                <p className="text-sm text-gray-700">{analysis.narrative as string}</p>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={18} className="text-green-600" />
                  <h2 className="text-lg font-semibold">Recommended Response</h2>
                </div>
                <p className="text-sm text-gray-700 mb-4">{analysis.recommended_response as string}</p>
                <h3 className="text-sm font-semibold mb-2">Talking Points</h3>
                <ul className="space-y-1">
                  {(analysis.talking_points as string[]).map((tp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">•</span>{tp}</li>
                  ))}
                </ul>
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Analyze Sentiment</p>
                <p className="text-sm mt-1">Select or enter a media mention to understand its sentiment drivers</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
