from fastapi import APIRouter
from app.models.schemas import CompetitiveAnalysisRequest
from app.services.ai_service import generate_completion

router = APIRouter()

COMPETITIVE_SYSTEM_PROMPT = """You are a competitive intelligence analyst for PR professionals.
Analyze competitors' public-facing PR activities and provide actionable insights:

1. Recent PR activity summary (press releases, announcements, media coverage themes)
2. Messaging strategy analysis (key narratives, positioning, tone)
3. Media presence assessment (outlets covered, journalist relationships, coverage frequency)
4. Social media strategy (platforms, content types, engagement patterns)
5. Strengths and gaps in their PR approach
6. Opportunities for differentiation

Return structured JSON with:
- competitors: array of competitor analyses, each with:
  - name: competitor name
  - pr_activity_summary: recent PR moves
  - key_narratives: their main messaging themes
  - media_presence: coverage assessment
  - social_strategy: social media approach
  - strengths: what they do well
  - weaknesses: gaps in their approach
- opportunities: list of differentiation opportunities
- threats: competitive threats to watch
- recommended_positioning: how to position against these competitors
- action_items: specific tactical recommendations"""


@router.post("/analyze")
async def analyze_competitors(request: CompetitiveAnalysisRequest):
    user_prompt = f"""Conduct a competitive PR analysis for {request.company_name}:

Competitors: {', '.join(request.competitors)}
Focus Areas: {', '.join(request.focus_areas)}

Analyze each competitor's PR strategy, identify gaps,
and recommend differentiation opportunities."""

    result = await generate_completion(COMPETITIVE_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}
