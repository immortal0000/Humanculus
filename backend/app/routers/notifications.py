from fastapi import APIRouter
from app.models.schemas import NotificationConfig

router = APIRouter()

_notifications: list[dict] = [
    {
        "id": "notif-001",
        "type": "crisis_alert",
        "title": "New Crisis Alert: Negative Press Coverage",
        "message": "TechBlog published a critical article about data practices",
        "severity": "high",
        "read": False,
        "created_at": "2026-03-06T08:30:00Z",
        "action_url": "/crisis",
    },
    {
        "id": "notif-002",
        "type": "approval_needed",
        "title": "Approval Requested: Partnership Press Release",
        "message": "John Doe requested your approval for the partnership announcement draft",
        "severity": "medium",
        "read": False,
        "created_at": "2026-03-05T14:00:00Z",
        "action_url": "/approvals",
    },
    {
        "id": "notif-003",
        "type": "mention",
        "title": "New Media Mention: TechCrunch",
        "message": "Humanculus was mentioned in 'Rising AI Startups to Watch in 2026'",
        "severity": "low",
        "read": True,
        "created_at": "2026-03-01T09:00:00Z",
        "action_url": "/monitoring",
    },
    {
        "id": "notif-004",
        "type": "campaign_milestone",
        "title": "Campaign Milestone: Q2 Product Launch at 65%",
        "message": "The Q2 Product Launch campaign has reached 65% completion",
        "severity": "low",
        "read": True,
        "created_at": "2026-03-04T16:00:00Z",
        "action_url": "/campaigns",
    },
    {
        "id": "notif-005",
        "type": "embargo_reminder",
        "title": "Embargo Lifts Tomorrow: Series B Announcement",
        "message": "Reminder: The Series B funding embargo lifts on Mar 10 at 9:00 AM ET",
        "severity": "high",
        "read": False,
        "created_at": "2026-03-09T09:00:00Z",
        "action_url": "/embargo",
    },
]

_config: dict = {
    "channels": {
        "email": True,
        "slack": True,
        "in_app": True,
    },
    "events": {
        "crisis_alert": {"enabled": True, "channels": ["email", "slack", "in_app"]},
        "mention": {"enabled": True, "channels": ["in_app"]},
        "approval_needed": {"enabled": True, "channels": ["email", "slack", "in_app"]},
        "campaign_milestone": {"enabled": True, "channels": ["in_app"]},
        "embargo_reminder": {"enabled": True, "channels": ["email", "slack", "in_app"]},
    },
    "slack_webhook_url": None,
}


@router.get("/list")
async def list_notifications(unread_only: bool = False):
    filtered = _notifications
    if unread_only:
        filtered = [n for n in filtered if not n["read"]]
    return {"notifications": filtered, "unread_count": len([n for n in _notifications if not n["read"]])}


@router.post("/{notification_id}/read")
async def mark_as_read(notification_id: str):
    notif = next((n for n in _notifications if n["id"] == notification_id), None)
    if not notif:
        return {"status": "error", "message": "Notification not found"}
    notif["read"] = True
    return {"status": "success"}


@router.post("/read-all")
async def mark_all_read():
    for notif in _notifications:
        notif["read"] = True
    return {"status": "success", "marked": len(_notifications)}


@router.get("/config")
async def get_notification_config():
    return {"config": _config}


@router.post("/config")
async def update_notification_config(config: NotificationConfig):
    _config["channels"][config.channel] = True
    if config.webhook_url and config.channel == "slack":
        _config["slack_webhook_url"] = config.webhook_url
    return {"status": "success", "config": _config}
