'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 20 Real MCQs from Indian Contract Act, 1872 (JCJ Prelims Level)
const trialQuestions = [
  {
    id: 1,
    question: "Which Section of the Indian Contract Act, 1872 defines 'Contract'?",
    options: ["Section 2(a)", "Section 2(h)", "Section 2(d)", "Section 10"],
    correct: 1
  },
  {
    id: 2,
    question: "An agreement enforceable by law is called:",
    options: ["Void Agreement", "Voidable Contract", "Contract", "Illegal Agreement"],
    correct: 2
  },
  {
    id: 3,
    question: "Which of the following is NOT an essential element of a valid contract?",
    options: ["Offer and Acceptance", "Consideration", "Competent Parties", "Written Document"],
    correct: 3
  },
  {
    id: 4,
    question: "A proposal when accepted becomes a:",
    options: ["Promise", "Agreement", "Contract", "Consideration"],
    correct: 0
  },
  {
    id: 5,
    question: "Consideration must move at the desire of:",
    options: ["Promisor", "Promisee", "Third Party", "Both Promisor and Promisee"],
    correct: 0
  },
  {
    id: 6,
    question: "Which Section deals with 'Communication, Acceptance and Revocation of Proposals'?",
    options: ["Section 3", "Section 4", "Section 5", "Section 6"],
    correct: 0
  },
  {
    id: 7,
    question: "A minor's agreement is:",
    options: ["Void", "Voidable", "Valid", "Illegal"],
    correct: 0
  },
  {
    id: 8,
    question: "Which Section of the Indian Contract Act deals with 'Coercion'?",
    options: ["Section 15", "Section 16", "Section 17", "Section 18"],
    correct: 0
  },
  {
    id: 9,
    question: "Undue Influence is defined under which Section?",
    options: ["Section 15", "Section 16", "Section 17", "Section 19"],
    correct: 1
  },
  {
    id: 10,
    question: "Fraud is defined under which Section of the Indian Contract Act?",
    options: ["Section 16", "Section 17", "Section 18", "Section 19"],
    correct: 1
  },
  {
    id: 11,
    question: "A contract caused by coercion is:",
    options: ["Void", "Voidable", "Valid", "Illegal"],
    correct: 1
  },
  {
    id: 12,
    question: "Which of the following agreements is expressly declared void?",
    options: ["Agreement in restraint of marriage", "Agreement to sell land", "Agreement to buy a car", "Agreement to teach"],
    correct: 0
  },
  {
    id: 13,
    question: "A contingent contract is defined under which Section?",
    options: ["Section 31", "Section 32", "Section 33", "Section 36"],
    correct: 0
  },
  {
    id: 14,
    question: "An agreement without consideration is:",
    options: ["Always void", "Always valid", "Voidable", "Valid if made out of love and affection"],
    correct: 3
  },
  {
    id: 15,
    question: "Which Section deals with 'Effect of Mistake'?",
    options: ["Section 20", "Section 21", "Section 22", "Section 23"],
    correct: 0
  },
  {
    id: 16,
    question: "A contract which ceases to be enforceable by law becomes:",
    options: ["Void", "Voidable", "Valid", "Illegal"],
    correct: 0
  },
  {
    id: 17,
    question: "Quasi Contracts are dealt under which Sections?",
    options: ["Sections 68 to 72", "Sections 73 to 75", "Sections 76 to 80", "Sections 10 to 15"],
    correct: 0
  },
  {
    id: 18,
    question: "Damages for breach of contract are provided under which Section?",
    options: ["Section 73", "Section 74", "Section 75", "Section 76"],
    correct: 0
  },
  {
    id: 19,
    question: "An agreement to do an impossible act is:",
    options: ["Void", "Voidable", "Valid", "Illegal"],
    correct: 0
  },
  {
    id: 20,
    question: "Which of the following is a valid consideration?",
    options: ["Past consideration", "Present consideration", "Future consideration", "All of the above"],
    correct: 3
  }
];

export default function JCJQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === trialQuestions[index].correct) score++;
    });

    const savedData = localStorage.getItem('quizResults');
    const results = savedData ? JSON.parse(savedData) : { attempts: [] };

    results.attempts.push({
      score: score,
      total: 20,
      date: new Date().toISOString(),
      subject: "Indian Contract Act, 1872"
    });

    localStorage.setItem('quizResults', JSON.stringify(results));
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === trialQuestions[index].correct) score++;
    });
    return score;
  };

  if (showResult) {
    const score = calculateScore();
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '40px 20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'white', borderRadius: '20px', padding: '40px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>Quiz Completed!</h1>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '72px', fontWeight: '700', color: '#1e40af' }}>{score} / 20</div>
            <p style={{ fontSize: '20px', color: '#475569' }}>Your Score</p>
          </div>

          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
            <p style={{ color: '#334155' }}>
              This was a <strong>Trial Quiz</strong> (limited to 20 questions).<br />
              Subscribe to Legal Luminary Premium to access the full question bank with 1000+ questions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} style={{ backgroundColor: '#1e40af', color: 'white', padding: '16px 32px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
              Back to Dashboard
            </button>
            <button onClick={() => window.location.reload()} style={{ backgroundColor: '#334155', color: 'white', padding: '16px 32px', borderRadius: '12px', fontSize: '17px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = trialQuestions[currentQuestion];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
            <div>
              <h2 style={{ color: 'white', margin: 0 }}>JCJ Prelims | Indian Contract Act, 1872</h2>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>20 Questions • 30 Minutes • Trial Mode</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '8px 20px', borderRadius: '9999px', fontSize: '18px', fontWeight: '700' }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        <div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '12px 20px', borderRadius: '12px', marginBottom: '20px', fontSize: '15px' }}>
          ⚠️ <strong>Trial Mode:</strong> You are limited to 20 questions. Subscribe for full access to 1000+ questions.
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ backgroundColor: '#e0e7ff', color: '#1e40af', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px', fontWeight: '600' }}>
              Question {currentQuestion + 1} of 20
            </span>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#0f172a', marginBottom: '24px' }}>
            {q.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: selectedAnswers[currentQuestion] === index ? '2px solid #1e40af' : '1.5px solid #cbd5e1',
                  backgroundColor: selectedAnswers[currentQuestion] === index ? '#eff6ff' : 'white',
                  fontSize: '17px',
                  cursor: 'pointer'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            style={{ padding: '14px 28px', borderRadius: '12px', border: 'none', backgroundColor: '#334155', color: 'white', fontSize: '16px', cursor: 'pointer' }}
          >
            ← Previous
          </button>

          {currentQuestion < 19 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              style={{ padding: '14px 28px', borderRadius: '12px', border: 'none', backgroundColor: '#1e40af', color: 'white', fontSize: '16px', cursor: 'pointer' }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{ padding: '14px 28px', borderRadius: '12px', border: 'none', backgroundColor: '#16a34a', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
            >
              Submit Quiz
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '30px' }}>
          {trialQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: currentQuestion === index ? '#1e40af' : selectedAnswers[index] !== -1 ? '#dbeafe' : '#e2e8f0',
                color: currentQuestion === index ? 'white' : '#334155',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}