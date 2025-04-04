import React from "react";
import pre from "./assets/pre.png"; // These imports are in the body
import post from "./assets/post.png";
import mid from "./assets/mid.png";
import Interactive from "./assets/Interactive.png";
import certificate from "./assets/certificate.png";
import activities from "./assets/activities.png";

interface IconContainerProps {
  icon: 'pre' | 'interactive' | 'post' | 'activities' | 'mid' | 'certificate';
}

export const IconContainer: React.FC<IconContainerProps> = ({ icon }) => {
  const iconMap = {
    'pre': (
      <img
        src={pre}
        alt="Pre-training Assessment icon"
        className="w-[30px] h-[30px] absolute left-[7px] top-[8px]"
      />
    ),
    'interactive': (
      <img
        src={Interactive}
        alt="Interactive Activities icon"
        className="w-[30px] h-[30px] absolute left-[7px] top-[8px]"
      />
    ),
    'post': (
      <img
        src={post}
        alt="Post-training Assessment icon"
        className="w-[30px] h-[30px] absolute left-[7px] top-[8px]"
      />
    ),
    'activities': (
      <img
        src={activities}
        alt="Engaging Learning Modules icon"
        className="w-[32px] h-[32px] absolute left-[6px] top-[8px]"
      />
    ),
    'mid': (
      <img
        src={mid}
        alt="Mid-training Evaluation icon"
        className="w-[30px] h-[30px] absolute left-[7px] top-[8px]"
      />
    ),
    'certificate': (
      <img
        src={certificate}
        alt="Downloadable Certificate icon"
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

