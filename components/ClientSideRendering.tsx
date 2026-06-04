'use client'

import React, { useState } from 'react'

interface Email {
  id: number
  from: string
  subject: string
  time: string
  read: boolean
}

export default function ClientSideRendering() {
  // Playground state
  const [toggle, setToggle] = useState<boolean>(false)

  // SPA Gmail Demo state
  const [emails, setEmails] = useState<Email[]>([
    { id: 1, from: 'Vercel Team', subject: 'Your project nextjs-notes is deployed!', time: '10:42 AM', read: true },
    { id: 2, from: 'Dan Abramov', subject: 'Thoughts on Server Components vs. Client Components', time: '9:15 AM', read: false },
  ])
  const [isFetching, setIsFetching] = useState(false)
  const [networkLog, setNetworkLog] = useState<string[]>([])

  const addEmailSim = () => {
    if (isFetching) return
    setIsFetching(true)
    setNetworkLog((prev) => [...prev, '🌐 GET /api/emails (Fetching JSON data only...)'])
    
    setTimeout(() => {
      const newEmail: Email = {
        id: Date.now(),
        from: 'Next.js Bots',
        subject: `Interactive SPA Update #${emails.length - 1} - dynamic content fetch!`,
        time: 'Just now',
        read: false
      }
      setEmails((prev) => [newEmail, ...prev])
      setIsFetching(false)
      setNetworkLog((prev) => [...prev, '✅ 200 OK (Received 1 new email object - 0.2KB)'])
    }, 1200)
  }

  return (
    <div className="env-section">
      <div className="env-notes card-style">
        <p>
          Think of a website that offers a highly interactive, seamless, and dynamic user experience like YouTube and Airbnb. Client-side rendering (CSR) plays a significant role in making such experiences possible.
        </p>
        <p>
          In Next.js, client-side can be implemented explicitly through client components, an opt-in feature that allows developers to designate specific components to be rendered on the client.
        </p>
        <p>
          In a later lesson, we’ll dive into the details of client components, but for now, know that you can define a client component as you would a regular React component with a <code>&apos;use client&apos;</code> directive. This directive specifies that the component and its children components should be rendered on the client side.
        </p>
      </div>

      {/* Code Playground */}
      <div className="csr-playground-box">
        <div className="diagram-header">
          <h3>Interactive Code Sandbox</h3>
          <p>Click the interactive toggle box on the right to see the live rendering and how React updates state inside the client.</p>
        </div>

        <div className="sandbox-grid">
          {/* Code Window */}
          <div className="code-wrap" style={{ margin: 0 }}>
            <div className="code-head">
              <div className="c-dots">
                <div className="c-dot" style={{ background: '#ff5f57' }} />
                <div className="c-dot" style={{ background: '#febc2e' }} />
                <div className="c-dot" style={{ background: '#28c840' }} />
              </div>
              <div className="c-file">components/ToggleBox.tsx</div>
              <div className="c-tag" style={{ background: 'rgba(6,182,212,0.2)', color: 'var(--cyan-l)' }}>CLIENT</div>
            </div>
            <pre style={{ margin: 0 }}>
              <span className="dr">&apos;use client&apos;</span>{'\n'}
              <span className="kw">import</span>{' React, { useState } '}<span className="kw">from</span>{' '}<span className="str">&apos;react&apos;</span>{'\n\n'}
              <span className="kw">export default function</span>{' '}<span className="fn">Page</span>{'() {\n'}
              {'  '}<span className="kw">const</span>{' [toggle, setToggle] = '}<span className="fn">useState</span>{'<'}<span className="kw">boolean</span>{'>('}
              <span style={{ 
                background: 'rgba(6,182,212,0.15)', 
                border: '1px solid rgba(6,182,212,0.3)',
                padding: '1px 4px', 
                borderRadius: '3px',
                color: '#fff',
                fontFamily: 'var(--font-mono), monospace'
              }}>{toggle ? 'true' : 'false'}</span>{')\n\n'}
              {'  '}<span className="kw">return</span>{' (\n'}
              {'    <'}<span className="tg">div</span>{' '}<span className="at">onClick</span>{'={() => '}<span className="fn">setToggle</span>{'(!toggle)}>\n'}
              {'      {toggle ? '}
              <span style={toggle ? { background: 'rgba(16, 185, 129, 0.25)', border: '1px solid var(--green-l)', padding: '1px 3px', borderRadius: '3px', color: 'var(--green-l)' } : {}}>&apos;True&apos;</span>
              {' : '}
              <span style={!toggle ? { background: 'rgba(239, 68, 68, 0.25)', border: '1px solid var(--red-l)', padding: '1px 3px', borderRadius: '3px', color: 'var(--red-l)' } : {}}>&apos;False&apos;</span>
              {'}\n'}
              {'    </'}<span className="tg">div</span>{'>\n'}
              {'  )\n}'}
            </pre>
          </div>

          {/* Live Preview Window */}
          <div className="sandbox-preview">
            <div className="preview-header">
              <span className="preview-dot" /> Live Interactive Preview
            </div>
            <div className="preview-body">
              <div 
                className={`interactive-toggle-card${toggle ? ' toggled-true' : ' toggled-false'}`}
                onClick={() => setToggle(!toggle)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setToggle(!toggle) }}
              >
                <div className="toggle-indicator">
                  <div className="toggle-knob" />
                </div>
                <span className="toggle-card-label">
                  Rendered Value: <strong className="toggle-val">{toggle ? 'True' : 'False'}</strong>
                </span>
                <span className="toggle-hint">Click card to fire onClick events</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPA Inbox Demo */}
      <div className="spa-demo-box">
        <div className="diagram-header">
          <h3>Dynamic Single Page Application (SPA) Demo</h3>
          <p>Simulate how client-side applications fetch raw JSON data and update the UI instantly without reloading the entire page.</p>
        </div>

        <div className="spa-grid">
          {/* Mock Inbox UI */}
          <div className="mock-inbox">
            <div className="inbox-header">
              <div className="inbox-title">✉️ MailBox (SPA Client)</div>
              <button 
                className="inbox-btn" 
                onClick={addEmailSim}
                disabled={isFetching}
              >
                {isFetching ? 'Fetching...' : '📥 Simulate New Email'}
              </button>
            </div>
            <div className="inbox-list">
              {emails.map((e) => (
                <div key={e.id} className={`inbox-row${e.read ? ' read' : ' unread'} animate-fade-in`}>
                  <div className="inbox-dot" />
                  <div className="inbox-sender">{e.from}</div>
                  <div className="inbox-subject">{e.subject}</div>
                  <div className="inbox-time">{e.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Network console log logs */}
          <div className="mock-network-console">
            <div className="console-head">🛰️ Network console (JSON data only)</div>
            <div className="console-body">
              {networkLog.length === 0 ? (
                <div className="console-empty">Idle. Click &quot;Simulate New Email&quot; to see XHR/fetch network requests.</div>
              ) : (
                networkLog.map((log, idx) => (
                  <div key={idx} className="console-log-line font-mono">
                    {log}
                  </div>
                ))
              )}
              {isFetching && <div className="console-log-line font-mono text-cyan animate-pulse">⏳ waiting for server response...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
