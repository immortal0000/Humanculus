"""Tests for the Social Content API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestSocialPlatforms:
    """Tests for GET /api/social/platforms."""

    def test_list_platforms(self, client):
        """Test that platforms endpoint returns all platforms."""
        response = client.get("/api/social/platforms")
        assert response.status_code == 200
        data = response.json()
        assert "platforms" in data
        assert len(data["platforms"]) == 5

    def test_platform_structure(self, client):
        """Test that each platform has required fields."""
        response = client.get("/api/social/platforms")
        for platform in response.json()["platforms"]:
            assert "id" in platform
            assert "name" in platform
            assert "max_chars" in platform
            assert "best_times" in platform

    def test_platform_ids(self, client):
        """Test that all expected platform IDs are present."""
        response = client.get("/api/social/platforms")
        ids = [p["id"] for p in response.json()["platforms"]]
        assert "linkedin" in ids
        assert "twitter" in ids
        assert "instagram" in ids
        assert "facebook" in ids
        assert "tiktok" in ids

    def test_twitter_char_limit(self, client):
        """Test that Twitter has correct character limit."""
        response = client.get("/api/social/platforms")
        twitter = next(p for p in response.json()["platforms"] if p["id"] == "twitter")
        assert twitter["max_chars"] == 280


class TestSocialContentGeneration:
    """Tests for POST /api/social/generate."""

    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    def test_generate_text_content(self, mock_ai, client):
        """Test generating text social content."""
        mock_ai.return_value = '{"posts": []}'
        response = client.post("/api/social/generate", json={
            "topic": "Product launch",
            "platforms": ["linkedin", "twitter"],
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    def test_generate_for_single_platform(self, mock_ai, client):
        """Test generating content for a single platform."""
        mock_ai.return_value = '{"posts": [{"platform": "linkedin"}]}'
        response = client.post("/api/social/generate", json={
            "topic": "AI update",
            "platforms": ["linkedin"],
            "content_type": "text",
        })
        assert response.status_code == 200

    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    def test_generate_image_content(self, mock_ai, client):
        """Test generating image social content includes image prompt."""
        mock_ai.return_value = "image content"
        response = client.post("/api/social/generate", json={
            "topic": "Brand showcase",
            "platforms": ["instagram"],
            "content_type": "image",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "image" in call_args.lower()

    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    def test_generate_video_script(self, mock_ai, client):
        """Test generating video script content."""
        mock_ai.return_value = "video script"
        response = client.post("/api/social/generate", json={
            "topic": "Behind the scenes",
            "platforms": ["tiktok"],
            "content_type": "video",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "video" in call_args.lower()

    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    def test_generate_with_context(self, mock_ai, client):
        """Test that context is passed to AI service."""
        mock_ai.return_value = "content"
        response = client.post("/api/social/generate", json={
            "topic": "Launch",
            "context": "B2B SaaS audience",
            "platforms": ["linkedin"],
        })
        call_args = mock_ai.call_args[0][1]
        assert "B2B SaaS audience" in call_args

    def test_generate_missing_topic(self, client):
        """Test that missing topic returns validation error."""
        response = client.post("/api/social/generate", json={
            "platforms": ["linkedin"],
        })
        assert response.status_code == 422

    def test_generate_missing_platforms(self, client):
        """Test that missing platforms returns validation error."""
        response = client.post("/api/social/generate", json={
            "topic": "Something",
        })
        assert response.status_code == 422
