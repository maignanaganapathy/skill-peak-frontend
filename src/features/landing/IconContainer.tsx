import React from "react";
import { CustomIcons } from "./CustomIcons";

interface IconContainerProps {
  icon: 'assessment' | 'interactive' | 'post-assessment' | 'learning' | 'evaluation' | 'certificate';
}

export const IconContainer: React.FC<IconContainerProps> = ({ icon }) => {
  const iconMap = {
    'assessment': <CustomIcons.Assessment />,
    'interactive': (
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa96f5bcfcdfbf20e4bd3aa419e5539621e726b9"
        alt="Meeting room icon"
        className="w-[30px] h-[30px] absolute left-[7px] top-[8px]"
      />
    ),
    'post-assessment': <CustomIcons.PostAssessment />,
    'learning': (
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a1c3133fa2e325aa91fdca4c590039cfca7e1d3"
        alt="Critical thinking icon"
        className="w-[32px] h-[32px] absolute left-[6px] top-[8px]"
      />
    ),
    'evaluation': <CustomIcons.Evaluation />,
    'certificate': (
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e54d6467fc30d16ccc5220cd78393d073703d85"
        alt="Certificate icon"
        className="w-[41px] h-[41px] absolute left-[1px] top-[2px]"
      />
    ),
  } as const;

  return (
    <div className="flex-[shrink] h-[45px] w-[43px]">
      <div className="relative bg-blue-300 rounded-xl h-[45px] w-[43px]">
        {iconMap[icon]}
      </div>
    </div>
  );
};
