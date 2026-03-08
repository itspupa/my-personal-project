'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeaderUserBar from '../../component/HeaderUserBar';
import ProfileSidebar from '../../component/profile/ProfileSidebar';
import ResetPasswordForm from '../../component/profile/ResetPasswordForm';

interface ProfileData {
  id: string;
  name: string;
  username: string | null;
  email: string;
  avatar?: string | null;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (!isMounted) return;
        if (data.success && data.data) {
          setProfile(data.data);
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleReset = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await fetch('/api/profile/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      await res.json();
      // จะเพิ่ม toast แจ้งผลทีหลังก็ได้
    } catch {
      // เงียบไว้ก่อน
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-3">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            hh.
          </Link>
          <HeaderUserBar userName={profile.name} avatarSrc={profile.avatar ?? undefined} />
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          <ProfileSidebar
            activePage="reset-password"
            userName={profile.name}
            avatarSrc={profile.avatar ?? undefined}
          />

          <ResetPasswordForm onReset={handleReset} />
        </div>
      </main>
    </div>
  );
}

