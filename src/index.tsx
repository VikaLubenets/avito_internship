import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import ErrorBoundary from './components/react-components/ErrorBoundary/ErrorBoundary';
import ErrorMessage from './components/react-components/ErrorBoundary/ErrorMessage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
