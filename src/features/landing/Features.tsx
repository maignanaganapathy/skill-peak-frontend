
import React from "react";
import Tick from "./assets/Tick.svg"; // Import the tick SVG

export const Features: React.FC = () => {
  return (
    <section className="px-0 py-20 text-center">
      <h2 className="mb-10 text-5xl font-bold">WHY RIPE ?</h2>
      <div className="flex gap-10 justify-center mb-8 max-sm:flex-col max-sm:items-center">
        {/* Clear Topics */}
        <div className="flex gap-3.5 items-center">
          <img src={Tick} alt="Tick Icon" className="w-8 h-8 feature-icon" />
          <p className="text-base">Clear Topics</p>
        </div>

        {/* Learning Goals */}
        <div className="flex gap-3.5 items-center">
          <img src={Tick} alt="Tick Icon" className="w-8 h-8 feature-icon" />
          <p className="text-base">Learning Goals</p>
        </div>

        {/* Experienced Trainer */}
        <div className="flex gap-3.5 items-center">
          <img src={Tick} alt="Tick Icon" className="w-8 h-8 feature-icon" />
          <p className="text-base">Experienced Trainer</p>
        </div>
      </div>
      <p className="mx-auto my-0 text-lg text-black max-w-[987px]">
        This transparency sets the stage for targeted learning, aligning
        expectations with outcomes, and allowing participants to mentally
        prepare for the transformative experience.
      </p>
    </section>
  );
};
