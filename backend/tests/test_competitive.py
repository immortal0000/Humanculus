"""Tests for the Competitive Intel API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestCompetitiveAnalysis:
    """Tests for POST /api/competitive/analyze."""

    @patch("app.routers.competitive.generate_completion", new_callable=AsyncMock)
    def test_analyze_success(self, mock_ai, client):
        mock_ai.return_value = '{"competitors": []}'
        response = client.post("/api/competitive/analyze", json={
            "company_name": "Humanculus",
            "competitors": ["Meltwater", "Cision"],
            "focus_areas": ["messaging", "media_presence"],
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.competitive.generate_completion", new_callable=AsyncMock)
    def test_analyze_passes_competitors_to_ai(self, mock_ai, client):
        mock_ai.return_value = "analysis"
        client.post("/api/competitive/analyze", json={
            "company_name": "TestCo",
            "competitors": ["Comp1", "Comp2"],
            "focus_areas": ["social_strategy"],
        })
        call_args = mock_ai.call_args[0][1]
        assert "TestCo" in call_args
        assert "Comp1" in call_args
        assert "Comp2" in call_args

    def test_analyze_missing_required_fields(self, client):
        response = client.post("/api/competitive/analyze", json={
            "company_name": "Test",
        })
        assert response.status_code == 422
