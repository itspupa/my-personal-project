'use client';

import React from 'react';
import LoginCard from '../component/card/LoginCard';
import BackButton from '../component/button/BackButton';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen w-full bg-[#90caf9]"
      style={{ backgroundImage: 'var(--bg-grad-waves)' }}
    >
      <div className="w-full px-4 py-3">
        <BackButton />
      </div>
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-start px-6 pt-12 pb-16">
        <LoginCard />
      </div>
    </div>
  );
}

