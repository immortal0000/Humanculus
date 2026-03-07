"""Tests for the Distribution API endpoints."""

import pytest


class TestDistributionHistory:
    """Tests for GET /api/distribution/history."""

    def test_list_distributions(self, client):
        response = client.get("/api/distribution/history")
        assert response.status_code == 200
        data = response.json()
        assert "distributions" in data
        assert len(data["distributions"]) >= 3

    def test_distribution_structure(self, client):
        response = client.get("/api/distribution/history")
        for dist in response.json()["distributions"][:3]:
            assert "id" in dist
            assert "subject" in dist
            assert "recipients_count" in dist
            assert "status" in dist


class TestDistributionStats:
    """Tests for GET /api/distribution/stats."""

    def test_get_stats(self, client):
        response = client.get("/api/distribution/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_sent" in data
        assert "total_scheduled" in data
        assert "avg_open_rate" in data
        assert "avg_click_rate" in data
        assert "total_recipients" in data

    def test_stats_values_are_reasonable(self, client):
        response = client.get("/api/distribution/stats")
        data = response.json()
        assert data["total_sent"] >= 0
        assert data["avg_open_rate"] >= 0
        assert data["avg_click_rate"] >= 0


class TestDistributionSend:
    """Tests for POST /api/distribution/send."""

    def test_send_distribution(self, client):
        response = client.post("/api/distribution/send", json={
            "subject": "Test Distribution",
            "content": "Test content body",
            "recipients": ["test@example.com", "test2@example.com"],
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["recipients_count"] == 2
        assert data["data"]["status"] == "queued"

    def test_send_scheduled_distribution(self, client):
        response = client.post("/api/distribution/send", json={
            "subject": "Scheduled Release",
            "content": "Content",
            "recipients": ["test@example.com"],
            "send_at": "2026-04-01T09:00:00Z",
        })
        assert response.status_code == 200
        assert response.json()["data"]["status"] == "scheduled"

    def test_send_missing_required_fields(self, client):
        response = client.post("/api/distribution/send", json={
            "subject": "Test",
        })
        assert response.status_code == 422
