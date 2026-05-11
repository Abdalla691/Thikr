import React from 'react';
import AzkarHero from './components/AzkarHero';
import PrayerTimesWidget from './components/PrayerTimesWidget';
import AzkarCategoryTabs from './components/AzkarCategoryTabs';

export default function AzkarLibraryPage() {
  return (
    <div className="app-shell">
      {/* الهيدر العلوي */}
      <header className="app-header">
        <div className="header-bg-pattern"></div>
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-icon">🌙</span>
            <div>
              <h1 className="brand-title">نور الهداية</h1>
              <p className="brand-sub">NUR AI ASSISTANT</p>
            </div>
          </div>
        </div>
      </header>

      {/* محتوى الصفحة الرئيسي */}
      <main className="cards-feed">
        {/* الترحيب */}
        <AzkarHero />

        {/* مواقيت الصلاة */}
        <div className="my-4">
          <PrayerTimesWidget />
        </div>

        {/* تصنيفات الأذكار */}
        <div className="mt-2">
          <AzkarCategoryTabs />
        </div>
      </main>
    </div>
  );
}
