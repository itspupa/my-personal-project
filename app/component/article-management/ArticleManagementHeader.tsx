'use client';

import React from 'react';

interface ArticleManagementHeaderProps {
  onCreate: () => void;
}

export default function ArticleManagementHeader({
  onCreate,
}: ArticleManagementHeaderProps) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Article management
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Create, edit, and manage your articles.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="h-10 px-4 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Create article
      </button>
    </div>
  );
}

