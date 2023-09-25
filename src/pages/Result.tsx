import { useDataStore } from "@/context/useDataStore";

export const Result = () => {
  const { answers } = useDataStore();
  return <div>Result</div>;
};
