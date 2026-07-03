import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { simulateScheduling } from '../utils/schedulingAlgorithms';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
    { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 3 },
    { id: 'P4', arrivalTime: 3, burstTime: 6, priority: 4 },
  ]);
  
  const [algorithm, setAlgorithm] = useState('RR');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 0.5x, 2x
  
  const [timeline, setTimeline] = useState([]);
  const [currentTick, setCurrentTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  // Generate timeline whenever inputs change
  useEffect(() => {
    const newTimeline = simulateScheduling(processes, algorithm, timeQuantum);
    setTimeline(newTimeline);
    setCurrentTick(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [processes, algorithm, timeQuantum]);

  // Playback logic
  useEffect(() => {
    if (isPlaying && currentTick < timeline.length - 1) {
      timerRef.current = setInterval(() => {
        setCurrentTick(prev => {
          if (prev >= timeline.length - 2) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return timeline.length - 1; // max tick
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, timeline.length, currentTick]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setIsPlaying(false);
    setCurrentTick(0);
  };

  const removeProcess = (processId) => {
    setProcesses(prev => prev.filter(p => p.id !== processId));
  };

  const currentState = timeline[currentTick] || {
    time: 0, readyQueue: [], cpu: null, completed: [], processDetails: {}
  };

  const value = {
    processes, setProcesses, removeProcess,
    algorithm, setAlgorithm,
    timeQuantum, setTimeQuantum,
    playbackSpeed, setPlaybackSpeed,
    timeline,
    currentTick, setCurrentTick,
    isPlaying, togglePlay, reset,
    currentState
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};
