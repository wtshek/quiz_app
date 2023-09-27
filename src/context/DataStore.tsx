import { QuizQuestion } from "@/utils/types";
import { createContext, useRef, useState } from "react";

export type DataStore = {
  questions: { [key: number]: QuizQuestion };
  currentQuestion: number;
  setQuestions: (questions: { [key: number]: QuizQuestion }) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  answers: {
    current:
      | { [key: number]: { answer: string; isCorrect: boolean } }
      | undefined;
  };
  setAnswers: (
    questionId: string | number,
    answer: { answer: string; isCorrect: boolean }
  ) => void;
};

export const DataStoreContext = createContext<DataStore>({
  questions: {},
  currentQuestion: 0,
  setQuestions: () => {},
  setCurrentQuestion: () => {},
  answers: { current: undefined },
  setAnswers: () => {},
});

export const DataStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questions, setQuestions] = useState<{ [key: number]: QuizQuestion }>(
    {}
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const answers = useRef<{ answer: string; isCorrect: boolean }[]>({});

  const onAnswersChange = (
    id: number,
    answer: { answer: string; isCorrect: boolean }
  ) => {
    answers.current[id] = answer;
  };

  const onQuestionsChange = (newQuestions: { [key: number]: QuizQuestion }) => {
    setQuestions(newQuestions);
  };

  const onCurrentQuestionChange = (newCurrentQuestion: number) => {
    setCurrentQuestion(newCurrentQuestion);
  };

  return (
    <DataStoreContext.Provider
      value={{
        questions,
        currentQuestion,
        setCurrentQuestion: onCurrentQuestionChange,
        setQuestions: onQuestionsChange,
        answers: answers,
        setAnswers: onAnswersChange,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};
