import React from "react";
import logo from "../../../assets/logo.svg"; // adjust the path if needed

export const QuizHeader = () => {
  return (
    <header className="flex items-center px-6 py-4 w-full bg-[#3E7CB1] h-24 md:px-12 lg:px-16 max-md:h-20 max-sm:px-4 max-sm:h-16">
      <img
        src={logo}
        className="h-16 w-auto md:h-20 max-sm:w-20 max-sm:h-auto"
        alt="Logo"
      />
      <div className="flex-grow flex justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white max-sm:text-xl">
          QUIZ MANAGEMENT
        </h1>
      </div>
    </header>
  );
};