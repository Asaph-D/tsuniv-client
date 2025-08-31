import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router'; // It's better to import from 'react-router-dom'
import { Toaster } from "sonner";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@services/queryClient'; // Make sure this path is correct

import './index.css';
import App from './App.jsx';

// PDF styling imports
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// It's generally better to manage authentication state in a proper context or store
// rather than directly in localStorage at the entry point.
// For now, let's keep it as is.
localStorage.setItem('isAuth', 'true');

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  </QueryClientProvider>
);