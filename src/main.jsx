import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import projects from './data/projects.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {projects.map(p => (
          <Route key={p.slug} path={`/${p.slug}`} element={<ProjectPage project={p} />} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
