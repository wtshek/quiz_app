import { QuizQuestion } from "@/utils/types";

const baseURL = `https://scs-interview-api.herokuapp.com`;

export const fetchQuestions = async (): Promise<QuizQuestion[]> => {
  const res = await fetch(`${baseURL}/questions`);
  const questions = await res.json();

  return questions.reduce(
    (
      obj: { [key: number]: QuizQuestion },
      curr: QuizQuestion,
      currIndex: number
    ) => {
      obj[currIndex] = curr;
      return obj;
    },
    {}
  );
};
