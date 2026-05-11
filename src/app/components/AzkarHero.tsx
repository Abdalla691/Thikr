import React from 'react';

export default function AzkarHero() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        padding: '32px 24px',
        background: 'linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 60%, var(--teal-500) 100%)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-card)',
        backgroundImage: `
          linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 60%, var(--teal-500) 100%),
          url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a14a' stroke-width='0.4' stroke-opacity='0.1'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3C/g%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Gold top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)' }} />

      {/* Decorative corner */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.15, fontSize: '3rem', color: 'var(--gold-400)' }}>✦</div>
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', opacity: 0.08, fontSize: '4rem', color: 'var(--gold-400)' }}>✦</div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-ui)',
            background: 'rgba(201,161,74,0.15)',
            border: '1px solid rgba(201,161,74,0.4)',
            color: 'var(--gold-300)',
            marginBottom: '16px',
          }}
        >
          <span>📖</span>
          <span>مكتبة الأذكار الإسلامية</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--ivory)',
            lineHeight: 1.6,
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          أذكار اليوم
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '1.1rem',
            color: 'rgba(240,232,208,0.85)',
            lineHeight: 2.2,
            marginBottom: '12px',
          }}
        >
          ﴿ وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ ﴾
        </p>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'rgba(240,232,208,0.55)' }}>
          سورة الجمعة — الآية ١٠
        </p>
      </div>
    </div>
  );
}