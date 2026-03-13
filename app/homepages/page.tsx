'use client';

import { useState } from 'react';
import Navbar from '../component/Navbar';
import CourseSection from '../component/CourseSection';
import Footer from '../component/Footer';
import ArticleManagementSection from '../component/article-management/ArticleManagementSection';

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState('Highlight');

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {activeCategory === 'Article management' ? (
        <ArticleManagementSection />
      ) : (
        <CourseSection />
      )}
      <Footer />
    </main>
  );
}
