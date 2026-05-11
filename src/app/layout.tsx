import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'أذكار هاب — مرجعك الروحي اليومي',
  description: 'منصة إسلامية شاملة للأذكار اليومية والتسبيح الرقمي والمساعد الديني الذكي — كل ما تحتاجه لتقوية صلتك بالله.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
</head>
     <body className="bg-ivory text-gray-900 font-cairo antialiased">
  {children}
</body>
    </html>
  );
}
