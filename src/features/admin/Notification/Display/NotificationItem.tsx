import * as React from "react";

interface NotificationItemProps {
  avatar: string;
  message: string;
}

export function NotificationItem({ avatar, message }: NotificationItemProps) {
  return (
    <article className="flex items-center p-2.5 mb-3.5 rounded-2xl bg-zinc-300 bg-opacity-30 max-sm:p-2">
      <div className="mr-3.5">
        <div className="text-sm font-extrabold bg-blue-300 rounded-full h-[18px] text-stone-900 w-[18px] flex items-center justify-center">
          {avatar}
        </div>
      </div>
      <p className="text-xs leading-normal text-black">{message}</p>
    </article>
  );
}
