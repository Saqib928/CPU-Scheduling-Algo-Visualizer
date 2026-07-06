import React from 'react';
import { motion } from 'framer-motion';

const ProcessCard = ({ process, variant, onDelete }) => {
  if (!process) return null;
  // Calculate progress for running state
  const progressPercent = ((process.burstTime - process.remainingTime) / process.burstTime) * 100;

  // Determine standard color based on priority (just for variety in the UI)
  const colorMap = {
    1: 'text-process-p1 border-process-p1 bg-process-p1',
    2: 'text-process-p2 border-process-p2 bg-process-p2',
    3: 'text-process-p3 border-process-p3 bg-process-p3',
    4: 'text-process-p4 border-process-p4 bg-process-p4',
    5: 'text-process-p5 border-process-p5 bg-process-p5',
  };
  
  const pColorClass = colorMap[process.priority] || colorMap[1];
  const pTextColor = pColorClass.split(' ')[0];
  const pBorderColor = pColorClass.split(' ')[1];
  const pBgColor = pColorClass.split(' ')[2];

  if (variant === 'EXECUTING') {
    return (
      <motion.div
        layoutId={`process-${process.id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-56 h-36 bg-surface-container-lowest border-2 ${pBorderColor} rounded-2xl flex flex-col p-5 relative executing-glow z-10 shadow-xl overflow-hidden shrink-0`}
        aria-label={`Executing Process ${process.id}`}
      >
        <div className="flex justify-between items-start z-10">
          <span className="text-4xl font-bold text-on-surface">{process.id}</span>
          <div className={`flex items-center gap-1.5 ${pBgColor}/10 px-2 py-1 rounded-full`} aria-hidden="true">
            <span className={`material-symbols-outlined text-sm ${pTextColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className={`text-[10px] font-bold ${pTextColor}`}>ACTIVE</span>
          </div>
        </div>
        <div className="mt-auto z-10">
          <div className="flex justify-between text-xs mb-1.5 font-medium text-on-surface-variant">
            <span>Progress</span>
            <span className="text-on-surface">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2.5 bg-surface-variant rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progressPercent)} aria-valuemin="0" aria-valuemax="100">
            <div className={`h-full ${pBgColor} transition-all duration-300`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'READY') {
    return (
      <motion.div
        layoutId={`process-${process.id}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`w-24 h-24 ${pBgColor}/5 border ${pBorderColor}/30 rounded-xl flex flex-col p-3 relative shrink-0 group`}
        aria-label={`Ready Process ${process.id}, Remaining Time ${process.remainingTime}, Priority ${process.priority}`}
      >
        <span className={`text-[10px] font-bold ${pTextColor} tracking-tighter uppercase`} aria-hidden="true">READY</span>
        <span className="text-2xl font-bold mt-1 text-on-surface">{process.id}</span>
        <div className="mt-auto flex justify-between text-[10px] text-on-surface-variant font-medium">
          <span>Rem: {process.remainingTime}</span>
          <span>Pri: {process.priority}</span>
        </div>
        {onDelete && (
          <button 
            onClick={onDelete} 
            aria-label={`Delete process ${process.id}`} 
            className="absolute -top-2 -right-2 bg-error text-on-error rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 z-10"
          >
            <span className="material-symbols-outlined text-[12px]" aria-hidden="true">close</span>
          </button>
        )}
      </motion.div>
    );
  }

  if (variant === 'COMPLETED') {
    return (
      <motion.div
        layout
        layoutId={`process-${process.id}`}
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-32 h-20 bg-primary/10 border-l-2 border-primary flex flex-col items-center justify-center relative group shrink-0 rounded-r-lg p-2 shadow-sm"
      >
        <span className="font-bold text-on-surface">{process.id}</span>
        <div className="flex gap-2 text-[10px] text-on-surface-variant font-medium">
          <span>BT: {process.burstTime}</span>
          <span>Pri: {process.priority}</span>
        </div>
        <div className="absolute -top-12 bg-on-surface text-surface px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-20">
          Wait: {process.waitingTime}ms | Turn: {process.turnaroundTime}ms
        </div>
      </motion.div>
    );
  }

  return null;
};

export default ProcessCard;
