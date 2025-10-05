import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AppM4L from './AppM4L.tsx';

const isM4L = import.meta.env.VITE_M4L_APP === 'true';

createRoot(document.getElementById('root')!).render(<StrictMode>{isM4L ? <AppM4L /> : <App />} </StrictMode>);
