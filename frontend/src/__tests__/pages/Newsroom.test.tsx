import { render, screen, fireEvent } from "@testing-library/react";
import NewsroomPage from "@/app/newsroom/page";

describe("Newsroom Page", () => {
  it("renders the page title", () => {
    render(<NewsroomPage />);
    expect(screen.getByText("Newsroom")).toBeInTheDocument();
  });

  it("renders newsroom URL card", () => {
    render(<NewsroomPage />);
    expect(screen.getByText("Your Newsroom URL")).toBeInTheDocument();
    expect(screen.getByText("newsroom.humanculus.com/your-company")).toBeInTheDocument();
  });

  it("renders stats", () => {
    render(<NewsroomPage />);
    expect(screen.getByText("Total Releases")).toBeInTheDocument();
    expect(screen.getAllByText("Media Assets").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Page Views (30d)")).toBeInTheDocument();
    expect(screen.getByText("Asset Downloads")).toBeInTheDocument();
  });

  it("renders press releases by default", () => {
    render(<NewsroomPage />);
    expect(screen.getByText("Humanculus Launches Agentic AI PR Platform")).toBeInTheDocument();
    expect(screen.getByText("New Campaign Dashboard Revolutionizes PR Workflows")).toBeInTheDocument();
  });

  it("shows status badges on press releases", () => {
    render(<NewsroomPage />);
    const publishedBadges = screen.getAllByText("Published");
    expect(publishedBadges.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it("switches to media assets tab", () => {
    render(<NewsroomPage />);
    const mediaAssetsElements = screen.getAllByText("Media Assets");
    const tabButton = mediaAssetsElements.find(
      el => el.closest("button")?.className.includes("border-b-2")
    );
    if (tabButton) fireEvent.click(tabButton);
    else fireEvent.click(mediaAssetsElements[mediaAssetsElements.length - 1]);
    expect(screen.getByText("Company Logo - Primary")).toBeInTheDocument();
    expect(screen.getByText("Executive Headshots Pack")).toBeInTheDocument();
  });

  it("switches to company info tab", () => {
    render(<NewsroomPage />);
    fireEvent.click(screen.getByText("Company Info"));
    expect(screen.getByText("Company Boilerplate")).toBeInTheDocument();
    expect(screen.getByText("Company Details")).toBeInTheDocument();
    expect(screen.getByText("Media Contact")).toBeInTheDocument();
  });

  it("renders tabs navigation", () => {
    render(<NewsroomPage />);
    expect(screen.getAllByText("Press Releases").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Media Assets").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Company Info")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<NewsroomPage />);
    expect(screen.getByText("View Public Page")).toBeInTheDocument();
    expect(screen.getByText("Customize")).toBeInTheDocument();
  });
});
