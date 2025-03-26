import { QuizResult } from "./types";
import { Box, Typography } from "@mui/material";

interface ScoreCardProps {
  result: QuizResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      pt={10}
      px={2}
    >
      {/* Score Circle */}
      <Box
        position="relative"
        width={192}
        height={192}
        mb={4}
      >
        {/* Outer Stroke */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "12px solid #A5C8E5",
          }}
        />
        {/* Inner Circle */}
        <Box
          sx={{
            position: "absolute",
            inset: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1E4D92",
            borderRadius: "50%",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            SCORE
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {result.correctAnswers}
          </Typography>
        </Box>
      </Box>

      {/* Total Questions */}
      <Typography variant="h6" color="text.secondary" mb={2}>
        Out of {result.totalQuestions}
      </Typography>

      {/* Motivational Message */}
      <Typography
        variant="h5"
        fontWeight="600"
        color="#1E4D92"
        textAlign="center"
      >
        Amazing! You crushed it! Keep up the great work!
      </Typography>
    </Box>
  );
};
