import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from app.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture
def mock_ai_service():
    """Mock the AI service to avoid actual API calls during testing."""
    with patch("app.services.ai_service.generate_completion", new_callable=AsyncMock) as mock:
        mock.return_value = '{"mock": "ai_response"}'
        yield mock
