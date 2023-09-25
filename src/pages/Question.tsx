import { useCallback, useEffect, useState } from "react";
import { Timer } from "@/components/Timer";
import { cn } from "@/utils/lib";
import { useNavigate, useParams } from "react-router-dom";
import { useDataStore } from "@/context/useDataStore";
import { PATH } from "@/utils/const";

export const Question = () => {
  const { questions, setAnswers } = useDataStore();
  const { questionId } = useParams();
  const { imageUrl, question, options, time, answer } =
    questions?.[Number(questionId) || 0] || {};
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const answerInString = options?.[answer || 0];
  const navigate = useNavigate();

  useEffect(() => {
    if (!questions || questions?.length === 0) navigate(PATH.HOME);
  }, [questions, navigate]);

  const onFinished = () => {
    console.log("onFinished");
  };

  const onAnswerSelected = (answer: string) => () => {
    setSelectedAnswer(answer);
    setAnswers({ answer, isCorrect: answer === answerInString });
  };

  const onNextQuestionButtonClicked = useCallback(() => {
    const to =
      Number(questionId) + 1 <= questions.length - 1
        ? `${PATH.QUESTION}/${Number(questionId) + 1}`
        : PATH.RESULT;
    navigate(to);
  }, [questionId, navigate, questions.length]);

  return (
    <div>
      <Timer
        time={time || 0}
        onFinish={onFinished}
        containerClass="absolute right-4 top-4 object-contain"
      />
      <img src={imageUrl} />
      <div className="px-4 flex flex-col">
        <div className="text-4xl font-bold">{question}</div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {options?.map((option) => (
            <button
              className={cn(
                "border-2 rounded-md p-2 flex items-center justify-center text-center text-xl",
                {
                  "border-green-700":
                    option === selectedAnswer &&
                    selectedAnswer === answerInString,
                  "border-red-700":
                    option === selectedAnswer &&
                    selectedAnswer !== undefined &&
                    selectedAnswer !== answerInString,
                }
              )}
              onClick={onAnswerSelected(option)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== undefined && (
          <button
            className="mt-8 self-end"
            onClick={onNextQuestionButtonClicked}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};
