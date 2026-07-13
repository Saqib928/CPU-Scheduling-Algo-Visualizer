import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative border border-outline-variant animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-4 shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-headline-sm font-bold text-on-surface">{user.username}</h2>
          <p className="text-on-surface-variant text-sm">{user.email}</p>
        </div>

        <div className="bg-surface rounded-xl p-4 mb-6 border border-outline-variant">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-on-surface">Learning Progress</span>
            <span className="text-sm font-bold text-primary">{user.learningProgress}%</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-2.5 mb-4 overflow-hidden">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(var(--color-primary),0.6)]"
              style={{ width: `${user.learningProgress}%` }}
            ></div>
          </div>
          
          <div className="text-sm font-medium text-on-surface-variant mb-2">Unlocked Algorithms:</div>
          <div className="flex flex-wrap gap-2">
            {user.unlockedAlgorithms?.map(algo => (
              <span key={algo} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold border border-primary/20">
                {algo}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-error/10 text-error font-bold py-3 rounded-xl hover:bg-error/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-error/20"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
