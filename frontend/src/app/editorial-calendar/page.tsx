"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const eventTypeColors: Record<string, string> = {
  press_release: "bg-indigo-100 text-indigo-700 border-indigo-300",
  social_post: "bg-blue-100 text-blue-700 border-blue-300",
  embargo: "bg-red-100 text-red-700 border-red-300",
  event: "bg-yellow-100 text-yellow-700 border-yellow-300",
  deadline: "bg-purple-100 text-purple-700 border-purple-300",
  meeting: "bg-green-100 text-green-700 border-green-300",
};

const events = [
  { id: 1, title: "Series B Embargo Lifts", type: "embargo", date: 10, endDate: null },
  { id: 2, title: "Interview - Sarah Chen", type: "meeting", date: 12, endDate: null },
  { id: 3, title: "Product Launch Release", type: "press_release", date: 15, endDate: null },
  { id: 4, title: "LinkedIn Series Start", type: "social_post", date: 17, endDate: 21 },
  { id: 5, title: "Q1 Report Deadline", type: "deadline", date: 31, endDate: null },
  { id: 6, title: "TechCrunch Disrupt", type: "event", date: 22, endDate: 24 },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EditorialCalendarPage() {
  const [currentMonth] = useState("March 2026");
  const [view, setView] = useState<"month" | "week">("month");

  // March 2026 starts on Sunday (day 0)
  const daysInMonth = 31;
  const startDay = 0; // Sunday

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getEventsForDay = (day: number) => events.filter(
    (e) => e.date === day || (e.endDate && day >= e.date && day <= e.endDate)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editorial Calendar</h1>
          <p className="text-gray-500 mt-1">Plan and visualize your PR content schedule</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Plus size={16} /> Add Event</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Press Releases", count: 3, color: "indigo" },
          { label: "Social Posts", count: 8, color: "blue" },
          { label: "Embargoes", count: 2, color: "red" },
          { label: "Events", count: 1, color: "yellow" },
          { label: "Deadlines", count: 2, color: "purple" },
          { label: "Meetings", count: 4, color: "green" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-xl font-bold mt-0.5">{s.count}</p>
          </Card>
        ))}
      </div>

      {/* Calendar Header */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20} /></button>
            <h2 className="text-xl font-semibold">{currentMonth}</h2>
            <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20} /></button>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setView("month")} className={`px-3 py-1 text-xs font-medium rounded ${view === "month" ? "bg-white shadow" : ""}`}>Month</button>
            <button onClick={() => setView("week")} className={`px-3 py-1 text-xs font-medium rounded ${view === "week" ? "bg-white shadow" : ""}`}>Week</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {days.map((day) => (
            <div key={day} className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-500">{day}</div>
          ))}
          {calendarDays.map((day, i) => (
            <div key={i} className={`bg-white p-1 min-h-[100px] ${!day ? "bg-gray-50" : ""}`}>
              {day && (
                <>
                  <p className={`text-sm font-medium p-1 ${day === 6 ? "bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center" : "text-gray-700"}`}>
                    {day}
                  </p>
                  <div className="space-y-0.5 mt-0.5">
                    {getEventsForDay(day).map((event) => (
                      <div key={`${event.id}-${day}`} className={`text-xs px-1.5 py-0.5 rounded border truncate cursor-pointer hover:opacity-80 ${eventTypeColors[event.type]}`}>
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.sort((a, b) => a.date - b.date).map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${eventTypeColors[event.type].split(" ")[0]}`} />
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">March {event.date}{event.endDate ? ` - ${event.endDate}` : ""}, 2026</p>
                </div>
              </div>
              <Badge variant="default">{event.type.replace("_", " ")}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
