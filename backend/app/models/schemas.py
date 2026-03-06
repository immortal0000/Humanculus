from pydantic import BaseModel
from typing import Optional


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
