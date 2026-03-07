from fastapi import APIRouter
from app.models.schemas import ApprovalRequest, ApprovalDecision

router = APIRouter()

_approvals: list[dict] = [
    {
        "id": "apr-001",
        "item_type": "press_release",
        "item_id": "pr-004",
        "title": "Partnership Announcement Draft",
        "content_preview": "FOR IMMEDIATE RELEASE: Humanculus and TechPartner announce strategic partnership...",
        "requested_by": "John Doe",
        "reviewers": ["Jane Smith", "Alex Morgan"],
        "priority": "high",
        "deadline": "2026-03-08",
        "status": "pending",
        "decisions": [],
        "created_at": "2026-03-05T10:00:00Z",
    },
    {
        "id": "apr-002",
        "item_type": "social_post",
        "item_id": "sp-012",
        "title": "LinkedIn Product Launch Post",
        "content_preview": "Excited to announce our latest AI-powered feature...",
        "requested_by": "John Doe",
        "reviewers": ["Jane Smith"],
        "priority": "medium",
        "deadline": "2026-03-10",
        "status": "approved",
        "decisions": [{"reviewer": "Jane Smith", "decision": "approved", "comments": "Looks great!", "decided_at": "2026-03-05T14:00:00Z"}],
        "created_at": "2026-03-04T09:00:00Z",
    },
    {
        "id": "apr-003",
        "item_type": "crisis_response",
        "item_id": "cr-001",
        "title": "Data Privacy Incident Response Statement",
        "content_preview": "We take our customers' data privacy seriously...",
        "requested_by": "Alex Morgan",
        "reviewers": ["Jane Smith", "John Doe", "Jordan Lee"],
        "priority": "urgent",
        "deadline": "2026-03-06",
        "status": "pending",
        "decisions": [{"reviewer": "Jane Smith", "decision": "revision_requested", "comments": "Needs stronger accountability language", "decided_at": "2026-03-06T08:00:00Z"}],
        "created_at": "2026-03-06T06:00:00Z",
    },
]


@router.get("/list")
async def list_approvals(status: str = None, priority: str = None):
    filtered = _approvals
    if status:
        filtered = [a for a in filtered if a["status"] == status]
    if priority:
        filtered = [a for a in filtered if a["priority"] == priority]
    return {"approvals": filtered}


@router.post("/request")
async def request_approval(request: ApprovalRequest):
    approval = {
        "id": f"apr-{len(_approvals) + 1:03d}",
        **request.model_dump(),
        "status": "pending",
        "decisions": [],
        "created_at": "2026-03-06T12:00:00Z",
    }
    _approvals.append(approval)
    return {"status": "success", "data": approval}


@router.post("/{approval_id}/decide")
async def submit_decision(approval_id: str, decision: ApprovalDecision):
    approval = next((a for a in _approvals if a["id"] == approval_id), None)
    if not approval:
        return {"status": "error", "message": "Approval not found"}

    approval["decisions"].append({
        **decision.model_dump(),
        "decided_at": "2026-03-06T12:00:00Z",
    })

    # Auto-resolve: if all reviewers approved
    all_decided = len(approval["decisions"]) >= len(approval["reviewers"])
    all_approved = all(d["decision"] == "approved" for d in approval["decisions"])
    any_rejected = any(d["decision"] == "rejected" for d in approval["decisions"])

    if any_rejected:
        approval["status"] = "rejected"
    elif all_decided and all_approved:
        approval["status"] = "approved"

    return {"status": "success", "data": approval}


@router.get("/stats")
async def approval_stats():
    return {
        "total_pending": len([a for a in _approvals if a["status"] == "pending"]),
        "total_approved": len([a for a in _approvals if a["status"] == "approved"]),
        "total_rejected": len([a for a in _approvals if a["status"] == "rejected"]),
        "urgent_pending": len([a for a in _approvals if a["status"] == "pending" and a["priority"] == "urgent"]),
    }
