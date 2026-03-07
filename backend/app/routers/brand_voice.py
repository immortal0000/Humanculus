from fastapi import APIRouter
from app.models.schemas import BrandVoiceAnalyzeRequest
from app.services.ai_service import generate_completion

router = APIRouter()

BRAND_VOICE_SYSTEM_PROMPT = """You are a brand voice analyst. Analyze provided content samples
to extract a comprehensive brand voice profile. Your analysis should identify:

1. Tone characteristics (formal/informal, authoritative/approachable, etc.)
2. Vocabulary patterns (technical level, jargon usage, power words)
3. Sentence structure (average length, complexity, use of active/passive voice)
4. Emotional register (emotional/rational, optimistic/cautious)
5. Unique phrases or recurring themes
6. Recommended "do's and don'ts" for content creators

Return structured JSON with:
- tone_profile: object with primary_tone, secondary_tone, formality_level (1-10)
- vocabulary: object with technical_level, common_words, banned_words, power_words
- sentence_style: object with avg_length, complexity, voice_preference
- emotional_register: object with primary_emotion, optimism_level (1-10), humor_level (1-10)
- brand_personality: list of 5 personality traits
- writing_guidelines: list of do's and don'ts
- sample_phrases: list of on-brand example phrases
- overall_score: consistency score (1-100)"""


@router.post("/analyze")
async def analyze_brand_voice(request: BrandVoiceAnalyzeRequest):
    samples_text = "\n\n---\n\n".join(
        f"Sample {i+1}:\n{sample}" for i, sample in enumerate(request.content_samples)
    )
    user_prompt = f"""Analyze the brand voice for {request.company_name} based on these content samples:

{samples_text}

Extract a comprehensive brand voice profile including tone, vocabulary patterns,
sentence structure, emotional register, and writing guidelines."""

    result = await generate_completion(BRAND_VOICE_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}


@router.get("/presets")
async def list_voice_presets():
    return {
        "presets": [
            {"id": "professional", "name": "Professional", "description": "Formal, authoritative, third-person"},
            {"id": "conversational", "name": "Conversational", "description": "Warm, approachable, second-person"},
            {"id": "innovative", "name": "Innovative", "description": "Forward-looking, disruptive, energetic"},
            {"id": "authoritative", "name": "Authoritative", "description": "Data-driven, expert positioning"},
            {"id": "empathetic", "name": "Empathetic", "description": "Human-centered, understanding, supportive"},
        ]
    }
