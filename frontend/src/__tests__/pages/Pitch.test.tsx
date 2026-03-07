import { render, screen } from "@testing-library/react";
import PitchPage from "@/app/pitch/page";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe("Pitch Page", () => {
  it("renders the page title", () => {
    render(<PitchPage />);
    expect(screen.getByText("Media Pitch Generator")).toBeInTheDocument();
  });

  it("renders pitch templates", () => {
    render(<PitchPage />);
    expect(screen.getByText("Exclusive Offer")).toBeInTheDocument();
    expect(screen.getByText("Embargo Pitch")).toBeInTheDocument();
    expect(screen.getByText("Data Story")).toBeInTheDocument();
    expect(screen.getByText("Trend Piece")).toBeInTheDocument();
    expect(screen.getByText("Expert Source")).toBeInTheDocument();
  });

  it("renders the pitch form fields", () => {
    render(<PitchPage />);
    expect(screen.getByPlaceholderText(/journalist/i)).toBeInTheDocument();
  });

  it("renders recent pitches section", () => {
    render(<PitchPage />);
    expect(screen.getByText("Recent Pitches")).toBeInTheDocument();
    expect(screen.getByText(/Sarah Chen/)).toBeInTheDocument();
    expect(screen.getByText(/Marcus Rivera/)).toBeInTheDocument();
  });
});
