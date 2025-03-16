"use client";
import { useState } from "react";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";

interface NotificationFormProps {
  onSubmit: (notification: { title: string; message: string }) => void;
}

export const NotificationForm = ({ onSubmit }: NotificationFormProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && message.trim()) {
      onSubmit({ title, message });
      setTitle("");
      setMessage("");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "16px",
        p: 2.5,
        mb: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "black" }}>
        Create New Notification
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            label="Notification Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#1a237e",
              "&:hover": {
                backgroundColor: "#0d1642",
              },
            }}
          >
            Create Notification
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
