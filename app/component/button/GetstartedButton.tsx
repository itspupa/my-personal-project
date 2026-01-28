'use client';

import React from 'react';

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function GetStartedButton({
  children = 'Get started',
  className = '',
  ...props
}: GetStartedButtonProps) {
  return (
    <button
      type="button"
      className={`mt-4 w-full h-12 px-6 flex items-center justify-center bg-black text-white border-2 border-black rounded-full font-medium hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
