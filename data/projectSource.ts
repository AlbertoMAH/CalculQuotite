
export interface ProjectFile {
  name: string;
  language: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  {
    name: 'manifest.json',
    language: 'json',
    content: `{
  "name": "Quotité Cessible",
  "short_name": "Quotité",
  "description": "Calculateur de capacité d'emprunt LOA Finance",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#4f46e5",
  "theme_color": "#4f46e5",
  "icons": [
    {
      "src": "https://picsum.photos/192/192",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "https://picsum.photos/512/512",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`
  },
  {
    name: 'sw.js',
    language: 'javascript',
    content: `const CACHE_NAME = 'quotite-calc-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.ts',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@19.0.0',
  'https://esm.sh/react-dom@19.0.0',
  'https://esm.sh/react-dom@19.0.0/client'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});`
  },
  {
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <link rel="manifest" href="manifest.json" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quotité Cessible</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.0.0",
      "react/": "https://esm.sh/react@19.0.0/",
      "react-dom": "https://esm.sh/react-dom@19.0.0",
      "react-dom/": "https://esm.sh/react-dom@19.0.0/",
      "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
      "recharts": "https://esm.sh/recharts@3.5.1",
      "lucide-react": "https://esm.sh/lucide-react@0.475.0"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module" src="index.tsx"></script>
</body>
</html>`
  },
  {
    name: 'App.tsx',
    language: 'tsx',
    content: `import React, { useState } from 'react';
import Calculator from './components/Calculator';
import SourceViewer from './components/SourceViewer';
import { Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [showDevMode, setShowDevMode] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900 to-slate-100 -z-10" />
      <main className="w-full max-w-lg z-10 flex-grow flex flex-col justify-center">
        <Calculator />
        <footer className="mt-12 flex flex-col items-center gap-4 text-center text-slate-500 text-xs">
          <div>
            <p>© {new Date().getFullYear()} LOA Finance. Tous droits réservés.</p>
          </div>
          <button onClick={() => setShowDevMode(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-600 transition-all text-[10px] font-medium uppercase tracking-wider">
            <Terminal size={12} /> Mode Développeur
          </button>
        </footer>
      </main>
      {showDevMode && <SourceViewer onClose={() => setShowDevMode(false)} />}
    </div>
  );
};
export default App;`
  }
];
