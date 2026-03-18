import { render, screen } from "@testing-library/react";
import EditorialCalendarPage from "@/app/editorial-calendar/page";

describe("Editorial Calendar Page", () => {
  it("renders the page title", () => {
    render(<EditorialCalendarPage />);
    expect(screen.getByText("Editorial Calendar")).toBeInTheDocument();
  });

  it("renders current month", () => {
    render(<EditorialCalendarPage />);
    expect(screen.getByText("March 2026")).toBeInTheDocument();
  });

  it("renders event type legend", () => {
    render(<EditorialCalendarPage />);
    expect(screen.getByText("Press Releases")).toBeInTheDocument();
    expect(screen.getByText("Social Posts")).toBeInTheDocument();
    expect(screen.getByText("Embargoes")).toBeInTheDocument();
  });
});
