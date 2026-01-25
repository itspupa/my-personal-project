import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Personal Project',
  description: 'A Next.js project with Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
