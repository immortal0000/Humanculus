"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Download,
  Copy,
  RefreshCw,
} from "lucide-react";

const steps = [
  { id: 1, name: "Brief", icon: MessageSquare },
  { id: 2, name: "Audience", icon: Users },
  { id: 3, name: "Analysis", icon: BarChart3 },
  { id: 4, name: "Strategy", icon: Target },
];

const sampleStrategies = [
  {
    id: 1,
    title: "Product Launch - SaaS Platform",
    status: "completed",
    date: "Mar 4, 2026",
    audiences: 3,
    channels: 5,
  },
  {
    id: 2,
    title: "Crisis Response - Data Breach",
    status: "completed",
    date: "Mar 1, 2026",
    audiences: 4,
    channels: 6,
  },
  {
    id: 3,
    title: "Thought Leadership - AI Ethics",
    status: "draft",
    date: "Feb 28, 2026",
    audiences: 2,
    channels: 3,
  },
];

export default function StrategyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [brief, setBrief] = useState({
    companyName: "",
    objective: "",
    context: "",
    timeline: "",
    budget: "",
    constraints: "",
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(currentStep + 1);
    }, 2000);
  };

  if (!showBuilder) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">AI Strategy Builder</h1>
            <p className="section-subtitle">
              Generate comprehensive PR communication strategies step by step.
            </p>
          </div>
          <Button onClick={() => setShowBuilder(true)} className="gap-1.5">
            <Sparkles size={16} />
            New Strategy
          </Button>
        </div>

        {/* Existing Strategies */}
        <div className="space-y-3">
          {sampleStrategies.map((strategy) => (
            <Card key={strategy.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Lightbulb size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{strategy.title}</h3>
                    <p className="text-sm text-gray-500">
                      {strategy.date} &middot; {strategy.audiences} audiences &middot; {strategy.channels} channels
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={strategy.status === "completed" ? "success" : "default"}>
                    {strategy.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ArrowRight size={16} />
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => setShowBuilder(false)}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h1 className="section-title">New Strategy</h1>
            <p className="section-subtitle">Follow the guided steps to build your communication strategy.</p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-2">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === step.id
                  ? "bg-indigo-100 text-indigo-700"
                  : currentStep > step.id
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle2 size={16} />
              ) : (
                <step.icon size={16} />
              )}
              <span>{step.name}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${currentStep > step.id ? "bg-green-300" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Project Brief</h2>
          <p className="text-sm text-gray-500 mb-6">Tell us about your PR project. The more detail, the better the strategy.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company / Client Name"
              placeholder="e.g., Acme Technologies"
              value={brief.companyName}
              onChange={(e) => setBrief({ ...brief, companyName: e.target.value })}
            />
            <Input
              label="Timeline"
              placeholder="e.g., 3 months, Q2 2026"
              value={brief.timeline}
              onChange={(e) => setBrief({ ...brief, timeline: e.target.value })}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Primary Objective"
                placeholder="What do you want to achieve? e.g., Launch new product, build brand awareness, manage crisis..."
                value={brief.objective}
                onChange={(e) => setBrief({ ...brief, objective: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Context & Background"
                placeholder="Industry, company stage, previous PR efforts, competitive landscape, target markets..."
                value={brief.context}
                onChange={(e) => setBrief({ ...brief, context: e.target.value })}
              />
            </div>
            <Input
              label="Budget Range (Optional)"
              placeholder="e.g., $5,000 - $10,000"
              value={brief.budget}
              onChange={(e) => setBrief({ ...brief, budget: e.target.value })}
            />
            <Input
              label="Constraints / Requirements"
              placeholder="e.g., Must avoid competitor mentions, CEO availability limited"
              value={brief.constraints}
              onChange={(e) => setBrief({ ...brief, constraints: e.target.value })}
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleGenerate} disabled={isGenerating} className="gap-1.5">
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing Brief...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Analyze & Continue
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Target Audiences</h2>
          <p className="text-sm text-gray-500 mb-6">AI-generated audience personas based on your brief. Review and customize.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Tech Journalists",
                description: "Reporters covering enterprise SaaS, B2B technology, and startup funding. Key outlets: TechCrunch, The Verge, Wired.",
                demographics: "Age 25-45, US/UK/EU based",
                channels: "Email pitches, Twitter/X, LinkedIn",
              },
              {
                name: "Industry Analysts",
                description: "Gartner, Forrester, and independent analysts covering your market category.",
                demographics: "Senior professionals, 35-55",
                channels: "Direct briefings, research reports",
              },
              {
                name: "End Users / Customers",
                description: "Current and prospective customers who follow industry news and social media.",
                demographics: "SMB decision-makers, 30-50",
                channels: "LinkedIn, industry forums, newsletters",
              },
            ].map((persona, idx) => (
              <Card key={idx} className="border-2 border-dashed border-gray-200 hover:border-indigo-300">
                <div className="flex items-center space-x-2 mb-3">
                  <Users size={18} className="text-indigo-500" />
                  <h3 className="font-medium text-gray-900">{persona.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{persona.description}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Demographics:</span> {persona.demographics}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Channels:</span> {persona.channels}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
            <div className="flex space-x-2">
              <Button variant="secondary" className="gap-1.5">
                <RefreshCw size={16} />
                Regenerate
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating} className="gap-1.5">
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Running SWOT...
                  </>
                ) : (
                  <>
                    Continue to Analysis
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">SWOT & Competitive Analysis</h2>
          <p className="text-sm text-gray-500 mb-6">AI-generated strategic analysis. Edit any section to refine.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Strengths",
                color: "border-green-200 bg-green-50",
                titleColor: "text-green-800",
                items: [
                  "Strong product differentiation in AI-native approach",
                  "Experienced leadership team with industry connections",
                  "First-mover advantage in agentic PR automation",
                ],
              },
              {
                title: "Weaknesses",
                color: "border-red-200 bg-red-50",
                titleColor: "text-red-800",
                items: [
                  "Limited brand awareness in target market",
                  "Small team constrains PR bandwidth",
                  "No existing journalist relationships",
                ],
              },
              {
                title: "Opportunities",
                color: "border-blue-200 bg-blue-50",
                titleColor: "text-blue-800",
                items: [
                  "Growing market demand for AI PR tools",
                  "Competitor (Prowly) exiting market creates opening",
                  "Industry conferences provide high-visibility moments",
                ],
              },
              {
                title: "Threats",
                color: "border-yellow-200 bg-yellow-50",
                titleColor: "text-yellow-800",
                items: [
                  "Enterprise incumbents may add similar features",
                  "AI skepticism among traditional PR professionals",
                  "Rapid technology changes may shift market expectations",
                ],
              },
            ].map((section) => (
              <div key={section.title} className={`p-5 rounded-xl border-2 ${section.color}`}>
                <h3 className={`font-semibold mb-3 ${section.titleColor}`}>{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} className="gap-1.5">
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Building Strategy...
                </>
              ) : (
                <>
                  Generate Strategy
                  <Sparkles size={16} />
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Your Communication Strategy</h2>
                <p className="text-sm text-gray-500">Complete strategy generated by AI. Review, edit, and export.</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Copy size={14} />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download size={14} />
                  Export PDF
                </Button>
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <RefreshCw size={14} />
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <h3 className="text-base font-semibold text-gray-900">Executive Summary</h3>
              <p className="text-gray-600">
                This communication strategy outlines a comprehensive approach to launching the product
                in the enterprise SaaS market. The strategy focuses on three target audiences across
                five channels over a 3-month period, leveraging thought leadership, media relations,
                and social amplification.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-6">Key Messages</h3>
              <div className="space-y-2">
                {[
                  "Primary: \"The first AI platform that autonomously manages the entire PR lifecycle.\"",
                  "Supporting: \"Built for solo practitioners who need enterprise-grade capabilities.\"",
                  "Proof Point: \"40% higher media response rates through AI-personalized pitching.\"",
                ].map((msg, idx) => (
                  <div key={idx} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <Badge variant="info" className="mr-2 mt-0.5 flex-shrink-0">{idx + 1}</Badge>
                    <p className="text-sm text-gray-700">{msg}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mt-6">Channel Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { channel: "Media Relations", tactics: "Targeted pitches, exclusive interviews, press briefings" },
                  { channel: "Social Media", tactics: "LinkedIn thought leadership, X engagement, Instagram stories" },
                  { channel: "Content", tactics: "Blog posts, case studies, whitepapers, infographics" },
                ].map((ch) => (
                  <div key={ch.channel} className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900">{ch.channel}</p>
                    <p className="text-xs text-indigo-700 mt-1">{ch.tactics}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mt-6">Timeline</h3>
              <div className="space-y-3">
                {[
                  { phase: "Month 1 - Foundation", tasks: "Media list building, key message refinement, content creation" },
                  { phase: "Month 2 - Launch", tasks: "Press release, media pitching, social campaign launch" },
                  { phase: "Month 3 - Amplification", tasks: "Follow-up coverage, thought leadership, performance analysis" },
                ].map((phase) => (
                  <div key={phase.phase} className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{phase.phase}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{phase.tasks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              <ArrowLeft size={16} className="mr-1" /> Back to Analysis
            </Button>
            <div className="flex space-x-2">
              <Button variant="secondary">Save as Draft</Button>
              <Button className="gap-1.5">
                <Sparkles size={16} />
                Generate Campaign from Strategy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
