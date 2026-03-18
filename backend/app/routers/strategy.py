from fastapi import APIRouter
from app.models.schemas import StrategyBrief, StrategyResponse
from app.services.ai_service import generate_completion

router = APIRouter()

STRATEGY_SYSTEM_PROMPT = """You are an expert PR strategist AI. Given a project brief, generate a comprehensive
communication strategy. Return a structured JSON response with:
- audiences: list of target audience personas with name, description, demographics, and preferred channels
- swot: object with strengths, weaknesses, opportunities, threats (each a list of strings)
- key_messages: list of 3-5 key messages (primary, supporting, proof points)
- channel_strategy: list of channels with name, tactics, and priority
- timeline: list of phases with name, duration, and key activities
- executive_summary: 2-3 paragraph overview of the strategy

Guide the user step by step through each section, providing AI-generated recommendations
they can review and customize."""


@router.post("/generate")
async def generate_strategy(brief: StrategyBrief):
    user_prompt = f"""Generate a PR communication strategy for:

Company: {brief.company_name}
Objective: {brief.objective}
Context: {brief.context}
Timeline: {brief.timeline or 'Not specified'}
Budget: {brief.budget or 'Not specified'}
Constraints: {brief.constraints or 'None'}

Include audience personas, SWOT analysis, competitive positioning, key messages,
channel recommendations, and a phased timeline. Return as structured JSON."""

    result = await generate_completion(STRATEGY_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/templates")
async def list_templates():
    return {
        "templates": [
            {"id": "product-launch", "name": "Product Launch", "description": "Strategy for launching a new product or feature"},
            {"id": "crisis-response", "name": "Crisis Response", "description": "Rapid crisis communication strategy"},
            {"id": "thought-leadership", "name": "Thought Leadership", "description": "Position executives as industry thought leaders"},
            {"id": "brand-awareness", "name": "Brand Awareness", "description": "Build brand recognition in target markets"},
            {"id": "event-coverage", "name": "Event/Conference", "description": "Maximize coverage around events and conferences"},
        ]
    }
