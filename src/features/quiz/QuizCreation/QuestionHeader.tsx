"use client";

import { QuestionTypeEnum } from "./types";
import { QuestionTypeDropdown } from "./QuestionTypeDropdown";
import Duplicate from "./assets/Duplicate.png";
import Up from "./assets/Up.png";
import Down from "./assets/Down.png";
import Delete from "./assets/Delete.png";

interface QuestionHeaderProps {
  questionNumber: number;
  questionType: QuestionTypeEnum;
  onDelete: (questionId: number) => void;
  onMoveUp: (questionId: number) => void;
  onMoveDown: (questionId: number) => void;
  onDuplicate: (questionId: number) => void;
  onTypeChange: (type: QuestionTypeEnum) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  questionNumber,
  questionType,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onTypeChange,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex items-center p-4 rounded bg-blue-300 bg-opacity-40 max-sm:flex-col max-sm:gap-2.5 max-sm:items-start">
      <h2 className="text-xl text-black">Question No: {questionNumber}</h2>
      <QuestionTypeDropdown
        currentType={questionType}
        onTypeChange={onTypeChange}
      />
      <div className="flex gap-4 items-center ml-auto max-sm:mt-2.5">
        <button
          onClick={() => onMoveUp(questionNumber)}
          disabled={isFirst}
          className={`${
            isFirst ? "opacity-50 cursor-not-allowed" : "hover:opacity-75"
          } transition-opacity`}
          aria-label="Move question up"
        >
          <img
            src={Up}
            className="h-[22px] w-[22px]"
            alt="Move Up"
          />
        </button>
        <button
          onClick={() => onMoveDown(questionNumber)}
          disabled={isLast}
          className={`${
            isLast ? "opacity-50 cursor-not-allowed" : "hover:opacity-75"
          } transition-opacity`}
          aria-label="Move question down"
        >
          <img
            src={Down}
            className="h-[22px] w-[22px]"
            alt="Move Down"
          />
        </button>
        <button
          onClick={() => onDuplicate(questionNumber)}
          className="hover:opacity-75 transition-opacity"
          aria-label="Duplicate question"
        >
          <img
            src={Duplicate}
            className="h-[22px] w-[22px]"
            alt="Duplicate"
          />
        </button>
        <button
          onClick={() => onDelete(questionNumber)}
          className="hover:opacity-75 transition-opacity"
          aria-label="Delete question"
        >
          <img
            src={Delete}
            className="h-[22px] w-[22px]"
            alt="Delete"
          />
        </button>
      </div>
    </div>
  );
};
