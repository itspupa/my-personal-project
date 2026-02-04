'use client';

import React from 'react';
import Image from 'next/image';

interface NotificationItemProps {
  avatar: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function NotificationItem({
  avatar,
  name,
  message,
  timestamp,
}: NotificationItemProps) {
  return (
    <div className="flex gap-3 py-3 px-4 hover:bg-gray-50 transition-colors">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name and Message */}
        <p className="text-sm text-gray-800 leading-relaxed">
          <span className="font-semibold">{name}</span>{' '}
          <span className="text-gray-600">{message}</span>
        </p>

        {/* Timestamp */}
        <p className="text-xs text-orange-400 mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
}
