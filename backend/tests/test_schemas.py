"""Tests for Pydantic schema validation."""

import pytest
from pydantic import ValidationError
from app.models.schemas import (
    StrategyBrief,
    PressReleaseRequest,
    SocialContentRequest,
    CampaignRequest,
)


class TestStrategyBrief:
    """Tests for StrategyBrief schema."""

    def test_valid_brief(self):
        brief = StrategyBrief(
            company_name="Acme",
            objective="Launch product",
            context="SaaS startup",
        )
        assert brief.company_name == "Acme"

    def test_brief_with_optional_fields(self):
        brief = StrategyBrief(
            company_name="Acme",
            objective="Launch",
            context="Context",
            timeline="Q2 2026",
            budget="$10k",
            constraints="None",
        )
        assert brief.timeline == "Q2 2026"
        assert brief.budget == "$10k"

    def test_brief_optional_defaults_to_none(self):
        brief = StrategyBrief(
            company_name="Acme",
            objective="Launch",
            context="Context",
        )
        assert brief.timeline is None
        assert brief.budget is None
        assert brief.constraints is None

    def test_brief_missing_required_field(self):
        with pytest.raises(ValidationError):
            StrategyBrief(company_name="Acme")


class TestPressReleaseRequest:
    """Tests for PressReleaseRequest schema."""

    def test_valid_request(self):
        req = PressReleaseRequest(
            headline="Big News",
            announcement="We launched",
        )
        assert req.headline == "Big News"

    def test_default_values(self):
        req = PressReleaseRequest(
            headline="News",
            announcement="Details",
        )
        assert req.brand_voice == "professional"
        assert req.format == "traditional"

    def test_custom_brand_voice(self):
        req = PressReleaseRequest(
            headline="News",
            announcement="Details",
            brand_voice="conversational",
            format="social",
        )
        assert req.brand_voice == "conversational"
        assert req.format == "social"

    def test_missing_headline(self):
        with pytest.raises(ValidationError):
            PressReleaseRequest(announcement="Details")

    def test_missing_announcement(self):
        with pytest.raises(ValidationError):
            PressReleaseRequest(headline="News")


class TestSocialContentRequest:
    """Tests for SocialContentRequest schema."""

    def test_valid_request(self):
        req = SocialContentRequest(
            topic="Product launch",
            platforms=["linkedin", "twitter"],
        )
        assert req.topic == "Product launch"
        assert len(req.platforms) == 2

    def test_default_values(self):
        req = SocialContentRequest(
            topic="Test",
            platforms=["linkedin"],
        )
        assert req.content_type == "text"
        assert req.brand_voice == "professional"

    def test_missing_topic(self):
        with pytest.raises(ValidationError):
            SocialContentRequest(platforms=["linkedin"])

    def test_missing_platforms(self):
        with pytest.raises(ValidationError):
            SocialContentRequest(topic="Test")


class TestCampaignRequest:
    """Tests for CampaignRequest schema."""

    def test_valid_request(self):
        req = CampaignRequest(
            name="Launch",
            objective="Awareness",
            target_audience="Developers",
            start_date="2026-04-01",
            end_date="2026-06-30",
        )
        assert req.name == "Launch"

    def test_with_budget(self):
        req = CampaignRequest(
            name="Launch",
            objective="Awareness",
            target_audience="Devs",
            start_date="2026-04-01",
            end_date="2026-06-30",
            budget="$25,000",
        )
        assert req.budget == "$25,000"

    def test_budget_defaults_to_none(self):
        req = CampaignRequest(
            name="Test",
            objective="Test",
            target_audience="Test",
            start_date="2026-01-01",
            end_date="2026-03-31",
        )
        assert req.budget is None

    def test_missing_required_fields(self):
        with pytest.raises(ValidationError):
            CampaignRequest(name="Test")
