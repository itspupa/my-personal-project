'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SignUpButton from '../../component/button/SignUpButton';
import LoginButton from '../../component/button/LoginButton';
import AuthorCard from '../../component/card/AuthorCard';
import ShareButtons from '../../component/ShareButtons';
import CommentInput from '../../component/comment/CommentInput';
import Comment from '../../component/comment/Comment';
import Footer from '../../component/Footer';
import CreateAccountModal from '../../component/modal/CreateAccountModal';
import { coursePosts, courseContents } from '../../data/coursePosts';

export default function CourseDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = false; // TODO: replace with real auth check

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    // TODO: handle like logic
  };

  const handleCommentSubmit = (comment: string) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    console.log('New comment:', comment);
  };

  const post = coursePosts.find((p) => p.id === id);
  const content = courseContents[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <header className="w-full bg-white border-b border-gray-100">
          <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">Hi.</Link>
            <div className="flex items-center gap-2">
              <SignUpButton href="/register" />
              <Link href="/login">
                <LoginButton />
              </Link>
            </div>
          </nav>
        </header>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 text-lg">Course not found</p>
        </div>
      </div>
    );
  }

  const articleContent = content || {
    intro: post.description,
    sections: [],
    author: { name: post.author, description: '' },
    comments: [],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="w-full bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">Hi.</Link>
          <div className="flex items-center gap-2">
            <SignUpButton href="/register" />
            <Link href="/login">
              <LoginButton />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Article */}
          <article className="flex-1 max-w-3xl">
            {/* Category Tag */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Intro */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {articleContent.intro}
            </p>

            {/* Sections */}
            {articleContent.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </section>
            ))}

            {/* Featured Image */}
            <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Like & Share */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">Like</span>
              </button>

              {/* Share Buttons */}
              <ShareButtons viewCount={73} />
            </div>

            {/* Comments */}
            <section className="mt-8">
              <CommentInput
                placeholder="Write how you feel in a gest..."
                onSubmit={handleCommentSubmit}
                onFocus={() => { if (!isLoggedIn) setShowModal(true); }}
              />

              <div className="mt-4 space-y-0 divide-y divide-gray-100">
                {articleContent.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    userName={comment.userName}
                    timestamp={comment.timestamp}
                    comment={comment.comment}
                  />
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <AuthorCard
                name={articleContent.author.name}
                description={articleContent.author.description}
              />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {/* Create Account Modal */}
      <CreateAccountModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
