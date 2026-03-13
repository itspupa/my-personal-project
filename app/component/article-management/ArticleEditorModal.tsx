'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';

export interface ArticleDraft {
  title: string;
  category: string;
  status: 'Draft' | 'Published';
  content: string;
}

interface ArticleEditorModalProps {
  isOpen: boolean;
  initialValue?: ArticleDraft;
  onClose: () => void;
  onSave: (draft: ArticleDraft) => void;
}

export default function ArticleEditorModal({
  isOpen,
  initialValue,
  onClose,
  onSave,
}: ArticleEditorModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [status, setStatus] = useState<ArticleDraft['status']>('Draft');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setTitle(initialValue?.title ?? '');
    setCategory(initialValue?.category ?? 'General');
    setStatus(initialValue?.status ?? 'Draft');
    setContent(initialValue?.content ?? '');
  }, [isOpen, initialValue]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      category,
      status,
      content,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[640px] max-w-[92vw] px-8 py-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Article</h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details then save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Article title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ArticleDraft['status'])}
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Category (e.g. Cat)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[180px] px-4 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Write your article content..."
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-full bg-white text-gray-900 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim()}
            className="h-10 px-4 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

