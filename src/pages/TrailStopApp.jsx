import { Link } from 'react-router-dom'
import './TrailStopApp.css'

export default function TrailStopApp() {
  return (
    <>
      <nav className="tsa-nav">
        <Link to="/" className="tsa-nav-back">← DataFlexLab</Link>
        <div className="tsa-nav-links">
          <a href="https://github.com/2KCoder-trader/schwab-trailing-stops" className="tsa-nav-github" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
          <a href="https://trade.dataflexlab.com" className="tsa-nav-launch" target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
        </div>
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
            The Trailing Stop App connects directly to your Schwab brokerage account. It monitors your
            open positions, tracks the highest price since each order was entered, and shows you exactly
            how much profit is locked in — updated automatically, no charts required.
          </p>
          <div className="tsa-points">
            <div className="tsa-point">
              <div className="tsa-point-icon">🎯</div>
              <div>
                <strong>Locked profit, always visible</strong>
                <p>For each position, the app tracks the highest high since your order entered and calculates your stop price and guaranteed profit in real time.</p>
              </div>
            </div>
            <div className="tsa-point">
              <div className="tsa-point-icon">⚡</div>
              <div>
                <strong>Bracket orders in one tap</strong>
                <p>The trade screen places a limit buy and a trailing stop sell together as a single triggered order — your exit is set the moment you enter.</p>
              </div>
            </div>
            <div className="tsa-point">
              <div className="tsa-point-icon">🔐</div>
              <div>
                <strong>Credentials never leave the server</strong>
                <p>A Cloudflare Worker handles the Schwab OAuth exchange. Your API secrets stay server-side — the browser only ever holds short-lived access tokens.</p>
              </div>
            </div>
          </div>
          <div className="tsa-hero-actions">
            <a href="https://trade.dataflexlab.com" className="tsa-cta" target="_blank" rel="noopener noreferrer">
              Try the App →
            </a>
            <a href="https://github.com/2KCoder-trader/schwab-trailing-stops" className="tsa-cta-secondary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Demo ── */}
      <section className="tsa-demo">
        <div className="tsa-section-inner">
          <div className="tsa-section-label">See it in action</div>
          <h2>Watch how it works</h2>
          <p className="tsa-section-sub">A walkthrough of logging in with Schwab, viewing your trailing stop dashboard, and placing a bracket order.</p>
          <div className="tsa-video-placeholder">
            <div className="tsa-video-inner">
              <div className="tsa-play-btn">▶</div>
              <p>Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: How It Works ── */}
      <section className="tsa-how">
        <div className="tsa-section-inner">
          <div className="tsa-section-label">How it works</div>
          <h2>From login to locked-in profit</h2>
          <p className="tsa-section-sub">Three steps from Schwab OAuth to a live trailing stop dashboard.</p>
          <div className="tsa-steps">
            <div className="tsa-step">
              <div className="tsa-step-num">01</div>
              <div>
                <strong>Connect with Schwab OAuth</strong>
                <p>Click "Login with Schwab" — the app fetches an auth URL from the Cloudflare Worker, redirects you to Schwab, and exchanges the returned code for an access token. The refresh token lasts 7 days; the app silently renews access tokens as they expire.</p>
              </div>
            </div>
            <div className="tsa-step">
              <div className="tsa-step-num">02</div>
              <div>
                <strong>Portfolio dashboard loads your positions</strong>
                <p>The app polls your Schwab account every 60 seconds for open positions and any trailing stop orders with status <code>AWAITING_STOP_CONDITION</code>. For each matched position it fetches price history — 1-minute candles for new entries, up to daily candles for older ones — to find the highest high since entry.</p>
              </div>
            </div>
            <div className="tsa-step">
              <div className="tsa-step-num">03</div>
              <div>
                <strong>Stop price and locked profit update live</strong>
                <p>Each row shows your ticker and trail gap, the current market price and calculated stop (highestHigh − trailGap), and both your floating P&amp;L and the profit locked in above cost basis. Price history refreshes every 10 minutes. If the API is unreachable, the app falls back to demo data automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Technical ── */}
      <section className="tsa-tech">
        <div className="tsa-section-inner">
          <div className="tsa-section-label">Under the hood</div>
          <h2>How it was built</h2>
          <p className="tsa-section-sub">Flutter on the front, a Cloudflare Worker in the middle, and the Schwab API behind it all.</p>

          <div className="tsa-tech-grid">
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Frontend</div>
              <ul>
                <li><span className="dot" />Flutter &amp; Dart — cross-platform (web, iOS, Android, desktop)</li>
                <li><span className="dot" />5-tab navigation: Portfolio, Trading, History, Ranking, Settings</li>
                <li><span className="dot" />Search, asset-type tabs, and per-position detail screens</li>
              </ul>
            </div>
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Data &amp; Logic</div>
              <ul>
                <li><span className="dot" />Schwab REST API — positions, orders, quotes, price history</li>
                <li><span className="dot" />Adaptive candle resolution (1m → 5m → 30m → daily based on position age)</li>
                <li><span className="dot" />Bracket orders: limit BUY + trailing stop SELL as a single TRIGGER order</li>
              </ul>
            </div>
            <div className="tsa-tech-card">
              <div className="tsa-tech-category">Auth &amp; Infrastructure</div>
              <ul>
                <li><span className="dot" />Schwab OAuth 2.0 via Cloudflare Worker proxy — secrets never in the browser</li>
                <li><span className="dot" />In-memory token storage with silent refresh</li>
                <li><span className="dot" />Flutter Web on Vercel — trade.dataflexlab.com</li>
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
