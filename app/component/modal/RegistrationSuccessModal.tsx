'use client';

import React from 'react';
import Modal from './Modal';

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

export default function RegistrationSuccessModal({
  isOpen,
  onContinue,
}: RegistrationSuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onContinue}
      className="w-[420px] sm:w-[460px] px-10 py-12"
    >
      <div className="flex flex-col items-center text-center space-y-7">
        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          Registration success
        </h2>

        <button
          type="button"
          onClick={onContinue}
          className="mt-2 inline-flex items-center justify-center px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}

