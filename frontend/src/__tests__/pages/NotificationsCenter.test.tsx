import { render, screen } from "@testing-library/react";
import NotificationsCenterPage from "@/app/notifications-center/page";

describe("Notifications Center Page", () => {
  it("renders the page title", () => {
    render(<NotificationsCenterPage />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders notification items", () => {
    render(<NotificationsCenterPage />);
    expect(screen.getByText(/Negative Press Coverage/)).toBeInTheDocument();
    expect(screen.getByText(/Embargo Lifts Tomorrow/)).toBeInTheDocument();
  });

  it("renders unread count badge", () => {
    render(<NotificationsCenterPage />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders filter buttons", () => {
    render(<NotificationsCenterPage />);
    expect(screen.getByText(/All \(/)).toBeInTheDocument();
    expect(screen.getByText(/Unread \(/)).toBeInTheDocument();
  });

  it("renders notification settings tab", () => {
    render(<NotificationsCenterPage />);
    expect(screen.getAllByText(/settings/i).length).toBeGreaterThanOrEqual(1);
  });
});
