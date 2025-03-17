import prev from "./assets/prev.svg";
import next from "./assets/next.svg";

interface NavigationFooterProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  onPrevious,
  onNext,
}) => {
  return (
    <footer className="flex fixed bottom-0 items-center w-full h-[52px] bg-[#3E7CB1] max-md:h-[52px] max-sm:h-[45px]">
      
      {/* Left Area - Previous */}
      <div
        onClick={onPrevious}
        className="flex justify-center items-center w-full h-full cursor-pointer"
      >
        <div className="flex items-center gap-1 px-10 max-sm:px-4">
          <img
            src={prev}
            className="h-[24px] w-[84px] max-sm:w-5 max-sm:h-5"
            alt="Previous"
          />
          <span className="text-base font-semibold text-white max-sm:text-sm">
            Previous
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-full w-[10px] bg-white opacity-70" />

      {/* Right Area - Next */}
      <div
        onClick={onNext}
        className="flex justify-center items-center w-full h-full cursor-pointer"
      >
        <div className="flex items-center gap-1 px-10 max-sm:px-4">
          <span className="text-base font-semibold text-white max-sm:text-sm">
            Next
          </span>
          <img
            src={next}
            className="h-[24px] w-[84px] max-sm:w-5 max-sm:h-5"
            alt="Next"
          />
        </div>
      </div>
    </footer>
  );
};
