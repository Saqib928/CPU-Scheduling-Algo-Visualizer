import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { simulateScheduling } from '../utils/schedulingAlgorithms';

const ComparisonModal = ({ processes, onClose }) => {

  const data = useMemo(() => {
    if (!processes || processes.length === 0) return [];

    const algos = ['FCFS', 'SJF', 'SRTF', 'Priority', 'RR'];
    const results = algos.map(algo => {
      // Simulate with standard timeQuantum=2 for RR
      const timeline = simulateScheduling(processes, algo, 2);
      const finalState = timeline[timeline.length - 1];
      
      let totalWait = 0;
      let totalTurnaround = 0;
      const completedIds = finalState.completed;

      if (completedIds.length === 0) {
        return { name: algo, avgWait: 0, avgTurnaround: 0 };
      }

      completedIds.forEach(id => {
        totalWait += finalState.processDetails[id].waitingTime;
        totalTurnaround += finalState.processDetails[id].turnaroundTime;
      });

      return {
        name: algo,
        avgWait: Number((totalWait / completedIds.length).toFixed(1)),
        avgTurnaround: Number((totalTurnaround / completedIds.length).toFixed(1))
      };
    });

    return results;
  }, [processes]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-md bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="bg-surface border border-outline-variant rounded-2xl w-full max-w-5xl shadow-2xl glass-panel relative flex flex-col text-on-surface animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl">stacked_bar_chart</span>
            Comparative Analysis
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <p className="text-sm text-on-surface-variant">
            Comparing average waiting and turnaround times across all scheduling algorithms for the current set of <strong>{processes.length}</strong> processes. 
            (Round Robin uses Time Quantum = 2).
          </p>

          <div className="h-96 w-full bg-surface-container-low rounded-xl p-4 border border-outline-variant">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#888', fontWeight: 600 }}
                    axisLine={{ stroke: '#444' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#888' }}
                    axisLine={{ stroke: '#444' }}
                    tickLine={false}
                    unit="ms"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="avgWait" name="Average Waiting Time (ms)" fill="#FFB74D" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgTurnaround" name="Average Turnaround Time (ms)" fill="#4DD0E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                <p>No processes to analyze.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
