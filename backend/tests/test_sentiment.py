"""Tests for the Sentiment API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestSentimentExplain:
    """Tests for POST /api/sentiment/explain."""

    @patch("app.routers.sentiment.generate_completion", new_callable=AsyncMock)
    def test_explain_success(self, mock_ai, client):
        mock_ai.return_value = '{"risk_level": "medium"}'
        response = client.post("/api/sentiment/explain", json={
            "mention_text": "Article about AI PR tools being overhyped",
            "sentiment": "negative",
            "source": "TechBlog",
            "headline": "AI PR Tools: Overhyped?",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.sentiment.generate_completion", new_callable=AsyncMock)
    def test_explain_passes_details_to_ai(self, mock_ai, client):
        mock_ai.return_value = "analysis"
        client.post("/api/sentiment/explain", json={
            "mention_text": "Positive article",
            "sentiment": "positive",
            "source": "Forbes",
            "headline": "Best AI Tools",
        })
        call_args = mock_ai.call_args[0][1]
        assert "positive" in call_args
        assert "Forbes" in call_args
        assert "Best AI Tools" in call_args

    def test_explain_missing_required_fields(self, client):
        response = client.post("/api/sentiment/explain", json={
            "mention_text": "Text only",
        })
        assert response.status_code == 422
