"""Tests for the Pitch API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestPitchTemplates:
    """Tests for GET /api/pitch/templates."""

    def test_list_templates(self, client):
        response = client.get("/api/pitch/templates")
        assert response.status_code == 200
        data = response.json()
        assert "templates" in data
        assert len(data["templates"]) == 5

    def test_template_structure(self, client):
        response = client.get("/api/pitch/templates")
        for template in response.json()["templates"]:
            assert "id" in template
            assert "name" in template
            assert "description" in template

    def test_template_ids(self, client):
        response = client.get("/api/pitch/templates")
        ids = [t["id"] for t in response.json()["templates"]]
        assert "exclusive" in ids
        assert "embargo" in ids
        assert "data-story" in ids
        assert "trend-piece" in ids
        assert "expert-source" in ids


class TestPitchGeneration:
    """Tests for POST /api/pitch/generate."""

    @patch("app.routers.pitch.generate_completion", new_callable=AsyncMock)
    def test_generate_pitch_success(self, mock_ai, client):
        mock_ai.return_value = '{"subject_line": "test"}'
        response = client.post("/api/pitch/generate", json={
            "journalist_name": "Sarah Chen",
            "outlet": "TechCrunch",
            "beat": "AI startups",
            "story_angle": "New AI PR platform launch",
            "company_name": "Humanculus",
            "key_points": ["First agentic PR tool", "40% better response rates"],
            "tone": "professional",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"] == '{"subject_line": "test"}'

    @patch("app.routers.pitch.generate_completion", new_callable=AsyncMock)
    def test_generate_pitch_includes_journalist_details(self, mock_ai, client):
        mock_ai.return_value = "pitch"
        client.post("/api/pitch/generate", json={
            "journalist_name": "Sarah Chen",
            "outlet": "TechCrunch",
            "beat": "AI",
            "story_angle": "Launch",
            "company_name": "Test",
            "key_points": ["Point 1"],
            "tone": "casual",
        })
        call_args = mock_ai.call_args[0][1]
        assert "Sarah Chen" in call_args
        assert "TechCrunch" in call_args
        assert "AI" in call_args

    @patch("app.routers.pitch.generate_completion", new_callable=AsyncMock)
    def test_generate_pitch_with_previous_coverage(self, mock_ai, client):
        mock_ai.return_value = "pitch"
        client.post("/api/pitch/generate", json={
            "journalist_name": "Test",
            "outlet": "Test",
            "beat": "Tech",
            "story_angle": "Angle",
            "company_name": "Company",
            "key_points": ["Point"],
            "tone": "formal",
            "previous_coverage": "Covered AI startups last month",
        })
        call_args = mock_ai.call_args[0][1]
        assert "Covered AI startups last month" in call_args

    def test_generate_pitch_missing_required_fields(self, client):
        response = client.post("/api/pitch/generate", json={
            "journalist_name": "Test",
        })
        assert response.status_code == 422

    def test_generate_pitch_empty_body(self, client):
        response = client.post("/api/pitch/generate", json={})
        assert response.status_code == 422
