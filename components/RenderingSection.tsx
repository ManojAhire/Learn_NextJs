'use client'

import { useState } from 'react'

export default function RenderingSection() {
  const [mode, setMode] = useState<'ssr' | 'csr'>('ssr')

  return (
    <>
      <div className="render-toggle">
        <div className={`rtab${mode === 'ssr' ? ' a-ssr' : ''}`} onClick={() => setMode('ssr')}>🖥️ Server-Side (SSR)</div>
        <div className={`rtab${mode === 'csr' ? ' a-csr' : ''}`} onClick={() => setMode('csr')}>💻 Client-Side (CSR)</div>
      </div>

      {/* SSR Flow */}
      {mode === 'ssr' && (
        <div className="flow-box">
          <div className="flow-box-title" style={{ color: 'var(--purple-l)' }}>SERVER-SIDE RENDERING — Next.js does this by default</div>
          <div className="flow-steps">
            {[
              { from: 'You', to: 'Server', fromCol: '#8888a8', toCol: 'var(--purple-l)', arrCol: 'var(--purple)', desc: 'You type a URL and hit enter → your browser asks the Next.js server for the page' },
              { from: 'Server', to: 'Builds page', fromCol: 'var(--purple-l)', toCol: 'var(--amber-l)', arrCol: 'var(--purple)', desc: 'The server runs your React code, fetches any data needed, and builds the full page' },
              { from: 'Server', to: 'Browser', fromCol: 'var(--amber-l)', toCol: '#8888a8', arrCol: 'var(--amber)', desc: 'The server sends the ready-made HTML — your browser shows it right away, no waiting' },
              { from: 'Browser', to: 'Page alive!', fromCol: '#8888a8', toCol: 'var(--green-l)', arrCol: 'var(--green)', desc: 'JavaScript loads in the background → React makes the page clickable & interactive (this is Hydration)' },
            ].map((s, i) => (
              <div key={i} className="fl-step">
                <div className="fl-n" style={{ background: 'rgba(124,58,237,0.2)', color: 'var(--purple-l)' }}>{i + 1}</div>
                <div className="fl-mid">
                  <div className="fl-from" style={{ color: s.fromCol }}>{s.from}</div>
                  <div className="fl-arr" style={{ background: s.arrCol, color: s.arrCol }} />
                  <div className="fl-to" style={{ color: s.toCol }}>{s.to}</div>
                </div>
                <div className="fl-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="flow-result" style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(124,58,237,0.22)' }}>
            <span style={{ fontSize: '18px' }}>🏆</span>
            <div>
              <h4 style={{ color: 'var(--purple-l)' }}>Page loads fast · Google can read it · Works by default</h4>
              <p>You don&apos;t need to write anything special — every component in Next.js is a server component by default.</p>
            </div>
          </div>
          <div className="code-wrap">
            <div className="code-head">
              <div className="c-dots"><div className="c-dot" style={{ background: '#ff5f57' }} /><div className="c-dot" style={{ background: '#febc2e' }} /><div className="c-dot" style={{ background: '#28c840' }} /></div>
              <div className="c-file">app/page.tsx</div>
              <div className="c-tag" style={{ background: 'rgba(124,58,237,0.2)', color: 'var(--purple-l)' }}>SERVER COMPONENT</div>
            </div>
            <pre><span className="cm">{'// ✅ Nothing special needed — server by default!'}</span>{'\n'}<span className="kw">export default function</span> <span className="fn">HomePage</span>{'() {\n  '}<span className="kw">return</span>{' <'}<span className="tg">div</span>{'>'}<span>Hello from the Server!</span>{'</'}<span className="tg">div</span>{'>\n}'}</pre>
          </div>
        </div>
      )}

      {/* CSR Flow */}
      {mode === 'csr' && (
        <div className="flow-box">
          <div className="flow-box-title" style={{ color: 'var(--cyan-l)' }}>CLIENT-SIDE RENDERING — Turn it on by writing <code style={{ color: 'var(--amber-l)' }}>&apos;use client&apos;</code> at the top</div>
          <div className="flow-steps">
            {[
              { from: 'You', to: 'Server', fromCol: '#8888a8', toCol: 'var(--cyan-l)', arrCol: 'var(--cyan)', desc: 'You visit the page → server sends a nearly empty HTML page + a JavaScript file' },
              { from: 'JS downloads', to: 'Browser', fromCol: 'var(--cyan-l)', toCol: 'var(--amber-l)', arrCol: 'var(--cyan)', desc: 'Your browser downloads the JavaScript file and starts running it' },
              { from: 'React', to: 'Page ready', fromCol: 'var(--amber-l)', toCol: 'var(--green-l)', arrCol: 'var(--green)', desc: 'React builds the page inside your browser → you can now click, type, interact' },
            ].map((s, i) => (
              <div key={i} className="fl-step">
                <div className="fl-n" style={{ background: 'rgba(6,182,212,0.2)', color: 'var(--cyan-l)' }}>{i + 1}</div>
                <div className="fl-mid">
                  <div className="fl-from" style={{ color: s.fromCol }}>{s.from}</div>
                  <div className="fl-arr" style={{ background: s.arrCol, color: s.arrCol }} />
                  <div className="fl-to" style={{ color: s.toCol }}>{s.to}</div>
                </div>
                <div className="fl-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="flow-result" style={{ background: 'rgba(6,182,212,0.07)', borderColor: 'rgba(6,182,212,0.22)' }}>
            <span style={{ fontSize: '18px' }}>🎮</span>
            <div>
              <h4 style={{ color: 'var(--cyan-l)' }}>Buttons work · Forms work · Live updates work</h4>
              <p>Use this when your component needs to react to what the user does — clicks, typing, etc.</p>
            </div>
          </div>
          <div className="code-wrap">
            <div className="code-head">
              <div className="c-dots"><div className="c-dot" style={{ background: '#ff5f57' }} /><div className="c-dot" style={{ background: '#febc2e' }} /><div className="c-dot" style={{ background: '#28c840' }} /></div>
              <div className="c-file">app/components/Counter.tsx</div>
              <div className="c-tag" style={{ background: 'rgba(6,182,212,0.2)', color: 'var(--cyan-l)' }}>CLIENT COMPONENT</div>
            </div>
            <pre><span className="dr">&apos;use client&apos;</span>{'  '}<span className="cm">{'// ← This one line turns on CSR'}</span>{'\n\n'}<span className="kw">import</span>{' { useState } '}<span className="kw">from</span>{' '}<span className="str">&apos;react&apos;</span>{'\n\n'}<span className="kw">export default function</span>{' '}<span className="fn">Counter</span>{'() {\n  '}<span className="kw">const</span>{' [count, setCount] = '}<span className="fn">useState</span>{'(0)\n  '}<span className="kw">return</span>{' (\n    <'}<span className="tg">button</span>{' '}<span className="at">onClick</span>{'={() => '}<span className="fn">setCount</span>{'(count + 1)}>\n      Clicks: {count}\n    </'}<span className="tg">button</span>{'>\n  )\n}'}</pre>
          </div>
        </div>
      )}

      {/* Compare */}
      <div className="split">
        <div className="split-card" style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.2)' }}>
          <h4 style={{ color: 'var(--purple-l)' }}>🖥️ Server Component — use when...</h4>
          <ul>
            <li>✅ You need to load data (from a database or an API)</li>
            <li>✅ The page just shows information — no clicking needed</li>
            <li>✅ You want Google to find and read your page (SEO)</li>
            <li>❌ Can&apos;t use useState or useEffect here</li>
            <li>❌ Can&apos;t listen to button clicks or user input here</li>
          </ul>
        </div>
        <div className="split-card" style={{ background: 'rgba(6,182,212,0.05)', borderColor: 'rgba(6,182,212,0.2)' }}>
          <h4 style={{ color: 'var(--cyan-l)' }}>💻 Client Component — use when...</h4>
          <ul>
            <li>✅ You have buttons, forms, dropdowns the user interacts with</li>
            <li>✅ You need useState, useEffect, or any React hooks</li>
            <li>✅ Something on the page changes based on what the user does</li>
            <li>❌ Sends more JavaScript to the browser (slightly heavier)</li>
            <li>❌ Google may not read it as easily on its own</li>
          </ul>
        </div>
      </div>
    </>
  )
}
