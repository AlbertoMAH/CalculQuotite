
import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Layers, Menu } from 'lucide-react';
import { PROJECT_FILES } from '../data/projectSource.ts';

interface SourceViewerProps {
  onClose: () => void;
}

const SourceViewer: React.FC<SourceViewerProps> = ({ onClose }) => {
  const [activeFile, setActiveFile] = useState(PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/60">
      <div className="bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-700">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-1.5 text-slate-400 hover:text-white"><Menu size={18} /></button>
            <span className="text-indigo-400 font-bold text-sm uppercase">Dev Mode</span>
            <span className="text-slate-500 font-mono text-xs hidden sm:inline">— {activeFile.name}</span>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className={`absolute md:relative z-20 h-full w-64 bg-slate-950 border-r border-slate-800 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase px-2 mb-2">Fichiers</p>
              {PROJECT_FILES.map(f => (
                <button 
                  key={f.name} 
                  onClick={() => { setActiveFile(f); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium mb-1 ${activeFile.name === f.name ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-900'}`}
                >
                  <FileCode size={14} /> {f.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-[#0d1117] overflow-auto p-6 relative">
            <button onClick={handleCopy} className="absolute top-4 right-4 bg-slate-800 text-slate-300 p-2 rounded-lg border border-slate-700">
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed"><code>{activeFile.content}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceViewer;
