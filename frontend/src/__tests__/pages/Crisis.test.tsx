import { render, screen, fireEvent } from "@testing-library/react";
import CrisisCenterPage from "@/app/crisis/page";

describe("Crisis Center Page", () => {
  it("renders the page title", () => {
    render(<CrisisCenterPage />);
    expect(screen.getByText("Crisis Center")).toBeInTheDocument();
  });

  it("renders threat level banner", () => {
    render(<CrisisCenterPage />);
    expect(screen.getByText("ELEVATED")).toBeInTheDocument();
    expect(screen.getByText("Current Threat Level")).toBeInTheDocument();
  });

  it("renders stats cards", () => {
    render(<CrisisCenterPage />);
    expect(screen.getAllByText("Active Alerts").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Monitoring").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Resolved (30d)")).toBeInTheDocument();
    expect(screen.getByText("Avg Response Time")).toBeInTheDocument();
  });

  it("renders alert items", () => {
    render(<CrisisCenterPage />);
    expect(screen.getByText("Negative Press Coverage - Data Practices")).toBeInTheDocument();
    expect(screen.getByText("Social Media Backlash - Product Issue")).toBeInTheDocument();
  });

  it("renders severity badges", () => {
    render(<CrisisCenterPage />);
    expect(screen.getAllByText("HIGH").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("MEDIUM").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("LOW").length).toBeGreaterThanOrEqual(1);
  });

  it("renders tabs", () => {
    render(<CrisisCenterPage />);
    expect(screen.getAllByText("Active Alerts").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Response Playbooks")).toBeInTheDocument();
    expect(screen.getByText("Crisis Team")).toBeInTheDocument();
  });

  it("switches to playbooks tab", () => {
    render(<CrisisCenterPage />);
    fireEvent.click(screen.getByText("Response Playbooks"));
    expect(screen.getByText("Data Breach Response")).toBeInTheDocument();
    expect(screen.getByText("Product Issue Acknowledgment")).toBeInTheDocument();
  });

  it("switches to crisis team tab", () => {
    render(<CrisisCenterPage />);
    fireEvent.click(screen.getByText("Crisis Team"));
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("Crisis Lead")).toBeInTheDocument();
    expect(screen.getByText("Jordan Lee")).toBeInTheDocument();
  });

  it("renders AI crisis assistant card", () => {
    render(<CrisisCenterPage />);
    expect(screen.getByText("AI Crisis Assistant")).toBeInTheDocument();
    expect(screen.getByText("Generate Response Plan")).toBeInTheDocument();
  });

  it("renders declare crisis button", () => {
    render(<CrisisCenterPage />);
    expect(screen.getByText("Declare Crisis")).toBeInTheDocument();
  });
});
