from fastapi import APIRouter
from app.models.schemas import CampaignRequest, CampaignPlanResponse
from app.services.ai_service import generate_completion

router = APIRouter()

CAMPAIGN_SYSTEM_PROMPT = """You are an expert PR campaign planner. Given campaign parameters,
generate a comprehensive campaign plan that includes:

1. Strategy overview with clear objectives and success criteria
2. Milestones with dates and deliverables
3. Detailed task breakdown with assignments, deadlines, and dependencies
4. Content plan (press releases, social posts, blog articles, media pitches)
5. KPIs and success metrics with targets
6. Budget allocation recommendations across activities

Support the full campaign lifecycle: planning, execution, monitoring, and reporting.
Include approval workflow checkpoints where human review is needed (agentic + human-in-the-loop).
Generate actionable, specific tasks rather than generic recommendations."""


@router.post("/generate-plan")
async def generate_campaign_plan(request: CampaignRequest):
    user_prompt = f"""Generate a detailed PR campaign plan:

Campaign Name: {request.name}
Objective: {request.objective}
Target Audience: {request.target_audience}
Duration: {request.start_date} to {request.end_date}
Budget: {request.budget or 'Not specified'}

Create a structured plan with:
1. Campaign strategy and phased approach
2. Key milestones and deadlines
3. Detailed task list with priorities (high/medium/low)
4. Content calendar with specific deliverables
5. KPIs with target numbers
6. Budget breakdown by category

Include human-in-the-loop approval checkpoints for key deliverables.
Return as structured JSON."""

    result = await generate_completion(CAMPAIGN_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/templates")
async def list_campaign_templates():
    return {
        "templates": [
            {"id": "product-launch", "name": "Product Launch", "duration": "3 months", "tasks": 25},
            {"id": "brand-awareness", "name": "Brand Awareness", "duration": "6 months", "tasks": 35},
            {"id": "event-coverage", "name": "Event Coverage", "duration": "2 weeks", "tasks": 15},
            {"id": "crisis-response", "name": "Crisis Response", "duration": "1 week", "tasks": 20},
            {"id": "thought-leadership", "name": "Thought Leadership", "duration": "ongoing", "tasks": 30},
        ]
    }
