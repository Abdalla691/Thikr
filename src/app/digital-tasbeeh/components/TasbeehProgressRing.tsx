'use client';

import React from 'react';

interface TasbeehProgressRingProps {
  progress: number;
  isComplete: boolean;
  size?: number;
}

export default function TasbeehProgressRing({
  progress,
  isComplete,
  size = 260,
}: TasbeehProgressRingProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* Background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={strokeWidth}
      />

      {/* Progress ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={isComplete ? 'var(--accent)' : 'var(--primary)'}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
      />

      {/* Decorative dots at start and end */}
      {progress > 5 && (
        <circle
          cx={center}
          cy={strokeWidth}
          r={strokeWidth / 2}
          fill={isComplete ? 'var(--accent)' : 'var(--primary)'}
        />
      )}
    </svg>
  );
}