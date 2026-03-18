import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "@/components/ui/Textarea";

describe("Textarea", () => {
  it("renders without label", () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Textarea label="Description" id="desc" />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Textarea error="Too short" />);
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("applies error styling", () => {
    render(<Textarea error="Error" placeholder="test" />);
    const textarea = screen.getByPlaceholderText("test");
    expect(textarea.className).toContain("border-red-500");
  });

  it("handles value changes", () => {
    const onChange = jest.fn();
    render(<Textarea onChange={onChange} placeholder="type" />);
    fireEvent.change(screen.getByPlaceholderText("type"), {
      target: { value: "hello world" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("has minimum height styling", () => {
    render(<Textarea placeholder="test" />);
    expect(screen.getByPlaceholderText("test").className).toContain("min-h-[100px]");
  });
});
