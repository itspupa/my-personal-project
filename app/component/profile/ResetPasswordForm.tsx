'use client';

import React, { useState } from 'react';

interface ResetPasswordFormProps {
  onReset?: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
}

export default function ResetPasswordForm({ onReset }: ResetPasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (onReset) {
      onReset({ currentPassword, newPassword, confirmPassword });
    }
  };

  return (
    <div className="flex-1 bg-[#f0f0f0] rounded-2xl border border-gray-200 shadow-md p-8 max-w-xl">
      {/* Form Fields */}
      <div className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Confirm new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-8">
        <button
          onClick={handleReset}
          className="px-8 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Reset password
        </button>
      </div>
    </div>
  );
}
