"use client";
import React from "react";
import { StatCard } from "./StatCard";

export const About: React.FC = () => {
  return (
    <section className="px-0 py-20 bg-white">
      <h2 className="mb-10 text-5xl font-bold text-center">ABOUT US</h2>
      <div className="flex gap-20 px-5 py-0 mx-auto my-0 max-w-[1200px] mt-24 max-md:flex-col max-md:gap-10 max-md:text-center">

        
        {/* Title */}
        <div className="text-5xl font-extrabold leading-relaxed pl-20">

          <span>Welcome to</span>
          <br />
          <span className="text-blue-900">RIPE Skill Peak</span>
        </div>

        {/* Move Entire Block to Right */}
        <div className="text-base font-medium max-w-[563px] ml-auto">
          <p>
            Since 1997, RIPE Consulting Services has been a global leader in
            training, coaching, and consulting, empowering individuals and
            organizations to unlock their true potential. With over 500 trusted
            clients across diverse industries and more than 1.5 million
            knowledge seekers trained through 2000+ transformative programs, we
            specialize in helping participants unlearn, learn, and relearn core
            concepts that drive 10X productivity.
          </p>
          <br />
          <p>
            Step into the future of learning with RIPE Skill Peak LMS, where we
            elevate your skills to new heights and ensure you achieve excellence
            every step of the way.
          </p>
        </div>
      </div>

      <div className="flex justify-between px-5 py-0 mx-auto mt-24 mb-0 max-w-[1200px] max-md:flex-wrap max-md:gap-5 max-md:justify-center">
        <StatCard number="500+" label="Happy Clients" />
        <StatCard number="23" label="Years of Quality" />
        <StatCard number="1.5M+" label="Knowledge Seekers Trained" />
        <StatCard number="10K+" label="Transformational Programs" />
      </div>
    </section>
  );
};
