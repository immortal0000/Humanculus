import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe("Dashboard Page", () => {
  it("renders the page title", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders the welcome message", () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it("renders all stat cards", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Active Campaigns")).toBeInTheDocument();
    expect(screen.getByText("Press Releases")).toBeInTheDocument();
    expect(screen.getByText("Social Posts")).toBeInTheDocument();
    expect(screen.getByText("Media Mentions")).toBeInTheDocument();
  });

  it("renders stat values", () => {
    render(<DashboardPage />);
    expect(screen.getByText("3")).toBeInTheDocument(); // Active Campaigns
    expect(screen.getByText("12")).toBeInTheDocument(); // Press Releases
    expect(screen.getByText("47")).toBeInTheDocument(); // Social Posts
    expect(screen.getByText("156")).toBeInTheDocument(); // Media Mentions
  });

  it("renders quick actions", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("New Strategy")).toBeInTheDocument();
    expect(screen.getByText("Press Release")).toBeInTheDocument();
    expect(screen.getByText("Social Content")).toBeInTheDocument();
    expect(screen.getByText("New Campaign")).toBeInTheDocument();
  });

  it("renders recent activity items", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
    expect(screen.getByText("Q2 Product Launch Strategy")).toBeInTheDocument();
    expect(screen.getByText("Series A Funding Announcement")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn Campaign - Tech Conference")).toBeInTheDocument();
  });

  it("renders AI agent status section", () => {
    render(<DashboardPage />);
    expect(screen.getByText("AI Agent")).toBeInTheDocument();
    expect(screen.getByText("Agentic Mode")).toBeInTheDocument();
    expect(screen.getByText("Strategy analysis complete")).toBeInTheDocument();
    expect(screen.getByText("Press release drafted")).toBeInTheDocument();
  });

  it("renders upcoming tasks", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Upcoming Tasks")).toBeInTheDocument();
    expect(screen.getByText("Review pitch for TechCrunch")).toBeInTheDocument();
  });

  it("renders Ask AI button", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Ask AI")).toBeInTheDocument();
  });

  it("renders activity status badges", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Draft")).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders quick action links with correct hrefs", () => {
    render(<DashboardPage />);
    const strategyLink = screen.getByText("New Strategy").closest("a");
    expect(strategyLink).toHaveAttribute("href", "/strategy");
    const pressLink = screen.getByText("Press Release").closest("a");
    expect(pressLink).toHaveAttribute("href", "/press-release");
  });
});
