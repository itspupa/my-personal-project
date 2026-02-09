'use client';

import React, { useState } from 'react';

interface CommentInputProps {
  placeholder?: string;
  onSubmit?: (comment: string) => void;
  onFocus?: () => void;
}

export default function CommentInput({
  placeholder = 'Write how you feel in a gest...',
  onSubmit,
  onFocus,
}: CommentInputProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() && onSubmit) {
      onSubmit(comment);
      setComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-3 py-4">
      {/* Default Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-gray-500"
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

      {/* Input */}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {/* Send Button */}
      {comment.trim() && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition-colors"
        >
          Send
        </button>
      )}
    </div>
  );
}
