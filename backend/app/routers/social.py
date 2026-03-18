from fastapi import APIRouter
from app.models.schemas import SocialContentRequest, SocialContentResponse
from app.services.ai_service import generate_completion

router = APIRouter()

SOCIAL_SYSTEM_PROMPT = """You are an expert social media content creator for PR professionals.
Generate platform-specific content optimized for each platform's best practices:

LinkedIn: Professional tone, longer form, industry insights, thought leadership
X/Twitter: Concise, punchy, conversation-starting, relevant hashtags (280 char limit)
Instagram: Visual-first, storytelling, lifestyle/brand feel, extensive hashtags
Facebook: Community-oriented, shareable, moderate length
TikTok: Trend-aware, casual, hook-driven, short-form video scripts

Support multiple content types:
- text: Standard text posts
- image: Text + AI image generation prompt
- video: Video script with scene descriptions
- carousel: Multi-slide content (LinkedIn/Instagram)
- story: Short-lived vertical content (Instagram/Facebook)

Always include relevant hashtags, optimal posting time suggestions, and engagement hooks."""


@router.post("/generate")
async def generate_social_content(request: SocialContentRequest):
    user_prompt = f"""Generate {request.content_type} social media content for these platforms: {', '.join(request.platforms)}

Topic: {request.topic}
Context: {request.context or 'None provided'}
Brand Voice: {request.brand_voice}

For each platform, provide:
1. Post text (platform-optimized)
2. Hashtags
3. Best posting time suggestion
4. {"AI image generation prompt" if request.content_type in ["image", "carousel"] else ""}
5. {"Video script with scenes" if request.content_type == "video" else ""}
6. Engagement prediction (estimated reach/engagement)

Return as structured JSON with a 'posts' array."""

    result = await generate_completion(SOCIAL_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/platforms")
async def list_platforms():
    return {
        "platforms": [
            {"id": "linkedin", "name": "LinkedIn", "max_chars": 3000, "best_times": ["Tue-Thu 8-10am", "Tue-Thu 12pm"]},
            {"id": "twitter", "name": "X / Twitter", "max_chars": 280, "best_times": ["Mon-Fri 9am", "Mon-Fri 12pm"]},
            {"id": "instagram", "name": "Instagram", "max_chars": 2200, "best_times": ["Mon-Fri 11am-1pm", "Tue-Fri 7pm"]},
            {"id": "facebook", "name": "Facebook", "max_chars": 63206, "best_times": ["Wed-Fri 1-4pm"]},
            {"id": "tiktok", "name": "TikTok", "max_chars": 2200, "best_times": ["Tue-Thu 2-5pm", "Fri 12pm"]},
        ]
    }
