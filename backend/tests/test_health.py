"""Tests for the health check endpoint."""


def test_health_check(client):
    """Test that the health endpoint returns correct status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["version"] == "0.1.0"


def test_health_check_response_format(client):
    """Test that health check response has correct structure."""
    response = client.get("/api/health")
    data = response.json()
    assert "status" in data
    assert "version" in data
    assert isinstance(data["status"], str)
    assert isinstance(data["version"], str)
