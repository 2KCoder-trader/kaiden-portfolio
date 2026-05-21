import { Link } from 'react-router-dom'
import projects from './data/projects.js'
import ProjectCarousel from './components/ProjectCarousel.jsx'
import './App.css'

function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      {projects.map(p => (
        <Link
          key={p.slug}
          to={`/${p.slug}`}
          className="project-card"
          style={p.theme ? {
            '--accent': p.theme.accent,
            '--accent-2': p.theme.accent2,
            '--accent-glow': p.theme.accentGlow,
            '--border-glow': p.theme.borderGlow,
          } : undefined}
        >
          <div className="project-card-header">
            <div className="project-icon">{p.icon}</div>
            {p.tag && <span className="project-tag">{p.tag}</span>}
          </div>
          <div className="project-name">{p.name}</div>
          <p className="project-desc">{p.shortDesc}</p>
          <div className="project-meta">
            {p.chips?.map(chip => (
              <span key={chip} className="project-chip">{chip}</span>
            ))}
          </div>
          <div className="project-arrow">
            More Info <span>→</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          Data<span>Flex</span> Lab
        </div>
        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
        </ul>
      </nav>

      <section className="hero">
        <h1>Data<span>Flex</span> Lab</h1>
        <p className="hero-author">By Kaiden Krenek</p>
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{projects.length}</div>
          <div className="stat-label">Projects</div>
        </div>
      </div>

      <section className="projects" id="projects">
        <ProjectCarousel projects={projects} />
      </section>

      <section className="projects projects-grid-section">
        <div className="section-label">All projects</div>
        <ProjectGrid projects={projects} />
      </section>

      <footer className="footer">
        <div className="footer-brand">Data<span>Flex</span> Lab</div>
        <div className="footer-copy">© {new Date().getFullYear()} DataFlex Lab. All rights reserved.</div>
      </footer>
    </>
  )
}

export default App
