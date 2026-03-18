import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default styling", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("border");
    expect(card.className).toContain("bg-white");
    expect(card.className).toContain("p-6");
    expect(card.className).toContain("shadow-sm");
  });

  it("applies hover styles when hover prop is true", () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("hover:shadow-md");
    expect(card.className).toContain("cursor-pointer");
  });

  it("does not apply hover styles by default", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("cursor-pointer");
  });

  it("accepts custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes additional HTML attributes", () => {
    render(<Card data-testid="test-card">Content</Card>);
    expect(screen.getByTestId("test-card")).toBeInTheDocument();
  });
});
