"""Tests for the Contact Timeline API endpoints."""

import pytest


class TestContactTimeline:
    """Tests for GET /api/contact-timeline/contacts/{contact_id}."""

    def test_get_contact_timeline(self, client):
        response = client.get("/api/contact-timeline/contacts/c-001")
        assert response.status_code == 200
        data = response.json()
        assert data["contact_id"] == "c-001"
        assert data["total_interactions"] == 4
        assert len(data["interactions"]) == 4

    def test_get_contact_no_interactions(self, client):
        response = client.get("/api/contact-timeline/contacts/c-999")
        assert response.status_code == 200
        data = response.json()
        assert data["total_interactions"] == 0
        assert data["interactions"] == []

    def test_timeline_sorted_reverse_chronologically(self, client):
        response = client.get("/api/contact-timeline/contacts/c-001")
        interactions = response.json()["interactions"]
        dates = [i["date"] for i in interactions]
        assert dates == sorted(dates, reverse=True)


class TestAddInteraction:
    """Tests for POST /api/contact-timeline/interactions."""

    def test_add_interaction(self, client):
        response = client.post("/api/contact-timeline/interactions", json={
            "contact_id": "c-001",
            "interaction_type": "pitch_sent",
            "subject": "New Product Pitch",
            "notes": "Sent pitch about new feature",
            "outcome": "pending",
            "date": "2026-03-06",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["contact_id"] == "c-001"

    def test_add_interaction_missing_fields(self, client):
        response = client.post("/api/contact-timeline/interactions", json={
            "contact_id": "c-001",
        })
        assert response.status_code == 422


class TestRecentInteractions:
    """Tests for GET /api/contact-timeline/recent."""

    def test_recent_interactions(self, client):
        response = client.get("/api/contact-timeline/recent")
        assert response.status_code == 200
        data = response.json()
        assert "interactions" in data
        assert len(data["interactions"]) <= 10

    def test_recent_with_limit(self, client):
        response = client.get("/api/contact-timeline/recent?limit=3")
        assert response.status_code == 200
        assert len(response.json()["interactions"]) <= 3


class TestInteractionStats:
    """Tests for GET /api/contact-timeline/stats."""

    def test_get_stats(self, client):
        response = client.get("/api/contact-timeline/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_interactions" in data
        assert "pitches_sent" in data
        assert "meetings_held" in data
        assert "coverage_secured" in data
        assert "response_rate" in data
        assert data["total_interactions"] >= 8
