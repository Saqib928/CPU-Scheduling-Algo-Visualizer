import React, { useState, useEffect } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Visualizer from './components/Visualizer';
import LearningNotebook from './components/LearningNotebook';
import QuizArena from './components/QuizArena';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Apply dark class to body for global scrollbars if needed, though we handle it on wrapper
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Visualizer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'notebook':
        return <LearningNotebook isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'quiz':
        return <QuizArena isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <Visualizer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
    }
  };

  return (
    <SimulationProvider>
      <div className={`text-on-background font-body-md overflow-hidden min-h-screen ${isDarkMode ? 'dark bg-background' : 'bg-background'}`}>
        {/* SIDE NAVBAR */}
        <aside aria-label="Sidebar Navigation" className="fixed left-0 top-0 h-full flex flex-col w-64 border-r border-outline-variant bg-surface-container-lowest/80 backdrop-blur-xl z-50">
          <div className="p-lg">
            <h1 className="text-headline-md font-bold text-primary">CPU Visualizer</h1>
            <p className="text-on-surface-variant text-sm mt-1">Guest Mode</p>
          </div>
          <nav aria-label="Main Menu" className="flex-1 px-sm space-y-2 mt-md">
            <button 
              onClick={() => setActiveTab('dashboard')}
              aria-current={activeTab === 'dashboard' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'text-primary font-bold border-r-4 border-primary bg-primary/5' : 'text-on-surface-variant font-medium hover:bg-surface-variant/30'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('notebook')}
              aria-current={activeTab === 'notebook' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'notebook' ? 'text-primary font-bold border-r-4 border-primary bg-primary/5' : 'text-on-surface-variant font-medium hover:bg-surface-variant/30'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">menu_book</span>
              <span>Learning Notebook</span>
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              aria-current={activeTab === 'quiz' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'quiz' ? 'text-primary font-bold border-r-4 border-primary bg-primary/5' : 'text-on-surface-variant font-medium hover:bg-surface-variant/30'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">quiz</span>
              <span>Quiz Arena</span>
            </button>
          </nav>
          <div className="p-md border-t border-outline-variant">
            <button className="w-full flex items-center justify-center gap-2 px-md py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-sm">
              <span className="material-symbols-outlined text-sm">login</span>
              Log In
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="ml-64 relative h-screen flex">
          {renderPage()}
        </main>
      </div>
    </SimulationProvider>
  );
}

export default App;
