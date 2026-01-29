'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function BackButton({ className = '', ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`
        inline-flex items-center justify-center gap-1
        h-12 px-6
        rounded-full
        font-medium
        text-white
        bg-black 
        border-2 
        border-black 
        hover:bg-gray-800 
        hover:border-gray-800
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
}

