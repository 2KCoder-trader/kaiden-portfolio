import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TrailStopApp from './pages/TrailStopApp.jsx'
import AwsStudy from './pages/AwsStudy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/trail-stop-app" element={<TrailStopApp />} />
        <Route path="/aws-study" element={<AwsStudy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
