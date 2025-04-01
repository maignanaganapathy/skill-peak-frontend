// src/features/quiz/QuizCreation/components/QuestionField.tsx
import React, { ReactNode } from "react";
import { Box, TextField, IconButton, Typography, Checkbox, FormControlLabel } from "@mui/material";
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
    children?: ReactNode;
}

interface ImageOption {
    id: string;
    url: string;
    isCorrect: boolean;
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
    children,
}) => {
    const currentType: QuestionTypeEnum = watch(`questions.${index}.optionType`);
    const { fields: imageOptionFields, append: appendImageOption, remove: removeImageOption } = useFieldArray({
        control,
        name: `questions.${index}.imageOptions`,
    });

    const handleTypeChange = (type: QuestionTypeEnum) => {
        setValue(`questions.${index}.optionType`, type);
        if (type === QuestionTypeEnum.YES_NO) {
            setValue(`questions.${index}.options`, [{ id: 'yes', option: 'Yes', isCorrect: false }, { id: 'no', option: 'No', isCorrect: false }]);
            setValue(`questions.${index}.imageOptions`, undefined);
        } else if (type === QuestionTypeEnum.IMG) {
            setValue(`questions.${index}.options`, []);
            setValue(`questions.${index}.imageOptions`, [{ url: '', isCorrect: false }]);
        } else {
            setValue(`questions.${index}.options`, []);
            setValue(`questions.${index}.imageOptions`, undefined);
        }
    };

    const handleImageCorrectChange = (imgIndex: number, isChecked: boolean) => {
        const updatedImageOptions = imageOptionFields.map((field, i) => ({
            ...watch(`questions.${index}.imageOptions.${i}`),
            isCorrect: i === imgIndex ? isChecked : false,
        }));
        setValue(`questions.${index}.imageOptions`, updatedImageOptions);
    };

    return (
        <Box mb={5} p={2} border={1} borderRadius={2} borderColor="grey.300">
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
                                size="small"
                                sx={{ width: '35%' }}
                                {...register(`questions.${index}.imageOptions.${imgIndex}.url`, {
                                    required: currentType === QuestionTypeEnum.IMG ? "Image URL is required" : false,
                                })}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={watch(`questions.${index}.imageOptions.${imgIndex}.isCorrect`) || false}
                                        onChange={(e) => handleImageCorrectChange(imgIndex, e.target.checked)}
                                    />
                                }
                                label="Correct"
                                sx={{ ml: 1 }}
                            />
                            <IconButton onClick={() => removeImageOption(imgIndex)} size="small" aria-label="delete image url">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <IconButton onClick={() => appendImageOption({ url: '', isCorrect: false })} size="small" aria-label="add image url">
                        <AddIcon />
                    </IconButton>
                </Box>
            )}

            {currentType !== QuestionTypeEnum.IMG && currentType !== QuestionTypeEnum.YES_NO && (
                <AnswerOptionsField control={control} index={index} register={register} />
            )}
            {children}
        </Box>
    );
};

export default QuestionField;