"""Tests for the Meeting Prep API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestMeetingTypes:
    """Tests for GET /api/meeting-prep/meeting-types."""

    def test_list_meeting_types(self, client):
        response = client.get("/api/meeting-prep/meeting-types")
        assert response.status_code == 200
        data = response.json()
        assert "meeting_types" in data
        assert len(data["meeting_types"]) == 5

    def test_meeting_type_structure(self, client):
        response = client.get("/api/meeting-prep/meeting-types")
        for mt in response.json()["meeting_types"]:
            assert "id" in mt
            assert "name" in mt
            assert "description" in mt

    def test_meeting_type_ids(self, client):
        response = client.get("/api/meeting-prep/meeting-types")
        ids = [mt["id"] for mt in response.json()["meeting_types"]]
        assert "interview" in ids
        assert "briefing" in ids
        assert "podcast" in ids


class TestMeetingPrepGeneration:
    """Tests for POST /api/meeting-prep/generate."""

    @patch("app.routers.meeting_prep.generate_completion", new_callable=AsyncMock)
    def test_generate_success(self, mock_ai, client):
        mock_ai.return_value = '{"journalist_profile": "test"}'
        response = client.post("/api/meeting-prep/generate", json={
            "meeting_type": "interview",
            "journalist_name": "Sarah Chen",
            "outlet": "TechCrunch",
            "beat": "AI startups",
            "topic": "AI PR platform launch",
            "company_name": "Humanculus",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.meeting_prep.generate_completion", new_callable=AsyncMock)
    def test_generate_with_recent_articles(self, mock_ai, client):
        mock_ai.return_value = "prep"
        client.post("/api/meeting-prep/generate", json={
            "meeting_type": "briefing",
            "journalist_name": "Test",
            "outlet": "Forbes",
            "beat": "Tech",
            "topic": "Product update",
            "company_name": "TestCo",
            "recent_articles": ["AI Startups to Watch", "PR Industry Report"],
        })
        call_args = mock_ai.call_args[0][1]
        assert "AI Startups to Watch" in call_args
        assert "PR Industry Report" in call_args

    def test_generate_missing_required_fields(self, client):
        response = client.post("/api/meeting-prep/generate", json={
            "journalist_name": "Test",
        })
        assert response.status_code == 422
