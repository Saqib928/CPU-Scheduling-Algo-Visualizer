import React, { useState } from 'react';

const CertificateModal = ({ score, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [certId, setCertId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    setIsGenerating(true);
    // Simulate backend call
    setTimeout(() => {
      setCertId(`CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setIsGenerated(true);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-background/80 backdrop-blur-sm">
      <div className="bg-surface border border-outline-variant rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface-variant text-on-surface hover:bg-error hover:text-on-error transition-colors">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {!isGenerated ? (
          <div className="p-12 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-6xl text-primary mb-6">badge</span>
            <h2 className="text-3xl font-black text-on-surface mb-4">Claim Your Certificate</h2>
            <p className="text-on-surface-variant mb-8 max-w-md">
              Congratulations on passing the Final Exam with a score of <strong className="text-primary">{score}%</strong>! Enter your name below as you want it to appear on your verified certificate.
            </p>
            
            <div className="w-full max-w-sm flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface font-bold focus:outline-none focus:border-primary text-center"
              />
              <button 
                onClick={handleGenerate}
                disabled={!guestName.trim() || isGenerating}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                    Generating...
                  </>
                ) : 'Generate Certificate'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-surface">
            {/* The Certificate Itself */}
            <div className="w-full aspect-[1.414/1] bg-white text-black p-8 rounded-xl shadow-2xl border-8 border-double border-primary/20 relative flex flex-col items-center justify-center text-center">
              <div className="absolute top-8 left-8 text-primary opacity-20">
                <span className="material-symbols-outlined text-6xl">workspace_premium</span>
              </div>
              <div className="absolute bottom-8 right-8 text-primary opacity-20">
                <span className="material-symbols-outlined text-6xl">verified</span>
              </div>

              <h1 className="text-4xl font-black uppercase tracking-widest text-primary mb-2 font-serif">Certificate of Completion</h1>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">OS-Algo-Visualizer</p>
              
              <p className="text-lg italic text-gray-600 mb-4">This certifies that</p>
              <h2 className="text-5xl font-handwritten-title text-black mb-8 border-b-2 border-gray-300 px-12 pb-2 inline-block">
                {guestName}
              </h2>
              
              <p className="text-base text-gray-700 max-w-md mx-auto mb-12">
                Has successfully completed the comprehensive assessment on CPU Scheduling Algorithms with an outstanding score of <strong>{score}%</strong>.
              </p>

              <div className="flex justify-between w-full px-12 mt-auto">
                <div className="flex flex-col items-center">
                  <span className="border-t border-black pt-1 font-bold text-sm">Issue Date</span>
                  <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="border-t border-black pt-1 font-bold text-sm">Certificate ID</span>
                  <span className="text-xs text-gray-500 font-mono">{certId}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-surface-container text-on-surface rounded-lg font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2 border border-outline-variant">
                <span className="material-symbols-outlined text-sm">download</span>
                Download PDF
              </button>
              <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">share</span>
                Share Certificate
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default CertificateModal;
