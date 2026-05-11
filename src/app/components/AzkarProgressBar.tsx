import React from 'react';

interface AzkarProgressBarProps {
  completed: number;
  total: number;
}

export default function AzkarProgressBar({ completed, total }: AzkarProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? 'linear-gradient(90deg, #C9A84C, #E8C96A)'
              : 'linear-gradient(90deg, #1B5E20, #4CAF50)',
          }}
        />
      </div>
      <span
        className="text-xs font-medium w-10 text-left"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {pct}٪
      </span>
    </div>
  );
}