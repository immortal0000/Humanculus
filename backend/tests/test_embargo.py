"""Tests for the Embargo API endpoints."""

import pytest


class TestEmbargoList:
    """Tests for GET /api/embargo/list."""

    def test_list_all_embargoes(self, client):
        response = client.get("/api/embargo/list")
        assert response.status_code == 200
        data = response.json()
        assert "embargoes" in data
        assert len(data["embargoes"]) >= 3

    def test_filter_by_status_active(self, client):
        response = client.get("/api/embargo/list?status=active")
        assert response.status_code == 200
        for embargo in response.json()["embargoes"]:
            assert embargo["status"] == "active"

    def test_filter_by_status_lifted(self, client):
        response = client.get("/api/embargo/list?status=lifted")
        assert response.status_code == 200
        for embargo in response.json()["embargoes"]:
            assert embargo["status"] == "lifted"


class TestEmbargoCreate:
    """Tests for POST /api/embargo/create."""

    def test_create_embargo(self, client):
        response = client.post("/api/embargo/create", json={
            "title": "New Product Launch",
            "press_release_id": "pr-010",
            "lift_date": "2026-04-01",
            "lift_time": "09:00",
            "timezone": "US/Eastern",
            "recipients": ["test@example.com"],
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["status"] == "active"
        assert data["data"]["title"] == "New Product Launch"

    def test_create_embargo_missing_fields(self, client):
        response = client.post("/api/embargo/create", json={
            "title": "Test",
        })
        assert response.status_code == 422


class TestEmbargoLift:
    """Tests for POST /api/embargo/{embargo_id}/lift."""

    def test_lift_existing_embargo(self, client):
        response = client.post("/api/embargo/emb-001/lift")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["status"] == "lifted"

    def test_lift_nonexistent_embargo(self, client):
        response = client.post("/api/embargo/emb-999/lift")
        assert response.status_code == 200
        assert response.json()["status"] == "error"


class TestEmbargoStats:
    """Tests for GET /api/embargo/stats."""

    def test_get_stats(self, client):
        response = client.get("/api/embargo/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_active" in data
        assert "total_lifted" in data
        assert "total_violated" in data
        assert "upcoming_lifts" in data
