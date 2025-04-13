import { Box, Button, Typography } from "@mui/material";
import { QuizOptionData } from "../interfaces/QuizData";
interface QuestionOptions {
  options: QuizOptionData[];
  toggleOption: (optionId: number, isNone: boolean) => void;
  selectedOptions: number[];
}
const QuestionOptions: React.FC<QuestionOptions> = ({
  options,
  toggleOption,
  selectedOptions,
}) => {
  return (
    <Box
      p={2}
      gap={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {options.map((option) => (
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            toggleOption(option.id, option.isNone);
          }}
          sx={{ padding: 1.5 }}
          color={selectedOptions.includes(option.id) ? "primary" : "secondary"}
        >
          <Typography>{option.optionText.toLowerCase()}</Typography>
        </Button>
      ))}
    </Box>
  );
};

export default QuestionOptions;
