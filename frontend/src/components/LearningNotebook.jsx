import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notebookPages = [
  { id: 'intro', algo: null },
  { id: 'FCFS', algo: 'FCFS' },
  { id: 'SJF', algo: 'SJF' },
  { id: 'SRTF', algo: 'SRTF' },
  { id: 'Priority', algo: 'Priority' },
  { id: 'RR', algo: 'RR' },
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
            1. First Come, First Served
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>FCFS is the absolute simplest scheduling algorithm. Processes are executed strictly in the exact order they arrive. It uses a standard FIFO (First-In-First-Out) queue data structure.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ Key Characteristics</h3>
              <p>It is entirely <strong>Non-Preemptive</strong>. Once a process gets the CPU, it holds onto it until it finishes its task. No interruptions allowed!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-Life Analogy</h3>
              <p>Imagine a grocery store checkout line. If you are first in line, you get checked out first. It doesn't matter if you have a full shopping cart and the person behind you has a single pack of gum—they must wait for you to finish.</p>
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
              <h3 className="font-bold text-lg text-error mb-1">⚠️ Exam Favorite: The "Convoy Effect"</h3>
              <p>This is FCFS's biggest flaw! If a huge, heavy process arrives first (the "convoy leader"), all the quick little processes behind it get stuck waiting forever. It's like a slow truck blocking a single-lane highway. This drastically inflates Average Waiting Time.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">📉 Performance Analysis</h3>
              <p>Because of the Convoy Effect, FCFS can result in extremely poor resource utilization. While the CPU is busy with a long CPU-bound process, I/O devices sit completely idle.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Interview Question</h3>
              <p className="font-bold">Q: Would you use FCFS for an interactive desktop OS?</p>
              <p><strong>A: Absolutely not!</strong> Users expect immediate feedback. If a large background download started and locked the CPU via FCFS, your mouse cursor would freeze completely until the download finished.</p>
            </div>
          </div>
        </div>
      </Paper>
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            FCFS: Practice Example 📝
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">📊 Example Scenario</h3>
              <p>Consider 3 processes arriving at time 0: P1 (Burst: 24), P2 (Burst: 3), P3 (Burst: 3). If they arrive in order P1, P2, P3:</p>
            </div>
            <div className="bg-surface-container-low border border-outline p-4 rounded-xl font-mono text-sm">
              <p>P1 Waits: 0</p>
              <p>P2 Waits: 24 (after P1)</p>
              <p>P3 Waits: 27 (after P1+P2)</p>
              <p className="font-bold mt-2 text-primary">Avg Wait Time: (0+24+27)/3 = 17</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🔄 The Better Order</h3>
              <p>If they arrived P2, P3, P1 instead, the wait times would be 0, 3, 6! Avg Wait = 3. This proves how sensitive FCFS is to arrival order!</p>
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
              <p>SJF was designed specifically to fix the Convoy Effect. When the CPU becomes free, it scans the ready queue and always picks the process with the smallest execution time (burst time).</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🏆 Mathematical Perfection</h3>
              <p>SJF is mathematically proven to give the <strong>minimum average waiting time</strong> for any given set of processes. Standard SJF is <strong>Non-Preemptive</strong>.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-Life Analogy</h3>
              <p>The "10 items or less" express lane at a supermarket. People with fewer items get through quickly, keeping the entire line moving fast and reducing the average wait time for everyone.</p>
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
              <h3 className="font-bold text-lg text-tertiary mb-1">⚠️ Exam Trap: "Starvation"</h3>
              <p>What happens to a massive 100-minute task if a constant stream of 1-minute tasks keep arriving? The long task NEVER gets to run! This infinite waiting scenario is a critical flaw called <strong>Starvation</strong>.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Interview Question: Is it practical?</h3>
              <p className="font-bold">Q: Can a real Operating System use SJF?</p>
              <p><strong>A: No!</strong> The OS cannot predict exactly how long a future process will take (the Halting Problem). SJF is mostly a theoretical benchmark used to compare other algorithms against. OS designers can only <em>estimate</em> burst times using exponential averaging of past behavior.</p>
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
            3. SRTF Scheduling
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 The Basics</h3>
              <p>Shortest Remaining Time First (SRTF) is the <strong>Preemptive</strong> superhero version of SJF. Instead of waiting for a process to finish, the CPU actively interrupts!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ How it works</h3>
              <p>If a new process arrives that has a shorter burst time than what is <em>currently remaining</em> for the running process, the OS pauses the current one and switches instantly.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-Life Analogy</h3>
              <p>Imagine a doctor in a 1-hour surgery. Suddenly, a patient with a 2-minute emergency arrives. The doctor pauses the surgery (preemption), saves the state, handles the 2-minute emergency, and resumes the surgery.</p>
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
              <h3 className="font-bold text-lg text-on-surface mb-1">⚠️ The Cost of Preemption</h3>
              <p>While SRTF provides incredible responsiveness for newly arriving short tasks, it has a hidden cost: <strong>Context Switching</strong>. Constantly pausing, saving state into the PCB (Process Control Block), and loading a new process wastes valuable CPU cycles.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">📉 Performance Analysis</h3>
              <p><strong>Pros:</strong> Optimal average waiting time for preemptive systems.<br/><strong>Cons:</strong> High overhead due to context switches. Also, just like SJF, it suffers heavily from <strong>Starvation</strong> for longer processes.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Interview Tip</h3>
              <p>If asked to compare SJF and SRTF, explicitly state that SRTF is just SJF with preemption. Mention the context switch overhead as the trade-off for better responsiveness.</p>
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
              <p>Every process is assigned a priority integer. The CPU always picks the process with the highest priority (usually denoted by the lowest number, e.g., Priority 1 is better than Priority 5).</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ Key Characteristics</h3>
              <p>It can be both Preemptive or Non-Preemptive. Important system processes get high priority, while background user processes get low priority.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-Life Analogy</h3>
              <p>Boarding an airplane. First Class (Priority 1) boards first, then Business (Priority 2), then Economy (Priority 3). Economy only boards if no higher priorities are waiting.</p>
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
              <h3 className="font-bold text-lg text-primary mb-1">⚠️ The Solution to Starvation: "Aging"</h3>
              <p>Just like SJF, low priority processes can starve forever if VIPs keep arriving. The classic interview answer to fix this is <strong>Aging</strong>: As a low-priority process waits, the OS slowly increases its priority over time until it becomes a VIP and executes!</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🎯 Real-World Implementation</h3>
              <p>In modern operating systems like Windows and Linux, Priority Scheduling is the foundational layer. A user clicking a mouse triggers an interrupt which spawns a maximum-priority task, instantly preempting background video renders.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🤔 Priority Inversion</h3>
              <p>An advanced interview topic! If a low priority task holds a lock that a high priority task needs, the high priority task gets stuck. Fixed via "Priority Inheritance".</p>
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
              <p>The ultimate fair algorithm! It gives every process a strict time limit called a <strong>Time Quantum</strong>. It is purely <strong>Preemptive</strong>.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">⚙️ How it works</h3>
              <p>The CPU gives a process a small slice of time (e.g. 10ms). If it doesn't finish, the timer goes off, the process is paused, and it gets sent to the back of the Ready Queue for its next round.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-Life Analogy</h3>
              <p>A debate where every speaker gets exactly 2 minutes at the podium. If they aren't done, the mic cuts off, and they go to the back of the line. <strong>No one starves!</strong></p>
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
              <h3 className="font-bold text-lg text-secondary mb-1">🎯 Exam Trap: Choosing the Quantum</h3>
              <p>The performance of RR entirely depends on the Time Quantum (q).<br/>- <strong>If q is too large:</strong> It just degrades into FCFS (poor response time).<br/>- <strong>If q is too small:</strong> The CPU spends more time Context-Switching than actually doing work! (High overhead).</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">🌍 Real-World Use</h3>
              <p>RR is the foundation of <strong>Time-Sharing</strong> systems (like macOS, Windows, Android). It guarantees that your browser, Spotify, and IDE all feel like they are running simultaneously by rapidly switching between them every 10-100ms.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface mb-1">📉 Performance</h3>
              <p>Higher average turnaround time than SJF, but excellent <strong>Response Time</strong>, making it the industry standard for interactive UI-based operating systems.</p>
            </div>
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
