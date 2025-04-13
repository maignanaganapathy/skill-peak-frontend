import React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useNavigate } from "react-router-dom";

interface TeamDashboardCardProps {
  projectId: number;
  teamCount: number;
}

const TeamDashboardCard: React.FC<TeamDashboardCardProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      onClick={() => navigate(`/project/${projectId}/teams`)}
      sx={{
        width: "100%",
        maxWidth: "730px",
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        borderRadius: 2,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Diversity3Icon />
          <Typography variant="h6" fontWeight="bold" color="inherit" pl={2}>
            Team Dashboard
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamDashboardCard;
