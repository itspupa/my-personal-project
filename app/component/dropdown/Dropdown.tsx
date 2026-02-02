'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  id: string;
  type: 'item' | 'separator';
  label?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

export default function Dropdown({ trigger, items, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100 py-2 z-50">
          {items.map((item) =>
            item.type === 'separator' ? (
              <div key={item.id} className="my-2 border-t border-gray-200" />
            ) : item.href ? (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-gray-600 shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="w-5 h-5 flex items-center justify-center text-gray-600 shrink-0">
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
