// src/features/quiz/QuizCreation/QuizForm.tsx
import React, { useState } from "react";
import { useForm, useFieldArray, Control, UseFormRegister, FieldArrayWithId } from "react-hook-form";
import {
    Box,
    Button,
    IconButton,
    Paper,
    TextField,
    Typography,
    FormHelperText,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import QuestionField from "./components/QuestionField";
import { UpdateQuizInput } from "../types/quiz";
import { QuizHeader } from "./components/QuizHeader";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../services/quiz.service";

interface FormOption {
    id: string;
    option: string;
    isCorrect: boolean;
}

interface FormQuestion {
    question: string;
    optionType: "TEXT" | "IMG" | "YES_NO";
    options: FormOption[];
    imageOptions?: { url: string; isCorrect: boolean }[];
}

interface QuizFormValues {
    title: string;
    description: string;
    questions: FormQuestion[];
}

const QuizForm: React.FC = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("Untitled");
    const [editTitle, setEditTitle] = useState(false);
    const [description, setDescription] = useState("");
    const [editDescription, setEditDescription] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        title?: string;
        questions?: string;
        questionText?: string[];
        options?: string[];
        correctOption?: string[];
    }>({});

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<QuizFormValues>({
        defaultValues: {
            title: "",
            description: "",
            questions: [
                {
                    question: "",
                    optionType: "TEXT",
                    options: [{ id: 'yes', option: "Yes", isCorrect: false }, { id: 'no', option: "No", isCorrect: false }],
                },
            ],
        },
    });

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "questions",
        rules: {
            minLength: { value: 1, message: "At least one question is required" },
        },
    });

    const handleAddQuestion = () => {
        append({
            question: "",
            optionType: "TEXT",
            options: [{ id: 'option1', option: "", isCorrect: false }],
        });
        setFormErrors({});
    };

    const validateQuiz = (data: QuizFormValues) => {
        const errors: {
            title?: string;
            questions?: string;
            questionText?: string[];
            options?: string[];
            correctOption?: string[];
        } = {};

        if (!data.title.trim()) {
            errors.title = "Quiz title is required.";
        }

        if (!data.questions || data.questions.length === 0) {
            errors.questions = "At least one question is required.";
        } else {
            const questionTextErrors: string[] = [];
            const optionErrors: string[] = [];
            const correctOptionErrors: string[] = [];
            data.questions.forEach((question, index) => {
                if (!question.question.trim()) {
                    questionTextErrors[index] = "Question text is required.";
                }
                if (question.optionType === "YES_NO") {
                    const correctOptions = question.options?.filter((opt) => opt.isCorrect);
                    if (correctOptions?.length !== 1) {
                        correctOptionErrors[index] = "Please select either Yes or No as the correct answer.";
                    }
                } else if (!question.options || question.options.length === 0) {
                    optionErrors[index] = "Question must have at least one option.";
                } else {
                    const hasCorrectOption = question.options?.some((opt) => opt.isCorrect);
                    if (!hasCorrectOption) {
                        correctOptionErrors[index] = "Question must have at least one correct option.";
                    }
                }
            });
            if (questionTextErrors.length > 0) {
                errors.questionText = questionTextErrors;
            }
            if (optionErrors.length > 0) {
                errors.options = optionErrors;
            }
            if (correctOptionErrors.length > 0) {
                errors.correctOption = correctOptionErrors;
            }
        }
        return errors;
    };

    const handleQuizSubmit = handleSubmit(async (data) => {
        const validationErrors = validateQuiz(data);
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        const payload = {
            title: data.title,
            description: data.description,
            questions: data.questions.map((q) => ({
                question: q.question,
                optionType: q.optionType,
                options: q.options.map((opt) => ({
                    option: opt.option,
                    isCorrect: opt.isCorrect,
                })),
            })),
        };

        try {
            const response = await createQuiz(payload);
            console.log("✅ Quiz submitted successfully:", response.data);
            navigate("/quizzes");
        } catch (error: any) {
            console.error("⚠️ Submission error:", error.response ? error.response.data : error.message);
        }
    });

    return (
        <>
            <QuizHeader onSubmit={handleQuizSubmit} />

            <Box sx={{ pt: "110px", px: 3 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    {formErrors.title && (
                        <FormHelperText error>{formErrors.title}</FormHelperText>
                    )}
                    {formErrors.questions && (
                        <FormHelperText error>{formErrors.questions}</FormHelperText>
                    )}
                    <Box display="flex" alignItems="center" mb={3}>
                        {editTitle ? (
                            <>
                                <TextField
                                    variant="standard"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") setEditTitle(false);
                                    }}
                                    autoFocus
                                    error={!!formErrors.title}
                                    helperText={formErrors.title}
                                />
                                <IconButton onClick={() => setEditTitle(false)}>
                                    <CheckIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" fontWeight="bold" mr={1}>
                                    {title}
                                </Typography>
                                <IconButton onClick={() => setEditTitle(true)}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center" mb={3}>
                        {editDescription ? (
                            <>
                                <TextField
                                    variant="standard"
                                    label="Description"
                                    multiline
                                    fullWidth
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") setEditDescription(false);
                                    }}
                                    autoFocus
                                />
                                <IconButton onClick={() => setEditDescription(false)}>
                                    <CheckIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Typography variant="subtitle1" color="textSecondary" mr={1}>
                                    {description || "Add a description"}
                                </Typography>
                                <IconButton onClick={() => setEditDescription(true)}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>

                    {fields.map((field, index) => {
                        const isYesNoQuestion = watch(`questions.${index}.optionType`) === "YES_NO";
                        return (
                            <Box key={field.id}>
                                <QuestionField
                                    index={index}
                                    control={control as Control<QuizFormValues>}
                                    register={register as UseFormRegister<QuizFormValues>}
                                    watch={watch}
                                    setValue={setValue}
                                    onDelete={() => remove(index)}
                                    onMoveUp={() => index > 0 && move(index, index - 1)}
                                    onMoveDown={() =>
                                        index < fields.length - 1 && move(index, index + 1)
                                    }
                                    onDuplicate={() => {
                                        const current = getValues(`questions.${index}`);
                                        append({ ...current });
                                    }}
                                    isFirst={index === 0}
                                    isLast={index === fields.length - 1}
                                >
                                    {isYesNoQuestion && (
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label={`question-${index}-options`}
                                                name={`questions.${index}.correctOption`}
                                                value={watch(`questions.${index}.options`).find((opt) => opt.isCorrect)?.id || ''}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const updatedOptions = watch(`questions.${index}.options`).map((option) => ({
                                                        ...option,
                                                        isCorrect: option.id === selectedValue,
                                                    }));
                                                    setValue(`questions.${index}.options`, updatedOptions);
                                                }}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                </QuestionField>
                                {formErrors.questionText && formErrors.questionText[index] && (
                                    <FormHelperText error>{formErrors.questionText[index]}</FormHelperText>
                                )}
                                {formErrors.options && formErrors.options[index] && (
                                    <FormHelperText error>{formErrors.options[index]}</FormHelperText>
                                )}
                                {formErrors.correctOption && formErrors.correctOption[index] && (
                                    <FormHelperText error>{formErrors.correctOption[index]}</FormHelperText>
                                )}
                            </Box>
                        );
                    })}

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" onClick={handleAddQuestion}>
                            Add Question
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default QuizForm;