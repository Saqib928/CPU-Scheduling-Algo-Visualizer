import React, { useState, useEffect } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Visualizer from './components/Visualizer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark class to body for global scrollbars if needed, though we handle it on wrapper
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <SimulationProvider>
      <div className={`text-on-background font-body-md overflow-hidden min-h-screen ${isDarkMode ? 'dark bg-background' : 'bg-background'}`}>
        {/* SIDE NAVBAR */}
        <aside aria-label="Sidebar Navigation" className="fixed left-0 top-0 h-full flex flex-col w-64 border-r border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl z-50">
          <div className="p-lg">
            <h1 className="text-headline-md font-bold text-primary">OS Visualizer</h1>
            <p className="text-on-surface-variant text-sm mt-1">Live Simulation</p>
          </div>
          <nav aria-label="Main Menu" className="flex-1 px-sm space-y-2 mt-md">
            <a aria-current="page" className="flex items-center gap-3 px-md py-3 rounded-xl text-primary font-bold border-r-4 border-primary bg-primary/5 transition-transform duration-150 active:scale-95" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              <span>Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-md py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/30 transition-colors active:scale-95" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">menu_book</span>
              <span>Learning Notebook</span>
            </a>
            <a className="flex items-center gap-3 px-md py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/30 transition-colors active:scale-95" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">quiz</span>
              <span>Quiz Arena</span>
            </a>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-full flex items-center gap-3 px-md py-3 rounded-xl text-on-surface-variant font-medium hover:bg-surface-variant/30 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="ml-64 relative h-screen flex">
          <Visualizer />
        </main>
      </div>
    </SimulationProvider>
  );
}

export default App;
