import { render, screen } from "@testing-library/react";
import EmbargoPage from "@/app/embargo/page";

describe("Embargo Page", () => {
  it("renders the page title", () => {
    render(<EmbargoPage />);
    expect(screen.getByText("Embargo Manager")).toBeInTheDocument();
  });

  it("renders embargo entries", () => {
    render(<EmbargoPage />);
    expect(screen.getByText(/Series B Funding/)).toBeInTheDocument();
    expect(screen.getByText(/AI Product Feature/)).toBeInTheDocument();
  });

  it("renders filter tabs", () => {
    render(<EmbargoPage />);
    expect(screen.getAllByText("active").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("lifted")).toBeInTheDocument();
    expect(screen.getByText("all")).toBeInTheDocument();
  });
});
