from fastapi import APIRouter
from app.models.schemas import ContactInteraction

router = APIRouter()

_interactions: list[dict] = [
    {
        "id": "int-001",
        "contact_id": "c-001",
        "contact_name": "Sarah Chen",
        "interaction_type": "pitch_sent",
        "subject": "AI PR Platform Exclusive",
        "notes": "Offered 48-hour exclusive ahead of launch",
        "outcome": "accepted",
        "date": "2026-02-10",
    },
    {
        "id": "int-002",
        "contact_id": "c-001",
        "contact_name": "Sarah Chen",
        "interaction_type": "response_received",
        "subject": "Re: AI PR Platform Exclusive",
        "notes": "Interested, requested demo and interview with CEO",
        "outcome": "positive",
        "date": "2026-02-11",
    },
    {
        "id": "int-003",
        "contact_id": "c-001",
        "contact_name": "Sarah Chen",
        "interaction_type": "meeting",
        "subject": "CEO Demo & Interview",
        "notes": "45-min video call, very engaged, asked about pricing and competitors",
        "outcome": "positive",
        "date": "2026-02-14",
    },
    {
        "id": "int-004",
        "contact_id": "c-001",
        "contact_name": "Sarah Chen",
        "interaction_type": "coverage",
        "subject": "Rising AI Startups to Watch in 2026",
        "notes": "Featured as #3 on the list with positive framing",
        "outcome": "positive",
        "date": "2026-03-01",
    },
    {
        "id": "int-005",
        "contact_id": "c-002",
        "contact_name": "Marcus Rivera",
        "interaction_type": "pitch_sent",
        "subject": "New Dashboard Feature Story",
        "notes": "Pitched product update angle",
        "outcome": "no_response",
        "date": "2026-02-20",
    },
    {
        "id": "int-006",
        "contact_id": "c-002",
        "contact_name": "Marcus Rivera",
        "interaction_type": "follow_up",
        "subject": "Re: New Dashboard Feature Story",
        "notes": "Follow-up with additional data points",
        "outcome": "pending",
        "date": "2026-02-27",
    },
    {
        "id": "int-007",
        "contact_id": "c-003",
        "contact_name": "Emily Watson",
        "interaction_type": "meeting",
        "subject": "Background Briefing on AI in Enterprise",
        "notes": "Off-the-record background session on enterprise AI trends",
        "outcome": "positive",
        "date": "2026-01-15",
    },
    {
        "id": "int-008",
        "contact_id": "c-004",
        "contact_name": "David Park",
        "interaction_type": "pitch_sent",
        "subject": "Exclusive Data: AI PR Market Size",
        "notes": "Offered exclusive market research data",
        "outcome": "accepted",
        "date": "2026-03-01",
    },
]


@router.get("/contacts/{contact_id}")
async def get_contact_timeline(contact_id: str):
    interactions = [i for i in _interactions if i["contact_id"] == contact_id]
    return {
        "contact_id": contact_id,
        "interactions": sorted(interactions, key=lambda x: x["date"], reverse=True),
        "total_interactions": len(interactions),
        "last_interaction": interactions[-1]["date"] if interactions else None,
    }


@router.post("/interactions")
async def add_interaction(interaction: ContactInteraction):
    new_interaction = {
        "id": f"int-{len(_interactions) + 1:03d}",
        **interaction.model_dump(),
        "contact_name": f"Contact {interaction.contact_id}",
    }
    _interactions.append(new_interaction)
    return {"status": "success", "data": new_interaction}


@router.get("/recent")
async def recent_interactions(limit: int = 10):
    sorted_interactions = sorted(_interactions, key=lambda x: x["date"], reverse=True)
    return {"interactions": sorted_interactions[:limit]}


@router.get("/stats")
async def interaction_stats():
    return {
        "total_interactions": len(_interactions),
        "pitches_sent": len([i for i in _interactions if i["interaction_type"] == "pitch_sent"]),
        "meetings_held": len([i for i in _interactions if i["interaction_type"] == "meeting"]),
        "coverage_secured": len([i for i in _interactions if i["interaction_type"] == "coverage"]),
        "response_rate": round(
            len([i for i in _interactions if i["outcome"] in ("accepted", "positive")]) / max(len(_interactions), 1) * 100, 1
        ),
    }
