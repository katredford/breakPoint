import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TimeProvider } from './components/context/TimeContext';
import App from './App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <TimeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TimeProvider>
)
