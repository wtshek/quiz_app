import { useDataStore } from "@/context/useDataStore";

export const Result = () => {
  const { questions, answers: answerObject } = useDataStore();
  const answers = answerObject.current || {};
  const total = Object.values(answers);
  const score = total.reduce(
    (acc, answer) => (acc += answer?.isCorrect ? 1 : 0),
    0
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col p-4 bg-primary text-white font-semibold">
      <div className="text-5xl font-bold font-pixel">Result</div>
      <div className="font-bold text-3xl font-pixel">{`${score}/${total.length}`}</div>
      <div className="mt-8">
        {Object.entries(questions)?.map(([key, question]) => {
          const { question: questionString, answer, options } = question;
          const answerString = options[answer];
          const selectedAnswer = answers[Number(key)];

          return (
            <div key={key} className="mt-12">
              <div className="text-xl">{questionString}</div>
              {!selectedAnswer.isCorrect && (
                <div className="text-[#ff0000]">
                  {answers[Number(key)]?.answer}
                </div>
              )}
              <div className="text-[#00ff38]">{answerString}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
