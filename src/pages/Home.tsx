import { useEffect, useState } from "react";
import { fetchQuestions } from "@/api/questions";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "@/context/useDataStore";
import { PATH } from "@/utils/const";

export const Home = () => {
  const { setQuestions, questions } = useDataStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (Object.values(questions)?.length) return;

    const getQuestions = async () => {
      setLoading(true);
      const data = await fetchQuestions();
      setQuestions(data);
      setLoading(false);
      return navigation(`${PATH.QUESTION}/0`);
    };

    getQuestions();
  }, [setQuestions, questions, navigation]);

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return <div>Home</div>;
};
