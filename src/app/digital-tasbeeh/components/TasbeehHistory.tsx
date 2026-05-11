'use client';

import React, { useState } from 'react';

interface SessionEntry {
  id: string;
  dhikr: string;
  count: number;
  target: number;
  timestamp: string;
}

const initialHistory: SessionEntry[] = [
  { id: 'session-001', dhikr: 'سُبحانَ اللّه', count: 33, target: 33, timestamp: 'اليوم - ٦:١٥ ص' },
  { id: 'session-002', dhikr: 'الحَمدُ لِلّه', count: 33, target: 33, timestamp: 'اليوم - ٦:١٦ ص' },
  { id: 'session-003', dhikr: 'اللّهُ أَكبَر', count: 34, target: 34, timestamp: 'اليوم - ٦:١٧ ص' },
  { id: 'session-004', dhikr: 'لا إِلَهَ إِلّا اللّه', count: 100, target: 100, timestamp: 'أمس - ٩:٣٠ م' },
  { id: 'session-005', dhikr: 'أَستَغفِرُ اللّه', count: 72, target: 100, timestamp: 'أمس - ٩:٤٥ م' },
];

export default function TasbeehHistory() {
  const [history, setHistory] = useState<SessionEntry[]>(initialHistory);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  const totalToday = history
    .filter((s) => s.timestamp.startsWith('اليوم'))
    .reduce((sum, s) => sum + s.count, 0);

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Gold top accent */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', opacity: 0.5 }} />

      <div style={{ padding: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>📜</span>
            <span style={{ fontFamily: 'var(--font-arabic)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-400)' }}>
              سجل التسبيح
            </span>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                transition: 'color 0.2s',
              }}
            >
              مسح الكل
            </button>
          )}
        </div>

        {/* Today's total */}
        {totalToday > 0 && (
          <div
            style={{
              borderRadius: '14px',
              padding: '14px',
              marginBottom: '14px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(61,184,122,0.12), rgba(45,107,77,0.15))',
              border: '1px solid rgba(61,184,122,0.3)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              مجموع تسبيح اليوم
            </p>
            <p className="prayer-countdown" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--green-ok)' }}>
              {totalToday.toLocaleString('ar-EG')}
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              تسبيحة
            </p>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📿</p>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
              لا يوجد سجل بعد
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ابدأ التسبيح ليظهر هنا
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.map((session) => {
              const isComplete = session.count >= session.target;
              return (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {session.dhikr}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <span className="prayer-countdown" style={{ fontSize: '0.8rem', fontWeight: 700, color: isComplete ? 'var(--green-ok)' : 'var(--gold-400)' }}>
                        {session.count} / {session.target}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: '20px',
                          fontFamily: 'var(--font-ui)',
                          background: isComplete ? 'rgba(61,184,122,0.15)' : 'rgba(201,161,74,0.1)',
                          color: isComplete ? 'var(--green-ok)' : 'var(--gold-400)',
                          border: isComplete ? '1px solid rgba(61,184,122,0.3)' : '1px solid rgba(201,161,74,0.2)',
                        }}
                      >
                        {isComplete ? '✓ مكتمل' : 'جزئي'}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {session.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(session.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s',
                    }}
                    aria-label="حذف الجلسة"
                  >
                    🗑
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Motivational quote */}
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: 'var(--gold-300)', lineHeight: 1.8 }}>
            ﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            البقرة: ١٥٢
          </p>
        </div>
      </div>
    </div>
  );
}