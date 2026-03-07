"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { Target, TrendingUp, Shield, Lightbulb, Plus, X } from "lucide-react";

export default function CompetitivePage() {
  const [companyName, setCompanyName] = useState("");
  const [competitors, setCompetitors] = useState<string[]>([""]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Record<string, unknown> | null>(null);

  const addCompetitor = () => setCompetitors([...competitors, ""]);
  const removeCompetitor = (i: number) => setCompetitors(competitors.filter((_, idx) => idx !== i));
  const updateCompetitor = (i: number, val: string) => {
    const updated = [...competitors];
    updated[i] = val;
    setCompetitors(updated);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis({
        competitors: [
          {
            name: "PRBot",
            key_narratives: ["AI-first PR automation", "Enterprise focus", "Data-driven insights"],
            strengths: ["Strong enterprise partnerships", "Deep analytics"],
            weaknesses: ["Complex UI", "No crisis management", "Expensive pricing"],
            media_presence: "High - frequent TechCrunch, Forbes coverage",
          },
          {
            name: "MediaFlow",
            key_narratives: ["Workflow automation", "Team collaboration", "Simple pricing"],
            strengths: ["User-friendly interface", "Good onboarding"],
            weaknesses: ["Limited AI capabilities", "No social content generation", "Small outlet database"],
            media_presence: "Medium - occasional industry press",
          },
        ],
        opportunities: [
          "Position agentic AI as differentiator vs simple automation",
          "Target mid-market segment underserved by enterprise-focused competitors",
          "Lead with crisis management capabilities — unique in market",
          "Content repurposing as a wedge feature (competitors lack this)",
        ],
        threats: [
          "PRBot expanding into social content generation Q2",
          "MediaFlow recently raised Series B, expanding team",
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competitive Intelligence</h1>
          <p className="text-gray-500 mt-1">Analyze competitor PR strategies and identify opportunities</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Analysis Setup</h2>
            <Input label="Your Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Humanculus" />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Competitors</label>
              {competitors.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input value={c} onChange={(e) => updateCompetitor(i, e.target.value)} placeholder={`Competitor ${i + 1}`} />
                  {competitors.length > 1 && (
                    <button onClick={() => removeCompetitor(i)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addCompetitor} className="mt-1"><Plus size={14} /> Add Competitor</Button>
            </div>
            <Button className="w-full mt-6" onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-6">
          {analysis ? (
            <>
              {(analysis.competitors as Array<Record<string, unknown>>).map((comp, i) => (
                <Card key={i}>
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={20} className="text-indigo-600" />
                    <h2 className="text-lg font-semibold">{comp.name as string}</h2>
                    <Badge variant="default">{comp.media_presence as string}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Narratives</p>
                      <ul className="space-y-1">{(comp.key_narratives as string[]).map((n, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-1"><span className="text-indigo-400 mt-1">•</span>{n}</li>
                      ))}</ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Strengths</p>
                      <ul className="space-y-1">{(comp.strengths as string[]).map((s, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-1"><span className="text-green-400 mt-1">+</span>{s}</li>
                      ))}</ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-2">Weaknesses</p>
                      <ul className="space-y-1">{(comp.weaknesses as string[]).map((w, j) => (
                        <li key={j} className="text-sm text-gray-600 flex items-start gap-1"><span className="text-red-400 mt-1">-</span>{w}</li>
                      ))}</ul>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={18} className="text-green-600" />
                    <h3 className="font-semibold">Opportunities</h3>
                  </div>
                  <ul className="space-y-2">{(analysis.opportunities as string[]).map((o, i) => (
                    <li key={i} className="text-sm text-gray-700 p-2 bg-green-50 rounded">{o}</li>
                  ))}</ul>
                </Card>
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={18} className="text-red-600" />
                    <h3 className="font-semibold">Threats</h3>
                  </div>
                  <ul className="space-y-2">{(analysis.threats as string[]).map((t, i) => (
                    <li key={i} className="text-sm text-gray-700 p-2 bg-red-50 rounded">{t}</li>
                  ))}</ul>
                </Card>
              </div>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <Target size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Run Competitive Analysis</p>
                <p className="text-sm mt-1">Enter your company and competitors to analyze their PR strategies</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
