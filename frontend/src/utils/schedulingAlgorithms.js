/**
 * Generates a full timeline of events for the visualizer.
 * @param {Array} processes - Array of objects { id, arrivalTime, burstTime, priority }
 * @param {String} algorithm - 'FCFS', 'SJF', 'SRTF', 'Priority', 'RR'
 * @param {Number} timeQuantum - For Round Robin
 */
export const simulateScheduling = (processes, algorithm, timeQuantum = 2) => {
  // Deep copy and initialize state
  let procs = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    state: 'NOT_ARRIVED', // NOT_ARRIVED, READY, RUNNING, COMPLETED
    waitingTime: 0,
    turnaroundTime: 0,
    startTime: -1,
    completionTime: -1
  }));

  // Sort by arrival time just in case, though we check exact arrival time
  procs.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let timeline = [];
  let completedCount = 0;
  let readyQueue = []; // Array of process IDs
  let currentCpuProcess = null;
  let currentCpuTime = 0; // Time spent in CPU for current quantum (used in RR)

  const getP = id => procs.find(p => p.id === id);

  while (completedCount < procs.length && currentTime < 1000) { // 1000 is failsafe
    // 1. Process arrivals
    let arrived = procs.filter(p => p.arrivalTime === currentTime && p.state === 'NOT_ARRIVED');
    for (let p of arrived) {
      p.state = 'READY';
      readyQueue.push(p.id);
    }

    // 2. Algorithm specific preemption and selection
    if (algorithm === 'FCFS') {
      if (!currentCpuProcess && readyQueue.length > 0) {
        currentCpuProcess = readyQueue.shift();
      }
    } else if (algorithm === 'SJF') {
      if (!currentCpuProcess && readyQueue.length > 0) {
        readyQueue.sort((a, b) => getP(a).burstTime - getP(b).burstTime);
        currentCpuProcess = readyQueue.shift();
      }
    } else if (algorithm === 'SRTF') {
      if (currentCpuProcess) {
        readyQueue.push(currentCpuProcess);
        getP(currentCpuProcess).state = 'READY';
      }
      if (readyQueue.length > 0) {
        readyQueue.sort((a, b) => {
          let pa = getP(a);
          let pb = getP(b);
          if (pa.remainingTime === pb.remainingTime) return pa.arrivalTime - pb.arrivalTime;
          return pa.remainingTime - pb.remainingTime;
        });
        currentCpuProcess = readyQueue.shift();
      } else {
        currentCpuProcess = null;
      }
    } else if (algorithm === 'Priority') {
      // Preemptive Priority (lower number = higher priority)
      if (currentCpuProcess) {
        readyQueue.push(currentCpuProcess);
        getP(currentCpuProcess).state = 'READY';
      }
      if (readyQueue.length > 0) {
        readyQueue.sort((a, b) => {
          let pa = getP(a);
          let pb = getP(b);
          if (pa.priority === pb.priority) return pa.arrivalTime - pb.arrivalTime;
          return pa.priority - pb.priority;
        });
        currentCpuProcess = readyQueue.shift();
      } else {
        currentCpuProcess = null;
      }
    } else if (algorithm === 'RR') {
      if (currentCpuProcess) {
        if (currentCpuTime >= timeQuantum) {
          readyQueue.push(currentCpuProcess);
          getP(currentCpuProcess).state = 'READY';
          currentCpuProcess = null;
          currentCpuTime = 0;
        }
      }
      if (!currentCpuProcess && readyQueue.length > 0) {
        currentCpuProcess = readyQueue.shift();
        currentCpuTime = 0;
      }
    }

    // Snapshot state for this tick (before processing execution so we see it enter)
    if (currentCpuProcess) {
      getP(currentCpuProcess).state = 'RUNNING';
    }

    let snapshot = {
      time: currentTime,
      readyQueue: [...readyQueue],
      cpu: currentCpuProcess,
      completed: procs.filter(p => p.state === 'COMPLETED').map(p => p.id),
      processDetails: {}
    };

    procs.forEach(p => {
      snapshot.processDetails[p.id] = { ...p };
    });
    
    timeline.push(snapshot);

    // 3. Execute CPU
    if (currentCpuProcess) {
      let cp = getP(currentCpuProcess);
      if (cp.startTime === -1) cp.startTime = currentTime;
      
      cp.remainingTime -= 1;
      currentCpuTime += 1;

      if (cp.remainingTime === 0) {
        cp.state = 'COMPLETED';
        cp.completionTime = currentTime + 1;
        cp.turnaroundTime = cp.completionTime - cp.arrivalTime;
        cp.waitingTime = cp.turnaroundTime - cp.burstTime;
        completedCount += 1;
        currentCpuProcess = null;
        currentCpuTime = 0;
      }
    }

    // Update waiting times for processes in ready queue
    readyQueue.forEach(id => {
      getP(id).waitingTime += 1;
    });

    currentTime += 1;
  }

  // Final snapshot after simulation finishes
  let finalSnapshot = {
    time: currentTime,
    readyQueue: [],
    cpu: null,
    completed: procs.filter(p => p.state === 'COMPLETED').map(p => p.id),
    processDetails: {}
  };
  procs.forEach(p => {
    finalSnapshot.processDetails[p.id] = { ...p };
  });
  timeline.push(finalSnapshot);

  return timeline;
};
