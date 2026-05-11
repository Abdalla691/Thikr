'use client';

import React, { useState } from 'react';
import { azkarCategories } from '@/lib/azkarData';
import AzkarCard from './AzkarCard';

export default function AzkarCategoryTabs() {
  const [activeCategory, setActiveCategory] = useState('cat-morning');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const currentCategory = azkarCategories.find((c) => c.id === activeCategory)!;
  const completedInCategory = currentCategory.items.filter((item) =>
    completedIds.has(item.id)
  ).length;
  const totalInCategory = currentCategory.items.length;
  const allDone = completedInCategory === totalInCategory && totalInCategory > 0;

  const totalAll = azkarCategories.reduce((sum, c) => sum + c.items.length, 0);
  const completedAll = azkarCategories.reduce(
    (sum, c) => sum + c.items.filter((i) => completedIds.has(i.id)).length,
    0
  );
  const masterPct = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;
  const circumference = 213.6;
  const dashOffset = circumference - (masterPct / 100) * circumference;

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleResetAll = () => {
    setCompletedIds(new Set());
  };

  return (
    <div>
      {/* ─── STATS BAR ─── */}
      <div
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-card)',
          padding: '20px 24px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold top accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', opacity: 0.5 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-400)' }}>
              {currentCategory.name}
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>
              {currentCategory.description}
            </p>
          </div>
          <button
            onClick={handleResetAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '7px 13px',
              background: 'rgba(201,161,74,0.1)',
              border: '1px solid rgba(201,161,74,0.25)',
              borderRadius: '50px',
              color: 'var(--gold-400)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>↺</span>
            <span>إعادة</span>
          </button>
        </div>

        {/* Stats row */}
        <div className="stats-bar" style={{ padding: '0', marginBottom: '0' }}>
          <div className="stat-chip stat-done">
            <span className="stat-num">{completedInCategory}</span>
            <span className="stat-lbl">مكتمل</span>
          </div>

          {/* Master ring */}
          <div className="stats-master-ring">
            <svg viewBox="0 0 80 80" className="master-ring-svg">
              <circle className="mr-bg" cx="40" cy="40" r="34" />
              <circle
                className="mr-fill"
                cx="40" cy="40" r="34"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="master-ring-center">
              <span className="master-pct">{masterPct}%</span>
            </div>
          </div>

          <div className="stat-chip stat-remain">
            <span className="stat-num">{totalInCategory - completedInCategory}</span>
            <span className="stat-lbl">متبقي</span>
          </div>
        </div>

        {/* Progress track */}
        <div style={{ marginTop: '14px' }}>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── CATEGORY TABS ─── */}
      <div className="tab-bar" style={{ padding: '0', marginBottom: '16px', flexWrap: 'wrap', gap: '6px' }}>
        {azkarCategories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const catCompleted = cat.items.filter((i) => completedIds.has(i.id)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`tab-btn${isActive ? ' active' : ''}`}
              style={{ flex: 'none', minWidth: 'fit-content' }}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span>{cat.name}</span>
              {catCompleted > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--gold-500)',
                    color: isActive ? 'var(--gold-300)' : 'var(--teal-900)',
                  }}
                >
                  {catCompleted}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ─── CARDS ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {currentCategory.items.map((dhikr, idx) => (
          <AzkarCard
            key={dhikr.id}
            dhikr={dhikr}
            index={idx}
            isCompleted={completedIds.has(dhikr.id)}
            onComplete={() => handleComplete(dhikr.id)}
          />
        ))}
      </div>

      {/* ─── COMPLETION MESSAGE ─── */}
      {allDone && (
        <div
          className="fade-in"
          style={{
            marginTop: '20px',
            padding: '24px',
            borderRadius: 'var(--radius-card)',
            background: 'linear-gradient(135deg, rgba(61,184,122,0.15), rgba(45,107,77,0.2))',
            border: '1px solid rgba(61,184,122,0.4)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✨</p>
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-ok)' }}>
            أحسنت! أكملت جميع {currentCategory.name}
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            جعلها الله في ميزان حسناتك
          </p>
        </div>
      )}
    </div>
  );
}