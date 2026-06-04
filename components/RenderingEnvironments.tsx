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

interface StepVisualProps {
  mode: 'csr' | 'ssr'
  step: number
}

function StepVisual({ mode, step }: StepVisualProps) {
  // Determine LEDs color based on mode
  const ledClass = mode === 'ssr' ? 'purple' : 'green'
  const ledBlinkClass = mode === 'ssr' ? 'purple-blink' : 'green-blink'

  return (
    <div className="card-visual-canvas">
      {/* Server Device */}
      <div className="visual-server">
        <div className="server-case">
          <div className={`led ${ledClass} ${step === 2 || step === 3 || step === 4 || step === 5 ? ledBlinkClass : ''}`} />
          <div className={`led ${ledClass}`} />
          <div className="led amber" />
          <div className={`led ${ledClass} ${step === 2 || step === 3 || step === 4 || step === 5 ? ledBlinkClass : ''}`} />
        </div>
        <div className="server-label">Server</div>
      </div>

      {/* Laptop Device */}
      <div className="visual-laptop">
        <div className={`laptop-screen ${mode === 'csr' && step === 8 ? 'white-screen' : ''} ${mode === 'ssr' && step === 8 ? 'white-screen' : ''}`}>
          {/* CSR rendering animation */}
          {mode === 'csr' && step === 7 && (
            <div className="screen-spinner-wrap">
              <div className="spinner" />
              <span className="search-glass">🔍</span>
            </div>
          )}
          {/* SSR instant rendering / CSR final step */}
          {((mode === 'csr' && step === 8) || (mode === 'ssr' && step === 8)) && (
            <div className="screen-website animate-fade-in">
              <span className="web-text">Website</span>
            </div>
          )}
        </div>
        <div className="laptop-base" />
        <div className="laptop-label">Browser</div>
      </div>

      {/* Step Specific Floating Objects */}
      {/* Mode: CSR */}
      {mode === 'csr' && (
        <>
          {step === 1 && <div className="floating-pill request-pill pos-mid animate-pulse">REQUEST</div>}
          {step === 2 && <div className="floating-pill request-pill pos-at-server">REQUEST</div>}
          {step === 3 && (
            <div className="floating-pill compose-docs pos-at-server-docs">
              <span className="doc-emoji">📄</span>
              <span className="doc-emoji">📄</span>
            </div>
          )}
          {step === 4 && <div className="floating-pill response-pill pos-mid">RESPONSE</div>}
          {step === 5 && <div className="floating-pill response-pill pos-at-laptop">RESPONSE</div>}
          {step === 6 && (
            <div className="floating-pill compose-docs pos-above-laptop">
              <span className="doc-emoji">📄</span>
              <span className="doc-emoji animate-bounce">📄</span>
            </div>
          )}
        </>
      )}

      {/* Mode: SSR */}
      {mode === 'ssr' && (
        <>
          {step === 1 && <div className="floating-pill request-pill pos-mid animate-pulse">REQUEST</div>}
          {step === 2 && <div className="floating-pill request-pill pos-at-server">REQUEST</div>}
          {step === 3 && (
            <div className="floating-pill compose-docs pos-at-server-docs">
              <span className="doc-emoji">🗄️</span>
              <span className="doc-emoji animate-pulse">📄</span>
            </div>
          )}
          {step === 4 && (
            <div className="floating-pill website-pill pos-at-server-web animate-fade-in">
              <span className="web-text-sm">Website</span>
            </div>
          )}
          {step === 5 && <div className="floating-pill response-pill pos-at-server-resp">RESPONSE</div>}
          {step === 6 && <div className="floating-pill response-pill pos-mid">RESPONSE</div>}
          {step === 7 && <div className="floating-pill response-pill pos-at-laptop">RESPONSE</div>}
        </>
      )}
    </div>
  )
}

const csrSteps = [
  {
    step: 1,
    title: 'Client Sends Request',
    desc: "The user's browser sends a request to the website's server when the user visits a website.",
  },
  {
    step: 2,
    title: 'Server Receives Request',
    desc: 'The server receives the request from the browser and prepares to act.',
  },
  {
    step: 3,
    title: 'Server Composes Response',
    desc: 'The server composes a response containing the instructions (HTML shell + JS scripts) for the browser to render the components.',
  },
  {
    step: 4,
    title: 'Server Sends Response',
    desc: "The server sends the compiled response back to the user's browser.",
  },
  {
    step: 5,
    title: 'Browser Receives Response',
    desc: "The user's browser receives the response containing the template HTML and JavaScript files.",
  },
  {
    step: 6,
    title: 'Browser Processes Response',
    desc: 'The browser processes the received files and prepares to execute the scripts to construct the page.',
  },
  {
    step: 7,
    title: 'Browser Builds & Renders',
    desc: 'The browser executes JavaScript and builds the page dynamically, rendering components into the DOM.',
  },
  {
    step: 8,
    title: 'Display Website',
    desc: "The user's browser displays the fully rendered and interactive webpage to the user.",
  },
]

const ssrSteps = [
  {
    step: 1,
    title: 'Client Sends Request',
    desc: "The user's browser sends a request to the website's server when the user visits a website.",
  },
  {
    step: 2,
    title: 'Server Receives Request',
    desc: 'The server receives the request from the browser and prepares to construct the page.',
  },
  {
    step: 3,
    title: 'Server Fetches Data & Files',
    desc: 'The server fetches the required data (from databases or APIs) and files needed to construct the complete webpage.',
  },
  {
    step: 4,
    title: 'Server Renders HTML',
    desc: 'The server compiles the data and runs React components to render the webpage into static HTML.',
  },
  {
    step: 5,
    title: 'Server Composes Response',
    desc: 'The server has finished rendering the webpage to HTML and wraps it up inside a completed response.',
  },
  {
    step: 6,
    title: 'Server Sends Response',
    desc: "The server sends the fully rendered HTML webpage back to the user's browser.",
  },
  {
    step: 7,
    title: 'Browser Receives Response',
    desc: "The user's browser receives the fully built HTML response, showing content instantly.",
  },
  {
    step: 8,
    title: 'Display Website',
    desc: "The user's browser displays the fully rendered page to the user (which then hydrates in the background).",
  },
]

export default function RenderingEnvironments() {
  const [activeTab, setActiveTab] = useState<'ssr' | 'csr'>('ssr')

  return (
    <div className="env-section">
      <div className="env-notes card-style">
        <p>
          Rendering is the process of converting code into a visual and interactive display that users can view and interact with within a web browser. This process begins when a browser{' '}
          <TermTooltip term="requests" tooltipText="Docs: A network call from client to server asking for data/page files." />{' '}
          a webpage and ends with the server’s response, culminating in the rendered application the user interacts with.
        </p>
        <p>
          There are two primary rendering environments: server and client. Server-side rendering (SSR) means that the assembly of the webpage happens mainly on the server, while Client-side rendering (CSR) assembles mainly on the client’s browser. A well-optimized web application utilizes a combination of both{' '}
          <TermTooltip term="methods" tooltipText="Docs: Methods are object properties that contain functions. Here referring to rendering techniques." />
          , leveraging the strength of each.
        </p>
        <p>
          While React supports both, it lacks built-in SSR. This makes Next.js a go-to choice for developers, as it offers robust support for both SSR and CSR. With Next.js, we can specify rendering granularity down to the component level, choosing if it should be server-rendered, client-rendered, or a combination of both.
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--purple-l)' }}>
          Explore the visual step-by-step differences below between client-rendered and server-rendered environments.
        </p>
      </div>

      <div className="env-cards-container">
        <div className="render-toggle">
          <div 
            className={`rtab${activeTab === 'ssr' ? ' a-ssr' : ''}`} 
            onClick={() => setActiveTab('ssr')}
          >
            🖥️ Server-Side (SSR) Flow
          </div>
          <div 
            className={`rtab${activeTab === 'csr' ? ' a-csr' : ''}`} 
            onClick={() => setActiveTab('csr')}
          >
            💻 Client-Side (CSR) Flow
          </div>
        </div>

        <div className="step-cards-grid">
          {activeTab === 'csr' ? (
            csrSteps.map((s) => (
              <div key={s.step} className="step-diagram-card fi vis">
                <div className="step-card-num-badge">Step {s.step}</div>
                <div className="step-card-content">
                  <div className="step-card-visual-wrapper">
                    <StepVisual mode="csr" step={s.step} />
                  </div>
                  <div className="step-card-text">
                    <h4 className="step-card-title">{s.title}</h4>
                    <p className="step-card-desc">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            ssrSteps.map((s) => (
              <div key={s.step} className="step-diagram-card fi vis ssr-card-accent">
                <div className="step-card-num-badge ssr-badge">Step {s.step}</div>
                <div className="step-card-content">
                  <div className="step-card-visual-wrapper">
                    <StepVisual mode="ssr" step={s.step} />
                  </div>
                  <div className="step-card-text">
                    <h4 className="step-card-title">{s.title}</h4>
                    <p className="step-card-desc">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
