'use client';

import React from 'react';
import NotificationIcon from './NotificationIcon';
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
      <NotificationIcon />
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
