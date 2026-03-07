from fastapi import APIRouter
from app.models.schemas import PitchRequest
from app.services.ai_service import generate_completion

router = APIRouter()

PITCH_SYSTEM_PROMPT = """You are an expert PR professional who crafts personalized media pitches.
Generate compelling, concise pitch emails tailored to specific journalists based on their beat,
outlet, and past coverage. The pitch should:

1. Open with a personalized hook referencing the journalist's work
2. Present the story angle clearly in 2-3 sentences
3. Include 3-4 bullet points of key facts/data
4. End with a clear call-to-action (interview, demo, exclusive, etc.)
5. Maintain the specified tone throughout
6. Be under 300 words (journalists ignore long pitches)

Return structured JSON with:
- subject_line: compelling email subject (under 60 chars)
- greeting: personalized opening
- body: the pitch body with paragraphs
- call_to_action: specific next step
- follow_up_timing: suggested follow-up date/timing
- personalization_notes: why this pitch is relevant to this journalist"""


@router.post("/generate")
async def generate_pitch(request: PitchRequest):
    user_prompt = f"""Generate a personalized media pitch email:

Journalist: {request.journalist_name}
Outlet: {request.outlet}
Beat: {request.beat}
Previous Coverage: {request.previous_coverage or 'Not available'}

Story Angle: {request.story_angle}
Company: {request.company_name}
Key Points:
{chr(10).join(f'- {point}' for point in request.key_points)}

Tone: {request.tone}

Create a compelling, concise pitch email tailored to this journalist's interests."""

    result = await generate_completion(PITCH_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/templates")
async def list_pitch_templates():
    return {
        "templates": [
            {"id": "exclusive", "name": "Exclusive Offer", "description": "Offer an exclusive story to a single journalist"},
            {"id": "embargo", "name": "Embargo Pitch", "description": "Pitch with embargoed information and lift date"},
            {"id": "data-story", "name": "Data Story", "description": "Pitch built around compelling data or research"},
            {"id": "trend-piece", "name": "Trend Piece", "description": "Position company within a larger industry trend"},
            {"id": "expert-source", "name": "Expert Source", "description": "Offer executive as expert source for ongoing stories"},
        ]
    }
