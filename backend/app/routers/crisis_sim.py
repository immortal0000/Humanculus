from fastapi import APIRouter
from app.models.schemas import CrisisSimulationRequest
from app.services.ai_service import generate_completion

router = APIRouter()

CRISIS_SIM_SYSTEM_PROMPT = """You are a crisis communications simulator. Given a hypothetical crisis
scenario, simulate realistic media responses, social media backlash, and stakeholder reactions.
Then grade the company's response plan (if provided) or generate recommendations.

Simulation includes:
1. Simulated journalist questions (10 tough questions)
2. Social media reaction timeline (hour by hour for first 48 hours)
3. Stakeholder impact assessment (investors, customers, employees, partners)
4. Media narrative evolution (how the story develops over days)
5. Response plan grade (if provided) or recommended response plan

Return structured JSON with:
- scenario_brief: summary of the crisis scenario
- severity_assessment: detailed severity analysis
- simulated_questions: array of tough journalist questions with suggested answers
- social_timeline: hour-by-hour social media reaction simulation
- stakeholder_impact: impact on each stakeholder group
- narrative_evolution: how the story evolves over 7 days
- response_grade: grade (A-F) and detailed feedback on response plan (if provided)
- recommended_actions: prioritized list of immediate, short-term, and long-term actions
- key_messages: 3-5 approved messages for different audiences
- worst_case_scenario: what happens if response fails"""


@router.post("/simulate")
async def simulate_crisis(request: CrisisSimulationRequest):
    response_plan_section = ""
    if request.response_plan:
        response_plan_section = f"\nExisting Response Plan to Grade:\n{request.response_plan}"

    user_prompt = f"""Simulate a {request.severity} severity crisis scenario:

Company: {request.company_name}
Industry: {request.industry}
Scenario: {request.scenario}
{response_plan_section}

Generate a full crisis simulation including media questions, social media reactions,
stakeholder impact, and narrative evolution. {"Grade the provided response plan." if request.response_plan else "Recommend a response plan."}"""

    result = await generate_completion(CRISIS_SIM_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/scenarios")
async def list_scenario_templates():
    return {
        "scenarios": [
            {"id": "data-breach", "name": "Data Breach", "severity": "critical", "description": "Customer data exposed through security vulnerability"},
            {"id": "product-recall", "name": "Product Recall", "severity": "high", "description": "Safety issue requiring product recall or service disruption"},
            {"id": "executive-scandal", "name": "Executive Scandal", "severity": "high", "description": "Senior executive involved in controversy"},
            {"id": "viral-backlash", "name": "Viral Social Backlash", "severity": "medium", "description": "Marketing campaign or statement goes viral for wrong reasons"},
            {"id": "competitor-attack", "name": "Competitor Attack", "severity": "medium", "description": "Competitor publicly challenges claims or capabilities"},
            {"id": "regulatory-action", "name": "Regulatory Action", "severity": "high", "description": "Government investigation or regulatory penalty"},
        ]
    }
