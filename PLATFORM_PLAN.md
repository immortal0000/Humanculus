# Humanculus - AI-Powered PR Communication Platform

## Platform Discovery & Planning Document

### Vision
An **agentic AI-powered PR platform** for solo PR practitioners that autonomously plans, executes, and optimizes PR workflows end-to-end. No competitor currently offers this - it's the biggest gap in the $7.29B agentic AI market.

### Target User
Solo PR practitioners and independent consultants

### Core Differentiator
Fully agentic AI that autonomously handles the PR cycle: strategy formulation, content creation, journalist targeting, pitch personalization, distribution, monitoring, and ROI reporting.

### MVP Modules
1. **AI Strategy Builder** - Generate communication strategies, audience personas, key messages from a brief
2. **Press Release Studio** - AI-powered press release creation with brand voice, AP style, multi-format output
3. **Social Content Engine** - Multi-platform social media content generation, scheduling, and analytics
4. **Campaign Dashboard** - Campaign lifecycle management, task tracking, and reporting

### Tech Stack
- **Frontend**: Next.js 14+ (App Router) with Tailwind CSS
- **Backend**: Python/FastAPI for AI services
- **Database**: PostgreSQL (Supabase or Neon) + Redis for caching
- **AI**: Claude API (Anthropic) as primary LLM
- **Auth**: NextAuth.js or Clerk
- **Deployment**: Vercel (frontend) + Railway/Fly.io (AI services)

---

## Market Research Summary

### Competitive Landscape

| Tier | Platforms | Annual Cost |
|------|-----------|-------------|
| Enterprise | Meltwater, CisionOne, Muck Rack | $8,000-$15,000+/yr |
| Mid-Market | Prezly, Agility PR, Prowly (phasing out) | $1,000-$4,000/yr |
| SMB/Startup | HeyJared AI, Pressmaster.ai, Brand24 | $144-$1,200/yr |
| Free/Freemium | PressPal.ai, QuillBot, ChatGPT | $0-$240/yr |

### Key Market Gaps We Address
1. **No fully agentic PR platform exists** - biggest opportunity
2. **Fragmented toolchain** - PR pros use 5-10 tools; we unify them
3. **Prowly exit** (Dec 2025) leaves mid-tier gap
4. **LLM visibility management** is nascent (only Meltwater & Ahrefs)
5. **PR ROI attribution** remains largely unsolved
6. **Crisis simulation** not available at affordable price points

### Industry Stats
- 76% of PR professionals actively use generative AI
- AI-personalized pitches achieve 40% response rates vs 8-12% traditional
- AI-augmented teams report 67% time savings
- Same team handles 2-3x more clients with AI
- 80% of PR professionals expected to employ AI tools by 2026

---

## Discovery Questions

### A. Vision & Positioning
1. Is "Humanculus" the final brand name or a working title?
2. What pricing tier? (Freemium, $50-100/mo SMB, $200-400/mo mid-market?)
3. Should the agentic AI run fully autonomously or with human-in-the-loop approval checkpoints?

### B. Core PR Tools

#### AI Strategy Builder
4. Should AI generate full strategies from a brief, or guide users step-by-step?
5. Should it include audience persona creation, SWOT analysis, competitive positioning, channel recommendations?

#### Press Release Studio
6. Should it support multiple formats (traditional, multimedia, social-optimized)?
7. Should it include distribution integration (PR Newswire, Business Wire)?
8. Should it enforce AP style and support custom brand voice guidelines?
9. Should it generate localized/translated versions for different markets?

#### Social Content Engine
10. What content types? (Text posts, image captions, video scripts, carousels, stories?)
11. Should it include AI image generation or text/copy only?
12. Should it auto-adapt content for each platform (LinkedIn, X/Twitter, Instagram, Facebook, TikTok)?
13. Should it include scheduling, publishing, and engagement analytics?

#### Campaign Dashboard
14. Full lifecycle support (planning > execution > monitoring > reporting)?
15. Should it include task assignment and team collaboration features?
16. Should it include budget tracking and approval workflows?

### C. Additional Features to Consider
17. Should it include a journalist/media contact database with AI-powered matching?
18. Should it track brand mentions across news, social, blogs, podcasts?
19. Should it monitor brand presence in AI chatbots (ChatGPT, Gemini, Perplexity)?
20. Should it include crisis detection, alerting, and response templates?
21. Should it include influencer discovery and outreach tools?
22. Should it generate automated PR reports with ROI attribution?
23. Should it include a branded online newsroom / press kit hosting?

### D. Technical Architecture
24. Should it support teams/organizations with role-based access, or solo-only initially?
25. Which third-party integrations are priorities? (Social platform APIs, email, Slack, Google Workspace, press wire services?)
26. Any compliance requirements? (GDPR, SOC 2?)
27. Web-only initially, or also mobile apps?

### E. Business & Launch
28. What is the target MVP launch timeline?
29. Monetization model? (Subscription, per-seat, usage-based, freemium?)

---

## Recommended Next Steps
1. Answer the discovery questions above to finalize scope
2. Define detailed feature specifications for each MVP module
3. Set up project scaffolding (Next.js + FastAPI + PostgreSQL)
4. Build module by module:
   - Phase 1: AI Strategy Builder (core value prop)
   - Phase 2: Press Release Studio
   - Phase 3: Social Content Engine
   - Phase 4: Campaign Dashboard
5. Integrate agentic workflows across modules
6. Beta launch with select solo PR practitioners

---

## Competitor Deep Dive

### Direct Competitors to Watch
- **HeyJared AI** ($99/mo) - AI-native, automated reporter matching, personalized pitch generation
- **Pressmaster.ai** ($12-72/mo) - AI interviews, trend scanning, social scheduling, white-label
- **PressPal.ai** (Free) - Muck Rack-backed, AI pitch writing, journalist targeting

### Enterprise Incumbents
- **Meltwater** - GenAI Lens tracks brand in LLMs, AI assistant "Mira"
- **CisionOne** - 1.6M+ journalist contacts, PR Newswire distribution
- **Muck Rack** - Best journalist profiling data

### Emerging Agentic Platforms (Adjacent)
- **PubMatic AgenticOS** - 87% reduction in campaign setup time (advertising, not PR)
- **Salesforce Agentforce** - Autonomous agents across CRM
- **HubSpot Breeze** - AI agents for marketing outreach

### Key Insight
**No company has built a fully agentic PR platform.** This is the single largest opportunity in the market.
