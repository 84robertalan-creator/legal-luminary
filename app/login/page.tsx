'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    // Simulate login (you can connect to real backend later)
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        alert('Login successful!');
        router.push('/dashboard');
      } else {
        setError('Please enter email and password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      padding: '20px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '420px', 
        width: '100%',
        backgroundColor: '#1e293b',
        borderRadius: '20px',
        padding: '32px 24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '55px', marginBottom: '12px' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3b82f6' }}>Welcome Back</h1>
          <p style={{ color: '#94a3b8', marginTop: '8px' }}>Login to continue your preparation</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '15px' }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '16px 18px',
              borderRadius: '12px',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '17px'
            }}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '15px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '16px 18px',
              borderRadius: '12px',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: 'white',
              fontSize: '17px'
            }}
          />
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: loading ? '#475569' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            fontSize: '17px',
            fontWeight: '600',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ textAlign: 'center', color: '#64748b' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#3b82f6' }}>Sign up here</a>
        </p>
      </div>
    </div>
  );
}