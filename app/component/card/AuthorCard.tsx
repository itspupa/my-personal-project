'use client';

import React from 'react';
import Image from 'next/image';

interface AuthorCardProps {
  avatar?: string;
  name: string;
  description?: string;
  isFollowing?: boolean;
  onFollow?: () => void;
}

export default function AuthorCard({
  avatar,
  name,
  description = 'I am a content creator. Enjoy writing about cats, I have 3 cats. I live in Bangkok, Thailand',
  isFollowing = false,
  onFollow,
}: AuthorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      {/* Author Info */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        {avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Name and Follow */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <button
            onClick={onFollow}
            className={`mt-1 px-4 py-1 text-sm rounded-full transition-colors ${
              isFollowing
                ? 'bg-gray-200 text-gray-700'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

      {/* Divider */}
      <hr className="my-4 border-gray-100" />

      {/* Recommendation */}
      <p className="text-sm text-gray-500 text-center">
        Read a good article worth sharing
      </p>
    </div>
  );
}
