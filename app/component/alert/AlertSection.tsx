'use client';

import React from 'react';
import Alert from './Alert';

export default function AlertSection() {
  return (
    <section className="w-full px-4 py-8 md:px-6 md:py-12 bg-white">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Danger Alert */}
        <Alert
          title="Attention needed"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar."
          variant="danger"
        />

        {/* Success Alert */}
        <Alert
          title="Attention needed"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante vitae eros suscipit pulvinar."
          variant="success"
        />
      </div>
    </section>
  );
}
