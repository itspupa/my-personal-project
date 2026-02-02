'use client';

import React from 'react';
import CourseCard from './card/CourseCard';
import { blogPosts } from '../data/blogPosts';

export default function CourseSection() {
  return (
    <section className="w-full px-4 py-8 md:px-6 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Courses</h2>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 6).map((post) => (
            <CourseCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
