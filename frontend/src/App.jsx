import React, { useState, useEffect, useContext } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import { AuthContext } from './context/AuthContext';
import Visualizer from './components/Visualizer';
import LearningNotebook from './components/LearningNotebook';
import QuizArena from './components/QuizArena';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Read initial tab from URL path
  const getInitialTab = () => {
    const path = window.location.pathname;
    if (path === '/notebook') return 'notebook';
    if (path === '/quiz') return 'quiz';
    return 'dashboard';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Apply dark class to body for global scrollbars if needed, though we handle it on wrapper
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Synchronize history state
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    const path = tabName === 'dashboard' ? '/' : `/${tabName}`;
    window.history.pushState({ tab: tabName }, '', path);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname;
      if (path === '/notebook') {
        setActiveTab('notebook');
      } else if (path === '/quiz') {
        setActiveTab('quiz');
      } else {
        setActiveTab('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Visualizer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'notebook':
        return <LearningNotebook isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={handleTabChange} />;
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
            {user ? (
              <div className="mt-4">
                <p className="text-on-surface font-bold text-sm">Welcome, {user.username}</p>
                <div className="flex items-center justify-between mt-2 mb-1">
                  <span className="text-xs text-on-surface-variant font-medium">Progress</span>
                  <span className="text-xs text-primary font-bold">{user.learningProgress}%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                  <div 
                     className="bg-primary h-1.5 rounded-full transition-all duration-500 shadow-[0_0_5px_rgba(var(--color-primary),0.5)]"
                     style={{ width: `${user.learningProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (() => {
              const guestProgress = JSON.parse(localStorage.getItem('guest_progress')) || { learningProgress: 0 };
              return (
                <div className="mt-4">
                  <p className="text-on-surface font-bold text-sm">Guest Mode</p>
                  <div className="flex items-center justify-between mt-2 mb-1">
                    <span className="text-xs text-on-surface-variant font-medium">Progress</span>
                    <span className="text-xs text-primary font-bold">{guestProgress.learningProgress}%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                    <div 
                       className="bg-primary h-1.5 rounded-full transition-all duration-500 shadow-[0_0_5px_rgba(var(--color-primary),0.5)]"
                       style={{ width: `${guestProgress.learningProgress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })()}
          </div>
          <nav aria-label="Main Menu" className="flex-1 px-sm space-y-2 mt-md">
            <button 
              onClick={() => handleTabChange('dashboard')}
              aria-current={activeTab === 'dashboard' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'text-primary font-bold border border-primary bg-primary/5' : 'text-on-surface-variant font-medium border border-outline-variant hover:border-primary hover:shadow-[0_0_10px_rgba(var(--color-primary),0.3)]'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => handleTabChange('notebook')}
              aria-current={activeTab === 'notebook' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'notebook' ? 'text-primary font-bold border border-primary bg-primary/5' : 'text-on-surface-variant font-medium border border-outline-variant hover:border-primary hover:shadow-[0_0_10px_rgba(var(--color-primary),0.3)]'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">menu_book</span>
              <span>Learning Notebook</span>
            </button>
            <button 
              onClick={() => handleTabChange('quiz')}
              aria-current={activeTab === 'quiz' ? 'page' : undefined} 
              className={`w-full flex items-center gap-3 px-md py-3 rounded-xl transition-all ${activeTab === 'quiz' ? 'text-primary font-bold border border-primary bg-primary/5' : 'text-on-surface-variant font-medium border border-outline-variant hover:border-primary hover:shadow-[0_0_10px_rgba(var(--color-primary),0.3)]'}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">quiz</span>
              <span>Quiz Arena</span>
            </button>
          </nav>
          <div className="p-md border-t border-outline-variant">
            {user ? (
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-md py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:shadow-md transition-all active:scale-95 text-sm border border-outline-variant hover:border-primary"
              >
                <span className="material-symbols-outlined text-sm">account_circle</span>
                Profile
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-md py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                Log In
              </button>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="ml-64 relative h-screen flex">
          {renderPage()}
        </main>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      </div>
    </SimulationProvider>
  );
}

export default App;
