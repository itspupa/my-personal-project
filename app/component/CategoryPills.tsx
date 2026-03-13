'use client';

import React from 'react';

interface CategoryPillsProps {
  categories: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function CategoryPills({
  categories,
  value,
  onChange,
  className = '',
}: CategoryPillsProps) {
  return (
    <div
      className={`flex items-center gap-4 overflow-x-auto no-scrollbar ${className}`}
    >
      {categories.map((cat) => {
        const active = value === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange?.(cat)}
            className={[
              'whitespace-nowrap text-sm md:text-base font-medium text-black transition-colors',
              active ? 'font-semibold underline underline-offset-4' : 'opacity-70 hover:opacity-100',
            ].join(' ')}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

