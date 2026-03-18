import { render, screen } from "@testing-library/react";
import DistributionPage from "@/app/distribution/page";

describe("Distribution Page", () => {
  it("renders the page title", () => {
    render(<DistributionPage />);
    expect(screen.getByText("Email Distribution")).toBeInTheDocument();
  });

  it("renders distribution history", () => {
    render(<DistributionPage />);
    expect(screen.getByText(/Series A Funding/)).toBeInTheDocument();
    expect(screen.getByText(/New Feature Launch/)).toBeInTheDocument();
  });

  it("renders stat metrics", () => {
    render(<DistributionPage />);
    expect(screen.getByText("Total Sent")).toBeInTheDocument();
    expect(screen.getByText("Avg Open Rate")).toBeInTheDocument();
  });
});
