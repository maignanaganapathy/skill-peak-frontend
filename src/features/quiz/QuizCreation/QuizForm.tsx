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

  const form = useForm<UpdateQuizInput>({
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
    control: form.control,
    name: "questions",
  });

  const [title, setTitle] = useState("Untitled");
  const [editTitle, setEditTitle] = useState(false);

  const handleAddQuestion = () => {
    append({
      question: "",
      optionType: "TEXT",
      options: [{ option: "", isCorrect: false }],
    });
  };

  const handleQuizSubmit = form.handleSubmit(async (data) => {
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

    // ✅ Debug log before submission
    console.log("Submitting Payload:", payload);

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
        console.error("Server response:", errorText);
        throw new Error(`Failed to submit quiz: ${errorText}`);
      }

      const result = await response.json();
      console.log("Quiz submitted successfully:", result);
      alert("🎉 Quiz submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
      alert("⚠️ Failed to submit quiz.");
    }
  });

  return (
    <>
      <QuizHeader onSubmit={handleQuizSubmit} />

      <Box sx={{ pt: "110px", px: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            {editTitle ? (
              <>
                <TextField
                  variant="standard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setEditTitle(false)}
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

          {fields.map((field, index) => (
            <QuestionField
              key={field.id}
              index={index}
              control={form.control}
              register={form.register}
              watch={form.watch}
              setValue={form.setValue}
              onDelete={() => remove(index)}
              onMoveUp={() => index > 0 && move(index, index - 1)}
              onMoveDown={() =>
                index < fields.length - 1 && move(index, index + 1)
              }
              onDuplicate={() => {
                const current = form.getValues(`questions.${index}`);
                append({ ...current });
              }}
              isFirst={index === 0}
              isLast={index === fields.length - 1}
            />
          ))}

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
