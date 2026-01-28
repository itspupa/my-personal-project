'use client';

import React from 'react';
import FormInput from '../input/FormInput';
import GetStartedButton from '../button/GetStartedButton';
import SocialSignUp from './SocialSignUp';
import ForgotPassword from './ForgotPassword';
import AlreadyHaveAccount from './AlreadyHaveAccount';

interface CreateAccountCardProps {
  title?: string;
  subtitle?: string;
}

export default function CreateAccout({
  title = 'Create Your Account',
  subtitle = 'Start your BLOG journey with us in a few steps',
}: CreateAccountCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white/90 shadow-xl border border-gray-200/60 backdrop-blur-sm px-8 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>

      <form className="space-y-4">
        <FormInput
          type="text"
          label="Your name"
          placeholder="Enter your name"
        />

        <FormInput
          type="email"
          label="Email"
          placeholder="you@example.com"
        />

        <FormInput
          type="password"
          label="Password"
          placeholder="••••••••"
        />

        <ForgotPassword />

        <GetStartedButton />

        <SocialSignUp />
      </form>

      <AlreadyHaveAccount />
    </div>
  );
}

