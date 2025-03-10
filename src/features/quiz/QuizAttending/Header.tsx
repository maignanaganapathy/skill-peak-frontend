import logo from "./assets/logo.svg";
interface HeaderProps {
  showSubmit?: boolean;
  isComplete?: boolean;
  onSubmit?: () => void;
  isScoreView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showSubmit = true,
  isComplete = false,
  onSubmit,
  isScoreView = false,
}) => {
  return (
    <header className="flex justify-between items-center px-24 py-0 w-full bg-white h-[85px] shadow-[0_4px_8px_rgba(0,0,0,0.25)] max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0 max-sm:h-[70px]">
      <img src={logo} alt="Logo"  className="object-contain h-16 w-[89px] max-sm:h-[50px] max-sm:w-[70px]"/>
      <h1
        className={`text-xl font-semibold text-black max-sm:text-base ${
          isScoreView ? "absolute left-1/2 transform -translate-x-1/2" : ""
        }`}
      >
        Pre Training Assessment
      </h1>
      {showSubmit && (
        <button
          onClick={onSubmit}
          disabled={!isComplete}
          className={`h-9 text-base font-extrabold text-white rounded-xl cursor-pointer border-[none] w-[106px] max-sm:h-8 max-sm:text-sm max-sm:w-[90px] ${
            isComplete
              ? "bg-blue-900 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          title={
            !isComplete
              ? "Please answer all questions before submitting"
              : "Submit assessment"
          }
        >
          SUBMIT
        </button>
      )}
    </header>
  );
};
