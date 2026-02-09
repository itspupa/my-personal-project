'use client';

import React from 'react';
import Link from 'next/link';
import Modal from './Modal';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[400px] px-8 py-10">
      <div className="flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create an account to<br />continue
        </h2>

        {/* Create Account Button */}
        <Link
          href="/register"
          onClick={onClose}
          className="w-full max-w-[200px] h-12 flex items-center justify-center bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors mb-6"
        >
          Create account
        </Link>

        {/* Already have account */}
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            onClick={onClose}
            className="text-gray-900 font-medium underline hover:text-gray-700 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </Modal>
  );
}
