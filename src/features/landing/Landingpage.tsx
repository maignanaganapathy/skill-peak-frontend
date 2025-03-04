"use client";

import React from "react";
import Navbar from "../../components/Navbar"; // Correct relative path

const LandingPage = () => {
  return (
    <>
      <Navbar /> 
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Welcome to the Landing Page!</h1>
      </div>
    </>
  );
};

export default LandingPage;
