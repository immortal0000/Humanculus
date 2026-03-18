from fastapi import APIRouter
from app.models.schemas import MeetingPrepRequest
from app.services.ai_service import generate_completion

router = APIRouter()

MEETING_PREP_SYSTEM_PROMPT = """You are a media relations expert preparing executives for journalist meetings.
Generate a comprehensive preparation brief that includes:

1. Journalist profile summary (beat focus, writing style, recent themes)
2. Likely questions (10-15) based on the journalist's interests and current news
3. Key talking points with supporting data
4. Topics to avoid or handle carefully
5. Competitor mentions to anticipate
6. Sound bites - quotable phrases prepared in advance
7. Background context on the outlet's audience and editorial stance

Return structured JSON with:
- journalist_profile: summary of the journalist's focus and style
- outlet_context: audience, editorial stance, reach
- likely_questions: array of questions with suggested answers and confidence level
- talking_points: prioritized list with supporting evidence
- avoid_topics: list of topics to deflect or handle carefully with suggested redirects
- competitor_references: anticipated competitor mentions with positioning responses
- sound_bites: 5-7 quotable phrases ready for use
- meeting_logistics: suggested duration, format tips, follow-up strategy
- preparation_checklist: what to prepare before the meeting"""


@router.post("/generate")
async def generate_meeting_prep(request: MeetingPrepRequest):
    articles_section = ""
    if request.recent_articles:
        articles_section = f"\nRecent Articles by this Journalist:\n" + "\n".join(
            f"- {article}" for article in request.recent_articles
        )

    user_prompt = f"""Generate a meeting preparation brief:

Meeting Type: {request.meeting_type}
Journalist: {request.journalist_name}
Outlet: {request.outlet}
Beat: {request.beat}
Topic: {request.topic}
Company: {request.company_name}
{articles_section}

Create a comprehensive prep brief including likely questions, talking points,
topics to avoid, and prepared sound bites."""

    result = await generate_completion(MEETING_PREP_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/meeting-types")
async def list_meeting_types():
    return {
        "meeting_types": [
            {"id": "interview", "name": "Media Interview", "description": "One-on-one journalist interview"},
            {"id": "briefing", "name": "Press Briefing", "description": "Background or on-the-record briefing"},
            {"id": "press_conference", "name": "Press Conference", "description": "Multi-journalist press event"},
            {"id": "podcast", "name": "Podcast Appearance", "description": "Podcast or audio interview"},
            {"id": "panel", "name": "Panel Discussion", "description": "Multi-speaker industry panel"},
        ]
    }
