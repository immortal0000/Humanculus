# Humanculus — Product & Business Description

## Overview

**Humanculus** is an AI-powered, all-in-one Public Relations communication platform designed for solo PR practitioners, independent consultants, and small PR teams. It unifies the fragmented PR toolchain — typically 5–10 separate tools — into a single platform that covers the entire PR lifecycle: strategy formulation, content creation, journalist outreach, distribution, monitoring, crisis management, and performance analytics.

The platform's core differentiator is its **agentic AI architecture**, powered by Anthropic's Claude API. Unlike legacy PR tools that simply store contacts or distribute press releases, Humanculus uses AI to autonomously draft strategies, write personalized pitches, repurpose content across formats, simulate crisis scenarios, and generate actionable intelligence — all with human-in-the-loop approval checkpoints.

**Target Market:** Solo PR practitioners, independent consultants, startup comms teams, and small agencies — the segment underserved by enterprise platforms (Meltwater, Cision at $8K–$15K/yr) and left behind by Prowly's shutdown in December 2025.

---

## Platform Architecture

The application is a full-stack web platform:
- **Frontend:** Next.js 14 (React 18) with Tailwind CSS, organized as a sidebar-navigated single-page application with 25 distinct pages
- **Backend:** Python/FastAPI with 20 API routers serving 59 endpoints
- **AI Engine:** Anthropic Claude API (claude-sonnet-4-20250514) for all generative features
- **Deployment:** Dockerized (docker-compose) for local/self-hosted; designed for Vercel + Railway/Fly.io in production

The sidebar organizes features into three sections: **Main Navigation** (9 items), **AI Tools** (8 items), and **Tools** (8 items).

---

## Feature Inventory

### A. CORE MODULES (Main Navigation)

---

#### 1. Dashboard
**Purpose:** Central command center providing a real-time overview of all PR activity.

**What the user sees:**
- **4 KPI cards:** Active Campaigns (3), Press Releases (12), Social Posts (47), Media Mentions (156 — +23% vs. last month)
- **Quick Actions:** One-click launchers for New Strategy, Press Release, Social Content, and New Campaign
- **Recent Activity Feed:** Timestamped log of recent work (strategies completed, releases drafted, campaigns scheduled)
- **AI Agent Status Panel:** Shows the agentic AI's current state — what tasks it has completed, what's in progress ("Social posts generating..."), and what's awaiting human approval ("Awaiting approval for pitch send")
- **Upcoming Tasks:** Prioritized to-do list (e.g., "Review pitch for TechCrunch", "Approve social campaign assets")

**Business value:** Gives the practitioner a single-glance understanding of their entire PR operation, eliminating the need to check multiple tools.

---

#### 2. AI Strategy Builder
**Purpose:** Generate comprehensive communication strategies from a brief, replacing hours of manual strategic planning.

**User flow:**
1. User enters a brief: company name, objective, context, timeline, budget, constraints
2. Selects from templates: Product Launch, Crisis Response, Thought Leadership, Brand Awareness, Investor Relations
3. AI generates a complete strategy including:
   - Target audience personas
   - SWOT analysis
   - Key messaging framework
   - Channel strategy with platform-specific recommendations
   - Timeline with milestones
   - Executive summary

**Guided 4-step wizard:** Brief → Audience → Analysis → Strategy

**Sample data shows:** Completed strategies for "Product Launch - SaaS Platform" (3 audiences, 5 channels), "Crisis Response - Data Breach", and "Thought Leadership - AI in PR".

**API:** `POST /api/strategy/generate` — accepts a `StrategyBrief`, returns structured strategy via Claude AI. `GET /api/strategy/templates` — returns 5 strategy templates.

---

#### 3. Press Release Studio
**Purpose:** AI-powered press release creation with brand voice consistency, AP style compliance, and multi-format output.

**User flow:**
1. User provides: headline, subheadline, announcement details, quotes, company boilerplate
2. Selects format: Traditional, Multimedia, or Social-optimized
3. Selects brand voice: Professional, Conversational, Authoritative, etc.
4. AI generates a complete press release with word count
5. User can copy, download, regenerate, or edit

**Existing releases shown:** "Series A Funding Announcement - $15M Round" (published, 487 words), "New Product Feature: AI Campaign Automation" (draft, 623 words), partnership announcements.

**API:** `POST /api/press-release/generate` — generates release content. `GET /api/press-release/formats` — returns available formats (traditional, multimedia, social-optimized, email-optimized).

---

#### 4. Social Content Engine
**Purpose:** Generate platform-optimized social media content for multiple networks simultaneously.

**User flow:**
1. User enters topic, optional context, and selects target platforms (LinkedIn, X/Twitter, Instagram, Facebook, TikTok)
2. Selects content type: Text, Image (caption), Video (script), or Carousel
3. Selects brand voice
4. AI generates tailored posts for each platform, respecting character limits (e.g., 280 chars for X/Twitter) and platform conventions

**API:** `POST /api/social/generate` — generates multi-platform content. `GET /api/social/platforms` — returns 5 supported platforms with their content specs.

---

#### 5. Campaign Dashboard
**Purpose:** Full-lifecycle campaign management from planning through execution, monitoring, and reporting.

**User flow:**
1. User creates a campaign: name, objective, target audience, dates, optional budget
2. Selects from templates: Product Launch, Brand Awareness, Event Coverage, Crisis Response, Thought Leadership (each with predefined task counts and durations)
3. AI generates a campaign plan with strategy overview, milestones, task breakdown, content plan, KPIs, and budget allocation
4. User tracks progress through campaign cards showing status, task counts, and completion %

**Campaign templates:** 5 templates (Product Launch = 25 tasks/6 weeks, Brand Awareness = 20 tasks/8 weeks, etc.)

**API:** `POST /api/campaigns/generate-plan`, `GET /api/campaigns/templates`

---

#### 6. Media Contacts
**Purpose:** Journalist and media contact database with relationship tracking and AI-powered matching.

**Contact profiles include:**
- Name, title, outlet, beat, email, phone, location
- Tier classification (Tier 1/2/3)
- Relationship strength (Strong/Moderate/New)
- Pitch success rate (e.g., Sarah Chen at TechCrunch: 78%)
- Last contact date
- Favorite/star functionality

**Contact list:** Pre-loaded with journalists from TechCrunch, The Verge, Reuters, Wired, Forbes, Bloomberg — each with full profiles.

**Features:** Search, filter, import/export, add new contacts, AI-powered journalist matching.

---

#### 7. Media Monitoring
**Purpose:** Track brand mentions across news, social media, blogs, and broadcast in real-time.

**Dashboard shows:**
- **Mention feed** with source, headline, snippet, sentiment (positive/negative/neutral), reach, and timestamp
- **Platform filters:** News, Social, Blog, Broadcast
- **Sentiment filters:** Positive, Negative, Neutral, All
- **Stats:** Total Mentions, Total Reach, Average Sentiment Score, Share of Voice
- Each mention links to the original source

**Sample mentions:** TechCrunch article "Rising AI Startups to Watch in 2026" (positive, 2.4M reach), LinkedIn industry discussion (positive, 1.2M reach), Medium criticism piece (negative, 180K reach), Bloomberg TV segment (positive, 890K reach).

---

#### 8. Crisis Center
**Purpose:** Real-time crisis detection, monitoring, and coordinated response management.

**Features:**
- **Crisis Alert Feed:** Active alerts with severity levels (Critical, High, Medium, Low), mention counts, and sentiment scores
- **Response Templates:** Pre-built templates for different crisis types (Data Breach Response, Product Safety Statement, Executive Misconduct, Social Media Crisis, Regulatory Compliance)
- **Crisis Team:** Quick-access contact cards for PR Director, Legal Counsel, CEO, VP Engineering
- **Alert Status Tracking:** Active → Monitoring → Resolved lifecycle

**Sample alerts:** "Negative Press Coverage - Data Practices" (high severity, 34 mentions), "Social Media Backlash - Product Issue" (medium, 89 mentions), "Competitor Comparison Article" (low, 12 mentions).

---

#### 9. Newsroom
**Purpose:** Branded online press kit and media resource center.

**Three tabs:**
- **Press Releases:** Published, draft, and scheduled releases with view counts and categories (Product Launch, Feature Update, Research, Partnership)
- **Media Assets:** Organized media library — company logos, executive headshots, product screenshots, company overview video, brand guidelines PDF, fact sheets — with download counts and file sizes
- **Settings:** Newsroom configuration (company info, custom domain, contact details, social links, SEO settings)

**Asset types:** Logo, Image, Video, Document — each with size and download tracking.

---

### B. AI TOOLS (8 AI-Powered Features)

---

#### 10. Media Pitch Generator
**Purpose:** Create hyper-personalized pitch emails tailored to specific journalists, dramatically improving response rates (40% vs. 8-12% industry average).

**User inputs:** Journalist name, outlet, beat, previous coverage, story angle, company name, key points (multiple), tone, and template selection.

**Templates:** Exclusive Offer, Embargo Pitch, Data Story, Trend Piece, Expert Source.

**AI generates:**
- Compelling subject line (under 60 chars)
- Personalized greeting referencing the journalist's work
- Pitch body with story angle (under 300 words)
- Key facts as bullet points
- Call-to-action
- Follow-up timing suggestion
- Personalization notes

**Stats shown:** 34 pitches sent, 42% response rate, 68% avg open rate, 12 coverage secured.

**Recent pitch log:** Shows pitch history with journalist, outlet, subject, status (sent/draft), and response status (accepted/pending).

---

#### 11. Brand Voice Analyzer
**Purpose:** Analyze and codify a company's brand voice from content samples, ensuring consistent messaging across all communications.

**User inputs:** Company name + 3 content samples (press releases, blog posts, social posts, etc.)

**AI generates:**
- Tone profile (primary tone, secondary tone, formality level)
- Personality traits
- Vocabulary analysis
- Writing guidelines and recommendations

**5 Voice Presets:** Professional (Formal, Authoritative, Third-person), Conversational (Warm, Approachable, Second-person), Innovative (Forward-looking, Disruptive, Energetic), Authoritative (Data-driven, Expert, Credible), Empathetic (Human-centered, Understanding, Supportive).

---

#### 12. Content Repurposer
**Purpose:** Transform one piece of content into multiple formats, saving hours of manual adaptation.

**User inputs:** Source content (paste text), source type (Press Release, Blog Post, Social Post, Speech, Report), target formats (multi-select), brand voice.

**8 target formats:** Blog Post (SEO-optimized, 800-1200 words), Email Newsletter (scannable with CTA, under 500 words), Talking Points (10-15 executive bullet points), FAQ (8-12 Q&A pairs), Investor Update (metrics-focused), Internal Memo (actionable with next steps), Tweet Thread (5-10 tweets with hooks), LinkedIn Article (thought leadership, 600-1000 words).

**Stats:** 28 content pieces repurposed, 142 formats generated, 45 hours saved, 5.1 avg formats per source.

---

#### 13. Sentiment Explainer
**Purpose:** Go beyond positive/negative labels to understand *why* a mention has a particular sentiment and what to do about it.

**User inputs:** Headline, source, mention text, sentiment classification.

**Pre-loaded mentions:** From TechCrunch (positive), Medium (negative), PR Week (neutral).

**AI generates:**
- Sentiment drivers (e.g., "Use of 'overhyped' in headline", "Skeptical tone throughout")
- Risk level assessment (low/medium/high/critical)
- Narrative analysis
- Recommended response strategy

---

#### 14. Headline A/B Generator
**Purpose:** Generate and score multiple headline variants optimized for different goals.

**User inputs:** Content to headline, optimization goal, number of variants.

**5 optimization goals:** Click-Through (curiosity gap, emotional triggers), SEO (keyword placement, 50-60 chars), Shareability (social proof, controversy), Authority (data-driven, credibility), General (balanced).

**AI generates per headline:**
- Headline text + character count
- Optimization score (1-100)
- Emotional appeal type (Data-driven, Curiosity, Authority, Social proof, Benefit-driven)
- Rationale
- Recommended A/B test pairs

**Sample output:** "AI-Powered PR Platform Cuts Campaign Planning Time by 67%" (score: 92, data-driven), "The Future of PR is Agentic — And It's Here" (score: 88, curiosity).

---

#### 15. Competitive Intelligence
**Purpose:** Analyze competitors' PR strategies and identify differentiation opportunities.

**User inputs:** Company name, list of competitors (dynamic add/remove), focus areas.

**AI generates:**
- Per-competitor analysis: PR activity summary, key narratives, media presence, social strategy, strengths, weaknesses
- Cross-competitor opportunities for differentiation
- Competitive threats to watch
- Recommended positioning strategy
- Specific tactical action items

---

#### 16. Crisis Scenario Simulator
**Purpose:** Prepare for crises before they happen through realistic simulations.

**User inputs:** Company name, industry, crisis scenario description, severity level, optional response plan for grading.

**6 quick-start scenarios:** Data Breach, Product Recall, Executive Scandal, Viral Social Backlash, Competitor Attack, Regulatory Action — each with severity classification.

**AI generates:**
- Scenario brief with timeline
- Likely press questions (with difficulty ratings: Hard/Medium/Easy)
- Social media timeline simulation
- Stakeholder impact assessment
- Recommended action plan (or grades the user's submitted plan)

---

#### 17. Meeting Prep Brief
**Purpose:** Prepare executives for journalist meetings with comprehensive intelligence briefs.

**User inputs:** Meeting type, journalist name, outlet, beat, topic, company name, optional recent articles by the journalist.

**5 meeting types:** Media Interview, Press Briefing, Press Conference, Podcast Appearance, Panel Discussion.

**AI generates:**
- Journalist profile (beat focus, writing style, recent themes)
- Outlet context (audience, editorial stance, reach)
- 10-15 likely questions with suggested answers and confidence levels
- Prioritized talking points with supporting evidence
- Topics to avoid (with suggested redirects)
- Anticipated competitor mentions with positioning responses
- 5-7 prepared sound bites (quotable phrases)
- Meeting logistics and follow-up strategy

---

### C. NON-AI TOOLS (8 Operational Features)

---

#### 18. Email Distribution
**Purpose:** Send press releases and media communications to targeted contact lists with engagement tracking.

**Features:**
- **History view:** All distributions with subject, recipient count, status, send date, open rate, and click rate
- **Compose:** Create new distributions with subject, content, recipient list, optional scheduling
- **Stats:** Total Sent (2), Avg Open Rate (58.8%), Avg Click Rate (16.4%), Total Recipients (105)

**Statuses:** Sent, Scheduled, Queued.

**Sample data:** "Series A Funding Announcement" — 45 recipients, 62.2% open rate, 18.5% click rate.

---

#### 19. Editorial Calendar
**Purpose:** Visual calendar for planning and tracking all PR activities and deadlines.

**Features:**
- **Monthly grid view** with color-coded events by type
- **Event type legend:** Press Release (indigo), Social Post (blue), Embargo (red), Event (amber), Deadline (purple), Meeting (green)
- **Upcoming events list** sorted chronologically
- **Create events** with title, description, type, dates, campaign association
- **Month/type filtering**

**Sample events:** "Series B Announcement Embargo Lifts" (Mar 10), "Product Launch Press Release" (Mar 15), "TechCrunch Disrupt" (Apr 1-3), "Q1 Coverage Report Deadline" (Mar 31).

---

#### 20. Embargo Manager
**Purpose:** Track press embargoes with lift dates, recipient management, and compliance monitoring.

**Features:**
- **Active/Lifted/All tabs** with status filtering
- **Embargo cards** showing title, associated press release, lift date and time with timezone, recipient list (email addresses), notes
- **Create embargoes** linked to press releases
- **Lift embargoes** with one click
- **Stats:** Active (2), Lifted (1), Violated (0), upcoming lift schedule

**Sample:** "Series B Funding Announcement" — lifts Mar 10 at 9:00 AM ET, 3 recipients (TechCrunch, The Verge, Reuters), note: "Exclusive first 2 hours to TechCrunch".

---

#### 21. Approval Workflow
**Purpose:** Route content through review and approval processes before publication.

**Features:**
- **Tabs:** Pending, Approved, Rejected, All — with status and priority filtering
- **Approval cards** showing item type (Press Release, Social Post, Crisis Response), title, content preview, requester, reviewers, priority (Low/Medium/High/Urgent), deadline
- **Approve/Reject actions** with reviewer comments
- **Auto-resolution logic:** If all reviewers approve, status changes to "approved"; any rejection changes to "rejected"
- **Stats:** Pending (2), Approved (1), Rejected (0), Urgent Pending count

**Item types:** Press Release, Social Post, Pitch, Campaign Task, Crisis Response.

---

#### 22. Media Clipbook
**Purpose:** Curate and compile media coverage collections for reporting and stakeholder presentations.

**Features:**
- **Clipbook list** with title, mention count, date range, completion status
- **Clipbook summaries:** Total mentions, total reach, sentiment breakdown (positive/neutral/negative), top outlets
- **Available mentions pool:** 5 media mentions with headline, source, sentiment, reach, date — select which ones to include
- **Create clipbooks** by selecting mentions and configuring settings
- **Export capability** for stakeholder reports

**Sample clipbooks:** "Q1 2026 Media Coverage Report" (23 mentions, 5.2M reach), "Product Launch Coverage Clips" (8 mentions, 2.1M reach).

---

#### 23. Contact Timeline
**Purpose:** Track every interaction with each media contact in a chronological timeline view.

**Features:**
- **Contact list sidebar** with name, outlet, interaction count, last contact date
- **Vertical timeline** for selected contact showing all interactions chronologically (newest first)
- **Interaction types:** Pitch Sent, Response Received, Meeting, Coverage, Follow-Up, Note — each with its own icon
- **Outcome tracking:** Positive, Accepted, Pending, No Response
- **Log new interactions** with notes and outcomes
- **Stats:** Total Interactions (8), Pitches Sent (3), Meetings Held (2), Coverage Secured (1)

**Sample timeline for Sarah Chen (TechCrunch):**
1. Coverage secured: "Rising AI Startups to Watch in 2026" (positive)
2. Meeting: CEO Demo & Interview, 45-min video call (positive)
3. Response received: Interested, requested demo (positive)
4. Pitch sent: AI PR Platform Exclusive, offered 48-hour exclusive (accepted)

---

#### 24. Analytics Dashboard
**Purpose:** Comprehensive PR performance metrics and ROI reporting.

**6 overview metrics:**
- Total Reach: 12.4M (+24%)
- Total Mentions: 156 (+18%)
- Media Value: $245K (+32%)
- Share of Voice: 18.3% (+5.2%)
- Sentiment Score: 78/100 (+3)
- Active Campaigns: 3

**Channel breakdown** (4 channels):
- Media Coverage: 45 mentions, 8.2M reach, 82 sentiment, top 5 outlets
- Social Media: 89 mentions, 3.1M reach, 75 sentiment, 4.2% engagement
- Blogs & Thought Leadership: 15 mentions, 720K reach
- Broadcast: 7 mentions, 350K reach

**Social platform analytics** (LinkedIn, X/Twitter, Instagram):
- Followers, growth rate, post count, impressions, engagements, engagement rate, top post, best posting time

**Campaign performance:**
- Per-campaign metrics: progress %, press releases, social posts, media mentions, reach, avg sentiment, ROI estimate (e.g., "Q2 Product Launch": 65% progress, 4.5M reach, 3.2x ROI)

**Trend data:** Weekly reach, mentions, and sentiment over 5 weeks.

---

#### 25. Notifications Center
**Purpose:** Centralized alert system for all platform events requiring attention.

**Notification types:**
- Crisis Alert (high severity)
- Approval Needed (medium severity)
- Media Mention (low severity)
- Campaign Milestone (low severity)
- Embargo Reminder (high severity)

**Features:**
- **All/Unread filter** with unread count badge
- **Notification cards** with type icon, severity indicator, title, message, timestamp, action URL
- **Mark as read** (individual or bulk)
- **Settings tab:** Configure notification channels (Email, Slack, In-App) per event type, Slack webhook integration

**Sample notifications:** "New Crisis Alert: Negative Press Coverage" (high, unread), "Embargo Lifts Tomorrow: Series B Announcement" (high, unread), "Approval Requested: Partnership Press Release" (medium, unread).

---

### D. SETTINGS

#### 26. Settings
**Purpose:** Account and platform configuration.

**7 sections:** Profile, Notifications, Brand Voice, Integrations, API Keys, Billing, Security.

**Billing tiers shown:** Free ($0/mo — 5 AI generations, 50 contacts, 1 campaign), Professional ($49/mo — unlimited AI, 1000 contacts, 10 campaigns, API access), Enterprise ($149/mo — everything plus team collaboration, custom AI training, priority support, SSO).

---

## Key Business Metrics & Market Position

| Metric | Value |
|--------|-------|
| Total API endpoints | 59 |
| AI-powered features | 12 (4 core + 8 specialized) |
| Operational tools | 8 |
| Total platform pages | 25 |
| Supported social platforms | 5 (LinkedIn, X/Twitter, Instagram, Facebook, TikTok) |
| Press release formats | 4 (traditional, multimedia, social, email) |
| Content repurpose targets | 8 formats |
| Crisis scenario templates | 6 |
| Campaign templates | 5 |
| Strategy templates | 5 |

## Competitive Positioning

Humanculus occupies the **mid-market gap** left by Prowly's exit (Dec 2025), priced to undercut enterprise incumbents (Meltwater at $8K+/yr, Cision at $15K+/yr) while offering capabilities they lack — specifically, agentic AI that autonomously executes PR workflows rather than just providing data.

**No fully agentic PR platform exists today.** This is the core market opportunity.
