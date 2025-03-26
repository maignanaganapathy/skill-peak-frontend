import { UseFormRegister } from "react-hook-form";
import { FormValues, Option } from "./types";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

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
    <Box mb={1.5}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          borderRadius: 2,
          cursor: "pointer",
          backgroundColor: isSelected ? "#A5C8E5" : "#f5f5f5",
          boxShadow: "none", 
          border: "1px solid #ccc", 
        }}
        component="label"
      >
        <input
          type="radio"
          {...register(`answers.${questionId}` as const)}
          value={option.id}
          defaultChecked={isSelected}
          style={{ display: "none" }}
        />
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            fontSize: 12,
          }}
        >
          {label}
        </Box>
        <Typography variant="body2" color="textPrimary">
          {option.option}
        </Typography>
      </Paper>
    </Box>
  );
};
