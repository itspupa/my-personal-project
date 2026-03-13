'use client';

import React from 'react';

export interface ArticleRow {
  id: string;
  title: string;
  category: string;
  status: 'Draft' | 'Published';
  updatedAt: string;
}

interface ArticleTableProps {
  rows: ArticleRow[];
  onEdit: (row: ArticleRow) => void;
  onDelete: (row: ArticleRow) => void;
}

export default function ArticleTable({ rows, onEdit, onDelete }: ArticleTableProps) {
  if (!rows.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
        <p className="text-gray-700 font-medium">No articles yet</p>
        <p className="mt-1 text-sm text-gray-500">Create your first article.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[720px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium w-[180px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-900">{row.title}</td>
                <td className="px-5 py-4 text-gray-700">{row.category}</td>
                <td className="px-5 py-4">
                  <span
                    className={[
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      row.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800',
                    ].join(' ')}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">{row.updatedAt}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="h-9 px-3 rounded-full bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="h-9 px-3 rounded-full bg-white text-gray-900 text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

