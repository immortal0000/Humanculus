"""Tests for the Repurpose API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestRepurposeFormats:
    """Tests for GET /api/repurpose/formats."""

    def test_list_formats(self, client):
        response = client.get("/api/repurpose/formats")
        assert response.status_code == 200
        data = response.json()
        assert "formats" in data
        assert len(data["formats"]) == 8

    def test_format_structure(self, client):
        response = client.get("/api/repurpose/formats")
        for fmt in response.json()["formats"]:
            assert "id" in fmt
            assert "name" in fmt
            assert "description" in fmt

    def test_format_ids(self, client):
        response = client.get("/api/repurpose/formats")
        ids = [f["id"] for f in response.json()["formats"]]
        assert "blog_post" in ids
        assert "tweet_thread" in ids
        assert "linkedin_article" in ids


class TestRepurposeGeneration:
    """Tests for POST /api/repurpose/generate."""

    @patch("app.routers.repurpose.generate_completion", new_callable=AsyncMock)
    def test_generate_success(self, mock_ai, client):
        mock_ai.return_value = '{"formats": []}'
        response = client.post("/api/repurpose/generate", json={
            "source_content": "Original press release content here",
            "source_type": "press_release",
            "target_formats": ["blog_post", "tweet_thread"],
            "brand_voice": "professional",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.repurpose.generate_completion", new_callable=AsyncMock)
    def test_generate_passes_formats_to_ai(self, mock_ai, client):
        mock_ai.return_value = "content"
        client.post("/api/repurpose/generate", json={
            "source_content": "Content",
            "source_type": "blog_post",
            "target_formats": ["faq", "email_newsletter"],
            "brand_voice": "casual",
        })
        call_args = mock_ai.call_args[0][1]
        assert "faq" in call_args
        assert "email_newsletter" in call_args

    def test_generate_missing_required_fields(self, client):
        response = client.post("/api/repurpose/generate", json={
            "source_content": "Content",
        })
        assert response.status_code == 422
