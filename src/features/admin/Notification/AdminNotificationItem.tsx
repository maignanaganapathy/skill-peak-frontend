"use client";
import {
  Paper,
  Switch,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface AdminNotificationItemProps {
  id: string;
  title: string;
  message: string;
  isPublished: boolean;
  onTogglePublish: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AdminNotificationItem = ({
  id,
  title,
  message,
  isPublished,
  onTogglePublish,
  onDelete,
}: AdminNotificationItemProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "16px",
        p: 2,
        mb: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "black" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(0, 0, 0, 0.6)", mt: 1 }}
          >
            {message}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {isPublished ? "Published" : "Draft"}
            </Typography>
            <Switch
              checked={isPublished}
              onChange={() => onTogglePublish(id)}
              color="primary"
            />
          </Stack>
          <IconButton
            onClick={() => onDelete(id)}
            size="small"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};
