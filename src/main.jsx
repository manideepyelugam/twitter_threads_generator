import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GeminiProvider } from './context/Bard.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <GeminiProvider>
    <App />
  </GeminiProvider>
)
