'use client';

import React, { useEffect, useState, useRef } from 'react';
import NotificationIcon from './NotificationIcon';
import NotificationList, { NotificationData } from './NotificationList';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch('/api/notifications', { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data) {
        setHasUnread(Boolean(data.data.hasUnread));
        setNotifications(
          (data.data.items || []).map((item: any) => ({
            id: item.id,
            avatar: item.avatar,
            name: item.name,
            message: item.message,
            timestamp: new Date(item.timestamp).toLocaleString(),
          })),
        );
      }
    } catch {
      // ignore
    }
  };

  const handleToggle = async () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      await loadNotifications();
      // mark all as read ใน background
      fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read' }),
      }).catch(() => undefined);
      setHasUnread(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <NotificationIcon
        onClick={handleToggle}
        hasBadge={hasUnread}
      />
      {open && (
        <div className="absolute right-0 mt-2 z-50">
          <NotificationList notifications={notifications} />
        </div>
      )}
    </div>
  );
}

