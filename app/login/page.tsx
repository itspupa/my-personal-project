'use client';

import React from 'react';
import LoginCard from '../component/card/LoginCard';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen w-full bg-[#90caf9]"
      style={{ backgroundImage: 'var(--bg-grad-waves)' }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <LoginCard />
      </div>
    </div>
  );
}

