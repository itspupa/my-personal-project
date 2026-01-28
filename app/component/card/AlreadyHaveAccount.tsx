'use client';

import React from 'react';
import Link from 'next/link';

interface AlreadyHaveAccountProps {
  loginHref?: string;
  className?: string;
}

export default function AlreadyHaveAccount({ loginHref = '/login', className = '' }: AlreadyHaveAccountProps) {
  return (
    <div className={`text-center pt-4 mt-4 border-t border-gray-200/60 ${className}`}>
      <span className="text-sm text-[var(--text-secondary)]">Already have an account? </span>
      <Link
        href={loginHref}
        className="text-sm text-purple-500 hover:text-purple-600 hover:underline transition-colors"
      >
        Log In
      </Link>
    </div>
  );
}
