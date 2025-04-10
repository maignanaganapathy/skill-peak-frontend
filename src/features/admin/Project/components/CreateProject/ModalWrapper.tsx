import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputDesign from "./InputDesign";

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
}

interface ModalWrapperProps {
  onProjectCreated: () => void;
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  onProjectCreated, open, onClose, project
}) => {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setMode("edit");
      setProjectData(project);
    } else {
      setMode("create");
      setProjectData(null);
    }
  }, [project]);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    width: 400,
    maxWidth: "95vw",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#1E4D92",
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {/* ✅ InputDesign now always gets the correct project data */}
        <InputDesign
          onProjectCreated={onProjectCreated}
          onClose={onClose}
          project={projectData}
        />
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
