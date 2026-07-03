import React, { useMemo } from 'react';
import { useSimulation } from '../context/SimulationContext';
import ProcessCard from './ProcessCard';

const Visualizer = () => {
  const { 
    algorithm, setAlgorithm,
    timeQuantum, setTimeQuantum,
    currentState, isPlaying, togglePlay, reset,
    playbackSpeed, setPlaybackSpeed,
    processes, setProcesses, removeProcess
  } = useSimulation();

  const { time, readyQueue, cpu, completed, processDetails } = currentState;

  // Calculate live stats
  const stats = useMemo(() => {
    if (completed.length === 0) return { avgWait: 0, avgTurnaround: 0, throughput: 0 };
    
    let totalWait = 0;
    let totalTurnaround = 0;
    
    completed.forEach(id => {
      totalWait += processDetails[id].waitingTime;
      totalTurnaround += processDetails[id].turnaroundTime;
    });

    const avgWait = (totalWait / completed.length).toFixed(1);
    const avgTurnaround = (totalTurnaround / completed.length).toFixed(1);
    const throughput = time > 0 ? (completed.length / time).toFixed(2) : 0;
    
    return { avgWait, avgTurnaround, throughput };
  }, [completed, processDetails, time]);

  // Handle Add Process
  const handleAddProcess = () => {
    setProcesses(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(p => parseInt(p.id.replace('P', '')))) + 1 : 1;
      const newProcess = {
        id: `P${nextId}`,
        arrivalTime: time + 1, // Arrive in the future
        burstTime: Math.floor(Math.random() * 10) + 1,
        priority: Math.floor(Math.random() * 5) + 1,
      };
      return [...prev, newProcess];
    });
  };

  // Determine Pool (Not arrived yet but exists in processes list)
  const poolProcesses = processes.filter(p => !readyQueue.includes(p.id) && p.id !== cpu && !completed.includes(p.id));

  return (
    <div className="flex w-full h-full relative">
      
      {/* TOP NAVBAR */}
      <header className="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-lg h-16 border-b border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-on-surface">OS Lab: Scheduler</span>
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full border border-primary/20">
            <span className={`w-2 h-2 rounded-full bg-primary ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Live Simulation (t={time})</span>
          </div>
        </div>
        <div className="flex items-center gap-sm" role="toolbar" aria-label="Simulation Controls">
          <button onClick={togglePlay} aria-label={isPlaying ? 'Pause Simulation' : 'Play Simulation'} className="flex items-center gap-1 px-4 py-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">{isPlaying ? 'pause' : 'play_arrow'}</span>
            <span className="text-sm font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button onClick={reset} aria-label="Reset Simulation" className="flex items-center gap-1 px-4 py-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">refresh</span>
            <span className="text-sm font-semibold">Reset</span>
          </button>
          <button onClick={() => setPlaybackSpeed(s => s === 1 ? 2 : (s === 2 ? 0.5 : 1))} aria-label={`Change Playback Speed. Current speed is ${playbackSpeed}x`} className="flex items-center gap-1 px-4 py-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">speed</span>
            <span className="text-sm font-semibold">{playbackSpeed}x Speed</span>
          </button>
          <div className="h-6 w-px bg-outline-variant mx-2" aria-hidden="true"></div>
          <button onClick={handleAddProcess} aria-label="Add New Random Process" className="bg-primary px-6 py-2 rounded-lg text-on-primary font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
            Add Process
          </button>
        </div>
      </header>

      {/* VISUALIZER STAGE */}
      <section className="flex-1 p-lg pt-24 flex flex-col gap-lg overflow-y-auto">
        
        {/* TOP ROW: Process Pool & Ready Queue */}
        <div className="grid grid-cols-12 gap-lg min-h-[160px]">
          {/* Process Pool */}
          <div className="col-span-3 bg-surface-container-low border border-outline-variant rounded-xl p-md relative glass-panel" aria-labelledby="pool-heading">
            <span id="pool-heading" className="absolute -top-3 left-4 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Process Pool</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {poolProcesses.map(p => (
                <div key={p.id} className="w-12 h-16 bg-surface-container-high border border-outline-variant rounded-lg flex flex-col items-center justify-center relative group">
                  <span className="text-xs font-bold text-on-surface">{p.id}</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">B: {p.burstTime}</span>
                  <button onClick={() => removeProcess(p.id)} aria-label={`Delete process ${p.id}`} className="absolute -top-2 -right-2 bg-error text-on-error rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </div>
              ))}
              {poolProcesses.length === 0 && <span className="text-xs text-on-surface-variant italic">Empty</span>}
            </div>
          </div>
          
          {/* Ready Queue */}
          <div className="col-span-9 bg-surface-container-low border border-outline-variant rounded-xl p-md relative flex items-center overflow-x-auto glass-panel" aria-labelledby="queue-heading">
            <span id="queue-heading" className="absolute -top-3 left-4 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ready Queue</span>
            <div className="flex gap-4 px-2 min-h-[96px] items-center">
              {readyQueue.map(id => (
                <ProcessCard key={id} process={processDetails[id]} variant="READY" onDelete={() => removeProcess(id)} />
              ))}
              {readyQueue.length === 0 && <span className="text-xs text-on-surface-variant italic ml-2">Queue is empty</span>}
              {readyQueue.length > 0 && (
                <div className="w-12 h-24 flex items-center justify-center text-outline" aria-hidden="true">
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER ROW: CPU Core */}
        <div className="flex-1 flex items-center justify-center relative py-12" aria-live="polite">
          {/* Learning Note */}
          <div className="absolute top-0 left-4 font-body-sm text-on-surface-variant -rotate-1 bg-surface-container-high p-4 rounded-xl border border-outline-variant max-w-[240px] shadow-sm italic z-20">
            <div className="flex items-center gap-2 mb-1 text-primary">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">lightbulb</span>
              <span className="text-xs font-bold uppercase tracking-wider">Analysis</span>
            </div>
            {cpu ? `The CPU is currently executing ${cpu} using ${algorithm}.` : `The CPU is idle. Algorithm is ${algorithm}.`}
          </div>

          {/* CPU Core Container */}
          <div className="w-full max-w-2xl h-64 bg-surface-container/30 rounded-[2rem] border border-outline-variant glass-panel flex flex-col items-center justify-center relative overflow-hidden">
            <div className="z-10 text-center mb-6">
              <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Core 01 Status: {cpu ? 'Executing' : 'Idle'}</span>
            </div>
            
            {/* Executing Process Card */}
            {cpu ? (
              <ProcessCard process={processDetails[cpu]} variant="EXECUTING" />
            ) : (
              <div className="w-56 h-36 border-2 border-dashed border-outline-variant rounded-2xl flex items-center justify-center z-10 text-outline-variant font-bold">
                WAITING FOR PROCESS
              </div>
            )}

            {/* Background atmospheric glow */}
            {cpu && <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>}
          </div>
        </div>

        {/* BOTTOM ROW: Completed List / Info */}
        <div className="h-48 bg-surface-container-low border border-outline-variant rounded-2xl p-lg relative flex flex-col glass-panel shrink-0">
          <span className="absolute -top-3 left-6 bg-background px-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Completed Processes</span>
          <div className="flex-1 flex gap-4 overflow-x-auto pt-2">
            {completed.map(id => (
              <ProcessCard key={id} process={processDetails[id]} variant="COMPLETED" />
            ))}
            {completed.length === 0 && <span className="text-xs text-on-surface-variant italic mt-2">No processes completed yet.</span>}
          </div>
        </div>
      </section>

      {/* RIGHT SIDEBAR: Live Stats & Strategy */}
      <aside className="w-80 border-l border-outline-variant bg-surface-container-lowest/50 p-lg pt-24 flex flex-col gap-lg glass-panel shrink-0" aria-label="Live Statistics and Settings">
        <h2 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">analytics</span>
          Live Stats
        </h2>
        
        {/* Stats Grid */}
        <div className="space-y-4" aria-live="polite">
          <div className="bg-surface-container p-lg rounded-xl border border-outline-variant">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Avg Waiting Time</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">{stats.avgWait}</span>
              <span className="text-sm font-medium text-on-surface-variant">ms</span>
            </div>
          </div>
          
          <div className="bg-surface-container p-lg rounded-xl border border-outline-variant">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Avg Turnaround Time</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-tertiary">{stats.avgTurnaround}</span>
              <span className="text-sm font-medium text-on-surface-variant">ms</span>
            </div>
          </div>
          
          <div className="bg-surface-container p-lg rounded-xl border border-outline-variant">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Throughput</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-secondary">{stats.throughput}</span>
              <span className="text-sm font-medium text-on-surface-variant">proc/ms</span>
            </div>
          </div>
        </div>

        {/* Scheduling Strategy Configuration */}
        <div className="mt-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Scheduling Strategy</h3>
          <div className="p-lg rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex flex-col gap-4">
              <select 
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="bg-surface-container text-on-surface px-3 py-2 rounded-lg border border-outline-variant focus:outline-none focus:border-primary text-sm font-bold w-full"
              >
                <option value="FCFS">First Come First Serve</option>
                <option value="SJF">Shortest Job First</option>
                <option value="SRTF">Shortest Remaining Time</option>
                <option value="Priority">Priority (Preemptive)</option>
                <option value="RR">Round Robin</option>
              </select>
              
              {algorithm === 'RR' && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-medium">Time Quantum</span>
                  <input 
                    type="number" 
                    value={timeQuantum}
                    onChange={e => setTimeQuantum(Number(e.target.value))}
                    className="w-16 bg-surface-container border border-outline-variant rounded px-2 py-1 text-on-surface text-right"
                    min="1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Visualizer;
