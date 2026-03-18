from fastapi import APIRouter
from app.models.schemas import ContentRepurposeRequest
from app.services.ai_service import generate_completion

router = APIRouter()

REPURPOSE_SYSTEM_PROMPT = """You are an expert content strategist who repurposes content across formats.
Given source content, transform it into the requested target formats while maintaining
the core message and brand voice. Each format should be optimized for its medium:

- blog_post: 800-1200 words, SEO-optimized, with headers and conclusion
- email_newsletter: Scannable, with clear CTA, under 500 words
- talking_points: Bullet-point format, 10-15 key points for executives
- faq: 8-12 Q&A pairs covering likely audience questions
- investor_update: Professional, metrics-focused, forward-looking
- internal_memo: Clear, actionable, with next steps
- tweet_thread: 5-10 tweet thread with hooks and engagement drivers
- linkedin_article: Thought leadership format, 600-1000 words

Return structured JSON with a 'formats' array, each containing:
- format_type: the target format name
- title: appropriate title for this format
- content: the full repurposed content
- word_count: approximate word count
- optimization_notes: tips for publishing in this format"""


@router.post("/generate")
async def repurpose_content(request: ContentRepurposeRequest):
    user_prompt = f"""Repurpose the following {request.source_type} into these formats: {', '.join(request.target_formats)}

Brand Voice: {request.brand_voice}

Source Content:
{request.source_content}

Generate optimized content for each target format."""

    result = await generate_completion(REPURPOSE_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/formats")
async def list_target_formats():
    return {
        "formats": [
            {"id": "blog_post", "name": "Blog Post", "description": "SEO-optimized blog article"},
            {"id": "email_newsletter", "name": "Email Newsletter", "description": "Scannable email with CTA"},
            {"id": "talking_points", "name": "Talking Points", "description": "Executive bullet points"},
            {"id": "faq", "name": "FAQ", "description": "Question and answer pairs"},
            {"id": "investor_update", "name": "Investor Update", "description": "Metrics-focused update"},
            {"id": "internal_memo", "name": "Internal Memo", "description": "Actionable internal communication"},
            {"id": "tweet_thread", "name": "Tweet Thread", "description": "Multi-tweet thread"},
            {"id": "linkedin_article", "name": "LinkedIn Article", "description": "Thought leadership article"},
        ]
    }
