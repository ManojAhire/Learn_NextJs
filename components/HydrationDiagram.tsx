'use client'

import React, { useState } from 'react'

const stages = [
  { id: 1, icon: '🖥️', title: 'Server Renders', sub: 'HTML built\non server' },
  { id: 2, icon: '📦', title: 'HTML + JS Sent', sub: 'Browser gets\nstatic HTML & JS' },
  { id: 3, icon: '⚡', title: 'JS Executes', sub: 'React runs\nin browser' },
  { id: 4, icon: '💧', title: 'Hydration', sub: 'Events attached\npage interactive' },
  { id: 5, icon: '✅', title: 'Reconciliation', sub: 'Client & server\noutput synced' },
]

const details: Record<number, string> = {
  1: '<strong>Stage 1 — Server builds the page:</strong> Next.js runs your code on the server and creates the full HTML. So when you open the page in the browser, you can already see everything — even before any JavaScript has run.',
  2: '<strong>Stage 2 — Server sends both HTML and JS to your browser:</strong> The browser gets the finished HTML (so the page looks ready) <em>and</em> a JavaScript file. The HTML shows the content, but the page is not clickable yet.',
  3: '<strong>Stage 3 — JavaScript starts running in your browser:</strong> The browser runs the JavaScript file. React wakes up inside the browser and looks at the HTML that is already on screen.',
  4: '<strong>Stage 4 — Hydration 💧:</strong> React goes through the HTML and connects all the click events, form inputs, and interactions to it. Now the page is fully alive — you can click buttons, type in forms, everything works!',
  5: '<strong>Stage 5 — Double-check (Reconciliation):</strong> React checks that what the server built and what it sees in the browser match exactly. If they are different, you get a "hydration error". This step makes sure your page looks the same for everyone.',
}

export default function HydrationDiagram() {
  const [active, setActive] = useState(1)

  return (
    <div className="hydration-wrap">
      <div className="h-stages">
        {stages.map((s, i) => (
          <React.Fragment key={s.id}>
            <div
              className={`h-stage${active === s.id ? ' lit' : ''}`}
              onClick={() => setActive(s.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setActive(s.id) }}
              aria-pressed={active === s.id}
            >
              <div className="h-si">{s.icon}</div>
              <div className="h-st">{s.title}</div>
              <div className="h-ss">{s.sub}</div>
            </div>
            {i < stages.length - 1 && <div className="h-arr">→</div>}
          </React.Fragment>
        ))}
      </div>
      <div className="h-detail" dangerouslySetInnerHTML={{ __html: details[active] }} />
    </div>
  )
}
