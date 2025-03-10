import { QuizResult } from "./types";

interface ScoreCardProps {
  result: QuizResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result }) => {
  return (
    <div className="flex flex-col items-center justify-start pt-12 px-4">
      {/* Score Circle */}
      <div className="relative w-48 h-48 mb-6">
        {/* Outer stroke */}
        <div className="absolute inset-0 rounded-full border-[12px] border-[#A5C8E5]" />
        {/* Inner circle with score */}
        <div className="absolute inset-[5px] flex flex-col items-center justify-center bg-[#1E4D92] rounded-full text-white">
          <span className="text-lg font-medium mb-2">SCORE</span>
          <span className="text-4xl font-bold">{result.correctAnswers}</span>
        </div>
      </div>

      {/* Total Questions */}
      <p className="text-xl text-gray-700 mb-4">
        Out of {result.totalQuestions}
      </p>

      {/* Motivational Message */}
      <p className="text-2xl font-semibold text-[#1E4D92] text-center">
        Amazing! You crushed it! Keep up the great work!
      </p>
    </div>
  );
};
