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

  // Your 20 questions (add all your real questions here)
  const questions = [
    { 
      question: "Which Article of the Indian Constitution deals with Equality before Law?", 
      options: ["Article 14", "Article 19", "Article 21", "Article 32"], 
      correct: 0 
    },
    { 
      question: "What is the meaning of 'Consideration' under Indian Contract Act, 1872?", 
      options: ["Promise", "Something in return", "Agreement", "Offer"], 
      correct: 1 
    },
    // Add your remaining 18 questions here in the same format...
    // Example:
    // { question: "Next question text?", options: ["A", "B", "C", "D"], correct: 2 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 1 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let calculated = 0;
    selectedAnswers.forEach((ans, i) => {
      if (ans === questions[i].correct) calculated++;
    });
    setScore(calculated);
    setShowResult(true);

    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push({ score: calculated, total: questions.length, date: new Date().toISOString() });
    localStorage.setItem('quizResults', JSON.stringify(results));
  };

  if (showResult) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Quiz Completed!</h1>
        <div style={{ fontSize: '52px', fontWeight: 'bold', color: '#22c55e' }}>{score}/{questions.length}</div>
        <button 
          onClick={() => router.push('/dashboard')} 
          style={{ marginTop: '30px', padding: '16px 32px', fontSize: '18px', backgroundColor: '#3b82f6', borderRadius: '12px' }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '12px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        
        {/* Timer */}
        <div style={{ textAlign: 'right', marginBottom: '12px', fontSize: '15px', color: timeLeft < 300 ? '#ef4444' : '#86efac' }}>
          Time Left: {Math.floor(timeLeft/60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>

        {/* Question */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '17.5px', lineHeight: '1.6', marginBottom: '28px' }}>
            {questions[currentQuestion].question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[currentQuestion].options.map((option, idx) => (
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

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', position: 'sticky', bottom: '12px' }}>
          <button
            onClick={() => setCurrentQuestion(p => Math.max(0, p-1))}
            disabled={currentQuestion === 0}
            style={{ flex: 1, padding: '16px', backgroundColor: '#475569', borderRadius: '12px', fontSize: '16px' }}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
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
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}