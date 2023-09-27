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
    <div className="h-screen w-screen flex justify-center items-center flex-col p-4">
      <div className="text-3xl font-bold">Result</div>
      <div className="font-bold text-2xl">{`${score}/${total.length}`}</div>
      <div className="mt-8">
        {Object.entries(questions)?.map(([key, question]) => {
          const { question: questionString, answer, options } = question;
          const answerString = options[answer];
          const selectedAnswer = answers[Number(key)];

          return (
            <div key={key} className="mt-4">
              <div className="text-xl">{questionString}</div>
              {!selectedAnswer.isCorrect && (
                <div className="text-red-700">
                  {answers[Number(key)]?.answer}
                </div>
              )}
              <div className="text-green-700">{answerString}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
