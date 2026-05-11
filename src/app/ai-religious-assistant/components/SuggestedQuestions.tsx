import React from 'react';
import { suggestedQuestions } from '@/lib/islamicKnowledgeBase';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ color: 'var(--gold-400)', fontSize: '1rem' }}>💡</span>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          أسئلة مقترحة
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
        {suggestedQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            style={{
              textAlign: 'right',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-arabic)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', flexShrink: 0 }} />
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}