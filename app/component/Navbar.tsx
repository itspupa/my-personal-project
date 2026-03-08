'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginButton from './button/LoginButton';
import SignUpButton from './button/SignUpButton';
import HeaderUserBar from './HeaderUserBar';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  username?: string | null;
  avatar?: string | null;
}

export default function Navbar() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted) return;
        if (data.success && data.data) {
          setUser(data.data);
        }
      } catch {
        // ignore
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {user ? (
            <HeaderUserBar userName={user.name} avatarSrc={user.avatar ?? undefined} />
          ) : (
            <>
              <SignUpButton href="/register" />
              <Link href="/login">
                <LoginButton />
              </Link>
            </>
          )}
        </div>
      </nav>
      <section className="min-h-[40vh] w-full flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Welcome to our Website
          </h1>
          <p className="text-xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Get started your <span className="text-4xl md:text-5xl">&quot;BLOG&quot;</span> with us
          </p>
        </div>
      </section>
    </header>
  );
}

