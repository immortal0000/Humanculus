import { render, screen } from "@testing-library/react";
import ApprovalsPage from "@/app/approvals/page";

describe("Approvals Page", () => {
  it("renders the page title", () => {
    render(<ApprovalsPage />);
    expect(screen.getByText("Approval Workflow")).toBeInTheDocument();
  });

  it("renders pending approval items", () => {
    render(<ApprovalsPage />);
    expect(screen.getByText("Partnership Announcement Draft")).toBeInTheDocument();
    expect(screen.getByText("Data Privacy Incident Response Statement")).toBeInTheDocument();
  });

  it("renders filter tabs", () => {
    render(<ApprovalsPage />);
    expect(screen.getByText(/Pending/)).toBeInTheDocument();
    expect(screen.getByText(/Approved/)).toBeInTheDocument();
  });
});
