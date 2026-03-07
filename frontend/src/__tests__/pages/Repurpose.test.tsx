import { render, screen } from "@testing-library/react";
import RepurposePage from "@/app/repurpose/page";

describe("Repurpose Page", () => {
  it("renders the page title", () => {
    render(<RepurposePage />);
    expect(screen.getByText("Content Repurposer")).toBeInTheDocument();
  });

  it("renders source type options", () => {
    render(<RepurposePage />);
    expect(screen.getAllByText("Press Release").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blog Post").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Speech")).toBeInTheDocument();
  });

  it("renders target format options", () => {
    render(<RepurposePage />);
    expect(screen.getByText("Email Newsletter")).toBeInTheDocument();
    expect(screen.getByText("Talking Points")).toBeInTheDocument();
    expect(screen.getByText("Tweet Thread")).toBeInTheDocument();
  });
});
