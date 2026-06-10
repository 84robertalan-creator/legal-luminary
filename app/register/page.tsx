'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      alert('OTP sent! Check your Terminal for the code');
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      alert('Account created! 7-day trial started.');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', backgroundColor: '#1e40af', borderRadius: '16px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⚖️</div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700' }}>Create your account</h1>
          <p style={{ color: '#94a3b8' }}>Start your 7-day free trial • Protected by phone verification</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}>
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>{error}</div>}

          {step === 'details' ? (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Full Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px' }} placeholder="Rahul Sharma" />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Email Address</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px' }} placeholder="you@lawstudent.in" />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Phone Number (with country code)</label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px' }} placeholder="+91 98765 43210" />
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Used for OTP verification (prevents trial abuse)</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Create Password</label>
                <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: '14px', border: '1.5px solid #cbd5e1', borderRadius: '12px' }} placeholder="Minimum 6 characters" />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none' }}>
                {loading ? 'Sending OTP...' : 'Send OTP →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📱</div>
                <h3 style={{ fontSize: '22px', fontWeight: '700' }}>Verify your phone</h3>
                <p style={{ color: '#64748b' }}>Enter the 6-digit OTP sent to <strong>{form.phone}</strong></p>
              </div>

              <input type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} style={{ width: '100%', textAlign: 'center', fontSize: '28px', letterSpacing: '12px', padding: '16px', border: '2px solid #cbd5e1', borderRadius: '16px', marginBottom: '24px' }} placeholder="123456" />

              <button type="submit" disabled={loading || otp.length !== 6} style={{ width: '100%', backgroundColor: '#1e40af', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', marginBottom: '12px' }}>
                {loading ? 'Verifying...' : 'Verify & Start 7-Day Trial'}
              </button>

              <button type="button" onClick={() => setStep('details')} style={{ width: '100%', backgroundColor: 'transparent', color: '#64748b', padding: '12px', border: 'none' }}>
                ← Change phone number
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#94a3b8' }}>
          Already have an account? <a href="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Sign in</a>
        </p>
      </div>
    </div>
  );
}