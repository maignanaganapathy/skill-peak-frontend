import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "./theme";
import comingSoon from "./assets/comingsoon.png";
interface ComingSoonProps {}

const ComingSoon: React.FC<ComingSoonProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: theme.spacing(4),
        textAlign: "center",
      }}
    >
      <img src={comingSoon} alt="Coming Soon" style={{ width: "200px" }} />
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Coming Soon
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        paragraph
      ></Typography>
    </Box>
  );
};

export default ComingSoon;
