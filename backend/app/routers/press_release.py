from fastapi import APIRouter
from app.models.schemas import PressReleaseRequest, PressReleaseResponse
from app.services.ai_service import generate_completion

router = APIRouter()

PRESS_RELEASE_SYSTEM_PROMPT = """You are an expert PR writer. Generate professional press releases
that follow industry best practices. Support three formats:
- traditional: Standard wire-format press release with dateline, body, boilerplate, contact
- multimedia: Traditional format plus suggested multimedia assets (images, videos, infographics)
- social: Condensed version optimized for social sharing with platform-specific snippets

Always maintain the specified brand voice. Enforce proper structure:
headline, subheadline, dateline, lead paragraph, body, quotes, boilerplate, contact info.

When brand voice is specified, adapt tone accordingly:
- professional: Formal, authoritative, third-person
- conversational: Warm, approachable, engaging
- authoritative: Data-driven, expert positioning
- innovative: Forward-looking, disruptive language"""


@router.post("/generate")
async def generate_press_release(request: PressReleaseRequest):
    user_prompt = f"""Generate a {request.format} format press release:

Headline: {request.headline}
Subheadline: {request.subheadline or 'Auto-generate'}
Announcement: {request.announcement}
Quotes: {request.quotes or 'Generate appropriate executive quotes'}
Company Boilerplate: {request.boilerplate or 'Generate a standard boilerplate'}
Brand Voice: {request.brand_voice}

{"Also generate social media snippets for LinkedIn, X/Twitter, and Instagram." if request.format == "social" else ""}
{"Also suggest multimedia assets (hero image, infographic, video concepts)." if request.format == "multimedia" else ""}"""

    result = await generate_completion(PRESS_RELEASE_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/formats")
async def list_formats():
    return {
        "formats": [
            {"id": "traditional", "name": "Traditional", "description": "Standard wire-format press release"},
            {"id": "multimedia", "name": "Multimedia", "description": "Press release with suggested multimedia assets"},
            {"id": "social", "name": "Social-Optimized", "description": "Condensed version with social media snippets"},
        ]
    }
