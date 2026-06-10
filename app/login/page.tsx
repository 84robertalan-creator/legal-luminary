'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (form.email && form.password.length >= 4) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', form.email);
        router.push('/dashboard');
      } else {
        setError('Please enter valid email and password (minimum 4 characters)');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
         <img 
  src="/logo.png" 
  alt="Legal Luminary" 
  style={{ 
    width: '56px', 
    height: '56px', 
    borderRadius: '16px', 
    margin: '0 auto 16px', 
    objectFit: 'contain' 
  }} 
/>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700' }}>Welcome back</h1>
          <p style={{ color: '#94a3b8' }}>Sign in to continue your preparation</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
          
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Email Address</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px', fontSize: '16px' }} placeholder="you@lawstudent.in" />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Password</label>
              <input type="password" required minLength={4} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px', fontSize: '16px' }} placeholder="Enter your password" />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#94a3b8' }}>
          New here? <a href="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>Create free account</a>
        </p>
      </div>
    </div>
  );
}