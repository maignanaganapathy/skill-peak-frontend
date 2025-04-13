import { Box, Typography } from "@mui/material";
import {
  QuestionData,
  QuestionType,
  QuizResponse,
} from "../interfaces/QuizData";
import { useEffect, useState } from "react";
import LikertScale from "./LikertScale";
import QuestionOptions from "./QuestionOptions";
interface QuestionProps {
  question: QuestionData;
  onResponseChange: (response: QuizResponse) => void;
}
const Question: React.FC<QuestionProps> = ({ question, onResponseChange }) => {
  const [selectedOptions, setSelectedOptions] =
    useState<{ optionId: number; isNone: boolean }[]>();
  const [scaleValue, setScaleValue] = useState<number>();
  useEffect(() => {
    onResponseChange({
      questionId: question.id,
      selectedOptionIds: selectedOptions?.map((option) => option.optionId),
      scaleValue,
    });
  }, [scaleValue, selectedOptions]);
  const toggleOption = (optionId: number, isNone: boolean) => {
    const isAlreadySelected = selectedOptions?.some(
      (opt) => opt.optionId === optionId
    );
    if (isNone) {
      setSelectedOptions([{ optionId, isNone }]);
    } else {
      if (isAlreadySelected) {
        setSelectedOptions(
          selectedOptions?.filter((opt) => opt.optionId !== optionId)
        );
      } else {
        const filtered = selectedOptions?.filter((opt) => !opt.isNone) || [];
        setSelectedOptions([...filtered, { optionId, isNone }]);
      }
    }
  };
  return (
    <Box px={5}>
      <Typography variant="subtitle1">{question.question}</Typography>
      {question.questionType == QuestionType.LIKERT ? (
        <LikertScale
          minValue={question?.minVal || 1}
          maxValue={question?.maxVal || 5}
          onChange={setScaleValue}
        />
      ) : (
        <></>
      )}
      {question.questionType == QuestionType.MULTI_SELECT ? (
        <QuestionOptions
          options={question.options}
          toggleOption={toggleOption}
          selectedOptions={selectedOptions?.map((data) => data.optionId) || []}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Question;
