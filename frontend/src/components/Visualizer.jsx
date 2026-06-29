import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import ProcessCard from './ProcessCard';
import { Play, Square, RefreshCw, FastForward } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Visualizer = () => {
  const { 
    algorithm, setAlgorithm,
    currentState, isPlaying, togglePlay, reset,
    playbackSpeed, setPlaybackSpeed
  } = useSimulation();

  const { time, readyQueue, cpu, completed, processDetails } = currentState;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
      
      {/* Top Bar: Controls & Clock */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-700">
        <div className="flex gap-4 items-center">
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="FCFS">First Come First Serve</option>
            <option value="SJF">Shortest Job First</option>
            <option value="SRTF">Shortest Remaining Time</option>
            <option value="Priority">Priority (Preemptive)</option>
            <option value="RR">Round Robin</option>
          </select>

          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            <button onClick={togglePlay} className={`p-2 rounded-md ${isPlaying ? 'text-amber-500' : 'text-emerald-400'} hover:bg-slate-800 transition-colors`}>
              {isPlaying ? <Square size={20} /> : <Play size={20} />}
            </button>
            <button onClick={reset} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={() => setPlaybackSpeed(s => s === 1 ? 2 : (s === 2 ? 0.5 : 1))}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 font-mono text-sm"
            >
              <FastForward size={16} /> {playbackSpeed}x
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-1">Global Clock</span>
          <div className="text-5xl font-mono text-blue-400 font-bold bg-slate-900 px-6 py-2 rounded-xl border border-slate-700 shadow-inner">
            t={time}
          </div>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Ready Queue Container */}
        <div className="col-span-1 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            Ready Queue
          </h2>
          <div className="flex flex-wrap gap-4 min-h-[160px] content-start">
            <AnimatePresence>
              {readyQueue.map(id => (
                <ProcessCard key={id} process={processDetails[id]} state="READY" />
              ))}
            </AnimatePresence>
            {readyQueue.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-slate-600 border-2 border-dashed border-slate-700 rounded-xl min-h-[128px]">
                Empty
              </div>
            )}
          </div>
        </div>

        {/* CPU Core Container */}
        <div className="col-span-1 bg-slate-900/80 p-6 rounded-2xl border-2 border-slate-600 relative overflow-hidden">
          {/* Subtle glow effect in the background */}
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>
          
          <h2 className="text-xl font-bold text-blue-300 mb-6 flex items-center gap-2 relative z-10">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            CPU Core
          </h2>
          <div className="flex items-center justify-center min-h-[160px] relative z-10">
            <AnimatePresence mode="popLayout">
              {cpu ? (
                <ProcessCard key={cpu} process={processDetails[cpu]} state="RUNNING" />
              ) : (
                <div className="text-slate-500 font-mono text-lg animate-pulse">IDLE</div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Completed Container */}
        <div className="col-span-1 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            Completed
          </h2>
          <div className="flex flex-wrap gap-4 min-h-[160px] content-start">
            <AnimatePresence>
              {completed.map(id => (
                <ProcessCard key={id} process={processDetails[id]} state="COMPLETED" />
              ))}
            </AnimatePresence>
            {completed.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-slate-600 border-2 border-dashed border-slate-700 rounded-xl min-h-[128px]">
                None
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
