import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import AppRouter from './routes.jsx';
import { usePuterStore } from '../lib/puter.js';

function RootApp() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, []);

  return <AppRouter />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
