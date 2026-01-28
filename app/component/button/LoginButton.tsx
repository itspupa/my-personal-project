import React from 'react';

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function LoginButton({ 
  children, 
  className = '', 
  ...props 
}: LoginButtonProps) {
  return (
    <button
      className={`
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
        ${className}
      `}
      {...props}
    >
      {children || 'Login'}
    </button>
  );
}
