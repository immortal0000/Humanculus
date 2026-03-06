"""Integration tests for the Humanculus API.

These tests verify that multiple components work together correctly,
including routing, middleware, request/response serialization, and
endpoint interactions.
"""

import pytest
from unittest.mock import patch, AsyncMock


class TestCORSMiddleware:
    """Test CORS configuration."""

    def test_cors_allows_localhost_3000(self, client):
        """Test that CORS headers are set for allowed origin."""
        response = client.get(
            "/api/health",
            headers={"Origin": "http://localhost:3000"}
        )
        assert response.status_code == 200
        assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"

    def test_cors_preflight_request(self, client):
        """Test CORS preflight OPTIONS request."""
        response = client.options(
            "/api/health",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type",
            }
        )
        assert response.status_code == 200


class TestAPIRouting:
    """Test that all API routes are properly registered."""

    def test_health_route_exists(self, client):
        """Test health check route."""
        response = client.get("/api/health")
        assert response.status_code == 200

    def test_strategy_templates_route(self, client):
        """Test strategy templates route."""
        response = client.get("/api/strategy/templates")
        assert response.status_code == 200

    def test_press_release_formats_route(self, client):
        """Test press release formats route."""
        response = client.get("/api/press-release/formats")
        assert response.status_code == 200

    def test_social_platforms_route(self, client):
        """Test social platforms route."""
        response = client.get("/api/social/platforms")
        assert response.status_code == 200

    def test_campaigns_templates_route(self, client):
        """Test campaigns templates route."""
        response = client.get("/api/campaigns/templates")
        assert response.status_code == 200

    def test_invalid_route_returns_404(self, client):
        """Test that invalid routes return 404."""
        response = client.get("/api/nonexistent")
        assert response.status_code == 404

    def test_strategy_generate_method_not_allowed(self, client):
        """Test that GET on a POST-only endpoint returns 405."""
        response = client.get("/api/strategy/generate")
        assert response.status_code == 405


class TestRequestValidation:
    """Test request validation across all endpoints."""

    def test_strategy_rejects_invalid_json(self, client):
        """Test that invalid JSON is rejected."""
        response = client.post(
            "/api/strategy/generate",
            content="not json",
            headers={"Content-Type": "application/json"},
        )
        assert response.status_code == 422

    def test_press_release_rejects_invalid_types(self, client):
        """Test that wrong field types are rejected."""
        response = client.post("/api/press-release/generate", json={
            "headline": 12345,  # should be string
            "announcement": ["not", "a", "string"],
        })
        assert response.status_code == 422

    def test_social_rejects_invalid_platforms(self, client):
        """Test that non-list platforms field is rejected."""
        response = client.post("/api/social/generate", json={
            "topic": "Test",
            "platforms": "linkedin",  # should be a list
        })
        assert response.status_code == 422


class TestEndToEndWorkflow:
    """Integration tests simulating a typical user workflow."""

    @patch("app.routers.strategy.generate_completion", new_callable=AsyncMock)
    @patch("app.routers.press_release.generate_completion", new_callable=AsyncMock)
    @patch("app.routers.social.generate_completion", new_callable=AsyncMock)
    @patch("app.routers.campaigns.generate_completion", new_callable=AsyncMock)
    def test_full_pr_workflow(self, mock_campaigns, mock_social, mock_press, mock_strategy, client):
        """Test a complete PR workflow: strategy -> press release -> social -> campaign."""
        # Step 1: Check health
        health = client.get("/api/health")
        assert health.status_code == 200

        # Step 2: Generate strategy
        mock_strategy.return_value = '{"executive_summary": "Great strategy"}'
        strategy = client.post("/api/strategy/generate", json={
            "company_name": "TestCo",
            "objective": "Product launch",
            "context": "B2B SaaS",
        })
        assert strategy.status_code == 200
        assert strategy.json()["status"] == "success"

        # Step 3: Create press release
        mock_press.return_value = "FOR IMMEDIATE RELEASE..."
        release = client.post("/api/press-release/generate", json={
            "headline": "TestCo Launches Revolutionary Product",
            "announcement": "TestCo today launched...",
            "brand_voice": "professional",
            "format": "traditional",
        })
        assert release.status_code == 200
        assert release.json()["status"] == "success"

        # Step 4: Generate social content
        mock_social.return_value = '{"posts": [{"platform": "linkedin", "text": "Exciting!"}]}'
        social = client.post("/api/social/generate", json={
            "topic": "Product launch announcement",
            "platforms": ["linkedin", "twitter", "instagram"],
            "content_type": "text",
        })
        assert social.status_code == 200
        assert social.json()["status"] == "success"

        # Step 5: Create campaign
        mock_campaigns.return_value = '{"strategy": "comprehensive plan"}'
        campaign = client.post("/api/campaigns/generate-plan", json={
            "name": "Product Launch Campaign",
            "objective": "Generate buzz for new product",
            "target_audience": "B2B decision makers",
            "start_date": "2026-04-01",
            "end_date": "2026-06-30",
            "budget": "$50,000",
        })
        assert campaign.status_code == 200
        assert campaign.json()["status"] == "success"

    def test_all_template_endpoints_return_consistent_format(self, client):
        """Test that all template/listing endpoints have consistent response format."""
        endpoints = [
            ("/api/strategy/templates", "templates"),
            ("/api/press-release/formats", "formats"),
            ("/api/social/platforms", "platforms"),
            ("/api/campaigns/templates", "templates"),
        ]
        for endpoint, key in endpoints:
            response = client.get(endpoint)
            assert response.status_code == 200, f"Failed for {endpoint}"
            data = response.json()
            assert key in data, f"Missing '{key}' in {endpoint}"
            assert isinstance(data[key], list), f"'{key}' not a list in {endpoint}"
            assert len(data[key]) > 0, f"Empty list for {endpoint}"
