import Link from "next/link";
import {
  Lightbulb,
  FileText,
  Share2,
  FolderKanban,
  Sparkles,
  ArrowRight,
  BarChart3,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "AI Strategy Builder",
    description:
      "Generate comprehensive communication strategies from a simple brief. Includes audience personas, SWOT analysis, and channel recommendations.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: FileText,
    title: "Press Release Studio",
    description:
      "Create professional press releases in multiple formats with brand voice consistency. Traditional, multimedia, and social-optimized outputs.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Share2,
    title: "Social Content Engine",
    description:
      "Generate platform-specific content with AI images. Auto-adapt for LinkedIn, X, Instagram, Facebook, and TikTok.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FolderKanban,
    title: "Campaign Dashboard",
    description:
      "Full lifecycle campaign management with task tracking, budget monitoring, approval workflows, and automated reporting.",
    color: "bg-purple-50 text-purple-600",
  },
];

const stats = [
  { value: "67%", label: "Time Saved", detail: "with AI-augmented workflows" },
  { value: "40%", label: "Response Rate", detail: "on AI-personalized pitches" },
  { value: "3x", label: "More Clients", detail: "handled per practitioner" },
  { value: "5-10x", label: "ROI", detail: "through automation" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Humanculus</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Results
            </a>
            <a href="#cta" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started Free
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full mb-6">
            <Zap size={14} className="mr-1.5" />
            Powered by Agentic AI
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Your AI-Powered
            <br />
            <span className="text-indigo-600">PR Command Center</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The first agentic AI platform built for solo PR practitioners. Autonomously plan strategies,
            craft press releases, generate social content, and manage campaigns — all from one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-3.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Start Free
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-indigo-600">{stat.value}</div>
                <div className="mt-1 text-sm font-semibold text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Run PR Solo
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Four powerful AI modules that replace your entire tool stack. Strategy, content, distribution, and management in one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Try it free <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional capabilities */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Also Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, name: "Media Contacts", desc: "AI journalist matching" },
              { icon: BarChart3, name: "Monitoring", desc: "Brand mention tracking" },
              { icon: Shield, name: "Crisis Center", desc: "Detection & response" },
              { icon: Zap, name: "Influencer Tools", desc: "Discovery & outreach" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-5 rounded-xl border border-gray-200 text-center">
                <item.icon size={24} className="mx-auto text-gray-400 mb-2" />
                <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Start Managing PR Like a Team of Ten
          </h2>
          <p className="mt-4 text-gray-600">
            Free to start. No credit card required. Upgrade when you&apos;re ready.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center mt-8 px-8 py-3.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Get Started Free
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Humanculus</span>
          </div>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">
            &copy; 2026 Humanculus. AI-powered PR for independent practitioners.
          </p>
        </div>
      </footer>
    </div>
  );
}
