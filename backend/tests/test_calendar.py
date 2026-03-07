"""Tests for the Calendar API endpoints."""

import pytest


class TestCalendarEvents:
    """Tests for GET /api/calendar/events."""

    def test_list_all_events(self, client):
        response = client.get("/api/calendar/events")
        assert response.status_code == 200
        data = response.json()
        assert "events" in data
        assert len(data["events"]) >= 6

    def test_filter_by_month(self, client):
        response = client.get("/api/calendar/events?month=2026-03")
        assert response.status_code == 200
        events = response.json()["events"]
        for event in events:
            assert event["start_date"].startswith("2026-03")

    def test_filter_by_event_type(self, client):
        response = client.get("/api/calendar/events?event_type=embargo")
        assert response.status_code == 200
        events = response.json()["events"]
        for event in events:
            assert event["event_type"] == "embargo"


class TestCalendarEventById:
    """Tests for GET /api/calendar/events/{event_id}."""

    def test_get_existing_event(self, client):
        response = client.get("/api/calendar/events/evt-001")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["id"] == "evt-001"

    def test_get_nonexistent_event(self, client):
        response = client.get("/api/calendar/events/evt-999")
        assert response.status_code == 200
        assert response.json()["status"] == "error"


class TestCalendarCreateEvent:
    """Tests for POST /api/calendar/events."""

    def test_create_event(self, client):
        response = client.post("/api/calendar/events", json={
            "title": "Test Event",
            "description": "A test event",
            "event_type": "meeting",
            "start_date": "2026-04-15",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["title"] == "Test Event"

    def test_create_event_missing_fields(self, client):
        response = client.post("/api/calendar/events", json={
            "title": "Test",
        })
        assert response.status_code == 422


class TestCalendarUpcoming:
    """Tests for GET /api/calendar/upcoming."""

    def test_upcoming_events(self, client):
        response = client.get("/api/calendar/upcoming")
        assert response.status_code == 200
        events = response.json()["events"]
        assert len(events) <= 10
        # Verify sorted by date
        dates = [e["start_date"] for e in events]
        assert dates == sorted(dates)


class TestCalendarEventTypes:
    """Tests for GET /api/calendar/event-types."""

    def test_list_event_types(self, client):
        response = client.get("/api/calendar/event-types")
        assert response.status_code == 200
        data = response.json()
        assert "event_types" in data
        assert len(data["event_types"]) == 6

    def test_event_type_structure(self, client):
        response = client.get("/api/calendar/event-types")
        for et in response.json()["event_types"]:
            assert "id" in et
            assert "name" in et
            assert "color" in et
