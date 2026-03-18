"""Tests for the Notifications API endpoints."""

import pytest


class TestNotificationsList:
    """Tests for GET /api/notifications/list."""

    def test_list_all_notifications(self, client):
        response = client.get("/api/notifications/list")
        assert response.status_code == 200
        data = response.json()
        assert "notifications" in data
        assert "unread_count" in data
        assert len(data["notifications"]) >= 5

    def test_list_unread_only(self, client):
        response = client.get("/api/notifications/list?unread_only=true")
        assert response.status_code == 200
        for notif in response.json()["notifications"]:
            assert notif["read"] is False

    def test_notification_structure(self, client):
        response = client.get("/api/notifications/list")
        for notif in response.json()["notifications"]:
            assert "id" in notif
            assert "type" in notif
            assert "title" in notif
            assert "message" in notif
            assert "severity" in notif
            assert "read" in notif


class TestMarkAsRead:
    """Tests for POST /api/notifications/{notification_id}/read."""

    def test_mark_as_read(self, client):
        response = client.post("/api/notifications/notif-001/read")
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    def test_mark_nonexistent_as_read(self, client):
        response = client.post("/api/notifications/notif-999/read")
        assert response.status_code == 200
        assert response.json()["status"] == "error"


class TestMarkAllRead:
    """Tests for POST /api/notifications/read-all."""

    def test_mark_all_read(self, client):
        response = client.post("/api/notifications/read-all")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["marked"] >= 5


class TestNotificationConfig:
    """Tests for GET/POST /api/notifications/config."""

    def test_get_config(self, client):
        response = client.get("/api/notifications/config")
        assert response.status_code == 200
        config = response.json()["config"]
        assert "channels" in config
        assert "events" in config

    def test_update_config(self, client):
        response = client.post("/api/notifications/config", json={
            "channel": "slack",
            "webhook_url": "https://hooks.slack.com/test",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    def test_update_config_sets_webhook(self, client):
        client.post("/api/notifications/config", json={
            "channel": "slack",
            "webhook_url": "https://hooks.slack.com/new",
        })
        response = client.get("/api/notifications/config")
        assert response.json()["config"]["slack_webhook_url"] == "https://hooks.slack.com/new"
