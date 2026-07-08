import React, { useState, useEffect } from 'react';
import { quizData, finalExamData } from '../data/quizData';
import CertificateModal from './CertificateModal';

const QuizArena = ({ isDarkMode, setIsDarkMode }) => {
  const [activeQuizType, setActiveQuizType] = useState(null); // 'FCFS', 'SJF', ..., 'Final'
  const [questions, setQuestions] = useState([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Track detailed answers for analysis
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = (type) => {
    setActiveQuizType(type);
    if (type === 'Final') {
      setQuestions(finalExamData);
    } else {
      setQuestions(quizData[type] || []);
    }
    setCurrentQIdx(0);
    setScore(0);
    setCorrectCount(0);
    setIsFinished(false);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserAnswers([]);
  };

  const currentQ = questions[currentQIdx];

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQ,
        selectedOption,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentQIdx < questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Quiz finished
      const finalScore = Math.round((correctCount / questions.length) * 100) || 0;
      setScore(finalScore);
      setIsFinished(true);
    }
  };

  const handleFinishExam = () => {
    const finalScore = Math.round((correctCount / questions.length) * 100) || 0;
    setScore(finalScore);
    if (activeQuizType === 'Final' && finalScore >= 80) {
      setShowCertificate(true);
    }
    setIsFinished(true);
  };

  const renderAnalysis = () => {
    if (activeQuizType !== 'Final') return null;

    const stats = { FCFS: { total: 0, correct: 0 }, SJF: { total: 0, correct: 0 }, SRTF: { total: 0, correct: 0 }, Priority: { total: 0, correct: 0 }, RR: { total: 0, correct: 0 } };
    
    userAnswers.forEach(ans => {
      if (stats[ans.question.type]) {
        stats[ans.question.type].total += 1;
        if (ans.isCorrect) stats[ans.question.type].correct += 1;
      }
    });

    let weakestAlgo = 'FCFS';
    let lowestPercentage = 100;

    Object.keys(stats).forEach(algo => {
      const s = stats[algo];
      if (s.total > 0) {
        const perc = (s.correct / s.total) * 100;
        if (perc < lowestPercentage) {
          lowestPercentage = perc;
          weakestAlgo = algo;
        }
      }
    });

    return (
      <div className="mt-8 bg-surface-container-low border border-outline-variant p-6 rounded-2xl w-full max-w-2xl text-left shadow-inner">
        <h3 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">analytics</span>
          Performance Analysis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {Object.keys(stats).map(algo => {
            const s = stats[algo];
            if (s.total === 0) return null;
            const perc = Math.round((s.correct / s.total) * 100);
            return (
              <div key={algo} className="bg-surface p-3 rounded-xl border border-outline-variant flex flex-col items-center">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{algo}</span>
                <span className={`text-xl font-bold ${perc >= 80 ? 'text-green-500' : perc >= 50 ? 'text-tertiary' : 'text-error'}`}>
                  {perc}%
                </span>
                <span className="text-[10px] text-on-surface-variant">{s.correct} / {s.total}</span>
              </div>
            );
          })}
        </div>
        <div className="bg-tertiary/10 border border-tertiary/20 p-4 rounded-xl flex gap-4 items-start">
          <span className="material-symbols-outlined text-tertiary mt-1">lightbulb</span>
          <div>
            <span className="font-bold text-sm text-tertiary block mb-1">Developer Suggestion</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Based on your final exam performance, you should head back to the Learning Notebook and review the <strong className="text-on-surface">{weakestAlgo}</strong> algorithm page. Master the core concepts there before retaking the exam to boost your score above 80%!
            </p>
          </div>
        </div>
      </div>
    );
  };

  // If no quiz is selected, show the selection menu
  if (!activeQuizType) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background pt-24 px-8 items-center overflow-y-auto">
        <h2 className="text-3xl font-black text-on-surface mb-8">Select Your Challenge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
          {Object.keys(quizData).map(algo => (
            <button key={algo} onClick={() => startQuiz(algo)} className="bg-surface border border-outline-variant rounded-2xl p-6 flex flex-col items-start hover:shadow-lg hover:border-primary/50 transition-all text-left">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">quiz</span>
              <h3 className="text-xl font-bold text-on-surface mb-2">{algo} Assessment</h3>
              <p className="text-sm text-on-surface-variant">Test your knowledge of the {algo} scheduling algorithm. (10 Questions)</p>
            </button>
          ))}
          <button onClick={() => startQuiz('Final')} className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-surface-container-lowest border border-primary/50 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl hover:scale-105 transition-all text-left md:col-span-2 lg:col-span-3 items-center text-center">
            <span className="material-symbols-outlined text-primary mb-4 text-5xl">workspace_premium</span>
            <h3 className="text-2xl font-black text-on-surface mb-2">The Final Exam</h3>
            <p className="text-sm text-on-surface-variant max-w-md">The ultimate test covering all algorithms (50 Questions). Score 80% or higher to earn your verified certificate!</p>
          </button>
        </div>
      </div>
    );
  }

  // Quiz Finished Screen
  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background pt-24 px-8 items-center overflow-y-auto pb-12">
        {showCertificate && <CertificateModal score={score} onClose={() => setShowCertificate(false)} />}
        
        <div className="bg-surface border border-outline-variant rounded-3xl p-12 flex flex-col items-center text-center shadow-xl w-full max-w-3xl">
          <span className={`material-symbols-outlined text-6xl mb-6 ${score >= 80 ? 'text-green-500' : 'text-primary'}`}>
            {score >= 80 ? 'emoji_events' : 'sports_score'}
          </span>
          <h2 className="text-3xl font-black text-on-surface mb-2">Quiz Completed!</h2>
          <p className="text-lg text-on-surface-variant mb-8">You scored {score}% ({correctCount} / {questions.length} correct)</p>
          
          <div className="flex gap-4">
            <button onClick={() => setActiveQuizType(null)} className="px-6 py-2 rounded-lg border border-outline-variant font-bold hover:bg-surface-container transition-colors">
              Back to Menu
            </button>
            {activeQuizType === 'Final' && score >= 80 && (
              <button onClick={() => setShowCertificate(true)} className="px-6 py-2 rounded-lg bg-primary text-on-primary font-bold shadow-lg hover:shadow-primary/30 transition-all">
                View Certificate
              </button>
            )}
            {activeQuizType === 'Final' && score < 80 && (
              <button onClick={() => startQuiz('Final')} className="px-6 py-2 rounded-lg bg-primary text-on-primary font-bold shadow-lg hover:shadow-primary/30 transition-all">
                Try Again
              </button>
            )}
          </div>

          {renderAnalysis()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background pt-16">
      
      {/* TOP HEADER */}
      <header className="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-lg h-16 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveQuizType(null)} className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_back</button>
          <span className="text-xl font-bold text-on-surface">{activeQuizType} Arena</span>
          <div className="flex items-center gap-2 bg-secondary/5 px-3 py-1 rounded-full border border-secondary/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Question {currentQIdx + 1} of {questions.length}</span>
          </div>
        </div>
      </header>

      {/* QUIZ ARENA LAYOUT */}
      <div className="flex-1 p-lg overflow-y-auto grid grid-cols-12 gap-lg bg-surface-container-low/30">
        
        {/* LEFT PANEL: Progress */}
        <aside className="col-span-4 flex flex-col gap-lg">
          <div className="bg-surface border border-outline-variant rounded-2xl p-lg flex flex-col items-center text-center relative glass-panel">
            <span className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Performance</span>
            
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="var(--color-surface-variant)" strokeWidth="8" fill="transparent" />
                <circle cx="72" cy="72" r="60" stroke="var(--color-primary)" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 60} 
                        strokeDashoffset={2 * Math.PI * 60 * (1 - (currentQIdx / questions.length))} 
                        strokeLinecap="round" className="transition-all duration-500" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-on-surface">{Math.round((currentQIdx / questions.length) * 100)}%</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Progress</span>
              </div>
            </div>

            <div className="bg-surface-container p-3 rounded-xl border border-outline-variant w-full">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant block mb-1">Correct Answers So Far</span>
              <span className="text-2xl font-bold text-primary">{correctCount}</span>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL: The Question Panel */}
        <section className="col-span-8 bg-surface border border-outline-variant rounded-2xl p-lg flex flex-col relative glass-panel">
          
          <div className="flex-1 flex flex-col pt-2">
            <div className="bg-surface-container border border-outline-variant rounded-xl p-lg mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {currentQ.type}
                </span>
              </div>
              <p className="text-lg font-semibold text-on-surface leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {currentQ.options.map(opt => (
                <button
                  key={opt.key}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(opt.key)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left font-medium active:scale-[0.98] ${
                    selectedOption === opt.key 
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' 
                      : 'border-outline-variant hover:bg-surface-container'
                  } ${isSubmitted && opt.key === currentQ.correctAnswer ? 'bg-green-500/10 border-green-500 text-green-700' : ''} ${
                    isSubmitted && selectedOption === opt.key && opt.key !== currentQ.correctAnswer ? 'bg-error/10 border-error text-error' : ''
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    selectedOption === opt.key ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'
                  } ${isSubmitted && opt.key === currentQ.correctAnswer ? 'bg-green-500 text-white' : ''}`}>
                    {opt.key}
                  </span>
                  <span className="text-base">{opt.label}</span>
                </button>
              ))}
            </div>

            {isSubmitted && (
              <div className={`p-md rounded-xl border mb-6 flex items-start gap-3 ${selectedOption === currentQ.correctAnswer ? 'bg-green-500/5 border-green-500/20 text-green-700' : 'bg-error/5 border-error/20 text-error'}`}>
                <span className="material-symbols-outlined text-xl mt-0.5">
                  {selectedOption === currentQ.correctAnswer ? 'check_circle' : 'error'}
                </span>
                <div className="text-sm leading-relaxed">
                  <span className="font-bold block mb-1">{selectedOption === currentQ.correctAnswer ? 'Correct!' : 'Incorrect.'} </span>
                  {currentQ.explanation}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto border-t border-outline-variant pt-lg flex justify-end items-center">
            {isSubmitted ? (
              currentQIdx < questions.length - 1 ? (
                <button onClick={handleNext} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all text-sm flex items-center gap-2">
                  Next Question
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              ) : (
                <button onClick={handleFinishExam} className="bg-tertiary text-on-tertiary px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-tertiary/20 active:scale-95 transition-all text-sm flex items-center gap-2">
                  Finish Quiz
                  <span className="material-symbols-outlined text-sm">flag</span>
                </button>
              )
            ) : (
              <button 
                onClick={handleAnswerSubmit} 
                disabled={!selectedOption} 
                className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 text-sm"
              >
                Submit Answer
              </button>
            )}
          </div>

        </section>

      </div>

    </div>
  );
};

export default QuizArena;
