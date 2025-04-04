import React from "react";
import { IconContainer } from "./IconContainer";

type IconType =
  | "pre"
  | "interactive"
  | "post"
  | "activities"
  | "mid"
  | "certificate";

interface SectionCardProps {
  icon: IconType;
  title: string;
  description: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <article className="flex gap-5">
      <div className="flex-shrink-0 w-[43px]">
        <IconContainer icon={icon} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-black mb-3">{title}</h2>
        <p className="text-base text-black -ml-[48px] mt-3">{description}</p>
      </div>
    </article>
  );
};

export const Sections: React.FC = () => {
  const leftSections: SectionCardProps[] = [
    {
      icon: "pre" as IconType,
      title: "Pre-training Assessment",
      description:
        "The pre-training assessment gauges participants' existing knowledge, ensuring they're prepared to engage with course material. This readiness check helps tailor the training to individual needs, optimizing the learning experience by addressing knowledge gaps and adjusting difficulty levels from the start.",
    },
    {
      icon: "interactive" as IconType,
      title: "Interactive Activities",
      description:
        "Engagement is key to retention, and our interactive activities – including quizzes, simulations, and discussion boards – ensure learners apply concepts in real-time. This hands-on approach enhances understanding and encourages active participation, making learning more dynamic and enjoyable.",
    },
    {
      icon: "post" as IconType,
      title: "Post-training Assessment",
      description:
        "Our post-training assessment provides a comprehensive final test and feedback, allowing learners to evaluate their growth. Self-reflection prompts offer insights into areas for future improvement, helping participants internalize learning while reinforcing key takeaways from the course.",
    },
  ];

  const rightSections: SectionCardProps[] = [
    {
      icon: "activities" as IconType,
      title: "Engaging Learning Modules",
      description:
        "Our multimedia-rich learning modules cater to diverse learning preferences, ensuring participants stay engaged. Videos, PDFs, presentations, and case studies offer varied perspectives and deepen understanding, making complex concepts more digestible while keeping learners actively involved throughout their journey.",
    },
    {
      icon: "mid" as IconType,
      title: "Mid-training Evaluation",
      description:
        "Mid-training evaluations, including practical exercises, allow participants to apply learned concepts. This reinforces skills, identifies areas for improvement, and promotes a deeper understanding. These exercises offer immediate feedback, ensuring learners stay on track to meet their training goals effectively.",
    },
    {
      icon: "certificate" as IconType,
      title: "Downloadable Certificate",
      description:
        "Upon completing the program, participants receive a downloadable certificate that validates their newly acquired skills. This certification not only boosts their professional profile but also serves as a testament to their commitment to personal development and career advancement.",
    },
  ];

  return (
    <section className="flex flex-col items-center px-5 py-20 w-full">
      <h1 className="mb-20 text-5xl font-bold tracking-tighter text-black leading-[60px]">
        SECTIONS
      </h1>
      <div className="flex flex-wrap justify-center gap-x-20 gap-y-10 max-w-[1200px]">
  <div className="flex flex-col gap-10 flex-1 max-md:w-full">
    
          {leftSections.map((section, index) => (
            <SectionCard
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10 flex-1 max-md:w-full">
          {rightSections.map((section, index) => (
            <SectionCard
              key={index}
              icon={section.icon}
              title={section.title}
              description={section.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};