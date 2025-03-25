import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormSection } from "./FormSection"; // Using FormSection
import axios from "axios";
import Cookies from "js-cookie";
import { Section } from "./section";

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
}

const SectionList: React.FC<SectionListProps> = ({ projectId }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [sectionBeingEdited, setSectionBeingEdited] = useState<Section | undefined>(undefined);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [openProgramFormSectionId, setOpenProgramFormSectionId] = useState<number | null>(null); // State for the open form

    const fetchSections = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            const response = await axios.get(`http://localhost:5000/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data);

            const allQuizzes: any[] = [];
            response.data.forEach((project: any) => {
                if (project.sections) {
                    project.sections.forEach((section: any) => {
                        if (section.quizId) {
                            allQuizzes.push(section.quizId);
                        }
                    });
                }
            });
            setQuizzes(allQuizzes);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            setProjects([]);
        }
    };

    useEffect(() => {
        fetchSections();
    }, [projectId]);

    const handleOpenProgramForm = (sectionId: number) => {
        setOpenProgramFormSectionId(openProgramFormSectionId === sectionId ? null : sectionId);
        setIsEditing(false);
    };

    const addSection = async ( // Still using addSection as per your original code
        newSectionData: Omit<Section, "id" | "createdAt" | "updatedAt" | "createdById" | "updatedById">
    ) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/projects/${projectId}/sections`,
                {
                    ...newSectionData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("API Response:", response.data);

            setProjects((prevProjects) => {
                return prevProjects.map((project) => {
                    if (project.id === projectId) {
                        return {
                            ...project,
                            sections: [...(project.sections || []), response.data],
                        };
                    }
                    return project;
                });
            });

            fetchSections();

            setOpenProgramFormSectionId(null);
            setIsEditing(false);
            setSectionBeingEdited(undefined);
        } catch (error: any) {
            console.error("Error creating section:", error);
            alert("Failed to create section.");
        }
    };

    const handleEditClick = (section: Section) => {
        setIsEditing(true);
        setOpenProgramFormSectionId(null);
        setSectionBeingEdited(section);
    };

    const updateSection = async (updatedSection: Section) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            await axios.put(`http://localhost:5000/sections/${updatedSection.id}`, updatedSection, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === projectId
                        ? {
                              ...project,
                              sections: project.sections.map((section) =>
                                  section.id === updatedSection.id ? updatedSection : section
                              ),
                          }
                        : project
                )
            );
            setIsEditing(false);
            setOpenProgramFormSectionId(null);
            setSectionBeingEdited(undefined);
            fetchSections();
        } catch (error) {
            console.error("Error updating section:", error);
            alert("Failed to update section.");
        }
    };

    const deleteSection = async (sectionId: number) => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            await axios.delete(`http://localhost:5000/sections/${sectionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === projectId
                        ? {
                              ...project,
                              sections: project.sections.filter((section) => section.id !== sectionId),
                          }
                        : project
                )
            );
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
                    {openProgramFormSectionId === section.id && !isEditing && (
                        <FormSection // Using FormSection
                            isExpanded={openProgramFormSectionId === section.id}
                            onSectionCreated={addSection} // Using addSection
                            projectId={projectId}
                            quizzes={quizzes}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default SectionList;