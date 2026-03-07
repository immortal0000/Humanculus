"""Tests for the Brand Voice API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestBrandVoicePresets:
    """Tests for GET /api/brand-voice/presets."""

    def test_list_presets(self, client):
        response = client.get("/api/brand-voice/presets")
        assert response.status_code == 200
        data = response.json()
        assert "presets" in data
        assert len(data["presets"]) == 5

    def test_preset_structure(self, client):
        response = client.get("/api/brand-voice/presets")
        for preset in response.json()["presets"]:
            assert "id" in preset
            assert "name" in preset
            assert "description" in preset

    def test_preset_ids(self, client):
        response = client.get("/api/brand-voice/presets")
        ids = [p["id"] for p in response.json()["presets"]]
        assert "professional" in ids
        assert "conversational" in ids
        assert "innovative" in ids
        assert "authoritative" in ids
        assert "empathetic" in ids


class TestBrandVoiceAnalysis:
    """Tests for POST /api/brand-voice/analyze."""

    @patch("app.routers.brand_voice.generate_completion", new_callable=AsyncMock)
    def test_analyze_success(self, mock_ai, client):
        mock_ai.return_value = '{"tone_profile": {"primary_tone": "professional"}}'
        response = client.post("/api/brand-voice/analyze", json={
            "company_name": "Humanculus",
            "content_samples": ["Sample press release text", "Blog post content here"],
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.brand_voice.generate_completion", new_callable=AsyncMock)
    def test_analyze_passes_samples_to_ai(self, mock_ai, client):
        mock_ai.return_value = "analysis"
        client.post("/api/brand-voice/analyze", json={
            "company_name": "TestCo",
            "content_samples": ["First sample", "Second sample"],
        })
        call_args = mock_ai.call_args[0][1]
        assert "TestCo" in call_args
        assert "First sample" in call_args
        assert "Second sample" in call_args

    def test_analyze_missing_required_fields(self, client):
        response = client.post("/api/brand-voice/analyze", json={
            "company_name": "Test",
        })
        assert response.status_code == 422

    def test_analyze_empty_body(self, client):
        response = client.post("/api/brand-voice/analyze", json={})
        assert response.status_code == 422
