import React from 'react';
import AppLayout from '@/components/AppLayout';
import AssistantHero from './components/AssistantHero';
import ChatInterface from './components/ChatInterface';

export default function AIReligiousAssistantPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px 48px' }}>
        <AssistantHero />
        <div style={{ marginTop: '20px' }}>
          <ChatInterface />
        </div>
      </div>
    </AppLayout>
  );
}