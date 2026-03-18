import { render, screen } from "@testing-library/react";
import SentimentPage from "@/app/sentiment/page";

describe("Sentiment Page", () => {
  it("renders the page title", () => {
    render(<SentimentPage />);
    expect(screen.getByText("Sentiment Explainer")).toBeInTheDocument();
  });

  it("renders sample mentions", () => {
    render(<SentimentPage />);
    expect(screen.getByText(/Rising AI Startups/)).toBeInTheDocument();
    expect(screen.getByText(/Agentic AI Is Overhyped/)).toBeInTheDocument();
  });

  it("renders sentiment type selector", () => {
    render(<SentimentPage />);
    expect(screen.getByText("TechCrunch")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });
});
