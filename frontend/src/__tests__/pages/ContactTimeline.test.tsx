import { render, screen } from "@testing-library/react";
import ContactTimelinePage from "@/app/contact-timeline/page";

describe("Contact Timeline Page", () => {
  it("renders the page title", () => {
    render(<ContactTimelinePage />);
    expect(screen.getByText("Contact Timeline")).toBeInTheDocument();
  });

  it("renders contact list", () => {
    render(<ContactTimelinePage />);
    expect(screen.getAllByText(/Sarah Chen/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Marcus Rivera/)).toBeInTheDocument();
    expect(screen.getByText(/Emily Watson/)).toBeInTheDocument();
  });

  it("renders stat cards", () => {
    render(<ContactTimelinePage />);
    expect(screen.getByText("Total Interactions")).toBeInTheDocument();
    expect(screen.getByText("Pitches Sent")).toBeInTheDocument();
    expect(screen.getByText("Meetings Held")).toBeInTheDocument();
    expect(screen.getByText("Coverage Secured")).toBeInTheDocument();
  });

  it("renders timeline for selected contact", () => {
    render(<ContactTimelinePage />);
    // Default selected contact is Sarah Chen (c-001)
    expect(screen.getAllByText(/AI PR Platform Exclusive/).length).toBeGreaterThanOrEqual(1);
  });
});
