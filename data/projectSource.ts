
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
      "src": "https://cdn-icons-png.flaticon.com/512/5839/5839888.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://cdn-icons-png.flaticon.com/512/5839/5839888.png",
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
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@babel/standalone/babel.min.js'
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
  <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/5839/5839888.png" />
  <link rel="manifest" href="manifest.json" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quotité Cessible</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.0.0",
      "react-dom": "https://esm.sh/react-dom@19.0.0",
      "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
      "recharts": "https://esm.sh/recharts@3.5.1?external=react,react-dom",
      "lucide-react": "https://esm.sh/lucide-react@0.475.0?external=react"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
     // App Code here...
  </script>
</body>
</html>`
  }
];
