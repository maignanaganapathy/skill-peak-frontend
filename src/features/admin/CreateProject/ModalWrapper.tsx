import React, { useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputDesign from "./InputDesign";

const ModalWrapper: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <>
      <Button variant="outlined" onClick={handleOpen}>
        New +
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#3E7CB1",
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <InputDesign onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default ModalWrapper;
