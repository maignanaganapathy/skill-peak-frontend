import React from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../assets/cancel.svg"; // Replace with your close icon path

const CloseButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")} // Change "/landing" to your actual landing page route
      className="absolute top-3 right-3 p-2  border-gray-300 hover:bg-gray-200 transition-all">
      <img src={closeIcon} alt="Close" className="w-7 h-7" />
    </button>
  );
};

export default CloseButton;
