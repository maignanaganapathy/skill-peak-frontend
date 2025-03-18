"use client";

import { useState } from "react";
import { AnswerOption, QuestionTypeEnum } from "./types";
import AddBlue from "./assets/AddBlue.png";
import Delete from "./assets/Delete.png";

// MUI Icons
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

interface AnswerOptionsProps {
  options: AnswerOption[];
  questionType: QuestionTypeEnum;
  onAddOption: (text: string) => void;
  onDeleteOption: (id: number) => void;
  onToggleCorrect: (id: number) => void;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  questionType,
  onAddOption,
  onDeleteOption,
  onToggleCorrect,
}) => {
  const [showNewOptionInput, setShowNewOptionInput] = useState(false);
  const [newOptionText, setNewOptionText] = useState("");

  const handleAddOption = () => {
    if (newOptionText.trim()) {
      onAddOption(newOptionText.trim());
      setNewOptionText("");
      setShowNewOptionInput(false);
    }
  };

  const renderOptionIcon = (option: AnswerOption) => {
    switch (questionType) {
      case QuestionTypeEnum.YesNo:
      case QuestionTypeEnum.MultipleChoice:
        return <RadioButtonUncheckedIcon className="text-gray-400 w-5 h-5" />;
      case QuestionTypeEnum.Checkboxes:
        return option.isCorrect ? (
          <CheckBoxIcon className="text-blue-500 w-5 h-5" />
        ) : (
          <CheckBoxOutlineBlankIcon className="text-gray-400 w-5 h-5" />
        );
      default:
        return null;
    }
  };

  if (questionType === QuestionTypeEnum.TextField) {
    return (
      <div className="mt-5">
        <span className="text-sm text-gray-500">
          Text field answer will be provided by user
        </span>
      </div>
    );
  }

  return (
    <section className="mt-5">
      <h3 className="mb-2.5 text-sm text-black">Answer</h3>
      <div className="flex flex-col">
        <div className="flex items-center mb-2 px-2">
          <div className="flex-grow"></div>
          <div className="w-20 text-sm font-medium text-gray-600 text-center">
            Correct
          </div>
          <div className="w-20 text-sm font-medium text-gray-600 text-center">
            Delete
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {options.map((option) => (
            <div key={option.id} className="flex items-center px-2">
              {/* Static radio/checkbox icon for display */}
              {renderOptionIcon(option)}
              <span className="text-sm text-black ml-4 flex-grow">
                {option.text}
              </span>
              {/* Correct button with MUI CheckCircleOutlineOutlinedIcon */}
              <div className="w-20 flex justify-center">
  <button
    className={`rounded-full ${
      option.isCorrect ? "text-blue-500" : "text-gray-400"
    } flex items-center justify-center`}
    onClick={() => onToggleCorrect(option.id)}
    aria-label="Toggle correct answer"
  >
    <CheckCircleOutlineOutlinedIcon fontSize="small" />
  </button>
</div>

            
              {/* Delete button */}
              <div className="w-20 flex justify-center">
                <button
                  onClick={() => onDeleteOption(option.id)}
                  className="hover:opacity-75 transition-opacity"
                >
                  <img
                    src={Delete}
                    className="h-[19px] w-[19px]"
                    alt="Delete option"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new option input */}
        {showNewOptionInput ? (
          <div className="flex gap-2.5 items-center px-2 mt-4">
            <input
              type="text"
              value={newOptionText}
              onChange={(e) => setNewOptionText(e.target.value)}
              placeholder="Add Option"
              className="p-1.5 text-sm rounded border border-solid border-black border-opacity-30 h-[29px] text-black text-opacity-60 w-[159px]"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddOption();
                }
              }}
              autoFocus
            />
            <button
              onClick={handleAddOption}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowNewOptionInput(false);
                setNewOptionText("");
              }}
              className="text-sm text-red-500 hover:text-red-600 ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5 items-center px-2 mt-4">
            <button onClick={() => setShowNewOptionInput(true)}>
              <img
                src={AddBlue}
                className="h-[25px] w-[25px]"
                alt="Add option"
              />
            </button>
            <span
              className="text-sm text-black cursor-pointer"
              onClick={() => setShowNewOptionInput(true)}
            >
              Add Option
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
