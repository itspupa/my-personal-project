'use client';

import React, { useState } from 'react';

interface AlertProps {
  title: string;
  description: string;
  variant?: 'danger' | 'success';
  onDismiss?: () => void;
  dismissible?: boolean;
}

export default function Alert({
  title,
  description,
  variant = 'danger',
  onDismiss,
  dismissible = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variantStyles = {
    danger: 'bg-red-400',
    success: 'bg-green-500',
  };

  return (
    <div className={`${variantStyles[variant]} rounded-lg p-4 relative w-[450px] min-h-[96px]`}>
      {/* Close Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          aria-label="Close alert"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="pr-8 flex flex-col gap-1">
        {/* Title */}
        <h3 className="text-lg font-bold text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
