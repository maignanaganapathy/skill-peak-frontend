import React from "react";

interface StatCardProps {
  number: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="flex flex-col justify-center items-center w-60 bg-blue-300 rounded-2xl h-[139px] max-sm:w-full">
      <div className="text-5xl font-extrabold">{number}</div>
      <div className="text-base">{label}</div>
    </div>
  );
};
