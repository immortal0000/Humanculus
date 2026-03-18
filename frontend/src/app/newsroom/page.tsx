"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Globe,
  FileText,
  Image,
  Video,
  Download,
  Plus,
  Eye,
  Calendar,
  Link as LinkIcon,
  Copy,
  Settings,
  ExternalLink,
  Folder,
  Upload,
  Sparkles,
  Search,
} from "lucide-react";

interface PressRelease {
  id: string;
  title: string;
  date: string;
  status: "published" | "draft" | "scheduled";
  category: string;
  views: number;
}

interface MediaAsset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "logo";
  size: string;
  lastModified: string;
  downloads: number;
}

const mockPressReleases: PressRelease[] = [
  { id: "1", title: "Humanculus Launches Agentic AI PR Platform", date: "Mar 3, 2026", status: "published", category: "Product Launch", views: 1243 },
  { id: "2", title: "New Campaign Dashboard Revolutionizes PR Workflows", date: "Feb 25, 2026", status: "published", category: "Feature Update", views: 876 },
  { id: "3", title: "Q1 2026 Industry Report: AI in Communications", date: "Mar 10, 2026", status: "scheduled", category: "Research", views: 0 },
  { id: "4", title: "Partnership Announcement with Leading Media Database", date: "Mar 15, 2026", status: "draft", category: "Partnership", views: 0 },
];

const mockAssets: MediaAsset[] = [
  { id: "1", name: "Company Logo - Primary", type: "logo", size: "2.4 MB", lastModified: "Jan 15, 2026", downloads: 234 },
  { id: "2", name: "Executive Headshots Pack", type: "image", size: "18.5 MB", lastModified: "Feb 1, 2026", downloads: 156 },
  { id: "3", name: "Product Screenshots 2026", type: "image", size: "12.1 MB", lastModified: "Mar 1, 2026", downloads: 89 },
  { id: "4", name: "Company Overview Video", type: "video", size: "145 MB", lastModified: "Feb 20, 2026", downloads: 67 },
  { id: "5", name: "Brand Guidelines PDF", type: "document", size: "4.2 MB", lastModified: "Jan 5, 2026", downloads: 312 },
  { id: "6", name: "Company Fact Sheet", type: "document", size: "1.8 MB", lastModified: "Mar 2, 2026", downloads: 198 },
];

const statusConfig = {
  published: { color: "success" as const, label: "Published" },
  draft: { color: "default" as const, label: "Draft" },
  scheduled: { color: "info" as const, label: "Scheduled" },
};

const assetIcons = {
  image: <Image size={20} className="text-purple-600" />,
  video: <Video size={20} className="text-red-600" />,
  document: <FileText size={20} className="text-blue-600" />,
  logo: <Image size={20} className="text-green-600" />,
};

export default function NewsroomPage() {
  const [selectedTab, setSelectedTab] = useState<"releases" | "assets" | "about">("releases");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Newsroom</h1>
          <p className="section-subtitle">Manage your public-facing press page, media assets, and company information.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ExternalLink size={16} />
            View Public Page
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Settings size={16} />
            Customize
          </Button>
        </div>
      </div>

      {/* Newsroom URL */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Newsroom URL</p>
              <p className="text-base font-medium text-gray-900">newsroom.humanculus.com/your-company</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Copy size={14} />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <LinkIcon size={14} />
              Custom Domain
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Total Releases</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{mockPressReleases.length}</p>
          <p className="text-xs text-gray-400 mt-1">{mockPressReleases.filter((r) => r.status === "published").length} published</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Media Assets</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{mockAssets.length}</p>
          <p className="text-xs text-gray-400 mt-1">Logos, images, videos</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Page Views (30d)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">3,456</p>
          <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Asset Downloads</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{mockAssets.reduce((acc, a) => acc + a.downloads, 0)}</p>
          <p className="text-xs text-gray-400 mt-1">All time</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {[
          { key: "releases" as const, label: "Press Releases", icon: FileText },
          { key: "assets" as const, label: "Media Assets", icon: Folder },
          { key: "about" as const, label: "Company Info", icon: Globe },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Press Releases Tab */}
      {selectedTab === "releases" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search press releases..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <Button className="gap-1.5"><Plus size={16} />New Release</Button>
          </div>
          <Card className="p-0 divide-y divide-gray-100">
            {mockPressReleases.map((release) => (
              <div key={release.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg"><FileText size={20} className="text-gray-500" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{release.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={14} />{release.date}</span>
                      <span>{release.category}</span>
                      {release.views > 0 && (
                        <span className="flex items-center gap-1"><Eye size={14} />{release.views.toLocaleString()} views</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusConfig[release.status].color}>{statusConfig[release.status].label}</Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Media Assets Tab */}
      {selectedTab === "assets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Manage logos, images, videos, and documents for media use</p>
            <Button className="gap-1.5"><Upload size={16} />Upload Asset</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAssets.map((asset) => (
              <Card key={asset.id} hover>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">{assetIcons[asset.type]}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{asset.size} &middot; {asset.type}</p>
                    <p className="text-xs text-gray-400 mt-1">Modified: {asset.lastModified}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Download size={12} />{asset.downloads} downloads
                      </span>
                      <Button variant="outline" size="sm" className="gap-1"><Download size={14} />Download</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Company Info Tab */}
      {selectedTab === "about" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Company Boilerplate</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Sparkles size={14} />
                  AI Rewrite
                </Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Humanculus is an AI-powered PR and communications platform designed for modern practitioners. Using agentic AI technology, Humanculus automates the entire PR workflow from strategy development to media outreach, content creation, and performance tracking. Founded in 2025, the company is committed to empowering solo PR professionals and small teams with enterprise-level capabilities at an accessible price point.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Company Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Founded", value: "2025" },
                  { label: "Headquarters", value: "San Francisco, CA" },
                  { label: "Industry", value: "AI / SaaS / Public Relations" },
                  { label: "Website", value: "humanculus.com" },
                  { label: "Employees", value: "10-50" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Media Contact</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Name", value: "Press Team" },
                  { label: "Email", value: "press@humanculus.com" },
                  { label: "Phone", value: "+1 (415) 555-0100" },
                  { label: "Response Time", value: "Within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">Edit Contact Info</Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
