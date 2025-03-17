"use client";

import { useState } from "react";
import { QuestionType, AnswerOption, QuestionTypeEnum } from "./types";
import { QuestionHeader } from "./QuestionHeader";
import { AnswerOptions } from "./AnswerOptions";

interface QuestionCardProps {
  question: QuestionType;
  questionNumber: number;
  onUpdate: (question: QuestionType) => void;
  onDelete: (questionId: number) => void;
  onMoveUp: (questionNumber: number) => void;
  onMoveDown: (questionNumber: number) => void;
  onDuplicate: (questionNumber: number) => void;
  onTypeChange: (questionId: number, type: QuestionTypeEnum) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onTypeChange,
  isFirst,
  isLast,
}) => {
  const [isRequired, setIsRequired] = useState(question.required);
  const [showImageUrl, setShowImageUrl] = useState(!!question.imageUrl);

  return (
    <section className="p-5 mt-5 rounded-xl border border-solid bg-zinc-300 bg-opacity-10 border-black border-opacity-10">
      <QuestionHeader
        questionNumber={questionNumber}
        questionType={question.type}
        onDelete={() => onDelete(question.id)}
        onMoveUp={() => onMoveUp(questionNumber)}
        onMoveDown={() => onMoveDown(questionNumber)}
        onDuplicate={() => onDuplicate(questionNumber)}
        onTypeChange={(type) => onTypeChange(question.id, type)}
        isFirst={isFirst}
        isLast={isLast}
      />

      <div className="flex items-center mt-5 max-sm:flex-col max-sm:items-start">
        <input
          type="text"
          placeholder="Type here"
          value={question.text}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
          className="flex-1 p-4 text-base rounded-md border border-solid border-black border-opacity-30 text-black text-opacity-60"
        />
        <div className="flex items-center ml-5 max-sm:mt-2.5">
          <button
            className="relative w-[32px] h-[18px] rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
            onClick={() => {
              setIsRequired(!isRequired);
              onUpdate({ ...question, required: !isRequired });
            }}
            aria-label="Toggle required"
          >
            <div
              className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${
                isRequired ? "bg-blue-900" : "bg-gray-300"
              }`}
            />
            <div
              className={`absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                isRequired ? "translate-x-[14px]" : "translate-x-0"
              }`}
            />
          </button>
          <span className="ml-4 text-sm text-black">Required</span>
        </div>
      </div>

      {/* Image URL Section with Toggle */}
      <div className="mt-5">
        <label className="mb-2.5 text-sm text-black flex items-center gap-2">
          <input
            type="checkbox"
            checked={showImageUrl}
            onChange={() => setShowImageUrl(!showImageUrl)}
          />
          Image URL
        </label>

        {showImageUrl && (
          <input
            type="text"
            placeholder="Add Image URL"
            value={question.imageUrl || ""}
            onChange={(e) => onUpdate({ ...question, imageUrl: e.target.value })}
            className="p-1.5 text-xs rounded border border-solid border-black border-opacity-30 h-[22px] text-black text-opacity-60 w-[159px] mt-2"
          />
        )}
      </div>

      <AnswerOptions
        options={question.options}
        questionType={question.type}
        onAddOption={(text: string) => {
          const newOption: AnswerOption = {
            id: Date.now(),
            text,
            isCorrect: false,
          };
          onUpdate({
            ...question,
            options: [...question.options, newOption],
          });
        }}
        onDeleteOption={(id: number) => {
          onUpdate({
            ...question,
            options: question.options.filter((opt) => opt.id !== id),
          });
        }}
        onToggleCorrect={(id: number) => {
          onUpdate({
            ...question,
            options: question.options.map((opt) =>
              opt.id === id ? { ...opt, isCorrect: !opt.isCorrect } : opt,
            ),
          });
        }}
      />
    </section>
  );
};
