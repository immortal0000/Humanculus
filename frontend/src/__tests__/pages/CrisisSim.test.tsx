import { render, screen } from "@testing-library/react";
import CrisisSimPage from "@/app/crisis-sim/page";

describe("Crisis Simulator Page", () => {
  it("renders the page title", () => {
    render(<CrisisSimPage />);
    expect(screen.getByText("Crisis Scenario Simulator")).toBeInTheDocument();
  });

  it("renders scenario templates", () => {
    render(<CrisisSimPage />);
    expect(screen.getByText("Data Breach")).toBeInTheDocument();
    expect(screen.getByText("Product Recall")).toBeInTheDocument();
    expect(screen.getByText("Executive Scandal")).toBeInTheDocument();
  });

  it("renders severity levels", () => {
    render(<CrisisSimPage />);
    expect(screen.getAllByText(/critical/i).length).toBeGreaterThanOrEqual(1);
  });
});
