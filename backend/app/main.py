from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    strategy, press_release, social, campaigns,
    pitch, brand_voice, repurpose, sentiment, headlines,
    competitive, crisis_sim, meeting_prep,
    distribution, calendar, embargo, approval, clipbook,
    contact_timeline, analytics, notifications,
)

app = FastAPI(
    title="Humanculus API",
    description="AI-powered PR communication platform backend",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing routers
app.include_router(strategy.router, prefix="/api/strategy", tags=["Strategy"])
app.include_router(press_release.router, prefix="/api/press-release", tags=["Press Release"])
app.include_router(social.router, prefix="/api/social", tags=["Social Content"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])

# AI-based tool routers
app.include_router(pitch.router, prefix="/api/pitch", tags=["Media Pitch"])
app.include_router(brand_voice.router, prefix="/api/brand-voice", tags=["Brand Voice"])
app.include_router(repurpose.router, prefix="/api/repurpose", tags=["Content Repurpose"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment Analysis"])
app.include_router(headlines.router, prefix="/api/headlines", tags=["Headlines"])
app.include_router(competitive.router, prefix="/api/competitive", tags=["Competitive Intelligence"])
app.include_router(crisis_sim.router, prefix="/api/crisis-sim", tags=["Crisis Simulation"])
app.include_router(meeting_prep.router, prefix="/api/meeting-prep", tags=["Meeting Prep"])

# Non-AI tool routers
app.include_router(distribution.router, prefix="/api/distribution", tags=["Distribution"])
app.include_router(calendar.router, prefix="/api/calendar", tags=["Calendar"])
app.include_router(embargo.router, prefix="/api/embargo", tags=["Embargo"])
app.include_router(approval.router, prefix="/api/approval", tags=["Approval"])
app.include_router(clipbook.router, prefix="/api/clipbook", tags=["Clipbook"])
app.include_router(contact_timeline.router, prefix="/api/contact-timeline", tags=["Contact Timeline"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "0.1.0"}
