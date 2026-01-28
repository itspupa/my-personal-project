'use client';

import React from 'react';
import Link from 'next/link';

const buttonClass = `
  h-12 px-6 flex items-center justify-center
  bg-black 
  text-white 
  border-2 
  border-black 
  rounded-full 
  font-medium 
  hover:bg-gray-800 
  hover:border-gray-800
  transition-colors 
  duration-200
`;

interface SignUpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  href?: string;
}

export default function SignUpButton({ 
  children, 
  className = '', 
  href,
  ...props 
}: SignUpButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`${buttonClass} ${className}`}
      >
        {children || 'Sign up'}
      </Link>
    );
  }

  return (
    <button
      className={`${buttonClass} ${className}`}
      {...props}
    >
      {children || 'Sign up'}
    </button>
  );
}
