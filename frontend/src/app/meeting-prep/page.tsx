"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { Briefcase, MessageSquare, AlertCircle, Quote, CheckSquare } from "lucide-react";

const meetingTypes = [
  { id: "interview", name: "Media Interview" },
  { id: "briefing", name: "Press Briefing" },
  { id: "press_conference", name: "Press Conference" },
  { id: "podcast", name: "Podcast" },
  { id: "panel", name: "Panel Discussion" },
];

export default function MeetingPrepPage() {
  const [journalistName, setJournalistName] = useState("");
  const [outlet, setOutlet] = useState("");
  const [beat, setBeat] = useState("");
  const [meetingType, setMeetingType] = useState("interview");
  const [topic, setTopic] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [prep, setPrep] = useState<Record<string, unknown> | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPrep({
        journalist_profile: "Senior tech reporter covering AI, startups, and enterprise software. Known for detailed product deep-dives and challenging technical claims.",
        likely_questions: [
          { q: "How does your AI differ from competitors like PRBot?", confidence: "High", suggested_answer: "Our agentic approach goes beyond simple automation..." },
          { q: "What's your revenue model and current traction?", confidence: "High", suggested_answer: "We offer tiered SaaS pricing starting at..." },
          { q: "How do you handle AI hallucinations in press releases?", confidence: "Medium", suggested_answer: "We have multiple safeguards including human-in-the-loop..." },
          { q: "What data do you use to train your models?", confidence: "Medium", suggested_answer: "We use Anthropic's Claude API and don't train on customer data..." },
          { q: "Where do you see PR industry in 5 years?", confidence: "Low", suggested_answer: "AI will handle 80% of routine tasks, freeing PR professionals..." },
        ],
        talking_points: [
          "67% time savings for PR teams",
          "Agentic AI — not just automation, but intelligent decision-making",
          "Human-in-the-loop for all critical decisions",
          "50+ teams already using the platform",
          "$12M Series A validates the market opportunity",
        ],
        avoid_topics: [
          { topic: "Specific customer revenue data", redirect: "Talk about growth percentages instead" },
          { topic: "Unreleased product features", redirect: "Focus on current capabilities and roadmap themes" },
          { topic: "Competitor pricing details", redirect: "Discuss value proposition and ROI" },
        ],
        sound_bites: [
          "PR teams shouldn't spend 80% of their time on tasks AI can handle in seconds.",
          "We built the first AI that thinks like a PR professional, not just writes like one.",
          "Human creativity plus AI efficiency — that's the future of communications.",
        ],
      });
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meeting Prep Brief</h1>
          <p className="text-gray-500 mt-1">Generate comprehensive preparation briefs for journalist meetings</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Meeting Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
              <div className="flex flex-wrap gap-2">
                {meetingTypes.map((t) => (
                  <button key={t.id} onClick={() => setMeetingType(t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${meetingType === t.id ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >{t.name}</button>
                ))}
              </div>
            </div>
            <Input label="Journalist Name" value={journalistName} onChange={(e) => setJournalistName(e.target.value)} placeholder="Sarah Chen" />
            <div className="mt-3"><Input label="Outlet" value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="TechCrunch" /></div>
            <div className="mt-3"><Input label="Beat" value={beat} onChange={(e) => setBeat(e.target.value)} placeholder="AI & Startups" /></div>
            <div className="mt-3"><Input label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Product launch discussion" /></div>
            <div className="mt-3"><Input label="Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Humanculus" /></div>
            <Button className="w-full mt-4" onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating Brief..." : "Generate Prep Brief"}
            </Button>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-6">
          {prep ? (
            <>
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={18} className="text-indigo-600" />
                  <h2 className="text-lg font-semibold">Journalist Profile</h2>
                </div>
                <p className="text-sm text-gray-700">{prep.journalist_profile as string}</p>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={18} className="text-blue-600" />
                  <h2 className="text-lg font-semibold">Likely Questions</h2>
                </div>
                <div className="space-y-3">
                  {(prep.likely_questions as Array<{ q: string; confidence: string; suggested_answer: string }>).map((q, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{q.q}</p>
                        <Badge variant={q.confidence === "High" ? "danger" : q.confidence === "Medium" ? "warning" : "default"}>{q.confidence}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{q.suggested_answer}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare size={18} className="text-green-600" />
                    <h3 className="font-semibold">Talking Points</h3>
                  </div>
                  <ul className="space-y-2">
                    {(prep.talking_points as string[]).map((tp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">•</span>{tp}</li>
                    ))}
                  </ul>
                </Card>
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={18} className="text-red-600" />
                    <h3 className="font-semibold">Topics to Avoid</h3>
                  </div>
                  {(prep.avoid_topics as Array<{ topic: string; redirect: string }>).map((t, i) => (
                    <div key={i} className="p-2 border-b last:border-0">
                      <p className="text-sm font-medium text-red-700">{t.topic}</p>
                      <p className="text-xs text-gray-500">Redirect: {t.redirect}</p>
                    </div>
                  ))}
                </Card>
              </div>

              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Quote size={18} className="text-purple-600" />
                  <h3 className="font-semibold">Prepared Sound Bites</h3>
                </div>
                <div className="space-y-2">
                  {(prep.sound_bites as string[]).map((sb, i) => (
                    <div key={i} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <p className="text-sm italic text-purple-800">&ldquo;{sb}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Generate Meeting Prep</p>
                <p className="text-sm mt-1">Enter meeting details to generate a comprehensive preparation brief</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
