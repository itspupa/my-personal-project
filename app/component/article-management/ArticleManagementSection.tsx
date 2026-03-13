'use client';

import React, { useMemo, useState } from 'react';
import ArticleManagementHeader from './ArticleManagementHeader';
import ArticleTable, { ArticleRow } from './ArticleTable';
import ArticleEditorModal, { ArticleDraft } from './ArticleEditorModal';
import { coursePosts } from '../../data/coursePosts';

export default function ArticleManagementSection() {
  const seedArticles: ArticleRow[] = useMemo(
    () =>
      coursePosts.slice(0, 6).map((p) => ({
        id: String(p.id),
        title: p.title,
        category: p.category,
        status: 'Published',
        updatedAt: p.date,
      })),
    [],
  );

  const [articles, setArticles] = useState<ArticleRow[]>(seedArticles);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<ArticleRow | null>(null);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };

  const openEdit = (row: ArticleRow) => {
    setEditing(row);
    setEditorOpen(true);
  };

  const handleDelete = (row: ArticleRow) => {
    setArticles((prev) => prev.filter((a) => a.id !== row.id));
  };

  const handleSaveDraft = (draft: ArticleDraft) => {
    const now = new Date().toLocaleString();
    setArticles((prev) => {
      if (editing) {
        return prev.map((a) =>
          a.id === editing.id
            ? {
                ...a,
                title: draft.title,
                category: draft.category,
                status: draft.status,
                updatedAt: now,
              }
            : a,
        );
      }

      const newRow: ArticleRow = {
        id: `local-${Date.now()}`,
        title: draft.title,
        category: draft.category,
        status: draft.status,
        updatedAt: now,
      };
      return [newRow, ...prev];
    });

    setEditorOpen(false);
    setEditing(null);
  };

  return (
    <section className="w-full px-4 py-8 md:px-6 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ArticleManagementHeader onCreate={openCreate} />

        <div className="mt-6">
          <ArticleTable
            rows={articles}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ArticleEditorModal
        isOpen={editorOpen}
        initialValue={
          editing
            ? {
                title: editing.title,
                category: editing.category,
                status: editing.status,
                content: '',
              }
            : undefined
        }
        onClose={() => {
          setEditorOpen(false);
          setEditing(null);
        }}
        onSave={handleSaveDraft}
      />
    </section>
  );
}

