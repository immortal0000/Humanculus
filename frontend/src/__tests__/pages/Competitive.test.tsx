import { render, screen } from "@testing-library/react";
import CompetitivePage from "@/app/competitive/page";

describe("Competitive Page", () => {
  it("renders the page title", () => {
    render(<CompetitivePage />);
    expect(screen.getByText("Competitive Intelligence")).toBeInTheDocument();
  });

  it("renders company name input", () => {
    render(<CompetitivePage />);
    expect(screen.getByPlaceholderText("Humanculus")).toBeInTheDocument();
  });

  it("renders competitor inputs", () => {
    render(<CompetitivePage />);
    expect(screen.getByPlaceholderText("Competitor 1")).toBeInTheDocument();
  });
});
