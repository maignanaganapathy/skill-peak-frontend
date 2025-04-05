import { usePermissions } from "../../../context/PermissionsContext";
import { Paper, Button, Typography } from "@mui/material";
import React, { forwardRef, Ref } from "react";
import { Permissions } from "../../../constants/Permissions"; 

interface AddSectionButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const AddSectionButton = forwardRef<HTMLDivElement, AddSectionButtonProps>(
  ({ isExpanded, onToggle }, ref) => {
    const { checkHasPermission } = usePermissions();

    if (!checkHasPermission(Permissions.CREATE_PROJECT)) {
      return null; 
    }

    return (
      <Paper
        elevation={0}
        sx={{
          border: "2px solid",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          p: 2.5,
          maxWidth: "730px",
          width: "100%",
          mx: "auto",
        }}
        ref={ref}
      >
        <Button
          fullWidth
          onClick={onToggle}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            color: "black",
          }}
        >
          <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
            Add Sections
          </Typography>
          <Typography
            sx={{
              ml: 1.25,
              fontSize: "1.5rem",
              fontWeight: 500,
              transition: "transform 0.3s",
              transform: isExpanded ? "rotate(45deg)" : "none",
            }}
          >
            +
          </Typography>
        </Button>
      </Paper>
    );
  }
);