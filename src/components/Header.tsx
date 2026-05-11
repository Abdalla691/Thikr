'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'مكتبة الأذكار', href: '/', icon: '📖' },
  { label: 'التسبيح الرقمي', href: '/digital-tasbeeh', icon: '📿' },
  { label: 'المساعد الديني', href: '/ai-religious-assistant', icon: '🕌' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(180deg, var(--teal-800) 0%, rgba(18,42,34,0.97) 100%)',
        borderBottom: '1px solid var(--card-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 1px 0 rgba(201,161,74,0.2), 0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Geometric pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20Z' fill='none' stroke='%23c9a14a' stroke-width='0.5' stroke-opacity='0.06'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', position: 'relative' }}>
        {/* Top row: brand + nav + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 4px 10px' }}>
          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.8rem', color: 'var(--gold-400)', textShadow: '0 0 20px rgba(201,161,74,0.5)', lineHeight: 1 }}>☽</span>
            <div>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold-400)', lineHeight: 1.1, textShadow: '0 0 20px rgba(201,161,74,0.3)' }}>
                أذكار هاب
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '2px', fontFamily: 'var(--font-ui)' }}>
                حصن المسلم
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '6px' }} className="hidden md:flex">
            {navItems?.map((item) => {
              const isActive = pathname === item?.href;
              return (
                <Link
                  key={item?.href}
                  href={item?.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.25s',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(201,161,74,0.18), rgba(201,161,74,0.08))'
                      : 'rgba(255,255,255,0.04)',
                    border: isActive
                      ? '1px solid rgba(201,161,74,0.35)'
                      : '1px solid transparent',
                    color: isActive ? 'var(--gold-400)' : 'var(--text-muted)',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{item?.icon}</span>
                  <span>{item?.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bismillah badge (desktop) */}
          <div
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-arabic)',
              background: 'rgba(201,161,74,0.1)',
              border: '1px solid rgba(201,161,74,0.25)',
              color: 'var(--gold-400)',
            }}
          >
            <span>✨</span>
            <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(201,161,74,0.1)',
              border: '1px solid rgba(201,161,74,0.2)',
              color: 'var(--gold-400)',
              fontSize: '1.2rem',
            }}
            aria-label="القائمة"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fade-in"
          style={{
            borderTop: '1px solid var(--card-border)',
            background: 'rgba(18,42,34,0.98)',
            padding: '12px 16px 16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems?.map((item) => {
              const isActive = pathname === item?.href;
              return (
                <Link
                  key={item?.href}
                  href={item?.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(201,161,74,0.18), rgba(201,161,74,0.08))'
                      : 'rgba(255,255,255,0.03)',
                    border: isActive
                      ? '1px solid rgba(201,161,74,0.35)'
                      : '1px solid rgba(255,255,255,0.06)',
                    color: isActive ? 'var(--gold-400)' : 'var(--text-muted)',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{item?.icon}</span>
                  <span>{item?.label}</span>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ﴿ وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ ﴾
            </p>
          </div>
        </div>
      )}
    </header>
  );
}