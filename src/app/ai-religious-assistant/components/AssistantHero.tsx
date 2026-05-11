import React from 'react';

export default function AssistantHero() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        padding: '24px',
        background: 'linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 60%, var(--teal-500) 100%)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Gold top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {/* Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(201,161,74,0.15)',
            border: '1px solid rgba(201,161,74,0.3)',
            flexShrink: 0,
            fontSize: '1.8rem',
          }}
        >
          🕌
        </div>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <h1 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold-400)', lineHeight: 1.3, textShadow: '0 0 20px rgba(201,161,74,0.3)' }}>
            المساعد الديني الإسلامي
          </h1>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: 'rgba(240,232,208,0.75)', lineHeight: 1.9, marginTop: '4px' }}>
            اسأل عن أحكام الإسلام، والأذكار، والفقه — مستنداً إلى القرآن الكريم والسنة النبوية
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '50px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-ui)',
            background: 'rgba(61,184,122,0.12)',
            border: '1px solid rgba(61,184,122,0.3)',
            color: 'var(--green-ok)',
            flexShrink: 0,
          }}
        >
          <span>🛡</span>
          <span>مصادر موثوقة</span>
        </div>
      </div>
    </div>
  );
}