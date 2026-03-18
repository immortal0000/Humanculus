from fastapi import APIRouter
from app.models.schemas import SentimentExplainRequest
from app.services.ai_service import generate_completion

router = APIRouter()

SENTIMENT_SYSTEM_PROMPT = """You are a media sentiment analyst. Given a brand mention with its
sentiment classification, provide a detailed explanation of:

1. What specific language or framing drives the sentiment
2. The narrative being formed and its potential trajectory
3. Key quotes or phrases that shape perception
4. Audience likely reaction and amplification risk
5. Recommended response strategy

Return structured JSON with:
- sentiment_drivers: list of specific phrases/elements driving the sentiment
- narrative_analysis: the broader story being told
- risk_level: low/medium/high/critical
- trajectory: whether sentiment is likely to improve, worsen, or stabilize
- audience_impact: estimated reach and amplification potential
- recommended_response: specific response strategy
- response_urgency: immediate/within_24h/within_week/monitor_only
- talking_points: 3-5 prepared statements if response is needed"""


@router.post("/explain")
async def explain_sentiment(request: SentimentExplainRequest):
    user_prompt = f"""Analyze this {request.sentiment} media mention and explain the sentiment drivers:

Source: {request.source}
Headline: {request.headline}

Full Text:
{request.mention_text}

Explain what's driving the {request.sentiment} sentiment, assess the risk,
and recommend a response strategy."""

    result = await generate_completion(SENTIMENT_SYSTEM_PROMPT, user_prompt)
    return {"status": "success", "data": result}
