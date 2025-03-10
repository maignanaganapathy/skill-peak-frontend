import { UseFormRegister } from "react-hook-form";
import { FormValues, Option } from "./types";

interface QuestionOptionProps {
  questionId: number;
  option: Option;
  label: string;
  isSelected: boolean;
  register: UseFormRegister<FormValues>;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  questionId,
  option,
  label,
  isSelected,
  register,
}) => {
  return (
    <label
      className={`flex items-center p-2.5 rounded-md cursor-pointer w-full ${
        isSelected ? "bg-[#A5C8E5]" : "bg-gray-100"
      }`}
    >
      <input
        type="radio"
        {...register(`answers.${questionId}` as "answers")}
        value={option.id}
        className="hidden"
      />
      <span className="flex items-center justify-center mr-5 text-xs bg-white rounded-full h-[19px] w-[18px]">
        {label}
      </span>
      <span className="text-sm text-black">{option.text}</span>
    </label>
  );
};
