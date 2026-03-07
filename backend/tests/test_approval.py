"""Tests for the Approval API endpoints."""

import pytest


class TestApprovalList:
    """Tests for GET /api/approval/list."""

    def test_list_all_approvals(self, client):
        response = client.get("/api/approval/list")
        assert response.status_code == 200
        data = response.json()
        assert "approvals" in data
        assert len(data["approvals"]) >= 3

    def test_filter_by_status(self, client):
        response = client.get("/api/approval/list?status=pending")
        assert response.status_code == 200
        for approval in response.json()["approvals"]:
            assert approval["status"] == "pending"

    def test_filter_by_priority(self, client):
        response = client.get("/api/approval/list?priority=urgent")
        assert response.status_code == 200
        for approval in response.json()["approvals"]:
            assert approval["priority"] == "urgent"


class TestApprovalRequest:
    """Tests for POST /api/approval/request."""

    def test_request_approval(self, client):
        response = client.post("/api/approval/request", json={
            "item_type": "press_release",
            "item_id": "pr-100",
            "title": "Test Release",
            "content_preview": "Preview text...",
            "requested_by": "Test User",
            "reviewers": ["Reviewer 1"],
            "priority": "medium",
            "deadline": "2026-04-01",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["data"]["status"] == "pending"
        assert data["data"]["decisions"] == []

    def test_request_missing_fields(self, client):
        response = client.post("/api/approval/request", json={
            "title": "Test",
        })
        assert response.status_code == 422


class TestApprovalDecision:
    """Tests for POST /api/approval/{approval_id}/decide."""

    def test_approve_decision(self, client):
        response = client.post("/api/approval/apr-001/decide", json={
            "reviewer": "Jane Smith",
            "decision": "approved",
            "comments": "Looks great!",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    def test_reject_decision(self, client):
        response = client.post("/api/approval/apr-001/decide", json={
            "reviewer": "Alex Morgan",
            "decision": "rejected",
            "comments": "Needs revision",
        })
        assert response.status_code == 200
        data = response.json()
        assert data["data"]["status"] == "rejected"

    def test_decision_nonexistent_approval(self, client):
        response = client.post("/api/approval/apr-999/decide", json={
            "reviewer": "Test",
            "decision": "approved",
            "comments": "OK",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "error"


class TestApprovalStats:
    """Tests for GET /api/approval/stats."""

    def test_get_stats(self, client):
        response = client.get("/api/approval/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_pending" in data
        assert "total_approved" in data
        assert "total_rejected" in data
        assert "urgent_pending" in data
