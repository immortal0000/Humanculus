"""Tests for the Crisis Simulator API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestCrisisSimScenarios:
    """Tests for GET /api/crisis-sim/scenarios."""

    def test_list_scenarios(self, client):
        response = client.get("/api/crisis-sim/scenarios")
        assert response.status_code == 200
        data = response.json()
        assert "scenarios" in data
        assert len(data["scenarios"]) == 6

    def test_scenario_structure(self, client):
        response = client.get("/api/crisis-sim/scenarios")
        for scenario in response.json()["scenarios"]:
            assert "id" in scenario
            assert "name" in scenario
            assert "severity" in scenario
            assert "description" in scenario

    def test_scenario_ids(self, client):
        response = client.get("/api/crisis-sim/scenarios")
        ids = [s["id"] for s in response.json()["scenarios"]]
        assert "data-breach" in ids
        assert "product-recall" in ids
        assert "regulatory-action" in ids


class TestCrisisSimulation:
    """Tests for POST /api/crisis-sim/simulate."""

    @patch("app.routers.crisis_sim.generate_completion", new_callable=AsyncMock)
    def test_simulate_success(self, mock_ai, client):
        mock_ai.return_value = '{"scenario_brief": "test"}'
        response = client.post("/api/crisis-sim/simulate", json={
            "company_name": "Humanculus",
            "industry": "SaaS",
            "scenario": "Customer data breach discovered",
            "severity": "critical",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.crisis_sim.generate_completion", new_callable=AsyncMock)
    def test_simulate_with_response_plan(self, mock_ai, client):
        mock_ai.return_value = "simulation"
        client.post("/api/crisis-sim/simulate", json={
            "company_name": "Test",
            "industry": "Tech",
            "scenario": "Data breach",
            "severity": "high",
            "response_plan": "Notify customers within 24 hours",
        })
        call_args = mock_ai.call_args[0][1]
        assert "Notify customers within 24 hours" in call_args
        assert "Grade the provided response plan" in call_args

    @patch("app.routers.crisis_sim.generate_completion", new_callable=AsyncMock)
    def test_simulate_without_response_plan(self, mock_ai, client):
        mock_ai.return_value = "simulation"
        client.post("/api/crisis-sim/simulate", json={
            "company_name": "Test",
            "industry": "Tech",
            "scenario": "PR crisis",
            "severity": "medium",
        })
        call_args = mock_ai.call_args[0][1]
        assert "Recommend a response plan" in call_args

    def test_simulate_missing_required_fields(self, client):
        response = client.post("/api/crisis-sim/simulate", json={
            "company_name": "Test",
        })
        assert response.status_code == 422
