// Before: passing onCreate
// import React from 'react';
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {
  
}

const CreateQuizButton: React.FC<Props> = () => {
  const navigate = useNavigate(); // ✅ navigate to QuizForm

  const handleClick = () => {
    navigate("/create");
  };

  return (
    <Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
      Create Quiz
    </Button>
  );
};

export default CreateQuizButton;
