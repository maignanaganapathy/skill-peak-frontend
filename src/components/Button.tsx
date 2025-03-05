import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-10 text-lg font-bold text-white bg-blue-900 rounded-md cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
