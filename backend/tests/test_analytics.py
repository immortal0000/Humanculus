"""Tests for the Analytics API endpoints."""

import pytest


class TestAnalyticsOverview:
    """Tests for GET /api/analytics/overview."""

    def test_get_overview(self, client):
        response = client.get("/api/analytics/overview")
        assert response.status_code == 200
        data = response.json()
        assert "period" in data
        assert "metrics" in data
        assert "trends" in data

    def test_overview_metrics(self, client):
        response = client.get("/api/analytics/overview")
        metrics = response.json()["metrics"]
        assert "total_reach" in metrics
        assert "total_mentions" in metrics
        assert "media_value" in metrics
        assert "share_of_voice" in metrics
        assert "sentiment_score" in metrics

    def test_overview_trends(self, client):
        response = client.get("/api/analytics/overview")
        trends = response.json()["trends"]
        assert "reach" in trends
        assert "mentions" in trends
        assert "sentiment" in trends
        assert len(trends["reach"]) >= 5


class TestChannelAnalytics:
    """Tests for GET /api/analytics/channels."""

    def test_get_channels(self, client):
        response = client.get("/api/analytics/channels")
        assert response.status_code == 200
        data = response.json()
        assert "channels" in data
        assert len(data["channels"]) == 4

    def test_channel_structure(self, client):
        response = client.get("/api/analytics/channels")
        for channel in response.json()["channels"]:
            assert "name" in channel
            assert "mentions" in channel
            assert "reach" in channel
            assert "sentiment_score" in channel


class TestCampaignAnalytics:
    """Tests for GET /api/analytics/campaigns."""

    def test_get_campaigns(self, client):
        response = client.get("/api/analytics/campaigns")
        assert response.status_code == 200
        data = response.json()
        assert "campaigns" in data
        assert len(data["campaigns"]) == 2

    def test_campaign_structure(self, client):
        response = client.get("/api/analytics/campaigns")
        for campaign in response.json()["campaigns"]:
            assert "id" in campaign
            assert "name" in campaign
            assert "status" in campaign
            assert "progress" in campaign
            assert "metrics" in campaign


class TestSocialAnalytics:
    """Tests for GET /api/analytics/social."""

    def test_get_social(self, client):
        response = client.get("/api/analytics/social")
        assert response.status_code == 200
        data = response.json()
        assert "platforms" in data
        assert len(data["platforms"]) == 3

    def test_social_platform_structure(self, client):
        response = client.get("/api/analytics/social")
        for platform in response.json()["platforms"]:
            assert "name" in platform
            assert "followers" in platform
            assert "engagement_rate" in platform
