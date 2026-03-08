'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileSidebarProps {
  userName?: string;
  avatarSrc?: string;
  activePage?: 'profile' | 'reset-password';
}

export default function ProfileSidebar({
  userName = 'Moodeng ja',
  avatarSrc,
  activePage = 'profile',
}: ProfileSidebarProps) {
  const menuItems = [
    {
      key: 'profile' as const,
      label: 'Profile',
      href: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: 'reset-password' as const,
      label: 'Reset password',
      href: '/profile/reset-password',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-56 flex-shrink-0">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={userName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <span className="font-semibold text-gray-900">{userName}</span>
        <span className="text-gray-400 text-lg font-light">Profile</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activePage === item.key
                ? 'text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className={activePage === item.key ? 'text-gray-700' : 'text-gray-400'}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
