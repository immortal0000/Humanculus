from fastapi import APIRouter
from app.models.schemas import HeadlineGenerateRequest
from app.services.ai_service import generate_completion

router = APIRouter()

HEADLINE_SYSTEM_PROMPT = """You are a headline optimization expert. Generate multiple headline variants
optimized for different goals. For each headline, provide:

1. The headline text
2. Character count
3. Optimization score (1-100) for the specified goal
4. Rationale for why this headline works
5. Emotional appeal type (curiosity, urgency, authority, surprise, etc.)

Goals and their optimization criteria:
- click_through: curiosity gap, emotional triggers, power words
- seo: keyword placement, search intent matching, optimal length (50-60 chars)
- shareability: social proof, controversy, relatability, quotability
- authority: data-driven, expert positioning, credibility signals
- general: balanced across all criteria

Return structured JSON with:
- headlines: array of headline objects with text, char_count, score, rationale, emotional_appeal
- best_pick: index of the recommended headline
- a_b_test_pairs: suggested pairs for A/B testing"""


@router.post("/generate")
async def generate_headlines(request: HeadlineGenerateRequest):
    user_prompt = f"""Generate {request.count} headline variants optimized for: {request.goal}

Content to headline:
{request.content}

Create diverse headline approaches including different emotional appeals,
structures (questions, lists, how-to, data-driven), and lengths."""

    result = await generate_completion(HEADLINE_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}
