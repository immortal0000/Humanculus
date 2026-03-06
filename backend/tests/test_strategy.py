"""Tests for the Strategy API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestStrategyTemplates:
    """Tests for GET /api/strategy/templates."""

    def test_list_templates(self, client):
        """Test that strategy templates endpoint returns correct data."""
        response = client.get("/api/strategy/templates")
        assert response.status_code == 200
        data = response.json()
        assert "templates" in data
        assert len(data["templates"]) == 5

    def test_template_structure(self, client):
        """Test that each template has required fields."""
        response = client.get("/api/strategy/templates")
        templates = response.json()["templates"]
        for template in templates:
            assert "id" in template
            assert "name" in template
            assert "description" in template

    def test_template_ids(self, client):
        """Test that all expected template IDs are present."""
        response = client.get("/api/strategy/templates")
        ids = [t["id"] for t in response.json()["templates"]]
        assert "product-launch" in ids
        assert "crisis-response" in ids
        assert "thought-leadership" in ids
        assert "brand-awareness" in ids
        assert "event-coverage" in ids


class TestStrategyGeneration:
    """Tests for POST /api/strategy/generate."""

    @patch("app.routers.strategy.generate_completion", new_callable=AsyncMock)
    def test_generate_strategy_success(self, mock_ai, client):
        """Test successful strategy generation."""
        mock_ai.return_value = '{"strategy": "generated"}'
        response = client.post("/api/strategy/generate", json={
            "company_name": "Acme Technologies",
            "objective": "Launch new product",
            "context": "SaaS startup in AI space",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"] == '{"strategy": "generated"}'

    @patch("app.routers.strategy.generate_completion", new_callable=AsyncMock)
    def test_generate_strategy_with_optional_fields(self, mock_ai, client):
        """Test strategy generation with all optional fields."""
        mock_ai.return_value = "full strategy"
        response = client.post("/api/strategy/generate", json={
            "company_name": "Acme",
            "objective": "Launch",
            "context": "Context",
            "timeline": "Q2 2026",
            "budget": "$50,000",
            "constraints": "No trade press",
        })
        assert response.status_code == 200
        # Verify AI was called with the optional fields in the prompt
        call_args = mock_ai.call_args[0][1]
        assert "Q2 2026" in call_args
        assert "$50,000" in call_args
        assert "No trade press" in call_args

    def test_generate_strategy_missing_required_fields(self, client):
        """Test that missing required fields return validation error."""
        response = client.post("/api/strategy/generate", json={
            "company_name": "Acme",
            # missing objective and context
        })
        assert response.status_code == 422

    def test_generate_strategy_empty_body(self, client):
        """Test that empty request body returns validation error."""
        response = client.post("/api/strategy/generate", json={})
        assert response.status_code == 422

    @patch("app.routers.strategy.generate_completion", new_callable=AsyncMock)
    def test_generate_strategy_calls_ai_service(self, mock_ai, client):
        """Test that the strategy endpoint calls the AI service."""
        mock_ai.return_value = "result"
        client.post("/api/strategy/generate", json={
            "company_name": "Test",
            "objective": "Test objective",
            "context": "Test context",
        })
        mock_ai.assert_called_once()
        # Verify system prompt and user prompt were passed
        args = mock_ai.call_args[0]
        assert len(args) == 2  # system_prompt, user_prompt
        assert "PR strategist" in args[0]
        assert "Test" in args[1]
