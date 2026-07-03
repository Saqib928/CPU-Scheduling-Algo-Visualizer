import React, { useState } from 'react';

const LearningNotebook = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedAlgo, setSelectedAlgo] = useState('FCFS');
  const [simulationStep, setSimulationStep] = useState(0); // 0: Ready, 1: Running, 2: Done

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

  return (
    <div className="flex-1 flex flex-col h-full bg-background pt-16">
      
      {/* TOP HEADER */}
      <header className="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-lg h-16 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-on-surface">Learning Notebook</span>
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
      </header>

      {/* MAIN NOTEBOOK STAGE */}
      <div className="flex-1 p-lg overflow-y-auto grid grid-cols-12 gap-lg bg-surface-container-low/30">
        
        {/* LEFT PAGE: The Notebook Paper */}
        <div className="col-span-8 bg-surface border border-outline-variant rounded-2xl p-lg notebook-paper relative min-h-[700px] overflow-hidden">
          
          {/* Notebook Spiral Ring effect on the left margin */}
          <div className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-30 pointer-events-none" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2 border-outline bg-surface-variant shadow-inner"></div>
            ))}
          </div>

          <div className="pl-8">
            {/* Annotation Title */}
            <h2 className="font-handwritten-title text-4xl text-primary font-bold mb-6 rotate-[-1deg]">
              The Ready Queue vs CPU
            </h2>

            {/* Explanation text */}
            <p className="font-handwritten text-lg text-on-surface-variant mb-8 leading-loose max-w-xl">
              Imagine a line at a coffee shop. The <span className="underline decoration-secondary decoration-2 font-bold">Ready Queue</span> is the line waiting to order, and the <span className="underline decoration-primary decoration-2 font-bold">CPU</span> is the barista processing orders one by one.
            </p>

            {/* Ready Queue vs CPU Diagram */}
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
                <div className="w-16 h-16 border-2 border-primary bg-primary/10 text-primary rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg">
                  CPU
                </div>
              </div>
            </div>

            <p className="font-handwritten text-on-surface-variant max-w-xl mb-8 text-base">
              "The Execution Phase" starts when the OS scheduler selects a process from the queue and sends it to the CPU.
            </p>

            {/* Deep Dive Section */}
            <div className="border-t border-outline-variant pt-6 max-w-xl">
              <h3 className="font-handwritten-title text-2xl text-tertiary font-bold mb-4">
                Algorithms Deep Dive
              </h3>
              
              <div className="space-y-4 font-handwritten text-base leading-relaxed">
                <div>
                  <h4 className="font-bold text-on-surface text-lg">1. FCFS (First Come, First Served)</h4>
                  <p className="text-on-surface-variant pl-4">
                    Simple but prone to the <span className="text-error font-bold">"Convoy Effect"</span>. If a huge process arrives first, all smaller processes behind it are blocked, increasing average waiting times.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-lg">2. SJF (Shortest Job First)</h4>
                  <p className="text-on-surface-variant pl-4">
                    The most optimal algorithm! Picks the job with the shortest execution time first. Minimizes average wait times but can cause <span className="text-tertiary font-bold">"Starvation"</span> for longer processes.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Annotation Blue Sticky Note */}
            <div className="absolute bottom-6 left-12 max-w-[200px] bg-sky-200 text-sky-950 p-4 rounded-lg shadow-lg font-handwritten text-xs rotate-[-3deg] border border-sky-300">
              <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-sky-800">Concept Tip</span>
              Scheduling is all about balancing fairness, throughput, and responsiveness.
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: Interactive Widgets & Summary */}
        <div className="col-span-4 flex flex-col gap-lg">
          
          {/* Try It Yourself Sandbox */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-md relative glass-panel flex flex-col">
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
                  <span className="text-[10px] text-on-surface-variant italic">Select algorithm below to execute</span>
                </div>
              )}

              {simulationStep === 1 && (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">Running {selectedAlgo}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-surface-container-high border border-outline-variant text-on-surface-variant rounded flex items-center justify-center font-bold text-xs">P1</div>
                    <span className="material-symbols-outlined text-xl text-primary animate-ping">bolt</span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg ${selectedAlgo === 'FCFS' ? 'bg-process-p1' : 'bg-process-p3'} executing-glow`}>
                      CPU
                    </div>
                  </div>
                </div>
              )}

              {simulationStep === 2 && (
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Completed via {selectedAlgo}</span>
                  <div className="flex gap-1.5 mt-1">
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P3 (2ms)</span>
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P1 (5ms)</span>
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] rounded-full font-bold">P2 (8ms)</span>
                  </div>
                  <button onClick={resetSimulation} className="text-xs text-primary font-bold underline mt-2">Reset</button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <button 
                onClick={() => runSimulation('FCFS')} 
                className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-on-primary py-2 px-4 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Run FCFS
              </button>
              <button 
                onClick={() => runSimulation('SJF')} 
                className="bg-secondary/10 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary py-2 px-4 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Run SJF
              </button>
            </div>

            {/* Hand-written Sticky Note */}
            <div className="absolute -top-12 -right-4 bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-purple-100 p-4 rounded-xl shadow-lg font-handwritten text-xs rotate-[3deg] border border-purple-300 max-w-[180px] z-10">
              <span className="font-bold uppercase tracking-wider block mb-1 text-[10px] text-purple-800 dark:text-purple-300">Observation</span>
              Notice how SJF finishes processes faster on average compared to FCFS?
            </div>
          </div>

          {/* Comparative Summary Table */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-md glass-panel">
            <h3 className="text-headline-md font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">table_chart</span>
              Summary Table
            </h3>

            <div className="overflow-hidden border border-outline-variant rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="p-3 font-bold text-on-surface-variant">Algo</th>
                    <th className="p-3 font-bold text-on-surface-variant">Wait Time</th>
                    <th className="p-3 font-bold text-on-surface-variant">Starvation?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-bold text-on-surface">FCFS</td>
                    <td className="p-3 text-on-surface-variant">High (Convoy)</td>
                    <td className="p-3 text-on-surface-variant">No</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-3 font-bold text-on-surface">SJF</td>
                    <td className="p-3 text-on-surface-variant">Low (Optimal)</td>
                    <td className="p-3 text-on-surface-variant">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Circuit Graphics */}
          <div className="bg-surface border border-outline-variant rounded-2xl p-4 glass-panel flex items-center justify-center overflow-hidden h-40">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-primary opacity-60 animate-pulse">
              <rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 50 10 L 50 25 M 50 75 L 50 90 M 10 50 L 25 50 M 75 50 L 90 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M 25 25 L 15 15 M 75 75 L 85 85 M 75 25 L 85 15 M 25 75 L 15 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

        </div>

      </div>

    </div>
  );
};

export default LearningNotebook;
