"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { Send, Copy, RefreshCw, User, Building, Newspaper, Zap } from "lucide-react";

const pitchTemplates = [
  { id: "exclusive", name: "Exclusive Offer", description: "Offer an exclusive story to a single journalist" },
  { id: "embargo", name: "Embargo Pitch", description: "Pitch with embargoed information and lift date" },
  { id: "data-story", name: "Data Story", description: "Pitch built around compelling data or research" },
  { id: "trend-piece", name: "Trend Piece", description: "Position company within a larger industry trend" },
  { id: "expert-source", name: "Expert Source", description: "Offer executive as expert source for ongoing stories" },
];

const samplePitches = [
  { id: 1, journalist: "Sarah Chen", outlet: "TechCrunch", subject: "AI PR Platform Exclusive", status: "sent", response: "accepted", date: "2026-02-10" },
  { id: 2, journalist: "Marcus Rivera", outlet: "The Verge", subject: "Dashboard Feature Story", status: "sent", response: "pending", date: "2026-02-20" },
  { id: 3, journalist: "David Park", outlet: "Wired", subject: "AI Market Data Exclusive", status: "draft", response: null, date: "2026-03-01" },
];

export default function PitchPage() {
  const [journalistName, setJournalistName] = useState("");
  const [outlet, setOutlet] = useState("");
  const [beat, setBeat] = useState("");
  const [storyAngle, setStoryAngle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("professional");
  const [previousCoverage, setPreviousCoverage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedPitch(`Subject: Exclusive: ${companyName || "Humanculus"} Launches AI-Powered PR Platform

Hi ${journalistName || "Sarah"},

I've been following your coverage of ${beat || "AI startups"} at ${outlet || "TechCrunch"} — your recent piece on emerging tools was spot-on. I thought you'd be interested in an exclusive look at something we're building.

${companyName || "Humanculus"} is launching an agentic AI platform that ${storyAngle || "transforms how PR teams work by automating strategy, content creation, and media outreach"}.

Key highlights:
${keyPoints ? keyPoints.split("\n").map(p => `• ${p}`).join("\n") : "• First agentic AI platform built specifically for PR professionals\n• Reduces campaign planning time by 67%\n• Already used by 50+ communications teams\n• Backed by $12M Series A funding"}

I'd love to offer you an exclusive first look with a demo and interview with our CEO. Would you have 20 minutes this week?

Best,
PR Team`);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Pitch Generator</h1>
          <p className="text-gray-500 mt-1">Create personalized pitch emails tailored to specific journalists</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="info">AI-Powered</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pitches Sent", value: "34", icon: Send },
          { label: "Response Rate", value: "42%", icon: Zap },
          { label: "Avg Open Rate", value: "68%", icon: Newspaper },
          { label: "Coverage Secured", value: "12", icon: Building },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="text-gray-400" size={24} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Pitch Builder</h2>

            {/* Template Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Template</label>
              <div className="flex flex-wrap gap-2">
                {pitchTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTemplate === t.id
                        ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Journalist Name" value={journalistName} onChange={(e) => setJournalistName(e.target.value)} placeholder="Sarah Chen" />
              <Input label="Outlet" value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="TechCrunch" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input label="Beat" value={beat} onChange={(e) => setBeat(e.target.value)} placeholder="AI & Startups" />
              <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Humanculus" />
            </div>
            <div className="mt-4">
              <Textarea label="Story Angle" value={storyAngle} onChange={(e) => setStoryAngle(e.target.value)} placeholder="What makes this story compelling for this journalist?" />
            </div>
            <div className="mt-4">
              <Textarea label="Key Points (one per line)" value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} placeholder="First agentic AI platform for PR&#10;67% time savings&#10;$12M Series A" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                  <option value="professional">Professional</option>
                  <option value="conversational">Conversational</option>
                  <option value="urgent">Urgent</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <Input label="Previous Coverage" value={previousCoverage} onChange={(e) => setPreviousCoverage(e.target.value)} placeholder="Link to past article (optional)" />
            </div>
            <Button className="w-full mt-6" onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating Pitch..." : "Generate Personalized Pitch"}
            </Button>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {generatedPitch ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Generated Pitch</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Copy size={14} /> Copy</Button>
                  <Button variant="outline" size="sm"><RefreshCw size={14} /> Regenerate</Button>
                  <Button size="sm"><Send size={14} /> Send</Button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                {generatedPitch}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <span>Word count: ~150</span>
                <span>Reading time: &lt;1 min</span>
                <span>Personalization score: 85/100</span>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12 text-gray-400">
                <Send size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Generate a Pitch</p>
                <p className="text-sm mt-1">Fill in the journalist details and story angle to generate a personalized pitch email</p>
              </div>
            </Card>
          )}

          {/* Recent Pitches */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Recent Pitches</h2>
            <div className="space-y-3">
              {samplePitches.map((pitch) => (
                <div key={pitch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User size={14} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{pitch.subject}</p>
                      <p className="text-xs text-gray-500">{pitch.journalist} • {pitch.outlet} • {pitch.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={pitch.status === "sent" ? "info" : "default"}>{pitch.status}</Badge>
                    {pitch.response && (
                      <Badge variant={pitch.response === "accepted" ? "success" : "warning"}>{pitch.response}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
