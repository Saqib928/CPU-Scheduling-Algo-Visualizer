import React, { useState, useEffect } from 'react';

const QuizArena = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(85);
  const [correctCount, setCorrectCount] = useState(42);
  const [seconds, setSeconds] = useState(1482); // 24:42 remaining

  // Timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === 'A') {
      // P3 runs first (burst 2), P1 runs second (burst 6) and completes second. Correct!
      setCorrectCount(prev => prev + 1);
      setQuizScore(prev => Math.min(prev + 2, 100));
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background pt-16">
      
      {/* TOP HEADER */}
      <header className="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-lg h-16 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-on-surface">Quiz Arena</span>
          <div className="flex items-center gap-2 bg-secondary/5 px-3 py-1 rounded-full border border-secondary/20">
            <span className="material-symbols-outlined text-sm text-secondary">sports_esports</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Pro Session</span>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          {/* Circular countdown timer */}
          <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-lg text-on-surface font-mono text-sm font-bold border border-outline-variant">
            <span className="material-symbols-outlined text-lg text-primary animate-pulse" aria-hidden="true">schedule</span>
            <span>{formatTime(seconds)}</span>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} 
            className="flex items-center justify-center p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </header>

      {/* QUIZ ARENA LAYOUT */}
      <div className="flex-1 p-lg overflow-y-auto grid grid-cols-12 gap-lg bg-surface-container-low/30">
        
        {/* LEFT PANEL: Circular Stats & Achievements */}
        <aside aria-label="Quiz Session Statistics" className="col-span-4 flex flex-col gap-lg">
          
          {/* Score card */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-lg flex flex-col items-center text-center relative glass-panel">
            <span className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Performance</span>
            
            {/* Score Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="var(--color-surface-variant)" strokeWidth="8" fill="transparent" />
                <circle cx="72" cy="72" r="60" stroke="var(--color-primary)" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 60} 
                        strokeDashoffset={2 * Math.PI * 60 * (1 - quizScore / 100)} 
                        strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-on-surface">{quizScore}%</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Accuracy</span>
              </div>
            </div>

            {/* Correct & Appeal Badges */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-surface-container p-3 rounded-xl border border-outline-variant">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant block mb-1">Correct</span>
                <span className="text-2xl font-bold text-primary">{correctCount}</span>
              </div>
              <div className="bg-surface-container p-3 rounded-xl border border-outline-variant">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant block mb-1">Appeal</span>
                <span className="text-2xl font-bold text-tertiary">12</span>
              </div>
            </div>
          </div>

          {/* Badges Achievements */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-lg relative glass-panel">
            <span className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Achievements</span>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">FCFS Master</h4>
                  <p className="text-[10px] text-on-surface-variant">Perfect Score on FCFS Quiz (10/10)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Preemption Pro</h4>
                  <p className="text-[10px] text-on-surface-variant">Answered 5 Preemptive questions in a row</p>
                </div>
              </div>
            </div>
          </div>

          {/* Handwritten Annotation Sticky Note */}
          <div className="bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-purple-100 p-4 rounded-xl shadow-lg font-handwritten text-xs rotate-[-2deg] border border-purple-300">
            <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-purple-800 dark:text-purple-300">Pro Tip</span>
            Sweet tips: check if the CPU burst time matches the process arrival times when using SJF!
          </div>

        </aside>

        {/* RIGHT PANEL: The Question Panel */}
        <section aria-labelledby="question-header" className="col-span-8 bg-surface border border-outline-variant rounded-2xl p-lg flex flex-col relative glass-panel">
          <span className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Scheduling logic</span>
          
          <div className="flex-1 flex flex-col pt-2">
            <h3 id="question-header" className="text-headline-md font-bold text-on-surface mb-2">
              Scheduling Logic Problem
            </h3>
            
            <p className="text-sm text-on-surface-variant mb-6">
              Given the following set of processes arriving at time 0:
            </p>

            {/* Process Data Table */}
            <div className="overflow-hidden border border-outline-variant rounded-xl max-w-md mb-6">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="p-3 font-bold text-on-surface-variant">Process ID</th>
                    <th className="p-3 font-bold text-on-surface-variant">Burst Time (ms)</th>
                    <th className="p-3 font-bold text-on-surface-variant">Arrival Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr>
                    <td className="p-3 font-bold text-on-surface">P1</td>
                    <td className="p-3 text-on-surface-variant">6</td>
                    <td className="p-3 text-on-surface-variant">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-on-surface">P2</td>
                    <td className="p-3 text-on-surface-variant">8</td>
                    <td className="p-3 text-on-surface-variant">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-on-surface">P3</td>
                    <td className="p-3 text-on-surface-variant">2</td>
                    <td className="p-3 text-on-surface-variant">0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Question */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-lg mb-8">
              <p className="text-sm font-semibold text-on-surface leading-relaxed">
                If using the <span className="text-primary font-bold">Shortest Job First (Non-preemptive)</span> algorithm, which process will be the second one to complete its execution?
              </p>
            </div>

            {/* The Choices Grid */}
            <div className="grid grid-cols-2 gap-md mb-8">
              {[
                { key: 'A', label: 'Process P1' },
                { key: 'B', label: 'Process P2' },
                { key: 'C', label: 'Process P3' },
                { key: 'D', label: 'None of the above' }
              ].map(opt => (
                <button
                  key={opt.key}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(opt.key)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition-all text-left font-medium active:scale-[0.98] ${
                    selectedOption === opt.key 
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' 
                      : 'border-outline-variant hover:bg-surface-container'
                  } ${isSubmitted && opt.key === 'A' ? 'bg-primary/10 border-primary text-primary' : ''} ${
                    isSubmitted && selectedOption === opt.key && opt.key !== 'A' ? 'bg-error/10 border-error text-error' : ''
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    selectedOption === opt.key ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {opt.key}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Correct/Incorrect Feedbacks */}
            {isSubmitted && (
              <div className={`p-md rounded-xl border mb-6 flex items-start gap-3 ${selectedOption === 'A' ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-error/5 border-error/20 text-error'}`}>
                <span className="material-symbols-outlined text-lg">
                  {selectedOption === 'A' ? 'check_circle' : 'error'}
                </span>
                <div className="text-xs">
                  <span className="font-bold">{selectedOption === 'A' ? 'Correct!' : 'Incorrect.'} </span>
                  {selectedOption === 'A' 
                    ? 'P3 is the shortest (2ms) and runs first, finishing at t=2. P1 is the next shortest (6ms) and runs second, finishing at t=8. Thus, P1 is indeed the second process to complete.'
                    : 'Since all processes arrive at t=0, the scheduler orders them by shortest burst time: P3 (2ms), then P1 (6ms), then P2 (8ms). The second process to finish is P1.'}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-auto border-t border-outline-variant pt-lg flex justify-between items-center">
            <button onClick={resetQuiz} className="text-xs text-on-surface-variant hover:text-primary font-bold underline transition-colors">
              Reset Question
            </button>
            <div className="flex items-center gap-sm">
              <button disabled={isSubmitted} className="px-5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-semibold transition-colors disabled:opacity-50 text-xs">
                Skip
              </button>
              <button 
                onClick={handleAnswerSubmit} 
                disabled={isSubmitted || !selectedOption} 
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 text-xs"
              >
                Submit Answer
              </button>
            </div>
          </div>

        </section>

      </div>

    </div>
  );
};

export default QuizArena;
