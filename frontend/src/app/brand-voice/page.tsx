"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { Palette, BarChart3, FileText, Sparkles } from "lucide-react";

const voicePresets = [
  { id: "professional", name: "Professional", traits: ["Formal", "Authoritative", "Third-person"] },
  { id: "conversational", name: "Conversational", traits: ["Warm", "Approachable", "Second-person"] },
  { id: "innovative", name: "Innovative", traits: ["Forward-looking", "Disruptive", "Energetic"] },
  { id: "authoritative", name: "Authoritative", traits: ["Data-driven", "Expert", "Credible"] },
  { id: "empathetic", name: "Empathetic", traits: ["Human-centered", "Understanding", "Supportive"] },
];

export default function BrandVoicePage() {
  const [companyName, setCompanyName] = useState("");
  const [samples, setSamples] = useState(["", "", ""]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);

  const updateSample = (index: number, value: string) => {
    const newSamples = [...samples];
    newSamples[index] = value;
    setSamples(newSamples);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        tone_profile: { primary: "Professional", secondary: "Innovative", formality: 7 },
        personality: ["Confident", "Forward-thinking", "Trustworthy", "Precise", "Empowering"],
        vocabulary: { technical_level: "Medium-High", power_words: ["transform", "agentic", "empower", "intelligent", "seamless"] },
        guidelines: [
          { type: "do", text: "Use active voice and strong verbs" },
          { type: "do", text: "Lead with benefits, not features" },
          { type: "do", text: "Include data points to support claims" },
          { type: "dont", text: "Avoid buzzwords without substance" },
          { type: "dont", text: "Don't use passive voice in headlines" },
          { type: "dont", text: "Never use all-caps for emphasis" },
        ],
        consistency_score: 82,
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brand Voice Analyzer</h1>
          <p className="text-gray-500 mt-1">Analyze your content to extract and define your brand voice profile</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Content Samples</h2>
            <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Humanculus" />
            <p className="text-sm text-gray-500 mt-4 mb-2">Paste 2-3 content samples (press releases, blog posts, social posts, etc.)</p>
            {samples.map((sample, i) => (
              <div key={i} className="mt-3">
                <Textarea
                  label={`Sample ${i + 1}`}
                  value={sample}
                  onChange={(e) => updateSample(i, e.target.value)}
                  placeholder={`Paste content sample ${i + 1}...`}
                />
              </div>
            ))}
            <Button className="w-full mt-4" onClick={() => setSamples([...samples, ""])} variant="outline">
              + Add Another Sample
            </Button>
            <Button className="w-full mt-3" onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? "Analyzing Brand Voice..." : "Analyze Brand Voice"}
            </Button>
          </Card>

          {/* Voice Presets */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Voice Presets</h2>
            <div className="space-y-3">
              {voicePresets.map((preset) => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{preset.name}</p>
                    <div className="flex gap-1 mt-1">
                      {preset.traits.map((t) => (
                        <Badge key={t} variant="default">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-6">
          {analysis ? (
            <>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Voice Profile</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Consistency Score</span>
                    <span className="text-2xl font-bold text-indigo-600">{(analysis.consistency_score as number)}/100</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Primary Tone</p>
                    <p className="text-lg font-semibold text-indigo-700">{(analysis.tone_profile as Record<string, string>).primary}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Secondary Tone</p>
                    <p className="text-lg font-semibold text-purple-700">{(analysis.tone_profile as Record<string, string>).secondary}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Brand Personality</p>
                  <div className="flex flex-wrap gap-2">
                    {(analysis.personality as string[]).map((trait: string) => (
                      <Badge key={trait} variant="info">{trait}</Badge>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold mb-4">Vocabulary Profile</h2>
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Technical Level</p>
                  <p className="font-medium">{(analysis.vocabulary as Record<string, unknown>).technical_level as string}</p>
                </div>
                <p className="text-sm text-gray-500 mb-2">Power Words</p>
                <div className="flex flex-wrap gap-2">
                  {((analysis.vocabulary as Record<string, unknown>).power_words as string[]).map((word: string) => (
                    <span key={word} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">{word}</span>
                  ))}
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold mb-4">Writing Guidelines</h2>
                <div className="space-y-2">
                  {(analysis.guidelines as Array<{ type: string; text: string }>).map((g, i) => (
                    <div key={i} className="flex items-start gap-2 p-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${g.type === "do" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {g.type === "do" ? "DO" : "DON'T"}
                      </span>
                      <span className="text-sm text-gray-700">{g.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <Palette size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Analyze Your Brand Voice</p>
                <p className="text-sm mt-1">Add content samples and click analyze to extract your brand voice profile</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
