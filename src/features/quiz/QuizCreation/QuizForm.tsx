import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import QuestionField from "./components/QuestionField";
import { UpdateQuizInput } from "../types/quiz";
import { QuizHeader } from "./components/QuizHeader";
import { useNavigate } from "react-router-dom";

const QuizForm: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Untitled");
  const [editTitle, setEditTitle] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<UpdateQuizInput>({
    defaultValues: {
      questions: [
        {
          question: "",
          optionType: "TEXT",
          options: [{ option: "", isCorrect: false }],
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({
      question: "",
      optionType: "TEXT",
      options: [{ option: "", isCorrect: false }],
    });
  };

  const handleQuizSubmit = handleSubmit(async (data) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyNTU1NTUwLCJleHAiOjE3NDI2NDE5NTB9.-0EVDJjU9K8ChCEalOk8_8HzfcZPuysiJNuaQWEqxns";

    const payload = {
      title,
      description: "Test your JS knowledge!",
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
      const response = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit quiz: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Quiz submitted successfully:", result);
      alert("🎉 Quiz submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("⚠️ Submission error:", error);
      alert("⚠️ Failed to submit quiz. Please try again.");
    }
  });

  return (
    <>
      <QuizHeader onSubmit={handleQuizSubmit} />

      <Box sx={{ pt: "110px", px: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Editable Title */}
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

          {/* Question Fields */}
          {fields.map((field, index) => (
            <QuestionField
              key={field.id}
              index={index}
              control={control}
              register={register}
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
            />
          ))}

          {/* Add Question Button */}
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
