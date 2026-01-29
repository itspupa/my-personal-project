'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'What are you looking for?',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative flex items-center w-full max-w-lg ${className}`}>
      {/* Main Container */}
      <div className="group flex items-center w-full bg-[#F5F5F5] hover:bg-white rounded-full shadow-sm border border-transparent hover:border-purple-300 overflow-hidden">
        {/* Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-5 py-3 bg-transparent group-hover:bg-white text-gray-700 placeholder-gray-700 font-semibold focus:outline-none text-base"
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center w-11 h-11 bg-black hover:bg-gray-800 rounded-full ml-2 mr-2 my-1 transition-colors duration-200"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
