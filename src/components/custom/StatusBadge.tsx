import React from "react";

interface StatusBadgeProps {
  expiryDate: string | Date;
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ expiryDate, status }) => {
  const expiry = new Date(expiryDate);
  const now = new Date();

  let statusText = "";
  let statusClass = "";

  if (status === "COMPLETED") {
    statusText = "Completed";
    statusClass =
      "bg-green-500 text-white px-2 text-center py-1 rounded-full text-xs";
  } else if (expiry < now) {
    statusText = "Expired";
    statusClass =
      "bg-red-500 text-white px-2 text-center py-1 rounded-full text-xs";
  } else {
    statusText = "Ongoing";
    statusClass =
      "bg-yellow-500 text-black px-2 text-center py-1 rounded-full text-xs";
  }

  return <div className={statusClass}>{statusText}</div>;
};

export default StatusBadge;
