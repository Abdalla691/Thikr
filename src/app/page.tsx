
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AzkarHero from './components/AzkarHero';
import PrayerTimesWidget from './components/PrayerTimesWidget';
import AzkarCategoryTabs from './components/AzkarCategoryTabs';

export default function AzkarLibraryPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px 48px' }}>
        <AzkarHero />
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="xl:grid-cols-4-custom">
          <div style={{ flex: 1 }}>
            <AzkarCategoryTabs />
          </div>
          <div style={{ minWidth: '280px', maxWidth: '340px' }} className="hidden xl:block">
            <PrayerTimesWidget />
          </div>
        </div>
        {/* Mobile prayer widget */}
        <div style={{ marginTop: '20px' }} className="xl:hidden">
          <PrayerTimesWidget />
        </div>
      </div>
    </AppLayout>
  );
}



