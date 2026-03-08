'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '../input/FormInput';
import LoginButton from '../button/LoginButton';
import ForgotPassword from './ForgotPassword';
import SocialLogin from './SocialLogin';

interface LoginCardProps {
  title?: string;
  subtitle?: string;
}

export default function LoginCard({
  title = 'WELCOME',
  subtitle = 'Ready to continue your Blog with us?',
}: LoginCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Login failed');
        return;
      }

      // ล็อกอินสำเร็จแล้ว เด้งไปหน้า homepage
      router.push('/homepages');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white/90 shadow-xl border border-gray-200/60 backdrop-blur-sm px-8 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <FormInput
          type="email"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
            <input
              type="checkbox"
              className="cursor-pointer h-4 w-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400"
            />
            <span>Remember me</span>
          </label>
          <ForgotPassword />
        </div>

        <LoginButton className="w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </LoginButton>

        <SocialLogin />
      </form>
    </div>
  );
}

