import { Link } from 'react-router-dom'
import './AwsStudy.css'

export default function AwsStudy() {
  return (
    <>
      <nav className="aws-nav">
        <Link to="/" className="aws-nav-back">← DataFlexLab</Link>
        <div className="aws-nav-links">
          <a href="https://github.com/2KCoder-trader/aws-study" className="aws-nav-github" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
          <a href="https://aws-study.dataflexlab.com" className="aws-nav-launch" target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
        </div>
      </nav>

      {/* ── Section 1: What & Why ── */}
      <section className="aws-hero">
        <div className="aws-hero-inner">
          <div className="aws-badge">AWS SAA-C03 Quiz</div>
          <h1>Drill the exam.<br /><span>Understand every miss.</span></h1>
          <p>
            Studying for the AWS Solutions Architect Associate is a slog — hundreds of questions,
            tricky wording, and answer keys that tell you what's right but never <em>why</em>.
          </p>
          <p>
            This app pulls from a pool of 600+ real exam-style questions, lets you run a quiz of
            any size with a per-question timer, and after every miss it streams a Claude-powered
            explanation that breaks down the correct answer, the keywords you should have caught,
            and a one-line exam tip you can carry into test day.
          </p>
          <div className="aws-points">
            <div className="aws-point">
              <div className="aws-point-icon">🎯</div>
              <div>
                <strong>600+ real-style questions</strong>
                <p>Single and multi-answer questions sampled randomly from the full pool, with a multi-answer badge so you know how many to pick.</p>
              </div>
            </div>
            <div className="aws-point">
              <div className="aws-point-icon">🤖</div>
              <div>
                <strong>AI explanations that actually teach</strong>
                <p>Every wrong answer streams a Claude explanation: why the right choice is right, the keywords that signaled it, and an exam tip — plus a follow-up box so you can keep asking.</p>
              </div>
            </div>
            <div className="aws-point">
              <div className="aws-point-icon">📊</div>
              <div>
                <strong>Track every attempt</strong>
                <p>Quiz history saves your score, percentage, duration, and the questions you saw — so you can spot weak topics over time instead of guessing.</p>
              </div>
            </div>
          </div>
          <div className="aws-hero-actions">
            <a href="https://aws-study.dataflexlab.com" className="aws-cta" target="_blank" rel="noopener noreferrer">
              Try the App →
            </a>
            <a href="https://github.com/2KCoder-trader/aws-study" className="aws-cta-secondary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 2: Demo ── */}
      <section className="aws-demo">
        <div className="aws-section-inner">
          <div className="aws-section-label">See it in action</div>
          <h2>Watch how it works</h2>
          <p className="aws-section-sub">A walkthrough of starting a quiz, answering a question, and reading the streamed explanation.</p>
          <div className="aws-video-wrap">
            <video
              className="aws-video"
              src="/aws-study-demo.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: How It Works ── */}
      <section className="aws-how">
        <div className="aws-section-inner">
          <div className="aws-section-label">How it works</div>
          <h2>From start screen to streamed explanation</h2>
          <p className="aws-section-sub">Three steps from picking a question count to a Claude tutor in the panel below your answer.</p>
          <div className="aws-steps">
            <div className="aws-step">
              <div className="aws-step-num">01</div>
              <div>
                <strong>Pick a count and start</strong>
                <p>Choose how many questions you want, hit start, and the worker samples that many at random from <code>questions.json</code>. A progress bar and per-question timer ring track you as you go.</p>
              </div>
            </div>
            <div className="aws-step">
              <div className="aws-step-num">02</div>
              <div>
                <strong>Answer — single or multi</strong>
                <p>Single-answer questions submit instantly; multi-answer questions show a badge with the required count and only enable submit when you've picked that many. You can also right-click any choice to eliminate it visually while you think.</p>
              </div>
            </div>
            <div className="aws-step">
              <div className="aws-step-num">03</div>
              <div>
                <strong>Get a streamed explanation</strong>
                <p>After you submit, the app POSTs to <code>/api/explain</code>, which calls Claude with your question, your answer, and the correct answer. The response streams back token-by-token via SSE, with a follow-up input so you can keep the conversation going on anything you don't understand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Technical ── */}
      <section className="aws-tech">
        <div className="aws-section-inner">
          <div className="aws-section-label">Under the hood</div>
          <h2>How it was built</h2>
          <p className="aws-section-sub">Started as a Flask app, then collapsed into a single Cloudflare Worker so the whole thing serves from one URL.</p>

          <div className="aws-tech-grid">
            <div className="aws-tech-card">
              <div className="aws-tech-category">Frontend</div>
              <ul>
                <li><span className="dot" />Single-file vanilla HTML, CSS, and JS — no framework, no build step</li>
                <li><span className="dot" />Per-question timer ring, progress bar, and start / quiz / result screens</li>
                <li><span className="dot" />Right-click eliminate, multi-answer badge, and inline streamed explanations</li>
              </ul>
            </div>
            <div className="aws-tech-card">
              <div className="aws-tech-category">Backend</div>
              <ul>
                <li><span className="dot" />Cloudflare Worker (<code>worker.js</code>) handles <code>/api/questions</code>, <code>/api/explain</code>, and history</li>
                <li><span className="dot" />Cloudflare KV stores quiz history — score, duration, percentage, and question list</li>
                <li><span className="dot" />Anthropic Claude API (<code>claude-opus-4-6</code>) called with SSE streaming proxied to the browser</li>
              </ul>
            </div>
            <div className="aws-tech-card">
              <div className="aws-tech-category">Data &amp; Migration</div>
              <ul>
                <li><span className="dot" />600+ AWS SAA-C03 questions extracted from PDF into CSV, then JSON</li>
                <li><span className="dot" />Originally a Flask app with pandas + flask-limiter; rewritten as a Worker for single-URL hosting</li>
                <li><span className="dot" />Static assets and API served from the same Worker — no separate frontend deploy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="aws-footer">
        <Link to="/" className="aws-footer-brand">Data<span>Flex</span>Lab</Link>
        <div className="aws-footer-copy">© {new Date().getFullYear()} DataFlexLab. All rights reserved.</div>
      </footer>
    </>
  )
}
