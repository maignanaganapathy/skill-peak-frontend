import React, { useEffect } from "react";
import { IconButton } from "@mui/material";

interface CloseButtonProps {
  onClick?: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  const [Icon, setIcon] = React.useState<any>(null);

  useEffect(() => {
    import("@mui/icons-material/Close")
      .then((mod) => setIcon(() => mod.default))
      .catch((err) => console.error("Error loading icon", err));
  }, []);

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 17,
        right: 9,
      }}
      aria-label="close"
    >
      {Icon && <Icon sx={{ color: "#1E4D92" }} />}
    </IconButton>
  );
};
