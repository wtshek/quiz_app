import { useState, useEffect, FC } from "react";
import { cn } from "@/utils/lib";

type TimerProps = {
  time: number;
  onFinish: () => void;
  containerClass?: string;
  innerContainerClass?: string;
  timerClass?: string;
};

export const Timer: FC<TimerProps> = ({
  time,
  onFinish,
  containerClass,
  innerContainerClass,
  timerClass,
}) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds <= 0 ? 0 : prevSeconds - 1));

      if (seconds === 0) {
        clearInterval(interval);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onFinish]);

  return (
    <div className={cn("flex items-center justify-center", containerClass)}>
      <div
        className={cn(
          "w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center",
          innerContainerClass
        )}
      >
        <h1 className={cn("text-3xl font-bold", timerClass)}>{seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;
