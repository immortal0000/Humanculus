"""Tests for the Press Release API endpoints."""

import pytest
from unittest.mock import patch, AsyncMock


class TestPressReleaseFormats:
    """Tests for GET /api/press-release/formats."""

    def test_list_formats(self, client):
        """Test that formats endpoint returns correct data."""
        response = client.get("/api/press-release/formats")
        assert response.status_code == 200
        data = response.json()
        assert "formats" in data
        assert len(data["formats"]) == 3

    def test_format_structure(self, client):
        """Test that each format has required fields."""
        response = client.get("/api/press-release/formats")
        for fmt in response.json()["formats"]:
            assert "id" in fmt
            assert "name" in fmt
            assert "description" in fmt

    def test_format_ids(self, client):
        """Test that all expected format IDs are present."""
        response = client.get("/api/press-release/formats")
        ids = [f["id"] for f in response.json()["formats"]]
        assert "traditional" in ids
        assert "multimedia" in ids
        assert "social" in ids


class TestPressReleaseGeneration:
    """Tests for POST /api/press-release/generate."""

    @patch("app.routers.press_release.generate_completion", new_callable=AsyncMock)
    def test_generate_traditional_release(self, mock_ai, client):
        """Test generating a traditional press release."""
        mock_ai.return_value = "FOR IMMEDIATE RELEASE..."
        response = client.post("/api/press-release/generate", json={
            "headline": "Company Launches New Product",
            "announcement": "Company today announced...",
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"

    @patch("app.routers.press_release.generate_completion", new_callable=AsyncMock)
    def test_generate_social_release(self, mock_ai, client):
        """Test generating a social-optimized release."""
        mock_ai.return_value = "social release"
        response = client.post("/api/press-release/generate", json={
            "headline": "Big News",
            "announcement": "We launched",
            "format": "social",
            "brand_voice": "conversational",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "social" in call_args.lower()

    @patch("app.routers.press_release.generate_completion", new_callable=AsyncMock)
    def test_generate_multimedia_release(self, mock_ai, client):
        """Test generating a multimedia release."""
        mock_ai.return_value = "multimedia release"
        response = client.post("/api/press-release/generate", json={
            "headline": "News",
            "announcement": "Announcement",
            "format": "multimedia",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "multimedia" in call_args.lower()

    @patch("app.routers.press_release.generate_completion", new_callable=AsyncMock)
    def test_generate_with_all_fields(self, mock_ai, client):
        """Test generating with all optional fields."""
        mock_ai.return_value = "full release"
        response = client.post("/api/press-release/generate", json={
            "headline": "Big News",
            "subheadline": "Supporting details",
            "announcement": "Full announcement",
            "quotes": '"Great day" - CEO',
            "boilerplate": "Company is a leader...",
            "brand_voice": "authoritative",
            "format": "traditional",
        })
        assert response.status_code == 200
        call_args = mock_ai.call_args[0][1]
        assert "Supporting details" in call_args
        assert "authoritative" in call_args

    def test_generate_missing_headline(self, client):
        """Test that missing headline returns validation error."""
        response = client.post("/api/press-release/generate", json={
            "announcement": "Some announcement",
        })
        assert response.status_code == 422

    def test_generate_missing_announcement(self, client):
        """Test that missing announcement returns validation error."""
        response = client.post("/api/press-release/generate", json={
            "headline": "Some headline",
        })
        assert response.status_code == 422
