"use client";

import { useState, useEffect } from "react";
import { QuizHeader } from "./QuizHeader";
import { QuestionCard } from "./QuestionCard";
import { AddQuestionButton } from "./AddQuestionButton";
import { QuestionType, QuestionTypeEnum, AnswerOption } from "./types";
import Edit from "./assets/Edit.png";

const QuizCreation = () => {
  const [title, setTitle] = useState("Untitled");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const getDefaultOptions = (type: QuestionTypeEnum): AnswerOption[] => {
    const timestamp = Date.now();
    switch (type) {
      case QuestionTypeEnum.YesNo:
        return [
          { id: timestamp + 1, text: "Yes", isCorrect: false },
          { id: timestamp + 2, text: "No", isCorrect: false },
        ];
      case QuestionTypeEnum.MultipleChoice:
      case QuestionTypeEnum.Checkboxes:
      case QuestionTypeEnum.TextField:
      default:
        return [];
    }
  };

  const createInitialQuestion = (): QuestionType => ({
    id: Date.now(),
    type: QuestionTypeEnum.YesNo,
    text: "",
    required: true,
    options: getDefaultOptions(QuestionTypeEnum.YesNo),
  });

  const [questions, setQuestions] = useState<QuestionType[]>([
    createInitialQuestion(),
  ]);

  useEffect(() => {
    if (questions.length === 0) {
      setQuestions([createInitialQuestion()]);
    }
  }, [questions]);

  const handleDeleteQuestion = (questionId: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    } else {
      alert("Cannot delete the last question. At least one question is required.");
    }
  };

  const handleUpdateQuestion = (updatedQuestion: QuestionType) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    );
  };

  const handleMoveUp = (questionNumber: number) => {
    if (questionNumber > 1) {
      const newQuestions = [...questions];
      const index = questionNumber - 1;
      [newQuestions[index], newQuestions[index - 1]] = [
        newQuestions[index - 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    }
  };

  const handleMoveDown = (questionNumber: number) => {
    if (questionNumber < questions.length) {
      const newQuestions = [...questions];
      const index = questionNumber - 1;
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    }
  };

  const handleDuplicate = (questionNumber: number) => {
    const questionToDuplicate = questions[questionNumber - 1];
    const duplicatedQuestion: QuestionType = {
      ...questionToDuplicate,
      id: Date.now(),
      options: questionToDuplicate.options.map((opt) => ({
        ...opt,
        id: Date.now() + Math.random(),
      })),
    };
    const newQuestions = [...questions];
    newQuestions.splice(questionNumber, 0, duplicatedQuestion);
    setQuestions(newQuestions);
  };

  const handleTypeChange = (questionId: number, newType: QuestionTypeEnum) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              type: newType,
              options:
                newType === QuestionTypeEnum.YesNo
                  ? getDefaultOptions(newType)
                  : [],
            }
          : q,
      ),
    );
  };

  const handleAddQuestion = () => {
    const newQuestion = createInitialQuestion();
    setQuestions([...questions, newQuestion]);
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <QuizHeader />

      <div className="p-10 mx-auto my-0 max-w-[1085px] max-md:p-5">
        <div className="flex items-center pb-5 border-b border-solid border-b-black">
        {isEditingTitle ? (
  <input
    className="text-xl font-bold text-black outline-none mr-3 bg-transparent"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    onBlur={() => setIsEditingTitle(false)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        setIsEditingTitle(false);
      }
    }}
    autoFocus
  />
) : (
  <h2
    className="mr-3 text-xl font-bold text-black cursor-pointer"
    onClick={() => setIsEditingTitle(true)}
  >
    {title}
  </h2>
)}

          <button onClick={() => setIsEditingTitle(true)}>
            <img src={Edit} className="h-[22px] w-[22px]" alt="Edit title" />
          </button>
        </div>

        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            onUpdate={handleUpdateQuestion}
            onDelete={handleDeleteQuestion}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDuplicate={handleDuplicate}
            onTypeChange={handleTypeChange}
            isFirst={index === 0}
            isLast={index === questions.length - 1}
          />
        ))}
      </div>

      <div className="flex justify-center w-full">
        <AddQuestionButton onClick={handleAddQuestion} />
      </div>
    </main>
  );
};

export default QuizCreation;
