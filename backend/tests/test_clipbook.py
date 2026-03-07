"""Tests for the Clipbook API endpoints."""

import pytest


class TestClipbookList:
    """Tests for GET /api/clipbook/list."""

    def test_list_clipbooks(self, client):
        response = client.get("/api/clipbook/list")
        assert response.status_code == 200
        data = response.json()
        assert "clipbooks" in data
        assert len(data["clipbooks"]) >= 2

    def test_clipbook_structure(self, client):
        response = client.get("/api/clipbook/list")
        for clipbook in response.json()["clipbooks"][:2]:
            assert "id" in clipbook
            assert "title" in clipbook
            assert "mention_count" in clipbook
            assert "summary" in clipbook


class TestClipbookMentions:
    """Tests for GET /api/clipbook/mentions."""

    def test_list_mentions(self, client):
        response = client.get("/api/clipbook/mentions")
        assert response.status_code == 200
        data = response.json()
        assert "mentions" in data
        assert len(data["mentions"]) >= 5

    def test_mention_structure(self, client):
        response = client.get("/api/clipbook/mentions")
        for mention in response.json()["mentions"]:
            assert "id" in mention
            assert "headline" in mention
            assert "source" in mention
            assert "sentiment" in mention


class TestClipbookCreate:
    """Tests for POST /api/clipbook/create."""

    def test_create_clipbook(self, client):
        response = client.post("/api/clipbook/create", json={
            "title": "Test Clipbook",
            "mention_ids": ["m-001", "m-002"],
            "date_range": "2026-03-01 to 2026-03-06",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["mention_count"] == 2
        assert data["data"]["summary"]["total_mentions"] == 2

    def test_create_clipbook_with_no_matching_mentions(self, client):
        response = client.post("/api/clipbook/create", json={
            "title": "Empty Clipbook",
            "mention_ids": ["m-999"],
            "date_range": "2026-03-01 to 2026-03-06",
        })
        assert response.status_code == 200
        assert response.json()["data"]["mention_count"] == 0


class TestClipbookGetById:
    """Tests for GET /api/clipbook/{clipbook_id}."""

    def test_get_existing_clipbook(self, client):
        response = client.get("/api/clipbook/clip-001")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["id"] == "clip-001"

    def test_get_nonexistent_clipbook(self, client):
        response = client.get("/api/clipbook/clip-999")
        assert response.status_code == 200
        assert response.json()["status"] == "error"
