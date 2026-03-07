import { render, screen } from "@testing-library/react";
import MeetingPrepPage from "@/app/meeting-prep/page";

describe("Meeting Prep Page", () => {
  it("renders the page title", () => {
    render(<MeetingPrepPage />);
    expect(screen.getByText("Meeting Prep Brief")).toBeInTheDocument();
  });

  it("renders meeting type options", () => {
    render(<MeetingPrepPage />);
    expect(screen.getByText("Media Interview")).toBeInTheDocument();
    expect(screen.getByText("Press Briefing")).toBeInTheDocument();
    expect(screen.getByText("Podcast")).toBeInTheDocument();
  });

  it("renders form inputs", () => {
    render(<MeetingPrepPage />);
    expect(screen.getByPlaceholderText("Sarah Chen")).toBeInTheDocument();
  });
});
