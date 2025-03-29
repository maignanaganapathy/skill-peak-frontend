// In your QuestionCard component
"use client";
import React from "react";
import {
    Box,
    Card,
    CardContent,
    RadioGroup,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
    console.log("QuestionCard Props:", {
        question,
        currentQuestion,
        totalQuestions,
        selectedOptionId,
    });
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                px: 2,
                py: 4,
            }}
        >
            <Card
                elevation={0} // ✅ No shadow
                sx={{
                    width: isSmall ? "100%" : 685,
                    p: isSmall ? 2 : 4,
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
            >
                <CardContent>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Question {currentQuestion} of {totalQuestions}
                    </Typography>

                    <Typography variant="body1" color="textPrimary" sx={{ mb: 3 }}>
                        {question?.question}
                    </Typography>

                    <RadioGroup
                        name={`question-${question?.id}`}
                        aria-label={`Question ${currentQuestion} options`}
                    >
                        {question?.options?.map((option, index) => (
                            <QuestionOption
                                key={option.id}
                                questionId={question.id}
                                option={option}
                                label={String.fromCharCode(65 + index)}
                                isSelected={selectedOptionId === option.id}
                                register={register}
                            />
                        ))}

                    </RadioGroup>
                </CardContent>
            </Card>
        </Box>
    );
};