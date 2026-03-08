'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeaderUserBar from '../component/HeaderUserBar';
import ProfileSidebar from '../component/profile/ProfileSidebar';
import ProfileForm from '../component/profile/ProfileForm';

interface ProfileData {
  id: string;
  name: string;
  username: string | null;
  email: string;
  avatar?: string | null;
}

export default function ProfilePage() {
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

  const handleSave = async (data: { name: string; username: string; email: string; avatar?: string | null }) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          avatar: data.avatar ?? null,
        }),
      });

      const resp = await res.json();
      if (res.ok && resp.success && resp.data) {
        setProfile(resp.data);
      }
    } catch {
      // เงียบไว้ก่อน หรือจะเพิ่ม toast ทีหลังก็ได้
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
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
            activePage="profile"
            userName={profile.name}
            avatarSrc={profile.avatar ?? undefined}
          />

          <ProfileForm
            initialName={profile.name}
            initialUsername={profile.username ?? ''}
            initialEmail={profile.email}
            initialAvatar={profile.avatar ?? undefined}
            onSave={handleSave}
          />
        </div>
      </main>
    </div>
  );
}

