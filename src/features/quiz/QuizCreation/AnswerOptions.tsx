"use client";

import { useState } from "react";
import { AnswerOption, QuestionTypeEnum } from "./types";
import AddBlue from "./assets/AddBlue.png";
import Delete from "./assets/Delete.png";

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
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 9C16.5 13.7217 12.8917 17.5 8.5 17.5C4.10826 17.5 0.5 13.7217 0.5 9C0.5 4.27827 4.10826 0.5 8.5 0.5C12.8917 0.5 16.5 4.27827 16.5 9Z" fill="white" stroke="#A5C8E5"/>
              </svg>`,
            }}
          />
        );
      case QuestionTypeEnum.Checkboxes:
        return (
          <div
            className={`w-4 h-4 border border-gray-300 rounded ${
              option.isCorrect ? "bg-blue-500" : "bg-white"
            }`}
          />
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
              {renderOptionIcon(option)}
              <span className="text-sm text-black ml-4 flex-grow">
                {option.text}
              </span>
              <div className="w-20 flex justify-center">
                <button
                  className={`rounded-sm h-[15px] w-[17px] ${
                    option.isCorrect ? "bg-blue-500" : "bg-zinc-300"
                  }`}
                  onClick={() => onToggleCorrect(option.id)}
                  aria-label="Toggle correct answer"
                />
              </div>
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
