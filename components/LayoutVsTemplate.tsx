'use client'

import { useState } from 'react'

export default function LayoutVsTemplate() {
  // Navigation states
  const [layoutTab, setLayoutTab] = useState<'A' | 'B'>('A')
  const [templateTab, setTemplateTab] = useState<'A' | 'B'>('A')

  // Wrapper states (Layout vs Template counter)
  const [layoutCount, setLayoutCount] = useState(0)
  const [templateCount, setTemplateCount] = useState(0)

  // Subpage states (resets on navigation in both cases since pages are swapped)
  const [pageCountL, setPageCountL] = useState(0)
  const [pageCountT, setPageCountT] = useState(0)

  // Navigate tabs for layout side
  const handleLayoutTabChange = (tab: 'A' | 'B') => {
    setLayoutTab(tab)
    setPageCountL(0) // Page always remounts, so its state resets!
    // layoutCount persists!
  }

  // Navigate tabs for template side
  const handleTemplateTabChange = (tab: 'A' | 'B') => {
    setTemplateTab(tab)
    setPageCountT(0) // Page always remounts, so its state resets!
    setTemplateCount(0) // Template wrapper also remounts! So its state resets to 0!
  }

  return (
    <div className="layout-template-sandbox border border-slate-800 rounded-xl p-4 bg-slate-900/30 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Layout Side */}
        <div className="flex flex-col border border-emerald-500/25 bg-[#0b0c16] rounded-xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-emerald-950/20 border-b border-emerald-500/20 px-3 py-2 flex justify-between items-center">
            <span className="text-[11px] font-bold text-emerald-400 font-mono">layout.tsx (Shared)</span>
            <span className="text-[8.5px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">State Preserved</span>
          </div>

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Layout Wrapper UI */}
            <div className="border border-emerald-500/30 p-3 rounded-lg bg-emerald-500/5 flex flex-col gap-2 relative">
              <div className="absolute top-1 right-2 text-[7px] text-emerald-500/60 uppercase font-mono font-semibold">Layout component</div>
              
              {/* Layout State Counter */}
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 text-[10px]">
                <span className="text-slate-300 font-mono">Layout Counter State:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold text-sm font-mono">{layoutCount}</span>
                  <button 
                    onClick={() => setLayoutCount(c => c + 1)}
                    className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold px-1.5 py-0.5 rounded text-[9px] transition-all"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* Sub navigation simulation */}
              <div className="flex gap-1.5 border-b border-slate-800 pb-1.5 mt-2">
                {(['A', 'B'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleLayoutTabChange(tab)}
                    className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all ${
                      layoutTab === tab
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border border-transparent hover:text-slate-200'
                    }`}
                  >
                    Subpage {tab}
                  </button>
                ))}
              </div>

              {/* Page Component Inside Layout */}
              <div className="border border-dashed border-slate-700 bg-slate-950/40 p-2.5 rounded min-h-[70px] flex flex-col justify-between">
                <div>
                  <span className="text-[7.5px] text-slate-500 uppercase font-mono block mb-1">page.tsx view</span>
                  <p className="text-[10px] text-slate-200">You are browsing Page {layoutTab}</p>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-slate-900 pt-1.5">
                  <span className="text-[9px] text-slate-400 font-mono">Page Counter:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-300 font-mono text-[10px]">{pageCountL}</span>
                    <button 
                      onClick={() => setPageCountL(c => c + 1)}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-1.5 py-0.2 rounded text-[8px]"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[9.5px] text-slate-400 leading-normal">
              💡 **Observe:** Switch between subpages. Notice the **Page Counter** resets (because the page itself is destroyed/rebuilt), but the **Layout Counter State** stays intact! The layout is never re-mounted.
            </p>
          </div>
        </div>

        {/* Template Side */}
        <div className="flex flex-col border border-purple-500/25 bg-[#0b0c16] rounded-xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-purple-950/20 border-b border-purple-500/20 px-3 py-2 flex justify-between items-center">
            <span className="text-[11px] font-bold text-purple-400 font-mono">template.tsx (Instanced)</span>
            <span className="text-[8.5px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold">State Reset</span>
          </div>

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Template Wrapper UI */}
            <div className="border border-purple-500/30 p-3 rounded-lg bg-purple-500/5 flex flex-col gap-2 relative">
              <div className="absolute top-1 right-2 text-[7px] text-purple-500/60 uppercase font-mono font-semibold">Template component</div>
              
              {/* Template State Counter */}
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800 text-[10px]">
                <span className="text-slate-300 font-mono">Template Counter State:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-400 font-bold text-sm font-mono">{templateCount}</span>
                  <button 
                    onClick={() => setTemplateCount(c => c + 1)}
                    className="bg-purple-500 text-white hover:bg-purple-400 font-bold px-1.5 py-0.5 rounded text-[9px] transition-all"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* Sub navigation simulation */}
              <div className="flex gap-1.5 border-b border-slate-800 pb-1.5 mt-2">
                {(['A', 'B'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTemplateTabChange(tab)}
                    className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all ${
                      templateTab === tab
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-slate-900 text-slate-400 border border-transparent hover:text-slate-200'
                    }`}
                  >
                    Subpage {tab}
                  </button>
                ))}
              </div>

              {/* Page Component Inside Template */}
              <div className="border border-dashed border-slate-700 bg-slate-950/40 p-2.5 rounded min-h-[70px] flex flex-col justify-between">
                <div>
                  <span className="text-[7.5px] text-slate-500 uppercase font-mono block mb-1">page.tsx view</span>
                  <p className="text-[10px] text-slate-200">You are browsing Page {templateTab}</p>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-slate-900 pt-1.5">
                  <span className="text-[9px] text-slate-400 font-mono">Page Counter:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-300 font-mono text-[10px]">{pageCountT}</span>
                    <button 
                      onClick={() => setPageCountT(c => c + 1)}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-1.5 py-0.2 rounded text-[8px]"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[9.5px] text-slate-400 leading-normal">
              💡 **Observe:** Switch between subpages. Notice the **Template Counter State** resets to **0**! This is because Next.js completely remounts the template and discards its state on navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
