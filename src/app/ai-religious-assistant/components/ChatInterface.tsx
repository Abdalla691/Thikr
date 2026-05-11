'use client';

import React, { useState, useRef, useEffect } from 'react';
import { findAnswer, suggestedQuestions, fallbackResponses } from '@/lib/islamicKnowledgeBase';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const welcomeMessage: Message = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `السلام عليكم ورحمة الله وبركاته 🌿

أنا مساعدك الديني الإسلامي، هنا لمساعدتك في الإجابة على أسئلتك الدينية بأسلوب رقيق ومحب.

يمكنني مساعدتك في:
• **أحكام الصلاة والطهارة والعبادات**
• **فضائل الأذكار والأدعية المأثورة**
• **أحكام الصيام والزكاة والحج**
• **التوبة والاستغفار وتزكية النفس**
• **الأخلاق الإسلامية والمعاملات**

اسألني بكل ثقة، وأسأل الله أن يوفقني في إجابتك بما ينفعك. 🤲`,
  timestamp: 'الآن',
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getTimestamp = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const generateResponse = (query: string): string => {
    // Custom knowledge-base pattern matching engine
    // Backend integration point: replace this logic with a real AI API call if desired
    const match = findAnswer(query);
    if (match) return match.answer;
    const idx = Math.floor(Math.abs(query.length) % fallbackResponses.length);
    return fallbackResponses[idx];
  };

  const handleSend = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate AI thinking delay (knowledge-base lookup)
    const delay = 800 + Math.random() * 1200;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const response = generateResponse(messageText);
    const assistantMessage: Message = {
      id: `msg-ai-${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: getTimestamp(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([welcomeMessage]);
    setInput('');
    setIsTyping(false);
    setShowSuggestions(true);
  };

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 320px)',
        minHeight: '500px',
        maxHeight: '780px',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
      }}
    >
      {/* Gold top accent */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', opacity: 0.5, flexShrink: 0 }} />

      {/* Chat Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderBottom: '1px solid var(--card-border)',
          background: 'rgba(18,42,34,0.8)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--teal-600), var(--teal-500))',
              border: '1px solid rgba(201,161,74,0.2)',
              fontSize: '1rem',
            }}
          >
            🕌
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              المساعد الديني
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--green-ok)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                متاح دائماً
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '7px 12px',
            borderRadius: '50px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-ui)',
            background: 'rgba(201,161,74,0.1)',
            border: '1px solid rgba(201,161,74,0.2)',
            color: 'var(--gold-400)',
            cursor: 'pointer',
          }}
        >
          <span>↺</span>
          <span>محادثة جديدة</span>
        </button>
      </div>

      {/* Messages Area */}
      <div
        className="scrollbar-thin"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(13,31,26,0.6)',
        }}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        {showSuggestions && messages.length === 1 && (
          <SuggestedQuestions onSelect={(q) => handleSend(q)} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          borderTop: '1px solid var(--card-border)',
          padding: '14px 16px',
          background: 'rgba(18,42,34,0.9)',
          flexShrink: 0,
        }}
      >
        {/* Quick suggestion chips */}
        {!showSuggestions && messages.length > 1 && (
          <div
            className="scrollbar-thin"
            style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}
          >
            {suggestedQuestions.slice(0, 4).map((q) => (
              <button
                key={q.id}
                onClick={() => handleSend(q.text)}
                disabled={isTyping}
                style={{
                  flexShrink: 0,
                  padding: '6px 12px',
                  borderRadius: '50px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-arabic)',
                  cursor: 'pointer',
                  background: 'rgba(201,161,74,0.08)',
                  border: '1px solid rgba(201,161,74,0.2)',
                  color: 'var(--gold-400)',
                  transition: 'all 0.2s',
                  opacity: isTyping ? 0.5 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {q.text}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك الديني هنا..."
            rows={1}
            dir="rtl"
            disabled={isTyping}
            style={{
              flex: 1,
              resize: 'none',
              borderRadius: '12px',
              padding: '11px 14px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-arabic)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-main)',
              outline: 'none',
              maxHeight: '120px',
              lineHeight: 1.7,
              opacity: isTyping ? 0.6 : 1,
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
              background: input.trim() && !isTyping
                ? 'linear-gradient(135deg, var(--teal-600), var(--teal-500))'
                : 'rgba(255,255,255,0.05)',
              border: input.trim() && !isTyping
                ? '1px solid rgba(201,161,74,0.3)'
                : '1px solid rgba(255,255,255,0.08)',
              color: input.trim() && !isTyping ? 'var(--gold-300)' : 'var(--text-muted)',
              fontSize: '1.1rem',
              transition: 'all 0.2s',
              opacity: !input.trim() || isTyping ? 0.4 : 1,
              flexShrink: 0,
            }}
            aria-label="إرسال"
          >
            ✈
          </button>
        </div>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.68rem', marginTop: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
          المساعد يعتمد على قاعدة معرفية إسلامية مُنقَّحة — للمسائل الدقيقة راجع العلماء المتخصصين
        </p>
      </div>
    </div>
  );
}