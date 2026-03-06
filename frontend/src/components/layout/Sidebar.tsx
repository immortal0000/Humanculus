"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  Share2,
  FolderKanban,
  Users,
  BarChart3,
  AlertTriangle,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Strategy Builder", href: "/strategy", icon: Lightbulb },
  { name: "Press Releases", href: "/press-release", icon: FileText },
  { name: "Social Content", href: "/social", icon: Share2 },
  { name: "Campaigns", href: "/campaigns", icon: FolderKanban },
  { name: "Media Contacts", href: "/media-contacts", icon: Users },
  { name: "Monitoring", href: "/monitoring", icon: BarChart3 },
  { name: "Crisis Center", href: "/crisis", icon: AlertTriangle },
  { name: "Newsroom", href: "/newsroom", icon: Globe },
];

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="text-lg font-semibold">Humanculus</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm mx-auto">
            H
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-md hover:bg-gray-800 transition-colors",
            collapsed && "mx-auto mt-2"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 py-4 px-2">
        {bottomNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
