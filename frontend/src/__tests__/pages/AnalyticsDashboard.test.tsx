import { render, screen } from "@testing-library/react";
import AnalyticsDashboardPage from "@/app/analytics-dashboard/page";

describe("Analytics Dashboard Page", () => {
  it("renders the page title", () => {
    render(<AnalyticsDashboardPage />);
    expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument();
  });

  it("renders overview metrics", () => {
    render(<AnalyticsDashboardPage />);
    expect(screen.getByText("Total Reach")).toBeInTheDocument();
    expect(screen.getByText("Total Mentions")).toBeInTheDocument();
    expect(screen.getByText("Media Value")).toBeInTheDocument();
  });

  it("renders metric values", () => {
    render(<AnalyticsDashboardPage />);
    expect(screen.getByText("12.4M")).toBeInTheDocument();
    expect(screen.getByText("156")).toBeInTheDocument();
    expect(screen.getByText("$245K")).toBeInTheDocument();
  });

  it("renders channel breakdown", () => {
    render(<AnalyticsDashboardPage />);
    expect(screen.getByText("Media Coverage")).toBeInTheDocument();
    expect(screen.getByText("Social Media")).toBeInTheDocument();
  });
});
