import { render, screen } from "@testing-library/react";
import ClipbookPage from "@/app/clipbook/page";

describe("Clipbook Page", () => {
  it("renders the page title", () => {
    render(<ClipbookPage />);
    expect(screen.getByText("Media Clipbook")).toBeInTheDocument();
  });

  it("renders existing clipbooks", () => {
    render(<ClipbookPage />);
    expect(screen.getByText(/Q1 2026 Media Coverage/)).toBeInTheDocument();
    expect(screen.getByText(/Product Launch Coverage/)).toBeInTheDocument();
  });

  it("renders mention counts", () => {
    render(<ClipbookPage />);
    expect(screen.getByText(/23 mentions/)).toBeInTheDocument();
    expect(screen.getByText(/8 mentions/)).toBeInTheDocument();
  });
});
