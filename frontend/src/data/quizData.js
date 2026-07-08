export const quizData = {
  FCFS: [
    {
      id: 'f1', type: 'FCFS',
      question: 'What is the primary drawback of the First-Come, First-Served (FCFS) algorithm?',
      options: [
        { key: 'A', label: 'Starvation of long processes' },
        { key: 'B', label: 'The Convoy Effect' },
        { key: 'C', label: 'High context switching overhead' },
        { key: 'D', label: 'Requires knowing burst times in advance' }
      ],
      correctAnswer: 'B',
      explanation: 'The Convoy Effect occurs when short processes wait behind a long process, significantly increasing the average waiting time.'
    },
    {
      id: 'f2', type: 'FCFS',
      question: 'Is FCFS a preemptive or non-preemptive scheduling algorithm?',
      options: [
        { key: 'A', label: 'Preemptive' },
        { key: 'B', label: 'Non-preemptive' },
        { key: 'C', label: 'Both' },
        { key: 'D', label: 'None of the above' }
      ],
      correctAnswer: 'B',
      explanation: 'FCFS is inherently non-preemptive; once a process gets the CPU, it keeps it until it finishes or requests I/O.'
    },
    {
      id: 'f3', type: 'FCFS',
      question: 'Which data structure is typically used to implement the Ready Queue in FCFS?',
      options: [
        { key: 'A', label: 'Stack' },
        { key: 'B', label: 'Priority Queue' },
        { key: 'C', label: 'FIFO Queue' },
        { key: 'D', label: 'Graph' }
      ],
      correctAnswer: 'C',
      explanation: 'First-In, First-Out (FIFO) queue exactly models First-Come, First-Served behavior.'
    },
    {
      id: 'f4', type: 'FCFS',
      question: 'If processes P1(burst=24), P2(burst=3), P3(burst=3) arrive in order at time 0, what is the waiting time for P2?',
      options: [
        { key: 'A', label: '0' },
        { key: 'B', label: '24' },
        { key: 'C', label: '27' },
        { key: 'D', label: '30' }
      ],
      correctAnswer: 'B',
      explanation: 'P1 runs from 0 to 24. P2 waits for P1 to finish, so its waiting time is 24.'
    },
    {
      id: 'f5', type: 'FCFS',
      question: 'Does FCFS guarantee that all processes will eventually be executed (no starvation)?',
      options: [
        { key: 'A', label: 'Yes' },
        { key: 'B', label: 'No' }
      ],
      correctAnswer: 'A',
      explanation: 'As long as no process enters an infinite loop, every process will eventually reach the front of the queue.'
    },
    {
      id: 'f6', type: 'FCFS',
      question: 'In FCFS, what determines the order of execution?',
      options: [
        { key: 'A', label: 'Burst time' },
        { key: 'B', label: 'Priority number' },
        { key: 'C', label: 'Arrival time' },
        { key: 'D', label: 'Time quantum' }
      ],
      correctAnswer: 'C',
      explanation: 'Arrival time is the only metric used. Whoever arrives first, executes first.'
    },
    {
      id: 'f7', type: 'FCFS',
      question: 'Why is FCFS generally not suitable for time-sharing (interactive) systems?',
      options: [
        { key: 'A', label: 'It causes thrashing' },
        { key: 'B', label: 'It does not guarantee fast response times' },
        { key: 'C', label: 'It requires specialized hardware' },
        { key: 'D', label: 'It suffers from starvation' }
      ],
      correctAnswer: 'B',
      explanation: 'Time-sharing systems need fast response times for user interactions. FCFS might block a quick interaction behind a huge background task.'
    },
    {
      id: 'f8', type: 'FCFS',
      question: 'If P1(10ms), P2(5ms), P3(2ms) arrive at T=0 in that order, what is the turnaround time of P3?',
      options: [
        { key: 'A', label: '15' },
        { key: 'B', label: '17' },
        { key: 'C', label: '2' },
        { key: 'D', label: '10' }
      ],
      correctAnswer: 'B',
      explanation: 'P1 ends at 10. P2 ends at 15. P3 ends at 17. Turnaround time for P3 is 17 - 0 = 17.'
    },
    {
      id: 'f9', type: 'FCFS',
      question: 'Is it possible for FCFS to have a better average waiting time than SJF?',
      options: [
        { key: 'A', label: 'Yes, always' },
        { key: 'B', label: 'No, SJF is mathematically optimal' },
        { key: 'C', label: 'Only on multi-core processors' },
        { key: 'D', label: 'Only if processes are I/O bound' }
      ],
      correctAnswer: 'B',
      explanation: 'SJF is proven to provide the absolute minimum average waiting time. FCFS can only tie with SJF if the processes magically arrive in shortest-first order.'
    },
    {
      id: 'f10', type: 'FCFS',
      question: 'What is the context switching overhead of FCFS compared to Round Robin?',
      options: [
        { key: 'A', label: 'Much higher' },
        { key: 'B', label: 'Much lower' },
        { key: 'C', label: 'Exactly the same' },
        { key: 'D', label: 'Depends on the burst times' }
      ],
      correctAnswer: 'B',
      explanation: 'Because FCFS is non-preemptive, it only switches contexts when a process completes, making the overhead minimal compared to Round Robin.'
    }
  ],
  SJF: [
    {
      id: 's1', type: 'SJF',
      question: 'SJF is proven to be optimal for which metric?',
      options: [
        { key: 'A', label: 'Maximum waiting time' },
        { key: 'B', label: 'CPU utilization' },
        { key: 'C', label: 'Average waiting time' },
        { key: 'D', label: 'Throughput' }
      ],
      correctAnswer: 'C',
      explanation: 'SJF moves shorter jobs ahead, minimizing the time the majority of processes spend waiting.'
    },
    {
      id: 's2', type: 'SJF',
      question: 'What is the main practical difficulty in implementing SJF in a general-purpose OS?',
      options: [
        { key: 'A', label: 'It causes high context switching' },
        { key: 'B', label: 'It requires knowing the length of the next CPU burst' },
        { key: 'C', label: 'It is too complex to code' },
        { key: 'D', label: 'It only works on multi-core systems' }
      ],
      correctAnswer: 'B',
      explanation: 'The exact CPU burst time of a process is impossible to know before it executes, it must be predicted.'
    },
    {
      id: 's3', type: 'SJF',
      question: 'What is a major disadvantage of SJF?',
      options: [
        { key: 'A', label: 'Convoy Effect' },
        { key: 'B', label: 'Starvation' },
        { key: 'C', label: 'High memory usage' },
        { key: 'D', label: 'Low throughput' }
      ],
      correctAnswer: 'B',
      explanation: 'If short jobs keep arriving continuously, long jobs will never get to execute. This is called Starvation.'
    },
    {
      id: 's4', type: 'SJF',
      question: 'How do operating systems try to predict the next CPU burst length for SJF approximation?',
      options: [
        { key: 'A', label: 'Using a random number generator' },
        { key: 'B', label: 'By asking the user' },
        { key: 'C', label: 'Exponential averaging of past burst times' },
        { key: 'D', label: 'Measuring the size of the executable file' }
      ],
      correctAnswer: 'C',
      explanation: 'OS predicts future burst times by taking a weighted average of recent historical burst times (Exponential Averaging).'
    },
    {
      id: 's5', type: 'SJF',
      question: 'If P1(10ms), P2(2ms), P3(5ms) arrive at T=0, in what order does SJF execute them?',
      options: [
        { key: 'A', label: 'P1, P2, P3' },
        { key: 'B', label: 'P2, P3, P1' },
        { key: 'C', label: 'P3, P2, P1' },
        { key: 'D', label: 'P1, P3, P2' }
      ],
      correctAnswer: 'B',
      explanation: 'SJF sorts by shortest burst time: P2 (2ms) -> P3 (5ms) -> P1 (10ms).'
    },
    {
      id: 's6', type: 'SJF',
      question: 'Is standard SJF preemptive or non-preemptive?',
      options: [
        { key: 'A', label: 'Preemptive' },
        { key: 'B', label: 'Non-preemptive' }
      ],
      correctAnswer: 'B',
      explanation: 'Standard SJF is non-preemptive. Once a process starts, it finishes. The preemptive version is called SRTF.'
    },
    {
      id: 's7', type: 'SJF',
      question: 'If two processes have the exact same burst time in SJF, how is the tie typically broken?',
      options: [
        { key: 'A', label: 'Randomly' },
        { key: 'B', label: 'By Process ID' },
        { key: 'C', label: 'Using First-Come, First-Served (FCFS)' },
        { key: 'D', label: 'The OS crashes' }
      ],
      correctAnswer: 'C',
      explanation: 'If burst times are equal, SJF typically falls back to FCFS, breaking the tie based on arrival time.'
    },
    {
      id: 's8', type: 'SJF',
      question: 'SJF is most frequently used in which type of scheduling environment?',
      options: [
        { key: 'A', label: 'Long-term (Job) Scheduling' },
        { key: 'B', label: 'Short-term (CPU) Scheduling' },
        { key: 'C', label: 'Medium-term (Swapping) Scheduling' },
        { key: 'D', label: 'Network Packet Scheduling' }
      ],
      correctAnswer: 'A',
      explanation: 'SJF is often used for batch job scheduling where the user provides an estimate of the execution time upon submission.'
    },
    {
      id: 's9', type: 'SJF',
      question: 'Which of the following does NOT happen under SJF?',
      options: [
        { key: 'A', label: 'Minimization of average wait time' },
        { key: 'B', label: 'Convoy Effect' },
        { key: 'C', label: 'Starvation of long jobs' },
        { key: 'D', label: 'Execution of shortest job first' }
      ],
      correctAnswer: 'B',
      explanation: 'SJF is specifically designed to prevent the Convoy Effect by never letting a large process hold up smaller ones.'
    },
    {
      id: 's10', type: 'SJF',
      question: 'If all processes arrive at the exact same time and have identical burst times, SJF behaves exactly like:',
      options: [
        { key: 'A', label: 'Priority Scheduling' },
        { key: 'B', label: 'Round Robin' },
        { key: 'C', label: 'FCFS' },
        { key: 'D', label: 'SRTF' }
      ],
      correctAnswer: 'C',
      explanation: 'Since burst times are identical, SJF breaks the tie using FCFS rules, thus behaving exactly like FCFS.'
    }
  ],
  SRTF: [
    {
      id: 'sr1', type: 'SRTF',
      question: 'SRTF is the preemptive version of which algorithm?',
      options: [
        { key: 'A', label: 'FCFS' },
        { key: 'B', label: 'Priority' },
        { key: 'C', label: 'SJF' },
        { key: 'D', label: 'Round Robin' }
      ],
      correctAnswer: 'C',
      explanation: 'SRTF (Shortest Remaining Time First) is the preemptive variant of Shortest Job First (SJF).'
    },
    {
      id: 'sr2', type: 'SRTF',
      question: 'When does the scheduler re-evaluate the queue in SRTF?',
      options: [
        { key: 'A', label: 'Only when the current process finishes' },
        { key: 'B', label: 'Every millisecond' },
        { key: 'C', label: 'When a new process arrives in the Ready Queue' },
        { key: 'D', label: 'When the time quantum expires' }
      ],
      correctAnswer: 'C',
      explanation: 'In SRTF, preemption checks occur whenever a new process arrives to see if its burst time is shorter than the remaining time of the running process.'
    },
    {
      id: 'sr3', type: 'SRTF',
      question: 'Does SRTF suffer from starvation?',
      options: [
        { key: 'A', label: 'Yes, for long processes' },
        { key: 'B', label: 'Yes, for short processes' },
        { key: 'C', label: 'No' },
        { key: 'D', label: 'Only if there is a context switch limit' }
      ],
      correctAnswer: 'A',
      explanation: 'Just like SJF, if short processes keep arriving, a long process will be continuously preempted and starved.'
    },
    {
      id: 'sr4', type: 'SRTF',
      question: 'What is a significant overhead associated with SRTF compared to SJF?',
      options: [
        { key: 'A', label: 'Higher memory consumption' },
        { key: 'B', label: 'More frequent Context Switching' },
        { key: 'C', label: 'Disk thrashing' },
        { key: 'D', label: 'Network latency' }
      ],
      correctAnswer: 'B',
      explanation: 'Because SRTF is preemptive, it stops and saves the state of running processes frequently, leading to context switching overhead.'
    },
    {
      id: 'sr5', type: 'SRTF',
      question: 'P1(10ms) arrives at T=0. P2(2ms) arrives at T=2. Under SRTF, what happens at T=2?',
      options: [
        { key: 'A', label: 'P1 continues until T=10' },
        { key: 'B', label: 'P2 waits in the queue' },
        { key: 'C', label: 'P1 is preempted; P2 starts executing' },
        { key: 'D', label: 'The OS crashes' }
      ],
      correctAnswer: 'C',
      explanation: 'At T=2, P1 has 8ms remaining. P2 arrives with 2ms. Since 2 < 8, P1 is preempted and P2 starts.'
    },
    {
      id: 'sr6', type: 'SRTF',
      question: 'If P1 has 5ms remaining, and P2 arrives with 5ms burst time, does preemption occur in SRTF?',
      options: [
        { key: 'A', label: 'Yes' },
        { key: 'B', label: 'No' },
        { key: 'C', label: 'Depends on the OS implementation' }
      ],
      correctAnswer: 'B',
      explanation: 'Usually, if the remaining time is equal to the new burst time, preemption does NOT occur to avoid unnecessary context switches.'
    },
    {
      id: 'sr7', type: 'SRTF',
      question: 'SRTF provides the absolute lowest average waiting time compared to all other scheduling algorithms.',
      options: [
        { key: 'A', label: 'True' },
        { key: 'B', label: 'False' }
      ],
      correctAnswer: 'A',
      explanation: 'Because it can preempt a running task for a shorter one, SRTF mathematically guarantees the minimum possible average wait time.'
    },
    {
      id: 'sr8', type: 'SRTF',
      question: 'In SRTF, if a process is preempted, where does it go?',
      options: [
        { key: 'A', label: 'Waiting/Blocked Queue' },
        { key: 'B', label: 'Ready Queue' },
        { key: 'C', label: 'Terminated State' },
        { key: 'D', label: 'Disk Swap' }
      ],
      correctAnswer: 'B',
      explanation: 'A preempted process is still ready to run; it just lost the CPU. It goes back to the Ready Queue.'
    },
    {
      id: 'sr9', type: 'SRTF',
      question: 'Which of the following is required for SRTF to work effectively?',
      options: [
        { key: 'A', label: 'Fixed time quantums' },
        { key: 'B', label: 'Hardware timers' },
        { key: 'C', label: 'Knowledge of burst times' },
        { key: 'D', label: 'Multi-threading support' }
      ],
      correctAnswer: 'C',
      explanation: 'Like SJF, SRTF relies entirely on knowing or predicting the burst times of processes.'
    },
    {
      id: 'sr10', type: 'SRTF',
      question: 'What happens in SRTF if no new processes arrive after the initial batch at T=0?',
      options: [
        { key: 'A', label: 'It degrades to Round Robin' },
        { key: 'B', label: 'It degrades to FCFS' },
        { key: 'C', label: 'It behaves exactly like Non-Preemptive SJF' },
        { key: 'D', label: 'It creates a deadlock' }
      ],
      correctAnswer: 'C',
      explanation: 'If no new processes arrive, no preemption checks are triggered. The algorithm just executes the shortest jobs to completion, exactly like SJF.'
    }
  ],
  Priority: [
    {
      id: 'p1', type: 'Priority',
      question: 'What is the primary factor used to schedule processes in Priority Scheduling?',
      options: [
        { key: 'A', label: 'Arrival time' },
        { key: 'B', label: 'Burst time' },
        { key: 'C', label: 'Priority number' },
        { key: 'D', label: 'Time spent in the system' }
      ],
      correctAnswer: 'C',
      explanation: 'Each process is assigned a priority integer. The CPU is allocated to the process with the highest priority.'
    },
    {
      id: 'p2', type: 'Priority',
      question: 'What is a major problem with Priority Scheduling?',
      options: [
        { key: 'A', label: 'Convoy Effect' },
        { key: 'B', label: 'Indefinite blocking (Starvation)' },
        { key: 'C', label: 'Thrashing' },
        { key: 'D', label: 'Deadlock' }
      ],
      correctAnswer: 'B',
      explanation: 'A steady stream of high-priority processes can prevent a low-priority process from ever getting the CPU (Starvation).'
    },
    {
      id: 'p3', type: 'Priority',
      question: 'What technique is used to solve the starvation problem in Priority Scheduling?',
      options: [
        { key: 'A', label: 'Paging' },
        { key: 'B', label: 'Swapping' },
        { key: 'C', label: 'Aging' },
        { key: 'D', label: 'Context Switching' }
      ],
      correctAnswer: 'C',
      explanation: 'Aging involves gradually increasing the priority of processes that wait in the system for a long time.'
    },
    {
      id: 'p4', type: 'Priority',
      question: 'Is Priority Scheduling preemptive or non-preemptive?',
      options: [
        { key: 'A', label: 'Preemptive only' },
        { key: 'B', label: 'Non-preemptive only' },
        { key: 'C', label: 'It can be either' },
        { key: 'D', label: 'Neither' }
      ],
      correctAnswer: 'C',
      explanation: 'Priority scheduling can be preemptive (kicks out the current process if a higher priority arrives) or non-preemptive (waits for the current one to finish).'
    },
    {
      id: 'p5', type: 'Priority',
      question: 'If two processes have the exact same priority, how is the tie broken?',
      options: [
        { key: 'A', label: 'Random selection' },
        { key: 'B', label: 'SJF' },
        { key: 'C', label: 'FCFS (Arrival time)' },
        { key: 'D', label: 'Round Robin' }
      ],
      correctAnswer: 'C',
      explanation: 'When priorities are equal, the scheduler usually defaults to First-Come, First-Served.'
    },
    {
      id: 'p6', type: 'Priority',
      question: 'Which of the following processes would likely be given the highest priority by an OS?',
      options: [
        { key: 'A', label: 'Background file download' },
        { key: 'B', label: 'Mouse click interrupt handler' },
        { key: 'C', label: 'Video rendering task' },
        { key: 'D', label: 'Database indexing' }
      ],
      correctAnswer: 'B',
      explanation: 'Hardware interrupts and user input processes (like mouse clicks) require immediate response and are given the highest priority.'
    },
    {
      id: 'p7', type: 'Priority',
      question: 'In many systems (like UNIX), how is priority numerically represented?',
      options: [
        { key: 'A', label: 'Higher number = Higher priority' },
        { key: 'B', label: 'Lower number = Higher priority' },
        { key: 'C', label: 'Fractions' },
        { key: 'D', label: 'Letters A-Z' }
      ],
      correctAnswer: 'B',
      explanation: 'Typically, lower numbers denote higher priority (e.g., Priority 0 is the highest system priority).'
    },
    {
      id: 'p8', type: 'Priority',
      question: 'SJF can be thought of as a special case of Priority Scheduling. What is the "priority" based on in SJF?',
      options: [
        { key: 'A', label: 'Arrival Time' },
        { key: 'B', label: 'Process ID' },
        { key: 'C', label: 'Inverse of Burst Time' },
        { key: 'D', label: 'Burst Time itself' }
      ],
      correctAnswer: 'D',
      explanation: 'In SJF, the priority is the predicted next CPU burst time. The smaller the burst time, the higher the priority.'
    },
    {
      id: 'p9', type: 'Priority',
      question: 'In Preemptive Priority Scheduling, what triggers a preemption?',
      options: [
        { key: 'A', label: 'Time quantum expiration' },
        { key: 'B', label: 'A new process arriving with a higher priority than the running process' },
        { key: 'C', label: 'A process completing its execution' },
        { key: 'D', label: 'An I/O request' }
      ],
      correctAnswer: 'B',
      explanation: 'Preemption occurs strictly when a newly arrived process outranks the currently running process.'
    },
    {
      id: 'p10', type: 'Priority',
      question: 'What happens to the priority of a process as it undergoes "Aging"?',
      options: [
        { key: 'A', label: 'It decreases (numerically gets higher)' },
        { key: 'B', label: 'It stays the same' },
        { key: 'C', label: 'It increases (numerically gets lower)' },
        { key: 'D', label: 'It gets randomized' }
      ],
      correctAnswer: 'C',
      explanation: 'As a process ages in the queue, its priority level is increased (often represented by a lower integer) so it eventually executes.'
    }
  ],
  RR: [
    {
      id: 'r1', type: 'RR',
      question: 'What is the key defining feature of Round Robin (RR) scheduling?',
      options: [
        { key: 'A', label: 'Priorities' },
        { key: 'B', label: 'Time Quantum (Time Slice)' },
        { key: 'C', label: 'Shortest Job First' },
        { key: 'D', label: 'Non-preemption' }
      ],
      correctAnswer: 'B',
      explanation: 'RR gives every process a small, strict unit of CPU time called a Time Quantum.'
    },
    {
      id: 'r2', type: 'RR',
      question: 'Is Round Robin a preemptive algorithm?',
      options: [
        { key: 'A', label: 'Yes, always' },
        { key: 'B', label: 'No, always' },
        { key: 'C', label: 'Only if priorities are used' },
        { key: 'D', label: 'Only for background processes' }
      ],
      correctAnswer: 'A',
      explanation: 'RR is inherently preemptive. Once a process uses up its time quantum, it is forcibly preempted.'
    },
    {
      id: 'r3', type: 'RR',
      question: 'If the time quantum in Round Robin is extremely large (infinity), RR degrades to which algorithm?',
      options: [
        { key: 'A', label: 'SJF' },
        { key: 'B', label: 'SRTF' },
        { key: 'C', label: 'FCFS' },
        { key: 'D', label: 'Priority' }
      ],
      correctAnswer: 'C',
      explanation: 'If the quantum is larger than the longest burst time, processes will simply run to completion in the order they arrive, exactly like FCFS.'
    },
    {
      id: 'r4', type: 'RR',
      question: 'If the time quantum is extremely small (e.g., 1 microsecond), what is the main consequence?',
      options: [
        { key: 'A', label: 'Extremely fast throughput' },
        { key: 'B', label: 'The CPU spends most of its time Context Switching' },
        { key: 'C', label: 'No processes will ever finish' },
        { key: 'D', label: 'Memory leaks' }
      ],
      correctAnswer: 'B',
      explanation: 'A tiny quantum means the OS is constantly saving and loading process states, wasting CPU cycles on overhead rather than actual work.'
    },
    {
      id: 'r5', type: 'RR',
      question: 'What is Round Robin primarily designed for?',
      options: [
        { key: 'A', label: 'Batch Processing' },
        { key: 'B', label: 'Minimizing turnaround time' },
        { key: 'C', label: 'Time-sharing / Interactive Systems' },
        { key: 'D', label: 'Maximizing CPU utilization' }
      ],
      correctAnswer: 'C',
      explanation: 'RR ensures fair response times for all tasks, making it perfect for systems where users interact with multiple apps simultaneously.'
    },
    {
      id: 'r6', type: 'RR',
      question: 'Does Round Robin suffer from starvation?',
      options: [
        { key: 'A', label: 'Yes, for short jobs' },
        { key: 'B', label: 'Yes, for long jobs' },
        { key: 'C', label: 'No' },
        { key: 'D', label: 'Depends on the time quantum' }
      ],
      correctAnswer: 'C',
      explanation: 'Because every process is guaranteed a time slice in a circular queue, no process can ever starve in Round Robin.'
    },
    {
      id: 'r7', type: 'RR',
      question: 'P1 has burst=5. Quantum=2. How many times will P1 be preempted?',
      options: [
        { key: 'A', label: '0' },
        { key: 'B', label: '1' },
        { key: 'C', label: '2' },
        { key: 'D', label: '3' }
      ],
      correctAnswer: 'C',
      explanation: 'Runs for 2ms (preempt 1). Runs for 2ms (preempt 2). Runs for final 1ms (finishes). Preempted twice.'
    },
    {
      id: 'r8', type: 'RR',
      question: 'In Round Robin, the ready queue is treated as a:',
      options: [
        { key: 'A', label: 'Stack' },
        { key: 'B', label: 'Priority Queue' },
        { key: 'C', label: 'Circular Queue (FIFO)' },
        { key: 'D', label: 'Tree' }
      ],
      correctAnswer: 'C',
      explanation: 'New arrivals go to the back of the queue, and preempted processes are pushed to the back, forming a circle.'
    },
    {
      id: 'r9', type: 'RR',
      question: 'What typically happens in RR if a process finishes its burst before the time quantum expires?',
      options: [
        { key: 'A', label: 'The CPU idles for the remainder of the quantum' },
        { key: 'B', label: 'The process releases the CPU immediately and the next process starts' },
        { key: 'C', label: 'The remaining time is added to its next quantum' },
        { key: 'D', label: 'The OS crashes' }
      ],
      correctAnswer: 'B',
      explanation: 'The CPU does not idle. If a process finishes early, it voluntarily releases the CPU, and the scheduler dispatches the next job.'
    },
    {
      id: 'r10', type: 'RR',
      question: 'What is a typical rule of thumb for choosing a good Time Quantum?',
      options: [
        { key: 'A', label: 'It should be shorter than all context switch times' },
        { key: 'B', label: '80% of CPU bursts should be shorter than the time quantum' },
        { key: 'C', label: 'It should be equal to exactly 1 second' },
        { key: 'D', label: 'It should be dynamic and randomize every cycle' }
      ],
      correctAnswer: 'B',
      explanation: 'Setting the quantum so that most jobs finish in one slice minimizes context switches while keeping response times fast.'
    }
  ]
};

// Generate mixed Final Exam questions based on the above
export const finalExamData = [
  ...quizData.FCFS,
  ...quizData.SJF,
  ...quizData.SRTF,
  ...quizData.Priority,
  ...quizData.RR
].sort(() => Math.random() - 0.5); // Shuffle for the exam
