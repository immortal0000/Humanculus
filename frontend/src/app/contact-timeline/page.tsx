"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { User, Send, MessageSquare, Calendar, Newspaper, ArrowRight, Plus } from "lucide-react";

const contacts = [
  { id: "c-001", name: "Sarah Chen", outlet: "TechCrunch", interactions: 4, last: "Mar 1, 2026" },
  { id: "c-002", name: "Marcus Rivera", outlet: "The Verge", interactions: 2, last: "Feb 27, 2026" },
  { id: "c-003", name: "Emily Watson", outlet: "Reuters", interactions: 1, last: "Jan 15, 2026" },
  { id: "c-004", name: "David Park", outlet: "Wired", interactions: 1, last: "Mar 1, 2026" },
];

const timelineData: Record<string, Array<{ type: string; subject: string; notes: string; outcome: string; date: string }>> = {
  "c-001": [
    { type: "coverage", subject: "Rising AI Startups to Watch in 2026", notes: "Featured as #3 on the list", outcome: "positive", date: "Mar 1, 2026" },
    { type: "meeting", subject: "CEO Demo & Interview", notes: "45-min video call, very engaged", outcome: "positive", date: "Feb 14, 2026" },
    { type: "response_received", subject: "Re: AI PR Platform Exclusive", notes: "Interested, requested demo", outcome: "positive", date: "Feb 11, 2026" },
    { type: "pitch_sent", subject: "AI PR Platform Exclusive", notes: "Offered 48-hour exclusive", outcome: "accepted", date: "Feb 10, 2026" },
  ],
  "c-002": [
    { type: "follow_up", subject: "Re: New Dashboard Feature Story", notes: "Follow-up with data points", outcome: "pending", date: "Feb 27, 2026" },
    { type: "pitch_sent", subject: "New Dashboard Feature Story", notes: "Pitched product update angle", outcome: "no_response", date: "Feb 20, 2026" },
  ],
};

const typeIcons: Record<string, typeof Send> = {
  pitch_sent: Send,
  response_received: MessageSquare,
  meeting: Calendar,
  coverage: Newspaper,
  follow_up: ArrowRight,
};

export default function ContactTimelinePage() {
  const [selectedContact, setSelectedContact] = useState("c-001");

  const timeline = timelineData[selectedContact] || [];
  const contact = contacts.find((c) => c.id === selectedContact);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Timeline</h1>
          <p className="text-gray-500 mt-1">Track every interaction with your media contacts</p>
        </div>
        <Button><Plus size={16} /> Log Interaction</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Interactions", value: "8" },
          { label: "Pitches Sent", value: "3" },
          { label: "Meetings Held", value: "2" },
          { label: "Coverage Secured", value: "1" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Contact List */}
        <div>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Contacts</h2>
            <div className="space-y-2">
              {contacts.map((c) => (
                <button key={c.id} onClick={() => setSelectedContact(c.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedContact === c.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={14} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.outlet} • {c.interactions} interactions</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">{contact?.name}</h2>
                <p className="text-sm text-gray-500">{contact?.outlet} • Last contact: {contact?.last}</p>
              </div>
              <Button variant="outline" size="sm"><Send size={14} /> New Pitch</Button>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-6">
                {timeline.map((item, i) => {
                  const Icon = typeIcons[item.type] || MessageSquare;
                  return (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                        item.outcome === "positive" || item.outcome === "accepted" ? "bg-green-100" :
                        item.outcome === "pending" || item.outcome === "no_response" ? "bg-yellow-100" : "bg-gray-100"
                      }`}>
                        <Icon size={18} className={
                          item.outcome === "positive" || item.outcome === "accepted" ? "text-green-600" :
                          item.outcome === "pending" || item.outcome === "no_response" ? "text-yellow-600" : "text-gray-600"
                        } />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{item.subject}</p>
                          <Badge variant={
                            item.outcome === "positive" || item.outcome === "accepted" ? "success" :
                            item.outcome === "pending" || item.outcome === "no_response" ? "warning" : "default"
                          }>{item.outcome.replace("_", " ")}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{item.date} • {item.type.replace("_", " ")}</p>
                        <p className="text-sm text-gray-600">{item.notes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
