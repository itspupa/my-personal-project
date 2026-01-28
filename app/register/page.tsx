'use client';

import React from 'react';
import CreateAccout from '../component/card/CreateAccout';

export default function Register() {
  return (
    <div
      className="min-h-screen w-full bg-[#90caf9]"
      style={{ backgroundImage: 'var(--bg-grad-waves)' }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <CreateAccout />
      </div>
    </div>
  );
}
