from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
async def analytics_overview():
    return {
        "period": "2026-03",
        "metrics": {
            "total_reach": "12.4M",
            "total_mentions": 156,
            "media_value": "$245,000",
            "share_of_voice": "18.3%",
            "sentiment_score": 78,
        },
        "trends": {
            "reach": [
                {"date": "2026-02-01", "value": 890000},
                {"date": "2026-02-08", "value": 1200000},
                {"date": "2026-02-15", "value": 2100000},
                {"date": "2026-02-22", "value": 1800000},
                {"date": "2026-03-01", "value": 3400000},
            ],
            "mentions": [
                {"date": "2026-02-01", "value": 12},
                {"date": "2026-02-08", "value": 18},
                {"date": "2026-02-15", "value": 34},
                {"date": "2026-02-22", "value": 28},
                {"date": "2026-03-01", "value": 47},
            ],
            "sentiment": [
                {"date": "2026-02-01", "positive": 8, "neutral": 3, "negative": 1},
                {"date": "2026-02-08", "positive": 12, "neutral": 4, "negative": 2},
                {"date": "2026-02-15", "positive": 24, "neutral": 7, "negative": 3},
                {"date": "2026-02-22", "positive": 18, "neutral": 8, "negative": 2},
                {"date": "2026-03-01", "positive": 32, "neutral": 10, "negative": 5},
            ],
        },
    }


@router.get("/channels")
async def channel_analytics():
    return {
        "channels": [
            {
                "name": "Media Coverage",
                "mentions": 45,
                "reach": "8.2M",
                "sentiment_score": 82,
                "top_outlets": ["TechCrunch", "The Verge", "Forbes", "Reuters", "Wired"],
            },
            {
                "name": "Social Media",
                "mentions": 89,
                "reach": "3.1M",
                "sentiment_score": 75,
                "top_platforms": ["LinkedIn", "X/Twitter", "Instagram"],
                "engagement_rate": "4.2%",
            },
            {
                "name": "Blogs & Thought Leadership",
                "mentions": 15,
                "reach": "720K",
                "sentiment_score": 71,
                "top_sources": ["Medium", "Substack", "Industry Blogs"],
            },
            {
                "name": "Broadcast",
                "mentions": 7,
                "reach": "350K",
                "sentiment_score": 85,
                "top_sources": ["Bloomberg TV", "CNBC", "Tech Podcasts"],
            },
        ]
    }


@router.get("/campaigns")
async def campaign_analytics():
    return {
        "campaigns": [
            {
                "id": "camp-001",
                "name": "Q2 Product Launch",
                "status": "active",
                "progress": 65,
                "metrics": {
                    "press_releases": 3,
                    "social_posts": 24,
                    "media_mentions": 18,
                    "total_reach": "4.5M",
                    "avg_sentiment": 81,
                },
                "roi_estimate": "3.2x",
            },
            {
                "id": "camp-002",
                "name": "Brand Awareness Q1",
                "status": "completed",
                "progress": 100,
                "metrics": {
                    "press_releases": 5,
                    "social_posts": 47,
                    "media_mentions": 34,
                    "total_reach": "7.8M",
                    "avg_sentiment": 76,
                },
                "roi_estimate": "4.1x",
            },
        ]
    }


@router.get("/social")
async def social_analytics():
    return {
        "platforms": [
            {
                "name": "LinkedIn",
                "followers": 12400,
                "follower_growth": "+8.2%",
                "posts": 18,
                "impressions": 145000,
                "engagements": 6200,
                "engagement_rate": "4.3%",
                "top_post": "AI is transforming PR workflows...",
                "best_time": "Tue-Thu 9am",
            },
            {
                "name": "X/Twitter",
                "followers": 8900,
                "follower_growth": "+5.1%",
                "posts": 34,
                "impressions": 89000,
                "engagements": 3100,
                "engagement_rate": "3.5%",
                "top_post": "Just launched our agentic PR...",
                "best_time": "Mon-Fri 12pm",
            },
            {
                "name": "Instagram",
                "followers": 3200,
                "follower_growth": "+12.4%",
                "posts": 12,
                "impressions": 42000,
                "engagements": 2800,
                "engagement_rate": "6.7%",
                "top_post": "Behind the scenes at Humanculus HQ",
                "best_time": "Tue-Fri 11am",
            },
        ]
    }
