import logo from '../../../assets/logo.svg';

export const QuizHeader = () => {
    return (
      <header className="flex items-center px-16 py-0 w-full bg-[#3E7CB1] h-[91px] max-md:px-8 max-md:py-0 max-sm:px-4 max-sm:py-0 max-sm:h-[70px]">
        <img
          src={logo}
          className="h-[76px] w-[116px] max-sm:w-20 max-sm:h-auto"
          alt="Logo"
        />
        <h1 className="ml-96 text-3xl font-bold text-white max-md:ml-52 max-sm:ml-12 max-sm:text-2xl">
          QUIZ CREATION
        </h1>
      </header>
    );
  };
  