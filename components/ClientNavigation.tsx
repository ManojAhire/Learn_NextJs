'use client'

import { useState } from 'react'

type NavMethod = 'link' | 'hook' | 'anchor'

export default function ClientNavigation() {
  const [method, setMethod] = useState<NavMethod>('link')
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home')
  const [isNavigating, setIsNavigating] = useState(false)
  const [reloadCounter, setReloadCounter] = useState(0)
  const [pageStateCounter, setPageStateCounter] = useState(10) // State to demonstrate persistence vs reset

  // Simulate navigation animation
  const handleNav = (target: 'home' | 'dashboard') => {
    if (target === activeTab) return

    if (method === 'anchor') {
      // Standard HTML <a> link: causes a full page reload simulation
      setIsNavigating(true)
      setTimeout(() => {
        setActiveTab(target)
        setPageStateCounter(0) // State is lost during full page reloads!
        setReloadCounter(prev => prev + 1)
        setIsNavigating(false)
      }, 900)
    } else {
      // SPA Navigation (<Link> or useRouter): client-side navigation preserves React state in layout and transitions smoothly
      setIsNavigating(true)
      setTimeout(() => {
        setActiveTab(target)
        // pageStateCounter is NOT reset by SPA transitions (it persists in layouts) or we show that we don't reload the main document
        setIsNavigating(false)
      }, 250)
    }
  }

  const getCodeSnippet = () => {
    if (method === 'link') {
      return `import Link from 'next/link'

export default function NavBar() {
  return (
    <Link href="/dashboard" className="nav-btn">
      Go to Dashboard
    </Link>
  )
}`
    } else if (method === 'hook') {
      return `'use client'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  )
}`
    } else {
      return `// Standard HTML Anchor tag
export default function Navigation() {
  return (
    <a href="/dashboard">
      Go to Dashboard (Full Reload)
    </a>
  )
}`
    }
  }

  return (
    <div className="client-nav-sandbox border border-slate-800 rounded-xl p-4 bg-slate-900/30 flex flex-col gap-4">
      {/* Selector */}
      <div className="flex gap-2">
        {(['link', 'hook', 'anchor'] as NavMethod[]).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              method === m
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {m === 'link' ? '<Link> Component' : m === 'hook' ? 'useRouter() Hook' : '<a> HTML Anchor'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Code Block */}
        <div className="flex flex-col">
          <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-[9.5px] text-slate-300 min-h-[145px] relative overflow-hidden">
            <div className="absolute top-2 right-2 text-[8px] bg-slate-800 text-slate-500 px-1 rounded">JSX</div>
            <pre className="whitespace-pre">{getCodeSnippet()}</pre>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 leading-normal">
            {method === 'link' && '💡 <Link> pre-fetches the page contents automatically in the background when the link enters the viewport. This makes navigation feel instant!'}
            {method === 'hook' && '💡 useRouter() lets you navigate programmatically inside client-side event handlers (like after a form submits successfully).'}
            {method === 'anchor' && '⚠️ Standard anchors bypass Next.js client routing and trigger a full browser window refresh, clearing all in-memory React state.'}
          </div>
        </div>

        {/* Right: Mock Browser Viewport */}
        <div className="flex flex-col">
          {/* Browser Address Bar Frame */}
          <div className="bg-slate-900 border border-slate-700 rounded-t-lg flex items-center p-1.5 gap-2 relative">
            {/* Dots / Refresh state */}
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            
            {/* Browser loading spinner simulation */}
            {isNavigating && method === 'anchor' && (
              <div className="w-2.5 h-2.5 rounded-full border border-slate-400 border-t-transparent animate-spin" />
            )}

            {/* Input Address Field */}
            <div className="flex-1 bg-slate-950 border border-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300 font-mono flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-slate-500">https://myapp.com</span>
                <span className="text-emerald-400 font-semibold">/{activeTab === 'home' ? '' : 'dashboard'}</span>
              </div>
              <span className="text-[8px] text-slate-500">
                Full reloads: <span className="text-yellow-400">{reloadCounter}</span>
              </span>
            </div>
          </div>

          {/* Browser Content Area */}
          <div className={`bg-[#0b0c16] border-x border-b border-slate-700 rounded-b-lg min-h-[145px] p-4 flex flex-col justify-between transition-opacity duration-300 ${isNavigating && method === 'anchor' ? 'opacity-30' : 'opacity-100'}`}>
            
            {/* Page Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                {activeTab === 'home' ? '🏠 Home View' : '📊 Dashboard View'}
              </span>
              {/* Dummy state display */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[9px]">
                <span className="text-slate-500">App Counter State:</span>
                <span className="text-cyan-400 font-bold font-mono">{pageStateCounter}</span>
                <button 
                  onClick={() => setPageStateCounter(c => c + 1)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-1 rounded text-[8px]"
                >
                  +1
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center py-2">
              {isNavigating && method !== 'anchor' ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                  <span className="text-[8px] text-emerald-400 font-mono">Instant routing...</span>
                </div>
              ) : activeTab === 'home' ? (
                <div className="text-center">
                  <p className="text-[10px] text-slate-300 mb-2">You are currently on the Home page.</p>
                  <button
                    onClick={() => handleNav('dashboard')}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1.5 rounded text-[10px] font-semibold transition-all"
                  >
                    {method === 'link' ? '<Link href="/dashboard">' : method === 'hook' ? 'router.push("/dashboard")' : '<a href="/dashboard">'}
                      Go to Dashboard &rarr;
                    {method === 'link' ? '</Link>' : method === 'hook' ? '' : '</a>'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[10px] text-slate-300 mb-2">🎉 Dashboard Loaded! Notice that SPA navigation did not reload the page or wipe your App Counter State.</p>
                  <button
                    onClick={() => handleNav('home')}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded text-[10px] font-semibold transition-all"
                  >
                    &larr; Back to Home
                  </button>
                </div>
              )}
            </div>

            {/* Footer status bar */}
            <div className="border-t border-slate-900 pt-2 flex justify-between text-[8px] text-slate-500 font-mono">
              <span>Transition type: {method === 'anchor' ? 'Document Request (Heavy)' : 'React State Transition (Instant)'}</span>
              <span>Document loaded: 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
