'use client';

import React, { useState } from 'react';
import type { Message } from './ChatInterface';

interface ChatMessageProps {
  message: Message;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      result.push(
        <strong key={`line-bold-${i}`} style={{ fontWeight: 700, color: 'var(--gold-300)' }}>
          {line.slice(2, -2)}
        </strong>
      );
      result.push(<br key={`br-bold-${i}`} />);
    } else if (line.startsWith('• ')) {
      result.push(
        <span key={`line-bullet-${i}`} style={{ display: 'block', paddingRight: '16px', position: 'relative' }}>
          <span style={{ position: 'absolute', right: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', display: 'inline-block' }} />
          {line.slice(2)}
        </span>
      );
    } else if (line.startsWith('*') && line.endsWith('*')) {
      result.push(
        <em
          key={`line-italic-${i}`}
          style={{
            fontStyle: 'normal',
            padding: '2px 8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(201,161,74,0.1)',
            color: 'var(--gold-300)',
            fontFamily: 'var(--font-arabic)',
          }}
        >
          {line.slice(1, -1)}
        </em>
      );
      result.push(<br key={`br-italic-${i}`} />);
    } else if (line.trim() === '') {
      result.push(<br key={`br-empty-${i}`} />);
    } else {
      result.push(<span key={`line-text-${i}`}>{line}</span>);
      if (i < lines.length - 1) result.push(<br key={`br-text-${i}`} />);
    }
  });

  return result;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isUser) {
    return (
      <div className="fade-in" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ maxWidth: '80%' }}>
          <div
            className="chat-bubble-user"
            style={{ padding: '12px 16px' }}
          >
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', lineHeight: 1.9, margin: 0 }}>
              {message.content}
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', marginTop: '4px', paddingRight: '4px', color: 'var(--text-muted)' }}>
            {message.timestamp}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ maxWidth: '85%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          {/* AI Avatar */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '4px',
              background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
              border: '1px solid rgba(201,161,74,0.2)',
              fontSize: '0.9rem',
            }}
          >
            🕌
          </div>

          <div style={{ flex: 1 }}>
            <div
              className="chat-bubble-ai"
              style={{ padding: '14px 16px', position: 'relative' }}
            >
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', lineHeight: 2 }}>
                {renderMarkdown(message.content)}
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  padding: '5px',
                  borderRadius: '7px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  color: copied ? 'var(--green-ok)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  transition: 'all 0.2s',
                }}
                aria-label="نسخ الرسالة"
              >
                {copied ? '✓' : '⎘'}
              </button>
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', marginTop: '4px', paddingLeft: '4px', color: 'var(--text-muted)' }}>
              المساعد الديني · {message.timestamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}