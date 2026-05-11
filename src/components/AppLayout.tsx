import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--teal-900)',
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,107,77,0.25) 0%, transparent 70%),
          url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a14a' stroke-width='0.4' stroke-opacity='0.07'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3C/g%3E%3C/svg%3E")
        `,
      }}
    >
      <Header />
      <main style={{ flex: 1, width: '100%' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}