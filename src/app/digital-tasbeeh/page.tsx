import React from 'react';
import AppLayout from '@/components/AppLayout';
import TasbeehHero from './components/TasbeehHero';
import TasbeehCounter from './components/TasbeehCounter';
import TasbeehHistory from './components/TasbeehHistory';

export default function DigitalTasbeehPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px 48px' }}>
        <TasbeehHero />
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <div>
            <TasbeehCounter />
          </div>
          <div>
            <TasbeehHistory />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}