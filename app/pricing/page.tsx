'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    // Simulate payment processing (we will replace this with Cashfree later)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Mark user as Premium
    localStorage.setItem('isPremium', 'true');

    alert("🎉 Payment successful! You are now a Premium user.");
    router.push('/dashboard');

    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '700' }}>Upgrade to Premium</h1>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginTop: '8px' }}>
            Unlock unlimited questions & full analytics
          </p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          padding: '40px', 
          maxWidth: '480px', 
          margin: '0 auto',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#1e40af' }}>₹499</div>
            <div style={{ color: '#64748b', fontSize: '18px' }}>per year</div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
            {[
              "Unlimited MCQ Practice (1000+ Questions)",
              "Full Access to JCJ + CLAT LLM",
              "Detailed Performance Analytics",
              "Unlimited Mock Tests",
              "Priority Support",
              "Ad-free Experience"
            ].map((feature, index) => (
              <li key={index} style={{ padding: '10px 0', color: '#334155', fontSize: '17px' }}>
                ✅ {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '18px',
              borderRadius: '14px',
              fontSize: '19px',
              fontWeight: '700',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Processing Payment..." : "Pay ₹499 & Upgrade Now →"}
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', color: '#64748b', fontSize: '14px' }}>
            Secure payment • Cancel anytime
          </p>

          <div style={{ 
            backgroundColor: '#fef3c7', 
            color: '#92400e', 
            padding: '12px', 
            borderRadius: '10px', 
            marginTop: '20px',
            fontSize: '13px',
            textAlign: 'center'
          }}>
            Note: Real payment gateway (Cashfree) will be added soon
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}>
            ← Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}