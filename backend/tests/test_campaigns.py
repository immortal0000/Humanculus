"""Tests for the Campaigns API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestCampaignTemplates:
    """Tests for GET /api/campaigns/templates."""

    def test_list_templates(self, client):
        """Test that campaign templates endpoint returns correct data."""
        response = client.get("/api/campaigns/templates")
        assert response.status_code == 200
        data = response.json()
        assert "templates" in data
        assert len(data["templates"]) == 5

    def test_template_structure(self, client):
        """Test that each template has required fields."""
        response = client.get("/api/campaigns/templates")
        for template in response.json()["templates"]:
            assert "id" in template
            assert "name" in template
            assert "duration" in template
            assert "tasks" in template

    def test_template_ids(self, client):
        """Test that all expected template IDs are present."""
        response = client.get("/api/campaigns/templates")
        ids = [t["id"] for t in response.json()["templates"]]
        assert "product-launch" in ids
        assert "brand-awareness" in ids
        assert "event-coverage" in ids
        assert "crisis-response" in ids
        assert "thought-leadership" in ids

    def test_template_task_counts(self, client):
        """Test that template task counts are reasonable."""
        response = client.get("/api/campaigns/templates")
        for template in response.json()["templates"]:
            assert template["tasks"] > 0
            assert template["tasks"] <= 100


class TestCampaignPlanGeneration:
    """Tests for POST /api/campaigns/generate-plan."""

    @patch("app.routers.campaigns.generate_completion", new_callable=AsyncMock)
    def test_generate_campaign_plan(self, mock_ai, client):
        """Test successful campaign plan generation."""
        mock_ai.return_value = '{"strategy": "plan"}'
        response = client.post("/api/campaigns/generate-plan", json={
            "name": "Q2 Product Launch",
            "objective": "Generate awareness",
            "target_audience": "Developers",
            "start_date": "2026-04-01",
            "end_date": "2026-06-30",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"

    @patch("app.routers.campaigns.generate_completion", new_callable=AsyncMock)
    def test_generate_with_budget(self, mock_ai, client):
        """Test campaign generation with budget parameter."""
        mock_ai.return_value = "plan with budget"
        response = client.post("/api/campaigns/generate-plan", json={
            "name": "Launch",
            "objective": "Awareness",
            "target_audience": "SMBs",
            "start_date": "2026-01-01",
            "end_date": "2026-03-31",
            "budget": "$25,000",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "$25,000" in call_args

    @patch("app.routers.campaigns.generate_completion", new_callable=AsyncMock)
    def test_generate_calls_ai_with_correct_params(self, mock_ai, client):
        """Test that the endpoint passes all parameters to AI."""
        mock_ai.return_value = "plan"
        client.post("/api/campaigns/generate-plan", json={
            "name": "Brand Campaign",
            "objective": "Build awareness",
            "target_audience": "Enterprise CTOs",
            "start_date": "2026-04-01",
            "end_date": "2026-06-30",
        })
        call_args = mock_ai.call_args[0][1]
        assert "Brand Campaign" in call_args
        assert "Build awareness" in call_args
        assert "Enterprise CTOs" in call_args
        assert "2026-04-01" in call_args

    def test_generate_missing_required_fields(self, client):
        """Test that missing required fields return validation error."""
        response = client.post("/api/campaigns/generate-plan", json={
            "name": "Test",
            # missing objective, target_audience, dates
        })
        assert response.status_code == 422

    def test_generate_empty_body(self, client):
        """Test that empty body returns validation error."""
        response = client.post("/api/campaigns/generate-plan", json={})
        assert response.status_code == 422
