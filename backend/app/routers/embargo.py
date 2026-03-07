from fastapi import APIRouter
from app.models.schemas import EmbargoRequest

router = APIRouter()

_embargoes: list[dict] = [
    {
        "id": "emb-001",
        "title": "Series B Funding Announcement",
        "press_release_id": "pr-001",
        "lift_date": "2026-03-10",
        "lift_time": "09:00",
        "timezone": "US/Eastern",
        "recipients": ["sarah.chen@techcrunch.com", "marcus.r@theverge.com", "e.watson@reuters.com"],
        "status": "active",
        "notes": "Exclusive first 2 hours to TechCrunch",
        "created_at": "2026-02-28T14:00:00Z",
    },
    {
        "id": "emb-002",
        "title": "AI Product Feature Release",
        "press_release_id": "pr-002",
        "lift_date": "2026-03-20",
        "lift_time": "06:00",
        "timezone": "US/Pacific",
        "recipients": ["david.park@wired.com", "rachel.kim@forbes.com"],
        "status": "active",
        "notes": None,
        "created_at": "2026-03-01T10:00:00Z",
    },
    {
        "id": "emb-003",
        "title": "Q4 Revenue Results",
        "press_release_id": "pr-003",
        "lift_date": "2026-02-15",
        "lift_time": "09:00",
        "timezone": "US/Eastern",
        "recipients": ["tom.b@bloomberg.com", "e.watson@reuters.com"],
        "status": "lifted",
        "notes": "All recipients honored embargo",
        "created_at": "2026-02-01T09:00:00Z",
    },
]


@router.get("/list")
async def list_embargoes(status: str = None):
    filtered = _embargoes
    if status:
        filtered = [e for e in filtered if e["status"] == status]
    return {"embargoes": filtered}


@router.post("/create")
async def create_embargo(request: EmbargoRequest):
    embargo = {
        "id": f"emb-{len(_embargoes) + 1:03d}",
        "title": request.title,
        "press_release_id": request.press_release_id,
        "lift_date": request.lift_date,
        "lift_time": request.lift_time,
        "timezone": request.timezone,
        "recipients": request.recipients,
        "status": "active",
        "notes": request.notes,
        "created_at": "2026-03-06T12:00:00Z",
    }
    _embargoes.append(embargo)
    return {"status": "success", "data": embargo}


@router.post("/{embargo_id}/lift")
async def lift_embargo(embargo_id: str):
    embargo = next((e for e in _embargoes if e["id"] == embargo_id), None)
    if not embargo:
        return {"status": "error", "message": "Embargo not found"}
    embargo["status"] = "lifted"
    return {"status": "success", "data": embargo}


@router.get("/stats")
async def embargo_stats():
    return {
        "total_active": len([e for e in _embargoes if e["status"] == "active"]),
        "total_lifted": len([e for e in _embargoes if e["status"] == "lifted"]),
        "total_violated": len([e for e in _embargoes if e["status"] == "violated"]),
        "upcoming_lifts": [
            {"id": e["id"], "title": e["title"], "lift_date": e["lift_date"], "lift_time": e["lift_time"]}
            for e in _embargoes if e["status"] == "active"
        ],
    }
