'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '../input/FormInput';
import GetStartedButton from '../button/GetstartedButton';
import SocialSignUp from './SocialSignUp';
import ForgotPassword from './ForgotPassword';
import AlreadyHaveAccount from './AlreadyHaveAccount';
import RegistrationSuccessModal from '../modal/RegistrationSuccessModal';

interface CreateAccountCardProps {
  title?: string;
  subtitle?: string;
}

export default function CreateAccout({
  title = 'Create Your Account',
  subtitle = 'Start your BLOG journey with us in a few steps',
}: CreateAccountCardProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const username =
        email && email.includes('@') ? email.split('@')[0] : undefined;

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, username }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Registration failed');
        return;
      }

      setShowSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md rounded-3xl bg-white/90 shadow-xl border border-gray-200/60 backdrop-blur-sm px-8 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <FormInput
            type="text"
            label="Your name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormInput
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormInput
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <ForgotPassword />

          <GetStartedButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Get started'}
          </GetStartedButton>

          <SocialSignUp />
        </form>

        <AlreadyHaveAccount />
      </div>

      <RegistrationSuccessModal
        isOpen={showSuccess}
        onContinue={() => {
          setShowSuccess(false);
          router.push('/homepages');
        }}
      />
    </>
  );
}

