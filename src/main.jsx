import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Loader from './components/Loader/Loader.jsx';
const App = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loader/>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
