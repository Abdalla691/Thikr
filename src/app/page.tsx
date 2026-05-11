import React from 'react';

export default function Home() {
  return (
    <div className="app-shell">
      {/* الجزء العلوي - الهيدر */}
      <header className="app-header">
        <div className="header-bg-pattern"></div>
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-icon">🌙</span>
            <div>
              <h1 className="brand-title">نور الهداية</h1>
              <p className="brand-sub">NUR AI DHIKR</p>
            </div>
          </div>
          <button className="reset-all-btn">
            <span className="reset-icon">🔄</span>
            <span className="reset-label">تصفير العدادات</span>
          </button>
        </div>
      </header>

      {/* محتوى الموقع - الأذكار */}
      <main className="cards-feed custom-scrollbar">
        
        {/* مثال لكارت ذكر واحد - تقدر تكرره */}
        <div className="dhikr-card">
          <div className="card-header">
            <span className="card-index">١</span>
            <span className="card-title-tag">أذكار الصباح</span>
          </div>
          <div className="card-body">
            <p className="card-arabic">أَصْبَحْنَا وَأَصْبَحَ المُلْكُ للهِ وَالحَمْدُ للهِ</p>
          </div>
          <div className="card-footer">
            <button className="tap-btn">
              <span className="tap-btn-label">اضغط للتسبيح</span>
            </button>
          </div>
        </div>

        {/* قسم الدردشة مع الذكاء الاصطناعي */}
        <div className="chat-bubble-ai mt-8 p-4">
          <p>أنا مساعدك الذكي "نور"، كيف يمكنني مساعدتك اليوم في ذكر الله؟</p>
        </div>

      </main>

      {/* إشعار النجاح */}
      <div className="toast">
        <span className="toast-icon">✨</span>
        تمت القراءة بنجاح
      </div>
    </div>
  );
}
