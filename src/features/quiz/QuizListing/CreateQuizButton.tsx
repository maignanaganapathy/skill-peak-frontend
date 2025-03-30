import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {}

const CreateQuizButton: React.FC<Props> = () => {
  const navigate = useNavigate(); // ✅ navigate to QuizForm

  const handleClick = () => {
    navigate("/quiz/create"); // ✅ Absolute path, should be correct
  };

  return (
    <Button variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
      Create Quiz
    </Button>
  );
};

export default CreateQuizButton;