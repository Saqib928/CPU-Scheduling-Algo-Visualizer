import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notebookPages = [
  { id: 'intro', title: 'The Ready Queue vs CPU' },
  { id: 'FCFS', title: '1. First Come, First Served (FCFS)' },
  { id: 'SJF', title: '2. Shortest Job First (SJF)' },
  { id: 'SRTF', title: '3. Shortest Remaining Time First (SRTF)' },
  { id: 'Priority', title: '4. Priority Scheduling' },
  { id: 'RR', title: '5. Round Robin (RR)' },
  { id: 'final', title: 'The Final Exam' },
];

const LearningNotebook = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('FCFS');
  const [simulationStep, setSimulationStep] = useState(0); 
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const progress = Math.round(((currentPage + 1) / notebookPages.length) * 100);

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
    if (currentPage < notebookPages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const renderIntroPage = () => (
    <div className="pl-8 pb-12">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        Welcome to OS Scheduling! 🎓
      </h2>
      <p className="font-handwritten text-lg text-on-surface-variant mb-8 leading-loose max-w-xl">
        Class, think of the CPU as a single worker and the <span className="underline decoration-secondary decoration-2 font-bold">Ready Queue</span> as the line of tasks (processes) waiting to be done. Scheduling is simply how the Operating System decides <em>who goes next</em>. 
      </p>
      <div className="flex items-center justify-center gap-8 bg-surface-container-lowest/50 border border-outline-variant rounded-2xl p-8 max-w-xl mb-8 relative">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Ready Queue</span>
          <div className="flex gap-2 p-2 border-2 border-dashed border-outline rounded-lg bg-surface">
            <div className="w-10 h-10 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P1</div>
            <div className="w-10 h-10 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P2</div>
            <div className="w-10 h-10 border border-secondary text-secondary rounded flex items-center justify-center font-bold text-xs">P3</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-outline">
          <span className="material-symbols-outlined text-3xl animate-pulse">arrow_forward</span>
          <span className="text-[9px] font-bold mt-1 uppercase">Dispatch</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">CPU Core</span>
          <div className="w-16 h-16 border-2 border-primary bg-primary/10 text-primary rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg">CPU</div>
        </div>
      </div>
      <p className="font-handwritten text-on-surface-variant max-w-xl mb-8 text-base">
        In exams and interviews, you'll be judged on three key metrics:<br/>
        <strong>1. Turnaround Time:</strong> Total time from arrival to completion.<br/>
        <strong>2. Waiting Time:</strong> Total time spent sitting in the Ready Queue.<br/>
        <strong>3. Throughput:</strong> How many tasks get done per time unit.
      </p>
      <div className="my-8 max-w-md bg-sky-200 text-sky-950 p-4 rounded-lg shadow-sm font-handwritten text-sm rotate-[-1deg] border border-sky-300 transform transition-transform hover:rotate-0">
        <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-sky-800">Professor's Tip</span>
        Always ask yourself: Is the algorithm Preemptive (can it pause a running task?) or Non-Preemptive (does a task run until it finishes?). This is a huge exam trap!
      </div>
    </div>
  );

  const renderFCFSPage = () => (
    <div className="pl-8 pb-12 font-handwritten">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        1. First Come, First Served (FCFS)
      </h2>
      <div className="space-y-6 text-on-surface-variant text-lg pr-4">
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🤔 The Basics</h3>
          <p>FCFS is the simplest scheduling algorithm. Processes are executed exactly in the order they arrive. It uses a strict FIFO (First-In-First-Out) queue.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">⚙️ Key Characteristics</h3>
          <p>It is strictly <strong>Non-Preemptive</strong>. Once a process gets the CPU, it holds onto it until it finishes its task. No interruptions allowed!</p>
        </div>
        <div className="bg-error/10 border border-error/30 p-4 rounded-xl">
          <h3 className="font-bold text-xl text-error mb-2">⚠️ Exam Favorite: The "Convoy Effect"</h3>
          <p>This is a major flaw! If a huge, heavy process arrives first, all the quick little processes behind it get stuck waiting forever. It's like one slow truck blocking traffic on a single-lane highway. This drastically hurts Average Waiting Time.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🎯 Interview Question: When to use it?</h3>
          <p>Would you use FCFS for an interactive desktop OS? <strong>No!</strong> Your mouse clicks would lag if a big download started. It's only good for simple batch processing systems where user experience doesn't matter.</p>
        </div>
      </div>
    </div>
  );

  const renderSJFPage = () => (
    <div className="pl-8 pb-12 font-handwritten">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        2. Shortest Job First (SJF)
      </h2>
      <div className="space-y-6 text-on-surface-variant text-lg pr-4">
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🤔 The Basics</h3>
          <p>SJF fixes the Convoy Effect. It scans the ready queue and always picks the process with the smallest execution time (burst time).</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🏆 Mathematical Perfection</h3>
          <p>SJF is mathematically proven to give the <strong>minimum average waiting time</strong> for any given set of processes. Standard SJF is <strong>Non-Preemptive</strong>.</p>
        </div>
        <div className="bg-tertiary/10 border border-tertiary/30 p-4 rounded-xl">
          <h3 className="font-bold text-xl text-tertiary mb-2">⚠️ Exam Trap: "Starvation"</h3>
          <p>What happens to a long 100-minute task if 1-minute tasks keep arriving continuously? The long task NEVER gets to run! This infinite waiting scenario is called <strong>Starvation</strong>.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🎯 Interview Question: Is it practical?</h3>
          <p>Can a real OS use SJF? <strong>No!</strong> The OS cannot predict exactly how long a future process will take. It's mostly a theoretical benchmark to compare other algorithms against.</p>
        </div>
      </div>
    </div>
  );

  const renderSRTFPage = () => (
    <div className="pl-8 pb-12 font-handwritten">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        3. Shortest Remaining Time First (SRTF)
      </h2>
      <div className="space-y-6 text-on-surface-variant text-lg pr-4">
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🤔 The Basics</h3>
          <p>SRTF is the <strong>Preemptive</strong> version of SJF. If a new process arrives that has a shorter burst time than what is <em>currently remaining</em> for the running process, the OS pauses the current one and switches!</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">⚙️ How it works</h3>
          <p>Imagine a doctor in a 1-hour surgery. Suddenly, a patient with a 2-minute emergency arrives. The doctor pauses the surgery (preemption), saves the state, handles the 2-minute emergency, and resumes the surgery.</p>
        </div>
        <div className="bg-surface-container border border-outline-variant p-4 rounded-xl">
          <h3 className="font-bold text-xl text-on-surface mb-2">⚠️ The Cost of Preemption</h3>
          <p>While SRTF provides incredible responsiveness for short tasks, it has a hidden cost: <strong>Context Switching</strong>. Constantly pausing, saving state, and loading a new process wastes valuable CPU cycles.</p>
        </div>
      </div>
    </div>
  );

  const renderPriorityPage = () => (
    <div className="pl-8 pb-12 font-handwritten">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        4. Priority Scheduling
      </h2>
      <div className="space-y-6 text-on-surface-variant text-lg pr-4">
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🤔 The Basics</h3>
          <p>Every process gets a VIP status (a priority number). The CPU always picks the highest priority process. It can be designed as preemptive or non-preemptive.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🌍 Real-World Use</h3>
          <p>In modern OS like Linux or Windows, critical system tasks (like drawing your screen) have high priority, while background tasks (like downloading an update) have low priority.</p>
        </div>
        <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl">
          <h3 className="font-bold text-xl text-primary mb-2">⚠️ The Solution to Starvation: "Aging"</h3>
          <p>Just like SJF, low priority processes can starve forever if VIPs keep arriving. The classic interview answer to fix this is <strong>Aging</strong>: As a low-priority process waits, the OS slowly increases its priority over time until it becomes a VIP!</p>
        </div>
      </div>
    </div>
  );

  const renderRRPage = () => (
    <div className="pl-8 pb-12 font-handwritten">
      <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
        5. Round Robin (RR)
      </h2>
      <div className="space-y-6 text-on-surface-variant text-lg pr-4">
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">🤔 The Basics</h3>
          <p>The ultimate fair algorithm! It gives every process a strict time limit called a <strong>Time Quantum</strong>. It is purely <strong>Preemptive</strong>.</p>
        </div>
        <div>
          <h3 className="font-bold text-xl text-on-surface mb-2">⚙️ How it works</h3>
          <p>Like a debate where everyone gets exactly 2 minutes at the microphone. If they aren't done, the mic cuts off, and they go to the back of the line to wait for another round. <strong>No one starves!</strong></p>
        </div>
        <div className="bg-secondary/10 border border-secondary/30 p-4 rounded-xl">
          <h3 className="font-bold text-xl text-secondary mb-2">🎯 Exam Trap: Choosing the Quantum</h3>
          <p>The performance of RR entirely depends on the Time Quantum.<br/>- <strong>Too large:</strong> It just turns into FCFS (poor response time).<br/>- <strong>Too small:</strong> The CPU spends more time Context-Switching than actually doing work!</p>
        </div>
      </div>
    </div>
  );

  const renderFinalExamPage = () => (
    <div className="pl-8 pb-12 flex flex-col items-center justify-center h-full pr-4 min-h-[400px]">
      <div className="mt-6 p-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-surface-container-lowest rounded-3xl border border-primary/30 flex flex-col items-center text-center shadow-lg relative overflow-hidden w-full max-w-2xl">
        <span className="material-symbols-outlined text-8xl text-primary mb-6 animate-bounce">workspace_premium</span>
        <h3 className="font-sans text-4xl font-black text-on-surface mb-4">The Final Exam</h3>
        <p className="font-sans text-lg text-on-surface-variant mb-8 max-w-md">
          You've mastered the theory! Now take the ultimate 50-question mixed exam covering all algorithms. Score 80% or higher to earn your verified certificate and view your performance analysis!
        </p>
        <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-lg">
          Take Me to Quiz Arena
        </button>
      </div>
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
      <div className="flex-1 p-lg grid grid-cols-12 gap-lg bg-surface-container-low/30 mt-4 overflow-hidden min-h-0 h-full">
        
        {/* LEFT PAGE: The Notebook Paper */}
        <div className="col-span-8 bg-surface border border-outline-variant rounded-2xl p-lg notebook-paper relative flex flex-col shadow-sm min-h-0 h-full">
          
          {/* Notebook Spiral Ring effect on the left margin */}
          <div className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-30 pointer-events-none z-10" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2 border-outline bg-surface-variant shadow-inner"></div>
            ))}
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden pr-4 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent min-h-0 perspective-[1500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
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
                className="flex-1 flex flex-col min-h-0"
              >
                {currentPage === 0 && renderIntroPage()}
                {currentPage === 1 && renderFCFSPage()}
                {currentPage === 2 && renderSJFPage()}
                {currentPage === 3 && renderSRTFPage()}
                {currentPage === 4 && renderPriorityPage()}
                {currentPage === 5 && renderRRPage()}
                {currentPage === 6 && renderFinalExamPage()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center px-8 shrink-0">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-30 border border-outline-variant hover:border-on-surface-variant/30 bg-surface"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Previous
            </button>
            <span className="text-sm font-bold text-on-surface-variant tracking-widest uppercase">
              Page {currentPage + 1} of {notebookPages.length}
            </span>
            <button 
              onClick={nextPage}
              disabled={currentPage === notebookPages.length - 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-30 disabled:hover:shadow-none active:scale-95"
            >
              Next Page
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>

        {/* RIGHT SIDE: Interactive Widgets & Summary */}
        <div className="col-span-4 flex flex-col gap-lg overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent min-h-0 h-full">
          
          {/* Comparative Summary Table (Always visible for reference) */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-md glass-panel shrink-0">
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
                  <tr className={`transition-colors ${currentPage === 1 ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">FCFS</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage === 2 ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">SJF</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage === 3 ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">SRTF</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage === 4 ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">Priority</td>
                    <td className="p-3 text-on-surface-variant">Both</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage === 5 ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="p-3 text-on-surface">RR</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Try It Yourself Sandbox */}
          {currentPage >= 1 && currentPage <= 5 && (
            <div className="bg-surface border border-outline-variant rounded-2xl p-md relative glass-panel flex flex-col animate-fade-in shrink-0">
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
                    <span className="text-[10px] text-on-surface-variant italic">Execute {notebookPages[currentPage].id}</span>
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
                  onClick={() => runSimulation(notebookPages[currentPage].id)} 
                  className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary hover:border-primary py-3 px-4 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                  Simulate {notebookPages[currentPage].id}
                </button>
              </div>
            </div>
          )}

          {/* Contextual Sticky Note */}
          {currentPage === 2 && (
            <div className="bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-purple-100 p-4 rounded-xl shadow-sm font-handwritten text-sm rotate-[1deg] border border-purple-300 animate-fade-in mt-4 shrink-0">
              <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-purple-800 dark:text-purple-300">Observation</span>
              Notice how SJF forces long tasks to wait? That's starvation in action!
            </div>
          )}
          {currentPage === 5 && (
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


