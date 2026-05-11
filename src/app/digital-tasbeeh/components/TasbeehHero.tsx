import React from 'react';

export default function TasbeehHero() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        padding: '28px 24px',
        background: 'linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 60%, var(--teal-500) 100%)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-card)',
        textAlign: 'center',
      }}
    >
      {/* Gold top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)' }} />

      {/* Decorative corners */}
      <div style={{ position: 'absolute', top: '14px', right: '14px', opacity: 0.12, fontSize: '2.5rem', color: 'var(--gold-400)' }}>✦</div>
      <div style={{ position: 'absolute', bottom: '14px', left: '14px', opacity: 0.08, fontSize: '3rem', color: 'var(--gold-400)' }}>✦</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
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
            marginBottom: '14px',
          }}
        >
          <span>📿</span>
          <span>التسبيح الرقمي</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'var(--ivory)',
            lineHeight: 1.7,
            marginBottom: '10px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          سُبحانَ اللّهِ وبِحَمدِه
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '0.88rem',
            color: 'rgba(240,232,208,0.7)',
            lineHeight: 2,
          }}
        >
          سبحان الله عدد خلقه، سبحان الله رضا نفسه، سبحان الله زنة عرشه
        </p>
      </div>
    </div>
  );
}