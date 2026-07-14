import React, { useState, useEffect, useRef } from 'react';
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

const LearningNotebook = ({ isDarkMode, setIsDarkMode, onNavigate }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('FCFS');
  const [simulationStep, setSimulationStep] = useState(0); 
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const progress = Math.round(((currentPageIndex + 1) / notebookPages.length) * 100);

  const scrollRef = useRef(null);

  // Initial load from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageId = params.get('page');
    if (pageId) {
      const index = notebookPages.findIndex(p => p.id === pageId);
      if (index !== -1) {
        setCurrentPageIndex(index);
      }
    }
  }, []);

  // Update URL on page change & fix scroll
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', notebookPages[currentPageIndex].id);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);

    // Give animation a moment to start, then scroll up
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }, 100);
  }, [currentPageIndex]);
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

  // --- CONTENT PAGES ---
  const renderIntroPage = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: OS Fundamentals */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>CPU Scheduling Fundamentals</span>
          </div>
          <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-4 rotate-[-1deg]">
            CPU Scheduling Core Concepts 🎓
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed">
              At the heart of any modern Operating System lies the concept of <strong>Multiprogramming</strong>. 
              The fundamental goal is to maximize CPU utilization by keeping multiple processes in memory simultaneously. 
              When one process must wait (e.g., for disk I/O, network responses, or human input), the OS forcibly takes the CPU away and hands it to another ready process.
            </p>
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">The Process State Lifecycle</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>New:</strong> The process is being created (PCB is being allocated).</li>
                <li><strong>Ready:</strong> The process has all required resources and is simply waiting in the Ready Queue for the CPU.</li>
                <li><strong>Running:</strong> Instructions are actively executing on the processor.</li>
                <li><strong>Waiting (Blocked):</strong> The process cannot continue until an event occurs (I/O completion).</li>
                <li><strong>Terminated:</strong> The process has finished execution and OS reclaims its memory.</li>
              </ul>
              <div className="mt-2 text-xs text-on-surface-variant italic">
                * Note: The short-term scheduler specifically moves a process from <strong>Ready ➔ Running</strong>.
              </div>
            </div>
            
            <div className="bg-amber-100/50 dark:bg-amber-950/20 text-on-surface p-4 rounded-xl shadow-sm text-[14px] border border-amber-300/40 font-sans mt-4">
              <span className="font-bold uppercase tracking-wider block mb-2 text-[12px] text-amber-700 dark:text-amber-400">
                💡 The CPU-I/O Burst Cycle
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                Process execution consists of an alternating cycle of CPU execution (CPU burst) and I/O waits (I/O burst). Execution begins with a CPU burst, followed by an I/O burst, and so on, terminating with a final CPU burst.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface/60 p-3 rounded border border-amber-200 dark:border-amber-900">
                  <strong className="text-amber-800 dark:text-amber-300 block mb-1">CPU-bound Process:</strong>
                  <span className="text-[11px]">Generates I/O requests infrequently. Most of its time is spent doing intense computations (e.g., matrix multiplication, video rendering, cryptographic hashing). Burst times are very long.</span>
                </div>
                <div className="bg-surface/60 p-3 rounded border border-amber-200 dark:border-amber-900">
                  <strong className="text-amber-800 dark:text-amber-300 block mb-1">I/O-bound Process:</strong>
                  <span className="text-[11px]">Spends the vast majority of its life waiting for I/O operations (e.g., text editors, web browsers). CPU bursts are extremely short but frequent.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: The Schedulers */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>The Three Scheduler Tiers</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            The Scheduler Hierarchy 🎛️
          </h2>
          <div className="space-y-5 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed">
              A sophisticated OS does not rely on a single scheduler. Instead, it utilizes three distinct schedulers, operating at different time scales and controlling different resources.
            </p>
            
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden font-sans">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant text-primary">
                    <th className="p-3 w-[20%]">Scheduler Type</th>
                    <th className="p-3 w-[30%]">Primary Function</th>
                    <th className="p-3 w-[25%]">Execution Frequency</th>
                    <th className="p-3 w-[25%]">Key Objective</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-bold">Long-Term (Job)</td>
                    <td className="p-3 text-xs">Moves jobs from disk pool to memory.</td>
                    <td className="p-3 text-xs">Infrequent (Minutes/Seconds).</td>
                    <td className="p-3 text-xs">Controls the <strong>Degree of Multiprogramming</strong> and ensures a good mix of I/O & CPU bound tasks.</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-bold">Medium-Term (Swapper)</td>
                    <td className="p-3 text-xs">Moves processes out of RAM to virtual memory on disk (Swapping Out).</td>
                    <td className="p-3 text-xs">Medium (When RAM is full).</td>
                    <td className="p-3 text-xs">Frees up physical memory; resolves thrashing and overcommitment.</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-bold">Short-Term (CPU)</td>
                    <td className="p-3 text-xs">Selects the next ready process to execute on the CPU core.</td>
                    <td className="p-3 text-xs">Extremely frequent (Milliseconds).</td>
                    <td className="p-3 text-xs">Minimizes latency and maximizes CPU utilization. Must be highly optimized.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-4 text-sm font-sans space-y-2">
              <h4 className="font-bold text-primary">The Danger of Imbalance</h4>
              <p>If the Long-Term Scheduler selects exclusively I/O-bound processes, the Ready Queue will almost always be empty, leaving the CPU idle. If it selects exclusively CPU-bound processes, the I/O waiting queues will be empty, leaving disk controllers idle. Optimal system performance demands a careful mix of both.</p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Dispatcher & Context Switching */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>The Dispatcher & Context Switching</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            The Dispatcher Engine 🔄
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed">
              While the short-term scheduler acts as the "brain" deciding <em>who</em> goes next, the <strong>Dispatcher</strong> acts as the "hands" that physically places the process onto the CPU. 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-sans">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="font-bold text-primary mb-2 border-b border-outline-variant/30 pb-2">Dispatcher Responsibilities</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-on-surface-variant">
                  <li><strong>Context Switching:</strong> Saving the precise state of the old process and loading the saved state of the newly scheduled one.</li>
                  <li><strong>Mode Switching:</strong> Transitioning the processor from Kernel Mode (where the OS scheduling logic ran) back down to User Mode.</li>
                  <li><strong>PC Jump:</strong> Setting the Program Counter (PC) to the exact instruction address where the user program previously left off.</li>
                </ol>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="font-bold text-primary mb-2 border-b border-outline-variant/30 pb-2">What is Saved in a PCB?</h3>
                <p className="text-xs mb-2">The Process Control Block (PCB) is the data structure holding the context:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-on-surface-variant">
                  <li>CPU Registers (General purpose, Accumulators)</li>
                  <li>Program Counter (Next instruction)</li>
                  <li>Memory Management info (Page tables, base/limit registers)</li>
                  <li>CPU Scheduling info (Priority, pointers)</li>
                  <li>I/O Status (Open files, allocated devices)</li>
                </ul>
              </div>
            </div>

            <div className="bg-sky-100/50 dark:bg-sky-950/20 p-4 rounded-xl border border-sky-300/40 font-sans">
              <strong className="text-sky-800 dark:text-sky-400 block mb-1 text-sm">⏱️ The Cost: Dispatch Latency</strong>
              <p className="text-xs leading-relaxed">
                The time it takes for the dispatcher to stop one process and start another is called <em>Dispatch Latency</em>. Because this latency adds zero productive value to user applications (the CPU is doing OS overhead work, not user work), it must be minimized. Modern CPUs utilize multiple hardware register sets to perform context switches in nanoseconds.
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Optimization Criteria */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Scheduling Optimization Criteria</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Optimization Metrics 🎯
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-4">
              How do we objectively measure if a scheduling algorithm is "good"? We use standardized numerical criteria. In exams, you are frequently asked to calculate the averages of these metrics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-sm">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-on-surface flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-sm">speed</span>
                  Maximize These:
                </h4>
                <ul className="space-y-3 text-xs">
                  <li>
                    <strong className="block text-primary">1. CPU Utilization</strong>
                    The percentage of time the CPU is actively computing rather than sitting idle. (Target: 40% light load to 90% heavy load).
                  </li>
                  <li>
                    <strong className="block text-primary">2. Throughput</strong>
                    The total number of processes completely executed per unit of time (e.g., 15 jobs per second).
                  </li>
                </ul>
              </div>

              <div className="bg-surface p-4 rounded-xl border border-outline-variant">
                <h4 className="font-bold text-on-surface flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-error text-sm">trending_down</span>
                  Minimize These:
                </h4>
                <ul className="space-y-3 text-xs">
                  <li>
                    <strong className="block text-primary">3. Turnaround Time (TAT)</strong>
                    Total time spent in the system. <br/><code>TAT = Completion Time - Arrival Time</code>
                  </li>
                  <li>
                    <strong className="block text-primary">4. Waiting Time (WT)</strong>
                    Total time spent sitting in the ready queue. <br/><code>WT = TAT - Burst Time</code>
                  </li>
                  <li>
                    <strong className="block text-primary">5. Response Time (RT)</strong>
                    Time from submission until the <em>very first</em> CPU allocation. Critical for interactive UI systems!
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30 mt-4 font-sans text-sm">
              <strong className="block text-primary mb-1">⚖️ The Fairness Tradeoff</strong>
              <p className="text-xs">
                A system can optimize for extreme throughput by always picking the absolute shortest task (SJF), but this sacrifices <strong>fairness</strong>. 
                Large processes may suffer from <em>Starvation</em> (waiting forever). True OS design balances theoretical efficiency with practical fairness to guarantee progress for all tasks.
              </p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderFCFS = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: Theoretical Overview */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>First-Come, First-Served</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            First-Come, First-Served (FCFS) 🏁
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-3">
              FCFS is the absolute simplest CPU scheduling algorithm. Processes are assigned to the CPU in the exact chronological order they request it. 
              Under the hood, it is implemented with a strictly <strong>FIFO (First-In, First-Out) Queue</strong>.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">Algorithm Characteristics</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Queue Structure:</strong>
                  <span>When a process enters the system, its PCB is linked to the tail of the FIFO queue. The CPU retrieves the next PCB strictly from the head.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Decision Mode:</strong>
                  <span><strong>Non-Preemptive.</strong> Once the CPU has been allocated to a process, it keeps the CPU until it voluntarily releases it by terminating or requesting I/O.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Selection Rule:</strong>
                  <span>Select $P_i$ where Arrival Time ($AT$) is minimum.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Tie-breaker Rule:</strong>
                  <span>If two processes arrive at the exact same millisecond, the scheduler defaults to the lower Process ID (PID) as the tie-breaker.</span>
                </div>
              </div>
            </div>

            <div className="bg-green-100/50 dark:bg-green-950/20 text-on-surface p-4 rounded-xl shadow-sm text-xs border border-green-300/40 font-sans mt-4">
              <strong className="text-green-800 dark:text-green-400 block mb-1">✅ Primary Advantages</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Trivially simple to understand and code (just a linked list).</li>
                <li>Zero starvation risk (every process in the queue will eventually run).</li>
                <li>Extremely low overhead (no sorting of queues or recalculating priorities).</li>
              </ul>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: The Convoy Effect */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>FCFS: Convoy Effect Analysis</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            The Convoy Effect Analysis 🚛
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed">
              The primary and fatal flaw of FCFS is known as the <strong>Convoy Effect</strong>. 
              Because it is non-preemptive, if a massive CPU-bound process grabs the CPU first, all subsequent short processes get stuck waiting behind it, like a line of fast sports cars stuck behind a slow, heavy truck on a one-lane mountain road.
            </p>
            
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900 p-4 rounded-xl text-xs font-sans space-y-3">
              <span className="font-bold text-red-700 dark:text-red-400 uppercase tracking-widest block border-b border-red-200 dark:border-red-800 pb-2">Mathematical Demonstration</span>
              <p>Consider three processes arriving at $t=0$: $P_1(BT=24)$, $P_2(BT=3)$, $P_3(BT=3)$.</p>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-surface p-3 border border-outline-variant rounded">
                  <strong className="block text-primary mb-1">Scenario A: P1 ➔ P2 ➔ P3</strong>
                  <div className="font-mono text-[10px] space-y-1 mb-2">
                    <div>P1 Wait: 0ms</div>
                    <div>P2 Wait: 24ms</div>
                    <div>P3 Wait: 27ms</div>
                  </div>
                  <div className="font-bold border-t border-outline-variant/50 pt-1">Avg WT = (0+24+27)/3 = 17.0ms</div>
                </div>
                
                <div className="bg-surface p-3 border border-outline-variant rounded">
                  <strong className="block text-green-600 mb-1">Scenario B: P2 ➔ P3 ➔ P1</strong>
                  <div className="font-mono text-[10px] space-y-1 mb-2">
                    <div>P2 Wait: 0ms</div>
                    <div>P3 Wait: 3ms</div>
                    <div>P1 Wait: 6ms</div>
                  </div>
                  <div className="font-bold border-t border-outline-variant/50 pt-1 text-green-600">Avg WT = (0+3+6)/3 = 3.0ms</div>
                </div>
              </div>
              <p className="mt-2 text-on-surface-variant text-[11px] italic">
                Conclusion: Just changing the arrival order by a millisecond caused a <strong>566% increase</strong> in average waiting time! FCFS is highly unpredictable and heavily punished by variance in burst times.
              </p>
            </div>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans text-sm mt-4">
              <strong className="text-primary block mb-1">System Resource Waste</strong>
              <p className="text-xs">During a convoy, the I/O-bound processes finish their quick CPU bursts, go do I/O, and return quickly to the Ready Queue. Then they all pile up waiting for the CPU-bound process. While they wait in the Ready Queue, the system's disk controllers and network cards sit completely idle (0% I/O utilization). This dual starvation of hardware resources is why modern OS avoid FCFS for interactive tasks.</p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Walkthrough Trace */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>FCFS: Complete Trace Exercise</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Full Numerical Walkthrough 📝
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed font-sans text-sm">
              Let's solve a complete scheduling table. You must be able to generate the Gantt chart and calculate CT, TAT, and WT. <br/>
              <em>Formulas: $CT$ (observed from Gantt), $TAT = CT - AT$, $WT = TAT - BT$.</em>
            </p>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-4 overflow-x-auto font-sans text-sm shadow-sm">
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b-2 border-primary text-primary">
                    <th className="py-2">Process</th>
                    <th className="py-2">AT</th>
                    <th className="py-2">BT</th>
                    <th className="py-2">Completion (CT)</th>
                    <th className="py-2">Turnaround (TAT)</th>
                    <th className="py-2">Waiting (WT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-xs">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P1</td>
                    <td>0</td>
                    <td>4</td>
                    <td className="font-mono text-primary font-bold">4</td>
                    <td className="font-mono">4 - 0 = 4</td>
                    <td className="font-mono text-error">4 - 4 = 0</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P2</td>
                    <td>1</td>
                    <td>3</td>
                    <td className="font-mono text-primary font-bold">7</td>
                    <td className="font-mono">7 - 1 = 6</td>
                    <td className="font-mono text-error">6 - 3 = 3</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P3</td>
                    <td>2</td>
                    <td>1</td>
                    <td className="font-mono text-primary font-bold">8</td>
                    <td className="font-mono">8 - 2 = 6</td>
                    <td className="font-mono text-error">6 - 1 = 5</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P4</td>
                    <td>3</td>
                    <td>2</td>
                    <td className="font-mono text-primary font-bold">10</td>
                    <td className="font-mono">10 - 3 = 7</td>
                    <td className="font-mono text-error">7 - 2 = 5</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant">
                <strong className="block text-primary mb-2 text-xs uppercase tracking-widest">Gantt Chart Generation</strong>
                <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[10px] items-center text-center">
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '40%'}}>P1 [0-4]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '30%'}}>P2 [4-7]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-purple-500/10 text-purple-700 font-bold" style={{width: '10%'}}>P3 [7-8]</div>
                  <div className="h-full flex items-center justify-center bg-orange-500/10 text-orange-700 font-bold" style={{width: '20%'}}>P4 [8-10]</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-xs text-center">
                <div className="bg-surface p-2 rounded border border-outline-variant">
                  <strong className="block text-on-surface mb-1">Average TAT</strong>
                  <span className="text-primary text-sm">(4+6+6+7)/4 = 5.75 ms</span>
                </div>
                <div className="bg-surface p-2 rounded border border-outline-variant">
                  <strong className="block text-on-surface mb-1">Average WT</strong>
                  <span className="text-error text-sm">(0+3+5+5)/4 = 3.25 ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Idle Times & Exam Traps */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>FCFS: Handling Idle CPU</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Handling CPU Idle Gaps 🕳️
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans">
            <p className="text-sm leading-relaxed mb-4">
              A very common exam trap is a scenario where the CPU completely finishes all tasks in the Ready Queue, but the next process has not arrived yet. In this case, the CPU must sit <strong>IDLE</strong>. You cannot magically jump time forward without recording the idle gap on the Gantt chart.
            </p>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant space-y-4 shadow-sm">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">Idle Time Scenario</h3>
              <ul className="text-sm space-y-1">
                <li>$P_1$ arrives at $AT=0$, $BT=2$</li>
                <li>$P_2$ arrives at $AT=5$, $BT=3$</li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded border border-amber-200 dark:border-amber-800 text-xs">
                <strong>Execution Trace:</strong>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>At $t=0$: $P_1$ is available. It runs from 0 to 2.</li>
                  <li>At $t=2$: $P_1$ terminates. The Ready Queue is empty. $P_2$ hasn't arrived.</li>
                  <li><strong className="text-amber-700 dark:text-amber-400">At $t=2$ to $t=5$: CPU sits IDLE for 3ms.</strong></li>
                  <li>At $t=5$: $P_2$ arrives. It runs from 5 to 8.</li>
                </ol>
              </div>

              <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[10px] items-center text-center mt-4">
                <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '25%'}}>P1 [0-2]</div>
                <div className="h-full border-r border-outline-variant flex items-center justify-center bg-gray-500/20 text-gray-700 font-bold tracking-widest" style={{width: '37.5%'}}>IDLE [2-5]</div>
                <div className="h-full flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '37.5%'}}>P2 [5-8]</div>
              </div>
            </div>

            <div className="bg-primary/10 p-4 rounded-xl border border-primary/30 mt-4 text-sm">
              <strong className="block text-primary mb-1">⚠️ Warning: Calculating Turnaround</strong>
              <p className="text-xs">
                When there is an idle gap, you must be extremely careful. The Turnaround Time (TAT) for $P_2$ is still $CT - AT = 8 - 5 = 3$. Students often blindly look at the Gantt chart start block and write $TAT = 8 - 0 = 8$, completely ignoring that $P_2$ wasn't even in the system during the idle time!
              </p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderSJF = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: Theoretical Overview & Optimality */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Shortest Job First</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Shortest Job First (SJF) 📏
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-2">
              SJF (also known as Shortest Process Next - SPN) is a scheduling algorithm that explicitly aims to minimize the average waiting time. It does this by evaluating all available processes in the Ready Queue and allocating the CPU to the process with the <strong>smallest CPU burst time</strong>.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">Algorithm Characteristics</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Queue Structure:</strong>
                  <span>The Ready Queue is structured as a Minimum Priority Queue, where the sort key is the CPU Burst Time ($BT$).</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Decision Mode:</strong>
                  <span><strong>Non-Preemptive.</strong> (The preemptive version is taught separately as SRTF). Once a process starts its burst, it cannot be interrupted, even if a new process with a burst of 1 millisecond arrives.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Selection Rule:</strong>
                  <span>Select $P_i$ where $BT$ is minimum among all <em>currently arrived</em> processes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px] text-on-surface">Tie-breaker Rule:</strong>
                  <span>If two processes have identical burst times, fall back to FCFS logic (choose the one with the earliest Arrival Time). If AT is also identical, choose lower PID.</span>
                </div>
              </div>
            </div>

            <div className="bg-green-100/50 dark:bg-green-950/20 text-on-surface p-4 rounded-xl shadow-sm text-xs border border-green-300/40 font-sans mt-4">
              <strong className="text-green-800 dark:text-green-400 block mb-1">🏆 Mathematical Optimality</strong>
              <p>
                SJF is provably optimal. Moving a short process before a long process decreases the waiting time of the short process by the duration of the long process, while only increasing the waiting time of the long process by the duration of the short process. Therefore, the net total waiting time strictly decreases.
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: Predicting Bursts */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SJF: Predict Next Burst</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Predicting Future Bursts 🔮
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans text-xs">
            <p className="leading-relaxed text-sm">
              While SJF is theoretically perfect, it has a massive practical flaw: <strong>The OS cannot possibly know the length of the next CPU burst</strong> before it executes. Because of the Halting Problem, we cannot determine how long code will run. Instead, the OS must mathematically <em>estimate</em> it based on past history.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant mt-2 shadow-sm">
              <h3 className="font-bold text-sm text-primary mb-3">🧠 Exponential Smoothing Formula</h3>
              <p className="text-on-surface-variant mb-4">We predict the next burst length using a weighted average of previous observations:</p>
              
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 font-mono text-sm text-primary my-2 text-center text-lg font-bold">
                τ<sub>n+1</sub> = α ‧ t<sub>n</sub> + (1 - α) ‧ τ<sub>n</sub>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <p><strong>t<sub>n</sub></strong>: The actual length of the <em>last</em> CPU burst.</p>
                  <p><strong>τ<sub>n</sub></strong>: The <em>predicted</em> length of the last CPU burst.</p>
                  <p><strong>τ<sub>n+1</sub></strong>: The new prediction for the <em>next</em> cycle.</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded border border-outline-variant/50">
                  <strong className="block text-primary">α (Weight Parameter)</strong>
                  <p className="mt-1">Controls how much weight to give recent history vs past history. (0 &le; α &le; 1)</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>{"If α = 1: Recent history only ($τ_{n+1} = t_n$)"}</li>
                    <li>If α = 0: Ignore recent, keep old prediction</li>
                    <li>Typically α = 0.5 for balanced prediction.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Starvation Risk */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SJF: The Starvation Problem</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            The Starvation Risk 💀
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed">
              While FCFS suffers from the Convoy Effect, SJF suffers from an even more dangerous problem: <strong>Starvation (Indefinite Blocking)</strong>.
            </p>
            
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900 p-4 rounded-xl text-sm font-sans space-y-3">
              <strong className="text-red-700 dark:text-red-400 block uppercase tracking-widest text-xs">How Starvation Occurs</strong>
              <p>
                {"Imagine a heavy CPU-bound process, $P_{huge}$, requiring 1000ms of CPU time, sitting in the Ready Queue. "}
                {"If a continuous stream of short interactive processes ($P_a$, $P_b$, $P_c$...) keep arriving in the system requiring only 2ms each, "}
                {"the SJF scheduler will "}<strong>always</strong>{" pick the short processes. $P_{huge}$ is technically not deadlocked (the system is making progress), but it is "}<em>starving</em>{" because it will never get the CPU."}
              </p>
            </div>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-2 text-sm mt-4">
              <strong className="text-primary block mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">health_and_safety</span>
                The Solution: Aging
              </strong>
              <p>
                To prevent starvation, modern operating systems implement a technique called <strong>Aging</strong>. 
                The OS artificially decreases the apparent burst time (or increases the priority) of a process the longer it waits in the Ready Queue. 
                Eventually, the starved process's priority becomes so high that the scheduler is forced to execute it, guaranteeing forward progress.
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Walkthrough Trace */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SJF: Step-by-Step Exercise</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            SJF Numerical Walkthrough 📝
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="text-sm font-sans mb-2">Let's schedule: P1(AT=0, BT=6), P2(AT=2, BT=2), P3(AT=3, BT=8), P4(AT=5, BT=3)</p>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-4 font-sans text-xs overflow-x-auto shadow-sm">
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b-2 border-primary text-primary">
                    <th className="py-2">Process</th>
                    <th className="py-2">AT</th>
                    <th className="py-2">BT</th>
                    <th className="py-2">CT</th>
                    <th className="py-2">TAT (CT-AT)</th>
                    <th className="py-2">WT (TAT-BT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P1</td><td>0</td><td>6</td><td className="font-bold text-primary">6</td><td>6 - 0 = 6</td><td>6 - 6 = 0</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P2</td><td>2</td><td>2</td><td className="font-bold text-primary">8</td><td>8 - 2 = 6</td><td>6 - 2 = 4</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P3</td><td>3</td><td>8</td><td className="font-bold text-primary">19</td><td>19 - 3 = 16</td><td>16 - 8 = 8</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P4</td><td>5</td><td>3</td><td className="font-bold text-primary">11</td><td>11 - 5 = 6</td><td>6 - 3 = 3</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant mb-4">
                <strong className="block text-primary mb-2 text-xs uppercase tracking-widest">Execution Trace & Gantt</strong>
                <ol className="list-decimal pl-5 space-y-1 mb-3 text-[11px]">
                  <li><strong>t=0:</strong> Only P1 in queue. P1 runs [0 to 6]. (P2, P3, P4 arrive while running but P1 is Non-Preemptive!)</li>
                  <li><strong>t=6:</strong> P1 terminates. Queue holds: P2(BT=2), P3(BT=8), P4(BT=3). Min is P2. P2 runs [6 to 8].</li>
                  <li><strong>t=8:</strong> P2 terminates. Queue holds: P3(BT=8), P4(BT=3). Min is P4. P4 runs [8 to 11].</li>
                  <li><strong>t=11:</strong> P4 terminates. Queue holds: P3(BT=8). P3 runs [11 to 19].</li>
                </ol>
                <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[10px] items-center text-center">
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '31.5%'}}>P1 [0-6]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '10.5%'}}>P2 [6-8]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-orange-500/10 text-orange-700 font-bold" style={{width: '15.8%'}}>P4 [8-11]</div>
                  <div className="h-full flex items-center justify-center bg-purple-500/10 text-purple-700 font-bold" style={{width: '42.1%'}}>P3 [11-19]</div>
                </div>
              </div>
              <div className="font-mono text-center">
                Avg WT = (0 + 4 + 8 + 3) / 4 = <strong>3.75 ms</strong>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderSRTF = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: Theoretical Overview */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Shortest Remaining Time First</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Shortest Remaining Time First (SRTF) ⏱️
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-2">
              SRTF is the <strong>Preemptive</strong> version of the Shortest Job First (SJF) algorithm. While SJF makes a scheduling decision only when a process voluntarily yields the CPU, SRTF actively re-evaluates the Ready Queue every single time a new process arrives.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">The Preemption Trigger</h3>
              <p className="text-sm">
                If a new process arrives in the Ready Queue with a CPU burst length strictly shorter than the <em>remaining</em> time of the currently executing process, the OS fires an interrupt. The dispatcher halts the current process, saves its state to the PCB, and hands the CPU to the new process.
              </p>
              <div className="bg-surface-container p-3 rounded border border-outline-variant/50 text-xs mt-2">
                <strong>Mathematical Rule:</strong>
                <br/>{"If $BT_{new} < R_{current}$, then "}<strong>Preempt!</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 font-sans text-sm">
              <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded border border-green-200 dark:border-green-900">
                <strong className="text-green-700 dark:text-green-400 block mb-1">Pros:</strong>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>Absolute minimum average waiting time.</li>
                  <li>Excellent response time for short, interactive processes.</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-900">
                <strong className="text-red-700 dark:text-red-400 block mb-1">Cons:</strong>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>High context switching overhead.</li>
                  <li>Severe starvation for long CPU-bound processes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: The Equality Trap */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SRTF: Exam Traps</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Exam Traps: The Equality Rule 🪤
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans">
            <p className="leading-relaxed text-sm">
              In OS exams, professors frequently test your understanding of the precise moment preemption occurs. The most common trap involves processes with equal remaining times.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-error/40 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
              <h3 className="font-bold text-error flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-sm">psychology</span>
                Strict Inequality Requirement
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                {"If the running process $P_1$ has remaining time $R_1 = 4$, and a new process $P_2$ arrives with burst time $BT_2 = 4$, "}<strong>preemption does NOT occur</strong>{". Preemption requires a strictly shorter burst time ($BT_{new} < R_{current}$). The OS avoids unnecessary context switches."}
              </p>
              
              <div className="bg-surface-container-low p-3 rounded text-xs space-y-1 border border-outline-variant/30">
                <strong className="block text-primary border-b border-outline-variant/30 pb-1 mb-2">Why? The Context Switch Cost</strong>
                <p>A context switch takes time ($C_s$). If $P_1$ and $P_2$ both need 4ms, completing $P_1$ then $P_2$ takes $4 + C_s + 4 = 8 + C_s$ ms.</p>
                <p>If we preempted, we'd spend $C_s$ to switch to $P_2$, finish $P_2$ (4ms), then spend $C_s$ to switch back to $P_1$ (4ms). Total time: $C_s + 4 + C_s + 4 = 8 + 2C_s$ ms. We just doubled the OS overhead for zero gain!</p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-4 text-sm font-handwritten">
              Always double-check your subtraction: when a new process arrives at time t, make sure to subtract the elapsed execution time from the running process's remaining burst time *before* comparing it to the new process's burst time!
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Walkthrough trace */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SRTF: Complete Trace</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Detailed Trace Walkthrough 📝
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="text-sm font-sans mb-2">Let's trace: P1(AT=0, BT=8), P2(AT=1, BT=4), P3(AT=2, BT=9), P4(AT=3, BT=5)</p>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-4 font-sans text-xs overflow-x-auto shadow-sm">
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b-2 border-primary text-primary">
                    <th className="py-2">Process</th>
                    <th className="py-2">AT</th>
                    <th className="py-2">BT</th>
                    <th className="py-2">CT</th>
                    <th className="py-2">TAT (CT-AT)</th>
                    <th className="py-2">WT (TAT-BT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P1</td><td>0</td><td>8</td><td className="font-bold text-primary">17</td><td>17 - 0 = 17</td><td>17 - 8 = 9</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P2</td><td>1</td><td>4</td><td className="font-bold text-primary">5</td><td>5 - 1 = 4</td><td>4 - 4 = 0</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P3</td><td>2</td><td>9</td><td className="font-bold text-primary">26</td><td>26 - 2 = 24</td><td>24 - 9 = 15</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P4</td><td>3</td><td>5</td><td className="font-bold text-primary">10</td><td>10 - 3 = 7</td><td>7 - 5 = 2</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant mb-4">
                <strong className="block text-primary mb-2 text-xs uppercase tracking-widest">Chronological Decision Trace</strong>
                <ol className="list-decimal pl-5 space-y-1 mb-3 text-[11px] font-mono leading-tight">
                  <li><strong>t=0:</strong> Only P1 available. P1 starts.</li>
                  <li><strong>t=1:</strong> P2 arrives(BT=4). P1 remaining = 7. Since 4 &lt; 7, <strong>P1 preempted!</strong> P2 starts.</li>
                  <li><strong>t=2:</strong> P3 arrives(BT=9). P2 remaining = 3. Since 9 &gt; 3, P2 continues.</li>
                  <li><strong>t=3:</strong> P4 arrives(BT=5). P2 remaining = 2. Since 5 &gt; 2, P2 continues.</li>
                  <li><strong>t=5:</strong> P2 finishes. Queue: P1(7), P3(9), P4(5). Min is P4. P4 starts.</li>
                  <li><strong>t=10:</strong> P4 finishes. Queue: P1(7), P3(9). Min is P1. P1 resumes.</li>
                  <li><strong>t=17:</strong> P1 finishes. Queue: P3(9). P3 starts and runs to 26.</li>
                </ol>
                <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[10px] items-center text-center">
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '3.8%'}}>P1</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '15.3%'}}>P2</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-orange-500/10 text-orange-700 font-bold" style={{width: '19.2%'}}>P4</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '26.9%'}}>P1</div>
                  <div className="h-full flex items-center justify-center bg-purple-500/10 text-purple-700 font-bold" style={{width: '34.6%'}}>P3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Context Switch Overhead */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>SRTF: Advanced Variables</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Context Switch Overhead (Δ) 🔄
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans text-sm">
            <p className="leading-relaxed">
              In standard academic scheduling problems, we assume the dispatcher swaps processes instantly (Context Switch Time, $C_s = 0$). However, advanced questions introduce a fixed delay $Δ$ for every switch.
            </p>

            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-300/40 p-4 rounded-xl text-on-surface">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">Calculating with Δ = 1ms</h3>
              <p className="text-xs text-on-surface-variant mb-2">
                If P1 runs from t=0 to t=1, gets preempted by P2, and there is a 1ms context switch overhead:
              </p>
              <ul className="list-disc pl-5 text-xs text-on-surface-variant space-y-1">
                <li><strong>t=0 to t=1:</strong> P1 runs normally.</li>
                <li><strong>t=1 to t=2:</strong> CPU is doing OS Dispatcher work! Neither P1 nor P2 are making progress.</li>
                <li><strong>t=2:</strong> P2 finally begins execution.</li>
              </ul>
              
              <div className="bg-surface p-3 mt-3 rounded border border-outline-variant shadow-sm text-xs text-center font-mono">
                P1 [0-1] | OS-CS [1-2] | P2 [2-...]
              </div>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant shadow-sm mt-4">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">The Real-World Lesson</h3>
              <p className="text-xs mt-2">
                This demonstrates why extreme preemption is bad. If we switch too rapidly (e.g., every 1ms) and our context switch takes 1ms, CPU utilization drops to 50%! The system is spending half its time just swapping registers instead of doing useful mathematical work.
              </p>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderPriority = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: Theoretical Concept */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Priority Scheduling</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Priority Scheduling 🥇
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-2">
              SJF is technically just a special case of the general Priority Scheduling algorithm, where priority is mathematically defined as the inverse of the (predicted) next CPU burst ($p = 1 / \tau$). In pure Priority Scheduling, the CPU is allocated to the process with the highest assigned priority rank.
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">Algorithm Mechanics</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Integer Convention:</strong>
                  <span>Historically, systems assume <em>lower integer values</em> represent <em>higher priorities</em>. For example, 0 is top priority, and 127 is lowest priority. (Always verify this convention on an exam paper!).</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Queue Structure:</strong>
                  <span>Implemented as a Max-Priority Queue (or Min-Priority Queue depending on integer rule). Tie-breakers use FCFS.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Preemption Mode:</strong>
                  <span>Can be Preemptive OR Non-Preemptive. If Preemptive, a newly arriving process with higher priority will interrupt the current process.</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl shadow-sm text-sm border border-outline-variant/40 font-sans mt-4">
              <strong className="text-on-surface block mb-1 uppercase tracking-widest text-xs">How Priority is Determined</strong>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <strong className="text-primary text-xs">Internal Factors:</strong>
                  <ul className="list-disc pl-4 mt-1 text-on-surface-variant">
                    <li>Time limits & memory requirements.</li>
                    <li>Ratio of average I/O burst to average CPU burst.</li>
                    <li>Number of open files.</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary text-xs">External Factors:</strong>
                  <ul className="list-disc pl-4 mt-1 text-on-surface-variant">
                    <li>Importance of the process (e.g. system kernel vs user).</li>
                    <li>Type and amount of funds paid for computer use.</li>
                    <li>Department sponsoring the work.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: Starvation and Aging */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Priority: Starvation Control</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Starvation & Aging ⏳
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans text-xs">
            <p className="leading-relaxed text-sm">
              The major catastrophic problem with priority scheduling algorithms is <strong>Indefinite Blocking</strong>, or <em>starvation</em>. A process that is ready to run but waiting for the CPU can be considered blocked.
            </p>
            
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900 p-4 rounded-xl text-on-surface shadow-sm mt-3">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">🚨 The MIT Multics Legend</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                A famous rumor claims that when the IBM 7094 at MIT was finally shut down in 1973, they discovered a low-priority process that had been submitted in 1967 and had not yet been run! While possibly apocryphal, this perfectly illustrates starvation: a steady stream of higher-priority processes can prevent a low-priority process from ever getting the CPU.
              </p>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-outline-variant mt-4 shadow-sm">
              <h3 className="font-bold text-sm text-primary mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">arrow_upward</span>
                The Solution: Aging
              </h3>
              <p className="text-on-surface-variant mb-4">
                <strong>Aging</strong> is a technique of gradually increasing the priority of processes that wait in the system for a long time.
              </p>
              
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 font-mono text-sm text-primary my-2 text-center font-bold">
                Priority_new = max(0, Priority_base - β * t_wait)
              </div>
              
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>If priorities range from 127 (low) to 0 (high), we might decrease the priority number by 1 every 15 minutes.</li>
                <li>Even a process with a starting priority of 127 will reach priority 0 in no more than 32 hours.</li>
                <li>This guarantees bounded waiting time for every process!</li>
              </ul>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Priority Inversion */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Priority: Concurrency Issues</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Priority Inversion 🛡️
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans">
            <p className="leading-relaxed text-sm">
              When we combine Priority Scheduling with Process Synchronization (locks/mutexes), we encounter a terrifying anomaly called <strong>Priority Inversion</strong>. This famously caused the NASA Mars Pathfinder rover to repeatedly reset itself on Mars in 1997.
            </p>
            
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shadow-sm relative">
              <strong className="block text-primary uppercase tracking-widest text-xs mb-2">The Scenario (3 Processes: L, M, H)</strong>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>Low priority process <strong>L</strong> acquires a Mutex lock on a shared resource (e.g., a data bus).</li>
                <li>High priority process <strong>H</strong> arrives. It preempts L, but then tries to acquire the same Mutex lock. <strong>H</strong> is blocked because L has the lock.</li>
                <li>Medium priority process <strong>M</strong> arrives. It does not need the lock. Since M &gt; L, M preempts L.</li>
                <li><strong>DISASTER:</strong> M is now running, L is preempted holding the lock, and H is blocked waiting for L! A medium-priority task is effectively preventing a high-priority task from running.</li>
              </ol>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-xl border border-green-200 dark:border-green-900 mt-4">
              <strong className="text-green-800 dark:text-green-400 block mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">key</span>
                Priority Inheritance Protocol (PIP)
              </strong>
              <p className="text-xs text-on-surface-variant">
                The solution implemented by RTOS (Real-Time Operating Systems). When H blocks on the lock held by L, the OS temporarily elevates L's priority to match H's priority ($Priority_L \leftarrow Priority_H$). This prevents M from preempting L. L finishes quickly, releases the lock, and reverts to its original low priority, allowing H to proceed safely.
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Preemptive Trace */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Priority: Preemptive Trace</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Preemptive Priority Trace 📝
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="text-sm font-sans mb-2">Trace (Lower number = Higher Priority): P1(AT=0, BT=4, Pr=2), P2(AT=1, BT=3, Pr=1), P3(AT=2, BT=1, Pr=4), P4(AT=3, BT=5, Pr=3)</p>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-4 font-sans text-xs overflow-x-auto shadow-sm">
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b-2 border-primary text-primary">
                    <th className="py-2">Process</th>
                    <th className="py-2">AT</th>
                    <th className="py-2">BT</th>
                    <th className="py-2">Priority</th>
                    <th className="py-2">CT</th>
                    <th className="py-2">TAT</th>
                    <th className="py-2">WT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P1</td><td>0</td><td>4</td><td>2</td><td className="font-bold text-primary">7</td><td>7 - 0 = 7</td><td>7 - 4 = 3</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P2</td><td>1</td><td>3</td><td>1</td><td className="font-bold text-primary">4</td><td>4 - 1 = 3</td><td>3 - 3 = 0</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P3</td><td>2</td><td>1</td><td>4</td><td className="font-bold text-primary">13</td><td>13 - 2 = 11</td><td>11 - 1 = 10</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P4</td><td>3</td><td>5</td><td>3</td><td className="font-bold text-primary">12</td><td>12 - 3 = 9</td><td>9 - 5 = 4</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant mb-4">
                <strong className="block text-primary mb-2 text-xs uppercase tracking-widest">Chronological Decision Trace</strong>
                <ol className="list-decimal pl-5 space-y-1 mb-3 text-[11px] font-mono leading-tight">
                  <li><strong>t=0:</strong> Only P1 available. P1 starts (Priority 2).</li>
                  <li><strong>t=1:</strong> P2 arrives (Pr 1). 1 &lt; 2, so <strong>P1 is preempted</strong>! P2 starts.</li>
                  <li><strong>t=2:</strong> P3 arrives (Pr 4). 4 &gt; 1, P2 continues.</li>
                  <li><strong>t=3:</strong> P4 arrives (Pr 3). 3 &gt; 1, P2 continues.</li>
                  <li><strong>t=4:</strong> P2 finishes. Queue: P1(rem=3, Pr 2), P3(Pr 4), P4(Pr 3). Highest is P1 (Pr 2). P1 resumes.</li>
                  <li><strong>t=7:</strong> P1 finishes. Queue: P3(Pr 4), P4(Pr 3). Highest is P4 (Pr 3). P4 starts.</li>
                  <li><strong>t=12:</strong> P4 finishes. Queue: P3(Pr 4). P3 starts and runs to 13.</li>
                </ol>
                <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[10px] items-center text-center">
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '7.6%'}}>P1</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '23%'}}>P2 [1-4]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '23%'}}>P1 [4-7]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-orange-500/10 text-orange-700 font-bold" style={{width: '38.4%'}}>P4 [7-12]</div>
                  <div className="h-full flex items-center justify-center bg-purple-500/10 text-purple-700 font-bold" style={{width: '7.6%'}}>P3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderRR = () => (
    <div className="flex flex-col gap-8 pb-8">
      {/* PAGE 1: Theoretical Concept */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Round Robin Scheduling</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Round Robin (RR) 🎡
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="leading-relaxed mb-2">
              Round Robin is designed specifically for time-sharing systems. It is effectively Preemptive FCFS. The CPU scheduler goes around the Ready Queue, allocating the CPU to each process for a fixed maximum time interval called a <strong>Time Quantum ($q$)</strong> (or time slice).
            </p>
            
            <div className="bg-surface p-4 rounded-xl border border-outline-variant font-sans space-y-3">
              <h3 className="font-bold text-primary border-b border-outline-variant/30 pb-2">Algorithm Mechanics</h3>
              <div className="grid grid-cols-1 gap-2 text-sm text-on-surface-variant">
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Queue Structure:</strong>
                  <span>The Ready Queue is treated as a strictly FIFO circular queue.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Execution Limit:</strong>
                  <span>A process executes until it either (a) finishes its burst, (b) voluntarily blocks for I/O, or (c) its time quantum $q$ expires.</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[140px] text-on-surface">Preemption Event:</strong>
                  <span>If a process's burst exceeds $q$, an OS timer interrupt fires. The OS saves the process state (Context Switch) and places the preempted process <strong>at the tail</strong> of the Ready Queue.</span>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-950/20 p-4 rounded-xl shadow-sm text-sm border border-sky-200 dark:border-sky-900 font-sans mt-4">
              <strong className="text-sky-800 dark:text-sky-400 block mb-1">🚨 The Golden Rule of Queue Maintenance (Exam Trap)</strong>
              <p>{"At any precise time $t$ when a running process $P_{curr}$'s quantum expires AND a new process $P_{new}$ arrives at the exact same time $t$:"}</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs">
                <li><strong>FIRST:</strong> {"Push all newly arriving processes ($P_{new}$) to the tail of the Ready Queue."}</li>
                <li><strong>SECOND:</strong> {"Push the preempted process ($P_{curr}$) behind them."}</li>
              </ol>
              <p className="mt-2 text-xs font-bold text-error">Misordering these two steps will result in a completely incorrect Gantt chart!</p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 2: The Time Quantum Dilemma */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Round Robin: Quantum Selection</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            The Time Quantum Trade-off ⚖️
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans text-sm">
            <p className="leading-relaxed">
              The entire performance of the Round Robin algorithm hinges on the size of the time quantum $q$. If you choose the wrong size, the system performance will collapse.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="font-bold text-error flex items-center gap-1 mb-2">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Large Quantum ($q \rightarrow \infty$)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  If $q$ is extremely large (larger than the maximum possible CPU burst), processes will never be preempted by the timer. The Round Robin policy literally degenerates into standard <strong>FCFS (First Come First Serve)</strong>, bringing back the Convoy Effect.
                </p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
                <h3 className="font-bold text-error flex items-center gap-1 mb-2">
                  <span className="material-symbols-outlined text-sm">speed</span> Small Quantum ($q \rightarrow 0$)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  If $q$ is extremely small (e.g., $q = 1$ms), we get "Processor Sharing". But if Context Switch time is $s = 1$ms, then CPU Utilization = $q/(q+s) = 1/2 = 50\%$. The CPU spends half its life just swapping registers instead of doing work!
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mt-4 text-center">
              <strong className="block text-primary text-sm uppercase tracking-widest mb-1">💡 The 80% Rule of Thumb</strong>
              <p className="text-xs">
                To balance responsiveness and overhead, systems administrators typically tune $q$ such that <strong>80% of CPU bursts</strong> finish within one time quantum. This keeps interactive response times fast while minimizing context switches for the majority of tasks.
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 3: Performance Characteristics */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Round Robin: Metrics</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Performance Metrics 📊
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2 font-sans">
            <p className="leading-relaxed text-sm">
              Because Round Robin is designed for interactivity, its metrics look very different compared to SJF or FCFS. Turnaround time generally suffers, but response time is pristine.
            </p>
            
            <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shadow-sm mt-3">
              <strong className="block text-primary uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">timer</span> Response Time Dominance
              </strong>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If there are $n$ processes in the Ready Queue and the time quantum is $q$, then each process gets $1/n$ of the CPU time in chunks of at most $q$ time units. <strong>No process waits longer than $(n-1) \times q$ time units</strong> until its next time slice.
                <br/><br/>
                <em>Why this matters:</em> In an interactive UI, if a process waits 20 seconds for its turn, the user assumes the PC crashed. With RR, the process gets a fraction of a second every second, making the interface feel responsive, even if the total completion time is slower.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900 mt-4">
              <strong className="text-amber-800 dark:text-amber-400 block mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span> Turnaround Time Anomaly
              </strong>
              <p className="text-xs text-on-surface-variant">
                Wait, does increasing the time quantum $q$ always improve average turnaround time? <strong>No.</strong> It does not strictly improve. It fluctuates based on the burst times. If $q$ is increased to a point where all processes finish in one quantum, it becomes FCFS (which might have worse turnaround if short processes arrive after long ones).
              </p>
            </div>
          </div>
        </div>
      </Paper>

      {/* PAGE 4: Execution Trace Walkthrough */}
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Round Robin: Step-by-Step Exercise</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Round Robin Walkthrough 📝
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] pr-2">
            <p className="text-sm font-sans mb-2">Trace with Quantum <strong>q=2</strong>: P1(AT=0, BT=5), P2(AT=1, BT=4), P3(AT=2, BT=2), P4(AT=4, BT=1)</p>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-4 font-sans text-xs overflow-x-auto shadow-sm">
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="border-b-2 border-primary text-primary">
                    <th className="py-2">Process</th>
                    <th className="py-2">AT</th>
                    <th className="py-2">BT</th>
                    <th className="py-2">CT</th>
                    <th className="py-2">TAT (CT-AT)</th>
                    <th className="py-2">WT (TAT-BT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P1</td><td>0</td><td>5</td><td className="font-bold text-primary">12</td><td>12 - 0 = 12</td><td>12 - 5 = 7</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P2</td><td>1</td><td>4</td><td className="font-bold text-primary">11</td><td>11 - 1 = 10</td><td>10 - 4 = 6</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P3</td><td>2</td><td>2</td><td className="font-bold text-primary">6</td><td>6 - 2 = 4</td><td>4 - 2 = 2</td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-2 font-bold">P4</td><td>4</td><td>1</td><td className="font-bold text-primary">9</td><td>9 - 4 = 5</td><td>5 - 1 = 4</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant mb-4">
                <strong className="block text-primary mb-2 text-xs uppercase tracking-widest">Ready Queue (RQ) Trace</strong>
                <ol className="list-decimal pl-5 space-y-1 mb-3 text-[11px] font-mono leading-tight">
                  <li><strong>t=0:</strong> P1 arrives. RQ: [P1]. P1 starts [0-2].</li>
                  <li><strong>t=1:</strong> P2 arrives. RQ: [P1, P2].</li>
                  <li><strong>t=2:</strong> P1 preempted (used 2ms, 3 left). P3 arrives at t=2. <em>Rule check:</em> Push new P3 first, then preempted P1! RQ: [P2, P3, P1]. P2 starts [2-4].</li>
                  <li><strong>t=4:</strong> P2 preempted (used 2ms, 2 left). P4 arrives at t=4. Push P4, then P2! RQ: [P3, P1, P4, P2]. P3 starts [4-6].</li>
                  <li><strong>t=6:</strong> P3 finishes (burst=2). RQ: [P1, P4, P2]. P1 starts [6-8].</li>
                  <li><strong>t=8:</strong> P1 preempted (used 4ms, 1 left). RQ: [P4, P2, P1]. P4 starts [8-9].</li>
                  <li><strong>t=9:</strong> P4 finishes (burst=1 &lt; 2). RQ: [P2, P1]. P2 starts [9-11].</li>
                  <li><strong>t=11:</strong> P2 finishes. RQ: [P1]. P1 starts [11-12].</li>
                  <li><strong>t=12:</strong> P1 finishes. All done.</li>
                </ol>
                <div className="flex w-full h-8 bg-surface border border-outline-variant rounded overflow-hidden font-mono text-[9px] items-center text-center">
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '16.6%'}}>P1 [0-2]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '16.6%'}}>P2 [2-4]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-purple-500/10 text-purple-700 font-bold" style={{width: '16.6%'}}>P3 [4-6]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '16.6%'}}>P1 [6-8]</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-orange-500/10 text-orange-700 font-bold" style={{width: '8.3%'}}>P4</div>
                  <div className="h-full border-r border-outline-variant flex items-center justify-center bg-green-500/10 text-green-700 font-bold" style={{width: '16.6%'}}>P2 [9-11]</div>
                  <div className="h-full flex items-center justify-center bg-blue-500/10 text-blue-700 font-bold" style={{width: '8.3%'}}>P1</div>
                </div>
              </div>
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
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Comparative Summary Cheatsheet</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Ultimate Cheat Sheet 📝
          </h2>
          <div className="overflow-x-auto pr-4 pb-4 mt-6 font-sans">
            <table className="w-full text-left border-collapse text-xs bg-surface border border-outline-variant rounded-xl overflow-hidden table-fixed">
              <thead>
                <tr className="bg-surface-container border-b-2 border-primary">
                  <th className="p-3 font-bold text-on-surface w-[20%]">Algo</th>
                  <th className="p-3 font-bold text-on-surface w-[30%]">Preemption Trigger</th>
                  <th className="p-3 font-bold text-on-surface w-[25%]">Best Used For...</th>
                  <th className="p-3 font-bold text-on-surface w-[25%]">Primary Flaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-sans">
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">FCFS</td>
                  <td className="p-3 text-on-surface-variant">None (Runs to finish)</td>
                  <td className="p-3 text-on-surface-variant">Batch processing</td>
                  <td className="p-3 text-error font-semibold">Convoy Effect</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">SJF</td>
                  <td className="p-3 text-on-surface-variant">None (Runs to finish)</td>
                  <td className="p-3 text-on-surface-variant">Long-term job queues</td>
                  <td className="p-3 text-error font-semibold">Starvation & Burst prediction</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">SRTF</td>
                  <td className="p-3 text-on-surface-variant">New shorter remaining BT arrival</td>
                  <td className="p-3 text-on-surface-variant">Max math throughput</td>
                  <td className="p-3 text-error font-semibold">Context switch overhead</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">Priority</td>
                  <td className="p-3 text-on-surface-variant">Higher priority arrival</td>
                  <td className="p-3 text-on-surface-variant">Real-time systems</td>
                  <td className="p-3 text-error font-semibold">Starvation (Needs Aging)</td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3 font-bold text-primary">RR</td>
                  <td className="p-3 text-on-surface-variant">Time Quantum clock</td>
                  <td className="p-3 text-on-surface-variant">Interactive OS / Time sharing</td>
                  <td className="p-3 text-error font-semibold">High TQ sensitivity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Cheatsheet: Starvation Analysis</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Starvation Risk Summary 🚨
          </h2>
          <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-xl text-[14px] font-sans space-y-3">
            <p className="font-bold text-primary mb-1">🚨 Starvation Quick Reference:</p>
            <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
              Remember: <strong>SJF, SRTF, and Priority</strong> scheduling algorithms are prone to <strong>Starvation (Indefinite Blocking)</strong> where low-priority or long processes wait indefinitely. <strong>FCFS and Round Robin</strong> do not suffer from starvation (assuming no infinite process execution in FCFS).
            </p>
            <div className="bg-surface p-3 rounded border border-outline-variant text-xs space-y-1 font-sans">
              <strong>How to Mitigate Starvation:</strong>
              <br/>➔ <strong>Aging:</strong> Gradually increasing the priority of a process as it spends time waiting.
              <br/>➔ <strong>Round Robin Slicing:</strong> Ensuring every process eventually gets a turn on the CPU, preventing permanent lockouts.
            </div>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Cheatsheet: Core Equations</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Equation Reference Sheet 📐
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] font-sans text-xs">
            <p className="text-sm font-handwritten font-normal">Keep these formulas on your fingertips for solving scheduling questions:</p>
            <div className="grid grid-cols-1 gap-2 font-mono">
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Turnaround Time (TAT)</strong>
                <div className="font-mono text-primary text-sm mt-1">TAT = Completion Time (CT) - Arrival Time (AT)</div>
              </div>
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Waiting Time (WT)</strong>
                <div className="font-mono text-primary text-sm mt-1">WT = Turnaround Time (TAT) - Burst Time (BT)</div>
              </div>
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Response Time (RT)</strong>
                <div className="font-mono text-primary text-sm mt-1">RT = First CPU Allocation Timestamp - Arrival Time (AT)</div>
              </div>
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Next CPU Burst Prediction (Exponential Average)</strong>
                <div className="font-mono text-primary text-sm mt-1">τ_(n+1) = α * t_n + (1 - α) * τ_n</div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Cheatsheet: Exam Checkpoints</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Common Exam Pitfalls ⚠️
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] font-sans text-xs">
            <p className="text-sm font-handwritten font-normal">Before submitting your exam sheet, make sure to double check these common points:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tie-Breaking:</strong> Did you default to FCFS rules when burst times or priorities were equal?</li>
              <li><strong>Queue Ordering (RR):</strong> When quantum expires, did you insert new arrivals into the queue *before* appending the preempted process?</li>
              <li><strong>Idle States:</strong> If there is a delay between completion and the next arrival, did you mark the CPU as `IDLE` during that gap?</li>
              <li><strong>Subtracting Bursts (SRTF):</strong> Did you recalculate remaining time at every process arrival before comparing burst values?</li>
            </ul>
          </div>
        </div>
      </Paper>
    </div>
  );

  const renderFinalExamPage = () => (
    <div className="flex flex-col gap-8 pb-8">
      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Final Exam Checkpoint</span>
          </div>
          <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-4 rotate-[-1deg]">
            Final Exam Checkpoint 🏁
          </h2>
          <p className="text-[15px] text-on-surface-variant mb-6 leading-relaxed">
            You've completed all algorithm units! Before jumping into the final challenge, let's make sure you've mastered both the theory and numerical skills. The final exam consists of <strong>50 mixed questions</strong> covering FCFS, SJF, SRTF, Priority, and Round Robin.
          </p>
          <div className="bg-amber-100/50 dark:bg-amber-950/20 text-on-surface p-4 rounded-xl border border-amber-300/40 text-xs font-sans space-y-2">
            <span className="font-bold uppercase tracking-widest block text-[10px] text-amber-700 dark:text-amber-400">📝 Study Checkpoints:</span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>FCFS:</strong> Be ready to calculate the Convoy Effect.</li>
              <li><strong>SJF:</strong> Understand the optimality characteristics and predicting calculations.</li>
              <li><strong>SRTF:</strong> Know how to handle preemption events and remaining burst time comparisons.</li>
              <li><strong>Priority:</strong> Understand Aging and Priority Inversion scenarios.</li>
              <li><strong>Round Robin:</strong> Master queue scheduling operations and time slice calculations.</li>
            </ul>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Final Exam Tips</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Speed Scheduling Tips ⚡
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] font-sans text-xs">
            <p className="text-sm font-handwritten font-normal">Tips to solve Gantt charts quickly under exam time pressure:</p>
            <div className="space-y-3">
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Tip 1: Sum check your completion time</strong>
                <br/>The final Completion Time of the last process in your Gantt Chart (minus any CPU Idle gaps) must exactly equal the sum of all Process Burst Times! If it doesn't, you have a math error somewhere.
              </div>
              <div className="bg-surface p-3 rounded border border-outline-variant">
                <strong>Tip 2: Double check waiting times</strong>
                <br/>Remember: <code>Waiting Time = Turnaround Time - Burst Time</code>. It's much faster to compute this after finding CT/TAT than counting individual grid blocks on a Gantt chart.
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>Final Exam Sample Question</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Sample Question Walkthrough 🧠
          </h2>
          <div className="space-y-4 text-on-surface-variant text-[15px] font-sans text-xs">
            <div className="bg-surface p-3 rounded border border-outline-variant font-mono space-y-1">
              <strong>Question:</strong> True or False? "Preemptive scheduling always results in lower average waiting time than non-preemptive scheduling."
              <br/><strong className="text-primary block mt-2">Answer & Explanation:</strong>
              <strong>False!</strong> While preemptive scheduling (like SRTF) often minimizes waiting time for short tasks, it can lead to higher average waiting times if there are frequent context switches that introduce heavy overhead ($Cs$), or if the process arrival times cause excessive swapping.
            </div>
          </div>
        </div>
      </Paper>

      <Paper>
        <div className="pl-6 pt-2 font-handwritten">
          <div className="border-b border-primary/20 pb-2 mb-4 flex justify-between items-center text-[11px] text-primary/60 font-sans font-bold uppercase tracking-wider">
            <span>Operating Systems Study Notes</span>
            <span>The Final Challenge</span>
          </div>
          <h2 className="font-handwritten-title text-3xl text-primary font-bold mb-4 rotate-[-1deg]">
            Ready for the Exam? 🏁
          </h2>
          <div className="pl-6 pt-8 flex flex-col items-center justify-center h-full flex-1">
            <div className="p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-surface-container-lowest rounded-3xl border border-primary/30 flex flex-col items-center text-center shadow-lg w-full max-w-sm font-sans font-normal">
              <span className="material-symbols-outlined text-7xl text-primary mb-4 animate-bounce font-normal">workspace_premium</span>
              <h3 className="font-sans text-3xl font-black text-on-surface mb-3 font-bold">The Final Exam</h3>
              <p className="font-sans text-[15px] text-on-surface-variant mb-6 font-normal">
                You've mastered the theory! Now take the ultimate mixed exam covering all algorithms. Score 80% to earn your verified certificate!
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('quiz')}
                className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-sm"
              >
                Quiz Arena
              </button>
            </div>
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
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent pr-4 pb-4 perspective-[1500px]">
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
          <div className="bg-surface border border-outline-variant rounded-2xl p-4 glass-panel shrink-0">
            <h3 className="text-headline-md font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">table_chart</span>
              Summary Table
            </h3>

            <div className="overflow-hidden border border-outline-variant rounded-xl">
              <table className="w-full text-left border-collapse text-xs table-fixed">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="px-2 py-3 font-bold text-on-surface-variant w-[25%]">Algo</th>
                    <th className="px-2 py-3 font-bold text-on-surface-variant w-[38%]">Preemptive?</th>
                    <th className="px-2 py-3 font-bold text-on-surface-variant w-[37%]">Starvation?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className={`transition-colors ${currentPage.algo === 'FCFS' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="px-2 py-3 text-on-surface">FCFS</td>
                    <td className="px-2 py-3 text-on-surface-variant">No</td>
                    <td className="px-2 py-3 text-on-surface-variant">No</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'SJF' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="px-2 py-3 text-on-surface">SJF</td>
                    <td className="px-2 py-3 text-on-surface-variant">No</td>
                    <td className="px-2 py-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'SRTF' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="px-2 py-3 text-on-surface">SRTF</td>
                    <td className="px-2 py-3 text-on-surface-variant">Yes</td>
                    <td className="px-2 py-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'Priority' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="px-2 py-3 text-on-surface">Priority</td>
                    <td className="px-2 py-3 text-on-surface-variant">Both</td>
                    <td className="px-2 py-3 text-on-surface-variant">Yes</td>
                  </tr>
                  <tr className={`transition-colors ${currentPage.algo === 'RR' ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container-low'}`}>
                    <td className="px-2 py-3 text-on-surface">RR</td>
                    <td className="px-2 py-3 text-on-surface-variant">Yes</td>
                    <td className="px-2 py-3 text-on-surface-variant">No</td>
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
