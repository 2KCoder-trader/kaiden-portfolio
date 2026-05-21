import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProjectCarousel.css'

const CARD_WIDTH = 340
const CARD_GAP = 80
const AUTO_ROTATE_DEG_PER_SEC = 6
const AUTO_ROTATE_IDLE_MS = 2500
const DRAG_DEG_PER_PX = 0.4
const CLICK_THRESHOLD_PX = 6

function mod(n, m) {
  return ((n % m) + m) % m
}

export default function ProjectCarousel({ projects }) {
  const navigate = useNavigate()
  const ringRef = useRef(null)
  const stageRef = useRef(null)

  const n = projects.length
  const step = 360 / n
  const radius = Math.round(((CARD_WIDTH + CARD_GAP) / 2) / Math.tan(Math.PI / n))

  const rotationRef = useRef(0)
  const targetRef = useRef(0)
  const lastInteractionRef = useRef(0)
  const lastFrameRef = useRef(0)
  const reducedMotionRef = useRef(false)
  const pausedRef = useRef(false)

  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startRotation: 0,
    totalDelta: 0,
  })

  const [activeIndex, setActiveIndex] = useState(0)

  const applyTransform = useCallback(() => {
    const ring = ringRef.current
    if (!ring) return
    const r = rotationRef.current
    ring.style.transform = `translateZ(${-radius}px) rotateY(${r}deg)`

    const cards = ring.children
    for (let i = 0; i < cards.length; i++) {
      const cardAngle = i * step
      const rel = ((cardAngle + r) % 360 + 540) % 360 - 180
      const absRel = Math.abs(rel)
      const opacity = Math.max(0.18, Math.cos((rel * Math.PI) / 180) * 0.6 + 0.4)
      const scale = 0.78 + 0.22 * Math.max(0, Math.cos((rel * Math.PI) / 180))
      const card = cards[i]
      card.style.opacity = opacity.toFixed(3)
      card.style.setProperty('--card-scale', scale.toFixed(3))
      card.classList.toggle('is-front', absRel < step / 2)
      card.classList.toggle('is-far', absRel > 90)
    }

    const front = mod(Math.round(-r / step), n)
    setActiveIndex((prev) => (prev === front ? prev : front))
  }, [n, radius, step])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lastInteractionRef.current = performance.now()
    lastFrameRef.current = performance.now()
    applyTransform()
    let raf = 0

    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastFrameRef.current) / 1000)
      lastFrameRef.current = now

      const idle = now - lastInteractionRef.current > AUTO_ROTATE_IDLE_MS
      const autoActive = idle && !dragRef.current.active && !pausedRef.current && !reducedMotionRef.current

      if (autoActive) {
        targetRef.current -= AUTO_ROTATE_DEG_PER_SEC * dt
      }

      const diff = targetRef.current - rotationRef.current
      if (Math.abs(diff) > 0.01) {
        const easing = reducedMotionRef.current ? 1 : Math.min(1, dt * 8)
        rotationRef.current += diff * easing
        applyTransform()
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [applyTransform])

  const snapToNearest = useCallback(() => {
    const r = rotationRef.current
    const nearest = Math.round(r / step) * step
    targetRef.current = nearest
  }, [step])

  const rotateBy = useCallback((deltaDeg) => {
    targetRef.current += deltaDeg
    lastInteractionRef.current = performance.now()
  }, [])

  const rotateToIndex = useCallback((i) => {
    const r = rotationRef.current
    const targetRaw = -i * step
    let delta = ((targetRaw - r) % 360 + 540) % 360 - 180
    targetRef.current = r + delta
    lastInteractionRef.current = performance.now()
  }, [step])

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    dragRef.current = {
      active: true,
      captured: false,
      pointerId: e.pointerId,
      startX: e.clientX,
      startRotation: rotationRef.current,
      totalDelta: 0,
    }
    targetRef.current = rotationRef.current
    lastInteractionRef.current = performance.now()
  }

  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.active || d.pointerId !== e.pointerId) return
    const dx = e.clientX - d.startX
    d.totalDelta = Math.abs(dx)
    if (!d.captured && d.totalDelta > CLICK_THRESHOLD_PX) {
      d.captured = true
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    if (d.captured) {
      rotationRef.current = d.startRotation + dx * DRAG_DEG_PER_PX
      targetRef.current = rotationRef.current
      applyTransform()
    }
    lastInteractionRef.current = performance.now()
  }

  const endDrag = (e) => {
    const d = dragRef.current
    if (!d.active) return
    d.active = false
    if (d.captured) {
      e.currentTarget.releasePointerCapture?.(d.pointerId)
      snapToNearest()
    }
    lastInteractionRef.current = performance.now()
  }

  const onCardClick = (e, i, slug) => {
    if (dragRef.current.totalDelta > CLICK_THRESHOLD_PX) {
      e.preventDefault()
      return
    }
    if (i !== activeIndex) {
      e.preventDefault()
      rotateToIndex(i)
      return
    }
    e.preventDefault()
    navigate(`/${slug}`)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      rotateBy(step)
      targetRef.current = Math.round(targetRef.current / step) * step
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rotateBy(-step)
      targetRef.current = Math.round(targetRef.current / step) * step
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/${projects[activeIndex].slug}`)
    }
  }

  const front = projects[activeIndex]

  return (
    <div className="pc-wrap">
      <div
        ref={stageRef}
        className="pc-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false; lastInteractionRef.current = performance.now() }}
        onFocus={() => { pausedRef.current = true }}
        onBlur={() => { pausedRef.current = false }}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        <div ref={ringRef} className="pc-ring" style={{ width: CARD_WIDTH }}>
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              draggable={false}
              className="pc-card"
              onClick={(e) => onCardClick(e, i, p.slug)}
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${radius}px) scale(var(--card-scale, 1))`,
                ...(p.theme ? {
                  '--accent': p.theme.accent,
                  '--accent-2': p.theme.accent2,
                  '--accent-glow': p.theme.accentGlow,
                  '--border-glow': p.theme.borderGlow,
                } : null),
              }}
              aria-hidden={i !== activeIndex}
              tabIndex={-1}
            >
              <div className="project-card-header">
                <div className="project-icon">{p.icon}</div>
                {p.tag && <span className="project-tag">{p.tag}</span>}
              </div>
              <div className="project-name">{p.name}</div>
              <p className="project-desc">{p.shortDesc}</p>
              <div className="project-meta">
                {p.chips?.map((chip) => (
                  <span key={chip} className="project-chip">{chip}</span>
                ))}
              </div>
              <div className="project-arrow">
                More Info <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pc-controls">
        <button
          type="button"
          className="pc-nav"
          aria-label="Previous project"
          onClick={() => { rotateBy(step); targetRef.current = Math.round(targetRef.current / step) * step }}
        >
          ←
        </button>
        <div className="pc-dots" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={p.name}
              className={`pc-dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => rotateToIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="pc-nav"
          aria-label="Next project"
          onClick={() => { rotateBy(-step); targetRef.current = Math.round(targetRef.current / step) * step }}
        >
          →
        </button>
      </div>

      <div className="pc-status" aria-live="polite">
        {front?.name}
      </div>
    </div>
  )
}
