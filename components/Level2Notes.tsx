'use client'

import { useState, useEffect, useRef } from 'react'

const SYLLABUS_CHECKLIST = [
  'Create Server Component',
  'Create Async Server Component',
  'Fetch API Data',
  'Read Database Data',
  'Create Client Component',
  'Add useState',
  'Add useEffect',
  'Add Event Handlers',
  'Use Browser APIs',
  'Pass Props Server → Client',
  'Mix Server + Client Components',
  'Decide when to use each',
  'Build User Directory Project'
]

const MOCK_USERS = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', company: 'Romaguera-Crona', city: 'Gwenborough' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', company: 'Deckow-Crist', city: 'Wisokyburgh' },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', company: 'Romaguera-Jacobson', city: 'McKenziehaven' },
  { id: 4, name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org', company: 'Robel-Ritchie', city: 'South Elvis' },
  { id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', company: 'Keebler LLC', city: 'Roscoeview' },
  { id: 6, name: 'Mrs. Dennis Schulist', email: 'Karley_Dach@jasper.info', company: 'Considine-Lockman', city: 'South Leopold' },
  { id: 7, name: 'Kurtis Weissnat', email: 'Telly.Hoeger@billy.biz', company: 'Johns Group', city: 'Howemouth' },
  { id: 8, name: 'Nicholas Runolfsdottir V', email: 'Sherwood@rosamond.me', company: 'Abernathy Group', city: 'Alifyahaven' }
]

const MOCK_POSTS = [
  { id: 1, title: 'Next.js 15 App Router Architecture', views: '1.2k' },
  { id: 2, title: 'Server Components vs Client Components', views: '2.5k' },
  { id: 3, title: 'Direct Database Access Made Simple', views: '840' }
]

const MOCK_PRODUCTS = [
  { id: 1, name: 'Developer Mechanical Keyboard', price: '$149' },
  { id: 2, name: 'Curved Ultra-Wide Monitor', price: '$499' },
  { id: 3, name: 'Ergonomic Desk Chair', price: '$299' }
]

const STEP_4_CODE = [
  "export default function Page() {",
  "  return (",
  "    <div>",
  "      <h1>User Directory</h1>",
  "    </div>",
  "  );",
  "}"
].join('\n');

const STEP_6_CODE = [
  "const response = await fetch(",
  "  \"https://jsonplaceholder.typicode.com/users\"",
  ");",
  "",
  "const users = await response.json();"
].join('\n');

const STEP_7_CODE = [
  "{users.map((user) => (",
  "  <div key={user.id}>{user.name}</div>",
  "))}"
].join('\n');

const STEP_8_CODE = [
  "\"use client\";",
  "",
  "export default function Search() {",
  "  return <div>Search Component</div>;",
  "}"
].join('\n');

const STEP_9_CODE = [
  "<Search users={users}/>"
].join('\n');

const STEP_10_CODE = [
  "import { useState } from \"react\";",
  "",
  "// Inside Search component:",
  "const [query, setQuery] = useState(\"\");"
].join('\n');

const STEP_11_CODE = [
  "<input ",
  "  type=\"text\" ",
  "  value={query} ",
  "  onChange={(e) => setQuery(e.target.value)} ",
  "/>"
].join('\n');

const STEP_12_CODE = [
  "const filteredUsers = users.filter(user => ",
  "  user.name.toLowerCase().includes(query.toLowerCase())",
  ");"
].join('\n');

const STEP_13_CODE = [
  "\"use client\";",
  "",
  "import { useState } from \"react\";",
  "",
  "export default function Counter() {",
  "  const [count, setCount] = useState(0);",
  "  return (",
  "    <div>",
  "      <p>Counter: {count}</p>",
  "      <button onClick={() => setCount(count + 1)}>[+]</button>",
  "    </div>",
  "  );",
  "}"
].join('\n');

const STEP_14_CODE = [
  "import Counter from \"@/components/Counter\";",
  "",
  "// Inside page.js return statement:",
  "<Counter />"
].join('\n');

const STEP_15_CODE = [
  "const [isOpen, setIsOpen] = useState(false);",
  "",
  "// Button: Open",
  "// State: false -> true",
  "// Show: Hello Modal"
].join('\n');

const STEP_16_CODE = [
  "const [theme, setTheme] = useState(\"dark\"); // State: Dark / Light",
  "// Store theme preference in browser storage",
  "localStorage.setItem(\"theme\", theme);"
].join('\n');

const STEP_17_CODE = [
  "useEffect(() => {",
  "  const localTheme = localStorage.getItem(\"theme\");",
  "  if (localTheme) setTheme(localTheme);",
  "}, []);"
].join('\n');

const STEP_18_CODE = [
  "export default async function Page() {",
  "  const users = await fetchUsers();",
  "  return (",
  "    <div>",
  "      <h1>User Directory</h1>",
  "      <Search users={users} />",
  "      <Counter />",
  "      <Modal />",
  "      <ThemeToggle />",
  "    </div>",
  "  );",
  "}"
].join('\n');

export default function Level2Notes() {
  // --- Checklist State ---
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() =>
    new Array(SYLLABUS_CHECKLIST.length).fill(false)
  )
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('nextjs_level2_checklist')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === SYLLABUS_CHECKLIST.length) {
          setCheckedItems(parsed)
        }
      } catch {
        // ignore
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nextjs_level2_checklist', JSON.stringify(checkedItems))
    }
  }, [checkedItems, isLoaded])

  const toggleCheck = (index: number) => {
    const updated = [...checkedItems]
    updated[index] = !updated[index]
    setCheckedItems(updated)
  }

  const completedCount = checkedItems.filter(Boolean).length
  const progressPercent = Math.round((completedCount / SYLLABUS_CHECKLIST.length) * 100)

  // --- Step 1: Rendering Lifecycle Simulator ---
  const [lifecycleStep, setLifecycleStep] = useState<number>(0)
  const lifecycleDescriptions = [
    'User requests a page (e.g. clicks a link or enters the URL).',
    'Next.js Server compiles the React component tree and queries databases/APIs.',
    'Server builds static HTML structure representing the page content.',
    'HTML is sent to the Browser for an instant, visual first paint.',
    'JavaScript bundles load in the background to attach state and click listeners (Hydration).',
    'Page is fully interactive! Click handlers, modals, and input fields now function.'
  ]

  // --- Step 4: Server Fetching Simulator ---
  const [fetchTarget, setFetchTarget] = useState<'users' | 'posts' | 'products'>('users')
  const [fetchLoading, setFetchLoading] = useState<boolean>(false)
  const [fetchedData, setFetchedData] = useState<any>(MOCK_USERS)

  const handleFetchSim = (target: 'users' | 'posts' | 'products') => {
    setFetchTarget(target)
    setFetchLoading(true)
    setTimeout(() => {
      setFetchLoading(false)
      if (target === 'users') setFetchedData(MOCK_USERS)
      else if (target === 'posts') setFetchedData(MOCK_POSTS)
      else setFetchedData(MOCK_PRODUCTS)
    }, 600)
  }

  // --- Step 5: Database Connection Visualizer ---
  const [dbConnected, setDbConnected] = useState<boolean>(true)

  // --- Step 8: useState Hook Live Widgets ---
  const [counterCount, setCounterCount] = useState<number>(0)
  const [likeActive, setLikeActive] = useState<boolean>(false)
  const [toggleActive, setToggleActive] = useState<boolean>(false)

  // --- Step 9: useEffect Effects ---
  const [effectLogs, setEffectLogs] = useState<string[]>(['[System] Effect hook initialized.'])
  const [timerSeconds, setTimerSeconds] = useState<number>(10)
  const [timerActive, setTimerActive] = useState<boolean>(false)
  const [simWidth, setSimWidth] = useState<number>(1024)

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      const t = setTimeout(() => setTimerSeconds(s => s - 1), 1000)
      return () => clearTimeout(t)
    } else if (timerSeconds === 0) {
      setTimerActive(false)
      setEffectLogs(prev => [...prev, '⏰ Timer hit 0! Effect triggered action.'])
    }
  }, [timerSeconds, timerActive])

  // --- Step 10: Event Handlers playground ---
  const [hoveredCard, setHoveredCard] = useState<boolean>(false)
  const [typedInput, setTypedInput] = useState<string>('')
  const [submittedMessage, setSubmittedMessage] = useState<string>('')

  // --- Step 11: Browser LocalStorage widget ---
  const [localStorageValue, setLocalStorageValue] = useState<string>('')
  const [savedText, setSavedText] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('level2_saved_text') || ''
      setLocalStorageValue(stored)
      setSavedText(stored)
    }
  }, [])

  const handleSaveText = () => {
    localStorage.setItem('level2_saved_text', savedText)
    setLocalStorageValue(savedText)
    setEffectLogs(prev => [...prev, `💾 Saved to LocalStorage: "${savedText}"`])
  }

  // --- Step 17: Choosing Component Decision Tree ---
  const [decisionPath, setDecisionPath] = useState<string>('start')
  const handleDecision = (node: string) => {
    setDecisionPath(node)
  }

  // --- Step 18: Project Builder Guide Tab ---
  const [projectGuideTab, setProjectGuideTab] = useState<'structure' | 'page' | 'loading' | 'directory' | 'modal' | 'production'>('structure')

  return (
    <div className="flex flex-col gap-10" id="rendering-system-level2">
      
      {/* ── INTRO / SYLLABUS OVERVIEW ── */}
      <section className="section fi vis" id="rendering-system-level2" aria-label="Level 2 Intro">
        <div className="sec-num">Part 4 · Rendering System</div>
        <h2 className="sec-title">Level 2 — Rendering System (Modern Next.js)</h2>
        <p className="sec-sub">
          One golden rule governs modern Next.js development: <strong>Where does this code run? Server or Browser?</strong> Learn to architecture client interactivity on top of lightning-fast server infrastructure.
        </p>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-4">
          <h4 className="text-sm font-bold text-white mb-3">🎓 Level 2 Curriculum Overview</h4>
          <p className="text-xs text-slate-300 mb-4">
            Master the App Router rendering system across 6 comprehensive modules:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { num: 'M1', title: 'Intro to Rendering', desc: 'Syllabus Steps 1' },
              { num: 'M2', title: 'Server Components', desc: 'Syllabus Steps 2 - 6' },
              { num: 'M3', title: 'Client Components', desc: 'Syllabus Steps 7 - 12' },
              { num: 'M4', title: 'Combining Systems', desc: 'Syllabus Steps 13 - 15' },
              { num: 'M5', title: 'Decision Making', desc: 'Syllabus Steps 16 - 17' },
              { num: 'M6', title: 'Practical Project', desc: 'Syllabus Step 18' }
            ].map((mod, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-slate-850 p-3 rounded-lg flex gap-3 items-center">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                  {mod.num}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">{mod.title}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{mod.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 1: INTRODUCTION ── */}
      <section className="section fi vis" id="rendering-m1" aria-label="Module 1: Intro to Rendering">
        <div className="sec-num">Module 1 · Intro to Rendering</div>
        <h2 className="sec-title">1. What is Rendering?</h2>
        <p className="sec-sub">
          Rendering is the process of Next.js taking your React components and translating them into HTML elements that browsers can parse and show on the screen.
        </p>

        {/* Lifecycle Flow Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-white">Interactive Lifecycle Stepper</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setLifecycleStep(prev => Math.max(0, prev - 1))}
                disabled={lifecycleStep === 0}
                className="bg-slate-950 text-slate-400 disabled:opacity-30 border border-slate-850 py-1 px-3 rounded text-xs hover:text-white"
              >
                ◀ Back
              </button>
              <button 
                onClick={() => setLifecycleStep(prev => Math.min(5, prev + 1))}
                disabled={lifecycleStep === 5}
                className="bg-slate-950 text-slate-400 disabled:opacity-30 border border-slate-850 py-1 px-3 rounded text-xs hover:text-white"
              >
                Next ▶
              </button>
            </div>
          </div>

          {/* Stepper Flow Nodes */}
          <div className="lifecycle-flow">
            {[
              { label: '1. Request', icon: '🌐' },
              { label: '2. Next.js', icon: '▲' },
              { label: '3. HTML Build', icon: '🏗️' },
              { label: '4. Fast Paint', icon: '🖼️' },
              { label: '5. Hydrate', icon: '💧' },
              { label: '6. Active', icon: '⚡' }
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`lifecycle-node ${lifecycleStep >= i ? 'active' : ''}`}>
                  <div className="lifecycle-icon">{node.icon}</div>
                  <span className="lifecycle-label">{node.label}</span>
                </div>
                {i < 5 && <span className="lifecycle-arrow">→</span>}
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 flex gap-3 items-start min-h-[64px]">
            <span className="text-base">💡</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Step {lifecycleStep + 1}:</strong> {lifecycleDescriptions[lifecycleStep]}
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 2: SERVER COMPONENTS ── */}
      <section className="section fi vis" id="server-m2" aria-label="Module 2: Server Components">
        <div className="sec-num">Module 2 · Server Components</div>
        <h2 className="sec-title">2 - 6. React Server Components (RSC)</h2>
        <p className="sec-sub">
          Server Components run exclusively on the server, offloading computations from user hardware. In Next.js, every component is a Server Component by default.
        </p>

        <div className="flex flex-col gap-6">
          
          {/* Step 2 & 3: Snippet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">2. Default Server Component</h4>
              <p className="text-xs text-slate-400 mb-4">No special keywords required. Standard code runs natively on the backend.</p>
              <div className="code-wrap m-0">
                <div className="code-head">
                  <div className="c-dots"><div className="c-dot" style={{background:'#28c840'}}/></div>
                  <span className="c-file">app/page.js</span>
                </div>
                <pre className="text-[11.5px] p-3 text-slate-200">
                  <code>
                    <span className="kw">export default function</span> <span className="fn">Home</span>() &#123;<br/>
                    &nbsp;&nbsp;<span className="kw">return</span> &lt;<span className="tg">h1</span>&gt;Hello Server&lt;/<span className="tg">h1</span>&gt;;<br/>
                    &#125;
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">3. Async Server Component</h4>
              <p className="text-xs text-slate-400 mb-4">Next.js allows components to be declared `async` to await database queries or APIs directly.</p>
              <div className="code-wrap m-0">
                <div className="code-head">
                  <div className="c-dots"><div className="c-dot" style={{background:'#28c840'}}/></div>
                  <span className="c-file">app/page.js</span>
                </div>
                <pre className="text-[11.5px] p-3 text-slate-200">
                  <code>
                    <span className="kw">export default async function</span> <span className="fn">Page</span>() &#123;<br/>
                    &nbsp;&nbsp;<span className="kw">const</span> res = <span className="kw">await</span> <span className="fn">fetch</span>(<span className="str">'...'</span>);<br/>
                    &nbsp;&nbsp;<span className="kw">return</span> &lt;<span className="tg">div</span>&gt;Data Ready&lt;/<span className="tg">div</span>&gt;;<br/>
                    &#125;
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4: Data Fetching Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">4. Fetching Data in Server Components</h4>
            <p className="text-xs text-slate-400 mb-4">
              Click a database target to simulate server fetching. Notice how simple the data request flows directly inside the component body:
            </p>
            <div className="flex gap-2 mb-4">
              {['users', 'posts', 'products'].map((target: any) => (
                <button
                  key={target}
                  onClick={() => handleFetchSim(target)}
                  className={`py-1.5 px-3 rounded text-xs transition ${fetchTarget === target ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
                >
                  Fetch {target.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Code viewer */}
              <div className="md:col-span-5 code-wrap m-0">
                <div className="code-head">
                  <span className="c-file">Async Component</span>
                </div>
                <pre className="text-[10px] p-3 text-slate-300">
                  <code>
                    {`const res = await fetch(
  'https://api.com/${fetchTarget}'
);
const data = await res.json();`}
                  </code>
                </pre>
              </div>

              {/* Data terminal output */}
              <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-lg p-3 flex flex-col font-mono text-[10px] min-h-[100px]">
                <div className="flex justify-between border-b border-slate-900 pb-1 mb-2 text-slate-500 font-bold uppercase">
                  <span>Server Payload Output</span>
                  <span>{fetchLoading ? '⚡ Fetching...' : '✓ 200 OK'}</span>
                </div>
                {fetchLoading ? (
                  <div className="flex-1 flex items-center justify-center text-slate-500">
                    <span className="animate-spin text-sm mr-2">▲</span> Loading from API server...
                  </div>
                ) : (
                  <pre className="text-emerald-400 overflow-x-auto m-0 p-0 text-[10px] leading-relaxed">
                    <code>{JSON.stringify(fetchedData.slice(0, 2), null, 2)}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Step 5: Direct DB reads */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">5. Reading Databases Directly</h4>
            <p className="text-xs text-slate-400 mb-4">
              Since Server Components run in the secure backend environment, you can query database engines directly. <strong>No intermediate API endpoints required!</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 flex flex-col gap-2">
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 font-bold">MONGODB OR PRISMA</span>
                    <span className="text-xs text-white font-bold">DbEngine Status</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${dbConnected ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400'}`}>
                    CONNECTED
                  </span>
                </div>
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg flex flex-col gap-1 text-[11px] text-slate-400">
                  <span>Query: <code>User.find()</code></span>
                  <span>Credentials: <code>process.env.DB_URI</code> (Hidden from browser)</span>
                </div>
              </div>

              <div className="md:col-span-8 code-wrap m-0">
                <div className="code-head"><span className="c-file">page.jsx</span></div>
                <pre className="text-[11px] p-3 text-slate-200">
                  <code>
                    {`import { db } from "@/lib/db";

export default async function Dashboard() {
  const users = await db.users.findMany(); // Runs directly on Server!
  return <div>Loaded {users.length} users.</div>;
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 6: Server Limits Sorting Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">6. Server Components Limitations Matrix</h4>
            <p className="text-xs text-slate-400 mb-2">
              An interview favorite. Understand what Server Components are natively allowed to execute vs what breaks.
            </p>
            <div className="matrix-container">
              <div className="matrix-column">
                <div className="matrix-header server">✓ Server Component Capabilities</div>
                <div className="matrix-list">
                  <div className="matrix-item yes">⚡ Fetch raw APIs directly</div>
                  <div className="matrix-item yes">🗄️ Run DB requests &amp; SQL queries</div>
                  <div className="matrix-item yes">🔑 Access secure .env variables</div>
                  <div className="matrix-item yes">📁 Read local server filesystem (fs)</div>
                </div>
              </div>
              <div className="matrix-column">
                <div className="matrix-header client" style={{ color: 'var(--red-l)' }}>❌ Server Component Limitations</div>
                <div className="matrix-list">
                  <div className="matrix-item no">useState / state hooks (Throws error)</div>
                  <div className="matrix-item no">useEffect / lifecycle hooks (Throws error)</div>
                  <div className="matrix-item no">Event listeners (onClick, onChange)</div>
                  <div className="matrix-item no">Browser APIs (window, localStorage)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 3: CLIENT COMPONENTS ── */}
      <section className="section fi vis" id="client-m3" aria-label="Module 3: Client Components">
        <div className="sec-num">Module 3 · Client Components</div>
        <h2 className="sec-title">7 - 12. React Client Components</h2>
        <p className="sec-sub">
          Client Components allow you to add interactivity to your application. They run in the browser and are hydrated after loading.
        </p>

        <div className="flex flex-col gap-6">

          {/* Step 7: "use client" directive */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">7. The "use client" Boundary</h4>
            <p className="text-xs text-slate-400 mb-3">
              Add the `"use client"` string directive at the very top of a file. This declares a boundary, informing Next.js that this component and any imports it makes will run in the browser.
            </p>
            <div className="code-wrap m-0">
              <div className="code-head"><span className="c-file">components/Counter.jsx</span></div>
              <pre className="text-[11.5px] p-3 text-slate-200">
                <code>
                  <span className="str">"use client"</span>;<br/><br/>
                  <span className="kw">import</span> &#125; useState &#125; <span className="kw">from</span> <span className="str">"react"</span>;<br/>
                  <span className="kw">export default function</span> <span className="fn">Counter</span>() &#123; ... &#125;
                </code>
              </pre>
            </div>
          </div>

          {/* Step 8 & 10: useState & Event Handlers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">8. useState in Action</h4>
                <p className="text-xs text-slate-400 mb-4">Allows dynamic UI reactivity based on interactions. Test the client widgets:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Counter Widget */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex flex-col gap-1 items-center flex-1 min-w-[100px]">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Click Counter</span>
                    <button 
                      onClick={() => setCounterCount(c => c + 1)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded text-[11px] transition"
                    >
                      Count: {counterCount}
                    </button>
                  </div>

                  {/* Like Widget */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex flex-col gap-1 items-center flex-1 min-w-[100px]">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Like State</span>
                    <button 
                      onClick={() => setLikeActive(l => !l)}
                      className={`font-bold py-1 px-3 rounded text-[11px] transition ${likeActive ? 'bg-rose-500 text-white' : 'bg-slate-900 text-rose-400 border border-rose-500/20'}`}
                    >
                      {likeActive ? '❤️ Liked!' : '🤍 Like'}
                    </button>
                  </div>

                  {/* Toggle Widget */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex flex-col gap-1 items-center flex-1 min-w-[100px]">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Toggle State</span>
                    <button 
                      onClick={() => setToggleActive(t => !t)}
                      className={`font-bold py-1 px-3 rounded text-[11px] transition ${toggleActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-emerald-400 border border-emerald-500/20'}`}
                    >
                      {toggleActive ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="code-wrap m-0">
                <pre className="text-[9.5px] p-2 text-slate-400">
                  <code>{`const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>`}</code>
                </pre>
              </div>
            </div>

            {/* Step 10: Event Handlers */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">10. Event Handlers</h4>
                <p className="text-xs text-slate-400 mb-4">Capturing user gestures directly in browser (e.g. typing, hovering, submitting):</p>
                <div className="flex flex-col gap-3">
                  {/* mouseEnter / mouseLeave */}
                  <div 
                    onMouseEnter={() => {
                      setHoveredCard(true)
                      setEffectLogs(prev => [...prev, '🖱️ onMouseEnter event detected.'])
                    }}
                    onMouseLeave={() => setHoveredCard(false)}
                    className={`border border-dashed p-3 rounded-lg text-center text-xs transition ${hoveredCard ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300' : 'bg-slate-950 border-slate-850 text-slate-400'}`}
                  >
                    {hoveredCard ? '🚀 Hovering active!' : 'Hover mouse cursor here'}
                  </div>

                  {/* onChange / onSubmit */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (typedInput.trim()) {
                        setSubmittedMessage(typedInput)
                        setEffectLogs(prev => [...prev, `✉️ onSubmit triggered: "${typedInput}"`])
                        setTypedInput('')
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Type details & press Enter"
                      value={typedInput}
                      onChange={(e) => setTypedInput(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-xs text-white flex-1 focus:outline-none focus:border-indigo-500"
                    />
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded text-[11px] transition">
                      Submit
                    </button>
                  </form>
                  {submittedMessage && (
                    <span className="text-[10px] text-emerald-400 font-mono text-center">Submitted payload: "{submittedMessage}"</span>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 font-mono">Captured Events: <code>onMouseEnter</code>, <code>onChange</code>, <code>onSubmit</code></p>
            </div>
          </div>

          {/* Step 9: useEffect Effects & Logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">9. useEffect Side Effects</h4>
            <p className="text-xs text-slate-400 mb-4">
              Running side effects in the client (updating DOM, starting intervals, window listeners). Test the effect tasks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Controls */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Interval Effect */}
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg flex flex-col gap-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Effect Task 1: Timer Interval</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white font-mono">Seconds: {timerSeconds}</span>
                    <button
                      onClick={() => {
                        if (timerSeconds === 0) setTimerSeconds(10)
                        setTimerActive(a => !a)
                        setEffectLogs(prev => [...prev, `⏱️ Timer toggle: ${!timerActive ? 'Started' : 'Paused'}`])
                      }}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-700 py-1 px-2.5 rounded text-[10.5px] text-slate-300 transition"
                    >
                      {timerActive ? 'Pause' : 'Start'}
                    </button>
                  </div>
                </div>

                {/* Event Listener Effect */}
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-lg flex flex-col gap-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Effect Task 2: Resize Listener</span>
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-slate-400">Mock Viewport Width:</span>
                    <input 
                      type="range" 
                      min="320" 
                      max="1440" 
                      value={simWidth}
                      onChange={(e) => {
                        const w = parseInt(e.target.value)
                        setSimWidth(w)
                        setEffectLogs(prev => [...prev, `📐 Window resize detected: ${w}px`])
                      }}
                      className="w-24 cursor-pointer"
                    />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono text-right">window.innerWidth = {simWidth}px</span>
                </div>
              </div>

              {/* Logs output console */}
              <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-lg p-3 flex flex-col justify-between min-h-[140px]">
                <div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-slate-900 pb-1 flex justify-between">
                    <span>Client Effect Console Logs</span>
                    <span className="text-cyan-400 font-mono text-[8px]">useEffect(() =&gt; &#123; ... &#125;, [dep])</span>
                  </div>
                  <div className="flex flex-col gap-1 max-h-[90px] overflow-y-auto font-mono text-[10px]">
                    {effectLogs.slice(-4).map((log, idx) => (
                      <div key={idx} className="text-slate-300">{log}</div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setEffectLogs(['[System] Console cleared.'])}
                  className="text-right text-[9px] text-slate-500 hover:text-slate-300 underline mt-2"
                >
                  Clear Console
                </button>
              </div>
            </div>
          </div>

          {/* Step 11: Browser APIs LocalStorage widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">11. Interacting with Browser APIs</h4>
            <p className="text-xs text-slate-400 mb-3">
              Only Client Components can access browser APIs like `window`, `document`, and `localStorage` because they execute inside the browser sandbox.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 bg-slate-950 border border-slate-850 p-4 rounded-lg flex flex-col gap-3">
                <span className="text-[9px] text-slate-500 font-bold uppercase">localStorage Preferences Sandbox</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter preferences..."
                    value={savedText}
                    onChange={(e) => setSavedText(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white flex-1 focus:outline-none"
                  />
                  <button 
                    onClick={handleSaveText}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded text-[11px] transition"
                  >
                    Save
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10.5px] border-t border-slate-900 pt-2 text-slate-400 font-mono">
                  <span>Retrieved LocalStorage:</span>
                  <span className="text-emerald-400 font-bold">"{localStorageValue || 'empty'}"</span>
                </div>
              </div>

              <div className="md:col-span-7 code-wrap m-0">
                <div className="code-head"><span className="c-file">Localstorage interaction</span></div>
                <pre className="text-[10.5px] p-3 text-slate-300">
                  <code>
                    {`useEffect(() => {
  // Safe to access browser APIs inside client side hooks
  const pref = localStorage.getItem('theme_preference');
  setPref(pref);
}, []);`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Step 12: Client Component limitations check */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">12. Client Components Limitations Matrix</h4>
            <p className="text-xs text-slate-400 mb-2">
              Avoid heavy calculations, and <strong>never include credentials or secret keys</strong> in Client Components. They are compiled into JS bundles and sent directly to the client browser!
            </p>
            <div className="matrix-container">
              <div className="matrix-column">
                <div className="matrix-header client">✓ Client Component Capabilities</div>
                <div className="matrix-list">
                  <div className="matrix-item yes">🎨 Manage states (useState, useActionState)</div>
                  <div className="matrix-item yes">🔄 Trigger lifecycles (useEffect)</div>
                  <div className="matrix-item yes">🖥️ Manipulate DOM elements &amp; Window</div>
                  <div className="matrix-item yes">⚡ Capture user interactive click/change gestures</div>
                </div>
              </div>
              <div className="matrix-column">
                <div className="matrix-header server" style={{ color: 'var(--red-l)' }}>❌ Client Component Pitfalls</div>
                <div className="matrix-list">
                  <div className="matrix-item no">Exposing Secret Env Vars (Leaks to browser)</div>
                  <div className="matrix-item no">Direct SQL Queries (Fails completely)</div>
                  <div className="matrix-item no">Importing server-only engines (fs, child_process)</div>
                  <div className="matrix-item no">Bloating client bundle sizes with massive packages</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 4: COMBINING SERVER + CLIENT ── */}
      <section className="section fi vis" id="combining-m4" aria-label="Module 4: Combining Server and Client">
        <div className="sec-num">Module 4 · Combining Server &amp; Client</div>
        <h2 className="sec-title">13 - 15. Server and Client Composition</h2>
        <p className="sec-sub">
          Next.js allows you to nest Client Components inside Server Components. You fetch data securely on the server and pass it down as props.
        </p>

        <div className="flex flex-col gap-6">

          {/* Step 13: Passing Props Server -> Client */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">13. Passing Props Across the Boundary</h4>
            <p className="text-xs text-slate-400 mb-4">
              Props passed from Server Components to Client Components must be serializable (e.g. JSON strings, arrays, basic objects). Databases connections or classes cannot cross this boundary:
            </p>

            <div className="lifecycle-flow bg-slate-950 p-4 rounded-xl border border-slate-850">
              <div className="lifecycle-node active">
                <div className="lifecycle-icon">🖥️</div>
                <span className="lifecycle-label">1. Server Page</span>
                <span className="text-[8px] text-purple-300 font-mono mt-1">Fetches user array</span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">Passing Props →</span>
              <div className="lifecycle-node active">
                <div className="lifecycle-icon" style={{ borderColor: 'var(--cyan)' }}>💻</div>
                <span className="lifecycle-label" style={{ color: 'var(--cyan-l)' }}>2. Client Search</span>
                <span className="text-[8px] text-cyan-300 font-mono mt-1">Receives users [ ] prop</span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">Interactions →</span>
              <div className="lifecycle-node active">
                <div className="lifecycle-icon" style={{ borderColor: 'var(--green)' }}>✨</div>
                <span className="lifecycle-label" style={{ color: 'var(--green-l)' }}>3. Active Filter</span>
                <span className="text-[8px] text-green-300 font-mono mt-1">Re-renders instantly</span>
              </div>
            </div>
          </div>

          {/* Step 14 & 15: Component composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">14. Mixing Components</h4>
              <p className="text-xs text-slate-400 mb-4">Place the interactive client segments in isolated leaves. Keep parent containers running as Server Components.</p>
              <div className="code-wrap m-0">
                <div className="code-head"><span className="c-file">app/page.js</span></div>
                <pre className="text-[10.5px] p-3 text-slate-300">
                  <code>
                    {`import Search from '@/components/Search';

export default async function Page() {
  const data = await fetchUsers();
  return (
    <main>
      <h1>Directory</h1>
      <Search initialUsers={data} />
    </main>
  );
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">15. Composition Pattern</h4>
              <p className="text-xs text-slate-400 mb-4">
                To nest a Server Component inside a Client Component, pass it as the <code>children</code> prop. This ensures the Server Component is compiled before reaching the browser.
              </p>
              <div className="code-wrap m-0">
                <div className="code-head"><span className="c-file">components/ClientWrapper.jsx</span></div>
                <pre className="text-[10px] p-3 text-slate-300">
                  <code>
                    {`"use client"

export default function ClientWrapper({ children }) {
  return (
    <div className="interactive-layout">
      {children} {/* Server components render fine here */}
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 5: DECISION MAKING ── */}
      <section className="section fi vis" id="decision-m5" aria-label="Module 5: Decision Making">
        <div className="sec-num">Module 5 · Decision Making</div>
        <h2 className="sec-title">16 - 17. Server vs Client Component Choice</h2>
        <p className="sec-sub">
          Failing to choose the correct component environment leads to runtime errors or performance penalties. Use this step-by-step decision tool.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Comparison flip-cards */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">16. Checklist Cheat Sheet</h4>
            <div className="flex flex-col gap-2 font-mono text-[10.5px]">
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Interaction / State?</span>
                <span className="text-cyan-400 font-bold">Client</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Read DB / Database?</span>
                <span className="text-purple-400 font-bold">Server</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Secret credentials / API keys?</span>
                <span className="text-purple-400 font-bold">Server</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Event click / input handlers?</span>
                <span className="text-cyan-400 font-bold">Client</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 py-1.5">
                <span className="text-slate-400">Hooks (useState, useEffect)?</span>
                <span className="text-cyan-400 font-bold">Client</span>
              </div>
            </div>
          </div>

          {/* Interactive Decision tree */}
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">17. Choosing the Right Component Builder</h4>
            <p className="text-xs text-slate-400 mb-4">Click options to evaluate the environment selection tree:</p>

            <div className="tree-node">
              {decisionPath === 'start' && (
                <>
                  <div className="tree-question">1. Does the component need user interactivity, inputs, or state?</div>
                  <div className="tree-options">
                    <button onClick={() => handleDecision('client-hooks')} className="tree-btn primary">Yes (Needs click/input/hooks)</button>
                    <button onClick={() => handleDecision('q2')} className="tree-btn">No (Pure display UI)</button>
                  </div>
                </>
              )}

              {decisionPath === 'client-hooks' && (
                <>
                  <div className="tree-question">Decision Result:</div>
                  <div className="tree-result client-res">
                    <strong>💻 Client Component</strong><br/>
                    <span className="text-[11px] block mt-1">Since you require click handlers, state management, or React lifecycle hooks (useState, useEffect), this component must run in the browser. Add `"use client"` at the top.</span>
                  </div>
                  <button onClick={() => handleDecision('start')} className="tree-btn mt-2">Restart Tree</button>
                </>
              )}

              {decisionPath === 'q2' && (
                <>
                  <div className="tree-question">2. Does the component fetch data directly or query database models?</div>
                  <div className="tree-options">
                    <button onClick={() => handleDecision('server-db')} className="tree-btn primary">Yes (Queries DB/Fetch)</button>
                    <button onClick={() => handleDecision('q3')} className="tree-btn">No (Simple display segment)</button>
                  </div>
                  <button onClick={() => handleDecision('start')} className="tree-btn mt-2">◀ Back</button>
                </>
              )}

              {decisionPath === 'server-db' && (
                <>
                  <div className="tree-question">Decision Result:</div>
                  <div className="tree-result server-res">
                    <strong>🖥️ Server Component</strong><br/>
                    <span className="text-[11px] block mt-1">Direct database access or server fetches must happen on the backend. This improves page speed and shields credentials from browsers. Keep it a default Server Component.</span>
                  </div>
                  <button onClick={() => handleDecision('start')} className="tree-btn mt-2">Restart Tree</button>
                </>
              )}

              {decisionPath === 'q3' && (
                <>
                  <div className="tree-question">3. Does it need to access any browser APIs (e.g. window, localStorage)?</div>
                  <div className="tree-options">
                    <button onClick={() => handleDecision('client-hooks')} className="tree-btn primary">Yes (Needs window/localStorage)</button>
                    <button onClick={() => handleDecision('server-display')} className="tree-btn">No (Standard HTML layout)</button>
                  </div>
                  <button onClick={() => handleDecision('q2')} className="tree-btn mt-2">◀ Back</button>
                </>
              )}

              {decisionPath === 'server-display' && (
                <>
                  <div className="tree-question">Decision Result:</div>
                  <div className="tree-result server-res">
                    <strong>🖥️ Server Component (Recommended)</strong><br/>
                    <span className="text-[11px] block mt-1">Since you don't require user interactions, state hooks, or browser APIs, render it on the Server. This minimizes the JS footprint sent to the browser.</span>
                  </div>
                  <button onClick={() => handleDecision('start')} className="tree-btn mt-2">Restart Tree</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MODULE 6: PRACTICAL PROJECT ── */}
      <section className="section fi vis" id="project-m6" aria-label="Module 6: Practical Project">
        <div className="sec-num">Module 6 · Practical Project</div>

        <div className="bg-gradient-to-r from-purple-950/20 to-cyan-950/20 border border-purple-900/30 rounded-xl p-5 mb-8">
          <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
            Absolutely. In fact, I think this is a much better approach than reading notes for weeks.<br />
            For <strong>Level 2</strong>, we'll build one project that gradually introduces every concept.
          </p>
        </div>

        <h2 className="sec-title text-2xl font-bold text-white mb-2">Project: User Directory</h2>
        <p className="text-xs text-slate-400 font-mono mb-4">
          By the end, you'll have learned:
        </p>

        {/* Skills learned grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            'Server Components', 'Async Components', 'Data Fetching', 'Client Components',
            'useState', 'useEffect', 'Event Handlers', 'Props',
            'Server → Client Flow', 'Search', 'Counter', 'Modal', 'Theme Toggle'
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-850 p-2 rounded flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-xs">✓</span>
              <span className="text-xs font-mono text-slate-300">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/40 border border-slate-850 rounded-xl p-4 mb-8 text-center text-xs text-slate-400 italic">
          "We'll build it like an instructor would, not by dumping code."
        </div>

        {/* Final Website Mockup */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">🖥️ Final Website</h4>
          <pre className="bg-slate-950 border border-slate-850 rounded-lg p-4 font-mono text-[11px] text-cyan-300 leading-normal overflow-x-auto">
{`--------------------------------

          User Directory

Search: ___________

------------------------

Leanne Graham

Ervin Howell

Clementine Bauch

...

------------------------

Counter: 0

[+]

------------------------

[Open Modal]

------------------------

Dark Mode Toggle

--------------------------------`}
          </pre>
        </div>

        {/* Project Architecture */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">📐 Project Architecture</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Folder tree */}
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-lg border border-slate-850 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-slate-500 font-bold block mb-2">FILE SYSTEM MAP</span>
              <pre className="font-mono text-[11px] text-slate-300 leading-normal m-0">
{`src/

app/

├── layout.js

├── globals.css

└── page.js

components/

├── Search.jsx

├── Counter.jsx

├── Modal.jsx

└── ThemeToggle.jsx`}
              </pre>
            </div>

            {/* Data flow */}
            <div className="md:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-850 flex flex-col justify-center">
              <span className="text-[10px] font-mono text-slate-500 font-bold block mb-3">DATA FLOW DIAGRAM</span>
              <div className="flex flex-col gap-1 font-mono text-xs">
                <div className="bg-purple-500/10 border border-purple-500/25 p-2 rounded text-purple-300 text-center font-bold text-[11px]">
                  page.js
                </div>
                <div className="text-slate-500 text-center text-[10px] my-0.5">&darr; Server Component</div>
                <div className="bg-amber-500/10 border border-amber-500/25 p-2 rounded text-amber-300 text-center font-bold text-[11px]">
                  Fetch users
                </div>
                <div className="text-slate-500 text-center text-[10px] my-0.5">&darr; Pass data</div>
                <div className="bg-cyan-500/10 border border-cyan-500/25 p-2 rounded text-cyan-300 text-center font-bold text-[11px]">
                  Client Components
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Curriculum */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">🛠️ Step-by-Step Tutorial</h4>
          
          <div className="flex flex-col gap-6">
            
            {/* Step 1 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 1</span>
              <h5 className="text-sm font-bold text-white">Create Project</h5>
              <pre className="bg-slate-950 p-2.5 rounded text-xs text-indigo-300 font-mono">npx create-next-app@latest</pre>
              <p className="text-xs text-slate-400 font-mono">Choose:</p>
              <pre className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-400 font-mono leading-relaxed">
{`TypeScript: No

ESLint: Yes

Tailwind: Yes

src/: Yes

App Router: Yes`}
              </pre>
              <p className="text-xs text-slate-400">Run:</p>
              <pre className="bg-slate-950 p-2 rounded text-xs text-slate-300 font-mono">npm run dev</pre>
            </div>

            {/* Step 2 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 2</span>
              <h5 className="text-sm font-bold text-white">Understand current structure</h5>
              <p className="text-xs text-slate-400">Explore the default project folder setup:</p>
              <pre className="bg-slate-950 p-3 rounded text-[11px] text-slate-300 font-mono leading-relaxed">
{`src/

app/

layout.js

page.js

globals.css`}
              </pre>
              <p className="text-xs text-slate-400 italic">Ignore everything else.</p>
            </div>

            {/* Step 3 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 3</span>
              <h5 className="text-sm font-bold text-white">Create components folder</h5>
              <pre className="bg-slate-950 p-3 rounded text-[11px] text-slate-300 font-mono leading-relaxed">
{`src/

components/

Search.jsx

Counter.jsx

Modal.jsx

ThemeToggle.jsx`}
              </pre>
              <p className="text-xs text-slate-400 italic">Keep them empty.</p>
            </div>

            {/* Step 4 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 4</span>
              <h5 className="text-sm font-bold text-white">Create Home Page</h5>
              <p className="text-xs text-slate-400">Open <code>app/page.js</code> and write:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_4_CODE}</code>
              </pre>
              <p className="text-xs text-slate-400">Visit <code>localhost:3000</code> and see: <strong>User Directory</strong></p>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPT LEARNED</strong>
                <pre className="font-mono text-cyan-300">Default Server Component</pre>
                Because: <code className="font-mono bg-slate-900 px-1 text-white">No "use client"</code>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 5</span>
              <h5 className="text-sm font-bold text-white">Make page async</h5>
              <p className="text-xs text-slate-400">Change:</p>
              <pre className="bg-slate-950 p-2 rounded text-xs text-indigo-300 font-mono">export default function Page()</pre>
              <p className="text-xs text-slate-400">to</p>
              <pre className="bg-slate-950 p-2 rounded text-xs text-indigo-300 font-mono">export default async function Page()</pre>
              <p className="text-xs text-slate-400">Nothing changes visually. But you've learned:</p>
              <pre className="bg-slate-950 p-2.5 rounded text-[11px] text-cyan-300 font-mono">Async Server Component</pre>
            </div>

            {/* Step 6 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 6</span>
              <h5 className="text-sm font-bold text-white">Fetch Users</h5>
              <p className="text-xs text-slate-400">Inside the component body, invoke the fetch query:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_6_CODE}</code>
              </pre>
              <p className="text-xs text-slate-400">Check:</p>
              <pre className="bg-slate-950 p-2 rounded text-xs text-slate-300 font-mono">console.log(users);</pre>
              <p className="text-xs text-slate-400 font-semibold text-rose-400">Terminal. NOT browser.</p>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">⚠️ Important observation:</strong>
                <pre className="font-mono text-slate-300 leading-relaxed">
{`Server Component

↓

Runs on server

↓

Logs appear in terminal`}
                </pre>
              </div>
            </div>

            {/* Step 7 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 7</span>
              <h5 className="text-sm font-bold text-white">Display Users</h5>
              <p className="text-xs text-slate-400">Render user directory list:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_7_CODE}</code>
              </pre>
              <p className="text-xs text-slate-400">Display:</p>
              <pre className="bg-slate-950 p-2 rounded text-xs text-slate-400 font-mono leading-relaxed">
{`Leanne Graham

Ervin Howell

...`}
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPT</strong>
                <pre className="font-mono text-cyan-300">Server Data Fetching</pre>
                You've already learned: <code>async</code>, <code>await</code>, <code>fetch</code>, <code>Server Rendering</code>.
              </div>
              <div className="bg-indigo-950/35 border border-indigo-900/40 p-3 rounded-lg text-xs text-indigo-300 font-bold text-center mt-2">
                🛑 STOP HERE: At this point you've finished: Default Server Component, Async Component, Server Data Fetching.
              </div>
            </div>

            {/* Step 8 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 8</span>
              <h5 className="text-sm font-bold text-white">Create Search Component</h5>
              <p className="text-xs text-slate-400">Open <code>Search.jsx</code>:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_8_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPT</strong>
                You've created your first Client Component.
              </div>
            </div>

            {/* Step 9 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 9</span>
              <h5 className="text-sm font-bold text-white">Pass users</h5>
              <p className="text-xs text-slate-400">Pass props across the rendering environment boundary:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto">
                <code>{STEP_9_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPT</strong>
                <pre className="font-mono text-cyan-300">Server &rarr; Props &rarr; Client</pre>
              </div>
            </div>

            {/* Step 10 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 10</span>
              <h5 className="text-sm font-bold text-white">useState inside Search</h5>
              <p className="text-xs text-slate-400 font-mono">Create useState for search text:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_10_CODE}</code>
              </pre>
              <p className="text-xs text-slate-400">UI Layout:</p>
              <pre className="bg-slate-950 p-2.5 rounded text-[11px] text-slate-400 font-mono leading-relaxed">
{`Search:

_________`}
              </pre>
            </div>

            {/* Step 11 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 11</span>
              <h5 className="text-sm font-bold text-white">Handle typing</h5>
              <p className="text-xs text-slate-400 font-mono">onChange updates state:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_11_CODE}</code>
              </pre>
            </div>

            {/* Step 12 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 12</span>
              <h5 className="text-sm font-bold text-white">Filter users</h5>
              <p className="text-xs text-slate-400 font-mono">users.filter(...)</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_12_CODE}</code>
              </pre>
              <p className="text-xs text-slate-400">Result typing <code>"lea"</code> shows <strong>Leanne Graham</strong>.</p>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPTS LEARNED</strong>
                <pre className="font-mono text-cyan-300">Client Component, Props, useState, Event Handler, Filtering</pre>
              </div>
            </div>

            {/* Step 13 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 13</span>
              <h5 className="text-sm font-bold text-white">Create Counter</h5>
              <p className="text-xs text-slate-400">Counter.jsx with useState:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_13_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 CONCEPT</strong>
                Interactive Client Component.
              </div>
            </div>

            {/* Step 14 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 14</span>
              <h5 className="text-sm font-bold text-white">Add Counter to Page</h5>
              <p className="text-xs text-slate-400">Nesting Client Component inside Server Component:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_14_CODE}</code>
              </pre>
            </div>

            {/* Step 15 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 15</span>
              <h5 className="text-sm font-bold text-white">Create Modal</h5>
              <p className="text-xs text-slate-400">Toggling state triggers visibility conditionally:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_15_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 LEARN</strong>
                Conditional Rendering, State, Event Handlers.
              </div>
            </div>

            {/* Step 16 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 16</span>
              <h5 className="text-sm font-bold text-white">Theme Toggle</h5>
              <p className="text-xs text-slate-400">ThemeToggle.jsx State and Storage:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_16_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 LEARN</strong>
                Browser APIs, localStorage, useEffect.
              </div>
            </div>

            {/* Step 17 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 17</span>
              <h5 className="text-sm font-bold text-white">useEffect</h5>
              <p className="text-xs text-slate-400">Read local theme value after client-side mounting:</p>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_17_CODE}</code>
              </pre>
              <div className="bg-slate-950/50 border border-slate-850 p-3 rounded-lg text-xs text-slate-400 mt-1">
                <strong className="text-white block mb-1">🧠 LEARN</strong>
                Component Mounting, Side Effects.
              </div>
            </div>

            {/* Step 18 */}
            <div className="border-l-2 border-indigo-500 pl-4 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP 18</span>
              <h5 className="text-sm font-bold text-white">Final Layout Assembly</h5>
              <pre className="bg-slate-950 p-3.5 rounded text-[11.5px] text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                <code>{STEP_18_CODE}</code>
              </pre>
            </div>

          </div>
        </div>

        {/* Curriculum Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">📋 What You'll Learn at Each Step</h4>
          <div className="cs-grid border border-slate-850 rounded-lg overflow-hidden">
            <div className="cs-row bg-slate-950 font-bold border-b border-slate-850 text-white">
              <div className="cs-k font-bold">Step</div>
              <div className="cs-v font-bold">Topic Covered</div>
            </div>
            {[
              { k: '1', v: 'Project Setup' },
              { k: '2', v: 'App Structure' },
              { k: '3', v: 'Components Folder' },
              { k: '4', v: 'Default Server Component' },
              { k: '5', v: 'Async Server Component' },
              { k: '6', v: 'Server Data Fetching' },
              { k: '7', v: 'Rendering Server Data' },
              { k: '8', v: '"use client"' },
              { k: '9', v: 'Passing Props' },
              { k: '10', v: 'useState' },
              { k: '11', v: 'Event Handlers' },
              { k: '12', v: 'Filtering' },
              { k: '13', v: 'Counter' },
              { k: '14', v: 'Component Composition' },
              { k: '15', v: 'Modal' },
              { k: '16', v: 'Browser APIs' },
              { k: '17', v: 'useEffect' },
              { k: '18', v: 'Complete Application' }
            ].map((row) => (
              <div key={row.k} className="cs-row border-b border-slate-850 last:border-0 hover:bg-slate-950/20">
                <div className="cs-k text-indigo-400 font-mono">{row.k}</div>
                <div className="cs-v text-slate-300">{row.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation Progression Callout */}
        <div className="bg-indigo-950/25 border border-indigo-900/40 rounded-xl p-5">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">🚀 My recommendation for how we proceed</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Don't build the whole thing at once. Treat this like a guided Next.js course.
          </p>
          <div className="bg-slate-950/80 p-4 border border-slate-900 rounded-lg flex flex-col gap-2.5">
            <span className="text-xs font-bold text-white block">📚 Lesson 1 (today):</span>
            <ul className="list-disc pl-4 text-xs text-slate-400 flex flex-col gap-1.5 leading-relaxed">
              <li>Project setup</li>
              <li>Understand the folder structure</li>
              <li>Build <code>app/page.js</code></li>
              <li>Convert it to an async Server Component</li>
              <li>Fetch users from the API</li>
              <li>Render the user list</li>
              <li>Understand why the logs appear in the terminal instead of the browser</li>
            </ul>
            <span className="text-[11px] text-slate-500 font-mono mt-1 block leading-normal">
              After Lesson 1, we'll review what happened, discuss the underlying Next.js concepts, and then move to <strong>Lesson 2: creating the first Client Component (Search.jsx) and passing data from the Server Component to it</strong>. This progression mirrors how modern Next.js applications are actually built.
            </span>
          </div>
        </div>

      </section>

      <div className="divider" />

      {/* ── PRACTICE CHECKLIST ── */}
      <section className="section fi vis" id="mastery-checklist-level2" aria-label="Level 2 Practice Checklist">
        <div className="sec-num">Part 4 · Mastery</div>
        <h2 className="sec-title">Level 2 Practice Checklist</h2>
        <p className="sec-sub">
          Check off items as you master them to track your learning progress. Try to build the user directory simulator app from scratch!
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Your Level 2 Progress</span>
              <span className="text-xs text-slate-400">{completedCount} of {SYLLABUS_CHECKLIST.length} skills acquired</span>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 mb-6 overflow-hidden border border-slate-800/80">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${progressPercent}%`, 
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)' 
              }}
            />
          </div>

          {/* Checklist list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SYLLABUS_CHECKLIST.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => toggleCheck(idx)}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${checkedItems[idx] ? 'bg-emerald-500/5 border-emerald-500/30 text-white' : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:border-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${checkedItems[idx] ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-950'}`}>
                  {checkedItems[idx] && '✓'}
                </div>
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
