import { FC, useState } from "react";
import { Timer } from "@/components/Timer";
import { cn } from "@/utils/lib";
import { QuizQuestion } from "@/utils/types";
import { AiOutlineArrowRight } from "react-icons/ai";

const NextButtonIconSize = 36;

interface QuestionProps {
  question: QuizQuestion;
  onNextButtonClicked: () => void;
  onTimerFinished: (answer: string) => void;
}

export const Question: FC<QuestionProps> = ({
  question,
  onNextButtonClicked,
  onTimerFinished,
}) => {
  const {
    time,
    question: questionString,
    answer,
    options,
    imageUrl,
  } = question || {};
  const answerString = options?.[answer || 0];
  const [canSelectAnswer, setCanSelectAnswer] = useState(true);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  const onFinished = () => {
    setCanSelectAnswer(false);
    setShowNextQuestionButton(true);
    setShowAnswer(true);
    onTimerFinished(selectedAnswer as string);
  };

  const onSelectAnswer = (answer: string) => () => {
    if (!canSelectAnswer) return;
    setSelectedAnswer(answer);
  };

  return (
    <div className="min-h-screen relative">
      <Timer
        time={time || 0}
        onFinish={onFinished}
        containerClass="absolute right-4 top-4 object-contain"
      />
      <div className="flex flex-col lg:flex-row lg:items-center min-h-screen">
        <img src={imageUrl} className="lg:w-1/2" />
        <div className="px-4 lg:flex lg:justify-center lg:flex-col lg:ml-[5%]">
          <div className="text-4xl font-bold">{questionString}</div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {options?.map((option) => (
              <button
                className={cn(
                  "border-2 rounded-md p-2 flex items-center justify-center text-center text-xl",
                  {
                    "border-blue-700": option === selectedAnswer,
                    "!border-red-700":
                      option !== selectedAnswer &&
                      option === answerString &&
                      showAnswer,
                    "!border-green-700":
                      option === selectedAnswer &&
                      option === answerString &&
                      showAnswer,
                  }
                )}
                onClick={onSelectAnswer(option)}
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
          {showNextQuestionButton && (
            <button
              className="mt-8 self-end bg-primary outline-none py-2 px-4 rounded-md"
              data-testid="next-button-icon"
              onClick={onNextButtonClicked}
            >
              <AiOutlineArrowRight
                style={{ color: "white" }}
                size={NextButtonIconSize}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
