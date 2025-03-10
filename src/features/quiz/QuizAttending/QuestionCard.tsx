"use client";
import { UseFormRegister } from "react-hook-form";
import { QuestionOption } from "./QuestionOption";
import { FormValues, Question, Option } from "./types";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  register: UseFormRegister<FormValues>;
  selectedOptionId?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  register,
  selectedOptionId,
}) => {
  return (
    <section className="flex justify-center px-5 py-10">
      <article className="p-10 bg-white border border-solid border-zinc-300 border-opacity-10 shadow-[0_4px_3px_rgba(0,0,0,0.25)] w-[685px] max-sm:p-5">
        <p className="mb-2.5 text-base text-black">
          Question {currentQuestion} of {totalQuestions}
        </p>
        <p className="mb-8 text-base text-black">{question.question}</p>
        <div
          className="flex flex-col gap-3.5"
          role="radiogroup"
          aria-label={`Question ${currentQuestion} options`}
        >
          {question.options.map((option: Option, index: number) => (
            <QuestionOption
              key={option.id}
              questionId={question.id}
              option={option}
              label={String.fromCharCode(65 + index)}
              isSelected={selectedOptionId === option.id}
              register={register}
            />
          ))}
        </div>
      </article>
    </section>
  );
};
