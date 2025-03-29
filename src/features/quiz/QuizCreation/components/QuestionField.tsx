import React from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const { fields: imageOptionFields, append: appendImageOption, remove: removeImageOption } = useFieldArray({
    control,
    name: `questions.${index}.imageOptions`, // New field array for image URLs
  });

  const handleTypeChange = (type: QuestionTypeEnum) => {
    setValue(`questions.${index}.optionType`, type);
    if (type === QuestionTypeEnum.YES_NO) {
      setValue(`questions.${index}.options`, [{ option: 'Yes', isCorrect: false }, { option: 'No', isCorrect: false }]);
      setValue(`questions.${index}.imageOptions`, undefined);
    } else if (type === QuestionTypeEnum.IMG) {
      setValue(`questions.${index}.options`, []); // Clear default options
    } else {
      setValue(`questions.${index}.options`, []);
      setValue(`questions.${index}.imageOptions`, undefined);
    }
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

      {currentType === QuestionTypeEnum.IMG && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>Image URLs:</Typography>
          {imageOptionFields.map((item, imgIndex) => (
            <Box key={item.id} display="flex" alignItems="center" mb={1}>
              <TextField
                label={`URL ${imgIndex + 1}`}
                fullWidth
                size="small"
                {...register(`questions.${index}.imageOptions.${imgIndex}.url`)}
              />
              <IconButton onClick={() => removeImageOption(imgIndex)} size="small" aria-label="delete image url">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <IconButton onClick={() => appendImageOption({ url: '' })} size="small" aria-label="add image url">
            <AddIcon />
          </IconButton>
        </Box>
      )}

      {currentType !== QuestionTypeEnum.IMG && (
        /* Answer Options for non-IMG types */
        <AnswerOptionsField control={control} index={index} register={register} />
      )}
    </Box>
  );
};

export default QuestionField;