from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import strategy, press_release, social, campaigns

app = FastAPI(
    title="Humanculus API",
    description="AI-powered PR communication platform backend",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(strategy.router, prefix="/api/strategy", tags=["Strategy"])
app.include_router(press_release.router, prefix="/api/press-release", tags=["Press Release"])
app.include_router(social.router, prefix="/api/social", tags=["Social Content"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "0.1.0"}
