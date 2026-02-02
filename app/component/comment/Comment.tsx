'use client';

import React from 'react';
import Image from 'next/image';

interface CommentProps {
  avatar?: string;
  userName: string;
  timestamp: string;
  comment: string;
}

export default function Comment({
  avatar,
  userName,
  timestamp,
  comment,
}: CommentProps) {
  return (
    <div className="flex gap-3 py-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={avatar}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-1">
        {/* User Name and Timestamp */}
        <div className="mb-2">
          <h4 className="text-lg font-semibold text-gray-900 leading-tight">
            {userName}
          </h4>
          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
            {timestamp}
          </p>
        </div>

        {/* Comment Text */}
        {comment && (
          <p className="text-sm text-gray-700 leading-relaxed mt-2">
            {comment}
          </p>
        )}
      </div>
    </div>
  );
}
