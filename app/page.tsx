'use client';

import Link from 'next/link';

export default function LegalLuminaryHome() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Professional Header */}
      <div style={{ 
        backgroundColor: '#1e2937', 
        borderBottom: '1px solid #334155',
        padding: '16px 24px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/logo.png" 
              alt="Legal Luminary" 
              style={{ height: '42px', width: 'auto' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/login" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>
              Login
            </Link>
            <Link 
              href="/register" 
              style={{ 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                padding: '10px 24px', 
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-block',
          backgroundColor: '#1e2937',
          color: '#94a3b8',
          borderRadius: '9999px',
          padding: '6px 20px',
          fontSize: '13px',
          fontWeight: '500',
          marginBottom: '24px'
        }}>
          INDIA'S #1 LAW MCQ PLATFORM
        </div>

        <h1 style={{ 
          fontSize: '52px', 
          fontWeight: '700', 
          lineHeight: '1.1',
          marginBottom: '20px',
          color: 'white'
        }}>
          Legal Luminary Mock Practice
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#94a3b8', 
          maxWidth: '480px', 
          margin: '0 auto 48px',
          lineHeight: '1.5'
        }}>
          Practice with real exam-pattern questions.<br /> 
          7-day free trial. No card required.
        </p>

        {/* Main Card */}
        <div style={{ 
          maxWidth: '440px', 
          margin: '0 auto', 
          backgroundColor: 'white', 
          color: '#0f172a',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
        }}>
          {/* Card Header - Centered */}
          <div style={{ 
            backgroundColor: '#1e40af', 
            color: 'white', 
            padding: '20px 28px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '15px', fontWeight: '600' }}>Legal Luminary App</div>
            <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '2px' }}>Premium MCQ Engine</div>
          </div>

          <div style={{ padding: '28px' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Welcome, Law Aspirant</div>
              <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '6px', color: '#0f172a' }}>
                Choose your portal
              </div>
            </div>

            {/* JCJ Card */}
            <Link href="/quiz/jcj" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                border: '1.5px solid #e2e8f0', 
                borderRadius: '14px', 
                padding: '20px',
                marginBottom: '14px',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: '700', fontSize: '17px', color: '#0f172a' }}>
                  Junior Civil Judge (JCJ) Prelims
                </div>
                <div style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
                  State syllabus statutory mock examinations
                </div>
                <div style={{ 
                  marginTop: '14px',
                  display: 'inline-block',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '12px',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontWeight: '600'
                }}>
                  240+ Questions • 12 Subjects
                </div>
              </div>
            </Link>

            {/* CLAT Card */}
            <Link href="/quiz/clat" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                border: '1.5px solid #e2e8f0', 
                borderRadius: '14px', 
                padding: '20px',
                marginBottom: '28px',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: '700', fontSize: '17px', color: '#0f172a' }}>
                  CLAT LLM PG
                </div>
                <div style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>
                  Postgraduate constitutional &amp; legal topics
                </div>
                <div style={{ 
                  marginTop: '14px',
                  display: 'inline-block',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  fontSize: '12px',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontWeight: '600'
                }}>
                  180+ Advanced Questions
                </div>
              </div>
            </Link>

            {/* CTA Button */}
            <Link 
              href="/register" 
              style={{ 
                display: 'block',
                backgroundColor: '#1e40af',
                color: 'white',
                textAlign: 'center',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '17px',
                textDecoration: 'none'
              }}
            >
              Start 7-Day Free Trial
            </Link>
            <p style={{ 
              textAlign: 'center', 
              fontSize: '13px', 
              color: '#64748b', 
              marginTop: '14px' 
            }}>
              Instant Access • No Bank Details Demanded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}