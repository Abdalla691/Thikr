'use client';

import React, { useState, useEffect } from 'react';
import { prayerTimes } from '@/lib/azkarData';

function getNextPrayer(currentTime: string) {
  for (const prayer of prayerTimes) {
    if (prayer.time > currentTime) return prayer;
  }
  return prayerTimes[0];
}

function getTimeUntil(targetTime: string, currentTime: string): string {
  const [th, tm] = targetTime.split(':').map(Number);
  const [ch, cm] = currentTime.split(':').map(Number);
  let diffMin = (th * 60 + tm) - (ch * 60 + cm);
  if (diffMin < 0) diffMin += 24 * 60;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  if (h > 0) return `${h}س ${m}د`;
  return `${m} دقيقة`;
}

export default function PrayerTimesWidget() {
  const [currentTimeStr, setCurrentTimeStr] = useState('12:00');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setCurrentTimeStr(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const nextPrayer = getNextPrayer(currentTimeStr);
  const timeUntil = getTimeUntil(nextPrayer.time, currentTimeStr);

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        position: 'sticky',
        top: '80px',
      }}
    >
      {/* Gold accent line */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', opacity: 0.5 }} />

      <div style={{ padding: '18px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>🕌</span>
            <span style={{ fontFamily: 'var(--font-arabic)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-400)' }}>
              مواقيت الصلاة
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
            <span>📍</span>
            <span>مكة المكرمة</span>
          </div>
        </div>

        {/* Next Prayer Highlight */}
        <div
          style={{
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '14px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
            border: '1px solid rgba(201,161,74,0.3)',
            cursor: 'pointer',
          }}
          onClick={() => setShowAll(!showAll)}
        >
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'rgba(240,232,208,0.7)', marginBottom: '4px' }}>
            الصلاة القادمة
          </p>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ivory)' }}>
            {nextPrayer.name}
          </p>
          <p className="prayer-countdown" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold-300)', marginTop: '4px' }}>
            {nextPrayer.time}
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'rgba(240,232,208,0.6)', marginTop: '4px' }}>
            بعد {timeUntil} · اضغط لعرض الكل
          </p>
        </div>

        {/* All Prayers (collapsible) */}
        {showAll && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {prayerTimes.map((prayer) => {
              const isNext = prayer.id === nextPrayer.id;
              const isPast = prayer.time < currentTimeStr && !isNext;
              return (
                <div
                  key={prayer.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: isNext
                      ? 'rgba(201,161,74,0.12)'
                      : 'rgba(255,255,255,0.03)',
                    border: isNext
                      ? '1px solid rgba(201,161,74,0.3)'
                      : '1px solid rgba(255,255,255,0.05)',
                    opacity: isPast ? 0.5 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: isNext ? 'var(--gold-400)' : isPast ? 'var(--text-muted)' : 'var(--teal-500)',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', fontWeight: isNext ? 700 : 500, color: isNext ? 'var(--gold-400)' : 'var(--text-main)' }}>
                      {prayer.name}
                    </span>
                  </div>
                  <span className="prayer-countdown" style={{ fontSize: '0.88rem', fontWeight: 600, color: isNext ? 'var(--gold-400)' : 'var(--text-muted)' }}>
                    {prayer.time}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Hijri Date */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ١٣ ذو القعدة ١٤٤٦ هـ
          </p>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            الاثنين ١١ مايو ٢٠٢٦
          </p>
        </div>
      </div>
    </div>
  );
}