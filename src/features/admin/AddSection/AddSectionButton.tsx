import { Paper, Button, Typography } from "@mui/material";

interface AddSectionButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const AddSectionButton = ({
  isExpanded,
  onToggle,
}: AddSectionButtonProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "16px",
        p: 2.5,
      }}
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
};
