import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormSection } from "./FormSection";
import { Section } from "./section";
import { AddSectionButton } from "./AddSectionButton";
import { api } from "../../../utils/axiosConfig"; // Ensure this import is present
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
  onProjectsUpdated: (updatedProjects: Project[]) => void; // Add this prop
}

const SectionList: React.FC<SectionListProps> = ({ projectId, projects, allQuizzes, onProjectsUpdated }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sectionBeingEdited, setSectionBeingEdited] = useState<Section | undefined>(undefined);
  const [openProgramFormSectionId, setOpenProgramFormSectionId] = useState<number | null>(null);
  const [isAddSectionExpanded, setIsAddSectionExpanded] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleOpenProgramForm = (sectionId: number | null = null) => {
    setOpenProgramFormSectionId(sectionId);
    setIsEditing(true);
    setIsAddSectionExpanded(false);
    const sectionToEdit = projects.find(p => p.id === projectId)?.sections.find(s => s.id === sectionId);
    setSectionBeingEdited(sectionToEdit);
  };

  const handleAddSectionToggle = () => {
    setIsAddSectionExpanded(!isAddSectionExpanded);
    setOpenProgramFormSectionId(null);
    setIsEditing(false);

    if (!isAddSectionExpanded) {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  const addSection = (newSection: Section) => {
    console.log("addSection function called (from FormSection callback)");
    // Update the local projects state with the newly created section
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          sections: [...(project.sections || []), newSection],
        };
      }
      return project;
    });
    // Call the function passed from the parent to update the state
    onProjectsUpdated(updatedProjects);

    setOpenProgramFormSectionId(null);
    setIsEditing(false);
    setSectionBeingEdited(undefined);
    setIsAddSectionExpanded(false);
  };

  const handleEditClick = (section: Section) => {
    setIsEditing(true);
    setOpenProgramFormSectionId(null);
    setIsAddSectionExpanded(false);
    setSectionBeingEdited(section);
  };

  const updateSection = async (updatedSection: Section) => {
    // ... (rest of the updateSection logic - no change needed here)
  };

  const deleteSection = async (sectionId: number) => {
    try {
      await api.delete(`${BACKEND_URL}/sections/${sectionId}`);
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return {
              ...project,
              sections: project.sections.filter((section) => section.id !== sectionId),
            };
        }
        return project;
      });
      console.log("Updated projects after delete:", updatedProjects);
      // Directly update the projects state in the parent
      onProjectsUpdated(updatedProjects);
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section.");
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
          {openProgramFormSectionId === section.id && (
            <FormSection // Using FormSection for editing
              isExpanded={openProgramFormSectionId === section.id}
              onSectionCreated={updateSection} // Using updateSection here
              projectId={projectId}
              quizzes={allQuizzes}
              sectionToEdit={sectionBeingEdited}
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