'use client';

import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, className = '', ...props }: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
        {label}
      </label>
      <input
        className={`w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 bg-white/80 ${className}`}
        {...props}
      />
    </div>
  );
}
