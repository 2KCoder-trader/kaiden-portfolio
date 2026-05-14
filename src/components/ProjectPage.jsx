import { Link } from 'react-router-dom'
import './ProjectPage.css'

function renderInline(text) {
  if (text == null) return null
  const parts = String(text).split(/(`[^`]+`)/g)
  return parts.map((part, i) =>
    part.startsWith('`') && part.endsWith('`')
      ? <code key={i}>{part.slice(1, -1)}</code>
      : part
  )
}

function Nav({ nav }) {
  return (
    <nav className="pp-nav">
      <Link to="/" className="pp-nav-back">← DataFlexLab</Link>
      <div className="pp-nav-links">
        {nav?.githubUrl && (
          <a href={nav.githubUrl} className="pp-nav-github" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
        )}
        {nav?.launchUrl && (
          <a href={nav.launchUrl} className="pp-nav-launch" target="_blank" rel="noopener noreferrer">
            Launch App →
          </a>
        )}
      </div>
    </nav>
  )
}

function Hero({ hero }) {
  if (!hero) return null
  return (
    <section className="pp-hero">
      <div className="pp-hero-inner">
        {hero.badge && <div className="pp-badge">{hero.badge}</div>}
        <h1>
          {hero.title}
          {hero.titleHighlight && <><br /><span>{hero.titleHighlight}</span></>}
        </h1>
        {hero.paragraphs?.map((p, i) => <p key={i}>{renderInline(p)}</p>)}
        {hero.points?.length > 0 && (
          <div className="pp-points">
            {hero.points.map((pt, i) => (
              <div key={i} className="pp-point">
                <div className="pp-point-icon">{pt.icon}</div>
                <div>
                  <strong>{pt.title}</strong>
                  <p>{renderInline(pt.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {hero.ctas?.length > 0 && (
          <div className="pp-hero-actions">
            {hero.ctas.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                className={cta.primary ? 'pp-cta' : 'pp-cta-secondary'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Demo({ demo }) {
  if (!demo) return null
  const shots = demo.screenshots ?? []
  return (
    <section className="pp-demo">
      <div className="pp-section-inner">
        {demo.label && <div className="pp-section-label">{demo.label}</div>}
        {demo.title && <h2>{demo.title}</h2>}
        {demo.subtitle && <p className="pp-section-sub">{demo.subtitle}</p>}
        {shots.length > 0 ? (
          <div className="pp-shots">
            {shots.map((shot, i) => (
              <figure key={i} className="pp-shot">
                <img src={shot.src} alt={shot.alt || ''} loading="lazy" />
                {shot.caption && <figcaption>{shot.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : (
          <div className="pp-shot-placeholder">
            <p>{demo.placeholderText || 'Screenshots coming soon'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function HowItWorks({ howItWorks }) {
  if (!howItWorks?.steps?.length) return null
  return (
    <section className="pp-how">
      <div className="pp-section-inner">
        {howItWorks.label && <div className="pp-section-label">{howItWorks.label}</div>}
        {howItWorks.title && <h2>{howItWorks.title}</h2>}
        {howItWorks.subtitle && <p className="pp-section-sub">{howItWorks.subtitle}</p>}
        <div className="pp-steps">
          {howItWorks.steps.map((step, i) => (
            <div key={i} className="pp-step">
              <div className="pp-step-num">{step.num}</div>
              <div>
                <strong>{step.title}</strong>
                <p>{renderInline(step.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Tech({ tech }) {
  if (!tech?.categories?.length) return null
  return (
    <section className="pp-tech">
      <div className="pp-section-inner">
        {tech.label && <div className="pp-section-label">{tech.label}</div>}
        {tech.title && <h2>{tech.title}</h2>}
        {tech.subtitle && <p className="pp-section-sub">{tech.subtitle}</p>}
        <div className="pp-tech-grid">
          {tech.categories.map((cat, i) => (
            <div key={i} className="pp-tech-card">
              <div className="pp-tech-category">{cat.category}</div>
              <ul>
                {cat.items.map((item, j) => (
                  <li key={j}>
                    <span className="dot" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProjectPage({ project }) {
  if (!project) return null
  return (
    <>
      <Nav nav={project.nav} />
      <Hero hero={project.hero} />
      <Demo demo={project.demo} />
      <HowItWorks howItWorks={project.howItWorks} />
      <Tech tech={project.tech} />
      <footer className="pp-footer">
        <Link to="/" className="pp-footer-brand">Data<span>Flex</span>Lab</Link>
        <div className="pp-footer-copy">© {new Date().getFullYear()} DataFlexLab. All rights reserved.</div>
      </footer>
    </>
  )
}
