import { Link } from 'react-router-dom'
import './TrailStopApp.css'

export default function TrailStopApp() {
  return (
    <>
      <nav className="tsa-nav">
        <Link to="/" className="tsa-nav-back">← DataFlexLab</Link>
        <a href="https://trade.dataflexlab.com" className="tsa-nav-launch" target="_blank" rel="noopener noreferrer">
          Launch App →
        </a>
      </nav>

      {/* ── Section 1: What & Why ── */}
      <section className="tsa-hero">
        <div className="tsa-hero-inner">
          <div className="tsa-badge">Trailing Stop App</div>
          <h1>Stop guessing when to exit.<br /><span>Let the market tell you.</span></h1>
          <p>
            Every trader knows the feeling — you're in a winning trade, but you don't know when to get out.
            Exit too early and you leave money on the table. Hold too long and you give it all back.
          </p>
          <p>
            The Trailing Stop App fixes that. It tracks your open positions and automatically calculates
            a dynamic exit point that moves with the market in your favor — locking in gains as the price
            rises, and triggering an alert the moment momentum flips. No more second-guessing, no more
            watching charts all day.
          </p>
          <div className="tsa-points">
            <div className="tsa-point">
              <div className="tsa-point-icon">🎯</div>
              <div>
                <strong>Protect your gains</strong>
                <p>Your stop level trails the price automatically — gains get locked in as the trade moves in your favor.</p>
              </div>
            </div>
            <div className="tsa-point">
              <div className="tsa-point-icon">📱</div>
              <div>
                <strong>Built for mobile</strong>
                <p>Manage positions from anywhere. Designed for your phone first, no desktop required.</p>
              </div>
            </div>
            <div className="tsa-point">
              <div className="tsa-point-icon">⚡</div>
              <div>
                <strong>Real-time tracking</strong>
                <p>Live price updates keep your stop levels current so you're never reacting to stale data.</p>
              </div>
            </div>
          </div>
          <a href="https://trade.dataflexlab.com" className="tsa-cta" target="_blank" rel="noopener noreferrer">
            Try the App →
          </a>
        </div>
      </section>

      {/* ── Section 2: Demo ── */}
      <section className="tsa-demo">
        <div className="tsa-section-inner">
          <div className="tsa-section-label">See it in action</div>
          <h2>Watch how it works</h2>
          <p className="tsa-section-sub">A quick walkthrough of adding a position and watching your trailing stop move in real time.</p>
          <div className="tsa-video-placeholder">
            <div className="tsa-video-inner">
              <div className="tsa-play-btn">▶</div>
              <p>Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Technical ── */}
      <section className="tsa-tech">
        <div className="tsa-section-inner">
          <div className="tsa-section-label">Under the hood</div>
          <h2>How it was built</h2>
          <p className="tsa-section-sub">A focused stack chosen for speed, real-time capability, and mobile performance.</p>

          <div className="tsa-tech-grid">
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Frontend</div>
              <ul>
                <li><span className="dot" />React — component-driven UI</li>
                <li><span className="dot" />Vite — fast dev & build tooling</li>
                <li><span className="dot" />CSS — mobile-first responsive layout</li>
              </ul>
            </div>
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Data & Logic</div>
              <ul>
                <li><span className="dot" />WebSockets — live price streaming</li>
                <li><span className="dot" />Custom trailing stop engine</li>
                <li><span className="dot" />Local state management</li>
              </ul>
            </div>
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Infrastructure</div>
              <ul>
                <li><span className="dot" />Hosted on Vercel</li>
                <li><span className="dot" />Custom subdomain — trade.dataflexlab.com</li>
                <li><span className="dot" />CI/CD via GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="tsa-footer">
        <Link to="/" className="tsa-footer-brand">Data<span>Flex</span>Lab</Link>
        <div className="tsa-footer-copy">© {new Date().getFullYear()} DataFlexLab. All rights reserved.</div>
      </footer>
    </>
  )
}
