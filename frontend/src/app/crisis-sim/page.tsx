"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { AlertTriangle, MessageSquare, Clock, Users, TrendingDown } from "lucide-react";

const scenarios = [
  { id: "data-breach", name: "Data Breach", severity: "critical" },
  { id: "product-recall", name: "Product Recall", severity: "high" },
  { id: "executive-scandal", name: "Executive Scandal", severity: "high" },
  { id: "viral-backlash", name: "Viral Backlash", severity: "medium" },
  { id: "competitor-attack", name: "Competitor Attack", severity: "medium" },
  { id: "regulatory-action", name: "Regulatory Action", severity: "high" },
];

const sampleQuestions = [
  { q: "When did you first become aware of the data breach?", difficulty: "Hard" },
  { q: "How many customers are affected?", difficulty: "Hard" },
  { q: "What specific data was compromised?", difficulty: "Medium" },
  { q: "Why wasn't this detected earlier by your security systems?", difficulty: "Hard" },
  { q: "What compensation will affected customers receive?", difficulty: "Medium" },
];

export default function CrisisSimPage() {
  const [scenario, setScenario] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [severity, setSeverity] = useState("high");
  const [responsePlan, setResponsePlan] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [simulation, setSimulation] = useState<Record<string, unknown> | null>(null);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulation({
        grade: responsePlan ? "B+" : null,
        questions: sampleQuestions,
        timeline: [
          { hour: "0-1", event: "Internal discovery and initial team assembly", sentiment: -20 },
          { hour: "1-4", event: "First social media posts appear, speculation begins", sentiment: -45 },
          { hour: "4-8", event: "Major outlets pick up the story, calls for comment", sentiment: -65 },
          { hour: "8-24", event: "Official statement released, mixed reception", sentiment: -50 },
          { hour: "24-48", event: "Follow-up coverage, competitor commentary", sentiment: -35 },
        ],
        stakeholder_impact: [
          { group: "Customers", impact: "High", concern: "Data safety, trust erosion" },
          { group: "Investors", impact: "Medium", concern: "Stock impact, governance questions" },
          { group: "Employees", impact: "Medium", concern: "Morale, public perception" },
          { group: "Partners", impact: "Low", concern: "Association risk" },
        ],
        actions: [
          { priority: "Immediate", action: "Assemble crisis team and legal counsel" },
          { priority: "Immediate", action: "Draft holding statement for media inquiries" },
          { priority: "Within 4h", action: "Notify affected customers directly" },
          { priority: "Within 24h", action: "Publish full transparency report" },
          { priority: "Within 1w", action: "Announce remediation measures" },
        ],
      });
      setSimulating(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crisis Scenario Simulator</h1>
          <p className="text-gray-500 mt-1">Stress-test your response plans with realistic crisis simulations</p>
        </div>
        <Badge variant="info">AI-Powered</Badge>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Input */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Scenario Setup</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Scenarios</label>
              <div className="grid grid-cols-2 gap-2">
                {scenarios.map((s) => (
                  <button key={s.id} onClick={() => setScenario(s.name + " scenario")}
                    className={`p-2 rounded-lg border text-left text-xs ${scenario.includes(s.name) ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <p className="font-medium">{s.name}</p>
                    <Badge variant={s.severity === "critical" ? "danger" : s.severity === "high" ? "warning" : "default"}>{s.severity}</Badge>
                  </button>
                ))}
              </div>
            </div>
            <Input label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Humanculus" />
            <div className="mt-3"><Input label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Technology / SaaS" /></div>
            <div className="mt-3"><Textarea label="Custom Scenario" value={scenario} onChange={(e) => setScenario(e.target.value)} placeholder="Describe the crisis scenario..." /></div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="mt-3"><Textarea label="Response Plan to Grade (optional)" value={responsePlan} onChange={(e) => setResponsePlan(e.target.value)} placeholder="Paste your existing response plan..." /></div>
            <Button className="w-full mt-4" onClick={handleSimulate} disabled={simulating}>
              {simulating ? "Simulating Crisis..." : "Run Simulation"}
            </Button>
          </Card>
        </div>

        {/* Results */}
        <div className="col-span-2 space-y-6">
          {simulation ? (
            <>
              {(simulation.grade as string | null) && (
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-700">{simulation.grade as string}</span>
                    </div>
                    <div>
                      <p className="font-semibold">Response Plan Grade</p>
                      <p className="text-sm text-gray-500">Good plan with room for improvement in stakeholder communication</p>
                    </div>
                  </div>
                </Card>
              )}

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={18} className="text-red-600" />
                  <h2 className="text-lg font-semibold">Tough Journalist Questions</h2>
                </div>
                <div className="space-y-3">
                  {(simulation.questions as Array<{ q: string; difficulty: string }>).map((q, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-start justify-between">
                      <p className="text-sm">{q.q}</p>
                      <Badge variant={q.difficulty === "Hard" ? "danger" : "warning"}>{q.difficulty}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-blue-600" />
                  <h2 className="text-lg font-semibold">Social Media Timeline</h2>
                </div>
                <div className="space-y-3">
                  {(simulation.timeline as Array<{ hour: string; event: string; sentiment: number }>).map((t, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded w-16 text-center">{t.hour}h</span>
                      <p className="text-sm flex-1">{t.event}</p>
                      <span className={`text-sm font-medium ${t.sentiment < -50 ? "text-red-600" : t.sentiment < -20 ? "text-yellow-600" : "text-gray-600"}`}>
                        {t.sentiment}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-purple-600" />
                    <h3 className="font-semibold">Stakeholder Impact</h3>
                  </div>
                  {(simulation.stakeholder_impact as Array<{ group: string; impact: string; concern: string }>).map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                      <span className="text-sm font-medium">{s.group}</span>
                      <div className="text-right">
                        <Badge variant={s.impact === "High" ? "danger" : s.impact === "Medium" ? "warning" : "default"}>{s.impact}</Badge>
                        <p className="text-xs text-gray-500 mt-0.5">{s.concern}</p>
                      </div>
                    </div>
                  ))}
                </Card>
                <Card>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown size={18} className="text-indigo-600" />
                    <h3 className="font-semibold">Recommended Actions</h3>
                  </div>
                  {(simulation.actions as Array<{ priority: string; action: string }>).map((a, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 border-b last:border-0">
                      <Badge variant={a.priority === "Immediate" ? "danger" : a.priority.includes("4h") ? "warning" : "info"}>{a.priority}</Badge>
                      <span className="text-sm">{a.action}</span>
                    </div>
                  ))}
                </Card>
              </div>
            </>
          ) : (
            <Card>
              <div className="text-center py-16 text-gray-400">
                <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Run a Crisis Simulation</p>
                <p className="text-sm mt-1">Set up a crisis scenario to test your response readiness</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
