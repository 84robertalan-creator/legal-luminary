'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [stats, setStats] = useState({
    questionsPracticed: 0,
    testsCompleted: 0,
    averageScore: 0,
  });

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
    
    const premium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premium);

    // Load quiz stats
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    if (results.length > 0) {
      const totalQuestions = results.reduce((sum: number, r: any) => sum + (r.total || 0), 0);
      const totalScore = results.reduce((sum: number, r: any) => sum + (r.score || 0), 0);
      
      setStats({
        questionsPracticed: totalQuestions,
        testsCompleted: results.length,
        averageScore: totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0,
      });
    }
  }, []);

  const startJCJ = () => router.push('/quiz/jcj');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '48px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Legal Luminary</h1>
          </div>
          <div style={{ 
            backgroundColor: isPremium ? '#22c55e' : '#eab308',
            color: 'black',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {isPremium ? 'Premium' : '7 Days Trial'}
          </div>
        </div>

        <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>
          Welcome back, {userName.split(' ')[0]}!
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
          Continue your JCJ & CLAT LLM preparation
        </p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.questionsPracticed}</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Questions Practiced</div>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.averageScore}%</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Avg. Score</div>
          </div>
        </div>

        {/* Practice Cards */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Start Practice</h3>
          
          <div onClick={startJCJ} style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '12px',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>Junior Civil Judge (JCJ) Prelims</div>
            <div style={{ color: '#94a3b8', fontSize: '15px' }}>Constitution + Contract Law • 20 Questions (Trial)</div>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '16px',
            opacity: 0.7,
            cursor: 'not-allowed'
          }}>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>CLAT LLM</div>
            <div style={{ color: '#94a3b8', fontSize: '15px' }}>Coming Soon</div>
          </div>
        </div>

        <button 
          onClick={() => router.push('/pricing')}
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '17px',
            fontWeight: '600'
          }}
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}