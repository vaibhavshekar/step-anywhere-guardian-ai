
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme from local storage or system preference before rendering
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Apply theme to document element immediately to prevent flashing
document.documentElement.classList.add(getInitialTheme())

createRoot(document.getElementById("root")!).render(<App />);
