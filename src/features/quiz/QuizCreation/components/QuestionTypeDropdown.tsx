import { useState, useRef, useEffect } from "react";
import { QuestionTypeEnum } from "../../types/quiz";

import Chevron from "../assets/Chevron.png";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface QuestionTypeDropdownProps {
  currentType: QuestionTypeEnum;
  onTypeChange: (type: QuestionTypeEnum) => void;
}

export const QuestionTypeDropdown: React.FC<QuestionTypeDropdownProps> = ({
  currentType,
  onTypeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeSelect = (type: QuestionTypeEnum) => {
    onTypeChange(type);
    setIsOpen(false);
  };

  const questionTypes = [
    QuestionTypeEnum.YES_NO,
    QuestionTypeEnum.IMG,
    QuestionTypeEnum.TEXT,
  ];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-1.5 ml-16 bg-white rounded hover:bg-gray-50 transition-colors"
      >
        <span className="mr-2.5 text-sm text-black">{currentType}</span>
        <img
          src={Chevron}
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          alt="Chevron"
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-[160px]">
          <ul className="py-1">
            {questionTypes.map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleTypeSelect(type)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    currentType === type
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};