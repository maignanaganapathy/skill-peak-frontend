import React from "react";
import vasriram from "./assets/vasriram.svg";
import AnimatedCheckCircles from "./Animation"; // Import your component

export const Hero: React.FC = () => {
  return (
    <section className="flex justify-between items-center px-0 pt-24 pb-0 bg-blue-300 min-h-[600px] max-sm:flex-col">
      <div className="pt-24 pr-0 pb-0 pl-36 w-6/12 max-md:px-5 max-md:pt-16 max-md:pb-0 max-sm:px-5 max-sm:pt-10 max-sm:pb-0 max-sm:w-full">
        <div className="mb-8"> {/* Add a container for the animation and spacing */}
          <AnimatedCheckCircles />
        </div>
        <h1 className="mx-0 my-10 text-4xl font-extrabold text-black whitespace-nowrap">
          Your Path To Excellence Begins Here...
        </h1>
      </div>

      <div className="mt-20 w-6/12 max-w-2xl max-md:w-[45%] max-sm:mt-20 max-sm:w-full">
        <img src={vasriram} alt="Progress Graphic" className="w-full h-auto" />
      </div>
    </section>
  );
};