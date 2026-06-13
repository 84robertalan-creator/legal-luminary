'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JCJQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  // Login Protection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  // Big Pool of Questions (Random 20 every time)
  const questionPool = [
    { question: "Which Article of the Indian Constitution deals with Equality before Law?", options: ["Article 14", "Article 19", "Article 21", "Article 32"], correct: 0 },
    { question: "What is the meaning of 'Consideration' under Indian Contract Act, 1872?", options: ["Promise", "Something in return", "Agreement", "Offer"], correct: 1 },
    { question: "Which Section of Indian Contract Act defines 'Coercion'?", options: ["Section 15", "Section 16", "Section 17", "Section 18"], correct: 0 },
    { question: "A contract without consideration is", options: ["Valid", "Void", "Voidable", "Illegal"], correct: 1 },
    { question: "The Indian Contract Act, 1872 came into force on", options: ["1st September 1872", "1st October 1872", "1st January 1872", "15th August 1872"], correct: 0 },
    { question: "Which Article provides for Right to Life and Personal Liberty?", options: ["Article 14", "Article 19", "Article 21", "Article 32"], correct: 2 },
    { question: "Agreement without free consent is", options: ["Valid", "Void", "Voidable", "Illegal"], correct: 2 },
    { question: "Who is competent to contract?", options: ["Minor", "Person of unsound mind", "Major of sound mind", "All of the above"], correct: 2 },
    { question: "Which is not a mode of discharge of contract?", options: ["Performance", "Breach", "Impossibility", "Acceptance"], correct: 3 },
    { question: "Fundamental Rights are guaranteed under which part of the Constitution?", options: ["Part III", "Part IV", "Part V", "Part VI"], correct: 0 },
    { question: "Offer + Acceptance =", options: ["Contract", "Agreement", "Promise", "Consideration"], correct: 1 },
    { question: "The Supreme Court of India is established under which Article?", options: ["Article 124", "Article 131", "Article 32", "Article 226"], correct: 0 },
    { question: "A minor's agreement is", options: ["Valid", "Void", "Voidable", "Enforceable"], correct: 1 },
    { question: "Right to Constitutional Remedies is under", options: ["Article 19", "Article 21", "Article 32", "Article 14"], correct: 2 },
    { question: "Which Section deals with 'Undue Influence'?", options: ["Section 15", "Section 16", "Section 17", "Section 19"], correct: 1 },
    { question: "The Preamble of Indian Constitution was amended in which year?", options: ["1950", "1976", "1992", "2002"], correct: 1 },
    { question: "Breach of contract gives right to", options: ["Damages", "Specific Performance", "Both", "None"], correct: 2 },
    { question: "Directive Principles of State Policy are in", options: ["Part III", "Part IV", "Part V", "Part VI"], correct: 1 },
    { question: "Free consent means consent free from", options: ["Coercion", "Undue Influence", "Fraud", "All of the above"], correct: 3 },
    { question: "Judicial Review in India is borrowed from", options: ["UK", "USA", "Ireland", "Canada"], correct: 1 }
  ];

  // Select random 20 questions when component loads
  useEffect(() => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 20));
  }, []);

  // Timer
  useEffect(() => {
    if (quizQuestions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 1 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [quizQuestions]);

  const handleAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculated = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === quizQuestions[i].correct) calculated++;
    });
    setScore(calculated);
    setShowResult(true);

    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push({ score: calculated, total: 20, date: new Date().toISOString() });
    localStorage.setItem('quizResults', JSON.stringify(results));
  };

  if (showResult) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Quiz Completed!</h1>
        <div style={{ fontSize: '52px', fontWeight: 'bold', color: '#22c55e', margin: '20px 0' }}>
          {score} / 20
        </div>
        <button 
          onClick={() => router.push('/dashboard')} 
          style={{ marginTop: '30px', padding: '16px 32px', fontSize: '18px', backgroundColor: '#3b82f6', borderRadius: '12px' }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading questions...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '12px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'right', marginBottom: '12px', fontSize: '15px', color: timeLeft < 300 ? '#ef4444' : '#86efac' }}>
          Time Left: {Math.floor(timeLeft/60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '17.5px', lineHeight: '1.6', marginBottom: '28px' }}>
            {quizQuestions[currentQuestion].question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quizQuestions[currentQuestion].options.map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                style={{
                  padding: '18px',
                  textAlign: 'left',
                  backgroundColor: selectedAnswers[currentQuestion] === idx ? '#3b82f6' : '#334155',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16.5px',
                  minHeight: '56px'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', position: 'sticky', bottom: '12px' }}>
          <button
            onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
            disabled={currentQuestion === 0}
            style={{ flex: 1, padding: '16px', backgroundColor: '#475569', borderRadius: '12px', fontSize: '16px' }}
          >
            Previous
          </button>

          {currentQuestion === 19 ? (
            <button 
              onClick={handleSubmit} 
              style={{ flex: 1, padding: '16px', backgroundColor: '#22c55e', borderRadius: '12px', fontSize: '16px', fontWeight: '600' }}
            >
              Submit Test
            </button>
          ) : (
            <button 
              onClick={() => setCurrentQuestion(p => p + 1)} 
              style={{ flex: 1, padding: '16px', backgroundColor: '#3b82f6', borderRadius: '12px', fontSize: '16px' }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}