import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  control: any;
  index: number;
  register: any;
}

const AnswerOptionsField: React.FC<Props> = ({ control, index, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <Box>
      <Typography variant="subtitle1">Options</Typography>
      {fields.map((field, optIdx) => (
        <Box key={field.id} display="flex" alignItems="center" gap={2} my={1}>
          <TextField
            label={`Option ${optIdx + 1}`}
            {...register(`questions.${index}.options.${optIdx}.option`)}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register(
                  `questions.${index}.options.${optIdx}.isCorrect`
                )}
              />
            }
            label="Correct"
          />
          <IconButton onClick={() => remove(optIdx)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={() => append({ option: "", isCorrect: false })}>
        Add Option
      </Button>
    </Box>
  );
};

export default AnswerOptionsField;