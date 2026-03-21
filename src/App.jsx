import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          Data<span>Flex</span>Lab
        </div>
        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-badge">Now Live</div>
        <h1>
          Find the gap.<br />
          <span>Close it fast.</span>
        </h1>
        <p>
          Data Flex Lab is a growing collection of focused, purposeful apps — each one built to solve a real problem, shipped with intention.
        </p>
        <div className="hero-cta">
          <a
            href="#projects"
            className="btn-primary"
            onClick={e => {
              e.preventDefault()
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects →
          </a>
        </div>
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">1<span>+</span></div>
          <div className="stat-label">Live Projects</div>
        </div>
        <div className="stat">
          <div className="stat-value"><span>∞</span></div>
          <div className="stat-label">Domains Explored</div>
        </div>
        <div className="stat">
          <div className="stat-value"><span>∞</span></div>
          <div className="stat-label">More Coming</div>
        </div>
      </div>

      <section className="projects" id="projects">
        <div className="section-label">Projects</div>
        <h2 className="section-title">Tools we've shipped</h2>
        <p className="section-sub">Practical apps built to solve real problems, across whatever domain needs it.</p>

        <div className="project-grid">
          <Link to="/trail-stop-app" className="project-card">
            <div className="project-card-header">
              <div className="project-icon">📈</div>
              <span className="project-tag">Live</span>
            </div>
            <div className="project-name">Trailing Stop App</div>
            <p className="project-desc">
              A mobile-first trading companion that takes the guesswork out of exit strategy. Set intelligent trailing stops, monitor your open positions in real time, and let the app protect your gains — so you can stay in winning trades longer without watching every tick.
            </p>
            <div className="project-meta">
              <span className="project-chip">Mobile Web</span>
              <span className="project-chip">Trading</span>
              <span className="project-chip">Real-time</span>
            </div>
            <div className="project-arrow">
              Open App <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">Data<span>Flex</span>Lab</div>
        <div className="footer-copy">© {new Date().getFullYear()} DataFlexLab. All rights reserved.</div>
      </footer>
    </>
  )
}

export default App
