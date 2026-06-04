'use client'

import React from 'react'

interface TreeProps {
  color: string
  dashed?: boolean
  highlightButtons?: boolean
  showArrows?: boolean
  attachInteractivity?: boolean
  dashButtonsOnly?: boolean
}

function DOMTree({ 
  color, 
  dashed = false, 
  highlightButtons = false, 
  showArrows = false, 
  attachInteractivity = false, 
  dashButtonsOnly = false 
}: TreeProps) {
  const lineDash = dashed ? '3 3' : 'none'

  // Coordinates
  const nodes = [
    { id: 'doc', label: 'document', x: 120, y: 15, isButton: false },
    { id: 'html', label: 'HTML', x: 120, y: 45, isButton: false },
    { id: 'body', label: 'body', x: 65, y: 80, isButton: false },
    { id: 'head', label: 'head', x: 175, y: 80, isButton: false },
    { id: 'btn1', label: 'button', x: 35, y: 120, isButton: true },
    { id: 'btn2', label: 'button', x: 95, y: 120, isButton: true },
    { id: 'title', label: 'title', x: 175, y: 120, isButton: false }
  ]

  return (
    <svg 
      viewBox="0 0 240 165" 
      width="100%" 
      height="100%" 
      className="dom-tree-svg"
      style={{ overflow: 'visible' }}
    >
      {/* Connection paths */}
      <g stroke={color} strokeWidth="1.5" strokeDasharray={lineDash} fill="none" opacity={dashed ? 0.6 : 1}>
        {/* document -> HTML */}
        <line x1={120} y1={24} x2={120} y2={36} />
        
        {/* HTML -> body & head */}
        <path d="M 120 54 L 120 62.5 L 65 62.5 L 65 71" />
        <path d="M 120 54 L 120 62.5 L 175 62.5 L 175 71" />
        
        {/* body -> button 1 & button 2 */}
        <path 
          d="M 65 89 L 65 100 L 35 100 L 35 111" 
          strokeDasharray={dashed || dashButtonsOnly ? '3 3' : 'none'} 
        />
        <path 
          d="M 65 89 L 65 100 L 95 100 L 95 111" 
          strokeDasharray={dashed || dashButtonsOnly ? '3 3' : 'none'} 
        />
        
        {/* head -> title */}
        <line x1={175} y1={89} x2={175} y2={111} />
      </g>

      {/* Nodes */}
      {nodes.map(({ id, label, x, y, isButton }) => {
        let isNodeDashed = dashed
        if (isButton && dashButtonsOnly) {
          isNodeDashed = true
        }

        const isNodeHighlighted = isButton && highlightButtons
        let strokeColor = color
        let strokeWidth = '1.2'
        
        if (isNodeHighlighted) {
          strokeColor = 'var(--amber-l)'
          strokeWidth = '2'
        }

        return (
          <g key={id}>
            {/* Background glowing layer for highlighted nodes */}
            {isNodeHighlighted && (
              <rect
                x={x - 26}
                y={y - 9}
                width={52}
                height={18}
                rx={4}
                ry={4}
                fill="none"
                stroke="var(--amber-l)"
                strokeWidth="6"
                opacity="0.25"
                style={{ transformOrigin: `${x}px ${y}px` }}
                className="animate-pulse"
              />
            )}
            <rect
              x={x - 26}
              y={y - 9}
              width={52}
              height={18}
              rx={4}
              ry={4}
              fill="#0d0e1b"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={isNodeDashed ? '3 3' : 'none'}
            />
            <text
              x={x}
              y={y}
              dominantBaseline="central"
              textAnchor="middle"
              fill={isNodeHighlighted ? 'var(--amber-l)' : '#fff'}
              fontSize="7.5"
              fontFamily="var(--font-mono), monospace"
              fontWeight={isNodeHighlighted ? '700' : '400'}
            >
              {isButton ? `<${label}>` : label}
            </text>
          </g>
        )
      })}

      {/* Dynamic Overlays: Yellow Arrows pointing to attachment points (Step 5) */}
      {showArrows && (
        <g>
          {/* Button 1 Arrow */}
          <path 
            d="M 35 152 L 35 140" 
            stroke="var(--amber-l)" 
            strokeWidth="1.5" 
            fill="none"
          />
          <polygon points="32,142 38,142 35,137" fill="var(--amber-l)" />
          <text x={35} y={160} textAnchor="middle" fontSize="5.5" fill="var(--amber-l)" fontWeight="700" fontFamily="var(--font-mono), monospace">
            attach onClick
          </text>

          {/* Button 2 Arrow */}
          <path 
            d="M 95 152 L 95 140" 
            stroke="var(--amber-l)" 
            strokeWidth="1.5" 
            fill="none"
          />
          <polygon points="92,142 98,142 95,137" fill="var(--amber-l)" />
          <text x={95} y={160} textAnchor="middle" fontSize="5.5" fill="var(--amber-l)" fontWeight="700" fontFamily="var(--font-mono), monospace">
            attach onClick
          </text>
        </g>
      )}

      {/* Dynamic Overlays: Interactivity badges (Step 8) */}
      {attachInteractivity && (
        <g>
          {/* Button 1 Interactivity Pill */}
          <g transform="translate(11, 131)">
            <rect 
              width={48} 
              height={11} 
              rx={3} 
              ry={3} 
              fill="var(--amber-l)" 
              stroke="#000" 
              strokeWidth="0.5"
            />
            <text x={24} y={7} textAnchor="middle" fontSize="6" fontWeight="800" fill="#000" fontFamily="var(--font-mono), monospace">
              🔗 click active
            </text>
          </g>

          {/* Button 2 Interactivity Pill */}
          <g transform="translate(71, 131)">
            <rect 
              width={48} 
              height={11} 
              rx={3} 
              ry={3} 
              fill="var(--amber-l)" 
              stroke="#000" 
              strokeWidth="0.5"
            />
            <text x={24} y={7} textAnchor="middle" fontSize="6" fontWeight="800" fill="#000" fontFamily="var(--font-mono), monospace">
              🔗 click active
            </text>
          </g>
        </g>
      )}
    </svg>
  )
}

interface StepVisualProps {
  step: number
}

function HydrationStepVisual({ step }: StepVisualProps) {
  const serverColor = 'var(--green-l)'
  const virtualColor = 'var(--cyan-l)'

  return (
    <div className="card-visual-canvas hydration-canvas" style={{ position: 'relative', width: '100%' }}>
      {step === 1 && (
        <div className="h-step1-visual" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <div className="incoming-payload animate-pulse" style={{ display: 'flex', gap: '8px', zIndex: 2 }}>
            <div className="payload-box doc-box" style={{ padding: '3px 6px', fontSize: '7.5px' }}>📄 HTML</div>
            <div className="payload-box js-box" style={{ padding: '3px 6px', fontSize: '7.5px' }}>📦 JS Bundle</div>
            <div className="payload-box data-box" style={{ padding: '3px 6px', fontSize: '7.5px' }}>🗄️ DATA</div>
          </div>
          <div className="laptop-wrapper" style={{ marginTop: '5px', transform: 'scale(0.85)', transformOrigin: 'center' }}>
            <div className="visual-laptop" style={{ position: 'relative', bottom: '0', right: '0', left: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div className="laptop-screen" style={{ width: '64px', height: '38px' }}>
                <span style={{ fontSize: '7px', color: 'var(--muted)', textAlign: 'center', padding: '0 2px' }}>Ready to parse</span>
              </div>
              <div className="laptop-base" style={{ width: '74px' }} />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-green">Server DOM</div>
          <DOMTree color={serverColor} />
        </div>
      )}

      {step === 3 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-cyan">Constructing Virtual DOM...</div>
          <DOMTree color={virtualColor} dashed={true} />
        </div>
      )}

      {step === 4 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-cyan">Virtual DOM Constructed</div>
          <DOMTree color={virtualColor} />
        </div>
      )}

      {step === 5 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-cyan">Locating Attachment Points</div>
          <DOMTree color={virtualColor} highlightButtons={true} showArrows={true} />
        </div>
      )}

      {step === 6 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-green">Matching Actual DOM Elements</div>
          <DOMTree color={serverColor} dashButtonsOnly={true} />
        </div>
      )}

      {step === 7 && (
        <div className="h-comparison-wrapper" style={{ width: '100%', height: '100%', padding: '0 5px' }}>
          <div className="comp-item" style={{ flex: 1 }}>
            <div className="comp-label text-green" style={{ fontSize: '7px' }}>Server DOM</div>
            <div className="small-tree-box" style={{ width: '100%', height: '110px' }}>
              <DOMTree color={serverColor} />
            </div>
          </div>
          <div className="comp-connector" style={{ flex: '0 0 40px', gap: '1px' }}>
            <span className="comp-arrow" style={{ fontSize: '13px' }}>↔️</span>
            <span className="comp-text" style={{ fontSize: '6px' }}>Comparing</span>
          </div>
          <div className="comp-item" style={{ flex: 1 }}>
            <div className="comp-label text-cyan" style={{ fontSize: '7px' }}>Virtual DOM</div>
            <div className="small-tree-box" style={{ width: '100%', height: '110px' }}>
              <DOMTree color={virtualColor} />
            </div>
          </div>
        </div>
      )}

      {step === 8 && (
        <div className="h-tree-wrapper">
          <div className="tree-title text-green">Attaching Event Listeners</div>
          <DOMTree color={serverColor} attachInteractivity={true} />
        </div>
      )}

      {step === 9 && (
        <div className="h-step9-visual" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="visual-laptop" style={{ position: 'relative', bottom: '0', right: '0', left: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', transform: 'scale(1)' }}>
            <div className="laptop-screen white-screen" style={{ width: '70px', height: '42px' }}>
              <div className="screen-website flex-col animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <span className="web-text" style={{ fontSize: '6px', color: '#000', fontWeight: '800' }}>Active Page</span>
                <button className="preview-interactive-btn" style={{ fontSize: '5px', padding: '2px 4px', marginTop: '2px' }}>Interactive Clicked!</button>
              </div>
            </div>
            <div className="laptop-base" style={{ width: '80px' }} />
          </div>
        </div>
      )}
    </div>
  )
}

const hydrationSteps = [
  {
    step: 1,
    title: 'Receive Files',
    desc: 'A client device receives a fully rendered HTML page. It also receives a bundle of JavaScript files, and any extra data needed to make the page is sent.'
  },
  {
    step: 2,
    title: 'Represent Server DOM',
    desc: 'The fully rendered HTML page received from the server is parsed and represented as a standard DOM tree in the browser.'
  },
  {
    step: 3,
    title: 'Construct Virtual DOM',
    desc: "Once the client's device receives the HTML page and the JavaScript bundle, React initializes and starts constructing a Virtual DOM tree."
  },
  {
    step: 4,
    title: 'Virtual DOM Ready',
    desc: 'The Virtual DOM structure is successfully built in client-side memory, reflecting the expected React component structure.'
  },
  {
    step: 5,
    title: 'Locate Attachments',
    desc: 'React parses the Virtual DOM to locate where dynamic events (like onClick, onSubmit) and other interactivities should be attached.'
  },
  {
    step: 6,
    title: 'Match DOM Elements',
    desc: 'React walks the real Server DOM tree to locate the actual matching physical elements corresponding to the event attachment points.'
  },
  {
    step: 7,
    title: 'Reconciliation Check',
    desc: "React compares the constructed Virtual DOM with the actual Server DOM nodes to ensure consistency. If there is a mismatch, a hydration warning is thrown."
  },
  {
    step: 8,
    title: 'Attach Interactivity',
    desc: 'React attaches the event handlers to the corresponding real DOM nodes. The application starts listening to events from the elements.'
  },
  {
    step: 9,
    title: 'Page Interactive',
    desc: 'The HTML page is now fully interactive. Click handlers are bound, input fields update, and any buttons on the screen can be clicked.'
  }
]

export default function HydrationDiagram() {
  return (
    <div className="hydration-section-wrapper">
      <div className="step-cards-grid">
        {hydrationSteps.map((s) => (
          <div key={s.step} className="step-diagram-card fi vis hydration-card-accent">
            <div className="step-card-num-badge ssr-badge">Step {s.step}</div>
            <div className="step-card-content">
              <div className="step-card-visual-wrapper">
                <HydrationStepVisual step={s.step} />
              </div>
              <div className="step-card-text">
                <h4 className="step-card-title">{s.title}</h4>
                <p className="step-card-desc">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
