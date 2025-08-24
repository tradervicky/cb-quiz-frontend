import React from "react";
import { Skeleton } from "../ui/skeleton";

const QuizLoader = () => {
  const rows = 5;
  const cols = 2;
  return (
    <div>
      <div className=" flex flex-col gap-4 bg-muted p-3">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-[250px] w-full" />
        ))}
      </div>
    </div>
  );
};

export default QuizLoader;
