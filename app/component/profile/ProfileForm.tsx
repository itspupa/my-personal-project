'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileFormProps {
  initialName?: string;
  initialUsername?: string;
  initialEmail?: string;
  initialAvatar?: string;
  onSave?: (data: {
    name: string;
    username: string;
    email: string;
    avatar?: string | null;
  }) => Promise<void> | void;
}

export default function ProfileForm({
  initialName = 'Moodeng ja',
  initialUsername = 'moodeng.cute',
  initialEmail = 'moodeng.cute@gmail.com',
  initialAvatar,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [email] = useState(initialEmail);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialAvatar || null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    setSaving(true);
    setSavedMessage(null);
    try {
      await onSave({ name, username, email, avatar: avatarPreview });
      setSavedMessage('Saved successfully');
    } catch {
      setSavedMessage('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 bg-[#f0f0f0] rounded-2xl border border-gray-200 shadow-md p-8 max-w-xl">
      {/* Avatar Upload */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Profile picture"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <label className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors">
          Upload profile picture
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-0 py-2 text-sm text-gray-400 border-b border-gray-100 bg-transparent cursor-not-allowed"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        {savedMessage && (
          <span className="text-xs text-gray-600">{savedMessage}</span>
        )}
      </div>
    </div>
  );
}
