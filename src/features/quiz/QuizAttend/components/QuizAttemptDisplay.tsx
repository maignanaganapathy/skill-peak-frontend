import React from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import { QuizAttemptData } from "../interfaces/QuizData";
import { CheckCircle, ErrorOutline } from "@mui/icons-material";
import Navbar from "../../../Navbar";

const QuizAttemptDisplay: React.FC<{ data: QuizAttemptData }> = ({ data }) => {
  const { quizAttempt } = data;
  const { inferenceOverall, quizAttemptSectionWiseInference, section } =
    quizAttempt;

  const filteredSectionInferences = quizAttemptSectionWiseInference.filter(
    (item) => item.inference !== null
  );

  return (
    <Box>
      <Navbar title={"Quiz Analysis "} />

      <Paper
        elevation={5}
        style={{ padding: "30px", margin: "20px", borderRadius: "10px" }}
      >
        {/* Header */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              sx={{ backgroundColor: "#4caf50" }}
              variant="rounded"
              alt={section.quiz.title}
            >
              <CheckCircle />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              {section.quiz.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {section.quiz.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Overall Inference */}
        <Divider sx={{ marginBottom: "20px" }} />
        <Typography variant="subtitle1" gutterBottom>
          Overall Inference:
        </Typography>
        <Box
          sx={{
            padding: "16px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="body2">{inferenceOverall.text}</Typography>
        </Box>

        {/* Section-Specific Inferences */}
        {filteredSectionInferences.length > 0 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Section-Specific Inferences:
            </Typography>
            <List>
              {filteredSectionInferences.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.quizSection.title}
                    secondary={item.inference?.text}
                  />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            No section-specific inferences available.
          </Typography>
        )}

        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />

        {/* Score and Footer */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="body1" gutterBottom>
              Overall Score: <strong>{quizAttempt.score}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default QuizAttemptDisplay;
