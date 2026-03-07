from fastapi import APIRouter
from app.models.schemas import CalendarEvent

router = APIRouter()

# In-memory store for demo purposes
_events: list[dict] = [
    {
        "id": "evt-001",
        "title": "Series B Announcement Embargo Lifts",
        "description": "Embargo lifts at 9:00 AM ET",
        "event_type": "embargo",
        "start_date": "2026-03-10",
        "end_date": None,
        "campaign_id": "camp-001",
        "status": "scheduled",
    },
    {
        "id": "evt-002",
        "title": "Product Launch Press Release",
        "description": "Final press release for Q2 product launch",
        "event_type": "press_release",
        "start_date": "2026-03-15",
        "end_date": None,
        "campaign_id": "camp-001",
        "status": "scheduled",
    },
    {
        "id": "evt-003",
        "title": "LinkedIn Campaign - Thought Leadership Series",
        "description": "Weekly LinkedIn posts for 4 weeks",
        "event_type": "social_post",
        "start_date": "2026-03-17",
        "end_date": "2026-04-14",
        "campaign_id": "camp-002",
        "status": "scheduled",
    },
    {
        "id": "evt-004",
        "title": "TechCrunch Disrupt",
        "description": "Booth and media meetings at TC Disrupt",
        "event_type": "event",
        "start_date": "2026-04-01",
        "end_date": "2026-04-03",
        "campaign_id": None,
        "status": "scheduled",
    },
    {
        "id": "evt-005",
        "title": "Q1 Coverage Report Deadline",
        "description": "Compile Q1 media coverage report for board",
        "event_type": "deadline",
        "start_date": "2026-03-31",
        "end_date": None,
        "campaign_id": None,
        "status": "pending",
    },
    {
        "id": "evt-006",
        "title": "Interview with Sarah Chen - TechCrunch",
        "description": "CEO interview about AI strategy",
        "event_type": "meeting",
        "start_date": "2026-03-12",
        "end_date": None,
        "campaign_id": "camp-001",
        "status": "confirmed",
    },
]


@router.get("/events")
async def list_events(month: str = None, event_type: str = None):
    filtered = _events
    if month:
        filtered = [e for e in filtered if e["start_date"].startswith(month)]
    if event_type:
        filtered = [e for e in filtered if e["event_type"] == event_type]
    return {"events": filtered}


@router.post("/events")
async def create_event(event: CalendarEvent):
    new_event = {
        "id": f"evt-{len(_events) + 1:03d}",
        **event.model_dump(),
    }
    _events.append(new_event)
    return {"status": "success", "data": new_event}


@router.get("/events/{event_id}")
async def get_event(event_id: str):
    event = next((e for e in _events if e["id"] == event_id), None)
    if not event:
        return {"status": "error", "message": "Event not found"}
    return {"status": "success", "data": event}


@router.get("/upcoming")
async def upcoming_events():
    return {"events": sorted(_events, key=lambda e: e["start_date"])[:10]}


@router.get("/event-types")
async def list_event_types():
    return {
        "event_types": [
            {"id": "press_release", "name": "Press Release", "color": "#6366f1"},
            {"id": "social_post", "name": "Social Post", "color": "#3b82f6"},
            {"id": "embargo", "name": "Embargo", "color": "#ef4444"},
            {"id": "event", "name": "Event", "color": "#f59e0b"},
            {"id": "deadline", "name": "Deadline", "color": "#8b5cf6"},
            {"id": "meeting", "name": "Meeting", "color": "#10b981"},
        ]
    }
