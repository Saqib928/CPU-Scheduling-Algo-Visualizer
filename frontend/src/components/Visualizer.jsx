import React, { useMemo, useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import ProcessCard from './ProcessCard';

const Visualizer = ({ isDarkMode, setIsDarkMode }) => {
  const { 
    algorithm, setAlgorithm,
    timeQuantum, setTimeQuantum,
    currentState, isPlaying, togglePlay, reset,
    playbackSpeed, setPlaybackSpeed,
    processes, setProcesses, removeProcess
  } = useSimulation();

  const { time, readyQueue, cpu, completed, processDetails } = currentState;

  // Add Process Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProcessId, setModalProcessId] = useState('');
  const [modalArrival, setModalArrival] = useState(0);
  const [modalBurst, setModalBurst] = useState(1);
  const [modalPriority, setModalPriority] = useState(1);
  const [randomPreset, setRandomPreset] = useState({ arrivalTime: 0, burstTime: 1, priority: 1 });

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

  // Handle Add Process Trigger
  const handleAddProcess = () => {
    const nextId = processes.length > 0 ? Math.max(...processes.map(p => parseInt(p.id.replace('P', '')))) + 1 : 1;
    const burstVal = Math.floor(Math.random() * 10) + 1;
    const priorityVal = Math.floor(Math.random() * 5) + 1;
    const arrivalVal = time + 1;

    setModalProcessId(`P${nextId}`);
    setModalArrival(arrivalVal);
    setModalBurst(burstVal);
    setModalPriority(priorityVal);
    setRandomPreset({ arrivalTime: arrivalVal, burstTime: burstVal, priority: priorityVal });
    setIsModalOpen(true);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (modalArrival < 0 || modalBurst <= 0 || modalPriority < 1) {
      alert("Invalid inputs: Burst Time must be >= 1, Arrival Time >= 0, Priority >= 1");
      return;
    }
    setProcesses(prev => [
      ...prev,
      {
        id: modalProcessId,
        arrivalTime: Number(modalArrival),
        burstTime: Number(modalBurst),
        priority: Number(modalPriority)
      }
    ]);
    setIsModalOpen(false);
  };

  const handleAddRandomPreset = () => {
    setProcesses(prev => [
      ...prev,
      {
        id: modalProcessId,
        arrivalTime: Number(randomPreset.arrivalTime),
        burstTime: Number(randomPreset.burstTime),
        priority: Number(randomPreset.priority)
      }
    ]);
    setIsModalOpen(false);
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
          {/* Active Algorithm Pill Badge */}
          <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-secondary">analytics</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
              Algo: {algorithm === 'FCFS' ? 'First-Come, First-Served (FCFS)' :
                      algorithm === 'SJF' ? 'Shortest Job First (SJF)' :
                      algorithm === 'SRTF' ? 'Shortest Remaining Time First (SRTF)' :
                      algorithm === 'Priority' ? 'Preemptive Priority' :
                      algorithm === 'RR' ? `Round Robin (RR, Q=${timeQuantum})` : algorithm}
            </span>
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
          <button onClick={() => setIsDarkMode(!isDarkMode)} aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} className="flex items-center justify-center p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
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
        <div className="flex-1 flex flex-col items-center justify-center relative py-6 gap-6" aria-live="polite">
          {/* Analysis Status Heading */}
          <div className="w-full max-w-2xl text-center bg-surface-container-low border border-outline-variant/60 rounded-xl p-4 glass-panel shadow-sm">
            <div className="flex items-center justify-center gap-2 text-primary mb-1">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">lightbulb</span>
              <span className="text-xs font-extrabold uppercase tracking-widest">Live Analysis</span>
            </div>
            <p className="text-sm font-medium text-on-surface-variant">
              {cpu ? (
                <>The CPU is currently executing <span className="font-bold text-on-surface">{cpu}</span> using the <span className="font-bold text-on-surface">{algorithm}</span> scheduling algorithm.</>
              ) : (
                <>The CPU is idle. Currently simulated algorithm: <span className="font-bold text-on-surface">{algorithm}</span>.</>
              )}
            </p>
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

      {/* ADD PROCESS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-background/60 backdrop-blur-md animate-fade-in">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl glass-panel relative flex flex-col gap-4 text-on-surface animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">add_circle</span>
              Add Process {modalProcessId}
            </h3>
            <p className="text-xs text-on-surface-variant">
              A new process will be added. You can edit the values below or continue with the generated random values.
            </p>
            <form onSubmit={handleAddCustom} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Arrival Time</label>
                <input 
                  type="number" 
                  min="0"
                  value={modalArrival}
                  onChange={e => setModalArrival(Number(e.target.value))}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-semibold"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Burst Time</label>
                <input 
                  type="number" 
                  min="1"
                  value={modalBurst}
                  onChange={e => setModalBurst(Number(e.target.value))}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-semibold"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Priority {algorithm === 'Priority' ? '(Lower number = Higher priority)' : ''}
                </label>
                <input 
                  type="number" 
                  min="1"
                  value={modalPriority}
                  onChange={e => setModalPriority(Number(e.target.value))}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-semibold"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-surface-variant transition-colors border border-transparent text-on-surface-variant"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleAddRandomPreset}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-outline-variant text-on-surface"
                >
                  Continue with Random ({randomPreset.arrivalTime}, {randomPreset.burstTime}, {randomPreset.priority})
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-on-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  Add Custom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
