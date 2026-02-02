'use client';

import Navbar from '../component/Navbar';
import HeaderUserBar from '../component/HeaderUserBar';
import CourseSection from '../component/CourseSection';
import Footer from '../component/Footer';

export default function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex justify-end px-4 py-4">
        <HeaderUserBar userName="Moodeng ja" />
      </div>
      <CourseSection />
      <Footer />
    </main>
  );
}
