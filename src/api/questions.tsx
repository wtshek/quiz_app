import { QuizQuestion } from "../utils/types";

const baseURL = `https://scs-interview-api.herokuapp.com`;

export const fetchQuestions = async (): Promise<QuizQuestion[]> => {
  const res = await fetch(`${baseURL}/questions`);

  return res.json();
};
