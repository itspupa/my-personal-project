'use client';

import React from 'react';
import SearchBar from './SearchBar';
import LoginButton from './button/LoginButton';
import SignUpButton from './button/SignUpButton';

export default function Navbar() {
  return (
    <header
      className="w-full bg-[#90caf9] border-b border-gray-200/50"
      style={{ backgroundImage: 'var(--bg-grad-waves)' }}
    >
      <nav className="flex items-center justify-between gap-4 w-full px-4 py-3">
        <div className="flex-1 max-w-2xl">
          <SearchBar />
        </div>
        <div className="w-32 shrink-0" />
        <div className="flex items-center gap-2 shrink-0">
          <SignUpButton href="/register" />
          <LoginButton />
        </div>
      </nav>
      <section className="min-h-[40vh] w-full flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Welcome to our Website
          </h1>
          <p className="text-xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Get started your <span className="text-4xl md:text-5xl">"BLOG"</span> with us
          </p>
        </div>
      </section>
    </header>
  );
}
