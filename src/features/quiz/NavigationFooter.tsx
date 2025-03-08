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
    <footer className="flex fixed bottom-0 justify-between px-96 py-0 w-full bg-[#3E7CB1] h-[52px] max-md:px-52 max-md:py-0 max-sm:px-5 max-sm:py-0 max-sm:h-[45px]">


      <button
        onClick={onPrevious}
        className="flex gap-2 items-center text-base font-bold text-white cursor-pointer"
      >
        <img src={prev}
          className="h-[29px] w-[29px] max-sm:w-6 max-sm:h-6"
          alt="Previous"
        />
        <span>Previous</span>
      </button>
      <button
        onClick={onNext}
        className="flex gap-2 items-center text-base font-bold text-white cursor-pointer"
      >
        <span>Next</span>
        <img src={next}
          className="h-[29px] w-[29px] max-sm:w-6 max-sm:h-6"
          alt="Next"
        />
      </button>
    </footer>
  );
};
