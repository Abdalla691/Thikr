'use client';

import React, { useState } from 'react';
import type { Dhikr } from '@/lib/azkarData';

interface AzkarCardProps {
  dhikr: Dhikr;
  index: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function AzkarCard({ dhikr, index, isCompleted, onComplete }: AzkarCardProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleTap = () => {
    if (isCompleted) return;
    const next = currentCount + 1;
    setCurrentCount(next);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 350);
    if (next >= dhikr.count) {
      onComplete();
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCount(0);
  };

  const progress = dhikr.count > 1 ? (currentCount / dhikr.count) * 100 : (isCompleted ? 100 : 0);

  return (
    <div className={`dhikr-card${isCompleted ? ' done' : ''}`}>
      {/* Card Header */}
      <div className="card-header">
        <span className="card-index">#{index + 1}</span>
        <span className="card-title-tag">{dhikr.source}</span>
        <span className="card-done-badge">
          <span>✓</span>
          <span>مكتمل</span>
        </span>
      </div>

      {/* Arabic Text */}
      <div className="card-body">
        <p className="card-arabic">{dhikr.arabic}</p>
        <span className="card-source">{dhikr.source}</span>
      </div>

      {/* Virtue / Benefit */}
      {dhikr.virtue && (
        <div className="card-benefit">
          ✨ {dhikr.virtue}
        </div>
      )}

      {/* Progress Bar (for multi-count) */}
      {dhikr.count > 1 && (
        <div className="card-progress-wrap">
          <div className="card-progress-header">
            <span className="progress-fraction">{currentCount} / {dhikr.count}</span>
            <span className="progress-label-text">
              {dhikr.count === 1 ? 'مرة واحدة' : `${dhikr.count} مرة`}
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer: Tap Button + Reset */}
      <div className="card-footer">
        <button
          className={`tap-btn${isCompleted ? ' completed-btn' : ''}${isPulsing ? ' pulsing' : ''}`}
          onClick={handleTap}
          disabled={isCompleted}
        >
          <span className="tap-btn-icon">{isCompleted ? '✓' : '👆'}</span>
          <span className="tap-btn-label">
            {isCompleted
              ? 'تم الإتمام'
              : dhikr.count === 1
              ? 'اضغط للإتمام'
              : `اضغط (${currentCount}/${dhikr.count})`}
          </span>
        </button>

        {(currentCount > 0 || isCompleted) && (
          <button
            className="reset-one-btn"
            onClick={handleReset}
            title="إعادة"
          >
            <span>↺</span>
            <span className="reset-one-label">إعادة</span>
          </button>
        )}
      </div>
    </div>
  );
}