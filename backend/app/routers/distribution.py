from fastapi import APIRouter
from app.models.schemas import DistributionRequest

router = APIRouter()

# In-memory store for demo purposes
_distributions: list[dict] = [
    {
        "id": "dist-001",
        "subject": "Series A Funding Announcement",
        "recipients_count": 45,
        "status": "sent",
        "sent_at": "2026-02-15T09:00:00Z",
        "open_rate": 62.2,
        "click_rate": 18.5,
    },
    {
        "id": "dist-002",
        "subject": "New Feature Launch Press Release",
        "recipients_count": 38,
        "status": "sent",
        "sent_at": "2026-02-28T10:00:00Z",
        "open_rate": 55.3,
        "click_rate": 14.2,
    },
    {
        "id": "dist-003",
        "subject": "Q1 Industry Report Embargo",
        "recipients_count": 22,
        "status": "scheduled",
        "send_at": "2026-03-15T09:00:00Z",
        "open_rate": None,
        "click_rate": None,
    },
]


@router.post("/send")
async def send_distribution(request: DistributionRequest):
    dist = {
        "id": f"dist-{len(_distributions) + 1:03d}",
        "subject": request.subject,
        "recipients_count": len(request.recipients),
        "status": "scheduled" if request.send_at else "queued",
        "send_at": request.send_at,
        "open_rate": None,
        "click_rate": None,
    }
    _distributions.append(dist)
    return {"status": "success", "data": dist}


@router.get("/history")
async def list_distributions():
    return {"distributions": _distributions}


@router.get("/stats")
async def distribution_stats():
    sent = [d for d in _distributions if d["status"] == "sent"]
    return {
        "total_sent": len(sent),
        "total_scheduled": len([d for d in _distributions if d["status"] == "scheduled"]),
        "avg_open_rate": round(sum(d["open_rate"] for d in sent if d["open_rate"]) / max(len(sent), 1), 1),
        "avg_click_rate": round(sum(d["click_rate"] for d in sent if d["click_rate"]) / max(len(sent), 1), 1),
        "total_recipients": sum(d["recipients_count"] for d in _distributions),
    }
