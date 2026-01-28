'use client';

import React from 'react';
import Link from 'next/link';

interface ForgotPasswordProps {
  href?: string;
  className?: string;
}

export default function ForgotPassword({ href = '#', className = '' }: ForgotPasswordProps) {
  return (
    <div className={`text-right ${className}`}>
      <Link
        href={href}
        className="text-sm text-purple-500 hover:text-purple-600 hover:underline transition-colors"
      >
        Forgot password?
      </Link>
    </div>
  );
}
