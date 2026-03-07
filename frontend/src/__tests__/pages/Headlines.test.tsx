import { render, screen } from "@testing-library/react";
import HeadlinesPage from "@/app/headlines/page";

describe("Headlines Page", () => {
  it("renders the page title", () => {
    render(<HeadlinesPage />);
    expect(screen.getByText("Headline A/B Generator")).toBeInTheDocument();
  });

  it("renders goal options", () => {
    render(<HeadlinesPage />);
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Click-Through")).toBeInTheDocument();
    expect(screen.getByText("SEO")).toBeInTheDocument();
  });

  it("renders empty state before generation", () => {
    render(<HeadlinesPage />);
    expect(screen.getAllByText("Generate Headlines").length).toBeGreaterThanOrEqual(1);
  });
});
