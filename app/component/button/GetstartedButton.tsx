import React from 'react';

interface GetstartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function GetstartedButton({ 
  children, 
  className = '', 
  ...props 
}: GetstartedButtonProps) {
  return (
    <button
      className={`
        px-6 py-2 
        bg-[#ce93d8] 
        text-white 
        border-2 
        border-purple-300 
        rounded-full 
        font-medium 
        hover:bg-[#ba6bc4] 
        transition-colors 
        duration-200
        ${className}
      `}
      {...props}
    >
      {children || 'Getstarted'}
    </button>
  );
}
