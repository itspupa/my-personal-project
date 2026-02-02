'use client';

import React from 'react';
import Comment from './Comment';

interface CommentData {
  id: number;
  userName: string;
  timestamp: string;
  comment: string;
  avatar?: string;
}

interface CommentSectionProps {
  comments?: CommentData[];
}

const defaultComments: CommentData[] = [
  {
    id: 1,
    userName: 'Jacob Lash',
    timestamp: '12 September 2024 at 18:38',
    comment: 'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.',
  },
];

export default function CommentSection({ comments = defaultComments }: CommentSectionProps) {
  return (
    <section className="w-full px-4 py-8 md:px-6 md:py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-0">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              avatar={comment.avatar}
              userName={comment.userName}
              timestamp={comment.timestamp}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
