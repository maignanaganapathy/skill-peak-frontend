"use client";
import * as React from "react";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItem";

interface Notification {
  id: string;
  title: string;
  message: string;
  isPublished: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
}

export default function NotificationPanel({
  notifications,
}: NotificationPanelProps) {
  // Filter only published notifications
  const publishedNotifications = notifications.filter((n) => n.isPublished);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <section className="p-4 max-sm:p-2">
        <div className="px-2.5 py-1.5 bg-white rounded-md border border-solid border-zinc-300 w-[196px] max-md:mx-auto max-md:my-0 max-md:w-full max-md:max-w-[400px] max-sm:p-1.5">
          <NotificationHeader />
          {publishedNotifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              avatar={notification.title[0].toUpperCase()}
              message={notification.message}
            />
          ))}
          {publishedNotifications.length === 0 && (
            <p className="text-sm text-gray-500 text-center p-4">
              No published notifications
            </p>
          )}
        </div>
      </section>
    </>
  );
}
