from fastapi import APIRouter
from app.models.schemas import ClipbookRequest

router = APIRouter()

_clipbooks: list[dict] = [
    {
        "id": "clip-001",
        "title": "Q1 2026 Media Coverage Report",
        "mention_count": 23,
        "date_range": "2026-01-01 to 2026-03-31",
        "status": "completed",
        "created_at": "2026-03-01T10:00:00Z",
        "summary": {
            "total_mentions": 23,
            "total_reach": "5.2M",
            "sentiment_breakdown": {"positive": 15, "neutral": 6, "negative": 2},
            "top_outlets": ["TechCrunch", "The Verge", "Forbes"],
        },
    },
    {
        "id": "clip-002",
        "title": "Product Launch Coverage Clips",
        "mention_count": 8,
        "date_range": "2026-02-15 to 2026-02-28",
        "status": "completed",
        "created_at": "2026-02-28T15:00:00Z",
        "summary": {
            "total_mentions": 8,
            "total_reach": "2.1M",
            "sentiment_breakdown": {"positive": 6, "neutral": 2, "negative": 0},
            "top_outlets": ["TechCrunch", "Wired", "VentureBeat"],
        },
    },
]

_mentions_db: list[dict] = [
    {"id": "m-001", "headline": "Rising AI Startups to Watch in 2026", "source": "TechCrunch", "sentiment": "positive", "reach": "1.2M", "date": "2026-03-01"},
    {"id": "m-002", "headline": "Thread on AI PR tools", "source": "X/Twitter", "sentiment": "positive", "reach": "850K", "date": "2026-03-02"},
    {"id": "m-003", "headline": "PR Industry Embraces AI", "source": "PR Week", "sentiment": "neutral", "reach": "340K", "date": "2026-02-28"},
    {"id": "m-004", "headline": "Why Agentic AI Is Overhyped", "source": "Medium", "sentiment": "negative", "reach": "120K", "date": "2026-02-25"},
    {"id": "m-005", "headline": "AI PR Tools Comparison", "source": "LinkedIn", "sentiment": "positive", "reach": "920K", "date": "2026-03-03"},
]


@router.post("/create")
async def create_clipbook(request: ClipbookRequest):
    selected_mentions = [m for m in _mentions_db if m["id"] in request.mention_ids]
    clipbook = {
        "id": f"clip-{len(_clipbooks) + 1:03d}",
        "title": request.title,
        "mention_count": len(selected_mentions),
        "date_range": request.date_range,
        "status": "completed",
        "created_at": "2026-03-06T12:00:00Z",
        "summary": {
            "total_mentions": len(selected_mentions),
            "total_reach": f"{sum(float(m['reach'].replace('M', '000000').replace('K', '000')) for m in selected_mentions) / 1000000:.1f}M",
            "sentiment_breakdown": {
                "positive": len([m for m in selected_mentions if m["sentiment"] == "positive"]),
                "neutral": len([m for m in selected_mentions if m["sentiment"] == "neutral"]),
                "negative": len([m for m in selected_mentions if m["sentiment"] == "negative"]),
            },
            "top_outlets": list(set(m["source"] for m in selected_mentions))[:5],
        },
        "mentions": selected_mentions,
    }
    _clipbooks.append(clipbook)
    return {"status": "success", "data": clipbook}


@router.get("/list")
async def list_clipbooks():
    return {"clipbooks": _clipbooks}


@router.get("/mentions")
async def list_available_mentions():
    return {"mentions": _mentions_db}


@router.get("/{clipbook_id}")
async def get_clipbook(clipbook_id: str):
    clipbook = next((c for c in _clipbooks if c["id"] == clipbook_id), None)
    if not clipbook:
        return {"status": "error", "message": "Clipbook not found"}
    return {"status": "success", "data": clipbook}
