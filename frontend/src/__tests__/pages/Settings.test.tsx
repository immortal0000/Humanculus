import { render, screen, fireEvent } from "@testing-library/react";
import SettingsPage from "@/app/settings/page";

describe("Settings Page", () => {
  it("renders the page title", () => {
    render(<SettingsPage />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders sidebar navigation sections", () => {
    render(<SettingsPage />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Brand Voice")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(screen.getAllByText("API Keys").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Billing")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it("shows profile section by default", () => {
    render(<SettingsPage />);
    expect(screen.getByText("Profile Information")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
  });

  it("switches to notifications section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    expect(screen.getByText("Notification Preferences")).toBeInTheDocument();
    expect(screen.getByText("Crisis Alerts")).toBeInTheDocument();
    expect(screen.getByText("Weekly Digest")).toBeInTheDocument();
  });

  it("switches to brand voice section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /Brand Voice/ }));
    expect(screen.getByText("Brand Voice Settings")).toBeInTheDocument();
    expect(screen.getByText("Professional")).toBeInTheDocument();
    expect(screen.getByText("Conversational")).toBeInTheDocument();
  });

  it("switches to integrations section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /Integrations/ }));
    expect(screen.getByText("Connected Integrations")).toBeInTheDocument();
    expect(screen.getByText("Slack")).toBeInTheDocument();
    expect(screen.getByText("Google Analytics")).toBeInTheDocument();
  });

  it("switches to API keys section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /API Keys/ }));
    expect(screen.getByText("Production API Key")).toBeInTheDocument();
  });

  it("switches to billing section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /Billing/ }));
    expect(screen.getByText("Professional Plan")).toBeInTheDocument();
    expect(screen.getByText(/\$49\/month/)).toBeInTheDocument();
  });

  it("switches to security section", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByRole("button", { name: /Security/ }));
    expect(screen.getByText("Security Settings")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
    expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
  });

  it("shows save button", () => {
    render(<SettingsPage />);
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("save button changes to Saved! on click", () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText("Save Changes"));
    expect(screen.getByText("Saved!")).toBeInTheDocument();
  });
});
