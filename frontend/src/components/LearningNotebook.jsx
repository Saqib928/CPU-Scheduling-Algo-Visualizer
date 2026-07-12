import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notebookPages = [
  { id: 'intro', algo: null },
  { id: 'FCFS', algo: 'FCFS' },
  { id: 'SJF', algo: 'SJF' },
  { id: 'SRTF', algo: 'SRTF' },
  { id: 'Priority', algo: 'Priority' },
  { id: 'RR', algo: 'RR' },
  { id: 'cheatsheet', algo: null },
  { id: 'final', algo: null },
];

const Paper = ({ children }) => (
  <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 notebook-paper relative flex flex-col shadow-md w-full min-h-[600px] shrink-0">
    <div className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-30 pointer-events-none z-10" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="w-4 h-4 rounded-full border-2 border-outline bg-surface-variant shadow-inner"></div>
      ))}
    </div>
    {children}
  </div>
);

const LearningNotebook = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('FCFS');
  const [simulationStep, setSimulationStep] = useState(0); 
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const progress = Math.round(((currentPageIndex + 1) / notebookPages.length) * 100);

  const currentPage = notebookPages[currentPageIndex];

  useEffect(() => {
    if (currentPage.algo) {
      setSelectedAlgo(currentPage.algo);
    }
  }, [currentPage]);

  const runSimulation = (algo) => {
    setSelectedAlgo(algo);
    setSimulationStep(1);
    setTimeout(() => {
      setSimulationStep(2);
    }, 2000);
  };

  const resetSimulation = () => {
    setSimulationStep(0);
  };

  const nextPage = () => {
    if (currentPageIndex < notebookPages.length - 1) {
      setDirection(1);
      setCurrentPageIndex(currentPageIndex + 1);
      resetSimulation();
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      setCurrentPageIndex(currentPageIndex - 1);
      resetSimulation();
    }
  };

  // --- CONTENT PAGES ---

  const renderIntroPage = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-4 rotate-[-1deg]">
            Welcome to OS Scheduling! 🎓
          </h2>
          <p className="text-[15px] text-on-surface-variant mb-6 leading-relaxed">
            Class, think of the CPU as a single worker and the <span className="underline decoration-secondary decoration-2 font-bold">Ready Queue</span> as the line of tasks waiting. Scheduling is simply the OS deciding <em>who goes next</em>.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 bg-surface-container-lowest/50 border border-outline-variant rounded-2xl p-6 mb-6">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Ready Queue</span>
            <div className="flex gap-2 p-2 border-2 border-dashed border-outline rounded-lg bg-surface">
              <div className="w-8 h-8 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P1</div>
              <div className="w-8 h-8 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P2</div>
              <div className="w-8 h-8 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P3</div>
            </div>
            <span className="material-symbols-outlined text-2xl animate-pulse text-outline">arrow_downward</span>
            <div className="w-14 h-14 border-2 border-primary bg-primary/10 text-primary rounded-xl flex items-center justify-center font-extrabold text-sm shadow-sm">CPU</div>
          </div>

          <div className="bg-sky-200/50 text-sky-950 p-4 rounded-xl shadow-sm text-[14px] border border-sky-300 mb-6">
            <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-sky-800">The 3 Exam Metrics</span>
            <strong>1. Turnaround Time:</strong> Total time from arrival to completion.<br/>
            <strong>2. Waiting Time:</strong> Time spent sitting in the Ready Queue.<br/>
            <strong>3. Throughput:</strong> How many tasks complete per time unit.
          </div>
          
          <p className="text-on-surface-variant text-[14px]">
            <strong>Professor's Tip:</strong> Always ask yourself: Is the algorithm Preemptive (can it pause a running task?) or Non-Preemptive? This is a huge exam trap!
          </p>
        </div>
      </Paper>
    </div>
  );

  const renderFCFS = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            1. First Come, First Served (FCFS)
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>Imagine standing in a single-file line at a coffee shop. The barista serves whoever arrived first. Even if the person at the front orders catering for an entire corporate office, and you just want a single drip coffee, you are forced to stand there and wait!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ How It Works</h3>
              <p>It uses a simple <strong>FIFO (First-In, First-Out) Queue</strong>. When a process arrives, it goes to the back of the line. Because it is <strong>non-preemptive</strong>, once a process gets the CPU, it holds it until it finishes completely.</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            FCFS: Deep Dive 🤿
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div className="bg-error/10 border border-error/30 p-4 rounded-xl">
              <h3 className="font-bold text-lg text-error mb-1">⚠️ The Convoy Effect</h3>
              <p>This is FCFS's biggest flaw. If a massive process arrives first, all the quick tasks behind it get stuck waiting forever. FCFS is highly sensitive to the arrival sequence. A single heavy process arriving early can destroy system throughput!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Edge Cases & Quirks</h3>
              <p><strong>Tie-Breaker:</strong> If two processes arrive at the exact same time, the system breaks the tie using the Process ID (PID) — the lower PID (e.g., P1 before P2) goes first.</p>
              <p className="mt-2"><strong>Idle Time:</strong> If the queue is empty, the CPU sits idle. Make sure to mark `IDLE` in your Gantt charts!</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderSJF = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            2. Shortest Job First (SJF)
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>Imagine you have a stack of exams to grade. Instead of grading them in order, you find the thinnest booklet, grade it in 2 minutes, and then pick the next shortest one. By knocking out quick tasks first, you drastically reduce waiting time for everyone!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ How It Works</h3>
              <p>SJF is <strong>non-preemptive</strong>. At any given moment, the OS looks at all available processes in the ready queue and picks the one with the <strong>smallest Burst Time</strong>. It runs that process to completion, and then repeats.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🏆 Mathematical Perfection</h3>
              <p>SJF is mathematically proven to minimize average waiting time. Executing a short job early removes it from the waiting pool quickly, while only adding a tiny delay to longer jobs.</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            SJF: Deep Dive 🤿
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div className="bg-tertiary/10 border border-tertiary/30 p-4 rounded-xl">
              <h3 className="font-bold text-lg text-tertiary mb-1">⚠️ The Starvation Crisis</h3>
              <p>If short processes keep flooding the queue, a long process will sit at the bottom forever. This infinite delay is called <strong>Starvation</strong> or <strong>Indefinite Blocking</strong>.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-World Nightmare</h3>
              <p>An OS cannot predict the future! It doesn't know how long a program will run before it executes. Real systems can only <em>estimate</em> burst times using an average of past execution times (Exponential Smoothing).</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Tie-Breaker</h3>
              <p>If two processes have the exact same short burst time, the scheduler defaults to FCFS rules (whoever arrived first wins).</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderSRTF = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            3. Shortest Remaining Time First (SRTF)
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>This is the aggressive, proactive sibling of SJF. Imagine you are working on a 10-hour project. Suddenly, a colleague walks in with a 15-minute task. You instantly drop your big project, finish the 15-minute task, and then resume the big one.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ How It Works</h3>
              <p>SRTF is <strong>preemptive</strong>. Every time a new process arrives, the OS compares the <strong>Remaining Time</strong> of the current running process against the newcomer. If the newcomer is strictly shorter, it instantly kicks the current process off the CPU!</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            SRTF: Deep Dive 🤿
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div className="bg-surface-container border border-outline-variant p-4 rounded-xl">
              <h3 className="font-bold text-lg text-on-surface mb-1">⚠️ The Hidden Cost: Context Switching</h3>
              <p>While SRTF reduces wait times, it has a massive hidden cost. Pausing a process, saving its state, and loading a new one takes time and energy. If it happens too often, the CPU spends more time switching than doing actual work!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Interview Trap: "Same Time"</h3>
              <p><strong>Q:</strong> If the running process has 4 units left, and a newcomer arrives requiring 4 units, does preemption happen?</p>
              <p><strong>A: No!</strong> Preemption only occurs if the newcomer is <em>strictly shorter</em>. If they are equal, the current process keeps the CPU to avoid an unnecessary context switch.</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderPriority = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            4. Priority Scheduling
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>Think of a hospital ER. Patients aren't treated based on arrival time or how fast their checkup is. They are treated by severity! An ambulance arrival skips the lobby and goes straight to a bed.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ Execution Styles</h3>
              <p><strong>Non-Preemptive:</strong> A VIP arrives, but must politely wait for the current task to finish before taking over.<br/>
              <strong>Preemptive:</strong> The moment a VIP arrives, it instantly halts the current task mid-sentence and forcefully takes over the CPU!</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Priority: Deep Dive 🤿
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl">
              <h3 className="font-bold text-lg text-primary mb-1">⚠️ The Starvation Crisis</h3>
              <p>In heavily loaded systems, low-priority tasks can wait forever. Fun fact: In 1973, when shutting down an MIT mainframe, they found a low-priority process that had been waiting to run since 1967!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">💡 The Elegant Solution: Aging</h3>
              <p>To prevent infinite starvation, OSs use <strong>Aging</strong>. As a task sits waiting in the queue, its priority level is gradually bumped up over time. Eventually, it becomes a VIP itself and gets executed!</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderRR = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            5. Round Robin (RR)
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>Imagine a dealer at a poker table. They don't give 5 cards to Player 1 all at once. They give 1 card to everyone in a circle, over and over. Every process gets a small, equal slice of CPU time before sharing!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ Queue Mechanics</h3>
              <p>When a time slice (<strong>Time Quantum</strong>) expires, the running task is paused. <strong>Crucial Rule:</strong> Always add any <em>newly arriving</em> tasks to the ready queue FIRST, and then append the preempted task behind them. Misordering this ruins Gantt charts!</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Round Robin: Deep Dive 🤿
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div className="bg-secondary/10 border border-secondary/30 p-4 rounded-xl">
              <h3 className="font-bold text-lg text-secondary mb-1">⚠️ The Quantum Trap</h3>
              <p>Balancing the Time Quantum (TQ) is delicate.<br/>- <strong>If TQ is too large:</strong> The system behaves exactly like FCFS.<br/>- <strong>If TQ is too small:</strong> The CPU enters a state of hyper-active context switching, wasting massive amounts of computing power on overhead!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🏆 Response Time Dominance</h3>
              <p>Round Robin dominates modern interactive OSs (Windows, macOS) because of its exceptional <strong>Response Time</strong>. By capping CPU access to fractions of a second, every app feels smooth and instantly responsive.</p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderCheatSheet = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Ultimate Cheat Sheet 📝
          </h2>
          <div className="overflow-x-auto pr-4 pb-4 mt-6">
            <table className="w-full text-left border-collapse text-sm font-sans bg-surface">
              <thead>
                <tr className="bg-surface-container border-b-2 border-primary">
                  <th className="p-3 font-bold text-on-surface">Algo</th>
                  <th className="p-3 font-bold text-on-surface">Preemption Trigger</th>
                  <th className="p-3 font-bold text-on-surface">Best Used For...</th>
                  <th className="p-3 font-bold text-on-surface">Primary Flaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">FCFS</td>
                  <td className="p-3 text-on-surface-variant">None (Runs to finish)</td>
                  <td className="p-3 text-on-surface-variant">Batch processing</td>
                  <td className="p-3 text-error">Convoy Effect</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">SJF</td>
                  <td className="p-3 text-on-surface-variant">None (Runs to finish)</td>
                  <td className="p-3 text-on-surface-variant">Long-term job queues</td>
                  <td className="p-3 text-error">Impossible future prediction</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">SRTF</td>
                  <td className="p-3 text-on-surface-variant">New short arrival</td>
                  <td className="p-3 text-on-surface-variant">Max math throughput</td>
                  <td className="p-3 text-error">Context switch overhead</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">Priority</td>
                  <td className="p-3 text-on-surface-variant">Higher priority arrival</td>
                  <td className="p-3 text-on-surface-variant">Real-time embedded</td>
                  <td className="p-3 text-error">Requires an Aging system</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">RR</td>
                  <td className="p-3 text-on-surface-variant">Time Quantum clock</td>
                  <td className="p-3 text-on-surface-variant">Interactive OS</td>
                  <td className="p-3 text-error">High TQ sensitivity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-xl text-[14px]">
            <p className="font-bold text-primary mb-1">🚨 Starvation Alert:</p>
            <p className="text-on-surface-variant">Remember, <strong>SJF, SRTF, and Priority</strong> all suffer from Starvation! Long or low-priority jobs might wait forever. <strong>FCFS and RR</strong> are safe from starvation.</p>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderFinalExamPage = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-8 flex flex-col items-center justify-center h-full flex-1 min-h-[500px]">
          <div className="p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-surface-container-lowest rounded-3xl border border-primary/30 flex flex-col items-center text-center shadow-lg w-full max-w-sm">
            <span className="material-symbols-outlined text-7xl text-primary mb-4 animate-bounce">workspace_premium</span>
            <h3 className="font-sans text-3xl font-black text-on-surface mb-3">The Final Exam</h3>
            <p className="font-sans text-[15px] text-on-surface-variant mb-6">
              You've mastered the theory! Now take the ultimate mixed exam covering all algorithms. Score 80% to earn your verified certificate!
            </p>
            <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-sm">
              Quiz Arena
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-background pt-16 min-h-0">
      
      {/* TOP HEADER */}
      <header className="fixed top-0 right-0 left-64 z-40 flex flex-col px-lg h-20 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl justify-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-on-surface whitespace-nowrap">Learning Notebook</span>
            <span className="text-xs bg-secondary/15 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">CPU Scheduling</span>
          </div>
          <div className="flex items-center gap-sm">
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
        </div>
        {/* Progress Bar */}
        <div className="w-full mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs font-bold text-primary">{progress}% Mastered</span>
        </div>
      </header>

      {/* MAIN NOTEBOOK STAGE */}
      <div className="flex-1 p-lg flex flex-col md:flex-row gap-lg bg-surface-container-low/30 mt-4 overflow-hidden min-h-0 h-full">
        
        {/* LEFT PAGE: 70% width, scrollable content */}
        <div className="w-full md:w-[70%] flex flex-col h-full shrink-0 relative">
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent pr-4 pb-4 perspective-[1500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPageIndex}
                custom={direction}
                initial={(dir) => ({
                  rotateY: dir > 0 ? 90 : -90,
                  opacity: 0,
                })}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                }}
                exit={(dir) => ({
                  rotateY: dir > 0 ? -90 : 90,
                  opacity: 0,
                })}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: 'left center' }}
                className="flex flex-col min-h-0"
              >
                {currentPage.id === 'intro' && renderIntroPage()}
                {currentPage.id === 'FCFS' && renderFCFS()}
                {currentPage.id === 'SJF' && renderSJF()}
                {currentPage.id === 'SRTF' && renderSRTF()}
                {currentPage.id === 'Priority' && renderPriority()}
                {currentPage.id === 'RR' && renderRR()}
                {currentPage.id === 'cheatsheet' && renderCheatSheet()}
                {currentPage.id === 'final' && renderFinalExamPage()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center px-4 shrink-0 bg-background/50 backdrop-blur-md rounded-2xl">
            <button 
              onClick={prevPage} 
              disabled={currentPageIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 border border-outline-variant hover:border-on-surface-variant/30 bg-surface"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Previous Algorithm
            </button>
            <span className="text-sm font-bold text-on-surface-variant tracking-widest uppercase">
              Pg {currentPageIndex + 1} / {notebookPages.length}
            </span>
            <button 
              onClick={nextPage}
              disabled={currentPageIndex === notebookPages.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-30 disabled:hover:shadow-none active:scale-95"
            >
              Next Algorithm
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>

        {/* RIGHT SIDE: Interactive Widgets & Summary */}
        <div className="w-full md:flex-1 flex flex-col gap-lg overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent min-h-0 h-full">
          
          {/* Comparative Summary Table */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 glass-panel shrink-0">
            <h3 className="text-headline-md font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">table_chart</span>
              Summary Table
            </h3>

            <div className="overflow-hidden border border-outline-variant rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="p-3 font-bold text-on-surface-variant">Algo</th>
                    <th className="p-3 font-bold text-on-surface-variant">Preemptive?</th>
                    <th className="p-3 font-bold text-on-surface-variant">Starvation?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className={`transition-colors ${currentPage.algo === 'FCFS' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">FCFS</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'SJF' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">SJF</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'SRTF' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">SRTF</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'Priority' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">Priority</td>
                    <td className="p-3 text-on-surface-variant">Both</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'RR' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">RR</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Try It Yourself Sandbox */}
          {currentPage.algo && (
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 relative glass-panel flex flex-col animate-fade-in shrink-0">
              <h3 className="text-headline-md font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">science</span>
                Try It Yourself!
              </h3>

              {/* Sandbox Visual State */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 h-36 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                {simulationStep === 0 && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Ready Queue Sandbox</span>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-process-p1 text-white rounded flex items-center justify-center font-bold text-xs shadow">P1</div>
                      <div className="w-8 h-8 bg-process-p2 text-white rounded flex items-center justify-center font-bold text-xs shadow">P2</div>
                      <div className="w-8 h-8 bg-process-p3 text-white rounded flex items-center justify-center font-bold text-xs shadow">P3</div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant italic">Execute {currentPage.algo}</span>
                  </div>
                )}

                {simulationStep === 1 && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">Running {selectedAlgo}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-surface-container-high border border-outline-variant text-on-surface-variant rounded flex items-center justify-center font-bold text-xs">P1</div>
                      <span className="material-symbols-outlined text-xl text-primary animate-ping">bolt</span>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg bg-process-p3 executing-glow`}>
                        CPU
                      </div>
                    </div>
                  </div>
                )}

                {simulationStep === 2 && (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Completed via {selectedAlgo}</span>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P3</span>
                      <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P1</span>
                      <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P2</span>
                    </div>
                    <button onClick={resetSimulation} className="text-xs text-primary font-bold underline mt-2 hover:text-primary/80 transition-colors">Reset</button>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => runSimulation(currentPage.algo)} 
                  className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:border-primary py-3 px-4 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                  Simulate {currentPage.algo}
                </button>
              </div>
            </div>
          )}

          {/* Contextual Sticky Note syncing */}
          {currentPage.algo === 'SJF' && (
            <div className="bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-purple-100 p-4 rounded-xl shadow-sm font-handwritten text-sm rotate-[1deg] border border-purple-300 animate-fade-in mt-4 shrink-0">
              <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-purple-800 dark:text-purple-300">Observation</span>
              Notice how SJF forces long tasks to wait? That's starvation in action!
            </div>
          )}
          {currentPage.algo === 'RR' && (
            <div className="bg-sky-200 dark:bg-sky-900/60 text-sky-950 dark:text-sky-100 p-4 rounded-xl shadow-sm font-handwritten text-sm rotate-[-2deg] border border-sky-300 animate-fade-in mt-4 shrink-0">
              <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-sky-800 dark:text-sky-300">Pro Tip</span>
              Time Quantum is usually 10-100ms in modern OS!
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default LearningNotebook;
