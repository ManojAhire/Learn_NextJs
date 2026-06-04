'use client'

import React, { useState } from 'react'

interface TermTooltipProps {
  term: string
  tooltipText: string
}

function TermTooltip({ term, tooltipText }: TermTooltipProps) {
  const [visible, setVisible] = useState(false)
  
  return (
    <span 
      className="tooltip-trigger"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(!visible)}
    >
      {term}
      {visible && (
        <span className="tooltip-bubble">
          {tooltipText}
        </span>
      )}
    </span>
  )
}

const ssrSubsets = [
  {
    id: 'static',
    title: 'Static Rendering',
    time: 'Build Time (Once)',
    desc: 'HTML is rendered once during project build. The result is cached and served instantly to everyone via a CDN.',
    bestFor: 'Blogs, marketing pages, landing pages, documentation.',
    color: 'var(--green-l)',
    badgeBg: 'rgba(16,185,129,0.15)',
    anim: '📦 Serve Cached HTML'
  },
  {
    id: 'dynamic',
    title: 'Dynamic Rendering',
    time: 'Request Time (Every visit)',
    desc: 'HTML is generated on the server for each user request. Best for personalized pages reading fresh database data.',
    bestFor: 'User dashboards, banking portals, live social feeds.',
    color: 'var(--amber-l)',
    badgeBg: 'rgba(245,158,11,0.15)',
    anim: '🗄️ Fetch DB → Render on server'
  },
  {
    id: 'streaming',
    title: 'Streaming',
    time: 'Progressive loading',
    desc: 'The server renders pages in chunks. Highly critical HTML parts load first, while slow data-fetching components stream in chunks as they resolve.',
    bestFor: 'Web pages with slow-loading API modules or dashboard sections.',
    color: 'var(--cyan-l)',
    badgeBg: 'rgba(6,182,212,0.15)',
    anim: '⚡ Stream chunks progressively'
  }
]

export default function ServerSideRendering() {
  const [activeSubset, setActiveSubset] = useState('static')
  const [interactiveAlert, setInteractiveAlert] = useState<string | null>(null)

  const handlePaintClick = () => {
    setInteractiveAlert("🎨 Paint Layer Active: You can see the button immediately! But wait, clicking it does not trigger code functionality yet because JavaScript hydration hasn't run. The page is in its 'first layer of paint' state!")
    setTimeout(() => setInteractiveAlert(null), 5000)
  }

  return (
    <div className="env-section">
      <div className="env-notes card-style">
        <p>
          While client-side rendering allows websites to be dynamic and interactive, constructing and loading the page all on the client’s hardware can be an expensive endeavor. A slow internet connection or slow client hardware can compound the wait time for the user, who is busy staring at nothing as the browser assembles the webpage.
        </p>
        <p>
          In server-side rendering (SSR), the webpage is assembled on the server. Offloading the rendering to the server leverages the more capable server infrastructure, reducing the load on the client’s hardware.
        </p>
        <p>
          Server-side rendering is ideal for web applications that need a lot of data fetching, search engine optimization (SEO), and speed. By moving the fetching{' '}
          <TermTooltip term="requests" tooltipText="Docs: Server-side queries to databases or third-party APIs located close to the server host." />{' '}
          closer to the database, developers reduced the latency of these requests. Sending fully rendered pages also means users can view them immediately when visiting a website, regardless of their hardware’s capabilities. The rendered pages can then be crawled and indexed by search engine bots, leading to better SEO.
        </p>
        <p>
          By default, Next.js renders components on the server side. You can define a React component without additional configurations, as Next.js automatically handles the server-side rendering.
        </p>
        <p>
          Within server-side rendering itself, Next.js offers three distinct approaches: static rendering, dynamic rendering, and streaming. In a later lesson on Server Components, we will delve deeper into these subsets and their specific applications.
        </p>
        <p>
          At this stage, while the page is visible and contains elements like buttons and form fields, they are not fully interactive. In a sense, it is like a fresh{' '}
          <span style={{ borderBottom: '1px dotted var(--purple-l)', cursor: 'pointer', color: 'var(--purple-l)' }} onClick={handlePaintClick}>
            first layer of paint
          </span>{' '}
          on our page. In the next exercise, we’ll be discussing what comes after to make the web application interactive.
        </p>
      </div>

      {/* Subsets selector */}
      <div className="ssr-subsets-box">
        <div className="diagram-header">
          <h3>Next.js SSR Subsets</h3>
          <p>Next.js offers three core environments under Server-Side Rendering. Click each card to see the details.</p>
        </div>

        <div className="subsets-grid">
          {/* Card list */}
          <div className="subsets-cards">
            {ssrSubsets.map((s) => (
              <div 
                key={s.id} 
                className={`subset-card${activeSubset === s.id ? ' active' : ''}`}
                onClick={() => setActiveSubset(s.id)}
                style={activeSubset === s.id ? { borderColor: s.color } : {}}
              >
                <div className="subset-title-row">
                  <h4>{s.title}</h4>
                  <span className="subset-badge" style={{ background: s.badgeBg, color: s.color }}>
                    {s.time}
                  </span>
                </div>
                <p className="subset-summary">{s.desc.substring(0, 75)}...</p>
              </div>
            ))}
          </div>

          {/* Details screen */}
          <div className="subset-detail-display">
            {ssrSubsets.map((s) => {
              if (s.id !== activeSubset) return null
              return (
                <div key={s.id} className="subset-detail-content animate-fade-in">
                  <h4 style={{ color: s.color }}>{s.title} ({s.time})</h4>
                  <p className="subset-desc">{s.desc}</p>
                  <div className="subset-best-for">
                    <strong>🏆 Best for:</strong> {s.bestFor}
                  </div>
                  <div className="subset-animation-mock font-mono">
                    <span className="subset-anim-text animate-pulse">{s.anim}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bots SEO and Paint Layer Sim */}
      <div className="seo-paint-box">
        <div className="diagram-header">
          <h3>SEO Bot Indexing &amp; Paint Layer Analogy</h3>
          <p>SSR outputs static HTML first, providing instant visibility to users and search engines.</p>
        </div>

        <div className="seo-grid">
          {/* Bot crawler visual */}
          <div className="bot-card">
            <div className="bot-header">
              <span className="bot-avatar">🤖</span>
              <div className="bot-details">
                <span className="bot-name">Googlebot / Search crawler</span>
                <span className="bot-status text-green">Status: Crawling static HTML</span>
              </div>
            </div>
            <div className="bot-log-console font-mono">
              <div>🔍 Googlebot reads index page...</div>
              <div className="text-green">✓ Found structural text nodes: &quot;NextJS Notes...&quot;</div>
              <div className="text-green">✓ Found 10 core anchors/links.</div>
              <div>✓ Indexing complete immediately (no JS execution delay!)</div>
            </div>
          </div>

          {/* Paint layer box */}
          <div className="paint-layer-card">
            <div className="paint-header">🎨 Static Paint Preview</div>
            <div className="paint-body">
              <p>Everything is painted on the screen right away, but not yet interactive:</p>
              <button className="paint-dummy-btn" onClick={handlePaintClick}>
                Click Me (Button Node)
              </button>
              {interactiveAlert && (
                <div className="paint-alert animate-fade-in">
                  {interactiveAlert}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
