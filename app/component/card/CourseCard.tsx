'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function CourseCard({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
}: CourseCardProps) {
  return (
    <Link href={`/course/${id}`}>
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-green-100 text-gray-900 text-sm font-normal rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-900 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Author and Date */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-600"
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
          <span className="font-normal">{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
    </Link>
  );
}
