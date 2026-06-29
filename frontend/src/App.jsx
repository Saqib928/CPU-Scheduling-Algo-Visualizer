import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Visualizer from './components/Visualizer';

function App() {
  return (
    <SimulationProvider>
      <div className="min-h-screen flex flex-col p-8 font-sans">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent inline-block mb-3">
            OS Algorithm Visualizer
          </h1>
          <p className="text-slate-400 text-lg">
            High-fidelity, real-time CPU Scheduling simulation
          </p>
        </header>

        <main className="flex-grow flex justify-center">
          <Visualizer />
        </main>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>MERN Stack OS Visualizer &copy; {new Date().getFullYear()}</p>
        </footer>

      </div>
    </SimulationProvider>
  );
}

export default App;
