"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Star,
  StarOff,
  Download,
  Upload,
  Sparkles,
  Building2,
  MapPin,
  MoreVertical,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  title: string;
  outlet: string;
  beat: string;
  email: string;
  phone: string;
  location: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  relationship: "Strong" | "Moderate" | "New";
  lastContact: string;
  favorited: boolean;
  pitchSuccess: number;
  avatar: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior Tech Reporter",
    outlet: "TechCrunch",
    beat: "AI & Machine Learning",
    email: "sarah.chen@techcrunch.com",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    tier: "Tier 1",
    relationship: "Strong",
    lastContact: "2 days ago",
    favorited: true,
    pitchSuccess: 78,
    avatar: "SC",
  },
  {
    id: "2",
    name: "Marcus Rivera",
    title: "Business Editor",
    outlet: "The Verge",
    beat: "Startups & VC",
    email: "m.rivera@theverge.com",
    phone: "+1 (212) 555-0198",
    location: "New York, NY",
    tier: "Tier 1",
    relationship: "Moderate",
    lastContact: "1 week ago",
    favorited: true,
    pitchSuccess: 65,
    avatar: "MR",
  },
  {
    id: "3",
    name: "Emily Watson",
    title: "Technology Correspondent",
    outlet: "Reuters",
    beat: "Enterprise Tech",
    email: "e.watson@reuters.com",
    phone: "+44 20 7555 0123",
    location: "London, UK",
    tier: "Tier 1",
    relationship: "Strong",
    lastContact: "3 days ago",
    favorited: false,
    pitchSuccess: 82,
    avatar: "EW",
  },
  {
    id: "4",
    name: "David Park",
    title: "Staff Writer",
    outlet: "Wired",
    beat: "Digital Culture",
    email: "d.park@wired.com",
    phone: "+1 (415) 555-0167",
    location: "San Francisco, CA",
    tier: "Tier 2",
    relationship: "Moderate",
    lastContact: "2 weeks ago",
    favorited: false,
    pitchSuccess: 45,
    avatar: "DP",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    title: "Freelance Journalist",
    outlet: "Forbes, Fast Company",
    beat: "Future of Work",
    email: "lisa@lisathompson.com",
    phone: "+1 (617) 555-0134",
    location: "Boston, MA",
    tier: "Tier 2",
    relationship: "New",
    lastContact: "1 month ago",
    favorited: false,
    pitchSuccess: 30,
    avatar: "LT",
  },
  {
    id: "6",
    name: "James Okafor",
    title: "Tech Columnist",
    outlet: "Bloomberg",
    beat: "AI Policy & Ethics",
    email: "j.okafor@bloomberg.net",
    phone: "+1 (212) 555-0189",
    location: "Washington, DC",
    tier: "Tier 1",
    relationship: "Moderate",
    lastContact: "5 days ago",
    favorited: true,
    pitchSuccess: 71,
    avatar: "JO",
  },
];

const beats = ["All Beats", "AI & Machine Learning", "Startups & VC", "Enterprise Tech", "Digital Culture", "Future of Work", "AI Policy & Ethics"];
const tiers = ["All Tiers", "Tier 1", "Tier 2", "Tier 3"];

export default function MediaContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBeat, setSelectedBeat] = useState("All Beats");
  const [selectedTier, setSelectedTier] = useState("All Tiers");
  const [contacts, setContacts] = useState(mockContacts);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.beat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBeat = selectedBeat === "All Beats" || contact.beat === selectedBeat;
    const matchesTier = selectedTier === "All Tiers" || contact.tier === selectedTier;
    return matchesSearch && matchesBeat && matchesTier;
  });

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, favorited: !c.favorited } : c)));
  };

  const tierColor: Record<string, "info" | "warning" | "default"> = {
    "Tier 1": "info",
    "Tier 2": "warning",
    "Tier 3": "default",
  };

  const relationshipColor: Record<string, "success" | "warning" | "default"> = {
    Strong: "success",
    Moderate: "warning",
    New: "default",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Media Contacts</h1>
          <p className="section-subtitle">Manage your journalist database and track relationships.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload size={16} />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download size={16} />
            Export
          </Button>
          <Button className="gap-1.5">
            <Plus size={16} />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Contacts", value: contacts.length.toString(), detail: "In your database" },
          { label: "Tier 1 Contacts", value: contacts.filter((c) => c.tier === "Tier 1").length.toString(), detail: "Top-tier outlets" },
          { label: "Avg Pitch Success", value: Math.round(contacts.reduce((acc, c) => acc + c.pitchSuccess, 0) / contacts.length) + "%", detail: "Response rate" },
          { label: "Active Relations", value: contacts.filter((c) => c.relationship === "Strong").length.toString(), detail: "Strong relationships" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.detail}</p>
          </Card>
        ))}
      </div>

      {/* AI Suggestion */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">AI Contact Suggestions</p>
              <p className="text-sm text-gray-600">Based on your recent strategy, we found 8 journalists who cover AI startups in your target markets.</p>
            </div>
          </div>
          <Button size="sm">View Suggestions</Button>
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts by name, outlet, or beat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select
          value={selectedBeat}
          onChange={(e) => setSelectedBeat(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {beats.map((beat) => (
            <option key={beat}>{beat}</option>
          ))}
        </select>
        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {tiers.map((tier) => (
            <option key={tier}>{tier}</option>
          ))}
        </select>
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} hover>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-sm">
                  {contact.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <button onClick={() => toggleFavorite(contact.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
                      {contact.favorited ? <Star size={16} className="text-yellow-500 fill-yellow-500" /> : <StarOff size={16} />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{contact.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 size={14} />
                      {contact.outlet}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {contact.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      <Mail size={14} />
                      {contact.email}
                    </a>
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {contact.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={tierColor[contact.tier]}>{contact.tier}</Badge>
                  <Badge variant={relationshipColor[contact.relationship]}>{contact.relationship}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Beat: <span className="text-gray-700 font-medium">{contact.beat}</span></p>
                  <p className="text-xs text-gray-400 mt-1">Last contact: {contact.lastContact}</p>
                  <p className="text-xs text-gray-400">Pitch success: <span className="font-medium text-indigo-600">{contact.pitchSuccess}%</span></p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Mail size={14} />
                    Pitch
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="text-center py-12">
          <Users size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No contacts found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
        </Card>
      )}
    </div>
  );
}
