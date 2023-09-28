import { useState, useEffect, FC } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { cn } from "@/utils/lib";

import "react-circular-progressbar/dist/styles.css";

type TimerProps = {
  time: number;
  onFinish: () => void;
  containerClass?: string;
};

export const Timer: FC<TimerProps> = ({ time, onFinish, containerClass }) => {
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
    <div
      className={cn(
        "flex items-center justify-center w-24 h-24",
        containerClass
      )}
    >
      <CircularProgressbar
        value={(seconds / time) * 100}
        text={`${seconds}`}
        styles={buildStyles({ textSize: "1.5rem" })}
      />
    </div>
  );
};

export default Timer;
