import React from "react";
import { Button, Box } from "@mui/material";

interface Props {
  onClick: () => void;
}

const AddQuestionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box mt={3}>
      <Button variant="contained" color="primary" onClick={onClick}>
        Add Question
      </Button>
    </Box>
  );
};

export default AddQuestionButton;