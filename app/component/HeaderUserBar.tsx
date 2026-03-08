'use client';

import React from 'react';
import NotificationBell from './Notification/NotificationBell';
import Profile from './Profile';
import UserDropdown from './dropdown/UserDropdown';

interface HeaderUserBarProps {
  userName?: string;
  avatarSrc?: string;
  className?: string;
}

export default function HeaderUserBar({
  userName = 'Moodeng ja',
  avatarSrc,
  className = '',
}: HeaderUserBarProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <NotificationBell />
      <UserDropdown
        trigger={
          <Profile
            userName={userName}
            avatarSrc={avatarSrc}
            asButton={false}
          />
        }
      />
    </div>
  );
}
