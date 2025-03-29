import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { QuestionTypeDropdown } from "./QuestionTypeDropdown";
import { QuestionTypeEnum } from "../../types/quiz";

interface QuestionHeaderProps {
  questionNumber: number;
  questionType: QuestionTypeEnum;
  onDelete: (questionId: number) => void;
  onMoveUp: (questionId: number) => void;
  onMoveDown: (questionId: number) => void;
  onDuplicate: (questionId: number) => void;
  onTypeChange: (type: QuestionTypeEnum) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  questionNumber,
  questionType,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onTypeChange,
  isFirst,
  isLast,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="rgba(59, 130, 246, 0.3)"
      p={2}
      borderRadius={2}
      mb={2}
      flexWrap="wrap"
    >
      {/* 👇 Question number + dropdown grouped */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6">Question No: {questionNumber}</Typography>
        <QuestionTypeDropdown
          currentType={questionType}
          onTypeChange={onTypeChange}
          // Removed onOptionsChange here
        />
      </Box>

      {/* 👇 Action buttons */}
      <Box display="flex" gap={1} flexWrap="wrap" justifyContent="flex-end">
        <Tooltip title="Move Up">
          <span>
            <IconButton
              onClick={() => onMoveUp(questionNumber)}
              disabled={isFirst}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Move Down">
          <span>
            <IconButton
              onClick={() => onMoveDown(questionNumber)}
              disabled={isLast}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Duplicate">
          <IconButton onClick={() => onDuplicate(questionNumber)}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete(questionNumber)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};