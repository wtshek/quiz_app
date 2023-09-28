import { useEffect } from "react";
import { fetchQuestions } from "@/api/questions";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "@/context/useDataStore";
import { PATH } from "@/utils/const";

const second = 1000;

export const Home = () => {
  const { setQuestions, questions } = useDataStore();
  const navigation = useNavigate();

  useEffect(() => {
    if (Object.values(questions)?.length) return;

    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
      setTimeout(() => navigation(`${PATH.QUESTION}/0`), second);
    };

    getQuestions();
  }, [setQuestions, questions, navigation]);

  return (
    <div className="w-screen h-screen bg-primary text-white flex justify-center items-center font-pixel text-5xl">
      Loading...
    </div>
  );
};
