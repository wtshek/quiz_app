import { describe, expect, test, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import { Question } from "./Question";

const second = 1000;

describe("Question Component", () => {
  const mockQuestion = {
    time: 60,
    question: "What is the capital of France?",
    answer: 2,
    options: ["London", "New York", "Paris", "Berlin"],
    imageUrl: "https://example.com/image.jpg",
  };

  test("renders without crashing", () => {
    render(
      <Question
        question={mockQuestion}
        onNextButtonClicked={() => {}}
        onTimerFinished={() => {}}
      />
    );
  });

  test("displays question text correctly", () => {
    const { getByText } = render(
      <Question
        question={mockQuestion}
        onNextButtonClicked={() => {}}
        onTimerFinished={() => {}}
      />
    );
    const questionText = getByText("What is the capital of France?");
    expect(questionText).toBeInTheDocument();
  });

  test("renders answer options correctly", () => {
    const { getByText } = render(
      <Question
        question={mockQuestion}
        onNextButtonClicked={() => {}}
        onTimerFinished={() => {}}
      />
    );
    const optionLondon = getByText("London");
    const optionNewYork = getByText("New York");
    const optionParis = getByText("Paris");
    const optionBerlin = getByText("Berlin");
    expect(optionLondon).toBeInTheDocument();
    expect(optionNewYork).toBeInTheDocument();
    expect(optionParis).toBeInTheDocument();
    expect(optionBerlin).toBeInTheDocument();
  });

  test("allows selecting an answer", () => {
    const { getByText } = render(
      <Question
        question={mockQuestion}
        onNextButtonClicked={() => {}}
        onTimerFinished={() => {}}
      />
    );
    const optionLondon = getByText("London");
    fireEvent.click(optionLondon);
    expect(optionLondon).toHaveClass("border-blue-700");
  });

  test("displays next question button after timer finishes", async () => {
    vi.useFakeTimers();
    const { queryByTestId, getByTestId } = render(
      <Question
        question={mockQuestion}
        onNextButtonClicked={() => {}}
        onTimerFinished={() => {}}
      />
    );
    const nextButton = queryByTestId("next-button-icon");
    expect(nextButton).not.toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(
      Number(mockQuestion.time) * second + second
    );

    act(() => {
      expect(getByTestId("next-button-icon")).toBeInTheDocument();
    });
  });
});
