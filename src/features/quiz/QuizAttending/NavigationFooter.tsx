import React from "react";
import { Box, Button, Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import prev from "./assets/prev.svg";
import next from "./assets/next.svg";

interface NavigationFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
}

export const NavigationFooter: React.FC<NavigationFooterProps> = ({
  onPrevious,
  onNext,
  isLastQuestion,
  isFirstQuestion,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: isSmallScreen ? 50 : 60,
        backgroundColor: "#3E7CB1",
        display: "flex",
        alignItems: "center",
        justifyContent: isLastQuestion ? "center" : "space-around", // Center if last question
        zIndex: 1300,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        px: 2,
      }}
    >
      {/* Previous Button */}
      <Button
        onClick={onPrevious}
        startIcon={
          <img
            src={prev}
            alt="Previous"
            style={{
              height: isSmallScreen ? 20 : 24,
              width: isSmallScreen ? 20 : 24,
            }}
          />
        }
        sx={{
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          fontSize: isSmallScreen ? "0.875rem" : "1rem",
        }}
        disabled={isFirstQuestion} // Disable if it's the first question
      >
        Previous
      </Button>

      {/* Conditional Divider */}
      {!isLastQuestion && (
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            bgcolor: "white",
            height: isSmallScreen ? 30 : 70,
            borderRightWidth: isSmallScreen ? 3 : 5,
            mx: 2,
            opacity: 0.6,
          }}
        />
      )}

      {/* Conditional Next Button */}
      {!isLastQuestion && (
        <Button
          onClick={onNext}
          endIcon={
            <img
              src={next}
              alt="Next"
              style={{
                height: isSmallScreen ? 20 : 24,
                width: isSmallScreen ? 20 : 24,
              }}
            />
          }
          sx={{
            color: "white",
            fontWeight: 600,
            textTransform: "none",
            fontSize: isSmallScreen ? "0.875rem" : "1rem",
          }}
        >
          Next
        </Button>
      )}
    </Box>
  );
};