
import AddBlack from "./assets/AddBlack.png";
interface AddQuestionButtonProps {
  onClick: () => void;
}

export const AddQuestionButton: React.FC<AddQuestionButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        className="flex items-center gap-2.5 px-6 py-3 rounded-lg hover:bg-gray-50 transition transform -translate-y-1 duration-200"

      >
        <img
          src={AddBlack}
          className="h-[25px] w-[25px]"
          alt="Add question"
        />
        <span className="text-sm text-black">Add Question</span>
      </button>
    </div>
  );
};
