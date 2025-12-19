
import React, { useState } from 'react';
import Calculator from './components/Calculator.tsx';
import SourceViewer from './components/SourceViewer.tsx';
import { Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [showDevMode, setShowDevMode] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Gradient matching the blue primary theme */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-br from-primary-dark via-primary to-secondary-light -z-10 opacity-90" />
      
      <main className="w-full max-w-lg z-10 flex-grow flex flex-col justify-center">
        <Calculator />

        <footer className="mt-12 flex flex-col items-center gap-4 text-center text-slate-400 text-xs">
          <p className="font-medium italic opacity-60">Basé sur la réglementation locale en vigueur</p>
          <button 
            onClick={() => setShowDevMode(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-600 transition-all text-[10px] font-bold uppercase tracking-wider"
          >
            <Terminal size={12} />
            Mode Développeur
          </button>
        </footer>
      </main>

      {showDevMode && <SourceViewer onClose={() => setShowDevMode(false)} />}
    </div>
  );
};

export default App;
