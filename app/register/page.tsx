'use client';

import React from 'react';
import CreateAccout from '../component/card/CreateAccout';
import BackButton from '../component/button/BackButton';

export default function Register() {
  return (
    <div
      className="min-h-screen w-full bg-[#90caf9]"
      style={{ backgroundImage: 'var(--bg-grad-waves)' }}
    >
      <div className="w-full px-4 py-3">
        <BackButton />
      </div>
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-start px-6 pt-4 pb-16">
        <CreateAccout />
      </div>
    </div>
  );
}

