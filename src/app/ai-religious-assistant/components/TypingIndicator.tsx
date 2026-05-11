import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="fade-in" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
            border: '1px solid rgba(201,161,74,0.2)',
            fontSize: '0.9rem',
          }}
        >
          🕌
        </div>
        <div
          className="chat-bubble-ai"
          style={{ padding: '14px 18px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="typing-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', display: 'inline-block' }} />
            <span className="typing-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', display: 'inline-block' }} />
            <span className="typing-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', display: 'inline-block' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            يكتب...
          </p>
        </div>
      </div>
    </div>
  );
}