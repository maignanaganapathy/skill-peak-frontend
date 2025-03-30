// SectionList.tsx
import React, { useState, useEffect, useRef, RefObject } from "react";
import { Box } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormSection, FormSectionProps } from "./FormSection";
import { api } from "../../../utils/axiosConfig";
import { Section } from "./section";
import { AddSectionButton } from "./AddSectionButton";
import { BACKEND_URL } from "../../../config";

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  createdAt: string;
  createdById: number;
  updatedAt: string;
  updatedById: number;
  sections: Section[];
  createdBy: { id: number; email: string };
  updatedBy: { id: number; email: string };
}

interface SectionListProps {
  projectId: number;
  projects: Project[]; // Receive projects as prop
  allQuizzes: any[]; // Receive allQuizzes as prop
}

const SectionList: React.FC<SectionListProps> = ({ projectId, projects, allQuizzes }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sectionBeingEdited, setSectionBeingEdited] = useState<Section | undefined>(undefined);
  const [openProgramFormSectionId, setOpenProgramFormSectionId] = useState<number | null>(null);
  const [isAddSectionExpanded, setIsAddSectionExpanded] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // No need to fetch projects here anymore, they are passed as props

  const handleOpenProgramForm = (sectionId: number | null = null) => {
    setOpenProgramFormSectionId(sectionId);
    setIsEditing(false);
    setIsAddSectionExpanded(false);
  };

  const handleAddSectionToggle = () => {
    setIsAddSectionExpanded(!isAddSectionExpanded);
    setOpenProgramFormSectionId(null);
    setIsEditing(false);

    // Scroll to the form if it's being opened
    if (!isAddSectionExpanded) {
      setTimeout(() => { // Use setTimeout to wait for the form to render
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  const addSection = async (
    newSectionData: Omit<Section, "id" | "createdAt" | "updatedAt" | "createdById" | "updatedById">
  ) => {
    try {
      const payload = {
        ...newSectionData,
        quizId: newSectionData.quizId ? Number(newSectionData.quizId) : null,
      };

      const response = await api.post(`${BACKEND_URL}/sections`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);

      // Update the local projects state (you might need to adjust how this is done)
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            sections: [...(project.sections || []), response.data],
          };
        }
        return project;
      });
      // Consider how to update the Program component's state if needed

      setOpenProgramFormSectionId(null);
      setIsEditing(false);
      setSectionBeingEdited(undefined);
      setIsAddSectionExpanded(false);
    } catch (error: any) {
      console.error("Error creating section:", error);
      // Remove the alert
      // alert("Failed to create section.");
      // Optionally, you could set an error state here if you want to display a message later
    }
  };

  const handleEditClick = (section: Section) => {
    setIsEditing(true);
    setOpenProgramFormSectionId(null);
    setIsAddSectionExpanded(false);
    setSectionBeingEdited(section);
  };

  const updateSection = async (updatedSection: Section) => {
    try {
      await api.put(`${BACKEND_URL}/sections/${updatedSection.id}`, updatedSection, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Update the local projects state (adjust as needed)
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              sections: project.sections.map((section) =>
                section.id === updatedSection.id ? updatedSection : section
              ),
            }
          : project
      );
      // Consider updating Program's state

      setOpenProgramFormSectionId(null);
      setIsEditing(false);
      setIsAddSectionExpanded(false);
      setSectionBeingEdited(undefined);
    } catch (error) {
      console.error("Error updating section:", error);
      // Remove the alert
      // alert("Failed to update section.");
      // Optionally, you could set an error state here
    }
  };

  const deleteSection = async (sectionId: number) => {
    try {
      await api.delete(`${BACKEND_URL}/sections/${sectionId}`);
      // Update the local projects state (adjust as needed)
      const updatedProjects = projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              sections: project.sections.filter((section) => section.id !== sectionId),
            }
          : project
      );
      // Consider updating Program's state
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section."); // Keep this alert for deletion feedback
    }
  };

  const currentProject = projects.find((project) => project.id === projectId);
  const currentProjectSections: Section[] = currentProject?.sections || [];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {currentProjectSections.map((section) => (
        <React.Fragment key={section.id}>
          <SectionCard
            section={section}
            onDelete={() => deleteSection(section.id)}
            onEdit={handleEditClick}
            onAddProgram={() => handleOpenProgramForm(section.id)}
          />
          {openProgramFormSectionId === section.id && !isEditing && (
            <FormSection // Using FormSection
              isExpanded={openProgramFormSectionId === section.id}
              onSectionCreated={addSection} // Using addSection
              projectId={projectId}
              quizzes={allQuizzes} // Use allQuizzes here
            />
          )}
        </React.Fragment>
      ))}

      {/* Add Section Button */}
      <AddSectionButton isExpanded={isAddSectionExpanded} onToggle={handleAddSectionToggle} />

      {/* Form to add a new section */}
      {isAddSectionExpanded && (
        <FormSection
          ref={formSectionRef} // Attach the ref here
          isExpanded={isAddSectionExpanded}
          onSectionCreated={addSection}
          projectId={projectId}
          quizzes={allQuizzes}
        />
      )}
    </Box>
  );
};

export default SectionList;
