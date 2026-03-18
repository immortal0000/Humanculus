from pydantic import BaseModel
from typing import Optional, Literal


class StrategyBrief(BaseModel):
    company_name: str
    objective: str
    context: str
    timeline: Optional[str] = None
    budget: Optional[str] = None
    constraints: Optional[str] = None


class StrategyResponse(BaseModel):
    audiences: list[dict]
    swot: dict
    key_messages: list[str]
    channel_strategy: list[dict]
    timeline: list[dict]
    executive_summary: str


class PressReleaseRequest(BaseModel):
    headline: str
    subheadline: Optional[str] = None
    announcement: str
    quotes: Optional[str] = None
    boilerplate: Optional[str] = None
    brand_voice: str = "professional"
    format: str = "traditional"


class PressReleaseResponse(BaseModel):
    content: str
    word_count: int
    social_snippets: Optional[list[dict]] = None


class SocialContentRequest(BaseModel):
    topic: str
    context: Optional[str] = None
    platforms: list[str]
    content_type: str = "text"
    brand_voice: str = "professional"


class SocialContentResponse(BaseModel):
    posts: list[dict]


class CampaignRequest(BaseModel):
    name: str
    objective: str
    target_audience: str
    start_date: str
    end_date: str
    budget: Optional[str] = None


class CampaignPlanResponse(BaseModel):
    strategy: str
    milestones: list[dict]
    tasks: list[dict]
    content_plan: list[dict]
    kpis: list[dict]
    budget_allocation: list[dict]


# --- AI Tool Schemas ---

class PitchRequest(BaseModel):
    journalist_name: str
    outlet: str
    beat: str
    story_angle: str
    company_name: str
    key_points: list[str]
    tone: str = "professional"
    previous_coverage: Optional[str] = None


class BrandVoiceAnalyzeRequest(BaseModel):
    content_samples: list[str]
    company_name: str


class ContentRepurposeRequest(BaseModel):
    source_content: str
    source_type: Literal["press_release", "blog_post", "social_post", "speech", "report"]
    target_formats: list[str]
    brand_voice: str = "professional"


class SentimentExplainRequest(BaseModel):
    mention_text: str
    source: str
    headline: str
    sentiment: Literal["positive", "negative", "neutral"]


class HeadlineGenerateRequest(BaseModel):
    content: str
    goal: Literal["click_through", "seo", "shareability", "authority", "general"] = "general"
    count: int = 5


class CompetitiveAnalysisRequest(BaseModel):
    company_name: str
    competitors: list[str]
    focus_areas: list[str] = ["press_releases", "media_coverage", "social_strategy"]


class CrisisSimulationRequest(BaseModel):
    scenario: str
    company_name: str
    industry: str
    severity: Literal["low", "medium", "high", "critical"] = "high"
    response_plan: Optional[str] = None


class MeetingPrepRequest(BaseModel):
    journalist_name: str
    outlet: str
    beat: str
    meeting_type: Literal["interview", "briefing", "press_conference", "podcast", "panel"] = "interview"
    topic: str
    company_name: str
    recent_articles: Optional[list[str]] = None


# --- Non-AI Tool Schemas ---

class DistributionRequest(BaseModel):
    subject: str
    content: str
    recipients: list[str]
    send_at: Optional[str] = None
    press_release_id: Optional[str] = None


class CalendarEvent(BaseModel):
    title: str
    description: Optional[str] = None
    event_type: Literal["press_release", "social_post", "embargo", "event", "deadline", "meeting"]
    start_date: str
    end_date: Optional[str] = None
    campaign_id: Optional[str] = None
    status: str = "scheduled"


class EmbargoRequest(BaseModel):
    title: str
    press_release_id: Optional[str] = None
    lift_date: str
    lift_time: str = "09:00"
    timezone: str = "US/Eastern"
    recipients: list[str] = []
    notes: Optional[str] = None


class ApprovalRequest(BaseModel):
    item_type: Literal["press_release", "social_post", "pitch", "campaign_task", "crisis_response"]
    item_id: str
    title: str
    content_preview: str
    requested_by: str
    reviewers: list[str]
    priority: Literal["low", "medium", "high", "urgent"] = "medium"
    deadline: Optional[str] = None


class ApprovalDecision(BaseModel):
    decision: Literal["approved", "rejected", "revision_requested"]
    reviewer: str
    comments: Optional[str] = None


class ClipbookRequest(BaseModel):
    title: str
    mention_ids: list[str]
    include_summary: bool = True
    include_charts: bool = True
    date_range: Optional[str] = None


class ContactInteraction(BaseModel):
    contact_id: str
    interaction_type: Literal["pitch_sent", "response_received", "meeting", "coverage", "follow_up", "note"]
    subject: str
    notes: Optional[str] = None
    outcome: Optional[str] = None
    date: Optional[str] = None


class NotificationConfig(BaseModel):
    channel: Literal["email", "slack", "in_app"]
    webhook_url: Optional[str] = None
    events: list[str] = ["crisis_alert", "mention", "approval_needed", "campaign_milestone"]
