import React from 'react';
import { motion } from 'framer-motion';

const ProcessCard = ({ process, state }) => {
  // state can be 'READY', 'RUNNING', 'COMPLETED', etc.
  
  let bgColors = {
    'NOT_ARRIVED': 'bg-slate-700',
    'READY': 'bg-amber-600/80 shadow-[0_0_15px_rgba(217,119,6,0.5)]',
    'RUNNING': 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]',
    'COMPLETED': 'bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
  };

  const bgClass = bgColors[state] || bgColors['NOT_ARRIVED'];

  // Calculate progress bar for running state
  const progressPercent = ((process.burstTime - process.remainingTime) / process.burstTime) * 100;

  return (
    <motion.div
      layoutId={`process-${process.id}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative w-24 h-32 rounded-xl flex flex-col justify-between p-3 text-white overflow-hidden transition-colors duration-300 ${bgClass}`}
    >
      {/* Background Progress Fill (drain effect) */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-black/20 transition-all duration-300 ease-linear z-0"
        style={{ height: `${100 - progressPercent}%` }}
      />
      
      <div className="z-10 flex justify-between items-start font-bold">
        <span className="text-xl">{process.id}</span>
        {process.priority && <span className="text-xs opacity-75 bg-black/30 px-1 rounded">P{process.priority}</span>}
      </div>

      <div className="z-10 flex flex-col items-center">
        <span className="text-3xl font-mono">{process.remainingTime}</span>
        <span className="text-[10px] uppercase tracking-wider opacity-80">Remaining</span>
      </div>

      <div className="z-10 flex justify-between text-xs opacity-80 font-mono">
        <span>W:{process.waitingTime}</span>
      </div>
    </motion.div>
  );
};

export default ProcessCard;
