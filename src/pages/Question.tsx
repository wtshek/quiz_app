import { useNavigate, useParams } from "react-router-dom";
import { useDataStore } from "@/context/useDataStore";
import { PATH } from "@/utils/const";
import { useEffect } from "react";
import { Question as QuestionComponent } from "@/components/Question";

// TODO: add modal showing You Are Correct!

export const Question = () => {
  const { questions, setAnswers } = useDataStore();
  const navigate = useNavigate();
  const { questionId } = useParams();
  const question = questions[Number(questionId)];

  useEffect(() => {
    if (!questions || Object.values(questions)?.length === 0)
      navigate(PATH.HOME);
  }, [questions, navigate]);

  const onNextQuestionButtonClicked = () => {
    const to =
      Number(questionId) + 1 <= Object.values(questions).length - 1
        ? `${PATH.QUESTION}/${Number(questionId) + 1}`
        : PATH.RESULT;
    navigate(to);
  };

  const onTimerFinished = (answer: string | undefined) => {
    const answerString = question.options[question.answer];
    setAnswers(String(questionId), {
      answer: answer || "",
      isCorrect: answer === answerString,
    });
  };

  return (
    <div>
      <QuestionComponent
        onNextButtonClicked={onNextQuestionButtonClicked}
        question={question}
        onTimerFinished={onTimerFinished}
        key={questionId}
      />
    </div>
  );
};
