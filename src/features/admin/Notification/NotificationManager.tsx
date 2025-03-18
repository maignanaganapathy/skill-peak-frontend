"use client";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import { NotificationForm } from "./NotificationForm";
import { NotificationList } from "./NotificationList";
import NotificationPanel from "./Display/NotificationPanel";

interface Notification {
  id: string;
  title: string;
  message: string;
  isPublished: boolean;
}

export const NotificationManager = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleCreateNotification = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      isPublished: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleTogglePublish = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isPublished: !notification.isPublished }
          : notification,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <NotificationForm onSubmit={handleCreateNotification} />
        <NotificationList
          notifications={notifications}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDelete}
        />
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <NotificationPanel notifications={notifications} />
        </Box>
      </Box>
    </Container>
  );
};
