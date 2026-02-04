'use client';

import React from 'react';
import Image from 'next/image';

interface NotificationIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  hasBadge?: boolean;
}

export default function NotificationIcon({
  className = '',
  hasBadge = false,
  ...props
}: NotificationIconProps) {
  return (
    <button
      type="button"
      className={`
        w-10 h-10 rounded-full bg-white border border-gray-200
        flex items-center justify-center
        hover:bg-gray-50 hover:border-gray-300
        transition-colors
        relative
        ${className}
      `}
      aria-label="Notifications"
      {...props}
    >
      <Image
        src="/iconbell.svg"
        alt="Notifications"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      {hasBadge && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      )}
    </button>
  );
}
