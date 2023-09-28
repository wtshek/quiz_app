import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Timer from "./Timer";

const oneSecond = 1000;
const defaultTimer = 10;

describe("Timer component", () => {
  test("should render the timer with the given time", () => {
    render(<Timer time={defaultTimer} onFinish={() => {}} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("should decrement the timer by one second every second", async () => {
    vi.useFakeTimers();
    render(<Timer time={defaultTimer} onFinish={() => {}} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(oneSecond);
    expect(screen.getByText("9")).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(oneSecond);
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  test("should call the onFinish function when the timer reaches zero", async () => {
    vi.useFakeTimers();
    const mockOnFinish = vi.fn();
    render(<Timer time={defaultTimer} onFinish={mockOnFinish} />);
    expect(mockOnFinish).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(oneSecond * 11);
    expect(mockOnFinish).toHaveBeenCalled();
  });

  test("should stop the timer at zero and not go negative", async () => {
    vi.useFakeTimers();
    render(<Timer time={defaultTimer} onFinish={() => {}} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(oneSecond * 11);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
