'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [stats, setStats] = useState({
    questionsPracticed: 0,
    averageScore: 0,
    testsCompleted: 0
  });

  useEffect(() => {
    // Check if user is Premium
    const premiumStatus = localStorage.getItem('isPremium');
    setIsPremium(premiumStatus === 'true');

    // Load quiz stats
    const savedData = localStorage.getItem('quizResults');
    if (savedData) {
      const results = JSON.parse(savedData);
      const attempts = results.attempts || [];

      const testsCompleted = attempts.length;
      const totalQuestions = attempts.length * 20;
      const totalCorrect = attempts.reduce((sum: number, a: any) => sum + a.score, 0);
      const averageScore = attempts.length > 0 
        ? Math.round((totalCorrect / totalQuestions) * 100) 
        : 0;

      setStats({
        questionsPracticed: totalQuestions,
        averageScore: averageScore,
        testsCompleted: testsCompleted
      });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
            <img src="/logo.png" alt="Legal Luminary" style={{ width: '52px', height: '52px', borderRadius: '14px' }} />
            <div>
              <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: 0 }}>Legal Luminary</h1>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>Welcome back</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isPremium && (
              <div style={{ 
                backgroundColor: '#16a34a', 
                color: 'white', 
                padding: '6px 16px', 
                borderRadius: '9999px', 
                fontSize: '14px', 
                fontWeight: '600' 
              }}>
                ★ Premium
              </div>
            )}
            <button onClick={() => router.push('/')} style={{ backgroundColor: '#334155', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Status Banner */}
        {isPremium ? (
          <div style={{ backgroundColor: '#166534', borderRadius: '16px', padding: '20px 28px', marginBottom: '32px', color: 'white' }}>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>★ Premium Active</div>
            <div style={{ color: '#86efac', marginTop: '4px' }}>You have unlimited access to all questions and features.</div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#1e40af', borderRadius: '16px', padding: '20px 28px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>7-Day Free Trial Active</div>
              <div style={{ color: '#dbeafe', marginTop: '4px' }}>You are currently on trial. Upgrade for unlimited access.</div>
            </div>
            <button 
              onClick={() => router.push('/pricing')}
              style={{ backgroundColor: 'white', color: '#1e40af', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
            >
              Upgrade to Premium →
            </button>
          </div>
        )}

        {/* Start Practice */}
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>Start Practicing</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* JCJ Card */}
          <div onClick={() => router.push('/quiz/jcj')} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '28px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#1e40af', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚖️</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>JCJ Prelims</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Indian Contract Act + More</p>
              </div>
            </div>
            <button style={{ width: '100%', backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
              Start JCJ Quiz →
            </button>
          </div>

          {/* CLAT Card */}
          <div onClick={() => router.push('/quiz/clat')} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '28px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📚</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>CLAT LLM</h3>
                <p style={{ margin: 0, color: '#64748b' }}>Post Graduate Entrance</p>
              </div>
            </div>
            <button style={{ width: '100%', backgroundColor: '#334155', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
              Start CLAT Quiz →
            </button>
          </div>
        </div>

        {/* Progress Stats */}
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '20px' }}>Your Progress</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
            <p style={{ color: '#64748b', marginBottom: '8px', fontSize: '15px' }}>Questions Practiced</p>
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{stats.questionsPracticed} / {isPremium ? '∞' : '120'}</h3>
            <p style={{ color: '#16a34a', fontSize: '14px', marginTop: '8px' }}>{isPremium ? 'Unlimited' : `${Math.round((stats.questionsPracticed / 120) * 100)}% of trial limit`}</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
            <p style={{ color: '#64748b', marginBottom: '8px', fontSize: '15px' }}>Average Score</p>
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{stats.averageScore}%</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Based on {stats.testsCompleted} attempt{stats.testsCompleted !== 1 ? 's' : ''}</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
            <p style={{ color: '#64748b', marginBottom: '8px', fontSize: '15px' }}>Tests Completed</p>
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{stats.testsCompleted}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Keep practicing!</p>
          </div>
        </div>

      </div>
    </div>
  );
}