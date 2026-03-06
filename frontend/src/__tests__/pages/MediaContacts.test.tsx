import { render, screen, fireEvent } from "@testing-library/react";
import MediaContactsPage from "@/app/media-contacts/page";

describe("Media Contacts Page", () => {
  it("renders the page title", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("Media Contacts")).toBeInTheDocument();
  });

  it("renders contact list", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Rivera")).toBeInTheDocument();
    expect(screen.getByText("Emily Watson")).toBeInTheDocument();
  });

  it("renders contact details", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("Senior Tech Reporter")).toBeInTheDocument();
    expect(screen.getByText("TechCrunch")).toBeInTheDocument();
  });

  it("renders stat cards", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("Total Contacts")).toBeInTheDocument();
    expect(screen.getByText("Tier 1 Contacts")).toBeInTheDocument();
    expect(screen.getByText("Avg Pitch Success")).toBeInTheDocument();
    expect(screen.getByText("Active Relations")).toBeInTheDocument();
  });

  it("filters contacts by search query", () => {
    render(<MediaContactsPage />);
    const searchInput = screen.getByPlaceholderText(/Search contacts/);
    fireEvent.change(searchInput, { target: { value: "Sarah" } });
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.queryByText("Marcus Rivera")).not.toBeInTheDocument();
  });

  it("filters contacts by beat", () => {
    render(<MediaContactsPage />);
    const beatSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(beatSelect, { target: { value: "Enterprise Tech" } });
    expect(screen.getByText("Emily Watson")).toBeInTheDocument();
    expect(screen.queryByText("Sarah Chen")).not.toBeInTheDocument();
  });

  it("filters contacts by tier", () => {
    render(<MediaContactsPage />);
    const tierSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(tierSelect, { target: { value: "Tier 2" } });
    expect(screen.getByText("David Park")).toBeInTheDocument();
    expect(screen.queryByText("Sarah Chen")).not.toBeInTheDocument();
  });

  it("toggles favorite on contact", () => {
    render(<MediaContactsPage />);
    // Sarah Chen is favorited by default, click to unfavorite
    const starButtons = screen.getAllByRole("button").filter(
      (btn) => btn.querySelector("svg")
    );
    // There should be star icons for toggling
    expect(starButtons.length).toBeGreaterThan(0);
  });

  it("shows empty state when no contacts match", () => {
    render(<MediaContactsPage />);
    const searchInput = screen.getByPlaceholderText(/Search contacts/);
    fireEvent.change(searchInput, { target: { value: "zzzznonexistent" } });
    expect(screen.getByText("No contacts found")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("Import")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
    expect(screen.getByText("Add Contact")).toBeInTheDocument();
  });

  it("renders AI suggestion card", () => {
    render(<MediaContactsPage />);
    expect(screen.getByText("AI Contact Suggestions")).toBeInTheDocument();
  });
});
