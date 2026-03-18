import { render, screen, fireEvent } from "@testing-library/react";
import MonitoringPage from "@/app/monitoring/page";

describe("Monitoring Page", () => {
  it("renders the page title", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("Monitoring")).toBeInTheDocument();
  });

  it("renders stats cards", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("Total Mentions")).toBeInTheDocument();
    expect(screen.getByText("Total Reach")).toBeInTheDocument();
    // Positive/Neutral/Negative appear in both stat cards and filter buttons
    expect(screen.getAllByText("Positive").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Neutral").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Negative").length).toBeGreaterThanOrEqual(1);
  });

  it("renders mention items", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("Rising AI Startups to Watch in 2026")).toBeInTheDocument();
    expect(screen.getByText("Thread on AI PR tools")).toBeInTheDocument();
  });

  it("renders sentiment trend chart placeholder", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("Sentiment Trend")).toBeInTheDocument();
  });

  it("renders AI monitoring insights", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("AI Monitoring Insights")).toBeInTheDocument();
    expect(screen.getByText("Key Narrative")).toBeInTheDocument();
    expect(screen.getByText("Emerging Topic")).toBeInTheDocument();
    expect(screen.getByText("Risk Alert")).toBeInTheDocument();
  });

  it("filters mentions by sentiment", () => {
    render(<MonitoringPage />);
    const negativeBtn = screen.getByRole("button", { name: "Negative" });
    fireEvent.click(negativeBtn);
    expect(screen.getByText("Why Agentic AI Is Overhyped")).toBeInTheDocument();
    expect(screen.queryByText("Rising AI Startups to Watch in 2026")).not.toBeInTheDocument();
  });

  it("renders period selector", () => {
    render(<MonitoringPage />);
    const periodSelect = screen.getByDisplayValue("Last 7 days");
    expect(periodSelect).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<MonitoringPage />);
    expect(screen.getByText("Export")).toBeInTheDocument();
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });
});
