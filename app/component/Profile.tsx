'use client';

import React from 'react';
import Image from 'next/image';

interface ProfileProps {
  userName?: string;
  avatarSrc?: string;
  className?: string;
  onClick?: () => void;
  asButton?: boolean;
}

export default function Profile({
  userName = 'Moodeng ja',
  avatarSrc,
  className = '',
  onClick,
  asButton = true,
}: ProfileProps) {
  const content = (
    <>
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={userName}
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <svg
              className="w-5 h-5 text-gray-500"
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

      {/* User Name */}
      <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
        {userName}
      </span>

      {/* Dropdown Chevron */}
      <svg
        className="w-4 h-4 text-gray-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </>
  );

  const wrapperClass = `
    flex items-center gap-2
    px-2 py-1.5 rounded-full
    hover:bg-gray-100
    transition-colors
    cursor-pointer
    ${className}
  `;

  if (asButton && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={wrapperClass}
        aria-label="User menu"
      >
        {content}
      </button>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
