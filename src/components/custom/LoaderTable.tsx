import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoaderTable = () => {
  const rows = 5;
  const cols = 4;

  return (
    <div className="w-full border rounded-lg overflow-hidden shadow-sm">
      {/* Table Header Loader */}
      <div className="grid grid-cols-4 gap-4 bg-muted p-3">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>

      {/* Table Body Loader */}
      <div className="divide-y">
        {[...Array(rows)].map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 gap-4 p-3">
            {[...Array(cols)].map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-6 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderTable;
