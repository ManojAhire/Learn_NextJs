'use client'

import { useState, useEffect } from 'react'

const CHECKLIST_ITEMS = [
  'Create routes using folders',
  'Create page.js files',
  'Create shared layout.js',
  'Create nested layouts',
  'Create static routes',
  'Create dynamic routes',
  'Create catch-all routes',
  'Create route groups',
  'Use Link component',
  'Build a 5-page website',
  'Build a blog with [slug]',
]

export default function Level1Notes() {
  // --- Checklist State ---
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nextjs_level1_checklist')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) {
            return parsed
          }
        } catch {
          // ignore
        }
      }
    }
    return new Array(CHECKLIST_ITEMS.length).fill(false)
  })

  useEffect(() => {
    localStorage.setItem('nextjs_level1_checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleCheck = (index: number) => {
    const updated = [...checkedItems]
    updated[index] = !updated[index]
    setCheckedItems(updated)
  }

  const completedCount = checkedItems.filter(Boolean).length
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100)

  // --- Interactive State 1: App Folder Tree ---
  const [selectedFile, setSelectedFile] = useState<string>('page.js')
  const getFileExplanation = (file: string) => {
    switch (file) {
      case 'root-layout':
        return {
          path: 'src/app/layout.js',
          route: 'Applies to ALL pages',
          desc: 'The top-level root layout. It defines the <html> and <body> tags. Any UI here (like a Navbar or Footer) is shared across all pages, and it does not re-render or lose state when navigating.',
          code: `export default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <nav>Navbar</nav>\n        {children}\n        <footer>Footer</footer>\n      </body>\n    </html>\n  );\n}`,
        }
      case 'page.js':
        return {
          path: 'src/app/page.js',
          route: 'Maps to URL: /',
          desc: 'The main entry page of your website. Next.js maps the root folder directly to the homepage.',
          code: `export default function HomePage() {\n  return <h1>Home Page</h1>;\n}`,
        }
      case 'about-page':
        return {
          path: 'src/app/about/page.js',
          route: 'Maps to URL: /about',
          desc: 'The page file for the /about route. Because page.js is inside the about/ folder, Next.js matches the folder name to the URL route.',
          code: `export default function AboutPage() {\n  return <h1>About Page</h1>;\n}`,
        }
      case 'contact-page':
        return {
          path: 'src/app/contact/page.js',
          route: 'Maps to URL: /contact',
          desc: 'The contact page. Creating the folders app/contact/ and placing a page.js creates the URL segment /contact.',
          code: `export default function ContactPage() {\n  return <h1>Contact Page</h1>;\n}`,
        }
      case 'blog-page':
        return {
          path: 'src/app/blog/page.js',
          route: 'Maps to URL: /blog',
          desc: 'The index page for your blog. This lists all blog posts at /blog URL.',
          code: `export default function BlogIndex() {\n  return <h1>Blog Page</h1>;\n}`,
        }
      default:
        return { path: '', route: '', desc: '', code: '' }
    }
  }

  const activeFileExplanation = getFileExplanation(selectedFile)

  // --- Interactive State 2: Layout Wrapper Simulator ---
  const [layoutActivePage, setLayoutActivePage] = useState<'home' | 'about' | 'contact'>('home')
  const [layoutMode, setLayoutMode] = useState<'with' | 'without'>('with')

  // --- Interactive State 3: Nested Layout Model ---
  const [selectedNestedNode, setSelectedNestedNode] = useState<'root' | 'dash' | 'settings'>('settings')

  // --- Interactive State 4: Dynamic Routes URL Parser ---
  const [selectedSlug, setSelectedSlug] = useState<string>('react')
  const [customSlugInput, setCustomSlugInput] = useState<string>('')
  const activeSlug = customSlugInput.trim() || selectedSlug

  // --- Interactive State 5: Catch-all Router ---
  const [catchAllPath, setCatchAllPath] = useState<string>('react/hooks/useState')
  const catchAllArray = catchAllPath.split('/').filter(Boolean)

  // --- Interactive State 6: Link Component transition simulator ---
  const [clickCount, setClickCount] = useState<number>(0)
  const [simActiveTab, setSimActiveTab] = useState<'home' | 'about'>('home')
  const [isReloading, setIsReloading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  const triggerReloadTransition = (targetTab: 'home' | 'about') => {
    setIsReloading(true)
    setClickCount(0) // resets state!
    setTimeout(() => {
      setIsReloading(false)
      setSimActiveTab(targetTab)
    }, 900)
  }

  const triggerLinkTransition = (targetTab: 'home' | 'about') => {
    setSimActiveTab(targetTab)
    setToastMessage('🚀 Instant Transition! State preserved. (Pre-fetched)')
    setTimeout(() => setToastMessage(''), 2500)
  }

  return (
    <div className="flex flex-col gap-10">
      
      {/* ── INTRO / WHAT YOU WILL LEARN ── */}
      <section className="section fi" id="app-router-level1" aria-label="Level 1 intro">
        <div className="sec-num">Part 3 · Intro</div>
        <h2 className="sec-title">Level 1 — Core Next.js (App Router)</h2>
        <p className="sec-sub">
          A visual guide to structuring routes, layouts, links, and pages. Learn how Next.js translates the folder structure directly into your web application URL system.
        </p>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mt-4">
          <h4 className="text-sm font-bold text-white mb-3">🎓 What You Will Learn to Build</h4>
          <p className="text-xs text-slate-300 mb-4">
            By the end of this level, you should be able to create a fully-routed, cohesive site with a shared navigation layout and dynamic segments:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: '🏠 Home Page', desc: 'app/page.js' },
              { label: 'ℹ️ About Page', desc: 'app/about/page.js' },
              { label: '⚙️ Services Page', desc: 'app/services/page.js' },
              { label: '📞 Contact Page', desc: 'app/contact/page.js' },
              { label: '📝 Blog Page', desc: 'app/blog/page.js' },
              { label: '⚡ Dynamic Posts', desc: 'app/blog/[slug]' },
              { label: '🗺️ Shared Navbar', desc: 'layout.js Navbar' },
              { label: '🦶 Shared Footer', desc: 'layout.js Footer' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-slate-850 p-3 rounded-lg flex flex-col justify-between">
                <span className="text-xs font-semibold text-white">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 1. APP FOLDER ── */}
      <section className="section fi" id="app-folder" aria-label="1. App Folder Structure">
        <div className="sec-num">Part 3 · 01</div>
        <h2 className="sec-title">1. The App Folder &amp; Route Segments</h2>
        <p className="sec-sub">
          The <code>app/</code> folder is the heart of Next.js routing. Every folder nested inside <code>app/</code> becomes a <strong>Route Segment</strong> in the URL path.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* File Tree Selector */}
          <div>
            <div className="file-tree">
              <div className="ft-head font-bold">📁 Interactive Project Tree</div>
              
              <div className="ft-line pointer-events-none">
                <span className="ft-icon">📁</span>
                <span className="ft-name ft-folder font-bold">src/</span>
              </div>
              <div className="ft-indent">
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder font-bold">app/</span>
                </div>
                
                <div className="ft-indent">
                  <div 
                    className={`ft-line cursor-pointer ${selectedFile === 'root-layout' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedFile('root-layout')}
                  >
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-special">layout.js</span>
                    <span className="ft-rbadge">shared frame</span>
                  </div>

                  <div 
                    className={`ft-line cursor-pointer ${selectedFile === 'page.js' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedFile('page.js')}
                  >
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                    <span className="ft-rbadge">/</span>
                  </div>

                  {/* about */}
                  <div 
                    className={`ft-line cursor-pointer ${selectedFile === 'about-page' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedFile('about-page')}
                  >
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-folder">about/</span>
                  </div>
                  <div className="ft-indent">
                    <div 
                      className={`ft-line cursor-pointer ${selectedFile === 'about-page' ? 'ft-active' : ''}`}
                      onClick={() => setSelectedFile('about-page')}
                    >
                      <span className="ft-icon">📄</span>
                      <span className="ft-name ft-route">page.js</span>
                      <span className="ft-rbadge">/about</span>
                    </div>
                  </div>

                  {/* contact */}
                  <div 
                    className={`ft-line cursor-pointer ${selectedFile === 'contact-page' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedFile('contact-page')}
                  >
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-folder">contact/</span>
                  </div>
                  <div className="ft-indent">
                    <div 
                      className={`ft-line cursor-pointer ${selectedFile === 'contact-page' ? 'ft-active' : ''}`}
                      onClick={() => setSelectedFile('contact-page')}
                    >
                      <span className="ft-icon">📄</span>
                      <span className="ft-name ft-route">page.js</span>
                      <span className="ft-rbadge">/contact</span>
                    </div>
                  </div>

                  {/* blog */}
                  <div 
                    className={`ft-line cursor-pointer ${selectedFile === 'blog-page' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedFile('blog-page')}
                  >
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-folder">blog/</span>
                  </div>
                  <div className="ft-indent">
                    <div 
                      className={`ft-line cursor-pointer ${selectedFile === 'blog-page' ? 'ft-active' : ''}`}
                      onClick={() => setSelectedFile('blog-page')}
                    >
                      <span className="ft-icon">📄</span>
                      <span className="ft-name ft-route">page.js</span>
                      <span className="ft-rbadge">/blog</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 text-center font-mono">
              💡 Click on any file to inspect how the route structures mapping works.
            </p>
          </div>

          {/* Explanation Output */}
          <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                <span className="text-[10px] font-mono text-cyan-300">{activeFileExplanation.path}</span>
                <span className="text-[9px] bg-slate-950 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                  {activeFileExplanation.route}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">How it works</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {activeFileExplanation.desc}
              </p>
            </div>

            <div className="code-wrap m-0">
              <div className="code-head">
                <div className="c-dots">
                  <div className="c-dot" style={{ background: '#ff5f57' }} />
                  <div className="c-dot" style={{ background: '#febc2e' }} />
                </div>
                <div className="c-file">{activeFileExplanation.path.split('/').pop()}</div>
              </div>
              <pre className="text-[11px] p-3 text-slate-200 overflow-x-auto" style={{ maxHeight: '180px' }}>
                <code>{activeFileExplanation.code}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="rule-box mt-3">
          <span className="text-base">📐</span>
          <p className="text-xs text-slate-300">
            <strong className="text-emerald-400">Rule:</strong> Folder name = Route Segment. The <code>page.js</code> file defines the actual screen content the user sees. Without a <code>page.js</code> file inside a folder, that path returns a 404 error.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ── 2 & 3. PAGE.JS & LAYOUT.JS ── */}
      <section className="section fi" id="page-layout" aria-label="2 & 3. page.js and layout.js">
        <div className="sec-num">Part 3 · 02</div>
        <h2 className="sec-title">2 &amp; 3. page.js &amp; layout.js</h2>
        <p className="sec-sub">
          Every route needs a <code>page.js</code>. To avoid repeating shared UI like Navbars and Footers on every page, Next.js uses <code>layout.js</code> to wrap nested files automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          
          {/* Controls */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col gap-4">
              {/* Layout Mode */}
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Layout Option</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setLayoutMode('with')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition ${layoutMode === 'with' ? 'bg-indigo-500 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
                  >
                    With layout.js
                  </button>
                  <button 
                    onClick={() => setLayoutMode('without')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition ${layoutMode === 'without' ? 'bg-indigo-500 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
                  >
                    Without layout
                  </button>
                </div>
              </div>

              {/* Active Route Select */}
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Select URL Route</span>
                <div className="flex flex-col gap-1.5">
                  {([
                    { key: 'home', path: '/', label: 'Home Page' },
                    { key: 'about', path: '/about', label: 'About Page' },
                    { key: 'contact', path: '/contact', label: 'Contact Page' },
                  ] as const).map((route) => (
                    <button
                      key={route.key}
                      onClick={() => setLayoutActivePage(route.key)}
                      className={`flex justify-between items-center text-left py-2 px-3 rounded-lg text-xs transition ${layoutActivePage === route.key ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700' : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-850'}`}
                    >
                      <span>{route.label}</span>
                      <span className="font-mono text-[10px] opacity-75">{route.path}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
              {layoutMode === 'with' ? (
                <span>
                  🟢 The <code>layout.js</code> renders shared structure. Next.js passes the page component into the layout as the <code>{`{ children }`}</code> prop, so the navbar and footer stay in place.
                </span>
              ) : (
                <span>
                  🔴 Without a shared layout, each page must replicate nav and footer components manually. Every navigation triggers a complete reload and resets page state.
                </span>
              )}
            </div>
          </div>

          {/* Browser Window Simulator */}
          <div className="md:col-span-8 flex flex-col">
            <div className="bg-slate-900 border border-slate-700 rounded-t-lg flex items-center p-2 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              
              <div className="flex-1 bg-slate-950 border border-slate-800 text-[10.5px] px-3 py-1 rounded text-slate-300 font-mono flex items-center gap-1">
                <span className="text-slate-500 font-semibold">https://my-nextjs-app.edu</span>
                <span className="text-emerald-400 font-bold">
                  {layoutActivePage === 'home' ? '/' : `/${layoutActivePage}`}
                </span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="bg-[#080816] border-x border-b border-slate-700 rounded-b-lg min-h-[220px] flex flex-col p-4 relative">
              {/* Shared navbar wrapper */}
              {layoutMode === 'with' && (
                <div className="bg-slate-900/80 border border-indigo-500/40 p-2.5 rounded-md mb-3 text-center text-xs font-bold text-white flex justify-between items-center px-4">
                  <span className="text-indigo-400 flex items-center gap-1">▲ Layout Navbar</span>
                  <div className="flex gap-3 text-[10px] text-slate-400 font-normal">
                    <span className={layoutActivePage === 'home' ? 'text-indigo-300 font-bold' : ''}>Home</span>
                    <span className={layoutActivePage === 'about' ? 'text-indigo-300 font-bold' : ''}>About</span>
                    <span className={layoutActivePage === 'contact' ? 'text-indigo-300 font-bold' : ''}>Contact</span>
                  </div>
                </div>
              )}

              {/* Dynamic Leaf Page Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 border border-dashed border-emerald-500/30 rounded bg-emerald-500/5 min-h-[110px]">
                <span className="text-[9px] text-emerald-400/80 font-mono mb-2 uppercase tracking-wider">
                  Page Content (page.js children)
                </span>
                {layoutActivePage === 'home' && (
                  <h3 className="text-base font-bold text-white">🏠 Home Page content renders here</h3>
                )}
                {layoutActivePage === 'about' && (
                  <h3 className="text-base font-bold text-white">ℹ️ About Page content renders here</h3>
                )}
                {layoutActivePage === 'contact' && (
                  <h3 className="text-base font-bold text-white">📞 Contact Page content renders here</h3>
                )}
              </div>

              {/* Shared footer wrapper */}
              {layoutMode === 'with' && (
                <div className="bg-slate-900/80 border border-indigo-500/40 p-2.5 rounded-md mt-3 text-center text-[10px] text-slate-400">
                  ▲ layout.js Footer · Shared across all directories
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 4. NESTED LAYOUTS ── */}
      <section className="section fi" id="nested-layouts" aria-label="4. Nested Layouts">
        <div className="sec-num">Part 3 · 03</div>
        <h2 className="sec-title">4. Nested Layouts</h2>
        <p className="sec-sub">
          Next.js allows layouts to be nested. Layouts in subfolders act as wrappers around pages in their directory, nested inside the outer root layout.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          {/* File selector tree */}
          <div className="md:col-span-5">
            <div className="file-tree">
              <div className="ft-head font-bold">📁 Nested Folder Structure</div>
              <div className="ft-line pointer-events-none">
                <span className="ft-icon">📁</span>
                <span className="ft-name ft-folder font-bold">app/</span>
              </div>
              <div className="ft-indent">
                <div 
                  className={`ft-line cursor-pointer ${selectedNestedNode === 'root' ? 'ft-active' : ''}`}
                  onClick={() => setSelectedNestedNode('root')}
                >
                  <span className="ft-icon">📄</span>
                  <span className="ft-name ft-special">layout.js (Root Layout)</span>
                </div>
                
                {/* app/dashboard */}
                <div 
                  className={`ft-line cursor-pointer ${selectedNestedNode === 'dash' ? 'ft-active' : ''}`}
                  onClick={() => setSelectedNestedNode('dash')}
                >
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder">dashboard/</span>
                </div>
                <div className="ft-indent">
                  <div 
                    className={`ft-line cursor-pointer ${selectedNestedNode === 'dash' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedNestedNode('dash')}
                  >
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-special">layout.js (Dashboard Layout)</span>
                  </div>

                  <div 
                    className={`ft-line cursor-pointer ${selectedNestedNode === 'dash' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedNestedNode('dash')}
                  >
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                    <span className="ft-rbadge">/dashboard</span>
                  </div>

                  {/* app/dashboard/settings */}
                  <div 
                    className={`ft-line cursor-pointer ${selectedNestedNode === 'settings' ? 'ft-active' : ''}`}
                    onClick={() => setSelectedNestedNode('settings')}
                  >
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-folder">settings/</span>
                  </div>
                  <div className="ft-indent">
                    <div 
                      className={`ft-line cursor-pointer ${selectedNestedNode === 'settings' ? 'ft-active' : ''}`}
                      onClick={() => setSelectedNestedNode('settings')}
                    >
                      <span className="ft-icon">📄</span>
                      <span className="ft-name ft-route">page.js</span>
                      <span className="ft-rbadge">/dashboard/settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-xs text-slate-300">
              {selectedNestedNode === 'root' && (
                <span>
                  👈 <strong>Root Layout</strong> forms the outer boundary containing HTML structure. Renders <code>Main Navbar</code>.
                </span>
              )}
              {selectedNestedNode === 'dash' && (
                <span>
                  👈 <strong>Dashboard Layout</strong> nests inside Root Layout. Renders a custom dashboard <code>Sidebar</code>.
                </span>
              )}
              {selectedNestedNode === 'settings' && (
                <span>
                  👈 <strong>Settings Page</strong> renders inside the Dashboard Layout, which in turn renders inside the Root Layout.
                </span>
              )}
            </div>
          </div>

          {/* Visual Nested boxes model */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Visual Nesting Hierarchy</h4>
            
            <div className="border border-purple-500/40 rounded-xl p-4 bg-purple-500/5 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-purple-400 font-bold">1. Root Layout Wrapper</span>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 rounded">Main Navbar</span>
              </div>

              {/* Root navbar representation */}
              <div className="bg-slate-950 border border-purple-500/20 rounded p-1.5 text-center text-xs text-purple-300 font-bold mb-3">
                🌐 main-navbar.jsx
              </div>

              {/* Nested Dashboard Layout wrapper */}
              <div className="border border-cyan-500/40 rounded-lg p-3.5 bg-cyan-500/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">2. Dashboard Layout Wrapper</span>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 rounded">Sidebar</span>
                </div>

                {/* Grid showing sidebar + child page */}
                <div className="grid grid-cols-12 gap-2">
                  {/* Dashboard Sidebar */}
                  <div className="col-span-4 bg-slate-950 border border-cyan-500/20 rounded p-2 text-center text-[10px] text-cyan-300 font-bold flex items-center justify-center min-h-[60px]">
                    📂 Sidebar menu
                  </div>

                  {/* Leaf Content */}
                  <div className="col-span-8 border border-amber-500/40 rounded bg-amber-500/5 p-2 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] text-amber-400 font-mono uppercase mb-1">3. Active Page</span>
                    <span className="text-xs font-bold text-white">
                      {selectedNestedNode === 'settings' ? 'Settings Content' : 'Dashboard Main'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 5, 6, 7 & 8. ROUTES DEEP DIVE (STATIC, DYNAMIC, CATCH-ALL) ── */}
      <section className="section fi" id="static-dynamic" aria-label="5 to 8. Route Segments Deep Dive">
        <div className="sec-num">Part 3 · 04</div>
        <h2 className="sec-title">5 - 8. Route Types (Static &amp; Dynamic)</h2>
        <p className="sec-sub">
          Next.js supports static routing, dynamic segments using brackets <code>[slug]</code>, and catch-all routes <code>[...slug]</code> to handle flexible page configurations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          {/* Dynamic routes simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2">⚡ Dynamic Routes Parser ([slug])</h4>
            <p className="text-xs text-slate-400 mb-4">
              Select or type a slug to observe how Next.js routes it inside <code>app/blog/[slug]/page.js</code>:
            </p>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {['react', 'nextjs', 'javascript', 'mongodb'].map((slug) => (
                <button
                  key={slug}
                  onClick={() => {
                    setSelectedSlug(slug)
                    setCustomSlugInput('')
                  }}
                  className={`py-1 px-2.5 rounded text-xs transition ${activeSlug === slug ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-850'}`}
                >
                  {slug}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type custom slug..."
                value={customSlugInput}
                onChange={(e) => setCustomSlugInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Routing analysis */}
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-850 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-500">Folder:</span>
                <span className="text-cyan-300">app/blog/[slug]/page.js</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-500">Request URL:</span>
                <span className="text-emerald-300">/blog/{activeSlug || 'react'}</span>
              </div>
              <div className="flex flex-col gap-1 mt-1.5">
                <span className="text-slate-500">Component Props:</span>
                <pre className="text-[10px] bg-slate-900/50 p-2 rounded text-amber-400 overflow-x-auto">
                  {`export default function BlogPost({ params }) {
  // params = { slug: "${activeSlug || 'react'}" }
  return <h1>{params.slug}</h1>;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Catch-all routes simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2">🗂️ Catch-All Routes Parser ([...slug])</h4>
            <p className="text-xs text-slate-400 mb-4">
              Catch-all folders catch all subfolders. Type a slash-separated pathway to analyze the results:
            </p>

            <div className="mb-4">
              <label className="text-[10px] text-slate-500 font-bold block mb-1 font-mono">docs/[...slug] subpath:</label>
              <input
                type="text"
                value={catchAllPath}
                onChange={(e) => setCatchAllPath(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[9px] text-slate-500 block mt-1">Example: react/hooks/useState</span>
            </div>

            {/* Catch-all Analysis */}
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-850 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-500">Folder:</span>
                <span className="text-cyan-300">app/docs/[...slug]/page.js</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-500">Visited URL:</span>
                <span className="text-emerald-300">/docs/{catchAllPath}</span>
              </div>
              <div className="flex flex-col gap-1 mt-1.5">
                <span className="text-slate-500">Params Structure:</span>
                <pre className="text-[10px] bg-slate-900/50 p-2 rounded text-cyan-400 overflow-x-auto">
                  {`// params.slug represents sub-segments
params = {
  slug: ${JSON.stringify(catchAllArray)}
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 9 & 10. ROUTE GROUPS & LINK COMPONENT ── */}
      <section className="section fi" id="catchall-groups" aria-label="9 & 10. Route Groups and Navigation">
        <div className="sec-num">Part 3 · 05</div>
        <h2 className="sec-title">9 &amp; 10. Route Groups &amp; Navigation</h2>
        <p className="sec-sub">
          <strong>Route Groups</strong> group folders together without impacting URLs. Next.js <code>&lt;Link&gt;</code> enables Single Page Application navigation without full page reloads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          
          {/* Route Groups Details */}
          <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">📁 Route Groups (marketing)</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Parentheses folders like <code>(marketing)</code> or <code>(dashboard)</code> tell Next.js to ignore this folder name when creating URL links.
              </p>

              <div className="file-tree">
                <div className="ft-head font-bold">📁 Route Group Tree</div>
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder font-bold">app/</span>
                </div>
                <div className="ft-indent">
                  <div className="ft-line opacity-50 pointer-events-none">
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-special font-semibold">(marketing)/</span>
                    <span className="ft-rbadge">skipped</span>
                  </div>
                  <div className="ft-indent">
                    <div className="ft-line pointer-events-none">
                      <span className="ft-icon">📁</span>
                      <span className="ft-name ft-folder">about/</span>
                    </div>
                    <div className="ft-indent">
                      <div className="ft-line pointer-events-none">
                        <span className="ft-icon">📄</span>
                        <span className="ft-name ft-route">page.js</span>
                        <span className="ft-rbadge text-emerald-400">/about</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-[10.5px] text-slate-400 font-mono mt-3">
              📝 <strong>Result:</strong> Visiting <code>/about</code> works perfectly. Visting <code>/marketing/about</code> returns a 404.
            </div>
          </div>

          {/* Link transition simulator */}
          <div className="md:col-span-7" id="link-component">
            <div className="bg-slate-900 border border-slate-850 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3">🚀 Transition Sandbox: Link vs Anchor</h4>
              <p className="text-xs text-slate-400 mb-4">
                Increment the counter state, then route between home/about pages using standard anchor tags vs Next.js Link component.
              </p>

              {/* State Counter widget */}
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">React Counter State</span>
                  <span className="text-sm font-bold text-white">Clicks: {clickCount}</span>
                </div>
                <button
                  onClick={() => setClickCount(c => c + 1)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3 rounded text-xs transition"
                >
                  + Click Counter
                </button>
              </div>

              {/* Screen Frame */}
              <div className="border border-slate-700 rounded-lg overflow-hidden relative">
                
                {/* Reload Overlay */}
                {isReloading && (
                  <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-red-400 font-mono">Refreshing Browser (State Reset...)</span>
                  </div>
                )}

                <div className="bg-slate-950 p-2 flex justify-between items-center border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    {simActiveTab === 'home' ? 'my-app.com/' : 'my-app.com/about'}
                  </div>
                </div>

                {/* Simulated Screen Body */}
                <div className="bg-[#0b0c16] p-4 min-h-[100px] flex flex-col justify-between">
                  <div className="text-center text-xs text-white py-2">
                    {simActiveTab === 'home' ? '🏡 Home Page view' : 'ℹ️ About Page view'}
                  </div>

                  {/* Navigation actions */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-red-400 font-bold block text-center uppercase">Standard &lt;a&gt; tag</span>
                      <button
                        onClick={() => triggerReloadTransition(simActiveTab === 'home' ? 'about' : 'home')}
                        className="bg-red-500/10 border border-red-500/35 text-red-300 hover:bg-red-500/20 py-1.5 px-2 rounded text-[10.5px] transition"
                      >
                        Navigate ({simActiveTab === 'home' ? '/about' : '/'})
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] text-emerald-400 font-bold block text-center uppercase">Next.js &lt;Link&gt;</span>
                      <button
                        onClick={() => triggerLinkTransition(simActiveTab === 'home' ? 'about' : 'home')}
                        className="bg-emerald-500/10 border border-emerald-500/35 text-emerald-300 hover:bg-emerald-500/20 py-1.5 px-2 rounded text-[10.5px] transition"
                      >
                        Navigate ({simActiveTab === 'home' ? '/about' : '/'})
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toast notifier */}
              {toastMessage && (
                <div className="mt-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded p-2 text-center text-xs font-mono">
                  {toastMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 11. MINI BLOG PROJECT ── */}
      <section className="section fi" id="mini-blog" aria-label="11. Mini Blog Project">
        <div className="sec-num">Part 3 · 06</div>
        <h2 className="sec-title">11. Mini Blog Project Structure</h2>
        <p className="sec-sub">
          Below is the finalized file hierarchy and website router map for our level 1 blog application, incorporating navigation wrappers and dynamic subpaths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          {/* File Structure */}
          <div className="md:col-span-6">
            <div className="file-tree">
              <div className="ft-head font-bold font-mono">📁 final-project/src/</div>
              
              <div className="ft-line pointer-events-none">
                <span className="ft-icon">📁</span>
                <span className="ft-name ft-folder font-bold">app/</span>
              </div>
              <div className="ft-indent">
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📄</span>
                  <span className="ft-name ft-special">layout.js</span>
                </div>
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📄</span>
                  <span className="ft-name ft-route">page.js</span>
                </div>

                {/* app/about */}
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder">about/</span>
                </div>
                <div className="ft-indent">
                  <div className="ft-line pointer-events-none">
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                  </div>
                </div>

                {/* app/services */}
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder">services/</span>
                </div>
                <div className="ft-indent">
                  <div className="ft-line pointer-events-none">
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                  </div>
                </div>

                {/* app/contact */}
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder">contact/</span>
                </div>
                <div className="ft-indent">
                  <div className="ft-line pointer-events-none">
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                  </div>
                </div>

                {/* app/blog */}
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📁</span>
                  <span className="ft-name ft-folder">blog/</span>
                </div>
                <div className="ft-indent">
                  <div className="ft-line pointer-events-none">
                    <span className="ft-icon">📄</span>
                    <span className="ft-name ft-route">page.js</span>
                  </div>
                  <div className="ft-line pointer-events-none">
                    <span className="ft-icon">📁</span>
                    <span className="ft-name ft-folder">[slug]/</span>
                  </div>
                  <div className="ft-indent">
                    <div className="ft-line pointer-events-none">
                      <span className="ft-icon">📄</span>
                      <span className="ft-name ft-route">page.js</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* components */}
              <div className="ft-line pointer-events-none">
                <span className="ft-icon">📁</span>
                <span className="ft-name ft-folder font-bold">components/</span>
              </div>
              <div className="ft-indent">
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📄</span>
                  <span className="ft-name">Navbar.jsx</span>
                </div>
                <div className="ft-line pointer-events-none">
                  <span className="ft-icon">📄</span>
                  <span className="ft-name">Footer.jsx</span>
                </div>
              </div>
            </div>
          </div>

          {/* Web Map details */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex-1">
              <h4 className="text-sm font-bold text-white mb-3">📍 Application Sitemap Map</h4>
              <div className="flex flex-col gap-2 font-mono text-[11px]">
                {[
                  { path: '/', desc: '🏡 Home Page (Root)' },
                  { path: '/about', desc: 'ℹ️ About Details' },
                  { path: '/services', desc: '🛠️ Offered Services' },
                  { path: '/contact', desc: '📞 Contact Directory' },
                  { path: '/blog', desc: '📝 Blog Article list' },
                  { path: '/blog/react', desc: '└ ⚛️ Article: react (dynamic)' },
                  { path: '/blog/nextjs', desc: '└ ▲ Article: nextjs (dynamic)' },
                  { path: '/blog/javascript', desc: '└ 📄 Article: javascript (dynamic)' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-900 py-1">
                    <span className="text-emerald-400 font-bold">{item.path}</span>
                    <span className="text-slate-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rule-box mt-3">
              <span className="text-base">💡</span>
              <p className="text-xs text-slate-300">
                Next.js matches paths like <code>/blog/react</code> automatically by injecting the string <code>&ldquo;react&rdquo;</code> into <code>params.slug</code> on the page template.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MASTERY CHECKLIST ── */}
      <section className="section fi" id="mastery-checklist" aria-label="Level 1 Mastery Checklist">
        <div className="sec-num">Part 3 · Complete</div>
        <h2 className="sec-title">Level 1 Mastery Checklist</h2>
        <p className="sec-sub">
          Check off items as you master them to track your learning progress. Try to build the mini-blog from memory!
        </p>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Your Progress</span>
              <span className="text-xs text-slate-400">{completedCount} of {CHECKLIST_ITEMS.length} skills acquired</span>
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
            {CHECKLIST_ITEMS.map((item, idx) => (
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
