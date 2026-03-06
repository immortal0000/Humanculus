import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("renders without label", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Name" id="name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("applies error styling", () => {
    render(<Input error="Error" placeholder="test" />);
    const input = screen.getByPlaceholderText("test");
    expect(input.className).toContain("border-red-500");
  });

  it("handles value changes", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} placeholder="type here" />);
    fireEvent.change(screen.getByPlaceholderText("type here"), {
      target: { value: "hello" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies custom className", () => {
    render(<Input className="custom" placeholder="test" />);
    expect(screen.getByPlaceholderText("test").className).toContain("custom");
  });

  it("supports different input types", () => {
    render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText("email")).toHaveAttribute("type", "email");
  });
});
