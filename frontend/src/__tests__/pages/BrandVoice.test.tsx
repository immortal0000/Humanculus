import { render, screen } from "@testing-library/react";
import BrandVoicePage from "@/app/brand-voice/page";

describe("Brand Voice Page", () => {
  it("renders the page title", () => {
    render(<BrandVoicePage />);
    expect(screen.getByText("Brand Voice Analyzer")).toBeInTheDocument();
  });

  it("renders voice presets", () => {
    render(<BrandVoicePage />);
    expect(screen.getByText("Voice Presets")).toBeInTheDocument();
    expect(screen.getByText("Conversational")).toBeInTheDocument();
    expect(screen.getByText("Innovative")).toBeInTheDocument();
    expect(screen.getByText("Empathetic")).toBeInTheDocument();
  });

  it("renders content sample inputs", () => {
    render(<BrandVoicePage />);
    expect(screen.getByText("Content Samples")).toBeInTheDocument();
  });
});
