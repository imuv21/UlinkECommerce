import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
  </React.StrictMode>,
)
