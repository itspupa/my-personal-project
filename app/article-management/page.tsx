'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import ArticleManagementHeader from '../component/article-management/ArticleManagementHeader';
import ArticleTable, { ArticleRow } from '../component/article-management/ArticleTable';
import ArticleEditorModal, {
  ArticleDraft,
} from '../component/article-management/ArticleEditorModal';
import { coursePosts } from '../data/coursePosts';

export default function ArticleManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/profile', { credentials: 'include' });
        if (!isMounted) return;
        setIsAuthed(res.ok);
        if (!res.ok) router.push('/login');
      } catch {
        if (isMounted) {
          setIsAuthed(false);
          router.push('/login');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

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

  if (loading || !isAuthed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />

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
      </section>

      <Footer />

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
    </main>
  );
}

