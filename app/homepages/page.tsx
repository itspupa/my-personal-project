'use client';

import Navbar from '../component/Navbar';
import CourseSection from '../component/CourseSection';
import Footer from '../component/Footer';

export default function Homepage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <CourseSection />
      <Footer />
    </main>
  );
}
