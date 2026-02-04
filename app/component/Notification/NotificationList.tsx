'use client';

import React from 'react';
import NotificationItem from './NotificationItem';

export interface NotificationData {
  id: string;
  avatar: string;
  name: string;
  message: string;
  timestamp: string;
}

interface NotificationListProps {
  notifications?: NotificationData[];
  className?: string;
}

export default function NotificationList({
  notifications = [],
  className = '',
}: NotificationListProps) {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className={`
      bg-[#FDFDFD] rounded-xl shadow-lg border border-gray-100
      overflow-hidden
      min-w-[320px] max-w-[400px]
      ${className}
    `}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          avatar={notification.avatar}
          name={notification.name}
          message={notification.message}
          timestamp={notification.timestamp}
        />
      ))}
    </div>
  );
}
