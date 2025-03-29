import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormSection } from "./FormSection"; // Using FormSection
import axios from "axios";
import { Section } from "./section";
import { AddSectionButton } from "./AddSectionButton"; // Import the AddSectionButton component
import Cookies from "js-cookie"; // Import js-cookie
import { BACKEND_URL } from "../../../config"; // Import BACKEND_URL

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
    const [allQuizzes, setAllQuizzes] = useState<any[]>([]); // State for all quizzes
    const [openProgramFormSectionId, setOpenProgramFormSectionId] = useState<number | null>(null); // State for the open form
    const [isAddSectionExpanded, setIsAddSectionExpanded] = useState(false);

    const fetchProjects = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(response.data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            setProjects([]);
        }
    };

    const fetchAllQuizzes = async () => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            const response = await axios.post(
                `${BACKEND_URL}/quiz/list`,
                {}, // Assuming this is the correct endpoint and payload for fetching all quizzes
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const options = response.data.quizzes.map((quiz: any) => ({
                id: String(quiz.id),
                title: quiz.title,
            }));
            setAllQuizzes(options);
        } catch (error: any) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchAllQuizzes(); // Fetch all quizzes when the component mounts
    }, [projectId]);

    const handleOpenProgramForm = (sectionId: number | null = null) => {
        setOpenProgramFormSectionId(sectionId);
        setIsEditing(false);
        setIsAddSectionExpanded(false); // Close the add section button if it was open
    };

    const handleAddSectionToggle = () => {
        setIsAddSectionExpanded(!isAddSectionExpanded);
        setOpenProgramFormSectionId(null); // Close the form if it was open
        setIsEditing(false);
    };

    const addSection = async ( // Still using addSection as per your original code
        newSectionData: Omit<Section, "id" | "createdAt" | "updatedAt" | "createdById" | "updatedById">
    ) => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const payload = {
                ...newSectionData,
                quizId: newSectionData.quizId ? Number(newSectionData.quizId) : null, // Ensure quizId is correctly formatted
            };

            const response = await axios.post(
                `${BACKEND_URL}/sections`, // Use the correct endpoint
                payload,
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

            fetchProjects(); // Re-fetch projects to update the section list

            setOpenProgramFormSectionId(null);
            setIsEditing(false);
            setSectionBeingEdited(undefined);
            setIsAddSectionExpanded(false); // Close the add section button after adding
        } catch (error: any) {
            console.error("Error creating section:", error);
            alert("Failed to create section.");
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
            const token = Cookies.get('authToken');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            await axios.put(`${BACKEND_URL}/sections/${updatedSection.id}`, updatedSection, {
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
            fetchProjects(); // Re-fetch projects to update the section list
            setIsEditing(false);
            setOpenProgramFormSectionId(null);
            setIsAddSectionExpanded(false);
            setSectionBeingEdited(undefined);
        } catch (error) {
            console.error("Error updating section:", error);
            alert("Failed to update section.");
        }
    };

    const deleteSection = async (sectionId: number) => {
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
            await axios.delete(`${BACKEND_URL}/sections/${sectionId}`, {
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
            fetchProjects(); // Re-fetch projects to update the section list
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
                    isExpanded={isAddSectionExpanded}
                    onSectionCreated={addSection}
                    projectId={projectId}
                    quizzes={allQuizzes} // Use allQuizzes here
                />
            )}
        </Box>
    );
};

export default SectionList;