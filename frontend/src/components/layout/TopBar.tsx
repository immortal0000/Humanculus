"use client";

import { Bell, Search, User, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns, press releases, contacts..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-4">
          <Button variant="primary" size="sm" className="gap-1.5">
            <Sparkles size={16} />
            AI Assistant
          </Button>
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
