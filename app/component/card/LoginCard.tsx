'use client';

import React from 'react';
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
  return (
    <div className="w-full max-w-md rounded-3xl bg-white/90 shadow-xl border border-gray-200/60 backdrop-blur-sm px-8 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>

      <form className="space-y-5">
        <FormInput
          type="email"
          label="Email"
          placeholder="Enter email"
        />

        <FormInput
          type="password"
          label="Password"
          placeholder="Password"
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

        <LoginButton className="w-full" />

        <SocialLogin />
      </form>
    </div>
  );
}

