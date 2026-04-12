import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// HashRouter uses the URL hash (#) for routing, e.g. /#/download
// This works on GitHub Pages, Netlify, S3, and any static host with zero
// server configuration — no 404s on direct page loads or refreshes.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
