'use client'

import { useState } from 'react'

type Step = {
  id: string
  era: string
  emoji: string
  title: string
  body: string
  eg: string
  egColor: string
  detail: string
  tags: { text: string; hl?: boolean }[]
  colorClass: string
}

const steps: Step[] = [
  {
    id: 'td1', era: 'Era 1 · Early 1990s', emoji: '🌐', title: 'Static Web',
    body: 'Basic HTML pages with <strong>no interaction</strong> beyond hyperlinks. Every visitor saw the exact same page.',
    eg: 'Same HTML for every user · No personalisation', egColor: '',
    detail: "Think: Tim Berners-Lee's original site. Pure HTML, no CSS, no scripts. A document viewer — nothing more.",
    tags: [{ text: 'HTML only' }, { text: 'No JS' }, { text: 'Server = file cabinet' }, { text: 'Read-only web', hl: true }],
    colorClass: 'ts1',
  },
  {
    id: 'td2', era: 'Era 2 · Late 1990s – 2000s', emoji: '⚡', title: 'Dynamic Interactions',
    body: 'XHR / Ajax lets the browser <strong>talk to the server in the background</strong> — updating parts of the page without a full reload.',
    eg: 'eg. Google Maps — drag to pan without reload', egColor: '#34d399',
    detail: 'XMLHttpRequest was "Web 2.0" magic. Pages felt responsive. JavaScript became essential.',
    tags: [{ text: 'XHR / Ajax' }, { text: 'Partial updates' }, { text: 'No full reload', hl: true }],
    colorClass: 'ts2',
  },
  {
    id: 'td3', era: 'Era 3 · 2000s', emoji: '🗄️', title: 'Server-Generated Content',
    body: 'Servers produce <strong>custom HTML per user</strong> — reading databases to personalise every response.',
    eg: 'eg. Amazon — recommended items, order history', egColor: '#fbbf24',
    detail: 'PHP, Rails, Django — server reads DB → renders HTML → sends full page. Every request = fresh server render.',
    tags: [{ text: 'PHP / Rails / Django' }, { text: 'DB → HTML' }, { text: 'Personalised pages', hl: true }],
    colorClass: 'ts3',
  },
  {
    id: 'td4', era: 'Era 4 · 2010 – 2015', emoji: '📱', title: 'Single Page Apps',
    body: 'HTML loads <strong>once</strong>, then JS dynamically swaps content. Browser becomes the rendering engine — fluid, app-like.',
    eg: 'eg. Early Twitter, Gmail — no page refreshes', egColor: '#f87171',
    detail: 'Angular (2010) pioneered this. Server just returns JSON. Browser handles all rendering — fast UX, but bad SEO.',
    tags: [{ text: 'Angular / Backbone' }, { text: 'JSON APIs' }, { text: 'App-like UX', hl: true }],
    colorClass: 'ts4',
  },
  {
    id: 'td5', era: 'Era 5 · 2013 → Present', emoji: '⚛️', title: 'React',
    body: '<strong>Component-based</strong> UI + Virtual DOM. Surgically re-renders only what changed. Real-time updates, zero page reload.',
    eg: 'eg. Facebook — likes & comments without reload', egColor: '#22d3ee',
    detail: 'Declarative UI. State changes re-render only the affected component tree. Composable and efficient.',
    tags: [{ text: 'Components' }, { text: 'Virtual DOM' }, { text: 'State & Props' }, { text: 'Declarative UI', hl: true }],
    colorClass: 'ts5',
  },
  {
    id: 'td6', era: 'Era 6 · 2016 → Now', emoji: '▲', title: 'Next.js',
    body: 'The <strong>best of all worlds</strong> — SSR for fast loads, CSR for interactivity, file routing, SEO, and image optimisation, all out-of-the-box.',
    eg: 'eg. Vercel, Notion, Hulu — production-grade apps', egColor: '#a78bfa',
    detail: 'Next.js wraps React and solves routing, SSR, API routes, image & font optimisation — zero config.',
    tags: [{ text: 'SSR + CSR + SSG' }, { text: 'File routing' }, { text: 'API routes' }, { text: 'Full-stack React', hl: true }],
    colorClass: 'ts6',
  },
]

export default function Timeline() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(openId === id ? null : id)

  return (
    <div className="timeline">
      {steps.map((s, i) => {
        const isOdd = i % 2 === 0
        const card = (
          <div
            key="card"
            className="t-card"
            onClick={() => toggle(s.id)}
            role="button"
            tabIndex={0}
            aria-expanded={openId === s.id}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(s.id) } }}
          >
            <div className="t-era">{s.era}</div>
            <h3>{s.emoji} {s.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: s.body }} />
            <div className="t-eg">
              <span className="t-eg-dot" style={s.egColor ? { background: s.egColor } : {}} />
              {s.eg}
            </div>
            <div className={`t-detail${openId === s.id ? ' open' : ''}`}>
              <div className="t-detail-inner">
                <p>{s.detail}</p>
                <div className="tag-row">
                  {s.tags.map((t) => (
                    <span key={t.text} className={`tag${t.hl ? ' hl' : ''}`}>{t.text}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="click-hint">tap to expand</div>
          </div>
        )

        const dot = (
          <div key="dot" className="t-dot-wrap">
            <div className="t-dot" style={i === 5 ? {
              background: 'linear-gradient(135deg,rgba(124,58,237,0.4),rgba(6,182,212,0.28))',
              borderColor: 'rgba(124,58,237,0.75)',
              boxShadow: '0 0 20px rgba(124,58,237,0.45)',
            } : {}}>
              {s.emoji}
            </div>
            <div className="t-dot-num">0{i + 1}</div>
          </div>
        )

        const ghost = <div key="ghost" className="t-ghost" />

        return (
          <div key={s.id} className={`t-step ${s.colorClass} fi`} id={i === 0 ? 'static-web' : i === 1 ? 'dynamic' : i === 2 ? 'server-gen' : i === 3 ? 'spa' : i === 4 ? 'react' : 'nextjs-intro'}>
            {isOdd ? [card, dot, ghost] : [ghost, dot, card]}
          </div>
        )
      })}
    </div>
  )
}
