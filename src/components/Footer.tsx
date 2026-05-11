import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--card-border)',
        background: 'linear-gradient(180deg, rgba(18,42,34,0.97) 0%, var(--teal-900) 100%)',
        padding: '24px 16px',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {/* Brand */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-400)', textShadow: '0 0 20px rgba(201,161,74,0.3)' }}>
              ☽ أذكار هاب
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              مرجعك الروحي اليومي للأذكار والتسبيح والإرشاد الديني
            </p>
          </div>

          {/* Quran verse */}
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              background: 'rgba(201,161,74,0.07)',
              border: '1px solid rgba(201,161,74,0.2)',
              fontFamily: 'var(--font-arabic)',
              fontSize: '0.9rem',
              color: 'var(--gold-300)',
              textAlign: 'center',
            }}
          >
            ﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: '/', label: 'مكتبة الأذكار' },
              { href: '/digital-tasbeeh', label: 'التسبيح الرقمي' },
              { href: '/ai-religious-assistant', label: 'المساعد الديني' },
            ]?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {item?.label}
              </Link>
            ))}
          </div>

          {/* Credit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
            <span>صُنع بـ</span>
            <span style={{ color: '#e53e3e' }}>♥</span>
            <span>لوجه الله</span>
          </div>
        </div>
      </div>
    </footer>
  );
}