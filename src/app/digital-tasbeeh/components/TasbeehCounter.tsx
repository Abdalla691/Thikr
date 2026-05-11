'use client';

import React, { useState, useCallback } from 'react';
import TasbeehProgressRing from './TasbeehProgressRing';

const presetDhikr = [
  { id: 'preset-subhan', arabic: 'سُبحانَ اللّه', transliteration: 'SubhanAllah', defaultTarget: 33 },
  { id: 'preset-alhamd', arabic: 'الحَمدُ لِلّه', transliteration: 'Alhamdulillah', defaultTarget: 33 },
  { id: 'preset-allahu', arabic: 'اللّهُ أَكبَر', transliteration: 'Allahu Akbar', defaultTarget: 34 },
  { id: 'preset-laila', arabic: 'لا إِلَهَ إِلّا اللّه', transliteration: 'La ilaha illallah', defaultTarget: 100 },
  { id: 'preset-astaghfir', arabic: 'أَستَغفِرُ اللّه', transliteration: 'Astaghfirullah', defaultTarget: 100 },
  { id: 'preset-salawat', arabic: 'اللّهُمَّ صَلِّ عَلى مُحَمَّد', transliteration: 'Allahumma Salli ala Muhammad', defaultTarget: 100 },
];

const targetPresets = [
  { id: 'target-33', value: 33, label: '٣٣' },
  { id: 'target-99', value: 99, label: '٩٩' },
  { id: 'target-100', value: 100, label: '١٠٠' },
  { id: 'target-1000', value: 1000, label: '١٠٠٠' },
];

interface TasbeehCounterProps {
  onSessionComplete?: (dhikr: string, count: number) => void;
}

export default function TasbeehCounter({ onSessionComplete }: TasbeehCounterProps) {
  const [selectedDhikr, setSelectedDhikr] = useState(presetDhikr[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [showSettings, setShowSettings] = useState(false);
  const [customTarget, setCustomTarget] = useState('');
  const [rippleKey, setRippleKey] = useState(0);
  const [isPopping, setIsPopping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTap = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (next === target) {
        triggerToast(`🎉 أحسنت! أتممت ${target} مرة من ${selectedDhikr.arabic}`);
        if (onSessionComplete) onSessionComplete(selectedDhikr.arabic, next);
      }
      return next;
    });
    setRippleKey((k) => k + 1);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 150);
  }, [target, selectedDhikr, onSessionComplete]);

  const handleReset = () => {
    if (count > 0) triggerToast('🔄 تمت إعادة التسبيح');
    setCount(0);
  };

  const handleDhikrSelect = (dhikr: typeof presetDhikr[0]) => {
    setSelectedDhikr(dhikr);
    setCount(0);
    setTarget(dhikr.defaultTarget);
  };

  const handleTargetPreset = (val: number) => {
    setTarget(val);
    setCount(0);
  };

  const handleCustomTarget = () => {
    const val = parseInt(customTarget);
    if (val > 0 && val <= 10000) {
      setTarget(val);
      setCount(0);
      setCustomTarget('');
    }
  };

  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0;
  const isComplete = count >= target;

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
      }}
    >
      {/* Gold top accent */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', opacity: 0.5 }} />

      <div style={{ padding: '24px' }}>
        {/* Dhikr Selector */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>
            اختر الذكر
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {presetDhikr.map((dhikr) => {
              const isSelected = dhikr.id === selectedDhikr.id;
              return (
                <button
                  key={dhikr.id}
                  onClick={() => handleDhikrSelect(dhikr)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-arabic)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(201,161,74,0.18), rgba(201,161,74,0.08))'
                      : 'rgba(255,255,255,0.04)',
                    border: isSelected
                      ? '1px solid rgba(201,161,74,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: isSelected ? 'var(--gold-400)' : 'var(--text-main)',
                  }}
                >
                  {dhikr.arabic}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Counter Area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Progress Ring + Tap Button */}
          <div style={{ position: 'relative' }}>
            <TasbeehProgressRing progress={progress} isComplete={isComplete} size={260} />

            {/* Center tap button */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={handleTap}
                disabled={isComplete}
                className="tasbeeh-btn ripple-effect"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  cursor: isComplete ? 'default' : 'pointer',
                  background: isComplete
                    ? 'linear-gradient(135deg, var(--gold-500), var(--gold-400))'
                    : 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
                  border: isComplete
                    ? '2px solid rgba(201,161,74,0.5)'
                    : '2px solid rgba(201,161,74,0.3)',
                  boxShadow: isComplete
                    ? '0 8px 32px rgba(201,161,74,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                  transition: 'all 0.2s',
                }}
                aria-label="عدّ التسبيح"
              >
                {isComplete ? (
                  <>
                    <span style={{ fontSize: '2rem', color: 'var(--teal-900)' }}>✓</span>
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--teal-900)', marginTop: '4px' }}>
                      اكتمل!
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      key={`count-${rippleKey}`}
                      className={`prayer-countdown${isPopping ? ' count-pop' : ''}`}
                      style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--ivory)', display: 'block', lineHeight: 1 }}
                    >
                      {count}
                    </span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'rgba(240,232,208,0.7)', marginTop: '6px' }}>
                      اضغط للتسبيح
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Selected Dhikr Name */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold-400)' }}>
              {selectedDhikr.arabic}
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {count} من {target}
            </p>
          </div>

          {/* Target Selector */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                الهدف
              </p>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                ⚙ تخصيص
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {targetPresets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTargetPreset(t.value)}
                  style={{
                    flex: 1,
                    padding: '9px 4px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-arabic)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: target === t.value
                      ? 'linear-gradient(135deg, rgba(201,161,74,0.18), rgba(201,161,74,0.08))'
                      : 'rgba(255,255,255,0.04)',
                    border: target === t.value
                      ? '1px solid rgba(201,161,74,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: target === t.value ? 'var(--gold-400)' : 'var(--text-muted)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {showSettings && (
              <div className="fade-in" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  placeholder="عدد مخصص"
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-arabic)',
                    textAlign: 'right',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-main)',
                    outline: 'none',
                  }}
                  dir="rtl"
                />
                <button
                  onClick={handleCustomTarget}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
                    border: '1px solid rgba(201,161,74,0.3)',
                    color: 'var(--gold-300)',
                  }}
                >
                  تطبيق
                </button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="reset-all-btn"
            style={{ alignSelf: 'center' }}
          >
            <span>↺</span>
            <span>إعادة التسبيح</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast${showToast ? ' show' : ''}`}>
        <span className="toast-icon">✨</span>
        <span>{toastMsg}</span>
      </div>
    </div>
  );
}