"use client";
import { Typography, Box } from "@mui/material";
import { AdminNotificationItem } from "./AdminNotificationItem";

interface Notification {
  id: string;
  title: string;
  message: string;
  isPublished: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onTogglePublish: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationList = ({
  notifications,
  onTogglePublish,
  onDelete,
}: NotificationListProps) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "black" }}>
        All Notifications
      </Typography>
      {notifications.length === 0 ? (
        <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
          No notifications created yet.
        </Typography>
      ) : (
        notifications.map((notification) => (
          <AdminNotificationItem
            key={notification.id}
            {...notification}
            onTogglePublish={onTogglePublish}
            onDelete={onDelete}
          />
        ))
      )}
    </Box>
  );
};
