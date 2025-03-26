import React from "react";
import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import AnswerOptionsField from "./AnswerOptionsField";
import { QuestionHeader } from "./QuestionHeader";
import { QuestionTypeEnum } from "../../types/quiz";

interface Props {
  index: number;
  control: any;
  register: any;
  watch: any;
  setValue: any;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDuplicate: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionField: React.FC<Props> = ({
  index,
  control,
  register,
  watch,
  setValue,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  isFirst,
  isLast,
}) => {
  const currentType: QuestionTypeEnum = watch(`questions.${index}.optionType`);

  const handleTypeChange = (type: QuestionTypeEnum) => {
    setValue(`questions.${index}.optionType`, type);
  };

  return (
    <Box mb={5} p={2} border={1} borderRadius={2} borderColor="grey.300">
      {/* Question Header with Type Selector and Actions */}
      <QuestionHeader
        questionNumber={index + 1}
        questionType={currentType || QuestionTypeEnum.TEXT}
        onDelete={() => onDelete(index)}
        onMoveUp={() => onMoveUp(index)}
        onMoveDown={() => onMoveDown(index)}
        onDuplicate={() => onDuplicate(index)}
        onTypeChange={handleTypeChange}
        isFirst={isFirst}
        isLast={isLast}
      />

      {/* Question Text Field */}
      <TextField
        label="Question"
        fullWidth
        margin="normal"
        {...register(`questions.${index}.question`)}
      />

      {/* Answer Options */}
      <AnswerOptionsField control={control} index={index} register={register} />
    </Box>
  );
};

export default QuestionField;
