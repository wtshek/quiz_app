import { QuizQuestion } from "@/utils/types";
import { createContext, useRef, useState } from "react";

export type DataStore = {
  questions: QuizQuestion[];
  currentQuestion: number;
  setQuestions: (questions: QuizQuestion[]) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  answers: { current: { answer: string; isCorrect: boolean }[] | undefined };
  setAnswers: (answer: { answer: string; isCorrect: boolean }) => void;
};

export const DataStoreContext = createContext<DataStore>({
  questions: [],
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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const answers = useRef<{ answer: string; isCorrect: boolean }[]>([]);

  const onAnswersChange = (answer: { answer: string; isCorrect: boolean }) => {
    answers.current = [...answers.current, answer];
    console.log("in context", answers.current);
  };

  const onQuestionsChange = (newQuestions: QuizQuestion[]) => {
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
