"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputDesign from "../AddSection/InputDesign";
import ModalWrapper from "../CreateProject/ModalWrapper"; 
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";




export const Program: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  const navigate = useNavigate();

const handleManagePermissions = () => {
  navigate("/access");
};

  return (
    <Box
      component="main"
      sx={{
        maxWidth: "730px",
        width: "100%",
        mx: "auto",
        p: 2.5,
      }}
    >
       {/* Header with title and ModalWrapper */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: "#000",
      }}
    >
      Program Creation
    </Typography>

    <ModalWrapper />
  </Box>

      <Card
        sx={{
          border: "2px solid",
          borderColor: "grey.300",
          borderRadius: 4,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 82,
              height: 80,
              borderRadius: "50%",
              border: "1px solid #1E4D92",
              backgroundColor: "#f0f0f0",
            }}
          />

          <Stack spacing={1} sx={{ flexGrow: 1, minHeight: 80 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              SIEMENS SCHOLARSHIP PROGRAM
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              15 May, 2025
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              Chennai
            </Typography>
          </Stack>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              gap: 2.5,
              alignItems: "center",
            }}
          >
         <IconButton size="small">
  <EditIcon sx={{ fontSize: 20, color: "#000" }} />
</IconButton>
<IconButton size="small">
  <DeleteIcon sx={{ fontSize: 20, color: "#000" }} />
</IconButton>
<IconButton size="small" onClick={handleManagePermissions}>
  <ManageAccountsIcon sx={{ fontSize: 20, color: "#000" }} />
</IconButton>



            <IconButton
              size="small"
              onClick={handleToggle}
              sx={{
                width: 25,
                height: 25,
                bgcolor: "primary.main",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 27,
                  color: "#fff",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Accordion Section */}
      {isExpanded && (
        <Box mt={2}>
          <InputDesign/>

        </Box>
      )}
    </Box>
  );
};

export default Program;
