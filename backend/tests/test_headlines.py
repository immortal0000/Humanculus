"""Tests for the Headlines API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestHeadlineGeneration:
    """Tests for POST /api/headlines/generate."""

    @patch("app.routers.headlines.generate_completion", new_callable=AsyncMock)
    def test_generate_success(self, mock_ai, client):
        mock_ai.return_value = '{"headlines": []}'
        response = client.post("/api/headlines/generate", json={
            "content": "Humanculus launches AI-powered PR platform",
            "count": 5,
            "goal": "click_through",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.headlines.generate_completion", new_callable=AsyncMock)
    def test_generate_passes_goal_to_ai(self, mock_ai, client):
        mock_ai.return_value = "headlines"
        client.post("/api/headlines/generate", json={
            "content": "Test content",
            "count": 3,
            "goal": "seo",
        })
        call_args = mock_ai.call_args[0][1]
        assert "seo" in call_args
        assert "3" in call_args

    @patch("app.routers.headlines.generate_completion", new_callable=AsyncMock)
    def test_generate_default_values(self, mock_ai, client):
        mock_ai.return_value = "headlines"
        response = client.post("/api/headlines/generate", json={
            "content": "Test content",
        })
        assert response.status_code == 200

    def test_generate_missing_content(self, client):
        response = client.post("/api/headlines/generate", json={})
        assert response.status_code == 422
