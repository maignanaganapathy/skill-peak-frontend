import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormSection } from "./FormSection";
import { Section } from "./section";
import { AddSectionButton } from "./AddSectionButton";
import {
    updateSection as updateSectionApi,
    deleteSection as deleteSectionApi,
} from "../../services/api";

import { Project } from "../../types/Project";
import TeamDashboardCard from "../TeamDashboardCard"; // Import the new component

interface SectionListProps {
    projectId: number;
    projects: Project[];
    allQuizzes: any[];
    onProjectsUpdated: (updatedProjects: Project[]) => void;
}

interface ProjectWithCount extends Project {
    _count: {
        teams: number;
    };
}

const SectionList: React.FC<SectionListProps> = ({ projectId, projects, allQuizzes, onProjectsUpdated }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [sectionBeingEdited, setSectionBeingEdited] = useState<Section | undefined>(undefined);
    const [openProgramFormSectionId, setOpenProgramFormSectionId] = useState<number | null>(null);
    const [isAddSectionExpanded, setIsAddSectionExpanded] = useState(false);
    const formSectionRef = useRef<HTMLDivElement>(null);
    const currentProjectWithCount = projects.find((project) => project.id === projectId) as ProjectWithCount | undefined;
    const currentProjectSections: Section[] = currentProjectWithCount?.sections || [];

    useEffect(() => {
        // No changes needed here as you are correctly finding the current project.
    }, [projectId, projects]);

    const handleOpenProgramForm = (sectionId: number | null = null) => {
        setOpenProgramFormSectionId(sectionId);
        setIsEditing(true);
        setIsAddSectionExpanded(false);
        const sectionToEdit = currentProjectWithCount?.sections?.find(s => s.id === sectionId);
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
        const updatedProjects = projects.map((project) => {
            if (project.id === projectId) {
                return {
                    ...project,
                    sections: [...(project.sections || []), newSection],
                };
            }
            return project;
        });
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
        try {
            const response = await updateSectionApi(updatedSection.id, updatedSection);
            const updatedProjects = projects.map((project) => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        sections: project.sections.map((section) =>
                            section.id === updatedSection.id ? response.data : section
                        ),
                    };
                }
                return project;
            });
            onProjectsUpdated(updatedProjects);
            setIsEditing(false);
            setOpenProgramFormSectionId(null);
            setSectionBeingEdited(undefined);
        } catch (error) {
            console.error("Error updating section:", error);
            alert("Failed to update section.");
        }
    };

    const deleteSection = async (sectionId: number) => {
        try {
            await deleteSectionApi(sectionId);
            const updatedProjects = projects.map((project) => {
                if (project.id === projectId) {
                    return {
                        ...project,
                        sections: project.sections.filter((section) => section.id !== sectionId),
                    };
                }
                return project;
            });
            onProjectsUpdated(updatedProjects);
        } catch (error) {
            console.error("Error deleting section:", error);
            alert("Failed to delete section.");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
            {currentProjectWithCount && (
                <TeamDashboardCard projectId={projectId} teamCount={currentProjectWithCount._count?.teams || 0} />
            )}
            {currentProjectSections.map((section) => (
                <React.Fragment key={section.id}>
                    <SectionCard
                        section={section}
                        onDelete={() => deleteSection(section.id)}
                        onEdit={handleEditClick}
                        onAddProgram={() => handleOpenProgramForm(section.id)}
                    />
                    {openProgramFormSectionId === section.id && (
                        <FormSection
                            isExpanded={openProgramFormSectionId === section.id}
                            onSectionCreated={updateSection}
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
                    ref={formSectionRef}
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